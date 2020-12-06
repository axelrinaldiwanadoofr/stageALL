/*********************************************************
* Classe TnArticleComposant: TreeNode regroupant les
* propriétés d'un article
*********************************************************/

function TnArticleComposant( modele, m_article )
	{
	herite( TnArticleComposant, TreeNode ) ;
	this.initTnArticleComposant( modele, m_article ) ;
	}

TnArticleComposant.prototype =
	{
	initTnArticleComposant: function( modele, m_article )
		{
		this.initTreeNode( null,
			"Composant",
			true,
			"app/article/image/tn_articlecomposant.bmp",
			"app/article/image/tn_articlecomposant.bmp",
			null,
			null ) ;
		this.m_article = m_article ;

		// Fixe le modele
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.qte + ": " + this.modele.composant ) ;
		if( this.modele.composant != "" ) var sql = new SqlSelect( "select rlibelle, image from articles where reference='" + this.modele.composant + "'", 0, -1, this, this.onReceveDataComposant ) ;		
		},
	onReceveDataComposant: function( sql )
		{
		this.setTexte( this.modele.qte + ": " + this.modele.composant + " " + sql.rows[0][0] ) ;
		if( sql.rows[0][1] != "" )
			{
			var image = this.modele.image ;
			this.setOpenImage( image ) ;
			this.setCloseImage( image ) ;
			}
		},		
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Charge l'article dont la reference est donne par le composant
		if( this.modele.composant != "" )
			{
			ayawf.mvc.loadModeleFromSqlSelect(
				"Article",
				"articles",
				"reference='" + this.modele.composant + "'",
				"",
				this,
				this.onCreateChildNodeWithModele ) ;
			}
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnArticle( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmArticleComposant( this ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Suprimer le composant", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;
