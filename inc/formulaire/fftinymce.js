/*********************************************************
* Classe FfTinyMCE gere un champ de vue associe a un
* element TEXTAREA du DOM
*********************************************************/

function FfTinyMCE( name, width, height )
	{
	herite( FfTinyMCE, FormField ) ;
	this.initFfTinyMCE( name, width, height )
	}

FfTinyMCE.prototype =
	{
	initFfTinyMCE: function( name, width, height )
		{
		this.initFormField( name ) ;
		this.focusable = false ;
		this.width = width ;
		this.height = height ;
		this.createDomObject() ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "textarea" ) ;
		this.setupDomObject() ;
		this.element.className = "textarea" ;
		this.element.setAttribute( "id", this.idx ) ;
		//this.element.id = this.idx ;
		this.element.cols = this.width ;
		this.element.rows = this.height ;
		},
	// Met a jour l'element DOM avec la valeur
	setElementValue: function( value )
		{
		if( this.element )
			{
			this.value = value ;
			var editeur = tinyMCE.get( this.idx ) ;
			if( editeur ) editeur.setContent( value ) ;
		 	}
		},
	getElementValue: function()
		{
		if( this.element )
			{
			alert( "FfTinyMCE: getElementValue" ) ;
			var editeur = tinyMCE.get( this.idx ) ;
			return editeur.getContent() ;
		 	}
		},
	// Donne le focus au controle associe
	setFocus: function()
		{
		if( this.element )
			{
			var editeur = tinyMCE.get( this.idx ) ;
			return editeur.focus( true ) ;
		 	}
		}
	} ;

