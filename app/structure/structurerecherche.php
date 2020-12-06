<?php
//////////////////////////////////////////////////////////
// structurerecherche.php
//
// Définition d'une recherche de structure dans Gestion
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class StructureRecherche extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "recherche", "structurerecherche" ) ;
		}
	}

class inStructureRecherche extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->recherche = "new" ;
			$this->rsqlwhere = "1" ;
			}
		}
	}
?>