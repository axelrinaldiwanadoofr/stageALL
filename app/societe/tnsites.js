/*********************************************************
* Classe TnSites: TnSql pour une liste 
* des sites d'une societe
*********************************************************/

function TnSites( m_societe )
	{
	herite( TnSites, TnSql, true ) ;
	herite( TnSites, TreeNode ) ;
	this.initTnSites( m_societe ) ;
	}

TnSites.prototype =
	{
	initTnSites: function( m_societe )
		{
		this.m_societe = m_societe ;
		
		this.initTnSql( "Sites",
			"app/societe/image/tn_sites.bmp",
			"app/societe/image/tn_sites.bmp",
			"select count(*) from sites where societe=" + m_societe.societe,
			"sites",
			"societe=" + m_societe.societe,
			"site",
			"Site" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnSite( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer un nouveau site", "new", this, this.onNewObject ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "Site" ) )
			this.menu.add( new MiCallMethode( "Coller un site", "paste", this, this.onPasteObject ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller un objet
	onPasteObject: function()
		{
		ayawf.mvc.addValueToRowString( "societe", this.m_societe.societe ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur créer un nouvel objet
	onNewObject: function()
		{
		ayawf.mvc.addValueToRowString( "societe", this.m_societe.societe ) ;
		ayawf.mvc.newModeleToDB( "Site", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
