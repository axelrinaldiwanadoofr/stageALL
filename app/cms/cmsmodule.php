<?php
//////////////////////////////////////////////////////////
// cmsmodule.php
//
// Définition d'un module du Cms
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class CmsModule extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "module", "cms_module" ) ;		
		}
	}
	
class inCmsModule extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key ) 
			{
			$this->module = "new" ;
			}
		}
	}
?>