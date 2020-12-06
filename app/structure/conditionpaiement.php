<?php
//////////////////////////////////////////////////////////
// conditionpaiement.php
//
// Définition d'une condition de payement
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class ConditionPaiement extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "conditionp", "conditionpaiement" ) ;
		}
	}

class inConditionPaiement extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->conditionp = "new" ;
			$this->nbjour = 0 ;
			$this->nbmois = 0 ;
			$this->jour = 0 ;
			$this->finmois = 0 ;
			}
		}
	}
?>