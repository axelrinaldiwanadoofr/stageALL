<?php
//////////////////////////////////////////////////////////
// structureadresse.php
//
// Définition d'une adresse de structure dans Gestion
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class StructureAdresse extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "sid,typeadresse", "structureadresses" ) ;
		}
	}

class inStructureAdresse extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->typeadresse = "new" ;
			$this->pays = "FRANCE" ;
			$this->principal = 1 ;
			}
		}
	}
?>