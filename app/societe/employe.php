<?php
//////////////////////////////////////////////////////////
// employe.php
//
// Définition d'un employe
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class Employe extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "matricule", "employes" ) ;
		}
	}

class inEmploye extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->matricule = DbParametreInc( $appctx->db, "EMPLOYE", "matricule" ) ;
			}
		}
	}
?>