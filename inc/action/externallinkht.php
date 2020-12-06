<?php
//////////////////////////////////////////////////////////
// externallinkht.php
//
// Lien hyper text vers une url d'un autre site
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class ExternalLinkHT extends Action
	{
	var $url ;	// Url de la nouvelle page
	var $arguments ;
	var $actif ;

	function __construct( $idx, $id=-1, $libelle="", $url="", $actif="onClick" )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->url = $url ;
		$this->actif = $actif ;
		$this->arguments = "" ;

		$this->property["url"] = "TEXT" ;
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
		$url = $this->url ;

		if( $this->arguments != "" ) $url = $url . "?" . $this->arguments ;

		$appctx->Indent() ;
		echo( "actions.push( " ) ;
		echo( 	"new ExternalLinkHT( " ) ;
		echo( 				"\"$this->id\"," ) ;
		echo( 				"\"$url\"," ) ;
		echo( 				"\"$this->actif\"" ) ;
		echo( 	" )" ) ;
		echo( " ) ; \n" ) ;
		}
	}

?>