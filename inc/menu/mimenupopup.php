<?php
//////////////////////////////////////////////////////////
// mimenupopup.php
//
// Items de menu associé à un menu déroulant
//
// 21/08/2008
// Copyright 2008 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/menu/menuitem.php") ;

class MiMenuPopup extends MenuItem
	{
	protected $menu ;

	function __construct( $appctx, $title, $menu )
		{
		parent::__construct( $appctx, $title ) ;
		$this->menu = $menu ;
		}

	// Cree l'objet JS associe
	function createJsObject( $appctx )
		{
		$menuidx = $this->menu->getIdx() ;
		if( $this->parent )
			{
			$parentidx = $this->parent->getIdx() ;
			$appctx->sendJs( "addObject( $this->idx, new MiMenuPopup( $this->idx, aobjects[$menuidx], aobjects[$parentidx] ) ) ;" ) ;
			}
		else $appctx->sendJs( "addObject( $this->idx, new MiMenuPopup( $this->idx, aobjects[$menuidx] ) ) ;" ) ;
		}

	function createDomObject( $appctx )
		{
		$appctx->pushIndent() ;
		$appctx->sendHtml( "<td id=\"$this->idx\" class=\"mimenupopup\">$this->title</td>" ) ;
		$appctx->popIndent() ;
		}
	}

?>