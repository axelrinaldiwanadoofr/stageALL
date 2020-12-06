<?php
//////////////////////////////////////////////////////////
// menumanager.php
//
// Classe MenuManager
// Gere les menus par nom afin de pouvoir les partager
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/menu/menu.php" ) ;

class MenuManager
	{
	protected $menus ; // Tableau des menu

	public function __construct()
		{
		$this->menus = array() ;
		}

	public function add( $menuname, Menu $menu )
		{
		if( !array_key_exists( $menuname, $this->menus ) )
			{
			$this->menus[$menuname] = $menu ;
			}
		}

	public function getMenu( $menuname )
		{
		if( array_key_exists( $menuname, $this->menus ) )
			{
			return $this->menus[$menuname] ;
			}
		return null ;
 		}

	// Supprime le menu
	public function removeMenu( $appctx, $menuname )
		{
		if( array_key_exists( $menuname, $this->menus ) )
			{
			$menu = $this->menus[$menuname] ;
			$menu->remove( $appctx ) ;
			unset( $this->menus[$menuname] ) ;
			}
 		}

	// Suprime tous les menus
	public function clear( $appctx )
		{
		foreach( $this->menus as $name=>$menu )
			{
			$menu->remove( $appctx ) ;
			}
		$this->menus = array() ;
 		}
	}


?>