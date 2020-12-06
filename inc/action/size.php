<?php
//////////////////////////////////////////////////////////
// size.php
//
// Fixe la taille d'un element
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class Size extends Action
	{
	var $width ;	// Largeur
	var $height ;	// Hauteur
	var $actif ;

	function __construct( $idx, $id=-1, $libelle="", $width=0, $height=0, $actif="onOpen" )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->width = $width ;
		$this->height = $height ;
		$this->actif = $actif ;

		$this->property["width"] = "FLOAT" ;
		$this->property["height"] = "FLOAT" ;
		$this->property["actif"] = "TEXT" ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/size.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$appctx->Indent() ;
		echo( "actions.push( " ) ;
		echo( 	"new Size( \"$this->id\", " ) ;
		echo( 				"$this->width, $this->height, " ) ;
		echo( 				"\"$this->actif\"" ) ;
		echo( 	" )" ) ;
		echo( " ) ; \n" ) ;
		}
	}

?>