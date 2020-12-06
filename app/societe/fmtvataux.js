/*********************************************************
* Classe FmTvaTaux: Formulaire de mise a jour
* d'un taux de tva
*********************************************************/

function FmTvaTaux( modele )
	{
	herite( FmTvaTaux, Formulaire ) ;
	this.initFmTvaTaux( modele ) ;
	}

FmTvaTaux.prototype =
	{
	initFmTvaTaux: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'un taux de TVA" ) ;
		
		this.addField( new FfInput( "tva", 10 ) ) ;
		this.addField( new FfInput( "taux", 5 ) ) ;
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
		ha.add( new FfEtiquette( "Code TVA:" ) ) ;
		ha.add( this.getFieldByName( "tva" ) ) ;
		ha.add( new FfEtiquette( "Taux:" ) ) ;
		ha.add( this.getFieldByName( "taux" ) ) ;
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

