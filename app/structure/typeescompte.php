<?php
//////////////////////////////////////////////////////////
// typeescomptes.php
//
// Définition d'un type d'escompte
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class TypeEscompte extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "typeescompte", "typeescomptes" ) ;
		}
	}

class inTypeEscompte extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->typeescompte = "new" ;
			}
		}
	}
?>