/*********************************************************
* Classe FormulaireControler de gestion
* d'un ensemble de formulaire
*********************************************************/

function FormulaireControler()
	{
	this.initFormulaireControler() ;
	}

FormulaireControler.prototype =
	{
	// Ajoute une vue dans la vue
	initFormulaireControler: function()
		{
		this.formulaires = new Array() ; // Collection des formulaires
		this.current = 0 ; // N° du formulaire courrante
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "DIV" ) ;
		this.element.object = this ;
		this.element.className = "formulairecontroler" ;
		this.layout = new VTabLayout( "formulairecontrolerbody" ) ;
		this.element.appendChild( this.layout.element ) ;
		var root = document.getElementById( "root" ) ;
		root.appendChild( this.element ) ;
		},
	// Ajoute une vue dans la vue
	addFormulaire: function( formulaire )
		{
		this.formulaires.push( formulaire ) ;
		formulaire.formulairecontroler = this ;
		},
	// Spécifie un modèle pour le premier formulaire
	setModele: function( modele )
		{
		this.formulaires[0].setModele( modele ) ;
		},
	// Dispose les formulaires
	onLayout: function()
		{
		var i ;
		var n = this.formulaires.length ;
		for( i=0 ; i<n ; i++ )
			{
			var formulaire = this.formulaires[i] ;
			formulaire.onLayout() ;
			if( !i ) this.layout.add( formulaire ) ;
			}
		},
	// Recherche de l'indice d'une vue
	getFormulaireIndice: function( formulaire )
		{
		var i ;
		var n = this.formulaires.length ;
		for( i=0 ; i<n ; i++ )
			{
			if( formulaire == this.formulaires[i] ) return i ;
			}
		return -1 ;
		},
	// Recupere la vue courante
	getCurrentFormulaire: function()
		{
		return this.formulaires[this.current] ;
		},
	// Deselectionne tous les formulaire
	restoreStyle: function()
		{
		var nb = this.formulaires.length ;
		for( var i = 0 ; i<nb ; i++ )
			{
			this.formulaires[i].restoreStyle() ;
			}
		},
	// Affiche la l'objet DOM contenant tous les formulaires
	show: function( x, y )
		{
		if( !this.element )
			{
			this.createDomObject() ;
			this.onLayout() ;
			}
		if( x )	this.element.style.left = x ;
		if( y ) this.element.style.top = y ;
		this.element.style.display = "block" ;

		var nb = this.formulaires.length ;
		for( var i = 0 ; i<nb ; i++ )
			{
			this.formulaires[i].onAfterShow() ;
			}
		},
	// Cache l'objet DOM contenant tous les formulaires
	hide: function()
		{
		this.element.style.display = "none" ;
		},
	// Retourne true l'ensemble des formulaires est visible
	visible: function()
		{
		if( this.element.style.display == "block" ) return true ;
		return false ;
		},
	// Detruit le controleur et les formulaires associés
	remove: function()
		{
		var i ;
		for( i=0 ; i<this.formulaires.length ; i++ )
			{
			this.formulaires[i].remove( this ) ;
			}
		if( this.element ) this.element.innerHTML = "" ;
		},
	// Detruit un formulaire du controleur
	removeView: function( formulaire )
		{
		var i = this.getFormulaireIndice( formulaire ) ;
		if( i > -1 ) this.formulaires[i].remove( this ) ;
		if( this.formulaires.length < 2 ) 
			{
			this.element.innerHTML = "" ;
			}
		},
	// Positionne l'ensemble des formulaires
	setPosition: function( x, y )
		{
		this.element.style.left = x ;
		this.element.style.top = y ;
		},
	// Donne le focus au champ n° numfield du formulaire n° numformulaire
	setFocus: function( numformulaire, numfield )
		{
		this.formulaires[numformulaire].setFocus( numfield ) ;
		},
	// Scroll up les valeurs de tous les formulaires
	scrollUp: function()
		{
		var i ;
		for( i=1 ; i<this.formulaires.length ; i++ )
			{
			this.formulaires[i].copyValueTo( this.formulaires[i-1] ) ;
			}
		},
	// Scroll down les valeurs de tous les formulaires
	scrollDown: function()
		{
		var i ;
		for( i=this.formulaires.length-2 ; i >= 0 ; i-- )
			{
			this.formulaires[i].copyValueTo( this.formulaires[i+1] ) ;
			}
		},
	// Quand un champ recoit le focus
	onFocus: function( formulaire, numfield )
		{
		this.restoreStyle() ;
		this.current = this.getFormulaireIndice( formulaire ) ;
		},
	// Line up
	onLineUp: function( formulaire, numfield )
		{
		if( this.current > 0 )
			{
			this.setFocus( this.current - 1, numfield ) ;
			}
		else
			{
			// Ne change pas de ligne va au dernier formulaire
			this.setFocus( this.formulaires.length-1, numfield ) ;
			}
		},
	// Line down
	onLineDown: function( formulaire, numfield )
		{
		if( this.current < this.formulaires.length - 1 )
			{
			this.setFocus( this.current + 1, numfield ) ;
			}
		else
			{
			// Ne change pas de ligne, revient au premier formulaire
			this.setFocus( 0, numfield ) ;
			}
		},
	// Page up
	onPageUp: function( formulaire, numfield )
		{
		},
	// Page down
	onPageDown: function( formulaire, numfield )
		{
		},
	// First line
	onFirstLine: function( formulaire, numfield )
		{
		},
	// Last line
	onLastLine: function( formulaire, numfield )
		{
		}
	} ;
