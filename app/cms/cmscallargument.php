<?php
//////////////////////////////////////////////////////////
// cmscallarguement.php
//
// Définition d'un arguement pour un appel de module
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class CmsCallArgument extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "id,name", "cms_callargument" ) ;
		}
	}
class inCmsCallArgument extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
				
		if( !$key ) 
			{
			$this->name = "new" ;
			}
		}
	}
?>