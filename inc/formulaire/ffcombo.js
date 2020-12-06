/*********************************************************
* Classe ffCombo gere zone de liste déroulante
* element INPUT du DOM
* viewlist: Controleur de formulaire gérant la liste associée au combo
* validatetarget: Vue cible pour validation
*********************************************************/

var currentcombolistview = null ;

function FfCombo( formulaire, elementid, viewlist, valuefieldnum )
	{
	herite( FfCombo, FormField ) ;
	this.init( formulaire, elementid )
	this.viewlist = viewlist ;
	this.valuefieldnum = valuefieldnum ;
	this.focusable = true ;
	}

FfCombo.prototype =
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
	// Affiche la liste associée
	showViewList: function()
		{
		if( this.viewlist )
			{
			var x = this.getAbsoluteX() ;
			var y = this.getAbsoluteY() + this.element.offsetHeight ;
			this.viewlist.show() ;
			this.viewlist.setPosition( x, y ) ;
			}
		},
	// Affiche la liste associée
	hideViewList: function()
		{
		if( this.viewlist ) this.viewlist.hide() ;
		},
	// Declenche la validation doValidateValue sur la vue cible
	doValidateTarget: function()
		{
		var value = this.getElementValue() ;
		var request = "dfvcombo_onvalidatetarget.php5?sessionid=" + sessionid +"&idx=" + this.validatetarget.idx ;
		var v = prepare_to_send( value ) ;
		request = request + "&fieldidx=" + this.idx + "&value=" + v ;
		var ar = new Ajax() ;
		ar.sendRequestForExecute( request ) ;
		},
	// Gere le changement de valeur
	doValueChanged: function()
		{
		// Regarde si la valeur à changée
		var value = this.getElementValue() ;
		if( value != this.value )
			{
			var v = prepare_to_send( value ) ;
			var formulaire = this.viewlist.getCurrentFormulaire() ;
			var request = "ffcombo_onvaluechanged.php5?sessionid=" + sessionid +"&idx=" + this.idx + "&value=" + v + "&cformidx=" + formulaire.idx ;
			AjaxSendForExecute( request ) ;
			this.value = value ;
			}
		},
	// Recoie du focus
	onFocus: function()
		{
		cfield = this ;
		if( currentcombolistview )
			{
			if( currentcombolistview != this.viewlist )
				{
				currentcombolistview.hide() ;
				currentcombolistview = null ;
				}
			}
		this.formulaire.onFocus( this ) ;
		},
	// Perte du focus
	onBlur: function()
		{
		// Regarde si la valeur à changée
		if( !this.viewlist.visible() ) this.doValueChanged() ;
		},
	onFirstLine: function()
		{
		if( this.viewlist && this.viewlist.visible() )
			{
			this.viewlist.onFirstLine() ;
			this.setFocus() ;
			}
		else if( this.parent )	this.parent.onFirstLine( this ) ;
		},
	// Last line
	onLastLine: function()
		{
		if( this.viewlist && this.viewlist.visible() )
			{
			this.viewlist.onLastLine() ;
			this.setFocus() ;
			}
		else if( this.parent )	this.parent.onLastLine( this ) ;
		},
	// Line up
	onLineUp: function()
		{
		if( this.viewlist && this.viewlist.visible() )
			{
			this.viewlist.onLineUp() ;
			this.setFocus() ;
			}
		else if( this.parent )	this.parent.onLineUp( this ) ;
		},
	// Line down
	onLineDown: function()
		{
		if( this.viewlist && this.viewlist.visible() )
			{
			this.viewlist.onLineDown() ;
			this.setFocus() ;
			}
		else if( this.parent )	this.parent.onLineDown( this ) ;
		},
	// Page up
	onPageUp: function()
		{
		if( this.viewlist && this.viewlist.visible() )
			{
			this.viewlist.onPageUp() ;
			this.setFocus() ;
			}
		else if( this.parent )	this.parent.onPageUp( this ) ;
		},
	// Page down
	onPageDown: function()
		{
		if( this.viewlist && this.viewlist.visible() )
			{
			this.viewlist.onPageDown() ;
			this.setFocus() ;
			}
		else if( this.parent )	this.parent.onPageDown( this ) ;
		},
	// Sur click sur le bouton
	onButtonClick: function()
		{
		if( currentcombolistview )
			{
			if( currentcombolistview != this.viewlist )	currentcombolistview.hide() ;
			}
		this.formulaire.onFocus( this ) ;
		if( this.viewlist )
			{
			if( !this.viewlist.visible() )
				{
				this.showViewList() ;
				currentcombolistview = this.viewlist ;
				}
			else
				{
				this.hideViewList() ;
				currentcombolistview = null ;
				}
			}
		this.setFocus() ;
		},
	// Affiche la liste associée
	onShowList: function()
		{
		if( currentcombolistview )
			{
			if( currentcombolistview != this.viewlist )	currentcombolistview.hide() ;
			}
		this.formulaire.onFocus( this ) ;
		if( this.viewlist )
			{
			if( !this.viewlist.visible() )
				{
				this.showViewList() ;
				currentcombolistview = this.viewlist ;
				}
			else
				{
				this.hideViewList() ;
				currentcombolistview = null ;
				}
			}
		this.setFocus() ;
		},
	// Cache la liste associée
	onHideList: function()
		{
		if( currentcombolistview )
			{
			if( currentcombolistview != this.viewlist )	currentcombolistview.hide() ;
			}
		this.formulaire.onFocus( this ) ;
		if( this.viewlist )
			{
			if( !this.viewlist.visible() )
				{
				this.showViewList() ;
				currentcombolistview = this.viewlist ;
				}
			else
				{
				this.hideViewList() ;
				currentcombolistview = null ;
				}
			}
		this.setFocus() ;
		},
	// Touche enfoncee
	onKeyDown: function( keycode, shift, alt )
		{
		switch( keycode )
			{
			case 38: // Line up
				this.doValueChanged() ;
				if( alt ) // First Line
					{
					if( this.viewlist && this.viewlist.visible() )
						{
						this.viewlist.onFirstLine( null, 0 ) ;
						this.setFocus() ;
						}
					else this.formulaire.onFirstLine( this ) ;
					}
				else // Line Up
					{
					if( this.viewlist && this.viewlist.visible() )
						{
						this.viewlist.onLineUp( null, 0 ) ;
						this.setFocus() ;
						}
					else this.formulaire.onLineUp( this ) ;
					}
				break ;
			case 40: // Line down
				this.doValueChanged() ;
				if( alt ) // last line
					{
					if( this.viewlist && this.viewlist.visible() )
						{
						this.viewlist.onLastLine( null, 0 ) ;
						this.setFocus() ;
						}
					else this.formulaire.onLastLine( this ) ;
					}
				else // Line down
					{
					if( this.viewlist && this.viewlist.visible() )
						{
						this.viewlist.onLineDown( null, 0 ) ;
						this.setFocus() ;
						}
					else this.formulaire.onLineDown( this ) ;
					}
				break ;
			case 33: // Page down
				this.doValueChanged() ;
				if( this.viewlist && this.viewlist.visible() )
					{
					this.viewlist.onPageUp( null, 0 ) ;
					this.setFocus() ;
					}
				else this.formulaire.onPageUp( this ) ;
				break ;
			case 34: // Page down
				this.doValueChanged() ;
				if( this.viewlist && this.viewlist.visible() )
					{
					this.viewlist.onPageDown( null, 0 ) ;
					this.setFocus() ;
					}
				else this.formulaire.onPageDown( this ) ;
				break ;
			case 37: // Cache la liste associée
				if( alt ) this.onHideList() ;
				break ;
			case 39: // Affiche liste
				if( alt ) this.onShowList() ;
				break ;
			case 45: // Inser
				this.doValueChanged() ;
				if( alt )	this.formulaire.onNew( this ) ;
				break ;
			case 46: // Suppr
				this.doValueChanged() ;
				if( alt )	this.formulaire.onDelete( this ) ;
				break ;
			case 13: // Return
				if( shift )	this.formulaire.onPreviousField( this ) ;
				else
					{
					if( this.viewlist && this.viewlist.visible() )
						{
						var formulaire = this.viewlist.getCurrentFormulaire() ;
						var field = formulaire.getField( this.valuefieldnum ) ;
						var value = field.getValue() ;
						if( value != this.getElementValue() )	this.setElementValue( value ) ;
						else
							{
							this.hideViewList() ;
							this.formulaire.onNextField( this ) ;
							}
						}
					else this.formulaire.onNextField( this ) ;
					}
				break ;
			default:
				if( this.viewlist && this.viewlist.visible() )
					{
					var value = this.getElementValue() + String.fromCharCode( keycode ) ;
					value = prepare_to_send( value ) ;
					var request = "ffcombo_onsearchvalue.php5?sessionid=" + sessionid +"&idx=" + this.idx + "&value=" + value ;
					AjaxSendForExecute( request ) ;
					}
				break ;
			}
		}
	} ;

/*********************************************************
* Classe DfvComboInput gere un champ de vue associe a un
* element INPUT du DOM specifique a une liste de combo
*********************************************************/

function FfComboInput( formulaire, elementid )
	{
	herite( FfComboInput, FormField ) ;
	this.init( formulaire, elementid )
	this.focusable = true ;
	}

FfComboInput.prototype =
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
	// Recoie du focus
	onFocus: function()
		{
		this.formulaire.onFocus( this ) ;
		if( cfield ) cfield.setFocus() ;
		}
	} ;

function FfComboButtonOnClick()
{
	this.object.onButtonClick() ;
}
