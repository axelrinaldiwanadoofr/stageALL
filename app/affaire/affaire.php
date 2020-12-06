<?php
//////////////////////////////////////////////////////////
// affaire.php
//
// Définition d'une affaire
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class Affaire extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "affaire", "affaires" ) ;
		}
	}

class inAffaire extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->affaire = DbParametreInc( $appctx->db, "AFFAIRE", "numaffaire" ) ;
			$this->tva = "T19" ;
			$this->monaie1 = "EURO" ;
			$this->monaie2 = "EURO" ;
			}
		}
	}
?>