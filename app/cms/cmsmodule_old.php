<?php
//////////////////////////////////////////////////////////
// cmsmodule.php
//
// Définition d'un module ou sous page du Cms
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/persistant.php" ) ;

class CmsModule extends Persistant
	{
	private static $scontroler = null ;

	function __construct( $appctx, $row )
		{
 		parent::__construct( $appctx, $row, self::createObjectControler( $appctx ) ) ;

 		// Initialise un nouvel objet
 		if( !$row )
 			{
			$this->initialevalues["module"] = "" ;
			$this->initialevalues["libelle"] = "" ;
			$this->copyInitialeValuesToValues() ;
			}
		}

	// Cree une chaine identifiante de l'objet
	public function getKeyString()
		{
		return "$this->module" ;
		}

	// Cree une clé identifant l'objet
	public function getKey()
		{
		return array( "module" => "$this->module" ) ;
		}

	public static function createObjectControler( $appctx )
		{
 		if( !self::$scontroler )
		 	self::$scontroler = ObjectControler::createObjectControlerWithSqlTable( $appctx, "CmsModule", "cms_module", "module" ) ;
		return self::$scontroler ;
		}
	}
?>