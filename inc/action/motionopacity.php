<?php
//////////////////////////////////////////////////////////
// motionopacity.php
//
// Définition d'un chanement progressif d'opacite
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class MotionOpacity extends Action
	{
	var $start_opacity ;	// opacite de depart
	var $end_opacity ;		// opacite de fin
	var $v_opacity ;  		// vitesse de changement d'opacite
	var $actif ;

	function __construct( $idx, $id=-1, $libelle="", $start_opacity=0, $end_opacity=0, $v_opacity=0, $allchild=0, $actif="" )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->start_opacity = $start_opacity ;
		$this->end_opacity = $end_opacity ;
		$this->v_opacity = $v_opacity ;
		$this->allchild = $allchild ;
		$this->actif = "onTimeout " . $actif ;

		$this->property["start_opacity"] = "FLOAT" ;
		$this->property["end_opacity"] = "FLOAT" ;
		$this->property["v_opacity"] = "FLOAT" ;
		$this->property["allchild"] = "INT" ;
		$this->property["actif"] = "TEXT" ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/motionopacity.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$appctx->Indent() ;
		echo( "actions.push( " ) ;
		echo( 	"new MotionOpacity( \"$this->id\", " ) ;
		echo( 				"$this->start_opacity, $this->end_opacity, $this->v_opacity, " ) ;
		echo( 				"$this->allchild, \"$this->actif\"" ) ;
		echo( 	" )" ) ;
		echo( " ) ; \n" ) ;
		}
	}

?>