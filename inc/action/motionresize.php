<?php
//////////////////////////////////////////////////////////
// motionresize.php
//
// Définition d'un mouvement de redimensionnement
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class MotionResize extends Action
	{
	var $start_width ;		// largeur de depart
	var $start_height ;		// hauteur de depart
	var $start_z ;				// z de depart
	var $end_width ;			// largeur d'arrivee
	var $end_height ;			// hauteur d'arrivee
	var $end_z ;					// z d'arrivee
	var $time ;		  			// temps d'action en ms
	var $actif ;

	function __construct( $idx, $id=-1, $libelle="", $start_w=0, $start_h=0, $start_z=0, $end_w=0, $end_h=0, $end_z=100, $time=100, $actif="" )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->start_width = $start_w ;
		$this->start_height = $start_h ;
		$this->start_z = $start_z ;
		$this->end_width = $end_w ;
		$this->end_height = $end_h ;
		$this->end_z = $end_z ;
		$this->time = $time ;
		$this->actif = "onTimeout" . $actif ;

		$this->property["start_width"] = "FLOAT" ;
		$this->property["start_height"] = "FLOAT" ;
		$this->property["start_z"] = "FLOAT" ;
		$this->property["end_width"] = "FLOAT" ;
		$this->property["end_height"] = "FLOAT" ;
		$this->property["end_z"] = "FLOAT" ;
		$this->property["time"] = "FLOAT" ;
		$this->property["actif"] = "TEXT" ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/motionresize.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$appctx->Indent() ;
		echo( "actions.push( " ) ;
		echo( 	"new MotionResize( \"$this->id\", " ) ;
		echo( 				"$this->start_width, $this->start_height, $this->start_z, " ) ;
		echo( 				"$this->end_width, $this->end_height, $this->end_z, " ) ;
		echo( 				"$this->time, \"$this->actif\"" ) ;
		echo( 	" )" ) ;
		echo( " ) ; \n" ) ;
		}
	}

?>