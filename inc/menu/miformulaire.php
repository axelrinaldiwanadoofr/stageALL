<?php
//////////////////////////////////////////////////////////
// miformulaire.php
//
// Gestion des items de menu qui lance un formulaire
// avec formulaire.php en utilisant la classe de nom
// $classname et le jeton de connexion $jeton
//
// 21/08/2008
// Copyright 2008 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/menu/menuitem.php") ;

class MiFormulaire extends MenuItem
	{
	var $window ;
	var $classname ;
	var $jeton ;

	function __construct( $appctx, $title, $classname, $jeton, $window="" )
		{
		parent::__construct( $appctx, $title ) ;
		$this->classname = $classname ;
		$this->jeton = $jeton ;
		$this->window = $window ;
		}

	function createDomObject( $appctx )
		{
		$appctx->pushIndent() ;

		$html = "<td id=\"$this->idx\" class=\"menuitem\">" ;
		$html .= "<a href=\"formulaire.php5?classname=$this->classname&jeton=$this->jeton" ;
		if( $this->window != "" )	$html .= "&window=$this->window\" target=\"$this->window\">" ;
		else $html .= "\"> ;" ;
		$html .= "\">$this->title</a></td>"  ;
		$appctx->sendHtml( $html ) ;

		$appctx->popIndent() ;
		}
	}

?>