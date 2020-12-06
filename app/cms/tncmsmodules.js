/*********************************************************
* Classe TnCmsModules: TnSql pour l'ensemble des modules
*********************************************************/

function TnCmsModules()
	{
	herite( TnCmsModules, TnSql, true ) ;
	herite( TnCmsModules, TreeNode ) ;
	this.initTnCmsModules() ;
	}

TnCmsModules.prototype =
	{
	initTnCmsModules: function()
		{
		this.initTnSql( "Ensemble des modules",
			"app/cms/image/cmsmodules.bmp",
			"app/cms/image/cmsmodules.bmp",
			"select count(*) from cms_module",
			"cms_module",
			"",
			"module",
			"CmsModule" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnCmsModule( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer un nouveau module", "new", this, this.onNewCmsModule ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "CmsModule" ) )
			this.menu.add( new MiCallMethode( "Coller un module", "paste", this, this.onPasteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur créer une nouveau module
	onNewCmsModule: function()
		{
		ayawf.mvc.newModeleToDB( "CmsModule", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
