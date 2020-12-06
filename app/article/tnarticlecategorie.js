/*********************************************************
* Classe TnArticleCategorie: TreeNode pour
* une categorie utilise par des articles
*********************************************************/

function TnArticleCategorie( categorie, libelle, image )
	{
	herite( TnArticleCategorie, TreeNode ) ;
	this.initTnArticleCategorie( categorie, libelle, image ) ;
	}

TnArticleCategorie.prototype =
	{
	initTnArticleCategorie: function( categorie, libelle, image )
		{
		if( image == "" ) image = "app/article/image/tn_categoriearticle.bmp" ;

		this.initTreeNode( null,
			categorie + ": " + libelle,
			false,
			image,
			image,
			null,
			null ) ;
			
		this.categorie = categorie ;

		// Comte les categories
		var sql = new SqlSelect( "select count(*) from articles where codecat='" + this.categorie + "' and codefam is not null",
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
		var sql = new SqlSelect( "select distinct codefam, f.libelle, f.image from articles, famillearticles as f where codefam=famille and codecat='" + this.categorie + "' order by codefam",
			0, -1,
			this,
			this.onReceveFamilles 
			) ;
		},
	// Cree les noeux fils
	onReceveFamilles: function( sql )
		{
		for( var i=0 ; i<sql.rows.length ; i++ )
			{
			var tn = new TnArticleCategorieFamille( this.categorie, sql.rows[i][0], sql.rows[i][1], sql.rows[i][2] ) ;
			this.addChildNode( tn ) ;
			}
		}
	} ;
