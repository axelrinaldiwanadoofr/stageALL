/*********************************************************
* Classe TnClientAffaires: TreeNode listant
* les clients ayant des affaires
*********************************************************/

function TnClientAffaires()
	{
	herite( TnClientAffaires, TreeNode ) ;
	this.initTnClientAffaires() ;
	}

TnClientAffaires.prototype =
	{
	initTnClientAffaires: function( m_article )
		{
		this.initTreeNode( null,
			"Regroupement par client",
			false,
			"app/affaire/image/tn_clientaffaires.bmp",
			"app/affaire/image/tn_clientaffaires.bmp",
			null,
			null ) ;

		// Comte les categories
		var sql = new SqlSelect( "select count(*) from affaires where client is not null",
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
		var sql = new SqlSelect( "select distinct client, rs, c.image from affaires, structures as c where client=sid order by rs",
			0, -1,
			this,
			this.onReceveClients
			) ;
		},
	// Cree les noeux fils
	onReceveClients: function( sql )
		{
		for( var i=0 ; i<sql.rows.length ; i++ )
			{
			var tn = new TnClientAffaire( sql.rows[i][0], sql.rows[i][1], sql.rows[i][2] ) ;
			this.addChildNode( tn ) ;
			}
		}		
	} ;
