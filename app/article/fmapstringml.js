/*********************************************************
* Classe FmApStringMl: Formulaire des propriétés ApStringMl
*********************************************************/

function FmApStringMl( modele, hidetitle )
	{
	herite( FmApStringMl, Formulaire ) ;
	this.initFmApStringMl( modele, hidetitle ) ;
	}

FmApStringMl.prototype =
	{
	initFmApStringMl: function( modele, hidetitle )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une propriete multiligne", hidetitle) ;

		this.addField( new FfLabel( "name", 20 ) ) ;
		this.addField( new FfTextarea( "value", 60, 10 ) ) ;
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
		ha.add( this.getFieldByName( "value" ) ) ;
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

