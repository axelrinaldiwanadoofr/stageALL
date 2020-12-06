<?php
//////////////////////////////////////////////////////////
// structure.php
//
// Définition des structures dans Gestion
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class Structure extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "sid", "structures" ) ;
		}
	}

class inStructure extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->sid = DbParametreInc( $appctx->db, "STRUCTURE", "sid" ) ;
			$this->nature = "CLIENT" ;
			}
		}
	}
?>