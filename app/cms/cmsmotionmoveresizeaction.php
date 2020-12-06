<?php
//////////////////////////////////////////////////////////
// cmsmotionmoveresizeaction.php
//
// Définition d'une action de mouvement et retaillage progressif
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "app/cms/cmsaction.php" ) ;
require_once( "app/cms/cmsextendaction.php" ) ;

class CmsMotionMoveResizeAction extends CmsExtendAction
	{	
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "cms_motionmoveresizeaction" ) ;
		}
	// Charge les actions dont les id sont dans la liste $incondition
	public function loadActions( $appctx, $incondition )
		{
		$sql = "select * from cms_motionmoveresizeaction where ( id ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
		}
	}
class inCmsMotionMoveResizeAction extends inCmsExtendAction
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{		
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->declencheur = "aucun" ;
			$this->time1 = -1 ;
			$this->x1 = "0" ;
			$this->y1 = "0" ;
			$this->z1 = "0" ;
			$this->width1 = 0 ;
			$this->height1 = 20 ;
			$this->opacity1 = 100 ;
			$this->time2 = -1 ;
			$this->x2 = 20 ;
			$this->y2 = 0 ;
			$this->z2 = 0 ;
			$this->width2 = 20 ;
			$this->height2 = 20 ;
			$this->opacity2 = 100 ;
			$this->time3 = -1 ;
			$this->x3 = 40 ;
			$this->y3 = 0 ;
			$this->z3 = 0 ;
			$this->width3 = 40 ;
			$this->height3 = 20 ;
			$this->opacity3 = 100 ;
			$this->time4 = -1 ;
			$this->x4 = 60 ;
			$this->y4 = 0 ;
			$this->z4 = 0 ;
			$this->width4 = 60 ;
			$this->height4 = 20 ;
			$this->opacity4 = 100 ;
			$this->time5 = -1 ;
			$this->x5 = 80 ;
			$this->y5 = 0 ;
			$this->z5 = 0 ;
			$this->width5 = 80 ;
			$this->height5 = 20 ;
			$this->opacity5 = 100 ;
			}
		}
	// Genere la vue sur l'action
	function createView( $appctx, $parentview, $arguments )
		{
		return new vwCmsMotionMoveResizeAction( $appctx, $this, $parentview ) ;
		}		
	}
	
// Vue sur l'action	
class vwCmsMotionMoveResizeAction extends vwCmsAction
	{
	function __construct( $appctx, $inaction, $parent )
		{
		parent::__construct( $appctx, $inaction, $parent ) ;
		}
	// Genere une vue associee en JS
	function pushJsView( $appctx )
		{
		$appctx->sendJs( "cms.pushActionView( new CmsMotionMoveResizeAction(), \"CmsMotionMoveResizeAction\", \"$this->id\" ) ;" ) ;
		}		
	}
	
?>