/*********************************************************
* Classe Formulaire de gestion d'un ensemble de champ
* de type FormField
*********************************************************/

var cformulaire = null ;
var ccombolistview = null ;

function Formulaire( title, hidetitle )
	{
	this.initFormulaire( title, hidetitle ) ;
	}

Formulaire.prototype =
	{
	// Initialise un formulaire
	initFormulaire: function( title, hidetitle )
		{
		this.fields = new Array() ; // Collection de references aux champs.
		this.current = 0 ; // Champ courant
		if( title ) this.title = title ;
		else this.title = "" ;
		this.hidetitle = hidetitle ;
		this.createDomObject() ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "DIV" ) ;
		this.element.object = this ;
		this.element.className = "formulaire" ;
		if( !this.hidetitle )
			{
			// Barre de titre
			this.titlebar = document.createElement( "LABEL" ) ;
			this.titlebar.innerHTML = ayawf.tools.prepare_to_show( this.title ) ;
			this.titlebar.className = "formulairetitle" ;
			this.element.appendChild( this.titlebar ) ;
			// Image bouton de fermeture
			this.imgclose = document.createElement( "IMG" ) ;
			this.imgclose.object = this ;
			this.imgclose.onclick = FormulaireOnClose ;
			this.imgclose.className = "formulaireonclose" ;
			this.imgclose.src = "inc/image/f_close.bmp" ;
			this.element.appendChild( this.imgclose ) ;
			}
		// Layout principal
		this.layout = new VTabLayout( "formulairebody" ) ;
		this.element.appendChild( this.layout.element ) ;
		},
	// Detruit le formulaire 
	// si controler est null alors demande au controleur de detruire le formulaire
	// celui-ci rappelera remove en precisant le controler
	remove: function( controler )
		{
		if( controler )
			{
			this.onRemove() ;
			if( this.layout ) this.layout.remove() ;
			for( var i=0 ; i<this.fields.length ; i++ )
				{
				this.fields[i].remove() ;
				}
			if( this.modele ) this.modele.detachView( this ) ;
			}
		else this.formulairecontroler.removeView( this ) ;
		},
	// Ajoute un champ dans la vue
	addField: function( field )
		{
		this.fields.push( field ) ;
		field.formulaire = this ;
		},
	// Recherche de l'indice d'un champ
	getFieldIndice: function( field )
		{
		var i ;
		var n = this.fields.length ;
		for( i=0 ; i<n ; i++ )
			{
			if( field == this.fields[i] ) return i ;
			}
		return -1 ;
		},
	// Renvoie le champ par son numero
	getFieldByIndice: function( indice )
		{
		return this.fields[indice] ;
		},
	// Renvoie le champ par son nom
	getFieldByName: function( name )
		{
		var i ;
		var n = this.fields.length ;
		for( i=0 ; i<n ; i++ )
			{
			if( name == this.fields[i].name ) return this.fields[i] ;
			}
		return null ;
		},
	// Copie les valeurs des champs du formulaire vers
	// un autre formulaire cible
	copyValueTo: function( formulaire )
		{
		var i ;
		var nb = this.fields.length ;
		for( i=0; i<nb ; i++ )
			{
			formulaire.fields[i].setValue( this.fields[i].getValue() ) ;
			}
		},
	// Selectionne tous les champs du formulaire
	setFocusedStyle: function()
		{
		var nb = this.fields.length ;
		for( var i = 0 ; i<nb ; i++ )
			{
			this.fields[i].setFocusedStyle() ;
			}
		},
	// Selectionne tous les champs du formulaire
	setSelectedStyle: function()
		{
		var nb = this.fields.length ;
		for( var i = 0 ; i<nb ; i++ )
			{
			this.fields[i].setSelectedStyle() ;
			}
		},
	// Selectionne tous les champs du formulaire
	restoreStyle: function()
		{
		var nb = this.fields.length ;
		for( var i = 0 ; i<nb ; i++ )
			{
			this.fields[i].restoreStyle() ;
			}
		},
	// Donne le focus au champ n° numfield
	setFocus: function( numfield )
		{
		this.fields[numfield].setFocus() ;
		},
	// Recupere le n° du champ focusable suivant a partir du champ courant
	getNextFocusableField: function()
		{
		var nb = this.fields.length ;
		for( var i = this.current + 1; i<nb ; i++ )
			{
			var field = this.fields[i] ;
			if( field.focusable && field.element && field.visible && !field.disable ) return i ;
			}
		for( var i = 0; i<nb ; i++ )
			{
			var field = this.fields[i] ;
			if( field.focusable && field.element && field.visible && !field.disable ) return i ;
			}
		return -1 ;
		},
	// Recupere le n° du champ focusable précédent a partir du champ courant
	getPreviousFocusableField: function()
		{
		var nb = this.fields.length ;
		for( var i = this.current - 1; i>=0 ; i++ )
			{
			var field = this.fields[i] ;
			if( field.focusable && field.element && field.visible && !field.disable ) return i ;
			}
		for( var i = this.fields.length - 1; i>=0 ; i++ )
			{
			var field = this.fields[i] ;
			if( field.focusable && field.element && field.visible && !field.disable ) return i ;
			}
		return -1 ;
		},
	// Définit le modèle courant
	setModele: function( modele )
		{
		if( this.modele )
			{
			this.onBeforeLostModele() ;
			this.copyAttributeValuesToModele() ;
			this.modele.save() ;
			this.modele.detachView( this ) ;
			}
		this.modele = modele ;
		modele.addView( this ) ;
		this.onModeleChanged() ;
		this.copyModeleValuesToAttributes() ;
		this.onAttributesChanged()
		this.copyAttributeValuesToFields() ;
		},
	// Copie les valeurs d'un modele vers les champs
	copyModeleValuesToAttributes: function()
		{
		if( this.modele )
			{
			var nb = this.fields.length ;
			for( var i = 0 ; i<nb ; i++ )
				{
				var field = this.fields[i] ;
				if( this.modele.hasField( field.name ) )
					{
					value = ayawf.tools.prepare_to_eval( this.modele.getValue( field.name ) ) ;
					eval( "this." + field.name + "=\"" + value + "\";" ) ;
					}
				}
			}
		},
	// Copie les valeurs d'un modele vers les champs
	copyAttributeValuesToFields: function()
		{
		var nb = this.fields.length ;
		for( var i = 0 ; i<nb ; i++ )
			{
			var field = this.fields[i] ;
			eval( "var value = this." + field.name + ";" ) ;
			field.setValue( value ) ;
			}
		},
	// Copie les valeurs d'un modele vers les champs
	copyAttributeValuesToModele: function()
		{
		if( this.modele )
			{
			var nb = this.fields.length ;
			for( var i = 0 ; i<nb ; i++ )
				{
				var field = this.fields[i] ;
				eval( "var value = this." + field.name + ";" ) ;
				this.modele.setValue( field.name, value ) ;
				}
			}
		},
	// Fonction a appeller pour valider des modification sur des attributs
	validateAttributeChange: function()
		{
		// Enregistre dans le modele
		this.copyAttributeValuesToModele() ;
		if( this.modele ) this.modele.save() ;
		return true ;
		},
	// Calcule et renvoie la position absolue de l'element DOM associé
	getAbsoluteX: function()
		{
		var x = 0 ;
		if( this.element ) x = this.element.offsetLeft ;
		if( this.formulairecontroler ) x += this.formulairecontroler.element.offsetLeft ;
		return x ;
		},
	getAbsoluteY: function()
		{
		var y = 0 ;
		if( this.element ) y = this.element.offsetTop ;
		if( this.formulairecontroler ) y += this.formulairecontroler.element.offsetTop ;
		return y ;
		},		
	// Appelée quand le formulaire pert son modele
	onBeforeLostModele: function()
		{
		},
	// Appelée quand le formulaire est ferme
	onClose: function()
		{
		this.remove() ;
		},
	// Appelée quand le formulaire est detruit
	onRemove: function()
		{
		this.element.innerHTML = "" ;
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		},
	// Appelée après affichage
	onAfterShow: function()
		{
		var nb = this.fields.length ;
		for( var i = 0 ; i<nb ; i++ )
			{
			this.fields[i].onAfterShow() ;
			}
		},
	// Appelée quand le modele est changé
	onModeleChanged: function()
		{
		return true ;
		},
	// Appelée quand les attributs sont changés
	onAttributesChanged: function()
		{
		return true ;
		},
	// Appelée par le modèle pour rafraichir la vue
	onRefresh: function()
		{
		this.copyModeleValuesToAttributes() ;
		this.onAttributesChanged()
		this.copyAttributeValuesToFields() ;
		},
	// Appelée quand un champ change de valeur
	onFieldValueChanged: function( field, value )
		{
		if( this.onValueChanged( field.name, value ) )
			{
			// Recopie la nouvelle valeur dans les attribus
			var v = ayawf.tools.prepare_to_eval( value ) ;
			eval( "this." + field.name + "=\"" + v + "\";" ) ;
			// Enregistre dans le modele
			this.copyAttributeValuesToModele() ;
			if( this.modele ) this.modele.save() ;
			return true ;
			}
		return false ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		return true ;
		},
	// Devient selectionnée
	onGetSelected: function()
		{
		},
	// Devient non selectionnée
	onGetUnSelected: function()
		{
		},
	// Quand un champ recoit le focus
	onFocus: function( field )
		{
		// Detecte le changement de formulaire
		if( cformulaire != this )
			{
			if( cformulaire ) cformulaire.onGetUnSelected() ;
			this.onGetSelected() ;
			}
		cformulaire = this ;

		this.current = this.getFieldIndice( field ) ;
		this.formulairecontroler.onFocus( this, this.current ) ;
		this.setSelectedStyle() ;
		field.setFocusedStyle() ;
		},
	// Suppression d'un enregistrement
	onDelete: function( field )
		{
		this.formulairecontroler.onDelete( this, this.getFieldIndice( field ) ) ;
		},
	// Suppression d'un enregistrement
	onNew: function( field )
		{
		this.formulairecontroler.onNew( this, this.getFieldIndice( field ) ) ;
		},
	// Evenement next field venant d'un champ
	onNextField: function( field )
		{
		var nf = this.getNextFocusableField() ;
		if( nf > this.current ) this.setFocus( nf ) ;
		else
			{
			this.current = nf ;
			this.formulairecontroler.onLineDown( this, 0 ) ;
			}
		},
	// Evenement next field venant d'un champ
	onPreviousField: function( field )
		{
		var nf = this.getPreviousFocusableField() ;
		if( nf < this.current ) this.setFocus( nf ) ;
		else
			{
			this.current = nf ;
			this.formulairecontroler.onLineUp( this, this.fields.length-1 ) ;
			}
		},
	// Evenement Line up venant d'un champ
	onLineUp: function( field )
		{
		this.formulairecontroler.onLineUp( this, this.getFieldIndice( field ) ) ;
		},
	// Evenement Line down venant d'un champ
	onLineDown: function( field )
		{
		this.formulairecontroler.onLineDown( this, this.getFieldIndice( field ) ) ;
		},
	// Evenement page up venant d'un champ
	onPageUp: function( field )
		{
		this.formulairecontroler.onPageUp( this, this.getFieldIndice( field ) ) ;
		},
	// Evenement page down venant d'un champ
	onPageDown: function( field )
		{
		this.formulairecontroler.onPageDown( this, this.getFieldIndice( field ) ) ;
		},
	// Evenement premiere ligne venant d'un champ
	onFirstLine: function( field )
		{
		this.formulairecontroler.onFirstLine( this, this.getFieldIndice( field ) ) ;
		},
	// Evenement derniere ligne venant d'un champ
	onLastLine: function( field )
		{
		this.formulairecontroler.onLastLine( this, this.getFieldIndice( field ) ) ;
		},
	// Click sur un champ
	onClick: function( field )
		{
		},
	// Double Click sur un champ
	onDblClick: function( field )
		{
		},
	// Enfonce touche clavier sur un champ
	onKeyDown: function( field, keycode, shift, alt )
		{
		}
	} ;
	
function FormulaireOnClose()
{
	this.object.onClose() ;
}
