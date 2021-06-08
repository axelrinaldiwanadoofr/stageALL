/*********************************************************
* Classe MvcViewControler de gestion
* d'un ensemble de vue
*********************************************************/

function MvcViewControler( classstyle )
{
	this.initMvcViewControler( classstyle ) ;
}

MvcViewControler.prototype =
{
	// Initialisation du controleur de vue
	initMvcViewControler: function( classstyle )
	{
		this.classstyle = classstyle ;
		this.views = new Array() ; // Collection des vues
		this.current = 0 ; // N° de la vue courrante
		this.x = 0 ;
		this.y = 0 ;
		this.z = 0 ;
	},

	// Cree les elements DOM associés
	createDomObject: function()
	{
		this.element = document.createElement( "DIV" ) ;
		this.element.object = this ;
		if( this.classstyle ) this.element.className = this.classstyle ;
		var root = document.getElementById( "root" ) ;
		root.appendChild( this.element ) ;
	},

	// associe un elements DOM
	linkDomObject: function( idx )
	{
		this.element = document.getElementById( idx ) ;
		if( this.element ) this.element.object = this ;
	},

	// cree les elements DOM a partir d'un code HTML
	createDomObjectFromHtml: function( html )
	{
		if( this.element )
		{
			this.element.innerHTML = html ;
		}
	},

	// Ajoute une vue dans la vue
	addView: function( view )
	{
		this.views.push( view ) ;
		view.viewcontroler = this ;
	},

	// Dispose les formulaires
	onLayout: function()
	{
	},

	// Recherche de l'indice d'une vue
	getViewIndice: function( view )
	{
		var i ;
		var n = this.views.length ;
		for( i=0 ; i<n ; i++ )
		{
			if( view == this.views[i] ) return i ;
		}
		return -1 ;
	},

	// Recupere la vue courante
	getCurrentView: function()
	{
		return this.views[this.current] ;
	},

	// Restore les styles de base de toutes les vue
	restoreStyle: function()
	{
		var nb = this.views.length ;
		for( var i = 0 ; i<nb ; i++ )
		{
			this.views[i].restoreStyle() ;
		}
	},
	
	// Affiche la l'objet DOM contenant les vues
	show: function( x, y )
	{
		if( !this.element )
		{
			this.createDomObject() ;
			this.onLayout() ;
		}
		if( x )	this.element.style.left = x ;
		if( y ) this.element.style.top = y ;
		this.element.style.display = "block" ;

		var nb = this.views.length ;
		for( var i = 0 ; i<nb ; i++ )
		{
			this.views[i].onAfterShow() ;
		}
	},
	
	// Cache l'objet DOM contenant les vues
	hide: function()
	{
		this.element.style.display = "none" ;
	},
	
	// Retourne true si le conteneur de vue est visible
	visible: function()
	{
		if( this.element.style.display == "block" ) return true ;
		return false ;
	},
	
	// Detruit le controleur et les vues associés
	remove: function()
	{
		this.removeAllViews() ;
		unReferenceObject( this.idx ) ;
	},
	
	removeAllViews: function()
	{
		var i ;
		for( i=0 ; i<this.views.length ; i++ )
		{
			this.views[i].remove( this ) ;
		}
		this.element.innerHTML = "" ;
	},
	
	// Detruit une vue du controleur
	removeView: function( view )
	{
		var i = this.getFormulaireIndice( view ) ;
		if( i > -1 ) this.views[i].remove( this ) ;
		if( this.views.length < 2 ) 
		{
			this.element.innerHTML = "" ;
		}
	},
	
	// Positionne le conteneur de vue
	setPosition: function( x, y, z )
	{
		this.x = x ;
		this.y = y ;
		this.z = z ;
		if( this.element )
		{
			this.element.style.left = x ;
			this.element.style.top = y ;
		}
	}
} ;
