/*********************************************************
* Classe FfTextarea gere un champ de vue associe a un
* element TEXTAREA du DOM
*********************************************************/

function FfTextarea( name, width, height )
	{
	herite( FfTextarea, FormField ) ;
	this.initFfTextarea( name, width, height )
	}

FfTextarea.prototype =
	{
	initFfTextarea: function( name, width, height )
		{
		this.initFormField( name ) ;
		this.focusable = true ;
		this.width = width ;
		this.height = height ;
		this.createDomObject() ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "TEXTAREA" ) ;
		this.setupDomObject() ;
		this.element.className = "textarea" ;
		this.element.cols = this.width ;
		this.element.rows = this.height ;
		},
	// Detruit le formulaire et tous les champs associés
	remove: function()
		{
		unReferenceObject( this.idx ) ;
		},

	// Met a jour l'element DOM avec la valeur
	setElementValue: function( value )
		{
		if( this.element )
			{
			//this.element.innerHTML = value ;
			this.element.value = value ;
		 	}
		},
	// Met a jour la valeur
	getElementValue: function()
		{
		if( this.element )
			{
		 	//return this.element.innerHTML ;
		 	return this.element.value ;
		 	}
		},
	// Met a jour l'element DOM avec la valeur
	setWidth: function( value )
		{
		if( this.element )
			{
			this.element.cols = value ;
		 	}
		},
	// Met a jour l'element DOM avec la valeur
	setHeight: function( value )
		{
		if( this.element )
			{
			this.element.rows = value ;
		 	}
		}
	} ;

