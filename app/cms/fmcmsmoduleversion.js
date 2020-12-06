/*********************************************************
* Classe FmCmsModuleVersion: Formulaire d'une version
* d'un module du CMS
*********************************************************/

function FmCmsModuleVersion( formulairecontroler, modele )
	{
	herite( FmCmsModuleVersion, Formulaire ) ;
	this.initFmCmsModuleVersion( formulairecontroler, modele ) ;
	}

FmCmsModuleVersion.prototype =
	{
	initFmCmsModuleVersion: function( modele )
		{
		this.initFormulaire( "Formulaire des versions de module du CMS" ) ;

		this.addField( new FfLabel( "module" ) ) ;
		this.addField( new FfInput( "version", 3 ) ) ;
		this.addField( new FfCheck( "actif" ) ) ;
		this.addField( new FfInput( "libelle", 90 ) ) ;
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Module:" ) ) ;
		ha.add( this.getFieldByName( "module" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Version:" ) ) ;
		ha.add( this.getFieldByName( "version" ) ) ;
		ha.add( new FfEtiquette( "Publié:" ) ) ;
		ha.add( this.getFieldByName( "actif" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;
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

