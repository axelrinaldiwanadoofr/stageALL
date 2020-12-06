<?php
//////////////////////////////////////////////////////////
// cmspage.php
//
// Définition d'une page ou sous page du Cms
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/persistant.php" ) ;

class CmsPage extends Persistant
	{
	private static $scontroler = null ;

	function __construct( $appctx, $row )
		{
 		parent::__construct( $appctx, $row, self::createObjectControler( $appctx ) ) ;

 		// Initialise un nouvel objet
 		if( !$row )
 			{
			$this->initialevalues["url"] = "" ;
			$this->initialevalues["page"] = "" ;
			$this->initialevalues["module"] = "" ;
			$this->initialevalues["libelle"] = "" ;
			$this->copyInitialeValuesToValues() ;
			}
		}

	// Cree une chaine identifiante de l'objet
	public function getKeyString()
		{
		return "$this->url,$this->page" ;
		}

	// Cree une clé identifant l'objet
	public function getKey()
		{
		return array( "url" => "$this->url", "page" => "$this->page" ) ;
		}

	public static function createObjectControler( $appctx )
		{
 		if( !self::$scontroler )
		 	self::$scontroler = ObjectControler::createObjectControlerWithSqlTable( $appctx, "CmsPage", "cms_page", "url,page" ) ;
		return self::$scontroler ;
		}
	}
?>