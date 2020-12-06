/*********************************************************
* Classe TnArticleExports: TnSql pour description des champs 
* pour l'export d'une liste d'article
*********************************************************/

function TnArticleExports( m_recherche )
	{
	herite( TnArticleExports, TnSql, true ) ;
	herite( TnArticleExports, TreeNode ) ;
	this.initTnArticleExports( m_recherche ) ;
	}

TnArticleExports.prototype =
	{
	initTnArticleExports: function( m_recherche )
		{
		this.m_recherche = m_recherche ;
		
		this.initTnSql( "Liste des champs pour un export",
			"app/article/image/tn_articleexports.bmp",
			"app/article/image/tn_articleexports.bmp",
			"select count(*) from articleexport where recherche='" + m_recherche.recherche + "'",
			"articleexport",
			"recherche='" + m_recherche.recherche + "'",
			"noordre",
			"ArticleExport" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnArticleExport( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmArticleExports( this.m_recherche, this ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.m_recherche ) ;
		}		
	} ;
