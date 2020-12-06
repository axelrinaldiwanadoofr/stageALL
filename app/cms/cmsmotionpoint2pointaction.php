<?php
//////////////////////////////////////////////////////////
// cmsmotionpoint2pointaction.php
//
// Définition d'une action deplacement progressif 
// d'un point a un autre
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "app/cms/cmsextendaction.php" ) ;

class CmsMotionPoint2PointAction extends CmsExtendAction
	{	
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "cms_motionpoint2pointaction" ) ;
		}
	// Charge les actions dont les id sont dans la liste $incondition
	public function loadActions( $appctx, $incondition )
		{
		$sql = "select * from cms_motionpoint2pointaction where ( id ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
		}
	}
class inCmsMotionPoint2PointAction extends inCmsExtendAction
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{		
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		}
	}
?>