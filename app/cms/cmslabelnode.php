<?php
//////////////////////////////////////////////////////////
// cmslabelnode.php
//
// Définition d'un noeud label du CMS
// Texte multi-langue
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "app/cms/cmsnode.php" ) ;
require_once( "app/cms/cmsextendnode.php" ) ;

class CmsLabelNode extends CmsExtendNode
	{	
	function __construct( $appctx, $fnode=null )
		{
 		parent::__construct( $appctx, "cms_labelnode", $fnode ) ;
		}
	// Charge les CmsLabelNode dont les id sont dans la liste $incondition
	public function loadNodes( $appctx, $incondition )
		{
		$sql = "select * from cms_labelnode where ( id ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
		
		$flabeltexte = new CmsLabelTexte( $appctx ) ;
		$flabeltexte->loadTextes( $appctx, $incondition ) ;
		$flabeltexte->addLabelTextes2Nodes( $this->objects ) ;
		}
	// Cree une copie de l'objet en mettant à jour les champs non créé par le constructeur à partir de ceux de l'original
	public function copyObject( $appctx, $original, $row = null )
		{
		$values = array() ;
		foreach( $original->values as $field=>$value ) $values[$field] = $value ;
		foreach( $original->node->values as $field=>$value ) $values[$field] = $value ;
		if( $row ) foreach( $row as $field=>$value ) $values[$field] = $value ;
		
		$object = $this->createNewObject( $appctx, $values ) ;
		$original->copyLabelTexteInTo( $appctx, $object ) ;
		return $object ;
		}				
	}
class inCmsLabelNode extends inCmsExtendNode
	{
	protected $labeltextes ;
	
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
	// Copy les textes dans un autre labelnode
	function copyLabelTexteInTo( $appctx, $labelnode )
		{
		$row = array() ;
		$row["id"] = $labelnode->id ;
		foreach( $this->labeltextes as $lang=>$labeltexte )
			{
			$row["lang"] = $lang ;
			$new_labeltexte = $labeltexte->createCopy( $appctx, $row ) ;
			$labelnode->addLabelTexte( $lang, $new_labeltexte ) ;
			}
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
	
	// Enregistre le labelnode et ses labeltextes
	public function save()
		{
		$ok = parent::save() ;
		
		// Enregistre les textes
		foreach( $this->labeltextes as $lang=>$labeltexte )
			{
			$labeltexte->save() ;
			}		
		return $ok ;
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
		return new vwCmsLabelNode( $appctx, $this, $parentview, $textekeystring, $texte ) ;
		}		
	}
	
// Vue sur le noeud texte
class vwCmsLabelNode extends vwCmsNode
	{
	protected $texte ;
	protected $textekeystring ;
	
	function __construct( $appctx, $innode, $parent, $textekeystring, $texte )
		{
		parent::__construct( $appctx, $innode, $parent ) ;
		$this->texte = $texte ;
		$this->textekeystring = $textekeystring ;
		}
	// Genere une vue associee en JS
	function pushJsView( $appctx )
		{
		$appctx->sendJs( "var t = cms.pushNodeView( new CmsLabelNode(), \"CmsLabelNode\", \"$this->id\", \"$this->idx\" ) ;" ) ;
		$appctx->sendJs( "t.setCurrentLangTexteModele( \"$this->textekeystring\" ) ;" ) ;
		}
	// Genere la balise d'entete
	function createDomHead( $appctx )
		{
		$style = "cmslabel" ;
		if( $this->style ) $style = $this->style ;
		$appctx->PushIndent() ;
		$appctx->sendHtml( "<span id=\"$this->idx\" class=\"$style\" >" ) ;
		}
	// Genere le contenu
	function createDomValue( $appctx )
		{
		$appctx->sendHtml( "$this->texte" ) ;
		}
	// Genere la fin de balise
	function createDomEnd( $appctx )
		{
		$appctx->sendHtml( "</span>" ) ;
		$appctx->PopIndent() ;
		}		
	}
	

?>