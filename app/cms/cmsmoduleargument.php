<?php
//////////////////////////////////////////////////////////
// cmsmoduleargument.php
//
// Définition d'un argument de module du Cms
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class CmsModuleArgument extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "module,name", "cms_moduleargument" ) ;
		}
	}

class inCmsModuleArgument extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key ) 
			{
			$this->name = "new" ;
			$this->type = "int" ;
			}
		}
	}
?>