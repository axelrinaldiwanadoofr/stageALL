<?php
//////////////////////////////////////////////////////////
// menucontextuel.php
//
// Gestion des menus contextuels
//
// 21/08/2008
// Copyright 2008 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/menu/menu.php" ) ;

class MenuContextuel extends Menu
	{

	function __construct( $appctx )
		{
		parent::__construct( $appctx ) ;
		$appctx->addDomObject( $this ) ;
		}

		// Affiche un menu
	function createDomObject( $appctx )
		{
		$appctx->pushIndent() ;
		$appctx->sendHtml( "<table id=\"$this->idx\" class=\"menucontextuel\">" ) ;
		$appctx->pushIndent() ;

		foreach( $this->items as $menuitem=>$item )
			{
			$appctx->sendHtml( "<tr>" ) ;
			$item->createDomObject( $appctx ) ;
			$appctx->sendHtml( "</tr>" ) ;
			}
		$appctx->popIndent() ;
		$appctx->sendHtml( "</table>" ) ;
		$appctx->popIndent() ;
		}
	}

?>