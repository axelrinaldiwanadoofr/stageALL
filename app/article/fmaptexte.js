/*********************************************************
* Classe FmApTexte: Formulaire des propriétés ApTexte
*********************************************************/

function FmApTexte( modele, hidetitle )
	{
	herite( FmApTexte, Formulaire ) ;
	this.initFmApTexte( modele, hidetitle ) ;
	}

FmApTexte.prototype =
	{
	initFmApTexte: function( modele, hidetitle )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une propriete texte", hidetitle ) ;

		this.addField( new FfLabel( "name", 20 ) ) ;
		this.addField( new FfNicEdit( "texte", 90, 20 ) ) ;
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
		ha.add( new FfEtiquette( "Propriété:" ) ) ;
		ha.add( this.getFieldByName( "name" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( this.getFieldByName( "texte" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( field, value )
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

