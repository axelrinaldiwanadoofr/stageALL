/*********************************************************
* Classe TnArticle: TreeNode pour un article
*********************************************************/

function TnArticle( modele )
	{
	herite( TnArticle, TreeNode ) ;
	this.initTnArticle( modele ) ;
	}

TnArticle.prototype =
	{
	initTnArticle: function( modele )
		{
		this.initTreeNode( null,
			"Article",
			true,
			"app/image/tn_article.bmp",
			"app/image/tn_article.bmp",
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( this.modele.reference + ": " + this.modele.rlibelle ) ;
		if( this.modele.icone != "" )
			{
			this.setCloseImage( this.modele.icone ) ;
			this.setOpenImage( this.modele.icone ) ;
			}
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste des propriétés
		this.addChildNode( new TnArticleProperties( this.modele ) ) ;

		// Liste des regroupements apparaissant sous cet article
		var sqlrow = "select regroupement from articleregroupement where modeshow=2 and referencemodele='" + this.modele.referencemodele + "' order by regroupement" ;
		ctrlmgr.loadModeleFromSqlSelect(
			"ArticleRegroupement",
			sqlrow,
			this,
			this.onCreateTnArRoot ) ;
		},
	// Appelée pour chaque rubrique
	onCreateTnArRoot: function( modele )
		{
		var tn = new TnArRoot( modele, this.modele.reference ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},

	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.fcarticle = new FormulaireControler() ;
		this.fcarticle.addFormulaire( new FmArticle( this.fcarticle, this.modele ) ) ;
		this.fcarticle.show( this.getAbsoluteX() + this.getWidth(), this.getAbsoluteY() ) ;
		this.fcarticle.setModele( this.modele ) ;
		},
	// Sur le noeud est desélectionné
	onUnSelected: function()
		{
		if( this.fcarticle )
			{
			this.fcarticle.remove() ;
			this.fcarticle = null ;
			}
		if( this.menu )
			{
			this.menu.remove() ;
			this.menu = null ;
			}
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier l'article", "copy", this, this.onCopyArticle ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer l'article", "delete", this, this.onDeleteArticle ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur copy article
	onCopyArticle: function()
		{
		modeleforcopy = this.modele ;
		},
	// Sur copy article
	onDeleteArticle: function()
		{
		}
	} ;

