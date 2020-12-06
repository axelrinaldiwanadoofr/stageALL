/*********************************************************
* Classe TnArticles: TreeNode racine pour les articles
*********************************************************/

function TnArticles()
	{
	herite( TnArticles, TreeNode ) ;
	this.initTnArticles() ;
	}

TnArticles.prototype =
	{
	initTnArticles: function()
		{
		this.initTreeNode( null,
			"Articles",
			true,
			"app/image/tn_articles.bmp",
			"app/image/tn_articles.bmp",
			null,
			null ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste des articles courant
		this.addChildNode( new TnCurrentArticles() ) ;			

		// Liste de toutes les recherches
		ayawf.mvc.loadModeleFromSqlSelect(
			"ArticleRecherche",
			"articlerecherche",
			"",
			"recherche",			
			this,
			this.onCreateTnArticleRecherche ) ;

		// Liste des regroupements apparaissant à la racine
		ayawf.mvc.loadModeleFromSqlSelect(
			"ArticleRegroupement",
			"articleregroupement",
			"modeshow=1",
			"regroupement",			
			this,
			this.onCreateTnArRoot ) ;

		// Liste de toutes les categories regroupant des articles
		this.addChildNode( new TnArticleCategories() ) ;			
			
		// Liste de tous les modèles
		this.addChildNode( new TnListeArticles(
			"Tous les modèles",
			"app/image/tn_listemodele.bmp",
			"select count(*) from articles where type='Modele'",
			"articles",
			"type='Modele'",
			"libelle" ) ) ;

		// Liste de tous les articles
		this.addChildNode( new TnListeArticles(
			"Tous les articles",
			"app/image/tn_listearticle.bmp",
			"select count(*) from articles where type='Article'",
			"articles",
			"type='Article'",
			"libelle" ) ) ;
		},
	// Appelée pour chaque regroupement d'article
	onCreateTnArRoot: function( modele )
		{
		var tn = new TnArRoot( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Appelée pour chaque recherche d'article
	onCreateTnArticleRecherche: function( modele )
		{
		var tn = new TnArticleRecherche( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		//this.formulairectrl = new FormulaireControler() ;
		//this.formulairectrl.addFormulaire( new FmArticleRecherche() ) ;
		//this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle liste multi-criteres", "new", this, this.onNewArticleRecherche ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur créer une nouvelle recherche
	onNewArticleRecherche: function()
		{
		ayawf.mvc.newModeleToDB( "ArticleRecherche", this, this.onCreateTnArticleRecherche ) ;
		}		
	} ;
