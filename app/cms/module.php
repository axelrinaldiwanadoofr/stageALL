<?php
//////////////////////////////////////////////////////////
// module.php
//
// Definition d'un noeud module permettant
// de charger un sous ensemble de noeud
// Ne correspond a aucune balise du DOM
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/cms/node.php" ) ;

class Module extends Node
	{
	var $module ;	 // Nom du module a charger, fait reference au modele
	var $argument ; // si vrai alors le nom du module est cherche dans l'argument de nom module

	function __construct( &$cms, $dbfields )
		{
		parent::__construct( $cms, $dbfields ) ;
		$this->module = $dbfields["module"] ;
		$this->argument = $dbfields["argument"] ;
		}

	// Genere une instance de Label
	function buildNodeInstance( &$cms, $parent )
		{
		$mi = new ModuleInstance( $cms, $this, $parent ) ;

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

class ModuleInstance extends NodeInstance
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

