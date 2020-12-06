/*********************************************************
* Classe Menu de gestion de menu popup
*********************************************************/

var cmenu = null ;

function Menu()
	{
	this.initMenu( "menuv" ) ;
	}

Menu.prototype =
	{
	initMenu: function( style )
		{
		this.items = [] ;
		this.element = document.createElement( "DIV" ) ;
		this.element.className = style ;
		this.element.object = this ;
		this.element.onmouseover = onMenuMouseOver ;
		this.element.onmouseout = onMenuMouseOut ;
		this.table = document.createElement( "TABLE" ) ;
		this.element.appendChild( this.table ) ;
		this.body = document.createElement( "TBODY" ) ;
		this.table.appendChild( this.body ) ;
		},
	// Supprime le layout
	remove: function()
		{
		if( cmenu == this ) cmenu = null ;
		for( var i=0 ; i<this.items.length ; i++ )
			{
			this.items[i].remove() ;
			}
		},
	// Cree les objets DOM et affiche le menu
	showItems: function()
		{
		for( var i=0 ; i<this.items.length ; i++ )
			{
			this.items[i].show() ;
			}
		},
	hideItems: function()
		{
		for( var i=0 ; i<this.items.length ; i++ )
			{
			this.items[i].hide() ;
			}
		},
	show: function( x, y )
		{
		if( cmenu ) cmenu.hide() ;
		cmenu = this ;
		this.element.style.left = x ;
		this.element.style.top = y ;
		this.element.style.display = "block" ;
		},
	hide: function()
		{
		this.element.style.display = "none" ;
		},
	// Gestion de l'evenement mouseover
	onMouseOver: function()
		{
		//this.showItems() ;
		},
	// Gestion de l'evenement mouseout
	onMouseOut: function()
		{
		//this.hideItems() ;
		},
	// Ajoute un item de menu
	add: function( item )
		{
		this.items.push( item ) ;
		item.menu = this ;
		var tr = document.createElement( "TR" ) ;
		this.body.appendChild( tr ) ;
		td = document.createElement( "TD" ) ;
		tr.appendChild( td ) ;
		td.appendChild( item.element ) ;
		}
	} ;

function MenuContextuel()
	{
	herite( MenuContextuel, Menu ) ;
	this.initMenuContextuel()
	}

MenuContextuel.prototype =
	{
	initMenuContextuel: function()
		{
		this.initMenu( "menucontextuel" ) ;
		var root = document.getElementById( "root" ) ;
		root.appendChild( this.element ) ;
		},
	// Supprime le menu
	remove: function()
		{
		this.element.outerHTML = "" ;
		for( var i=0 ; i<this.items.length ; i++ )
			{
			this.items[i].remove() ;
			}
		}
	};

function MenuItem( libelle )
	{
	this.initMenuItem( libelle ) ;
	}

MenuItem.prototype =
	{
	initMenuItem: function( libelle )
		{
		this.element = document.createElement( "LABEL" ) ;
		this.element.className = "menuitem" ;
		this.element.object = this ;
		this.element.innerHTML = ayawf.tools.prepare_to_show( libelle ) ;
		this.element.onmouseover = onMenuItemMouseOver ;
		this.element.onmouseout = onMenuItemMouseOut ;
		this.element.onclick = onMenuItemClick ;
		},
	// Supprime le layout
	remove: function()
		{
		},
	show: function()
		{
		this.element.style.display = "block" ;
		},
	hide: function()
		{
		this.element.style.display = "none" ;
		},
	setSelected: function()
		{
		if( this.element.className != "hide" )
		this.element.className = this.element.className + "_s" ;
		},
	// Deselectionne le controle s'il n'est pas caché (classe de style "hide")
	// Retire le postfixe "_s" du nom de la classe de style
	setUnselected: function()
		{
		this.selected = false ;
		if( this.element.className != "hide" )
			{
			var t = this.element.className.split( "_" ) ;
			this.element.className = t[0] ;
			}
		},
	// Calcule et renvoie la position absolue de l'item de menu
	getAbsoluteX: function()
		{
		var x = this.element.offsetLeft ;
		return x ;
		},
	getAbsoluteY: function()
		{
		var y = this.element.offsetTop ;
		return y ;
		},
	// Calcule et renvoie la largeur du noeud
	getWidth: function()
		{
		return this.element.offsetWidth ;
		},
	getHeight: function()
		{
		return this.element.offsetHeight ;
		},		
	// Gestion de l'evenement click
	onClick: function()
		{
		},
	// Gestion de l'evenement mouseover
	onMouseOver: function()
		{
		this.setSelected() ;
		},
	// Gestion de l'evenement mouseout
	onMouseOut: function()
		{
		this.setUnselected() ;
		}
	} ;

function MiMenuPopup( libelle, menu )
	{
	herite( MiMenuPopup, MenuItem ) ;
	this.initMenuItem( libelle, menu ) ;
	}

MiMenuPopup.prototype =
	{
	initMiMenuPopup: function( libelle, menu )
		{
		this.initMenuItem( libelle ) ;
		this.popupmenu = menu ;
		menu.hide() ;
		},
	// Affiche le menu associé
	showMenu: function()
		{
		var x = this.element.offsetLeft ;
		var y = this.element.offsetTop ;
		this.popupmenu.show( x, y+this.element.offsetHeight ) ;
		},
	// Gestion de l'evenement click
	onClick: function()
		{
		this.showMenu() ;
		},
	// Gestion de l'evenement mouseover
	onMouseOver: function()
		{
		this.setSelected() ;
		},
	// Gestion de l'evenement mouseout
	onMouseOut: function()
		{
		this.setUnselected() ;
		}
	};

function MiCallMethode( libelle, idmi, object, methode )
	{
	herite( MiCallMethode, MenuItem ) ;
	this.initMiCallMethode( libelle, idmi, object, methode ) ;
	}

MiCallMethode.prototype =
	{
	initMiCallMethode: function( libelle, idmi, object, methode )
		{
		this.initMenuItem( libelle ) ;
		this.idmi = idmi ;
		this.object = object ;
		this.methode = methode ;
		},
	// Gestion de l'evenement click
	onClick: function()
		{
		this.menu.hide() ;
		if( this.object ) this.methode.call( this.object, this.idmi ) ;
		}
	};
	
function hideCurrentMenu()
{
	if( cmenu ) cmenu.hide() ;
}

function onMenuMouseOver()
{
	this.object.onMouseOver() ;
}

function onMenuMouseOut()
{
	this.object.onMouseOut() ;
}

function onMenuItemMouseOver()
{
	this.object.onMouseOver() ;
}

function onMenuItemMouseOut()
{
	this.object.onMouseOut() ;
}

function onMenuItemClick()
{
	this.object.onClick() ;
}
