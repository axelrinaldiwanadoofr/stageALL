<?php
//////////////////////////////////////////////////////////
// cmslinknode.php
//
// Définition d'un noeud generant un lien hyper texte 
// vers un module
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "app/cms/cmsnode.php" ) ;
require_once( "app/cms/cmsextendnode.php" ) ;

class CmsLinkNode extends CmsExtendNode
	{	
	function __construct( $appctx, $fnode=null )
		{
 		parent::__construct( $appctx, "cms_linknode", $fnode ) ;
		}
	// Charge les CmsCallNode dont les id sont dans la liste $incondition
	public function loadNodes( $appctx, $incondition )
		{
		$sql = "select * from cms_linknode where ( id ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
		
		// Charge les label texte associes
		$flabeltexte = new CmsLabelTexte( $appctx ) ;
		$flabeltexte->loadTextes( $appctx, $incondition ) ;
		$flabeltexte->addLabelTextes2Nodes( $this->objects ) ;
		}
	}
class inCmsLinkNode extends inCmsExtendNode
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{		
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		$this->labeltextes = array() ;
		if( !$key )
			{
			$this->width = 50 ;
			}		
		}
	// Ajoute un texte
	function addLabelTexte( $lang, $labeltexte )
		{
		$this->labeltextes[$lang] = $labeltexte ;
		}		
	// Renvoie les valeurs du noeud plus toutes celles des textes associes dans toutes les langues
	public function sendAnswerValues( $appctx )
		{
		parent::sendAnswerValues( $appctx ) ;

		foreach( $this->labeltextes as $n=>$labeltexte )
			{
			$labeltexte->sendAnswerValues( $appctx ) ;
			}
		}		
	// Genere la vue sur le noeud
	function createView( $appctx, $parentview, $arguments )
		{
		$texte = "" ;
		$textekeystring = "" ;
		$lang = $appctx->getLangue() ;
		if( array_key_exists( $lang, $this->labeltextes ) ) 
			{
			$texte = $this->labeltextes[$lang]->texte ;
			$textekeystring = $this->labeltextes[$lang]->createKeyString() ;
			}
		// Cree la vue
		$view = new vwCmsLinkNode( $appctx, $this, $parentview, $textekeystring, $texte ) ;
		return $view ;
		}		
	}
	
// Vue sur le noeud image	
class vwCmsLinkNode extends vwCmsNode
	{
	function __construct( $appctx, $innode, $parent, $textekeystring=null, $texte=null )
		{
		parent::__construct( $appctx, $innode, $parent ) ;
		$this->texte = $texte ;
		$this->textekeystring = $textekeystring ;
		}
	// Genere une vue associee en JS
	function pushJsView( $appctx )
		{
		$appctx->sendJs( "var t = cms.pushNodeView( new CmsLinkNode(), \"CmsLinkNode\", \"$this->id\", \"$this->idx\" ) ;" ) ;
		$appctx->sendJs( "t.setCurrentLangTexteModele( \"$this->textekeystring\" ) ;" ) ;
		}
	// Genere la balise d'entete
	function createDomHead( $appctx )
		{
		$style = "cmslink" ;
		if( $this->style ) $style = $this->style ;
		$config = "" ;
		if( array_key_exists( "config", $_GET ) ) $config = $_GET["config"] ;
		//$arguments = utf8_decode( $this->getArguments() ) ;
		$arguments = $this->getArguments() ;
		$appctx->PushIndent() ;
		$appctx->sendHtml( "<a id=\"$this->idx\" class=\"$style\" href=\"cmsloader.php5?config=$config&module=$this->moduletocall&arguments=$arguments\">" ) ;
		}
	// Genere le contenu
	function createDomValue( $appctx )
		{
		$appctx->sendHtml( "$this->texte" ) ;
		}
	// Genere la fin de balise
	function createDomEnd( $appctx )
		{
		$appctx->sendHtml( "</a>" ) ;
		$appctx->PopIndent() ;
		}				
	}

?>