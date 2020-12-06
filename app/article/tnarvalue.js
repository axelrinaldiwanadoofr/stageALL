/*********************************************************
* Classe TnArValue: Treenode pour une valeur de propriété
* d'un regroupement d'article
*********************************************************/

function TnArValue( modele, value )
	{
	herite( TnArValue, TreeNode ) ;
	this.initTnArValue( modele, value ) ;
	}

TnArValue.prototype =
	{
	initTnArValue: function( modele, value )
		{
		var image = "app/image/tn_articleregroupement.bmp" ;
		if( modele.image != "" ) image = modele.image ;
		if( modele.imagevalue != "" ) image = modele.imagevalue ;

		this.value = value ;

		// Initialise le treenode
		this.initTreeNode( null,
			value,
			false,
			image,
			image ) ;

		if( modele.articles )
			{
			// Compte les articles avec le modele définit dans le regroupement
			// et ayant une propriété définie dans le regroupement et
			// ayant cette valeur
			var sqlcount = "select count(*) from articles as a, ap_string as p " ;
			sqlcount += "where referencemodele='" + modele.referencemodele + "' " ;
			sqlcount += "and rubrique='" + modele.rubrique + "' " ;
			sqlcount += "and name='" + modele.property + "' " ;
			sqlcount += "and value='" + this.value + "' " ;
			sqlcount += "and a.reference=p.reference" ;
			this.sqlcount = new SqlSelect( sqlcount,
				0, -1,
				this,
				function( sql )
					{
					if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
					} ) ;
			}
		// Fixe le modele
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	onRefresh: function()
		{
		this.setTexte( this.value ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		if( this.modele.articles )
			{
			// Liste les articles avec le modele définit dans le regroupement
			// et ayant une propriété définie dans le regroupement et
			// ayant cette valeur
			var from = "articles as a, ap_string as p " ;
			var where = "referencemodele='" + this.modele.referencemodele + "' " ;
			where += "and rubrique='" + this.modele.rubrique + "' " ;
			where += "and name='" + this.modele.property + "' " ;
			where += "and value='" + this.value + "' " ;
			where += "and a.reference=p.reference " ;
			var orderby = "rlibelle" ;

			ayawf.mvc.loadModeleFromSqlSelect( "Article", from, where, orderby, this, this.onCreateTnArticle ) ;
			}
		else
			{
			}
		},

	// Appelée pour créer les regroupements par valeur
	onCreateTnArValue: function( sql )
		{
		for( var i=0 ; i<sql.rows.lenght ; i++ )
			{
			var tn = new TnArValue( this.modele, rows[i][0], rows[i][1]  ) ;
			this.addChildNode( tn ) ;
			tn.onRefresh() ;
			}
		},
	// Appelée pour chaque article affiché dans le regroupement
	onCreateTnArticle: function( modele )
		{
		var tn = new TnArticle( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		if( ayawf.mvc.isThereModeleToCopy( "Article" ) && ayawf.mvc.modeleforcopy.referencemodele == this.modele.referencemodelecreate )
			{
			this.menu.add( new MiCallMethode( "Coller l'article", "paste", this, this.onPasteArticle ) ) ;
			}
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur le noeud est desélectionné
	onUnSelected: function()
		{
		if( this.menu )
			{
			this.menu.remove() ;
			this.menu = null ;
			}
		},
	// Sur le noeud est sélectionné
	onPasteArticle: function()
		{
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateTnArticleFromCopy ) ;
		},
	// Appelée pour chaque article créé par copie
	onCreateTnArticleFromCopy: function( modele )
		{
		var tn = new TnArticle( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		var property_modele = ayawf.mvc.getModele( "ApString", modele.reference + "," + this.modele.rubrique + "," + this.modele.property ) ;
		if( property_modele ) 
			{
			property_modele.setValue( "value", this.value ) ;
			property_modele.save() ;
			}
		}
	} ;
