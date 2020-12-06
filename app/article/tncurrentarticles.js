/*********************************************************
* Classe TnCurrentArticles: TreeNode racine
* pour les articles courants
*********************************************************/

function TnCurrentArticles()
	{
	herite( TnCurrentArticles, TreeNode ) ;
	this.initTnCurrentArticles() ;
	}

TnCurrentArticles.prototype =
	{
	initTnCurrentArticles: function()
		{
		this.initTreeNode( null,
			"Articles courants",
			false,
			"app/article/image/tn_current.bmp",
			"app/article/image/tn_current.bmp",
			null,
			null ) ;
		},
	// Appelée pour chaque structure
	onCreateTnArticle: function( modele )
		{
		var tn = new TnArticle( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer un nouvel article", "new", this, this.onNewModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmArticle( null, this ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		},
	// Sur créer une nouvelle structure
	onNewModele: function()
		{
		ayawf.mvc.newModeleToDB( "Article", this, this.onCreateTnArticle ) ;
		}				
	} ;
