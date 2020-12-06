<?php
//////////////////////////////////////////////////////////
// pays.php
//
// Définition d'un pays
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class Pays extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "pays", "pays" ) ;
		}
	}

class inPays extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->pays = "new" ;
			}
		}
	}
?>