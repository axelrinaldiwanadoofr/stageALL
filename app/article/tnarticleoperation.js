/*********************************************************
* Classe TnArticleOperation: TreeNode regroupant les
* propriétés d'un article
*********************************************************/

function TnArticleOperation( modele, m_article )
	{
	herite( TnArticleOperation, TreeNode ) ;
	this.initTnArticleOperation( modele, m_article ) ;
	}

TnArticleOperation.prototype =
	{
	initTnArticleOperation: function( modele, m_article )
		{
		this.initTreeNode( null,
			"Operation",
			false,
			"app/article/image/tn_articleoperation.bmp",
			"app/article/image/tn_articleoperation.bmp",
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
		if( this.modele.soustraitant != "" )
			{
			this.setTexte( this.modele.noordre + ": " + this.modele.operation + " " + this.modele.libelle + " sous traitée chez " + this.modele.rssoustraitant + " temps: " + this.modele.temps + " Hrs cout: " + this.modele.pht ) ;
			this.setOpenImage( "app/article/image/tn_articlesoustraitant.bmp" ) ;
			this.setCloseImage( "app/article/image/tn_articlesoustraitant.bmp" ) ;
			}
		else
			{
			this.setTexte( this.modele.noordre + ": " + this.modele.operation + " " + this.modele.libelle + " temps: " + this.modele.temps + " Hrs cout: " + this.modele.pht ) ;
			this.setOpenImage( "app/article/image/tn_articleoperation.bmp" ) ;
			this.setCloseImage( "app/article/image/tn_articleoperation.bmp" ) ;
			}
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmArticleOperation( this ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Suprimer l'operation", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;
