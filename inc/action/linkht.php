<?php
//////////////////////////////////////////////////////////
// linkht.php
//
// Lien hyper text vers une autre page
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class LinkHT extends Action
	{
	var $url ;	// Url de la nouvelle page
	var $arguments ; // Chaine argumentaire suplementaire
	var $actif ;

	function __construct( $idx, $id=-1, $libelle="", $page="", $arguments="", $actif="onClick" )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->page = $page ;
		$this->arguments = $arguments ;
		$this->actif = $actif ;

		$this->property["page"] = "TEXT" ;
		$this->property["arguments"] = "TEXT" ;
		$this->property["actif"] = "TEXT" ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/linkht.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$appctx->Indent() ;
		echo( "actions.push( " ) ;
		echo( 	"new LinkHT( \"$this->id\", " ) ;
		echo( 				"\"$this->page\", \"$this->arguments\", " ) ;
		echo( 				"\"$this->actif\", $appctx->admin" ) ;
		echo( 	" )" ) ;
		echo( " ) ; \n" ) ;
		}
	}

?>