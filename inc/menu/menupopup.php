<?php
//////////////////////////////////////////////////////////
// menupopup.php
//
// Gestion des menus deroulants
//
// 21/08/2008
// Copyright 2008 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/sys/aobject.php" ) ;

class MenuPopup extends AObject
	{
	var $title ;
	var $parent ;
	var $items ;

	function __construct( &$appctx, $title )
		{
		parent::__construct( $appctx ) ;
		$this->title = $title ;
		$this->parent = null ;
		$this->items = array() ;
		}

	// Cree l'objet JS associe
	function getCreateJsObjectStr( &$appctx )
		{
		if( $this->parent )
			{
			$parentidx = $this->parent->idx ;
			return "new MenuPopup( \"$this->idx\", aobjects[$parentidx] )" ;
			}
		else return "new MenuPopup( \"$this->idx\" )" ;
		}

	function add( &$item )
			{
			$item->parent = $this ;
			array_push( $this->items, $item ) ;
			}

		// Affiche un menu
	function createDomObject( &$appctx )
			{
			$appctx->Plus() ;
			$appctx->Indent() ;
			echo( "<dl id=\"$this->idx\" class=\"menupopup\">\n" ) ;
			$appctx->Indent() ;
			echo( "<dt class=\"menupopup_title\">$this->title</dt>\n" ) ;
			$appctx->Indent() ;
			echo( "<dd>\n" );
			$appctx->Indent() ;
			echo( "<ul>\n" ) ;

			foreach( $this->items as $menuitem=>$item )
				{
				$item->createDomObject( $appctx ) ;
				}
			$appctx->Indent() ;
			echo( "</ul>\n" ) ;
			$appctx->Indent() ;
			echo( "</dd>\n" ) ;
			$appctx->Indent() ;
			echo( "</dl>\n" ) ;
			$appctx->Moins() ;
			}
		// Affiche un menu
	function createDomObjectForItem( &$appctx )
			{
			$appctx->Plus() ;
			$appctx->Indent() ;
			echo( "<dl id=\"$this->idx\" class=\"menupopup\">\n" ) ;
			$appctx->Indent() ;
			echo( "<dt class=\"menupopup_title\">$this->title</dt>\n" ) ;
			$appctx->Indent() ;
			echo( "<dd>\n" );
			$appctx->Indent() ;
			echo( "<ul>\n" ) ;

			foreach( $this->items as $menuitem=>$item )
				{
				$item->createDomObject( $appctx ) ;
				}
			$appctx->Indent() ;
			echo( "</ul>\n" ) ;
			$appctx->Indent() ;
			echo( "</dd>\n" ) ;
			$appctx->Indent() ;
			echo( "</dl>\n" ) ;
			$appctx->Moins() ;
			}
	}

?>