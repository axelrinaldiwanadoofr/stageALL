/*********************************************************
* Classe TnArticleCategories: TreeNode listant
* les categories utilisees par des articles
*********************************************************/

function TnArticleCategories()
	{
	herite( TnArticleCategories, TreeNode ) ;
	this.initTnArticleCategories() ;
	}

TnArticleCategories.prototype =
	{
	initTnArticleCategories: function( m_article )
		{
		this.initTreeNode( null,
			"Regroupement par catégorie et famille",
			false,
			"app/article/image/tn_categoriearticles.bmp",
			"app/article/image/tn_categoriearticles.bmp",
			null,
			null ) ;

		// Comte les categories
		var sql = new SqlSelect( "select count(*) from articles where codecat is not null",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		var sql = new SqlSelect( "select distinct codecat, c.libelle, c.image from articles, categoriearticles as c where codecat=categorie order by codecat",
			0, -1,
			this,
			this.onReceveCategories 
			) ;
		},
	// Cree les noeux fils
	onReceveCategories: function( sql )
		{
		for( var i=0 ; i<sql.rows.length ; i++ )
			{
			var tn = new TnArticleCategorie( sql.rows[i][0], sql.rows[i][1], sql.rows[i][2] ) ;
			this.addChildNode( tn ) ;
			}
		}		
	} ;
