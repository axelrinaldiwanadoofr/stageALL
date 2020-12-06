/*********************************************************
* Classe FfSelect gere un champ de vue associe a un
* element SELECT du DOM
*********************************************************/

function FfSelect( name, size, sql )
	{
	herite( FfSelect, FormField ) ;
	this.initFfSelect( name, size, sql )
	this.focusable = true ;
	}

FfSelect.prototype =
	{
	initFfSelect: function( name, size, sql )
		{
		this.initFormField( name ) ;
		this.size = size ;
		this.focusable = true ;
		this.text = "" ;
		this.createDomObject() ;

		if( sql ) this.populateItemsFromSql( sql ) ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "SELECT" ) ;
		this.setupDomObject() ;
		this.element.className = "select" ;
		if( this.size ) this.element.style.width = this.size * 10 ;
		},

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
	// Met a jour la valeur
	addItem: function( value, texte )
		{
		if( this.element )
			{
			var option = document.createElement( "OPTION" ) ;
			option.value = value ;
			option.innerHTML = ayawf.tools.prepare_to_show( texte ) ;
			this.element.appendChild( option ) ;
		 	}
		},
	// Cree les items à partir d'une requette SQL
	populateItemsFromSql: function( sql )
		{
	 	//this.element.innerHTML = "" ;
		this.sqlselect = new SqlSelect( sql, 0, -1,
			this, this.onPopulateItemsFromSql ) ;
		},
	// Met a jour la valeur
	clearAllItems: function()
		{
		if( this.element )
			{
		 	this.element.innerHTML = "" ;
		 	}
	 	this.element.value = "" ;
		},
	// Met a jour la valeur
	onPopulateItemsFromSql: function( sqlselect )
		{
		this.rows = sqlselect.rows ;
		for( var i=0 ; i<this.rows.length ; i++ )
			{
			this.addItem( this.rows[i][0], this.rows[i][1] ) ;
			}
	 	this.element.value = this.value ;
		}
	} ;

