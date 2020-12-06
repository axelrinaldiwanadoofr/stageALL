/*********************************************************
* Classe FmTypePort: Formulaire de mise a jour
* d'un type de port
*********************************************************/

function FmTypePort( modele )
	{
	herite( FmTypePort, Formulaire ) ;
	this.initFmTypePort( modele ) ;
	}

FmTypePort.prototype =
	{
	initFmTypePort: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'un type de port" ) ;
		
		this.addField( new FfInput( "type", 30 ) ) ;
		this.addField( new FfInput( "libelle", 80 ) ) ;
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
		ha.add( new FfEtiquette( "Type:" ) ) ;
		ha.add( this.getFieldByName( "type" ) ) ;

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

