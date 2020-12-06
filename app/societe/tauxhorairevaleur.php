<?php
//////////////////////////////////////////////////////////
// tauxhorairevaleur.php
//
// Définition d'un taux horaire
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class TauxHoraireValeur extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "typetaux,debut,fin", "tauxhorairevaleur" ) ;
		}
	}

class inTauxHoraireValeur extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->taux_normal = 0 ;
			$this->debut = "2011-01-01" ;
			$this->fin = "2011-12-31" ;
			$this->taux_10 = 0 ;
			$this->taux_25 = 0 ;
			$this->taux_50 = 0 ;
			$this->taux_100 = 0 ;
			}
		}
	}
?>