<?php
//////////////////////////////////////////////////////////
// cmsreference.php
//
// Definition d'un noeud module permettant
// de charger un sous ensemble de noeud
// Ne correspond a aucune balise du DOM
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/cms/cmsnode.php" ) ;

class CmsReference extends CmsNode
	{
	protected $module ;	 // Nom du module a charger, fait reference au modele
	protected $argument ; // si vrai alors le nom du module est cherche dans l'argument de nom module

	private static $scontroler = null ;

	function __construct( $appctx, $row )
		{
 		parent::__construct( $appctx, $row, self::createObjectControler( $appctx ) ) ;

		if( !$row )
			{
			$this->initialevalues["style"] = "cmsreference" ;
			$this->initialevalues["module"] = "" ;
			$this->initialevalues["argument"] = "" ;
			$this->copyInitialeValuesToValues() ;
			}
		}

	public static function createObjectControler( $appctx )
		{
 		if( !self::$scontroler )
		 	self::$scontroler = ObjectControler::createObjectControlerWithSqlTable( $appctx, "CmsReference", "cms_reference", "url,page,id" ) ;
		return self::$scontroler ;
		}

	// Genere une instance de Label
	function buildNodeInstance( $cms, $parent )
		{
		$mi = new CmsReferenceInstance( $cms, $this, $parent ) ;

		// Charge les noeuds fils du module
		if( $this->module != "" )
			{
			$module = $cms->loadPageFromDB( $this->module ) ;
			$ci = $module->buildAllNodeInstance( $cms, $mi ) ;
			$mi->addChild( $ci ) ;
			}
		return $mi ;
		}
	}

class CmsReferenceInstance extends CmsNodeInstance
	{
	var $module ;	 // Nom du module a charger, fait reference au modele
	var $argument ; // si vrai alors le nom du module est cherche dans l'argument de nom module

	function __construct( &$cms, &$module, &$parent )
		{
		parent::__construct( $cms, $module, $parent ) ;
		$this->module = $module->module ;
		$this->argument = $module->argument ;
		}
	}

?>