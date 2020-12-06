/*********************************************************
* Classe FmCmsModule: Formulaire d'un module du CMS
*********************************************************/

function FmCmsModule( formulairecontroler, modele )
	{
	herite( FmCmsModule, Formulaire ) ;
	this.initFmCmsModule( formulairecontroler, modele ) ;
	}

FmCmsModule.prototype =
	{
	initFmCmsModule: function( modele )
		{
		this.initFormulaire( "Formulaire des modules du CMS" ) ;

		this.addField( new FfInput( "module", 40 ) ) ;
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

