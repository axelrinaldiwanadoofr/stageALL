/*********************************************************
* Classe FfInput gere un champ de vue associe a un
* element INPUT du DOM
*********************************************************/

function FfInput( name, size, disable )
	{
	herite( FfInput, FormField ) ;
	this.initFfInput( name, size, disable )
	}

FfInput.prototype =
	{
	initFfInput: function( name, size, disable )
		{
		this.initFormField( name ) ;
		this.size = size ;
		this.disable = disable ;
		if( disable ) this.focusable = false ;
		else this.focusable = true ;
		this.createDomObject() ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "INPUT" ) ;
		this.setupDomObject() ;
		if( this.disable ) this.element.className = "inputdisable" ;
		else this.element.className = "input" ;
		this.element.style.width = this.size*10 ;
		},
	// Detruit le formulaire et tous les champs associés
	remove: function()
		{
		},
	setElementValue: function( value )
		{
	 	if( this.element ) this.element.value = value ;
		},
	getElementValue: function()
		{
		if( this.element ) return this.element.value ;
		return null ;
		},
	setSize: function( size )
		{
		this.size = size ;
		if( this.element ) this.element.style.width = size*10 ;
		},
	onFocus: function()
		{
		if( this.disable ) 
			{
			this.element.blur() ;
			return ;
			}
		if( cfield && cfield != this ) cfield.hideList() ;
		cfield = this ;
		this.formulaire.onFocus( this ) ;
		}
	} ;

