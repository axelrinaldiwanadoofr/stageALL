/*********************************************************
* Classe FmTauxHoraireValeur: Formulaire de mise a jour
* d'un taux de tva
*********************************************************/

function FmTauxHoraireValeur( modele )
	{
	herite( FmTauxHoraireValeur, Formulaire ) ;
	this.initFmTauxHoraireValeur( modele ) ;
	}

FmTauxHoraireValeur.prototype =
	{
	initFmTauxHoraireValeur: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une période pour un taux horaire" ) ;
		
		this.addField( new FfInput( "debut", 10 ) ) ;
		this.addField( new FfInput( "fin", 10 ) ) ;
		this.addField( new FfInput( "taux_normal", 5 ) ) ;
		this.addField( new FfInput( "taux_10", 5 ) ) ;
		this.addField( new FfInput( "taux_25", 5 ) ) ;
		this.addField( new FfInput( "taux_50", 5 ) ) ;
		this.addField( new FfInput( "taux_100", 5 ) ) ;
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
		ha.add( new FfEtiquette( "Date de début:" ) ) ;
		ha.add( this.getFieldByName( "debut" ) ) ;
		ha.add( new FfEtiquette( "fin:" ) ) ;
		ha.add( this.getFieldByName( "fin" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Taux normal:" ) ) ;
		ha.add( this.getFieldByName( "taux_normal" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Taux à +10%:" ) ) ;
		ha.add( this.getFieldByName( "taux_10" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Taux à +25%:" ) ) ;
		ha.add( this.getFieldByName( "taux_25" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Taux à +50%:" ) ) ;
		ha.add( this.getFieldByName( "taux_50" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Taux à +100%:" ) ) ;
		ha.add( this.getFieldByName( "taux_100" ) ) ;
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

