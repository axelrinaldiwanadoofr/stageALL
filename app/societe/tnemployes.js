/*********************************************************
* Classe TnEmployes: TnSql pour une liste 
* des employes d'un site
*********************************************************/

function TnEmployes( m_site )
	{
	herite( TnEmployes, TnSql, true ) ;
	herite( TnEmployes, TreeNode ) ;
	this.initTnEmployes( m_site ) ;
	}

TnEmployes.prototype =
	{
	initTnEmployes: function( m_site )
		{
		this.m_site = m_site ;
		
		this.initTnSql( "Employés",
			"app/societe/image/tn_employes.bmp",
			"app/societe/image/tn_employes.bmp",
			"select count(*) from employes where societe=" + m_site.societe + " and site='" + m_site.site + "'",
			"employes",
			"societe=" + m_site.societe + " and site='" + m_site.site + "'" ,
			"nom,prenom",
			"Employe" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnEmploye( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer un nouvel employé", "new", this, this.onNewObject ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "Employe" ) )
			this.menu.add( new MiCallMethode( "Coller un employé", "paste", this, this.onPasteObject ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller un objet
	onPasteObject: function()
		{
		ayawf.mvc.addValueToRowString( "societe", this.m_site.societe ) ;
		ayawf.mvc.addValueToRowString( "site", this.m_site.site ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur créer un nouvel objet
	onNewObject: function()
		{
		ayawf.mvc.addValueToRowString( "societe", this.m_site.societe ) ;
		ayawf.mvc.addValueToRowString( "site", this.m_site.site ) ;
		ayawf.mvc.newModeleToDB( "Employe", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
