<?php
//////////////////////////////////////////////////////////
// langue.php
//
// Définition d'une langue
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class Langue extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "code", "langue" ) ;
		}
	}

class inLangue extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->code = "new" ;
			}
		}
	}
?>