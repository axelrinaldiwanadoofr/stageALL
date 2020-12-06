/*********************************************************
* Classe FfSelectEdit gere un champ de vue combinant un
* element INPUT et un SELECT du DOM
*********************************************************/

function FfSelectEdit( name, width, size, sql, fieldforfind, listwidth )
	{
	herite( FfSelectEdit, FormField ) ;
	this.initFfSelectEdit( name, width, size, sql, fieldforfind, listwidth )
	this.focusable = true ;
	}

FfSelectEdit.prototype =
	{
	initFfSelectEdit: function( name, width, size, sql, fieldforfind, listwidth )
		{
		this.initFormField( name ) ;
		this.width = width ;
		this.listwidth = width ;
		if( listwidth ) this.listwidth = listwidth ;
		this.size = size ;
		this.focusable = true ;
		this.fieldforfind = fieldforfind ;
		this.valuetofind = "" ;
		this.sql = sql ;
		this.nrow = 0 ;
		this.step = 100 ;
		this.lastrow = false ;
		this.createDomObject() ;

		this.populateItemsFromSql( this.valuetofind ) ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "DIV" ) ;

		this.text = document.createElement( "INPUT" ) ;
		this.text.className = "input" ;
		this.text.style.width = this.width*10 ;
		this.element.appendChild( this.text ) ;
		this.setupDomObject() ;

		this.image = document.createElement( "IMG" ) ;
		this.image.src = "inc/image/b_combo.bmp" ;
		this.image.style.width = 20 ;
		this.image.style.height = 20 ;
		this.image.onclick = SelectEditImageOnClick ;
		this.image.object = this ;
		this.element.appendChild( this.image ) ;
		
		this.list = document.createElement( "SELECT" ) ;
		this.list.className = "selectedit" ;
		this.list.style.display = "none" ;
		this.list.size = this.size ;
		this.list.style.width = this.listwidth * 10 ;
		this.list.onfocus = SelectEditListOnFocus ;
		this.list.onchange = SelectEditListOnChange ;
		this.list.onclick = SelectEditListOnClick ;
		this.list.ondblclick = SelectEditListOnDblClick ;
		this.list.object = this ;

		var root = document.getElementById( "root" ) ;
		root.appendChild( this.list ) ;
		},
	setupDomObject: function()
		{
		if( this.text )
			{
			this.text.object = this ;
			this.text.onblur = FormFieldOnBlur ;
			this.text.onfocus = FormFieldOnFocus ;
			this.text.onkeydown = FormFieldOnKeyDown ;
			this.text.onclick = FormFieldOnClick ;
			this.text.ondblclick = FormFieldOnDblClick ;
			this.text.onmouseover = FormFieldOnMouseOver ;
			this.text.onmouseout = FormFieldOnMouseOut ;
			this.text.onchange = FormFieldOnChange ;
			}
		},
	// Donne le focus au controle associe
	setFocus: function()
		{
		if( this.text ) this.text.focus() ;
		},
	// Selectionne le controle s'il n'est pas caché (classe de style "hide")
	// Ajoute "_f" au nom de la classe de style
	setFocusedStyle: function()
		{
		if( this.text )
			{
			if( this.text.className != "hide" )
				{
				var t = this.text.className.split( "_" ) ;
				this.text.className = t[0] + "_f" ;
				}
			}
		},
	// Selectionne le controle s'il n'est pas caché (classe de style "hide")
	// Ajoute "_s" au nom de la classe de style
	setSelectedStyle: function()
		{
		if( this.text )
			{
			if( this.text.className != "hide" )
				{
				var t = this.text.className.split( "_" ) ;
				this.text.className = t[0] + "_s" ;
				}
			}
		},
	// Retablit le style d'origine
	restoreStyle: function()
		{
		this.selected = false ;
		if( this.text )
			{
			if( this.text.className != "hide" )
				{
				var t = this.text.className.split( "_" ) ;
				this.text.className = t[0] ;
				}
			}
		},
	// Met a jour l'element DOM avec la valeur
	setElementValue: function( value )
		{
		if( this.text )
			{
		 	this.text.value = value ;
		 	}
		},
	// Met a jour la valeur
	getElementValue: function()
		{
		if( this.text )
			{
		 	return this.text.value ;
		 	}
		},
	// Met a jour la valeur
	addItem: function( value, texte )
		{
		if( this.list )
			{
			var option = document.createElement( "OPTION" ) ;
			option.value = value ;
			option.innerHTML = ayawf.tools.prepare_to_show( texte ) ;
			this.list.appendChild( option ) ;
		 	}
		},
	// Cree les items à partir d'une requette SQL
	populateItemsFromSql: function( valuetofind )
		{
		if( this.sql )
			{
			this.sqlselect = new SqlSelect( this.sql, this.nrow, this.step,
				this, this.onPopulateItemsFromSql, this.fieldforfind, valuetofind ) ;
			}
		},
	// Met a jour la valeur
	clearAllItems: function()
		{
		if( this.list )
			{
		 	this.list.innerHTML = "" ;
		 	}
		},
	// Supprime le champ
	remove: function()
		{
		if( this.list ) delete this.list ;
		},
	// Reexecute la requete
	requery: function( sql, fieldforfind )
		{
		if( sql ) this.sql = sql ;
		if( fieldforfind ) this.fieldforfind = fieldforfind ;
		this.populateItemsFromSql( this.valuetofind ) ;
		},
	// Affiche la liste
	showList: function()
		{
		if( this.list )
			{
			this.list.style.left = this.getAbsoluteX() ;
			this.list.style.top = this.getAbsoluteY() + 20 ;
			this.list.style.display = "block" ;
			}
		if( this.text ) this.text.focus() ;
		},
	// Cache la liste
	hideList: function()
		{
		if( this.list )	this.list.style.display = "none" ;
		},
	// Met a jour la valeur
	onPopulateItemsFromSql: function( sqlselect )
		{
		this.clearAllItems() ;
		this.rows = sqlselect.rows ;
		this.lastrow = sqlselect.lastrow ;
		for( var i=0 ; i<this.rows.length ; i++ )
			{
			this.addItem( this.rows[i][0], this.rows[i][1] ) ;
			}
		},
	// Recoie du focus
	onFocus: function()
		{
		if( cfield && cfield != this ) cfield.hideList() ;
		cfield = this ;
		this.formulaire.onFocus( this ) ;
		//this.showList() ;
		},
	// Perte du focus
	onBlur: function()
		{
		//this.hideList() ;
		if( this.list.style.display == "none" )	this.onValueChanged() ;
		else this.hideList() ;
		},
	// La liste recoie du focus
	onListFocus: function()
		{
		cfield = this ;
		this.list.style.display = "block" ;
		this.text.focus() ;
		},
	onListChange: function()
		{
		this.setElementValue( this.list.value ) ;
		},
	onListClick: function()
		{
		this.setElementValue( this.list.value ) ;
		this.hideList() ;
		},
	onListDblClick: function()
		{
		this.setElementValue( this.list.value ) ;
		this.hideList() ;
		},
	onImageClick: function()
		{
		if( this.list.style.display == "none" ) this.showList() ;
		else this.hideList() ;
		},
	// Touche enfoncee
	onKeyDown: function( keycode, shift, alt )
		{
		switch( keycode )
			{
			case 38: // Line up
				//this.onValueChanged() ;
				//if( alt ) this.formulaire.onFirstLine( this ) ;
				//else this.formulaire.onLineUp( this ) ;
				if( alt ) 
					{
					this.nrow = 0 ;
					this.requery() ;
					}
				else 
					{
					this.nrow -= this.step ;
					if( this.nrow < 0 ) this.nrow = 0 ;
					this.requery() ;
					}					
				break ;
			case 40: // Line down
				if( this.list.style.display == "none" ) this.showList() ;
				else
					{
					if( alt ) 
						{
						if( !this.lastrow )
							{
							this.nrow += this.step ;
							this.requery() ;
							}
						}									
					else
						{
						if( !this.lastrow )
							{
							this.nrow += this.step ;
							this.requery() ;
							}
						}
					}
				break ;
			case 33: // Page up
				//this.onValueChanged() ;
				//this.formulaire.onPageUp( this ) ;
				this.nrow -= this.step ;
				if( this.nrow < 0 ) this.nrow = 0 ;
				this.requery() ;
				break ;
			case 34: // Page down
				//this.onValueChanged() ;
				//this.formulaire.onPageDown( this ) ;
				if( !this.lastrow )
					{
					this.nrow += this.step ;
					this.requery() ;
					}
				break ;
			case 37: // Cache la liste associée
				if( alt ) this.hideList() ;
				break ;
			case 39: // Affiche liste
				if( alt ) this.showList() ;
				break ;
			case 45: // Inser
				this.onValueChanged() ;
				if( alt )	this.formulaire.onNew( this ) ;
				break ;
			case 46: // Suppr
				this.onValueChanged() ;
				if( alt )	this.formulaire.onDelete( this ) ;
				break ;
			case 13: // Return
				if( shift )	this.formulaire.onPreviousField( this ) ;
				else this.formulaire.onNextField( this ) ;
				break ;
			default:
				this.valuetofind = this.getElementValue() ;
				if( keycode == "8" ) this.valuetofind = this.valuetofind.substr( 0, this.valuetofind.length - 1 ) ;
				else this.valuetofind += String.fromCharCode( parseInt( keycode ) ) ;
				this.nrow = 0 ;
				this.requery() ;
				this.formulaire.onKeyDown( this, keycode, shift, alt ) ;
				break ;
			}
		}		
	} ;

function SelectEditListOnFocus()
{
	this.object.onListFocus() ;
}

function SelectEditListOnChange()
{
	this.object.onListChange() ;
}

function SelectEditListOnDblClick()
{
	this.object.onListDblClick() ;
}

function SelectEditListOnClick()
{
	this.object.onListClick() ;
}

function SelectEditImageOnClick()
{
	this.object.onImageClick() ;
}