/*********************************************************
* Classe FmUnite: Formulaire de mise a jour
* d'un type de port
*********************************************************/

function FmUnite( modele )
	{
	herite( FmUnite, Formulaire ) ;
	this.initFmUnite( modele ) ;
	}

FmUnite.prototype =
	{
	initFmUnite: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une unité" ) ;
		
		this.addField( new FfInput( "unite", 10 ) ) ;
		this.addField( new FfInput( "libelle", 80 ) ) ;
		this.addField( new FfSelect( "reference", 10, "select unite, libelle from unites order by unite" ) ) ;
		this.addField( new FfInput( "coefficient", 5 ) ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Unité:" ) ) ;
		ha.add( this.getFieldByName( "unite" ) ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Référence:" ) ) ;
		ha.add( this.getFieldByName( "reference" ) ) ;
		ha.add( new FfEtiquette( "Coéfficient de conversion:" ) ) ;
		ha.add( this.getFieldByName( "coefficient" ) ) ;
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

