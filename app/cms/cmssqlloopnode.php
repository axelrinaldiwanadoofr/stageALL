<?php
//////////////////////////////////////////////////////////
// cmssqlloopnode.php
//
// Définition d'une boucle d'appel d'un module a partir 
// du resultat d'une requete SQL
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "app/cms/cmsnode.php" ) ;
require_once( "app/cms/cmsextendnode.php" ) ;

class CmsSqlLoopNode extends CmsExtendNode
	{	
	function __construct( $appctx, $fnode=null )
		{
 		parent::__construct( $appctx, "cms_sqlloopnode", $fnode ) ;
		}
	// Charge les CmsSqlLoolNode dont les id sont dans la liste $incondition
	public function loadNodes( $appctx, $incondition )
		{
		$sql = "select * from cms_sqlloopnode where ( id ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
		}
	}
class inCmsSqlLoopNode extends inCmsExtendNode
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{		
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		if( !$key )
			{
			$this->interligne = 0 ;
			}		
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
			$args[$a[0]] = $a[1] ;
			}
		
		// Applique les substitution d'argument sur la requete SQL
		if( $parentview ) $rsql = $parentview->computeValue( $this->rsql ) ;
		else $rsql = $this->rsql ;
				
		// Cree la vue
		$view = new vwCmsSqlLoopNode( $appctx, $this, $parentview ) ;
								
		$cursor = $appctx->db->buildCursor( $rsql ) ;
				
		while( $row = $cursor->fetchAssoc() )
			{
			// Met a jour les arguments a partir des champs de la requete
			foreach( $row as $field=>$value ) $args[$field] = $value ;
			// Reconstitue la chaine argumentaire
			$arguments = "" ;
			foreach( $args as $name=>$value ) 
				{
				if( $arguments == "" ) $arguments = "$name<argsep>$value" ;
				else $arguments .= "<arg>$name<argsep>$value" ;
				}
			// Cree les vues du module associe
			$rootnode->createAllViews( $appctx, $view, $arguments ) ;
			}
		return $view ;
		}		
	}
	
// Vue sur le noeud image	
class vwCmsSqlLoopNode extends vwCmsNode
	{
	function __construct( $appctx, $innode, $parent )
		{
		parent::__construct( $appctx, $innode, $parent ) ;
		}
	// Genere une vue associee en JS
	function pushJsView( $appctx )
		{
		$appctx->sendJs( "cms.pushNodeView( new CmsSqlLoopNode(), \"CmsSqlLoopNode\", \"$this->id\", \"$this->idx\" ) ;" ) ;
		}
	}

?>