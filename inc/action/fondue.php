<?php
//////////////////////////////////////////////////////////
// fondue.php
//
// Définition d'une fondue enchainee des noeuds fils du noeud cible
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class Fondue extends Action
	{
	var $width ;			// largeur des fils
	var $height ;			// hauteur des fils
	var $timepause ;  // temps de pause
	var $timefondue ; // temps de fondue
	var $actif ; 			// Declencheur

	function __construct( $idx, $id=-1, $libelle="", $w=0, $h=0,	$timepause=0, $timefondue=0, $z=20 )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->width = $w ;
		$this->height = $h ;
		$this->timepause = $timepause ;
		$this->timefondue = $timefondue ;
		$this->z = $z ;
		$this->actif = "onTimeout@onOpen@onClose" ;

		$this->property["width"] = "FLOAT" ;
		$this->property["height"] = "FLOAT" ;
		$this->property["timepause"] = "INT" ;
		$this->property["timefondue"] = "INT" ;
		$this->property["z"] = "INT" ;
		$this->property["actif"] = "TEXT" ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/fondue.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$appctx->Indent() ;
		echo( "actions.push( " ) ;
		echo( 	"new Fondue( \"$this->id\", " ) ;
		echo( 				"$this->width, $this->height, " ) ;
		echo( 				"$this->timepause, $this->timefondue, $this->z, " ) ;
		echo( 				"\"$this->actif\"" ) ;
		echo( 	" )" ) ;
		echo( " ) ; \n" ) ;
		}
	}

?>