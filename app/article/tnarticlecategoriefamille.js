/*********************************************************
* Classe TnArticleCategorieFamille: TreeNode pour
* une famille utilise par des articles
*********************************************************/

function TnArticleCategorieFamille( categorie, famille, libelle, image )
	{
	herite( TnArticleCategorieFamille, TreeNode ) ;
	this.initTnArticleCategorieFamille( categorie, famille, libelle, image ) ;
	}

TnArticleCategorieFamille.prototype =
	{
	initTnArticleCategorieFamille: function( categorie, famille, libelle, image )
		{
		if( image == "" ) image = "app/article/image/tn_famillearticle.bmp" ;

		this.initTreeNode( null,
			famille + ": " + libelle,
			false,
			image,
			image,
			null,
			null ) ;
			
		this.categorie = categorie ;
		this.famille = famille ;

		// Comte les categories
		var sql = new SqlSelect( "select count(*) from articles where codecat='" + this.categorie + "' and codefam='" + this.famille + "'",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} 
			) ;
		},
	// Cree les noeux fils
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnArticle( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},		
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Proprietes ApString
		ayawf.mvc.loadModeleFromSqlSelect(
			"Article",
			"articles" ,
			"codecat='" + this.categorie + "' and codefam='" + this.famille + "'",
			"rlibelle",
			this,
			this.onCreateChildNodeWithModele,
			false ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Creer un article", "new", this, this.onNewModele ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "Article" ) )
			this.menu.add( new MiCallMethode( "Coller un article", "paste", this, this.onPasteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller une rubrique
	onPasteModele: function()
		{
		ayawf.mvc.addValueToRowString( "codecat", this.categorie ) ;
		ayawf.mvc.addValueToRowString( "codefam", this.famille ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur le noeud est sélectionné
	onNewModele: function()
		{
		ayawf.mvc.addValueToRowString( "codecat", this.categorie ) ;
		ayawf.mvc.addValueToRowString( "codefam", this.famille ) ;
		ayawf.mvc.newModeleToDB( "Article", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
