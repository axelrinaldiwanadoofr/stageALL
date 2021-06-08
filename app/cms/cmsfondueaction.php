<?php
//////////////////////////////////////////////////////////
// cmsfondueaction.php
//
// D�finition d'une action de gestion d'une fondue d'image
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "app/cms/cmsaction.php" ) ;
require_once( "app/cms/cmsextendaction.php" ) ;

class CmsFondueAction extends CmsExtendAction
{	
	function __construct( $appctx )
	{
 		parent::__construct( $appctx, "cms_fondueaction" ) ;
	}

	// Charge les actions dont les id sont dans la liste $incondition
	public function loadActions( $appctx, $incondition )
	{
		$sql = "select * from cms_fondueaction where ( id ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
	}
}

class inCmsFondueAction extends inCmsExtendAction
{
	function __construct( $appctx, $factory, $key=null, $row=null )
	{		
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
		{
			$this->timefondue = 100 ;
			$this->timepause = 300 ;
		}
	}

	// Genere la vue sur l'action
	function createView( $appctx, $parentview, $arguments )
	{
		return new vwCmsFondueAction( $appctx, $this, $parentview ) ;
	}		
}
	
// Vue sur le noeud image	
class vwCmsFondueAction extends vwCmsAction
{
	function __construct( $appctx, $inaction, $parent )
	{
		parent::__construct( $appctx, $inaction, $parent ) ;
	}

	// Genere une vue associee en JS
	function pushJsView( $appctx )
	{
		$appctx->sendJs( "cms.pushActionView( new CmsFondueAction(), \"CmsFondueAction\", \"$this->id\" ) ;" ) ;
	}		
}
	
?>