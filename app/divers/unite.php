<?php
//////////////////////////////////////////////////////////
// unite.php
//
// Définition d'une unité dans Gestion
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/persistant.php" ) ;

class Unite extends Persistant
	{
	private static $scontroler = null ;

	function __construct( $appctx, $row )
		{
 		parent::__construct( $appctx, $row, self::createObjectControler( $appctx ) ) ;

 		// Initialise un nouvel objet
 		if( !$row )
 			{
			$this->initialevalues["unite"] = "new" ;
			$this->initialevalues["libelle"] = "" ;
			$this->initialevalues["reference"] = null ;
			$this->initialevalues["coefficient"] = 0.0 ;
			$this->copyInitialeValuesToValues() ;
			}
		$this->controler->addObject( $this ) ;
		}

	public static function createObjectControler( $appctx )
		{
 		if( !self::$scontroler )
		 	self::$scontroler = ObjectControler::createObjectControlerWithSqlTable( $appctx, "Unite", "unites", "unite" ) ;
		return self::$scontroler ;
		}
	}
?>