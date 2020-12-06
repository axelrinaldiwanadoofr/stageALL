/*********************************************************
* Classe TnArticleOperations: TnSql pour une liste 
* des operations associes a un article
*********************************************************/

function TnArticleOperations( m_article )
	{
	herite( TnArticleOperations, TnSql, true ) ;
	herite( TnArticleOperations, TreeNode ) ;
	this.initTnArticleOperations( m_article ) ;
	}

TnArticleOperations.prototype =
	{
	initTnArticleOperations: function( m_article )
		{
		this.m_article = m_article ;
		
		this.initTnSql( "Operations",
			"app/article/image/tn_articleoperations.bmp",
			"app/article/image/tn_articleoperations.bmp",
			"select count(*) from articleoperation where reference='" + m_article.reference + "'",
			"articleoperation",
			"reference='" + m_article.reference + "'",
			"noordre",
			"ArticleOperation" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnArticleOperation( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Associer une nouvelle opération", "new", this, this.onNewObject ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "ArticleOperation" ) )
			this.menu.add( new MiCallMethode( "Coller une opération", "paste", this, this.onPasteObject ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller un objet
	onPasteObject: function()
		{
		ayawf.mvc.addValueToRowString( "reference", this.m_article.reference ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur créer un nouvel objet
	onNewObject: function()
		{
		ayawf.mvc.addValueToRowString( "reference", this.m_article.reference ) ;
		ayawf.mvc.newModeleToDB( "ArticleOperation", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
