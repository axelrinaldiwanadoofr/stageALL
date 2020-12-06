<?php
//////////////////////////////////////////////////////////
// head.php
//
// Définition d'une page d'entete.
// Cet type de page permet de definir les champs de la partie
// entete d'une page web dont les champs suivant:
//
// Titre
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/cms/node.php" ) ;

class Head extends Node
	{
	var $titre ;	// Titre de la page

	function __construct( &$cms, $dbfields )
		{
		parent::__construct( $cms, $dbfields ) ;
		}

	// Genere une instance de Label
	function buildNodeInstance( &$cms, $parent )
		{
		return new HeadInstance( $cms, $this, $parent ) ;
		}

	// Genere la balise d'entete
	function showHead( &$appctx )
		{
		$appctx->Indent() ;	echo( "<title>$this->titre</title>") ;
		}
	}

class HeadInstance extends NodeInstance
	{
	var $titre ;	// Titre de la page

	function __construct( &$cms, &$head, &$parent )
		{
		parent::__construct( $cms, $head, $parent ) ;
		$this->titre = $head->titre ;
		}

	// Genere la balise d'entete
	function showHead( &$appctx )
		{
		$appctx->Indent() ;	echo( "<title>$this->titre</title>") ;
		}
	}

?>

