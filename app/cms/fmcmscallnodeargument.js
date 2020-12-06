/*********************************************************
* Classe FmCmsCallNodeArgument: Formulaire d'un argument 
* pour un noeud d'appel de module du CMS
*********************************************************/

function FmCmsCallNodeArgument( formulairecontroler, modele, argname )
	{
	herite( FmCmsCallNodeArgument, Formulaire ) ;
	this.initFmCmsCallNodeArgument( formulairecontroler, modele, argname ) ;
	}

FmCmsCallNodeArgument.prototype =
	{
	initFmCmsCallNodeArgument: function( formulairecontroler, modele, argumentname )
		{
		this.initFormulaire( "Formulaire pour un argument d'appel de module" ) ;
		this.setModele( modele ) ;
		
		this.argumentname = argumentname ;

		this.addField( new FfLabel( "argname" ) ) ;
		this.addField( new FfInput( "value", 50 ) ) ;		
		},
	// Recherche la valeur de l'arguement
	getArgumentValue: function( argname )
		{
		var args = this.modele.arguments.split( "<arg>" ) ;
		for( var i=0 ; i<args.length ; i++ )
			{
			var arg = args[i].split( "<argsep>" ) ;
			if( arg[0] == this.argname ) return arg[1] ;
			}
		return "" ;
		},
	// Met a jour la valeur de l'arguement
	setArgumentValue: function( argname, value )
		{
		var args = this.modele.arguments.split( "<arg>" ) ;
		var result = "" ;
		for( var i=0 ; i<args.length ; i++ )
			{
			var arg = args[i].split( "<argsep>" ) ;
			if( arg[0] == this.argname ) arg[1] = value ;
			if( !i ) result = arg[0] + "<argsep>" + arg[1] ;
			else result += "<arg>" + arg[0] + "<argsep>" + arg[1] ;
			}
		this.modele.setValue( "arguments", result ) ;
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand les attributs sont changés
	onAttributesChanged: function()
		{
		this.argname = this.argumentname ;
		this.value = this.getArgumentValue( this.argname ) ;
		return true ;
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( this.getFieldByName( "argname" ) ) ;
		ha.add( this.getFieldByName( "value" ) ) ;
		},
		
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "value" )
			{
			this.setArgumentValue( this.argname, value ) ;
			}
		return true ;
		},
	// Devient selectionnée
	onGetSelected: function()
		{
		},
	// Devient non selectionnée
	onGetUnSelected: function()
		{
		}
	} ;

