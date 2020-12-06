<?php
//////////////////////////////////////////////////////////
// tauxhoraire.php
//
// Définition d'un taux horaire
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class TauxHoraire extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "typetaux", "tauxhoraire" ) ;
		}
	}

class inTauxHoraire extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->typetaux = "new" ;
			$this->monaie = "EURO" ;
			}
		}
	}
?>