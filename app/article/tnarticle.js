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
		if( this.modele.image != "" )
			{
			this.setCloseImage( this.modele.image ) ;
			this.setOpenImage( this.modele.image ) ;
			}
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste des propriétés
		this.addChildNode( new TnArticleProperties( this.modele ) ) ;

		// Liste des fournisseurs
		this.addChildNode( new TnArticleStructures( this.modele ) ) ;

		// Liste des operation
		this.addChildNode( new TnArticleOperations( this.modele ) ) ;

		// Liste des composants
		this.addChildNode( new TnArticleComposants( this.modele ) ) ;
		
		// Liste des regroupements apparaissant sous cet article
		var sqlrow = "select regroupement from articleregroupement where modeshow=2 and referencemodele='" + this.modele.referencemodele + "' order by regroupement" ;
		ayawf.mvc.loadModeleFromSqlSelect(
			"ArticleRegroupement",
			"articleregroupement",
			"modeshow=2 and referencemodele='" + this.modele.referencemodele + "'",
			"regroupement",
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
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmArticle( this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier l'article", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer l'article", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;

