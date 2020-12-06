<?php
//////////////////////////////////////////////////////////
// propertylistevalue.php
//
// Définition des listes de valeurs pour les propriété dans Gestion
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/persistant.php" ) ;

class PropertyListeValue extends Persistant
	{
	private static $scontroler = null ;

	function __construct( $appctx, $row, $rubrique, $name )
		{
 		parent::__construct( $appctx, $row, self::createObjectControler( $appctx ) ) ;

 		// Initialise un nouvel objet
 		if( !$row )
 			{
			$this->initialevalues["rubrique"] = $rubrique ;
			$this->initialevalues["name"] = $name ;
			$this->initialevalues["value"] = "new" ;
			$this->initialevalues["libelle"] = "" ;
			$this->copyInitialeValuesToValues() ;
			}
		$this->controler->addObject( $this ) ;
		}

	public static function createObjectControler( $appctx )
		{
 		if( !self::$scontroler )
		 	self::$scontroler = ObjectControler::createObjectControlerWithSqlTable( $appctx, "PropertyListeValue", "propertylistevalue", "rubrique,name,value" ) ;
		return self::$scontroler ;
		}
	}
?>