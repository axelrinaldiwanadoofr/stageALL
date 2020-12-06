/*********************************************************
* Classe FmArticleRechercheRecherche: Formulaire de recherche
* multicritere des articles
*********************************************************/

function FmArticleRecherche( modele, treenode )
	{
	herite( FmArticleRecherche, Formulaire ) ;
	this.initFmArticleRecherche( modele, treenode ) ;
	}

FmArticleRecherche.prototype =
	{
	initFmArticleRecherche: function( modele, treenode )
		{
		this.initFormulaire( "Formulaire de recherche multi-critere d'article" ) ;
		
		this.treenode = treenode ;

		this.addField( new FfInput( "recherche", 80 ) ) ;

		// Champs de recherche
		this.addField( new FfSelectEdit( "reference", 20, 20, "select reference, rlibelle from articles where 1 order by rlibelle", "rlibelle", 90 ) ) ;
		this.addField( new FfSelect( "type" ) ) ;
		this.addField( new FfSelect( "referencemodele", 40, "select reference, rlibelle from articles where type='Modele' order by libelle" ) ) ;
		this.addField( new FfSelectEdit( "rlibelle", 90, 20, "select rlibelle, rlibelle from articles where 1 order by rlibelle", "rlibelle" ) ) ;

		this.addField( new FfSelect( "categorie", 20, "select distinct codecat, c.libelle from categoriearticles as c, articles where categorie=codecat order by c.libelle" ) ) ;
		this.addField( new FfSelect( "famille", 20, "select distinct codefam, f.libelle from famillearticles as f, articles where famille=codefam order by f.libelle" ) ) ;

		this.addField( new FfSelect( "achete" ) ) ;
		this.addField( new FfSelect( "fabrique" ) ) ;
		this.addField( new FfSelectEdit( "fabriquant", 5, 20, "select distinct fabriquant, rs from structures, articles where sid=fabriquant order by rs", "rs", 50 ) ) ;
		this.addField( new FfLabel( "rsfabriquant" ) ) ;
		this.addField( new FfSelectEdit( "reffabriquant", 20, 20, "select distinct reffabriquant, reffabriquant from articles where 1 order by reffabriquant", "reffabriquant" ) ) ;
		
		this.addField( new FfSelect( "rubrique1", 20, "select rubrique, libelle from propertyrubrique order by libelle" ) ) ;
		this.addField( new FfSelect( "property1", 20 ) ) ;
		this.addField( new FfSelect( "value1", 20 ) ) ;
		this.addField( new FfInput( "value1min", 20 ) ) ;
		this.addField( new FfInput( "value1max", 20 ) ) ;

		this.addField( new FfSelect( "rubrique2", 20, "select rubrique, libelle from propertyrubrique order by libelle" ) ) ;
		this.addField( new FfSelect( "property2", 20 ) ) ;
		this.addField( new FfSelect( "value2", 20 ) ) ;
		this.addField( new FfInput( "value2min", 20 ) ) ;
		this.addField( new FfInput( "value2max", 20 ) ) ;
		
		this.addField( new FfButton( "requery", "Execute la requete" ) ) ;

		// Champs pour l'export
		this.addField( new FfInput( "exportcsv", 20 ) ) ;		
		this.addField( new FfButton( "export", "Exporter le résultat de la requete" ) ) ;
		this.addField( new FfSelect( "s_fournisseur", 15 ) ) ;
		this.addField( new FfCheck( "expentete" ) ) ;
		this.addField( new FfCheck( "expdbfieldentete" ) ) ;
		
		this.getFieldByName( "type" ).addItem( "Article", "Article" ) ;
		this.getFieldByName( "type" ).addItem( "Modele", "Modele" ) ;

		this.getFieldByName( "achete" ).addItem( 0, "critère non utilisé" ) ;
		this.getFieldByName( "achete" ).addItem( 1, "article acheté" ) ;
		this.getFieldByName( "achete" ).addItem( 2, "article non acheté" ) ;

		this.getFieldByName( "fabrique" ).addItem( 0, "critère non utilisé" ) ;
		this.getFieldByName( "fabrique" ).addItem( 1, "article fabriqué" ) ;
		this.getFieldByName( "fabrique" ).addItem( 2, "article non fabriqué" ) ;
		
		this.getFieldByName( "rubrique1" ).addItem( "", "" ) ;
		this.getFieldByName( "rubrique2" ).addItem( "", "" ) ;		

		this.getFieldByName( "categorie" ).addItem( "", "" ) ;
		this.getFieldByName( "famille" ).addItem( "", "" ) ;

		this.getFieldByName( "s_fournisseur" ).addItem( "0", "Aucun" ) ;
		this.getFieldByName( "s_fournisseur" ).addItem( "1", "Tous" ) ;
		this.getFieldByName( "s_fournisseur" ).addItem( "2", "Par defaut uniquement" ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		this.getFieldByName( "property1" ).clearAllItems() ;
		this.getFieldByName( "property2" ).clearAllItems() ;
		this.getFieldByName( "value1" ).clearAllItems() ;
		this.getFieldByName( "value2" ).clearAllItems() ;
		
		if( this.rubrique1 != "" )
			{
			this.getFieldByName( "property1" ).populateItemsFromSql( "select name, libelle from property where rubrique='" + this.rubrique1 + "' order by libelle" ) ;
			}
		if( this.property1 != "" )
			{
			this.getFieldByName( "value1" ).populateItemsFromSql( "select distinct value, value from ap_string where rubrique='" + this.rubrique1 + "' and name='" + this.property1 + "' order by value" ) ;
			this.getFieldByName( "value1" ).populateItemsFromSql( "select distinct article, rlibelle from ap_refarticle, articles where article=articles.reference and rubrique='" + this.rubrique1 + "' and name='" + this.property1 + "' order by rlibelle" ) ;
			}
		if( this.rubrique2 != "" )
			{
			this.getFieldByName( "property2" ).populateItemsFromSql( "select name, libelle from property where rubrique='" + this.rubrique2 + "' order by libelle" ) ;
			}
		if( this.property2 != "" )
			{
			this.getFieldByName( "value2" ).populateItemsFromSql( "select distinct value, value from ap_string where rubrique='" + this.rubrique2 + "' and name='" + this.property2 + "' order by value" ) ;
			this.getFieldByName( "value2" ).populateItemsFromSql( "select distinct article, rlibelle from ap_refarticle, articles where article=articles.reference and rubrique='" + this.rubrique2 + "' and name='" + this.property2 + "' order by rlibelle" ) ;
			}
		
		// Raison sociale du fabriquant
		if( this.fabriquant ) var sql = new SqlSelect( "select rs from structures where sid=" + this.modele.fabriquant, 0, -1, this, this.onReceveRsFabriquant ) ;
		},
	// Reception de la raison sociale du fabriquant
	onReceveRsFabriquant: function( sql )
		{
		this.rsfabriquant = sql.rows[0][0] ;
		this.copyAttributeValuesToFields() ;
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Recherche d'article:" ) ) ;
		ha.add( this.getFieldByName( "recherche" ) ) ;
		ha.add( this.getFieldByName( "requery" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Référence:" ) ) ;
		ha.add( this.getFieldByName( "reference" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Type:" ) ) ;
		ha.add( this.getFieldByName( "type" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Catégorie:" ) ) ;
		ha.add( this.getFieldByName( "categorie" ) ) ;
		ha.add( new FfEtiquette( "famille:" ) ) ;
		ha.add( this.getFieldByName( "famille" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Article acheté:" ) ) ;
		ha.add( this.getFieldByName( "achete" ) ) ;
		ha.add( new FfEtiquette( "fabriqué:" ) ) ;
		ha.add( this.getFieldByName( "fabrique" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Fabriquant:" ) ) ;
		ha.add( this.getFieldByName( "fabriquant" ) ) ;
		ha.add( this.getFieldByName( "rsfabriquant" ) ) ;
		ha.add( new FfEtiquette( "Référence fabriquant:" ) ) ;
		ha.add( this.getFieldByName( "reffabriquant" ) ) ;
		
		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "rlibelle" ) ) ;

		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Modèle:" ) ) ;
		ha.add( this.getFieldByName( "referencemodele" ) ) ;

		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Rubrique/propriete 1:" ) ) ;
		ha.add( this.getFieldByName( "rubrique1" ) ) ;
		ha.add( this.getFieldByName( "property1" ) ) ;
		ha.add( new FfEtiquette( "=" ) ) ;
		ha.add( this.getFieldByName( "value1" ) ) ;
		ha.add( new FfEtiquette( "ou entre" ) ) ;
		ha.add( this.getFieldByName( "value1min" ) ) ;
		ha.add( new FfEtiquette( "et" ) ) ;
		ha.add( this.getFieldByName( "value1max" ) ) ;

		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Rubrique/propriete 2:" ) ) ;
		ha.add( this.getFieldByName( "rubrique2" ) ) ;
		ha.add( this.getFieldByName( "property2" ) ) ;
		ha.add( new FfEtiquette( "=" ) ) ;
		ha.add( this.getFieldByName( "value2" ) ) ;
		ha.add( new FfEtiquette( "ou entre" ) ) ;
		ha.add( this.getFieldByName( "value2min" ) ) ;
		ha.add( new FfEtiquette( "et" ) ) ;
		ha.add( this.getFieldByName( "value2max" ) ) ;
		
		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Export CSV:" ) ) ;
		ha.add( this.getFieldByName( "exportcsv" ) ) ;
		ha.add( this.getFieldByName( "export" ) ) ;

		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Exporte donnees fournisseur:" ) ) ;
		ha.add( this.getFieldByName( "s_fournisseur" ) ) ;

		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Exporte entete de colonne:" ) ) ;
		ha.add( this.getFieldByName( "expentete" ) ) ;
		ha.add( new FfEtiquette( "Nom de champ de table:" ) ) ;
		ha.add( this.getFieldByName( "expdbfieldentete" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "rubrique1" )
			{
			this.rubrique1 = value ;
			this.getFieldByName( "property1" ).clearAllItems() ;
			this.getFieldByName( "value1" ).clearAllItems() ;
			this.getFieldByName( "property1" ).populateItemsFromSql( "select rubrique, libelle from property where rubrique='" + value + "' order by libelle" ) ;
			}
		if( fieldname == "property1" )
			{
			this.property1 = value ;
			this.getFieldByName( "value1" ).clearAllItems() ;
			this.getFieldByName( "value1" ).populateItemsFromSql( "select distinct value, value from ap_string where rubrique='" + this.rubrique1 + "' and name='" + value + "' order by value" ) ;
			this.getFieldByName( "value1" ).populateItemsFromSql( "select distinct article, rlibelle from ap_refarticle, articles where article=articles.reference and rubrique='" + this.rubrique1 + "' and name='" + value + "' order by rlibelle" ) ;
			}
		if( fieldname == "rubrique2" )
			{
			this.rubrique2 = value ;
			this.getFieldByName( "property2" ).clearAllItems() ;
			this.getFieldByName( "value2" ).clearAllItems() ;
			this.getFieldByName( "property2" ).populateItemsFromSql( "select rubrique, libelle from property where rubrique='" + value + "' order by libelle" ) ;
			}
		if( fieldname == "property2" )
			{
			this.property2 = value ;
			this.getFieldByName( "value2" ).clearAllItems() ;
			this.getFieldByName( "value2" ).populateItemsFromSql( "select distinct value, value from ap_string where rubrique='" + this.rubrique2 + "' and name='" + value + "' order by value" ) ;
			this.getFieldByName( "value2" ).populateItemsFromSql( "select distinct article, rlibelle from ap_refarticle, articles where article=articles.reference and rubrique='" + this.rubrique2 + "' and name='" + value + "' order by rlibelle" ) ;
			}
		if( fieldname == "value1" ) this.value1 = value ;
		if( fieldname == "value2" ) this.value2 = value ;
		
		if( fieldname == "categorie" ) this.categorie = value ;
		if( fieldname == "famille" ) this.famille = value ;
		if( fieldname == "fabrique" ) this.fabrique = value ;
		if( fieldname == "achete" ) this.achete = value ;
		if( fieldname == "reffabriquant" ) this.reffabriquant = value ;
		
		if( fieldname == "fabriquant" )
			{
			this.fabriquant = value ;
			if( value != "" ) var sql = new SqlSelect( "select rs from structures where sid=" + value, 0, -1, this, this.onReceveRsFabriquant ) ;
			else this.rsfabriquant = "" ;
			}
				
		this.createSQL() ;
		return true ;
		},
	// Genere la requete SQL de recherche
	createSQL: function()
		{
		var sql = " 1" ;
		if( this.reference != "" ) sql += " and reference='" + this.reference + "'" ;
		if( this.referencemodele != "" ) sql += " and referencemodele='" + this.referencemodele + "'" ;
		if( this.rlibelle != "" ) sql += " and rlibelle='" + this.rlibelle + "'" ;
		if( this.type != "" ) sql += " and type='" + this.type + "'" ;

		if( this.categorie != "" ) sql += " and codecat='" + this.categorie + "'" ;
		if( this.famille != "" ) sql += " and codefam='" + this.famille + "'" ;

		if( this.fabriquant != "" ) sql += " and fabriquant=" + this.fabriquant ;
		
		if( this.fabrique == 1 ) sql += " and fabrique=1" ;
		if( this.fabrique == 2 ) sql += " and fabrique=0" ;
		
		if( this.achete == 1 ) sql += " and achete=1" ;
		if( this.achete == 2 ) sql += " and achete=2" ;

		if( this.property1 != "" ) 
			{
			sql += " and reference in( select reference from ap_string where rubrique='" + this.rubrique1 + "' and name='" + this.property1 + "'" ;
			if( this.value1 != "" ) sql += " and value='" + this.value1 + "' )" ;
			else sql += " and value is null )" ;
			}
		if( this.property2 != "" ) 
			{
			sql += " and reference in( select reference from ap_string where rubrique='" + this.rubrique2 + "' and name='" + this.property2 + "'" ;
			if( this.value2 != "" ) sql += " and value='" + this.value2 + "' )" ;
			else sql += " and value is null )" ;
			}
		this.modele.setValue( "rsqlwhere", sql ) ;
		},
	// Appelée quand on clique sur un champ
	onClick: function( field )
		{
		if( field.name == "requery" )
			{
			this.treenode.removeChildsNode() ;
			this.treenode.showChildsNode() ;
			}
		if( field.name == "export" )
			{
			var recherche = ayawf.tools.prepare_to_send( this.modele.recherche ) ;
			window.open( "articleexport.php5?config=" + config + "&recherche=" + recherche, "Export des articles" ) ;
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

