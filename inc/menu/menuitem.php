<?php
//////////////////////////////////////////////////////////
// menuitem.php
//
// Gestion des items de menu
//
// 21/08/2008
// Copyright 2008 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/jsobject/jsobject.php" ) ;
require_once( "inc/dom/idomobject.php" ) ;

class MenuItem  extends JsObject implements iDomObject
	{
	protected $title ;
	protected $parent ;
	protected $name ;
	protected $target ;

	function __construct( $appctx, $title, $name="", $target=null )
		{
		parent::__construct( $appctx ) ;
		$this->title = utf8_encode( $title ) ;
		$this->parent = null ;
		$this->target = $target ;
		$this->name = $name ;
		}

	// met a jour le parent
	function setParent( $parent )
		{
		$this->parent = $parent ;
		}

	// met a jour le target
	function setTarget( $target )
		{
		$this->target = $target ;
		}

	// Cree l'objet JS associe
	function createJsObject( $appctx )
		{
		if( $this->parent )
			{
			$parentidx = $this->parent->getIdx() ;
			$appctx->sendJs( "if( !aobjects[$this->idx] ) addObject( $this->idx, new MenuItem( $this->idx, aobjects[$parentidx] ) ) ;" ) ;
			}
		else
			{
			$appctx->sendJs( "if( !aobjects[$this->idx] ) addObject( $this->idx, new MenuItem( $this->idx ) ) ;" ) ;
			}
		}

	function createDomObject( $appctx )
		{
		$appctx->pushIndent() ;
		$appctx->sendHtml( "<td id=\"$this->idx\" class=\"menuitem\">$this->title</td>" ) ;
		$appctx->popIndent() ;
		}

	// Recupere l'evenement onClick
	function onClick( $appctx )
		{
		if( $this->target ) $this->target->onMenuItem( $appctx, $this->name ) ;
		}
	}
?>