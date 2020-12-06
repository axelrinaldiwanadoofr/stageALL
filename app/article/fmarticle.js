/*********************************************************
* Classe FmArticle: Formulaire des articles
*********************************************************/

function FmArticle( modele_article, treenode )
	{
	herite( FmArticle, Formulaire ) ;
	this.initFmArticle( modele_article, treenode ) ;
	}

FmArticle.prototype =
	{
	initFmArticle: function( modele_article, treenode )
		{
		this.treenode = treenode ;
		
		this.initFormulaire( "Formulaire de mise a jour d'un article" ) ;
		
		// Champ de recherche par libelle
		this.addField( new FfSelectEdit( "r_reference", 40, 20, "select reference, rlibelle from articles where 1 order by rlibelle", "rlibelle" ) ) ;
		
		this.addField( new FfInput( "reference", 20 ) ) ;
		this.addField( new FfSelect( "type" ) ) ;
		this.addField( new FfSelect( "referencemodele", 40, "select reference, rlibelle from articles where type='Modele' order by rlibelle" ) ) ;
		this.addField( new FfImage( "image", 300, 300, 30 ) ) ;
		if( modele_article ) this.addField( new FfUpLoad( "upload", "image/" + modele_article.reference, 300, 3000000 ) ) ;
		else this.addField( new FfUpLoad( "upload", "image", 300, 3000000 ) ) ;
		this.addField( new FfSelect( "codecat", 20, "select categorie, libelle from categoriearticles order by libelle" ) ) ;
		this.addField( new FfSelect( "codefam", 20 ) ) ;
		
		this.addField( new FfLabel( "rlibelle", 90 ) ) ;
		this.addField( new FfLabel( "rdescription", 90 ) ) ;
		this.addField( new FfSelect( "unite", 10, "select unite,libelle from unites order by unite" ) ) ;
		this.addField( new FfCheck( "fabrique" ) ) ;
		this.addField( new FfCheck( "achete" ) ) ;
		this.addField( new FfSelectEdit( "fabriquant", 5, 20, "select sid,rs from structures where 1 order by rs", "rs", 30 ) ) ;
		this.addField( new FfLabel( "rsfabriquant", 90 ) ) ;
		this.addField( new FfInput( "reffabriquant", 20 ) ) ;
		
		this.addField( new FfInput( "libelle", 90 ) ) ;
		this.addField( new FfNicEdit( "description", 90, 20 ) ) ;

		this.addField( new FfInputFloat( "puht_achat", 8 ) ) ;
		this.addField( new FfSelect( "achatmodecalcul", 30 ) ) ;

		this.addField( new FfInputFloat( "temps_fabrication", 5 ) ) ;
		this.addField( new FfInputFloat( "puht_fabrication", 8 ) ) ;

		this.addField( new FfInputFloat( "temps_operation", 5, true ) ) ;
		this.addField( new FfInputFloat( "puht_operation", 8, true ) ) ;
		this.addField( new FfInputFloat( "temps_soustraitance", 5, true ) ) ;
		this.addField( new FfInputFloat( "puht_soustraitance", 8, true ) ) ;
		this.addField( new FfCheck( "operationmode" ) ) ;

		this.addField( new FfInputFloat( "temps_composant", 5, true ) ) ;
		this.addField( new FfInputFloat( "puht_composant", 8, true ) ) ;
		this.addField( new FfCheck( "composantmode" ) ) ;
		
		this.addField( new FfInputFloat( "temps_total", 5, true ) ) ;
		this.addField( new FfInputFloat( "puht_revient", 8, true ) ) ;
		
		this.addField( new FfInputFloat( "marge_vente", 6 ) ) ;
		this.addField( new FfInputFloat( "puht_vente", 8 ) ) ;
		this.addField( new FfCheck( "puhtventecalcul" ) ) ;
		this.addField( new FfSelect( "tva", 6, "select tva, tva from tvataux order by tva" ) ) ;
		this.addField( new FfInputFloat( "puttc_vente", 8 ) ) ;

		// Description suplementaire
		this.addField( new FfImage( "image1", 300, 300, 30 ) ) ;
		if( modele_article ) this.addField( new FfUpLoad( "upload1", "image/" + modele_article.reference + "1", 300, 3000000 ) ) ;
		else this.addField( new FfUpLoad( "upload1", "image", 300, 3000000 ) ) ;

		this.addField( new FfImage( "image2", 300, 300, 30 ) ) ;
		if( modele_article ) this.addField( new FfUpLoad( "upload2", "image/" + modele_article.reference + "2", 300, 3000000 ) ) ;
		else this.addField( new FfUpLoad( "upload2", "image", 300, 3000000 ) ) ;

		this.addField( new FfImage( "image3", 300, 300, 30 ) ) ;
		if( modele_article ) this.addField( new FfUpLoad( "upload3", "image/" + modele_article.reference + "3", 300, 3000000 ) ) ;
		else this.addField( new FfUpLoad( "upload3", "image", 300, 3000000 ) ) ;
		
		this.addField( new FfNicEdit( "description1", 90, 20 ) ) ;
		this.addField( new FfNicEdit( "description2", 90, 20 ) ) ;
		this.addField( new FfNicEdit( "description3", 90, 20 ) ) ;
		
		this.getFieldByName( "type" ).addItem( "Article", "Article" ) ;
		this.getFieldByName( "type" ).addItem( "Modele", "Modele" ) ;

		this.getFieldByName( "achatmodecalcul" ).addItem( "0", "à partir du puht_achat de l'article" ) ;
		this.getFieldByName( "achatmodecalcul" ).addItem( "1", "à partir du puht_achat du fournisseur choisi" ) ;
		this.getFieldByName( "achatmodecalcul" ).addItem( "2", "à partir du puht_achat du fournisseur et de la quantité" ) ;
		
		this.la_rubrique = [] ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		},
	// Change de modele
	onModeleChanged: function()
		{
		this.upload = "image/" + this.modele.reference ;
		this.upload1 = "image/" + this.modele.reference + "1" ;
		this.upload2 = "image/" + this.modele.reference + "2" ;
		this.upload3 = "image/" + this.modele.reference + "3" ;

		// Cree les formulaires pour les rubriques et propriétés
		this.la_properties.removeAllItems() ;
		fc_properties = this.formulairecontroler ;
		
		var sqlrubrique = new SqlSelect( "select distinct ap.rubrique from ap_string as ap, propertyrubrique as r where ap.rubrique = r.rubrique and reference='" + this.modele.reference + "' order by noordre",
			0, -1,
			this,
			this.onReceveRubrique
			) ;
			
		// Liste des familles en rapport avec la categorie
		this.getFieldByName( "codefam" ).clearAllItems() ;
		if( this.modele.codecat != "" ) 
			this.getFieldByName( "codefam" ).populateItemsFromSql( "select famille, libelle from famillearticles where categorie='" + this.modele.codecat + "' order by famille" ) ;
			
		// Affiche ou cache la zone achete
		if( parseInt( this.modele.achete ) ) this.la_achete.show() ;
		else this.la_achete.hide() ;

		// Affiche ou cache la zone fabrication
		if( parseInt( this.modele.fabrique ) ) this.la_fabrique.show() ;
		else this.la_fabrique.hide() ;
		
		// Raison sociale du fabriquant
		if( this.modele.fabriquant ) var sql = new SqlSelect( "select rs from structures where sid=" + this.modele.fabriquant, 0, -1, this, this.onReceveRsFabriquant ) ;
		},
	// Reception de la raison sociale du fabriquant
	onReceveRsFabriquant: function( sql )
		{
		this.rsfabriquant = sql.rows[0][0] ;
		this.copyAttributeValuesToFields() ;
		},
	// A reception des rubriques de proprietes
	onReceveRubrique: function( sql )
		{
		for( var i=0 ; i<sql.rows.length ; i++ )
			{
			var rubrique = sql.rows[i][0] ;
			this.la_properties.add( new FfEtiquette( "<b>" + rubrique + "</b>" ) ) ;
			this.la_rubrique[rubrique] = this.la_properties.add( new PageLayout( "formulairegroup" ) ) ;
			
			// Proprietes ApString
			ayawf.mvc.loadModeleFromSqlSelect(
			"ApString",
			"ap_string" ,
			"reference='" + this.modele.reference + "' and rubrique='" + rubrique + "'",
			"name",
			this,
			this.onReceveProperty,
			true ) ;
			
			// Proprietes ApStringMl
			ayawf.mvc.loadModeleFromSqlSelect(
			"ApStringMl",
			"ap_stringml" ,
			"reference='" + this.modele.reference + "' and rubrique='" + rubrique + "'",
			"name",
			this,
			this.onReceveProperty,
			true ) ;
			
			// Proprietes ApImage
			ayawf.mvc.loadModeleFromSqlSelect(
			"ApImage",
			"ap_image" ,
			"reference='" + this.modele.reference + "' and rubrique='" + rubrique + "'",
			"name",
			this,
			this.onReceveProperty,
			true ) ;
			
			// Proprietes ApTexte
			ayawf.mvc.loadModeleFromSqlSelect(
			"ApTexte",
			"ap_texte" ,
			"reference='" + this.modele.reference + "' and rubrique='" + rubrique + "'",
			"name",
			this,
			this.onReceveProperty,
			true ) ;
			
			// Proprietes ApRefArticle
			ayawf.mvc.loadModeleFromSqlSelect(
			"ApRefArticle",
			"ap_refarticle" ,
			"reference='" + this.modele.reference + "' and rubrique='" + rubrique + "'",
			"name",
			this,
			this.onReceveProperty,
			true ) ;
			}
		},
	// Recoie un modele de propriete
	onReceveProperty: function( modele )
		{
		var fmp = null ;
		var classname = modele.getClassname() ;
		
		// Proprietes
		if( classname == "ApString" ) fmp = new FmApString( modele, true ) ;
		else if( classname == "ApStringMl" ) fmp = new FmApStringMl( modele, true ) ;
		else if( classname == "ApImage" ) fmp = new FmApImage( modele, true ) ;
		else if( classname == "ApTexte" ) fmp = new FmApTexte( modele, true ) ;
		else if( classname == "ApRefArticle" ) fmp = new FmApRefArticle( modele, true ) ;
		
		if( fmp )
			{
			fc_properties.addFormulaire( fmp ) ;
			fmp.onLayout() ;
			this.la_rubrique[modele.rubrique].add( fmp ) ;
			fmp.setModele( modele ) ;
			fmp.onAfterShow() ;
			fmp.onRefresh() ;
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

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Catégorie:" ) ) ;
		ha.add( this.getFieldByName( "codecat" ) ) ;
		ha.add( new FfEtiquette( "Famille:" ) ) ;
		ha.add( this.getFieldByName( "codefam" ) ) ;
		
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

		// Page de description
		var page = this.layout.add( pbox.addPage( new PageLayout(), "Description" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		page.add( new FfEtiquette( "Description:" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		page.add( this.getFieldByName( "description" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		page.add( new FfEtiquette( "Image annexe 1:" ) ) ;
		ha.add( this.getFieldByName( "image1" ) ) ;
		ha.add( this.getFieldByName( "upload1" ) ) ;
		
		ha = page.add( new HTabLayout() ) ;
		page.add( new FfEtiquette( "Description annexe 1:" ) ) ;
		ha = page.add( new HTabLayout() ) ;
		page.add( this.getFieldByName( "description1" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		page.add( new FfEtiquette( "Image annexe 2:" ) ) ;
		ha.add( this.getFieldByName( "image2" ) ) ;
		ha.add( this.getFieldByName( "upload2" ) ) ;
		
		ha = page.add( new HTabLayout() ) ;
		page.add( new FfEtiquette( "Description annexe 2:" ) ) ;
		ha = page.add( new HTabLayout() ) ;
		page.add( this.getFieldByName( "description2" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		page.add( new FfEtiquette( "Image annexe 3:" ) ) ;
		ha.add( this.getFieldByName( "image3" ) ) ;
		ha.add( this.getFieldByName( "upload3" ) ) ;
		
		ha = page.add( new HTabLayout() ) ;
		page.add( new FfEtiquette( "Description annexe 3:" ) ) ;
		ha = page.add( new HTabLayout() ) ;
		page.add( this.getFieldByName( "description3" ) ) ;
		
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
		ha.add( new FfEtiquette( "Fabriqué:" ) ) ;
		ha.add( this.getFieldByName( "fabrique" ) ) ;
		ha.add( new FfEtiquette( "Acheté:" ) ) ;
		ha.add( this.getFieldByName( "achete" ) ) ;

		// Gestion achat
		this.la_achete = page.add( new VTabLayout( "cadrebleu" ) ) ;
		
		ha = this.la_achete.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Fabriquant:" ) ) ;
		ha.add( this.getFieldByName( "fabriquant" ) ) ;
		ha.add( this.getFieldByName( "rsfabriquant" ) ) ;

		ha = this.la_achete.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Référence du fabriquant:" ) ) ;
		ha.add( this.getFieldByName( "reffabriquant" ) ) ;
		ha.add( new FfEtiquette( "Prix unitaire HT achat:" ) ) ;
		ha.add( this.getFieldByName( "puht_achat" ) ) ;

		ha = this.la_achete.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Mode de calcul du prix:" ) ) ;
		ha.add( this.getFieldByName( "achatmodecalcul" ) ) ;

		// Gestion fabrication
		this.la_fabrique = page.add( new VTabLayout( "cadrebleu" ) ) ;
		
		ha = this.la_fabrique.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "<b>Fabrication:</b>" ) ) ;
		ha.add( new FfEtiquette( "Temps unitaire:" ) ) ;
		ha.add( this.getFieldByName( "temps_fabrication" ) ) ;
		ha.add( new FfEtiquette( "Hrs Prix unitaire HT:" ) ) ;
		ha.add( this.getFieldByName( "puht_fabrication" ) ) ;

		ha = this.la_fabrique.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "<b>Opérations internes:</b>" ) ) ;
		ha.add( new FfEtiquette( "Temps unitaire:" ) ) ;
		ha.add( this.getFieldByName( "temps_operation" ) ) ;
		ha.add( new FfEtiquette( "Hrs Prix unitaire HT:" ) ) ;
		ha.add( this.getFieldByName( "puht_operation" ) ) ;

		ha = this.la_fabrique.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "<b>Sous traitance:</b>" ) ) ;
		ha.add( new FfEtiquette( "Temps unitaire:" ) ) ;
		ha.add( this.getFieldByName( "temps_soustraitance" ) ) ;
		ha.add( new FfEtiquette( "Hrs Prix unitaire HT:" ) ) ;
		ha.add( this.getFieldByName( "puht_soustraitance" ) ) ;
		ha.add( new FfEtiquette( "Prise en compte des operations:" ) ) ;
		ha.add( this.getFieldByName( "operationmode" ) ) ;

		ha = this.la_fabrique.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "<b>Les composants:</b>" ) ) ;
		ha.add( new FfEtiquette( "Temps unitaire:" ) ) ;
		ha.add( this.getFieldByName( "temps_composant" ) ) ;
		ha.add( new FfEtiquette( "Hrs Prix unitaire HT:" ) ) ;
		ha.add( this.getFieldByName( "puht_composant" ) ) ;
		ha.add( new FfEtiquette( "Prise en compte des composants:" ) ) ;
		ha.add( this.getFieldByName( "composantmode" ) ) ;

		ha = this.la_fabrique.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Temps total de fabrication:" ) ) ;
		ha.add( this.getFieldByName( "temps_total" ) ) ;
		
		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Prix unitaire HT revient:" ) ) ;
		ha.add( this.getFieldByName( "puht_revient" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Coef marge vente en %:" ) ) ;
		ha.add( this.getFieldByName( "marge_vente" ) ) ;
		ha.add( new FfEtiquette( "Prix unitaire HT vente:" ) ) ;
		ha.add( this.getFieldByName( "puht_vente" ) ) ;		
		ha.add( new FfEtiquette( "Calcule prix vente a partir du taux de marge:" ) ) ;
		ha.add( this.getFieldByName( "puhtventecalcul" ) ) ;		

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Taux de Tva:" ) ) ;
		ha.add( this.getFieldByName( "tva" ) ) ;
		ha.add( new FfEtiquette( "Prix unitaire TTC vente:" ) ) ;
		ha.add( this.getFieldByName( "puttc_vente" ) ) ;		
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "upload" )
			{
			this.image = value ;
			this.getFieldByName( "image" ).setHeight( this.getFieldByName( "upload" ).height ) ;
			}
		if( fieldname == "upload1" )
			{
			this.image1 = value ;
			this.getFieldByName( "image1" ).setHeight( this.getFieldByName( "upload1" ).height ) ;
			}
		if( fieldname == "upload2" )
			{
			this.image2 = value ;
			this.getFieldByName( "image2" ).setHeight( this.getFieldByName( "upload2" ).height ) ;
			}
		if( fieldname == "upload3" )
			{
			this.image3 = value ;
			this.getFieldByName( "image3" ).setHeight( this.getFieldByName( "upload3" ).height ) ;
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
		if( fieldname == "codecat" )
			{
			this.getFieldByName( "codefam" ).clearAllItems() ;
			if( value != "" ) this.getFieldByName( "codefam" ).populateItemsFromSql( "select famille, libelle from famillearticles where categorie='" + value + "' order by famille" ) ;
			}
			
		if( fieldname == "fabriquant" )
			{
			if( value != "" ) var sql = new SqlSelect( "select rs from structures where sid=" + value, 0, -1, this, this.onReceveRsFabriquant ) ;
			else this.rsfabriquant = "" ;
			}
		if( fieldname == "achete" )
			{
			if( value ) this.la_achete.show() ;
			else this.la_achete.hide() ;
			}			
		if( fieldname == "fabrique" )
			{
			if( value ) this.la_fabrique.show() ;
			else this.la_fabrique.hide() ;
			}			
		return true ;
		},
	// Devient selectionnée
	onLoadModele: function( modele )
		{
		if( modele ) 
			{
			this.setModele( modele ) ;
			if( this.treenode )
				{
				var tn = new TnArticle( modele ) ;
				this.treenode.addChildNode( tn ) ;
				tn.onRefresh() ;
				}
			}
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

