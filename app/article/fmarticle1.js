/*********************************************************
* Classe FmArticle: Formulaire des articles
*********************************************************/

function FmArticle( modele_article )
	{
	herite( FmArticle, Formulaire ) ;
	this.initFmArticle( modele_article ) ;
	}

FmArticle.prototype =
	{
	initFmArticle: function( modele_article )
		{
		this.initFormulaire( "Formulaire de mise a jour d'un article" ) ;
		
		// Champ de recherche par libelle
		this.addField( new FfSelectEdit( "r_reference", 40, 20, "select reference, rlibelle from articles where 1 order by rlibelle", "rlibelle" ) ) ;
		
		this.addField( new FfInput( "reference", 20 ) ) ;
		this.addField( new FfSelect( "type" ) ) ;
		this.addField( new FfSelect( "referencemodele", 40, "select reference, rlibelle from articles where type='Modele' order by rlibelle" ) ) ;
		this.addField( new FfImage( "image", 300, 300, 30 ) ) ;
		this.addField( new FfUpLoad( "upload", modele_article.reference, 300, 3000000 ) ) ;
		
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
		this.upload = this.modele.reference ;

		// Cree les formulaires pour les propriétés
		this.la_properties.removeAllItems() ;
		fc_properties = this.formulairecontroler ;
		var modele_properties = ayawf.mvc.getModele( "ArticleProperties", this.modele.reference ) ;
		if( modele_properties )
			{
			var values = modele_properties.values ;
			var la_group = null ;
			for( var i=1 ; i < values.length ; i++ )
				{
				var t = values[i].split( "$" ) ;
				var modele = ayawf.mvc.getModele( t[0], t[1] ) ;
				if( modele )
					{
					if( t[0] == "PropertyRubrique" )
						{
						this.la_properties.add( new FfEtiquette( modele.rubrique ) ) ;
						la_group = this.la_properties.add( new PageLayout( "formulairegroup" ) ) ;
						}
					else if( t[0] == "ApString" )
						{
						var fmp = new FmApString( modele, true ) ;
						fc_properties.addFormulaire( fmp ) ;
						fmp.onLayout() ;
						la_group.add( fmp ) ;
						fmp.setModele( modele ) ;
						fmp.onAfterShow() ;
						fmp.onRefresh() ;
						}
					else if( t[0] == "ApStringMl" )
						{
						var fmp = new FmApStringMl( modele, true ) ;
						fc_properties.addFormulaire( fmp ) ;
						fmp.onLayout() ;
						la_group.add( fmp ) ;
						fmp.setModele( modele ) ;
						fmp.onAfterShow() ;
						fmp.onRefresh() ;
						}
					else if( t[0] == "ApImage" )
						{
						var fmp = new FmApImage( modele, true ) ;
						fc_properties.addFormulaire( fmp ) ;
						fmp.onLayout() ;
						la_group.add( fmp ) ;
						fmp.setModele( modele ) ;
						fmp.onAfterShow() ;
						fmp.onRefresh() ;
						}
					else if( t[0] == "ApTexte" )
						{
						var fmp = new FmApTexte( modele, true ) ;
						fc_properties.addFormulaire( fmp ) ;
						fmp.onLayout() ;
						la_group.add( fmp ) ;
						fmp.setModele( modele ) ;
						fmp.onAfterShow() ;
						fmp.onRefresh() ;
						}
					else if( t[0] == "ApRefArticle" )
						{
						var fmp = new FmApRefArticle( modele, true ) ;
						fc_properties.addFormulaire( fmp ) ;
						fmp.onLayout() ;
						la_group.add( fmp ) ;
						fmp.setModele( modele ) ;
						fmp.onAfterShow() ;
						fmp.onRefresh() ;
						}
					}
				}
			}
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Recherche par libellé:" ) ) ;
		ha.add( this.getFieldByName( "r_reference" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Référence:" ) ) ;
		ha.add( this.getFieldByName( "reference" ) ) ;
		ha.add( new FfEtiquette( "Type:" ) ) ;
		ha.add( this.getFieldByName( "type" ) ) ;
		ha.add( new FfEtiquette( "Image:" ) ) ;
		ha.add( this.getFieldByName( "image" ) ) ;
		ha.add( this.getFieldByName( "upload" ) ) ;

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
		this.la_properties = this.layout.add( pbox.addPage( new PageLayout(), "Propriétés" ) ) ;

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
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "upload" )
			{
			this.image = value ;
			this.getFieldByName( "image" ).setHeight( this.getFieldByName( "upload" ).height ) ;
			}
		if( fieldname == "r_reference" )
			{
			if( value != "" )
				{
				var modele = ayawf.mvc.getModele( "Article", value ) ;
				if( modele ) this.setModele( modele ) ;
				else ayawf.mvc.loadModeleFromSqlSelect( "Article", "articles", "reference='" + value + "'", "", this, this.onLoadModele ) ; 
				}
			}
		return true ;
		},
	// Devient selectionnée
	onLoadModele: function( modele )
		{
		if( modele ) this.setModele( modele ) ;
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

