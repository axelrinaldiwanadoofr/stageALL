/*********************************************************
* Classe TnBackOfficeCms: Noeud racine de la gestion du 
* back ofice du cms
*********************************************************/


function TnBackOfficeCms()
	{
	herite( TnBackOfficeCms, TreeNode ) ;
	this.initTnBackOfficeCms() ;
	}

TnBackOfficeCms.prototype =
	{
	initTnBackOfficeCms: function()
		{
		this.initTreeNode( null,
			"Ayawf back office du CMS",
			true,
			"app/image/tn_ayawfcms.bmp",
			"app/image/tn_ayawfcms.bmp",
			null,
			null ) ;
		},
		
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( "Ayawf back office du CMS" ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		this.addChildNode( new TnCmsPages() ) ;
		this.addChildNode( new TnCmsModules() ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		//this.menu.add( new MiCallMethode( "Liste des vins par région, appellations et domaine", "aff", this, this.onAfficheToutesLesAppellation ) ) ;
		//this.menu.add( new MiCallMethode( "Liste des vins par domaine", "aff", this, this.onAfficheTousLesVin ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;
