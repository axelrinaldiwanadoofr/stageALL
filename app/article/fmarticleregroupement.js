/*********************************************************
* Classe FmArticleRegroupement: Formulaire de définition
* d'un regroupement pour des articles
*********************************************************/

function FmArticleRegroupement( formulairecontroler, modele )
	{
	herite( FmArticleRegroupement, Formulaire ) ;
	this.initFmArticleRegroupement( formulairecontroler, modele ) ;
	}

FmArticleRegroupement.prototype =
	{
	initFmArticleRegroupement: function( formulairecontroler, modele )
		{
		this.initFormulaire( "Formulaire de regroupement d'article" ) ;

		this.addField( new FfInput( "regroupement", 20 ) ) ;
		this.addField( new FfInput( "libelle", 90 ) ) ;
		this.addField( new FfSelect( "pere", 40, "select regroupement, libelle from articleregroupement order by regroupement" ) ) ;

		this.addField( new FfSelect( "modeshow", 20 ) ) ;
		this.addField( new FfSelect( "articles", 30 ) ) ;
		this.addField( new FfSelect( "referencemodele", 40, "select reference, rlibelle from articles where type='Modele' order by rlibelle" ) ) ;

		this.addField( new FfImage( "image", 30, 30, 30 ) ) ;
		this.addField( new FfUpLoad( "uploadimage", null, 3000000 ) ) ;
		this.addField( new FfImage( "imagevalue", 30, 30, 30 ) ) ;
		this.addField( new FfUpLoad( "uploadimagevalue", null, 3000000 ) ) ;

		this.addField( new FfSelect( "rubrique", 30, "select rubrique, libelle from propertyrubrique order by rubrique" ) ) ;
		this.addField( new FfSelect( "property", 30 ) ) ;
		this.addField( new FfInput( "value", 20 ) ) ;

		this.addField( new FfSelect( "referencemodelecreate", 40, "select reference, rlibelle from articles where type='Modele' order by rlibelle" ) ) ;

		this.getFieldByName( "articles" ).addItem( 0, "Affiche des valeurs de propriété" ) ;
		this.getFieldByName( "articles" ).addItem( 1, "Affiche des articles" ) ;

		this.getFieldByName( "modeshow" ).addItem( 1, "Visible à la racine des regroupements" ) ;
		this.getFieldByName( "modeshow" ).addItem( 0, "Sous regroupement" ) ;
		this.getFieldByName( "modeshow" ).addItem( 2, "Visible sous un article" ) ;

		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		if( parseInt( this.articles ) ) this.la_referencemodele.show() ;
		else this.la_referencemodele.hide() ;

		if( this.rubrique )
			{
			var sql = "SELECT name, libelle from property where rubrique='" + this.rubrique + "' order by name" ;
			this.getFieldByName( "property" ).populateItemsFromSql( sql ) ;
			}
		},
	// Change de modele
	onModeleChanged: function()
		{
		if( this.modele )
			{
			if( this.image == "" ) this.uploadimage = "image/" + this.modele.regroupement + "_0.jpg" ;
			else this.uploadimage = this.image ;

			if( this.imagevalue == "" ) this.uploadimagevalue = "image/" + this.modele.regroupement + "_value_0.jpg" ;
			else this.uploadimagevalue = this.imagevalue ;
			}
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Regroupement:" ) ) ;
		ha.add( this.getFieldByName( "regroupement" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;

		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Regroupement père:" ) ) ;
		ha.add( this.getFieldByName( "pere" ) ) ;

		var pbox = this.layout.add( new PageBoxLayout() ) ;

		// Page affichage
		var page = this.layout.add( pbox.addPage( new PageLayout(), "Mode d'affichage" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Zone d'affichage:" ) ) ;
		ha.add( this.getFieldByName( "modeshow" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Ce qui doit être affiché:" ) ) ;
		ha.add( this.getFieldByName( "articles" ) ) ;

		this.la_referencemodele = page.add( new HTabLayout() ) ;
		this.la_referencemodele.add( new FfEtiquette( "Modèle des articles devant être affichés:" ) ) ;
		this.la_referencemodele.add( this.getFieldByName( "referencemodele" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Image du regroupement:" ) ) ;
		ha.add( this.getFieldByName( "image" ) ) ;
		ha.add( this.getFieldByName( "uploadimage" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Image associée aux valeurs affichées:" ) ) ;
		ha.add( this.getFieldByName( "imagevalue" ) ) ;
		ha.add( this.getFieldByName( "uploadimagevalue" ) ) ;

		// Page de la partie propriété
		page = this.layout.add( pbox.addPage( new PageLayout(), "Propriété utilisée pour le regroupement" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Rubrique:" ) ) ;
		ha.add( this.getFieldByName( "rubrique" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Propriété:" ) ) ;
		ha.add( this.getFieldByName( "property" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Valeur éventuelle pour la propriété:" ) ) ;
		ha.add( this.getFieldByName( "value" ) ) ;

		// Page de la partie propriété
		page = this.layout.add( pbox.addPage( new PageLayout(), "Paramêtres pour la création d'article" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Modèle d'article à utiliser:" ) ) ;
		ha.add( this.getFieldByName( "referencemodelecreate" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( field, value )
		{
		if( field == "articles" )
			{
			if( parseInt( value ) ) this.la_referencemodele.show() ;
			else this.la_referencemodele.hide() ;
			}
		if( field == "uploadimage" )
			{
			this.image = value ;
			this.getFieldByName( "image" ).setHeight( this.getFieldByName( "uploadimage" ).height ) ;
			}
		if( field == "uploadimagevalue" )
			{
			this.imagevalue = value ;
			this.getFieldByName( "imagevalue" ).setHeight( this.getFieldByName( "uploadimagevalue" ).height ) ;
			}
		if( field == "rubrique" && value != "" )
			{
			this.getFieldByName( "property" ).clearAllItems() ;
			var sql = "SELECT name, libelle from property where rubrique='" + value + "' order by name" ;
			this.getFieldByName( "property" ).populateItemsFromSql( sql ) ;
			}
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

