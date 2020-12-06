<?php
//////////////////////////////////////////////////////////
// translate.php
//
// Translate un noeud et ses fils
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class Translate extends Action
	{
	var $x ;	// X
	var $y ;	// Y
	var $actif ;

	function __construct( $idx, $id=-1, $libelle="", $x=0, $y=0, $actif="onOpen" )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->x = $x ;
		$this->y = $y ;
		$this->actif = $actif ;

		$this->property["x"] = "FLOAT" ;
		$this->property["y"] = "FLOAT" ;
		$this->property["actif"] = "TEXT" ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/translate.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$appctx->Indent() ;
		echo( "actions.push( " ) ;
		echo( 	"new Translate( \"$this->id\", " ) ;
		echo( 				"$this->x, $this->y, " ) ;
		echo( 				"\"$this->actif\"" ) ;
		echo( 	" )" ) ;
		echo( " ) ; \n" ) ;
		}
	}

?>