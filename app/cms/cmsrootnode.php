<?php
//////////////////////////////////////////////////////////
// cmsrootnode.php
//
// Définition d'un noeud racine pour les versions de 
// module de CMS
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "app/cms/cmsnode.php" ) ;
require_once( "app/cms/cmsextendnode.php" ) ;

class CmsRootNode extends CmsExtendNode
	{
	function __construct( $appctx, $fnode=null )
		{
 		parent::__construct( $appctx, "cms_rootnode", $fnode ) ;
		}
	// Charge les CmsRootNode dont les id sont dans la liste $incondition
	public function loadNodes( $appctx, $incondition )
		{
		$sql = "select * from cms_rootnode where ( id ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
		}		
	}
class inCmsRootNode extends inCmsExtendNode
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{		
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		}
	// Genere la vue sur le noeud
	function createView( $appctx, $parentview, $arguments )
		{
		return new vwCmsRootNode( $appctx, $this, $parentview, $arguments ) ;
		}				
	}

// Vue sur le noeud image	
class vwCmsRootNode extends vwCmsNode
	{
	protected $arguments ;
	
	function __construct( $appctx, $innode, $parent, $arguments )
		{
		parent::__construct( $appctx, $innode, $parent ) ;
		$this->arguments = $arguments ;
		}
	// Renvoie la chaine argumentaire
	function getArguments()
		{
		return $this->arguments ;
		}
	// Genere une vue associee en JS
	function pushJsView( $appctx )
		{
		$arguments = utf8_encode( $this->arguments ) ;
		$arguments = str_replace( "\x0a", "", $arguments ) ;
		$arguments = str_replace( "\x5c", "", $arguments ) ;
		$arguments = str_replace( "\x22", "\x5c\x22", $arguments ) ;

		$appctx->sendJs( "cms.pushNodeView( new CmsRootNode( \"$arguments\" ), \"CmsRootNode\", \"$this->id\", \"$this->idx\" ) ;" ) ;
		}
	// Calcule une valeur a partir des arguements
	function computeValue( $value )
		{
		// Explode la chaine argumentaire en un tableau d'argument
		$targs = explode( "<arg>", $this->arguments ) ;
		foreach( $targs as $n=>$arg )
			{
			$a = explode( "<argsep>", $arg ) ;
			if( count( $a ) > 1 ) $value = str_replace( "arg.$a[0]", $a[1], $value ) ;
			}
		if( $this->parent ) return $this->parent->computeValue( $value ) ;
		else return $value ;
		}		
	}

?>