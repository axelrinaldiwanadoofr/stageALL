/*********************************************************
* Classe FfButton gere un champ de vue associe a un
* element BUTTON de type checkbox du DOM
*********************************************************/

function FfButton( name, title )
	{
	herite( FfButton, FormField ) ;
	this.initFfButton( name, title )
	this.focusable = true ;
	}

FfButton.prototype =
	{
	initFfButton: function( name, title )
		{
		this.initFormField( name ) ;
		this.title = title ;
		this.focusable = true ;
		this.createDomObject() ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "BUTTON" ) ;
		this.setupDomObject() ;
		this.element.className = "button" ;
		this.element.innerHTML = ayawf.tools.prepare_to_show( this.title ) ;
		},
	// Detruit le champ
	remove: function()
		{
		},

	// Met a jour l'element DOM avec la valeur
	setTitle: function( title )
		{
		this.title = title ;
		this.element.innerHTML = ayawf.tools.prepare_to_show( this.title ) ;
		}
	} ;

