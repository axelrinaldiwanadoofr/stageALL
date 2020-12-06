/*********************************************************
* Classe DfvCheck gere un champ de vue associe a un
* element INPUT de type checkbox du DOM
*********************************************************/

function FfCheck( name )
	{
	herite( FfCheck, FormField ) ;
	this.initFfCheck( name )
	}

FfCheck.prototype =
	{
	initFfCheck: function( name )
		{
		this.initFormField( name ) ;
		this.focusable = true ;
		this.createDomObject() ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "INPUT" ) ;
		this.setupDomObject() ;
		this.element.type = "checkbox" ;
		this.element.className = "checkbox" ;
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
			if( parseInt( value ) )	this.element.checked = true ;
			else this.element.checked = false ;
		 	}
		},
	// Met a jour la valeur
	getElementValue: function()
		{
		if( this.element )
			{
		 	if( this.element.checked ) return 1 ;
		 	else return 0 ;
		 	}
		},
	// Sur click
	onClick: function()
		{
		this.onValueChanged() ;
		//this.formulaire.onClick( this ) ;
		}		
	} ;

