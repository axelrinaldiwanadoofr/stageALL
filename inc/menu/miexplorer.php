<?php
//////////////////////////////////////////////////////////
// miexplorer.php
//
// Item de menu lancant un explorer.
// L'argument $classname donne le nom de la classe a
// instancier pour la racine de l'explorer.
// L'argument $menu donne le nom du menu à utiliser.
//
// 21/08/2008
// Copyright 2008 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/menu/menuitem.php") ;

class MiExplorer extends MenuItem
	{
	protected $classname ;
	protected $menuname ;
	protected $jeton ;

	function __construct( $appctx, $title, $classname, $menuname="", $jeton="" )
		{
		parent::__construct( $appctx, $title ) ;
		$this->classname = $classname ;
		$this->menuname = $menuname ;
		$this->jeton = $jeton ;
		}

	function createDomObject( $appctx )
		{
		$script = "explorer.php5?classname=$this->classname" ;
		if( $this->menuname != "" ) $script .= "&menuname=$this->menuname" ;
		if( $this->jeton != "" ) $script .= "&jeton=$this->jeton" ;
		$appctx->pushIndent() ;
		$html = "<td id=\"$this->idx\" class=\"menuitem\">" ;
		$html .= "<a href=\"$script\" target=\"appctx\">" ;
		$html .= $this->title ;
		$html .= "</a></td>" ;
		$appctx->sendHtml( $html ) ;
		$appctx->popIndent() ;
		}
	}

?>