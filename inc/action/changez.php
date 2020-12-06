<?php
//////////////////////////////////////////////////////////
// changez.php
//
// Modifie le z-index d'un noeud.php
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class ChangeZ extends Action
	{
	var $z ;	// Nouvelle valeur de z
	var $actif ;

	function __construct( $idx, $id=-1, $libelle="", $z, $actif="" )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->z = $z ;
		$this->actif = $actif ;

		$this->property["z"] = "INT" ;
		$this->property["actif"] = "TEXT" ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/changez.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$appctx->Indent() ;
		echo( "actions.push( \"$this->id\", " ) ;
		echo( 	"new ChangeZ( " ) ;
		echo( 				"$this->z, " ) ;
		echo( 				"\"$this->actif\"" ) ;
		echo( 	" )" ) ;
		echo( " ) ; \n" ) ;
		}
	}

?>