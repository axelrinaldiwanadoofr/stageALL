<?php
//////////////////////////////////////////////////////////
// cmsarticlenode.php
//
// Définition d'un appel de module a partir 
// d'un article
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "app/cms/cmsnode.php" ) ;
require_once( "app/cms/cmsextendnode.php" ) ;

class CmsArticleNode extends CmsExtendNode
	{	
	function __construct( $appctx, $fnode=null )
		{
 		parent::__construct( $appctx, "cms_articlenode", $fnode ) ;
		}
	// Charge les CmsCallNode dont les id sont dans la liste $incondition
	public function loadNodes( $appctx, $incondition )
		{
		$sql = "select * from cms_articlenode where ( id ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
		}
	}
class inCmsArticleNode extends inCmsExtendNode
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{		
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		}
	// Genere la vue sur le noeud
	function createView( $appctx, $parentview, $arguments )
		{
		// Charge le module associe
		$fnode = $this->factory->getBaseFactory() ;
		$fnode->loadModule( $appctx, $this->moduletocall ) ;
		$rootnode = $fnode->getRootNodeForModule( $this->moduletocall ) ;
			
		// Execute la requete SQL et cree autant de vue que de lignes
		// ramenee par la requete.
				
		// Explode la chaine argumentaire en un tableau d'argument
		$targs = explode( "<arg>", $this->arguments ) ;
		$args = array() ;
		foreach( $targs as $n=>$arg )
			{
			$a = explode( "<argsep>", $arg ) ;
			if( count( $a ) > 1 ) $args[$a[0]] = $a[1] ;
			}
				
		if( $parentview ) $reference = $parentview->computeValue( $this->reference ) ;
		else $reference = $this->reference ;
				
		// Cree la vue
		$view = new vwCmsArticleNode( $appctx, $this, $parentview ) ;
		
		// Cherche l'article dont la reference est donnee dans $reference
		$cursor = $appctx->db->buildCursor( "select * from articles where reference='$reference'" ) ;

		if( $row = $cursor->fetchAssoc() )
			{
			// Met a jour les arguments a partir des champs de l'article
			foreach( $row as $field=>$value ) $args[$field] = $value ;
				
			// Recherche les proprietes ap_string de l'article
			$cursor = $appctx->db->buildCursor( "select rubrique,name,value from ap_string where reference='$reference'" ) ;
			while( $row = $cursor->fetchAssoc() )
				{
				$args[$row["rubrique"] . "." . $row["name"]] = $row["value"] ;
				}

			// Recherche les proprietes ap_texte de l'article
			$cursor = $appctx->db->buildCursor( "select rubrique,name,texte from ap_texte where reference='$reference'" ) ;
			while( $row = $cursor->fetchAssoc() )
				{
				$args[$row["rubrique"] . "." . $row["name"]] = $row["texte"] ;
				}
					
			// Recherche les proprietes ap_refarticle de l'article
			$cursor = $appctx->db->buildCursor( "select rubrique,name,article from ap_refarticle where reference='$reference'" ) ;
			while( $row = $cursor->fetchAssoc() )
				{
				$args[$row["rubrique"] . "." . $row["name"]] = $row["article"] ;
				}
					
			// Reconstitue la chaine argumentaire
			$arguments = "" ;
			foreach( $args as $name=>$value ) 
				{
				if( $arguments == "" ) $arguments = "$name<argsep>$value" ;
				else $arguments .= "<arg>$name<argsep>$value" ;
				}		
			}
			
		// Cree les vue filles du module associe
		$rootnode->createAllViews( $appctx, $view, $arguments ) ;
			
		return $view ;
		}		
	}
	
// Vue sur le noeud image	
class vwCmsArticleNode extends vwCmsNode
	{
	function __construct( $appctx, $innode, $parent )
		{
		parent::__construct( $appctx, $innode, $parent ) ;
		}
	// Genere une vue associee en JS
	function pushJsView( $appctx )
		{
		$appctx->sendJs( "cms.pushNodeView( new CmsArticleNode(), \"CmsArticleNode\", \"$this->id\", \"$this->idx\" ) ;" ) ;
		}
	}

?>