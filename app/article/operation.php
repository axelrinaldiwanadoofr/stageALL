<?php
//////////////////////////////////////////////////////////
// operation.php
//
// Définition d'une operation
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class Operation extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "operation", "operations" ) ;
		}
	}

class inOperation extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->operation = "new" ;
			}
		}
	}
?>