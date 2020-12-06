<?php
//////////////////////////////////////////////////////////
// cmspauseaction.php
//
// Définition d'une action de delais d'attente
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "app/cms/cmsextendaction.php" ) ;

class CmsPauseAction extends CmsExtendAction
	{	
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "cms_pauseaction" ) ;
		}
	// Charge les actions dont les id sont dans la liste $incondition
	public function loadActions( $appctx, $incondition )
		{
		$sql = "select * from cms_pauseaction where ( id ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
		}
	}
class inCmsPauseAction extends inCmsExtendAction
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{		
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		}
	}
?>