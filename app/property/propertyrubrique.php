<?php
//////////////////////////////////////////////////////////
// propertyrubrique.php
//
// Définition des rubriques pour les propriété dans Gestion
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class PropertyRubrique extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "rubrique", "propertyrubrique" ) ;
		}
	}

class inPropertyRubrique extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->rubrique = "new" ;
			$this->noordre = 999 ;
			}
		}
	}
?>