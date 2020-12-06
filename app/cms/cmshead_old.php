<?php
//////////////////////////////////////////////////////////
// cmshead.php
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

require_once( "inc/cms/cmsnode.php" ) ;

class CmsHead extends CmsNode
	{
	var $titre ;	// Titre de la page

	function __construct( $cms, $dbfields )
		{
		parent::__construct( $cms, $dbfields ) ;
		$this->updateInitialeValues() ;
		}

	// Genere une instance de Label
	function buildNodeInstance( $cms, $parent )
		{
		return new CmsHeadInstance( $cms, $this, $parent ) ;
		}

	// Genere la balise d'entete
	function showHead( &$appctx )
		{
		$appctx->Indent() ;	echo( "<title>$this->titre</title>") ;
		}
	}

class CmsHeadInstance extends CmsNodeInstance
	{
	var $titre ;	// Titre de la page

	function __construct( $cms, $head, $parent )
		{
		parent::__construct( $cms, $head, $parent ) ;
		$this->titre = $head->titre ;
		}

	// Genere la balise d'entete
	function showHead( $appctx )
		{
		$appctx->Indent() ;	echo( "<title>$this->titre</title>") ;
		}
	}

?>