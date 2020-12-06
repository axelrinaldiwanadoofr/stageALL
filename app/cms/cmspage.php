<?php
//////////////////////////////////////////////////////////
// cmspage.php
//
// Définition d'une page ou sous page du Cms
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class CmsPage extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "page", "cms_page" ) ;		
		}
	}
class inCmsPage extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key ) 
			{
			$this->page = "new" ;
			}
		}
	}
?>