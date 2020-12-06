/*********************************************************
* Classe TnArticleRegroupements: TnSql pour une liste
* des regroupement d'article
*********************************************************/

function TnArticleRegroupements()
	{
	herite( TnArticleRegroupements, TnSql, true ) ;
	herite( TnArticleRegroupements, TreeNode ) ;
	this.initTnArticleRegroupements() ;
	}

TnArticleRegroupements.prototype =
	{
	initTnArticleRegroupements: function()
		{
		this.initTnSql( "Définitions des regroupements d'article",
			"app/image/tn_listearticle.bmp",
			"app/image/tn_listearticle.bmp",
			"select count(*) from articleregroupement where pere is null",
			"articleregroupement",
			"pere is null",
			"regroupement",
			"ArticleRegroupement" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnArticleRegroupement( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer un nouveau regroupement", "new", this, this.onNewArticleRegroupement ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "ArticleRegroupement" ) )
			this.menu.add( new MiCallMethode( "Coller un regroupement", "paste", this, this.onPasteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur créer une nouveau regroupement
	onNewArticleRegroupement: function()
		{
		ayawf.mvc.newModeleToDB( "ArticleRegroupement", this, this.onCreateChildNodeWithModele ) ;
		}		
	} ;
