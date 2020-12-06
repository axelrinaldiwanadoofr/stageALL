/*********************************************************
* Ensemble de layout pour gerer la disposition des objets
* DOM créés.
*********************************************************/

function VTabLayout( style )
	{
	this.initVTabLoyout( style )
	}

VTabLayout.prototype =
	{
	initVTabLoyout: function( style )
		{
		this.items = [] ;
		this.element = document.createElement( "TABLE" ) ;
		this.element.className = style ;
		this.body = document.createElement( "TBODY" ) ;
		this.element.appendChild( this.body ) ;
		},
	remove: function()
		{
		this.removeAllItems() ;
		if( this.element.innerHTML != "" ) this.element.innerHTML = "" ;
		},
	removeAllItems: function()
		{
		var item = this.items.pop() ;
		while( item )
			{
			item.remove() ;
			item = this.items.pop() ;
			}
		},
	// Ajoute un element avec un eventuel libellé à gauche
	add: function( object, libelle )
		{
		var td ;
		this.items.push( object ) ;
		var tr = document.createElement( "TR" ) ;
		this.body.appendChild( tr ) ;
		if( libelle )
			{
			td = document.createElement( "TD" ) ;
			tr.appendChild( td ) ;
			var label = document.createElement( "LABEL" ) ;
			label.className = "etiquette" ;
			var texte = document.createTextNode( ayawf.tools.prepare_to_show( libelle ) ) ;
			label.appendChild( texte ) ;
			td.appendChild( label ) ;
			}
		td = document.createElement( "TD" ) ;
		td.appendChild( object.element ) ;
		tr.appendChild( td ) ;
		return object ;
		},
	// Affiche le layout
	show: function()
		{
		this.element.style.display = "block" ;
		},
	// Cache le layout
	hide: function()
		{
		this.element.style.display = "none" ;
		}
	} ;

function HTabLayout( style )
	{
	this.initHTabLoyout( style )
	}

HTabLayout.prototype =
	{
	initHTabLoyout: function( style )
		{
		this.items = [] ;
		this.element = document.createElement( "TABLE" ) ;
		this.element.className = style ;
		this.body = document.createElement( "TBODY" ) ;
		this.element.appendChild( this.body ) ;
		this.tr = document.createElement( "TR" ) ;
		this.body.appendChild( this.tr ) ;
		},
	// Ajoute un element avec un eventuel libellé à gauche
	add: function( object )
		{
		this.items.push( object ) ;
		var td = document.createElement( "TD" ) ;
		td.appendChild( object.element ) ;
		this.tr.appendChild( td ) ;
		return object ;
		},
	remove: function()
		{
		this.removeAllItems() ;
		if( this.element.innerHTML != "" ) this.element.innerHTML = "" ;
		},
	removeAllItems: function()
		{
		var item = this.items.pop() ;
		while( item )
			{
			item.remove() ;
			item = this.items.pop() ;
			}
		},
	// Affiche le layout
	show: function()
		{
		this.element.style.display = "block" ;
		},
	// Cache le layout
	hide: function()
		{
		this.element.style.display = "none" ;
		}
	} ;

function PageBoxLayout( style )
	{
	this.initPageBoxLayout( style )
	}

PageBoxLayout.prototype =
	{
	initPageBoxLayout: function( style )
		{
		this.pages = [] ;
		this.element = document.createElement( "TABLE" ) ;
		this.element.className = style ;
		this.body = document.createElement( "TBODY" ) ;
		this.element.appendChild( this.body ) ;
		this.tr = document.createElement( "TR" ) ;
		this.body.appendChild( this.tr ) ;
		},
	remove: function()
		{
		this.removeAllPages() ;
		if( this.element.innerHTML != "" ) this.element.innerHTML = "" ;
		},
	// Supprime le layout
	removeAllPages: function()
		{
		var page = this.pages.pop() ;
		while( page )
			{
			page.remove() ;
			page = this.pages.pop() ;
			}
		},
	// Ajoute une page
	addPage: function( page, title )
		{
		// Ajoute la page et la cache sauf la premiere
		this.pages[this.pages.length] = page ;
		if( this.pages.length > 1 ) page.element.style.display = "none" ;

		// Cree le bouton de page
		var button = document.createElement( "BUTTON" ) ;
		button.className = "pagebutton" ;
		button.innerHTML = ayawf.tools.prepare_to_show( title ) ;
		button.object = this ;
		button.setAttribute( "pagenum", this.pages.length-1 ) ;
		button.onclick = PageBoxLayoutOnPage ;

		// Insere le bouton dans la boite a bouton
		var td = document.createElement( "TD" ) ;
		td.appendChild( button ) ;
		this.tr.appendChild( td ) ;
		return page ;
		},
	// Ajoute une page
	onPage: function( pagenum )
		{
		for( var i=0 ; i < this.pages.length ; i++ )
			{
			this.pages[i].element.style.display = "none" ;
			}
		this.pages[pagenum].element.style.display = "block" ;
		}
	} ;

function PageLayout( style )
	{
	this.initPageLayout( style )
	}

PageLayout.prototype =
	{
	initPageLayout: function( style )
		{
		this.items = [] ;
		this.element = document.createElement( "DIV" ) ;
		this.element.className = style ;
		this.table = document.createElement( "TABLE" ) ;
		this.element.appendChild( this.table ) ;
		this.body = document.createElement( "TBODY" ) ;
		this.table.appendChild( this.body ) ;
		},
	// Ajoute un element avec un eventuel libellé à gauche
	add: function( object, libelle )
		{
		var td ;
		this.items.push( object ) ;
		var tr = document.createElement( "TR" ) ;
		this.body.appendChild( tr ) ;
		if( libelle )
			{
			td = document.createElement( "TD" ) ;
			tr.appendChild( td ) ;
			var label = document.createElement( "LABEL" ) ;
			label.className = "etiquette" ;
			var texte = document.createTextNode( ayawf.tools.prepare_to_show( libelle ) ) ;
			label.appendChild( texte ) ;
			td.appendChild( label ) ;
			}
		td = document.createElement( "TD" ) ;
		td.appendChild( object.element ) ;
		tr.appendChild( td ) ;
		return object ;
		},
	remove: function()
		{
		this.removeAllItems() ;
		if( this.element.innerHTML != "" ) this.element.innerHTML = "" ;
		},
	removeAllItems: function()
		{
		var item = this.items.pop() ;
		while( item )
			{
			item.remove() ;
			item = this.items.pop() ;
			}
		}
	} ;

function PageBoxLayoutOnPage()
{
	var pagenum = this.getAttribute( "pagenum" ) ;
	this.object.onPage( pagenum ) ;
}

