<?php
//////////////////////////////////////////////////////////
// structurecontact.php
//
// Définition d'un contact de structure dans Gestion
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class StructureContact extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "contact", "structurecontacts" ) ;
		}
	}

class inStructureContact extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->contact = DbParametreInc( $appctx->db, "STRUCTURE", "contact" ) ; ;
			$this->civilite = "Monsieur" ;
			$this->principal = 1 ;
			}
		}
	}
?>