<?php
//////////////////////////////////////////////////////////
// miformtab.php
//
// Gestion des items de menu qui lance un formulaire de
// de type tabulaire avec formtab.php
// en utilisant la classe de nom
// $classname et le jeton de connexion $jeton
//
// 21/08/2008
// Copyright 2008 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/menu/menuitem.php") ;

class MiFormTab extends MenuItem
	{
	var $classname ;
	var $jeton ;

	function __construct( $appctx, $title, $classname, $jeton )
		{
		parent::__construct( $appctx, $title ) ;
		$this->classname = $classname ;
		$this->jeton = $jeton ;
		}

	function createDomObject( $appctx )
		{
		$appctx->pushIndent() ;
		$appctx->sendHtml( "<td id=\"$this->idx\" class=\"menuitem\">" ) ;
		$appctx->sendHtml( "<a href=\"formtab.php5?classname=$this->classname&jeton=$this->jeton\">$this->title</a>" ) ;
		$appctx->sendHtml( "</td>" ) ;
		$appctx->popIndent() ;
		}
	}

?>