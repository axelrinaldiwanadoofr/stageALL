/*********************************************************
* Classe FmCmsModuleArgument: Formulaire pour un argument
* d'un module du CMS
*********************************************************/

function FmCmsModuleArgument( formulairecontroler, modele )
	{
	herite( FmCmsModuleArgument, Formulaire ) ;
	this.initFmCmsModuleArgument( formulairecontroler, modele ) ;
	}

FmCmsModuleArgument.prototype =
	{
	initFmCmsModuleArgument: function( modele )
		{
		this.initFormulaire( "Formulaire pour un argument de module du CMS" ) ;

		this.addField( new FfInput( "name", 20 ) ) ;
		this.addField( new FfSelect( "type", 15 ) ) ;
		this.addField( new FfInput( "libelle", 90 ) ) ;
		this.addField( new FfInput( "value", 40 ) ) ;

		this.getFieldByName( "type" ).addItem( "int", "Nombre entier" ) ;
		this.getFieldByName( "type" ).addItem( "float", "Nombre reel" ) ;
		this.getFieldByName( "type" ).addItem( "string", "Texte" ) ;
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Argument:" ) ) ;
		ha.add( this.getFieldByName( "name" ) ) ;
		ha.add( new FfEtiquette( "Type de valeur:" ) ) ;
		ha.add( this.getFieldByName( "type" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Valeur par defaut:" ) ) ;
		ha.add( this.getFieldByName( "value" ) ) ;
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
		}
	} ;

