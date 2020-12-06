<?php
//////////////////////////////////////////////////////////
// menuh.php
//
// Gestion des menus horizontaux
//
// 21/08/2008
// Copyright 2008 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/menu/menu.php" ) ;

class MenuH extends Menu
	{
	function __construct( $appctx )
		{
		parent::__construct( $appctx ) ;
		}

		// Affiche un menu
	function createDomObject( $appctx )
		{
		$appctx->pushIndent() ;
		$appctx->sendHtml( "<table id=\"$this->idx\" class=\"menuh\">" ) ;
		$appctx->sendHtml( "<tr>" ) ;
		$appctx->pushIndent() ;

		foreach( $this->items as $menuitem=>$item )
			{
			$item->createDomObject( $appctx ) ;
			}
		$appctx->popIndent() ;
		$appctx->sendHtml( "</tr>" ) ;
		$appctx->sendHtml( "</table>" ) ;
		$appctx->popIndent() ;
		}
	}

?>