
/*********************************************************
* Classe FfLabel affiche un champ d'une vue dans un
* element DOM de type LABEL
*********************************************************/

function FfLabel( name )
	{
	herite( FfLabel, FormField ) ;
	this.initFfLabel( name )
	this.focusable = false ;
	}

FfLabel.prototype =
	{
	initFfLabel: function( name )
		{
		this.initFormField( name ) ;
		this.focusable = true ;
		this.createDomObject() ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "LABEL" ) ;
		this.setupDomObject() ;
		this.element.className = "label" ;
		},
	// Detruit le formulaire et tous les champs associés
	remove: function()
		{
		unReferenceObject( this.idx ) ;
		},
	setElementValue: function( value )
		{
		if( this.element ) this.element.innerHTML = value ;
		},
	getElementValue: function()
		{
		if( this.element ) return this.element.innerHTML ;
		return null ;
		}
	} ;

