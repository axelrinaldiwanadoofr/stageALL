<?php
//////////////////////////////////////////////////////////
// motionpoint2point.php
//
// Définition d'un mouvement uniformement accelere
// d'un point a un autre.
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class MotionPoint2Point extends Action
	{
	var $start_x ;		// X point de depart
	var $start_y ;		// Y point de depart
	var $end_x ;			// X point d'arrivee
	var $end_y ;			// Y point d'arrivee
	var $time ;  			// Temps de deplacement en ms
	var $actif ;			// 1 actif sur on_open, 2 actif sur on_close

	function __construct( $idx, $id=-1, $libelle="", $start_x=0, $start_y=0, $end_x=0, $end_y=0, $time=1, $actif="" )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->start_x = $start_x ;		// X point de depart
		$this->start_y = $start_y ;		// Y point de depart
		$this->end_x = $end_x ;		// X point d'arrivee
		$this->end_y = $end_y ;		// Y point d'arrivee
		$this->time = $time ;  // Temps de deplacement
		if( $actif ) $this->actif = "onTimeout@" . $actif ;
		else $this->actif = "onTimeout" ;

		$this->property["start_x"] = "FLOAT" ;
		$this->property["start_y"] = "FLOAT" ;
		$this->property["end_x"] = "FLOAT" ;
		$this->property["end_y"] = "FLOAT" ;
		$this->property["time"] = "FLOAT" ;
		$this->property["actif"] = "TEXT" ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/motionpoint2point.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$appctx->Indent() ;
		echo( "actions.push( " ) ;
		echo( 	"new MotionPoint2Point( \"$this->id\", " ) ;
		echo( 				"$this->start_x, $this->start_y, " ) ;
		echo( 				"$this->end_x, $this->end_y, " ) ;
		echo( 				"$this->time, " ) ;
		echo( 				"\"$this->actif\"" ) ;
		echo( 	" )" ) ;
		echo( " ) ; \n" ) ;
		}
	}

?>