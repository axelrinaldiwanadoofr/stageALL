/*********************************************************
* Classe TnArticleComposants: TnSql pour une liste 
* des composants associes a un article
*********************************************************/

function TnArticleComposants( m_article )
	{
	herite( TnArticleComposants, TnSql, true ) ;
	herite( TnArticleComposants, TreeNode ) ;
	this.initTnArticleComposants( m_article ) ;
	}

TnArticleComposants.prototype =
	{
	initTnArticleComposants: function( m_article )
		{
		this.m_article = m_article ;
		
		this.initTnSql( "Composants",
			"app/article/image/tn_articlecomposants.bmp",
			"app/article/image/tn_articlecomposants.bmp",
			"select count(*) from articlecomposant where reference='" + m_article.reference + "'",
			"articlecomposant",
			"reference='" + m_article.reference + "'",
			"composant",
			"ArticleComposant" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnArticleComposant( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Associer un nouveau composant", "new", this, this.onNewObject ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "ArticleComposant" ) )
			this.menu.add( new MiCallMethode( "Coller un composant", "paste", this, this.onPasteObject ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller un objet
	onPasteObject: function()
		{
		ayawf.mvc.addValueToRowString( "reference", this.m_article.reference ) ;
		ayawf.mvc.addValueToRowString( "composant", this.m_article.reference ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur créer un nouvel objet
	onNewObject: function()
		{
		ayawf.mvc.addValueToRowString( "reference", this.m_article.reference ) ;
		ayawf.mvc.addValueToRowString( "composant", this.m_article.reference ) ;
		ayawf.mvc.newModeleToDB( "ArticleComposant", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
