<?php
//////////////////////////////////////////////////////////
// menu.php
//
// Gestion des menus
//
// 21/08/2008
// Copyright 2008 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/jsobject/jsobject.php" ) ;
require_once( "inc/dom/idomobject.php" ) ;

class Menu extends JsObject implements iDomObject
	{
	var $parent ;
	var $items ;

	function __construct( $appctx )
		{
		parent::__construct( $appctx ) ;
		$this->parent = null ;
		$this->items = array() ;
		}

	// Cree l'objet JS associe
	function createJsObject( $appctx )
		{
		if( $this->parent )
			{
			$parentidx = $this->parent->getIdx() ;
			$appctx->sendJs( "if( !aobjects[$this->idx] ) addObject( $this->idx, new Menu( $this->idx, aobjects[$parentidx] ) ) ;" ) ;
			}
		else
			{
			$appctx->sendJs( "if( !aobjects[$this->idx] ) addObject( $this->idx, new Menu( $this->idx ) ) ;" ) ;
			}
		}

	function add( $item )
		{
		$item->setParent( $this ) ;
		array_push( $this->items, $item ) ;
		}

		// Affiche un menu
	function createDomObject( $appctx )
		{
		}

	function createMenu( $appctx )
		{
		$appctx->beginHtmlBuffering() ;
		$this->createDomObject( $appctx ) ;
		$html = $appctx->endHtmlBuffering() ;

		$html = str_replace( "\"", "\\\"", $html ) ;
		$html = utf8_decode( $html ) ;

		$appctx->sendJs( "createDomElement( \"$html\" ) ;" ) ;

		$this->createJsObject( $appctx ) ;
		foreach( $this->items as $n=>$item )
			{
			$item->createJsObject( $appctx ) ;
			}
		}
	// Affiche le menu à la position $x, $y
	// Si target != null alors change le target de tous les item
	function show( $appctx, $x, $y, $target=null )
		{
		if( $target )
			{
			foreach( $this->items as $n=>$item )
				{
				$item->setTarget( $target ) ;
				}
			}

		$this->createJsObject( $appctx ) ;
		foreach( $this->items as $n=>$item )
			{
			$item->createJsObject( $appctx ) ;
			}

		$appctx->sendJs( "aobjects[$this->idx].show( $x, $y ) ;" ) ;
		}

	function remove( $appctx )
		{
		}
	}

?>