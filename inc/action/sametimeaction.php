<?php
//////////////////////////////////////////////////////////
// sequence.php
//
// Gestion d'un groupe d'action lancees et executees en
// meme temps
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class SameTimeAction extends Action
	{
	var $actif ;

	function __construct( $idx, $id=-1, $libelle="", $actif="" )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->actif = "onTimeout " . $actif ;

		$this->property["actif"] = "TEXT" ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/sametimeaction.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$appctx->Indent() ;	echo( "actions.push( new SameTimeAction( \"$this->id\", \"$this->actif\" ) ) ;\n" ) ;
		}
	}

?>