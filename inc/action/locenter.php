<?php
//////////////////////////////////////////////////////////
// locenter.php
//
// Gestionnaire de positionnement au centre
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class LoCenter extends Action
	{
	var $actif ;
	var $x ;
	var $y ;

	function __construct( $idx, $id=-1, $libelle="", $x=0, $y=0, $actif="onOpen@onResize" )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->actif = $actif ;
		$this->x = $x ;
		$this->y = $y ;
		$this->property["x"] = "INT" ;
		$this->property["y"] = "INT" ;
		$this->property["actif"] = "TEXT" ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/locenter.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$appctx->Indent() ;
		echo( "actions.push( " ) ;
		echo( 	"new LoCenter( \"$this->id\", $this->x, $this->y " ) ;
		echo( 	" )" ) ;
		echo( " ) ; \n" ) ;
		}
	}

?>