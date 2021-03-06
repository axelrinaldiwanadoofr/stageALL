<?php
//////////////////////////////////////////////////////////
// tvataux.php
//
// Définition d'un taux de TVA
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class TvaTaux extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "tva", "tvataux" ) ;
		}
	}

class inTvaTaux extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->tva = "new" ;
			$this->taux = 0.0 ;
			}
		}
	}
?>