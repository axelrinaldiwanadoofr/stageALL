/*********************************************************
* Classe FfImage gere un champ de vue associe a un
* element IMG du DOM
*********************************************************/

function FfImage( name, width, height, viewwidth )
	{
	herite( FfImage, FormField ) ;
	this.initFfImage( name, width, height, viewwidth )
	}

FfImage.prototype =
	{
	initFfImage: function( name, width, height, viewwidth )
		{
		this.initFormField( name ) ;
		this.focusable = false ;
		this.width = width ;
		this.height = height ;
		if( width > 0 ) this.ratio = height / width ;
		else this.ratio = 1.0 ;
		if( viewwidth )
			{
			this.autozoom = true ;
			this.viewwidth = viewwidth ;
			this.viewheight = this.ratio * viewwidth ;
			}
		else
			{
			this.autozoom = false ;
			this.viewwidth = width ;
			this.viewheight = height ;
			}
		this.createDomObject() ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "IMG" ) ;
		this.setupDomObject() ;
		this.element.className = "image" ;
		this.element.width = this.viewwidth ;
		this.element.height = this.viewheight ;
		},
	// Met a jour l'element DOM avec la valeur
	setElementValue: function( value )
		{
		if( this.element )
			{
			this.element.src = value ;
		 	}
		},
	// Met a jour la valeur
	getElementValue: function()
		{
		if( this.element )
			{
		 	return this.element.src ;
		 	}
		},
	// Met a jour l'element DOM avec la valeur
	setWidth: function( value )
		{
		this.width = value ;
		if( this.element && !this.autozoom ) this.element.width = value ;
		},
	// Met a jour l'element DOM avec la valeur
	setWidthWithKeepRatio: function( value )
		{
		if( this.width > 0 )
			{
			this.ratio = this.height / this.width ;
			this.width = value ;
			this.height = this.ratio * value ;
			this.viewheight = this.ratio * this.viewwidth ;
			}
		else
			{
			this.width = value ;
			this.height = value ;
			}
		if( this.element && !this.autozoom )
			{
			this.element.width = this.width ;
			this.element.height = this.height ;
		 	}
		},
	// Met a jour l'element DOM avec la valeur
	setHeight: function( value )
		{
		this.height = value ;
		if( this.element && !this.autozoom ) this.element.height = value ;
		},
		// Sur souris entre dans le champ
	onMouseOver: function()
		{
		if( this.element && this.autozoom )
			{
			this.element.width = this.width ;
			this.element.height = this.height ;
		 	}
		},
	// Sur souris sort du champ
	onMouseOut: function()
		{
		if( this.element && this.autozoom )
			{
			this.element.width = this.viewwidth ;
			this.element.height = this.viewheight ;
		 	}
		}
	} ;

