/*********************************************************
* Classe FmArticleStructureTarif: Formulaire de mise a jour
* d'une politique tarifaire
*********************************************************/

function FmArticleStructureTarif( modele )
	{
	herite( FmArticleStructureTarif, Formulaire ) ;
	this.initFmArticleStructureTarif( modele ) ;
	}

FmArticleStructureTarif.prototype =
	{
	initFmArticleStructureTarif: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une politique tarifaire" ) ;
		
		this.addField( new FfInput( "datedebut", 10 ) ) ;
		this.addField( new FfInput( "datefin", 10 ) ) ;
		this.addField( new FfInputFloat( "qtemin", 8 ) ) ;
		this.addField( new FfInputFloat( "qtemax", 8 ) ) ;
		this.addField( new FfInputFloat( "puht_achat", 8 ) ) ;
		this.addField( new FfInputFloat( "txremise", 5 ) ) ;
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
		ha.add( this.getFieldByName( "datedebut" ) ) ;
		ha.add( new FfEtiquette( "fin:" ) ) ;
		ha.add( this.getFieldByName( "datefin" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Quantité minimale:" ) ) ;
		ha.add( this.getFieldByName( "qtemin" ) ) ;
		ha.add( new FfEtiquette( "maximale:" ) ) ;
		ha.add( this.getFieldByName( "qtemax" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Prix unitaire HT:" ) ) ;
		ha.add( this.getFieldByName( "puht_achat" ) ) ;
		ha.add( new FfEtiquette( "Taux de remise:" ) ) ;
		ha.add( this.getFieldByName( "txremise" ) ) ;
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

