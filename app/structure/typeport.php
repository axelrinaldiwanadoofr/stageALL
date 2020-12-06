<?php
//////////////////////////////////////////////////////////
// typeport.php
//
// Définition d'un type de port
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class TypePort extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "type", "typeport" ) ;
		}
	}

class inTypePort extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->type = "new" ;
			}
		}
	}
?>