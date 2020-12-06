/*********************************************************
* Classe FfInput gere un champ de vue associe a un
* element INPUT du DOM
*********************************************************/

function FfInput( formulaire, elementid )
	{
	herite( FfInput, FormField ) ;
	this.init( formulaire, elementid )
	this.focusable = true ;
	}

FfInput.prototype =
	{
	// Met a jour l'element DOM avec la valeur
	setElementValue: function( value )
		{
		if( this.element )
			{
		 	this.element.value = value ;
		 	}
		},
	// Met a jour la valeur
	getElementValue: function()
		{
		if( this.element )
			{
		 	return this.element.value ;
		 	}
		},
	// Met a jour l'element DOM avec la valeur
	setWidth: function( value )
		{
		if( this.element )
			{
			this.element.size = value ;
		 	}
		}
	} ;

