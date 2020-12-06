<?php
//////////////////////////////////////////////////////////
// property.php
//
// Définition d'un type de propriété dans Gestion
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/persistant.php" ) ;

class PropertyType extends Persistant
	{
	private static $scontroler = null ;

	function __construct( $appctx, $row )
		{
 		parent::__construct( $appctx, $row, self::createObjectControler( $appctx ) ) ;

 		// Initialise un nouvel objet
 		if( !$row )
 			{
			$this->initialevalues["type"] = "new" ;
			$this->initialevalues["libelle"] = "" ;
			$this->initialevalues["image"] = "" ;
			$this->initialevalues["objectclassname"] = "" ;
			$this->copyInitialeValuesToValues() ;
			}
		$this->controler->addObject( $this ) ;
		}

	public static function createObjectControler( $appctx )
		{
 		if( !self::$scontroler )
		 	self::$scontroler = ObjectControler::createObjectControlerWithSqlTable( $appctx, "PropertyType", "propertytype", "type" ) ;
		return self::$scontroler ;
		}
	}
?>