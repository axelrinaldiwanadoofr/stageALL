/*********************************************************
* Classe View de gestion d'une vue du modele MVC
*********************************************************/

function MvcView( viewcontroler, modele )
{
	this.initMvcView( viewcontroler, modele ) ;
}

MvcView.prototype =
{
	// Initialise un formulaire
	initMvcView: function( viewcontroler, modele )
	{
		this.viewcontroler = viewcontroler ;
		if( modele ) this.setModele( modele ) ;
	},

	// Cree les elements DOM associés
	createDomObject: function()
	{
		this.element = document.createElement( "DIV" ) ;
		this.element.object = this ;
		this.viewcontroler.element.appendChild( this.element ) ;
	},

	// Lie l'elements DOM a la vue
	linkDomObject: function( idx )
	{
		this.element = document.getElementById( idx ) ;
		if( this.element ) this.element.object = this ;
	},

	// Detruit la vue 
	// si controler est null alors demande au controleur de detruire la vue
	// celui-ci rappelera remove en precisant le controler
	remove: function( controler )
	{
		if( controler )
		{
			this.onRemove() ;
			if( this.modele ) this.modele.detachView( this ) ;
		}
		else this.viewcontroler.removeView( this ) ;
	},

	// Selectionne le controle s'il n'est pas caché (classe de style "hide")
	// Ajoute "_s" au nom de la classe de style
	setSelectedStyle: function()
	{
		if( this.element )
		{
			var t = this.element.className.split( "_" ) ;
			this.element.className = t[0] + "_s" ;
		}
	},
	
	// Retablit le style d'origine
	restoreStyle: function()
	{
		if( this.element )
		{
			var t = this.element.className.split( "_" ) ;
			this.element.className = t[0] ;
		}
	},
	
	// Définit le controler de vue
	setViewControler: function( viewcontroler )
	{
		this.viewcontroler = viewcontroler ;
	},
	
	// Définit le modèle courant
	setModele: function( modele )
	{
		if( this.modele )
		{
			this.onBeforeLostModele() ;
			this.modele.save() ;
			this.modele.detachView( this ) ;
		}
		this.modele = modele ;
		if( modele ) modele.addView( this ) ;
		this.onModeleChanged() ;
	},
	
	// Selectionne la vue
	setSelected: function()
	{
	},		
	
	// Appelée quand la vue est detruite
	onRemove: function()
	{
	},		
	
	// Appelée quand le modele est changé
	onLayout: function()
	{
	},
	
	// Appelée après affichage
	onAfterShow: function()
	{
	},
	
	// Appelée quand le modele est changé
	onModeleChanged: function()
	{
		return true ;
	},
	
	// Appelée par le modèle pour rafraichir la vue
	onRefresh: function()
	{
	},
	
	// Devient selectionnée
	onGetSelected: function()
	{
	},
	
	// Devient non selectionnée
	onGetUnSelected: function()
	{
		if( this.formulairectrl )
		{
			this.formulairectrl.remove() ;
			this.formulairectrl = null ;
		}
		if( this.menu )
		{
			this.menu.remove() ;
			this.menu = null ;
		}
	}
} ;
