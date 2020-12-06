<?php
//////////////////////////////////////////////////////////
// cmsfondueaction.php
//
// Définition d'une action de gestion d'une galerie d'image
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "app/cms/cmsaction.php" ) ;
require_once( "app/cms/cmsextendaction.php" ) ;

class CmsGalerieAction extends CmsExtendAction
	{	
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "cms_galerieaction" ) ;
		}
	// Charge les actions dont les id sont dans la liste $incondition
	public function loadActions( $appctx, $incondition )
		{
		$sql = "select * from cms_galerieaction where ( id ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
		}
	}
class inCmsGalerieAction extends inCmsExtendAction
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{		
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->width = 300 ;
			$this->height = 100 ;
			$this->widthview = 200 ;
			$this->countvisible = 1 ;
			$this->marge = 3 ;
			$this->xview = 150 ;
			$this->yview = 150 ;
			$this->heightview = 200 ;
			$this->timepause = 300 ;
			}
		}
	// Genere la vue sur l'action
	function createView( $appctx, $parentview, $arguments )
		{
		return new vwCmsGalerieAction( $appctx, $this, $parentview ) ;
		}		
	}
	
// Vue sur l'action	
class vwCmsGalerieAction extends vwCmsAction
	{
	function __construct( $appctx, $inaction, $parent )
		{
		parent::__construct( $appctx, $inaction, $parent ) ;
		}
	// Genere une vue associee en JS
	function pushJsView( $appctx )
		{
		$appctx->sendJs( "cms.pushActionView( new CmsGalerieAction(), \"CmsGalerieAction\", \"$this->id\" ) ;" ) ;
		}		
	}
	
?>