/*********************************************************
* Classe TnArticleRecherche: TnSql pour une
* recherche d'article
*********************************************************/

function TnArticleRecherche( modele )
	{
	herite( TnArticleRecherche, TnSql, true ) ;
	herite( TnArticleRecherche, TreeNode ) ;
	this.initTnArticleRecherche( modele ) ;
	}

TnArticleRecherche.prototype =
	{
	initTnArticleRecherche: function( modele )
		{
		this.initTnSql( "Ensemble des listes d'article",
			"app/article/image/tn_articlerecherche.bmp",
			"app/article/image/tn_articlerecherche.bmp",
			"select count(*) from articles where " + modele.rsqlwhere,
			"articles",
			modele.rsqlwhere,
			"rlibelle",
			"Article" ) ;
			
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	onRefresh: function()
		{
		this.setTexte( this.modele.recherche ) ;
		this.where = this.modele.rsqlwhere ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		this.addChildNode( new TnArticleExports( this.modele ) ) ;
		this.onTnSqlCreateChildNode() ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnArticle( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Supprimer la liste", "delete", this, this.onDeleteModele ) ) ;
		this.menu.add( new MiCallMethode( "Créer un nouvel article", "new", this, this.onNewArticle ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "Article" ) )
			this.menu.add( new MiCallMethode( "Coller un article", "paste", this, this.onPasteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur créer une nouveau regroupement
	onNewArticle: function()
		{
		ayawf.mvc.newModeleToDB( "Article", this, this.onCreateChildNodeWithModele ) ;
		},				
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmArticleRecherche( this.modele, this ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}
	} ;
