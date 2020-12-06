/*********************************************************
* Classe FormManager de gestion d'un ensemble de formulaire
*********************************************************/


function FormManager( idx )
	{
	this.idx = idx ;
	this.formulaires = new Array() ; // Collection des formulaires
	this.current = 0 ; // N° du formulaire courrante
	}

FormManager.prototype =
	{
	// Ajoute une vue dans la vue
	addFormulaire: function( formulaire )
		{
		this.formulaires.push( formulaire ) ;
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
	show: function()
		{
		element = document.getElementById( this.idx ) ;
		if( element ) element.style.display = "block" ;
		},
	// Cache l'objet DOM contenant tous les formulaires
	hide: function()
		{
		element = document.getElementById( this.idx ) ;
		if( element ) element.style.display = "none" ;
		},
	// Retourne true l'ensemble des formulaires est visible
	visible: function()
		{
		element = document.getElementById( this.idx ) ;
		if( element )
			{
			if( element.style.display == "block" ) return true ;
			}
		return false ;
		},
	// Positionne l'ensemble des formulaires
	setPosition: function( x, y )
		{
		element = document.getElementById( this.idx ) ;
		if( element )
			{
			element.style.left = x ;
			element.style.top = y ;
			}
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
	// Line up
	onLineUp: function( formulaire, numfield )
		{
		if( this.current > 0 )
			{
			this.setFocus( this.current - 1, numfield ) ;
			}
		else
			{
			formulaire.doValueChanged( numfield ) ;
			this.scrollDown() ;
			var request = "formmanager_onlineup.php5?sessionid=" + sessionid +"&idx=" + this.idx ;
			AjaxSendForExecute( request ) ;
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
			formulaire.doValueChanged( numfield ) ;
			this.scrollUp() ;
			var request = "formmanager_onlinedown.php5?sessionid=" + sessionid +"&idx=" + this.idx ;
			AjaxSendForExecute( request ) ;
			}
		},
	// Page up
	onPageUp: function( formulaire, numfield )
		{
		this.formulaires[this.current].doValueChanged( numfield ) ;
		var request = "formmanager_onpageup.php5?sessionid=" + sessionid +"&idx=" + this.idx ;
		AjaxSendForExecute( request ) ;
		},
	// Page down
	onPageDown: function( formulaire, numfield )
		{
		this.formulaires[this.current].doValueChanged( numfield ) ;
		var request = "formmanager_onpagedown.php5?sessionid=" + sessionid +"&idx=" + this.idx ;
		AjaxSendForExecute( request ) ;
		},
	// First line
	onFirstLine: function( formulaire, numfield )
		{
		var request = "formmanager_onfirstline.php5?sessionid=" + sessionid +"&idx=" + this.idx ;
		this.formulaires[this.current].doValueChanged( numfield ) ;
		AjaxSendForExecute( request ) ;
		},
	// Last line
	onLastLine: function( formulaire, numfield )
		{
		this.formulaires[this.current].doValueChanged( numfield ) ;
		var request = "formmanager_onlastline.php5?sessionid=" + sessionid +"&idx=" + this.idx ;
		AjaxSendForExecute( request ) ;
		},
	// Quand un champ recoit le focus
	onFocus: function( formulaire, field )
		{
		this.restoreStyle() ;
		this.current = this.getformulaireIndice( formulaire ) ;
		},
	// Evenement Line up venant d'une vue fille
	onDelete: function( formulaire )
		{
		var request = "formulaire_ondeletevalueinchildformulaire.php5?sessionid=" + sessionid +"&idx=" + this.idx + "&formidx=" + formulaire.idx ; ;
		AjaxSendForExecute( request ) ;
		}
	} ;
