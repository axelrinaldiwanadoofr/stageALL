<?php
//////////////////////////////////////////////////////////
// unite.php
//
// Définition d'une unite
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class Unite extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "unite", "unites" ) ;
		}
	}

class inUnite extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->unite = "new" ;
			$this->coefficient = 1 ;
			}
		}
	}
?>