<?php
//////////////////////////////////////////////////////////
// motionpause.php
//
// Cree une pause dans un mouvement
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class MotionPause extends Action
	{
	var $time_pause ;	// temps de pause
	var $actif ;

	function __construct( $idx, $id=-1, $libelle="", $time_pause=0, $actif="" )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->time_pause = $time_pause ;
		$this->actif = "onTimeout " . $actif ;

		$this->property["time_pause"] = "FLOAT" ;
		$this->property["actif"] = "TEXT" ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/motionpause.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$appctx->Indent() ;
		echo( "actions.push( " ) ;
		echo( 	"new MotionPause( \"$this->id\", " ) ;
		echo( 				"$this->time_pause, " ) ;
		echo( 				"\"$this->actif\"" ) ;
		echo( 	" )" ) ;
		echo( " ) ; \n" ) ;
		}
	}

?>