<?php
//////////////////////////////////////////////////////////
// societe.php
//
// Définition d'une societe
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class Societe extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "societe", "societes" ) ;
		}
	}

class inSociete extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->societe = DbParametreInc( $appctx->db, "SOCIETE", "societe" ) ;
			$this->rs = "new" ;
			$this->monaieref = "EURO" ;
			$this->stockmode = "NO" ;
			$this->stocknegatif = "0" ;
			}
		}
	}
?>