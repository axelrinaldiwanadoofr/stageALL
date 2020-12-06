/*********************************************************
* Classe TnArRoot: Treenode pour un regroupement d'article
*
* Quand le regroupement est sous un article, l'argument
* reference contient la reference de celui-ci
*********************************************************/

function TnArRoot( modele, reference )
	{
	herite( TnArRoot, TreeNode ) ;
	this.initTnArRoot( modele, reference ) ;
	}

TnArRoot.prototype =
	{
	initTnArRoot: function( modele, reference )
		{
		var image = "app/image/tn_articleregroupement.bmp" ;
		if( modele.image != "" ) image = modele.image ;

		this.reference = reference ;

		// Initialise le treenode
		this.initTreeNode( null,
			modele.libelle,
			false,
			image,
			image ) ;

		if( parseInt( modele.articles ) && this.reference )
			{
			// Compte les regroupements sous cet article référence par une propriété ap_refarticle
			var sqlcount = "select count(*) from ap_refarticle " ;
			sqlcount += "where rubrique='" + modele.rubrique + "' " ;
			sqlcount += "and name='" + modele.property + "' " ;
			sqlcount += "and article='" + this.reference + "'" ;
			this.sqlcount = new SqlSelect( sqlcount,
				0, -1,
				this,
				function( sql )
					{
					if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
					} ) ;
			}
		else if( modele.articles )
			{
			// Compte les regroupements par valeur de propriété
			var sqlcount = "select count(*) from articles where referencemodele='" + modele.referencemodele + "'" ;
			this.sqlcount = new SqlSelect( sqlcount,
				0, -1,
				this,
				function( sql )
					{
					if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
					} ) ;
			}
		else
			{
			// Compte les regroupements par valeur de propriété
			var sqlcount = "select count(*) from ap_string where rubrique='" + modele.rubrique + "' and name='" + modele.property + "'" ;
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
		this.setTexte( this.modele.libelle ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		if( this.modele.property )
			{
			if( parseInt( this.modele.articles ) && this.reference )
				{
				// Liste les articles reférencant l'article dont la référence est contenue
				// par this.reference au travers de la propriété de type ap_refarticle spécifiée
				// par le regroupement

				var from = "ap_refarticle as p, articles as a " ;
				var where = "rubrique='" + this.modele.rubrique + "' " ;
				where += "and name='" + this.modele.property + "' " ;
				where += "and article='" + this.reference + "' " ;
				where += "and a.reference=p.reference " ;
				var orderby = "p.reference" ;
				
				ayawf.mvc.loadModeleFromSqlSelect( "Article", from, where, orderby, this, this.onCreateTnArticle ) ;
				}
			else
				{
				// Génère les valeurs de propriété du regroupement
				var sql = "select distinct value from ap_string where rubrique='" + this.modele.rubrique + "' and name='" + this.modele.property + "' order by value" ;
				this.sql = new SqlSelect( sql, 0, -1,	this,	this.onCreateTnArValue ) ;
				}
			}
		else
			{
			}
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
	// Appelée pour créer les regroupements par valeur
	onCreateTnArValue: function( sql )
		{
		for( var i=0 ; i<sql.rows.length ; i++ )
			{
			var tn = new TnArValue( this.modele, sql.rows[i][0] ) ;
			this.addChildNode( tn ) ;
			tn.onRefresh() ;
			}
		},
	// Appelée pour chaque regroupement d'article
	onCreateTnArticle: function( modele )
		{
		var tn = new TnArticle( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur le noeud est sélectionné
	onPasteArticle: function()
		{
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateTnArticleFromCopy ) ;
		},
	// Appelée pour chaque article créé par copie
	onCreateTnArticleFromCopy: function( modele )
		{
		// Cree le treenode pour le nouvel article
		var tn = new TnArticle( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		
		// Modifie la valeur de la propriété associé au regroupement pour spcécifier à quel article appartient le nouvel article
		var property_modele = ayawf.mvc.getModele( "ApRefArticle", modele.reference + "," + this.modele.rubrique + "," + this.modele.property ) ;
		if( property_modele ) 
			{
			property_modele.setValue( "article", this.reference ) ;
			property_modele.save() ;
			}
		}		
	} ;
