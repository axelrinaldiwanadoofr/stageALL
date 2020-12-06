<?php
//////////////////////////////////////////////////////////
// menubar.php
//
// Gestion d'une barre de menu
//
// 21/08/2008
// Copyright 2008 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/sys/aobject.php" ) ;
require_once( "inc/sys/appcontexte.php") ;

class MenuBar extends AObject
	{
	var $menus ;
	var $cmenu ;

	function __construct( $appctx )
		{
		parent::__construct( $appctx ) ;
		$this->menus = array() ;
		}

	function add( $m )
		{
		if( is_a( $m, "MenuPopup") )
			{
			$this->cmenu = $m ;
			$m->parent = $this ;
			array_push( $this->menus, $m ) ;
			}
		else if( $this->cmenu )
			{
			$this->cmenu->add( $m ) ;
			}
		}
	// Cree l'objet JS associe
	function getCreateJsObjectStr( $appctx )
		{
		return "new MenuBar( \"$this->idx\" )" ;
		}
		// Affiche un menu
	function createDomObject( $appctx )
		{
		$appctx->Plus() ;
		$appctx->Indent() ;
		//echo( "<div class=\"menubar\">\n" ) ;
		echo( "<table class=\"menubar\"><tr>\n" ) ;

		$appctx->Plus() ;
		foreach( $this->menus as $menu=>$m )
			{
			$appctx->Indent() ;	echo( "<td>\n" ) ;
			$m->createDomObject( $appctx ) ;
			$appctx->Indent() ;	echo( "</td>\n" ) ;
			}
		$appctx->Moins() ;

		$appctx->Indent() ;
		//echo( "</div>\n" ) ;
		echo( "</tr></table>\n" ) ;
		$appctx->Moins() ;
		}
	}

?>