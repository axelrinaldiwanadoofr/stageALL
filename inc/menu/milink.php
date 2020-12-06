<?php
//////////////////////////////////////////////////////////
// milink.php
//
// Gestion des items de menu de type lien de reference
//
// 21/08/2008
// Copyright 2008 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/menu/menuitem.php") ;

class MiLink extends MenuItem
	{
		var $href ;

	function __construct( $title, $href )
		{
		parent::__construct( $id, $title ) ;
		$this->href = $href ;
		}

	function createDomObject( $appctx )
		{
		$appctx->pushIndent() ;
		$appctx->sendHtml( "<td id=\"$this->idx\"><a href=\"$this->href\">$this->title</a></td>" ) ;
		$appctx->popIndent() ;
		}
	}

?>