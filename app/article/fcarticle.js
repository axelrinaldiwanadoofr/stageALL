/*********************************************************
* Classe FcArticle: Controler de formulaire des articles
*********************************************************/

function FcArticle( modele )
	{
	herite( FmArticle, Formulaire ) ;
	this.initFmArticle( formulairecontroler, modele ) ;
	}

FmArticle.prototype =
	{
	initFmArticle: function( modele )
		{
		this.initFormulaire() ;

		this.addField( new FfInput( "reference", 20 ) ) ;
		this.addField( new FfSelect( "type" ) ) ;
		this.addField( new FfSelect( "referencemodele", 40, "select reference, rlibelle from articles where type='Modele' order by libelle" ) ) ;
		this.addField( new FfLabel( "rlibelle", 90 ) ) ;
		this.addField( new FfLabel( "rdescription", 90 ) ) ;
		this.addField( new FfSelect( "unite", 10, "select unite,libelle from unites order by unite" ) ) ;
		this.addField( new FfInput( "libelle", 90 ) ) ;
		this.addField( new FfNicEdit( "description", 90, 20 ) ) ;

		this.getFieldByName( "type" ).addItem( "Article", "Article" ) ;
		this.getFieldByName( "type" ).addItem( "Modele", "Modele" ) ;
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
		ha.add( new FfEtiquette( "Référence:" ) ) ;
		ha.add( this.getFieldByName( "reference" ) ) ;
		ha.add( new FfEtiquette( "Type:" ) ) ;
		ha.add( this.getFieldByName( "type" ) ) ;

		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "rlibelle" ) ) ;

		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Modèle:" ) ) ;
		ha.add( this.getFieldByName( "referencemodele" ) ) ;

		var pbox = this.layout.add( new PageBoxLayout() ) ;

		// Page du résumé
		var page = this.layout.add( pbox.addPage( new PageLayout(), "Résumé" ) ) ;

		ha = page.add( new HTabLayout() ) ;

		page.add( this.getFieldByName( "rdescription" ) ) ;

		// Page de la partie propriété
		page = this.layout.add( pbox.addPage( new PageLayout(), "Propriétés" ) ) ;

		// Page de la partie gestion
		page = this.layout.add( pbox.addPage( new PageLayout(), "Gestion" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Unité:" ) ) ;
		ha.add( this.getFieldByName( "unite" ) ) ;

		page.add( new FfEtiquette( "Description:" ) ) ;
		page.add( this.getFieldByName( "description" ) ) ;
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

