<?php
//////////////////////////////////////////////////////////
// cmsmoduleversion.php
//
// Définition d'une version de module du Cms
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

//echo( "load cmsmoduleversion" ) ;

class CmsModuleVersion extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "module,version", "cms_moduleversion" ) ;
		}
	}

class inCmsModuleVersion extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key ) 
			{
			$module = $row["module"] ;
			$this->version = DbMax( $appctx->db, "cms_moduleversion", "version", "module='$module'" ) + 1 ;
			$this->actif = 1 ;
			}
		}
	}
?>