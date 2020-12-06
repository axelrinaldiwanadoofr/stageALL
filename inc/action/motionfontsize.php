<?php
//////////////////////////////////////////////////////////
// motionfontsize.php
//
// Définition d'un chanement progressif de taille de police de caractere
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class MotionFontSize extends Action
	{
	var $start_size ;			// taille de depart
	var $start_z ;				// z de depart
	var $end_size ;				// taille d'arrivee
	var $end_z ;					// z d'arrivee
	var $time ;		  			// temps d'action en ms
	var $actif ;

	function __construct( $idx, $id=-1, $libelle="", $start_size=0, $start_z=0, $end_size=0, $end_z=100, $time=100, $actif="" )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->start_size = $start_size ;
		$this->start_z = $start_z ;
		$this->end_size = $end_size ;
		$this->end_z = $end_z ;
		$this->time = $time ;
		$this->actif = "onTimeout" . $actif ;

		$this->property["start_size"] = "FLOAT" ;
		$this->property["start_z"] = "FLOAT" ;
		$this->property["end_size"] = "FLOAT" ;
		$this->property["end_z"] = "FLOAT" ;
		$this->property["time"] = "FLOAT" ;
		$this->property["actif"] = "TEXT" ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/motionfontsize.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$appctx->Indent() ;
		echo( "actions.push( " ) ;
		echo( 	"new MotionFontSize( \"$this->id\", " ) ;
		echo( 				"$this->start_size, $this->start_z, " ) ;
		echo( 				"$this->end_size, $this->end_z, " ) ;
		echo( 				"$this->time, \"$this->actif\"" ) ;
		echo( 	" )" ) ;
		echo( " ) ; \n" ) ;
		}
	}

?>