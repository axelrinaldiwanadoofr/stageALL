<?php
//////////////////////////////////////////////////////////
// miscript.php
//
// Gestion des items de menu qui lance un script php de
// en utilisant la classe de nom
// $classname et le jeton de connexion $jeton
//
// 21/08/2008
// Copyright 2008 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/menu/menuitem.php") ;

class MiScript extends MenuItem
	{
	protected $script ;
	protected $jeton ;
	protected $window ;

	function __construct( $appctx, $title, $script, $window, $jeton="" )
		{
		parent::__construct( $appctx, $title ) ;
		$this->script = $script ;
		$this->jeton = $jeton ;
		$this->window = $window ;
		}

	function createDomObject( $appctx )
		{
		$script = $this->script ;
		if( $this->jeton != "" ) $script .= "?jeton=$this->jeton" ;
		$appctx->pushIndent() ;
		$html = "<td id=$this->idx class=\"menuitem\">" ;
		$html .= "<a href=\"$script\" target=\"$this->window\">" ;
		$html .= $this->title ;
		$html .= "</a></td>" ;
		$appctx->sendHtml( $html ) ;
		$appctx->popIndent() ;
		}
	}

?>