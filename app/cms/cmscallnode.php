<?php
//////////////////////////////////////////////////////////
// cmscallnode.php
//
// D�finition d'un noeud d'appel d'un module
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "app/cms/cmsnode.php" ) ;
require_once( "app/cms/cmsextendnode.php" ) ;

class CmsCallNode extends CmsExtendNode
{	
	function __construct( $appctx, $fnode=null )
	{
 		parent::__construct( $appctx, "cms_callnode", $fnode ) ;
	}

	// Charge les CmsCallNode dont les id sont dans la liste $incondition
	public function loadNodes( $appctx, $incondition )
	{
		$sql = "select * from cms_callnode where ( id ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
	}
}

class inCmsCallNode extends inCmsExtendNode
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
			
		// Cree la vue 
		$view = new vwCmsCallNode( $appctx, $this, $parentview ) ;
		// Cree les vues du module associe
		$rootnode->createAllViews( $appctx, $view, $arguments ) ;
		return $view ;
	}		
}
	
// Vue sur le noeud image	
class vwCmsCallNode extends vwCmsNode
{
	function __construct( $appctx, $innode, $parent )
	{
		parent::__construct( $appctx, $innode, $parent ) ;
	}

	// Genere une vue associee en JS
	function pushJsView( $appctx )
	{
		$appctx->sendJs( "cms.pushNodeView( new CmsCallNode(), \"CmsCallNode\", \"$this->id\", \"$this->idx\" ) ;" ) ;
	}
}

?>