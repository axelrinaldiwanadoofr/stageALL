<?php
//////////////////////////////////////////////////////////
// site.php
//
// Définition d'un site d'une societe
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class Site extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "societe,site", "sites" ) ;
		}
	}

class inSite extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->site = "new" ;
			$this->pays = "FRANCE" ;
			}
		}
	}
?>