

/*********************************************************
* Classe FormField champ d'un formulaire
*********************************************************/
var cfield = null ;

function FormField( name )
	{
	this.initFormField( name )
	}

FormField.prototype =
	{
	initFormField: function( name )
		{
		this.name = name ;
		this.selected = false ;
		this.focusable = false ;
		this.visible = true ;
		this.disable = false ;
		},
	// Configure l'element DOM associé
	setupDomObject: function()
		{
		if( this.element )
			{
			this.element.object = this ;
			this.element.onblur = FormFieldOnBlur ;
			this.element.onfocus = FormFieldOnFocus ;
			this.element.onkeydown = FormFieldOnKeyDown ;
			this.element.onclick = FormFieldOnClick ;
			this.element.ondblclick = FormFieldOnDblClick ;
			this.element.onmouseover = FormFieldOnMouseOver ;
			this.element.onmouseout = FormFieldOnMouseOut ;
			this.element.onchange = FormFieldOnChange ;
			}
		},
	// Supprime le champ
	remove: function()
		{
		},
	// Met a jour la valeur
	setValue: function( value )
		{
		this.value = value ;
		this.setElementValue( value ) ;
		},
	// Lit la valeur
	getValue: function()
		{
		return this.value ;
		},
	// Met a jour l'element DOM avec la valeur
	setElementValue: function( value )
		{
		},
	// Met a jour la valeur
	getElementValue: function()
		{
		return this.value ;		
		},
	// Calcule et renvoie la position absolue de l'element DOM associé
	getAbsoluteX: function()
		{
		var tcr = this.element.getClientRects() ;
		var cr = tcr[0] ;
		return cr.left ;
		},
	getAbsoluteY: function()
		{
		var tcr = this.element.getClientRects() ;
		var cr = tcr[0] ;
		return cr.top ;
		},
	// Affiche ou cache l'element DOM associé
	setVisible: function( visible )
		{
		if( this.element )
			{
			this.visible = visible ;
			if( visible ) this.element.style.display = "block" ;
			else this.element.style.display = "none" ;
			}
		},
	// Donne le focus au controle associe
	setFocus: function()
		{
		if( this.element ) this.element.focus() ;
		},
	// Selectionne le controle s'il n'est pas caché (classe de style "hide")
	// Ajoute "_f" au nom de la classe de style
	setFocusedStyle: function()
		{
		if( this.element )
			{
			if( this.element.className != "hide" )
				{
				var t = this.element.className.split( "_" ) ;
				this.element.className = t[0] + "_f" ;
				}
			}
		},
	// Selectionne le controle s'il n'est pas caché (classe de style "hide")
	// Ajoute "_s" au nom de la classe de style
	setSelectedStyle: function()
		{
		if( this.element )
			{
			if( this.element.className != "hide" )
				{
				var t = this.element.className.split( "_" ) ;
				this.element.className = t[0] + "_s" ;
				}
			}
		},
	// Retablit le style d'origine
	restoreStyle: function()
		{
		this.selected = false ;
		if( this.element )
			{
			if( this.element.className != "hide" )
				{
				var t = this.element.className.split( "_" ) ;
				this.element.className = t[0] ;
				}
			}
		},
	// Gere le changement de valeur
	onValueChanged: function()
		{
		// Regarde si la valeur à changée
		var value = this.getElementValue() ;
		if( value != this.value )
			{
			if( this.formulaire.onFieldValueChanged( this, value ) )	this.value = value ;
			else this.setElementValue( this.value ) ;
			}
		},
	// Appelé après affichage
	onAfterShow: function()
		{
		},
	// Sur double click
	onDblClick: function()
		{
		this.formulaire.onDblClick( this ) ;
		},
	// Sur click
	onClick: function()
		{
		this.formulaire.onClick( this ) ;
		},
	// Sur souris entre dans le champ
	onMouseOver: function()
		{
		},
	// Sur souris sort du champ
	onMouseOut: function()
		{
		},
	// Recoie du focus
	onFocus: function()
		{
		if( cfield && cfield != this ) cfield.hideList() ;
		cfield = this ;
		this.formulaire.onFocus( this ) ;
		},
	// Perte du focus
	onBlur: function()
		{
		this.onValueChanged() ;
		},
	// Touche enfoncee
	onKeyDown: function( keycode, shift, alt )
		{
		switch( keycode )
			{
			case 38: // Line up
				this.onValueChanged() ;
				if( alt ) this.formulaire.onFirstLine( this ) ;
				else this.formulaire.onLineUp( this ) ;
				break ;
			case 40: // Line down
				this.onValueChanged() ;
				if( alt ) this.formulaire.onLastLine( this ) ;
				else this.formulaire.onLineDown( this ) ;
				break ;
			case 33: // Page down
				this.onValueChanged() ;
				this.formulaire.onPageUp( this ) ;
				break ;
			case 34: // Page down
				this.onValueChanged() ;
				this.formulaire.onPageDown( this ) ;
				break ;
			case 37: // Cache la liste associée
				if( alt ) this.onHideList() ;
				break ;
			case 39: // Affiche liste
				if( alt ) this.onShowList() ;
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
				this.formulaire.onKeyDown( this, keycode, shift, alt ) ;
				break ;
			}
		},
	// Valeur qui change
	onChange: function()
		{
		},
	// Affiche la liste associée
	showList: function()
		{
		},
	// Cache la liste associée
	hideList: function()
		{
		}
	} ;

function FormFieldOnBlur()
{
	this.object.onBlur() ;
}

function FormFieldOnFocus()
{
	this.object.onFocus() ;
}

function FormFieldOnChange()
{
	this.object.onChange() ;
}

function FormFieldOnDblClick()
{
	this.object.onDblClick() ;
}

function FormFieldOnClick()
{
	this.object.onClick() ;
}

function FormFieldOnMouseOver()
{
	this.object.onMouseOver() ;
}

function FormFieldOnMouseOut()
{
	this.object.onMouseOut() ;
}

function FormFieldOnChange()
{
	this.object.onChange() ;
}

function FormFieldOnKeyDown( e )
{
	if( ayawf.tools.isNETSCAPE )
		{
		var keycode = e.keyCode ;
		var shift = e.shiftKey ;
		var alt = e.altKey ;
		}
	else
		{
		var keycode = window.event.keyCode ;
		var shift = window.event.shiftKey ;
		var alt = window.event.altKey ;
		}
	this.object.onKeyDown( keycode, shift, alt ) ;
}