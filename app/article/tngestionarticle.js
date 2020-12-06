/*********************************************************
* Classe TnApString: TreeNode pour une propriété de valeur
* de chaine de caractère pour un article
*********************************************************/


function TnGestionArticle()
	{
	herite( TnGestionArticle, TreeNode ) ;
	this.initTnGestionArticle() ;
	}

TnGestionArticle.prototype =
	{
	initTnGestionArticle: function()
		{
		this.initTreeNode( null,
			"Ayawf Gestion des articles",
			true,
			"app/image/tn_ayawfcms.bmp",
			"app/image/tn_ayawfcms.bmp",
			null,
			null ) ;
		},
		
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( "Ayawf Gestion des articles" ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		this.addChildNode( new TnArticles() ) ;
		this.addChildNode( new TnPropertyRubriques() ) ;
		this.addChildNode( new TnArticleRegroupements() ) ;
		this.addChildNode( new TnArticleDivers() ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Liste des vins par région, appellations et domaine", "aff", this, this.onAfficheToutesLesAppellation ) ) ;
		this.menu.add( new MiCallMethode( "Liste des vins par domaine", "aff", this, this.onAfficheTousLesVin ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Affiche tous les domaines
	onAfficheTousLesDomaine: function()
		{
		window.open( "listedomaine.php5?config=" + config, "Edition", "" ) ; 
		},
	// Affiche tous les domaines
	onAfficheTousLesVin: function()
		{
		window.open( "listevin.php5?config=" + config, "Edition", "" ) ; 
		},
	// Affiche tous les domaines
	onAfficheToutesLesAppellation: function()
		{
		window.open( "listeappellation.php5?config=" + config, "Edition", "" ) ; 
		}
	} ;
