/*********************************************************
* Classe TnArticleStructures: TnSql pour une liste 
* des structures associes a un article
*********************************************************/

function TnArticleStructures( m_article )
	{
	herite( TnArticleStructures, TnSql, true ) ;
	herite( TnArticleStructures, TreeNode ) ;
	this.initTnArticleStructures( m_article ) ;
	}

TnArticleStructures.prototype =
	{
	initTnArticleStructures: function( m_article )
		{
		this.m_article = m_article ;
		
		this.initTnSql( "Fournisseurs",
			"app/article/image/tn_articlestructures.bmp",
			"app/article/image/tn_articlestructures.bmp",
			"select count(*) from articlestructure where reference='" + m_article.reference + "'",
			"articlestructure",
			"reference='" + m_article.reference + "'",
			"sid",
			"ArticleStructure" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnArticleStructure( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Associer un nouveau fournisseur", "new", this, this.onNewObject ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "ArticleStructure" ) )
			this.menu.add( new MiCallMethode( "Coller un fournisseur", "paste", this, this.onPasteObject ) ) ;
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
		ayawf.mvc.newModeleToDB( "ArticleStructure", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
