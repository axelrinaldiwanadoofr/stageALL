<?php
//////////////////////////////////////////////////////////
// property.php
//
// Définition des propriétés dans Gestion d'article
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;

class Property extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "rubrique,name", "property" ) ;
		}
	}

class inProperty extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->name = "new" ;
			$this->type = "String" ;
			$this->listevalue = "0" ;
			$this->width = 5 ;
			$this->noordre = 999 ;
			}
		}
	}
?>