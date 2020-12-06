/*********************************************************
* Classe TnCmsPages: TnSql pour l'ensemble des pages
*********************************************************/

function TnCmsPages()
	{
	herite( TnCmsPages, TnSql, true ) ;
	herite( TnCmsPages, TreeNode ) ;
	this.initTnCmsPages() ;
	}

TnCmsPages.prototype =
	{
	initTnCmsPages: function()
		{
		this.initTnSql( "Ensemble des pages",
			"app/cms/image/cmspages.bmp",
			"app/cms/image/cmspages.bmp",
			"select count(*) from cms_page",
			"cms_page",
			"",
			"page",
			"CmsPage" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnCmsPage( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle page", "new", this, this.onNewCmsPage ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "CmsPage" ) )
			this.menu.add( new MiCallMethode( "Coller une page", "paste", this, this.onPasteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur créer une nouvelle page
	onNewCmsPage: function()
		{
		ayawf.mvc.newModeleToDB( "CmsPage", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
