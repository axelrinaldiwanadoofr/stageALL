/*********************************************************
* Classe TnGestionAffaire: TreeNode pour la gestion 
* d'affaire 
*********************************************************/


function TnGestionAffaire()
	{
	herite( TnGestionAffaire, TreeNode ) ;
	this.initTnGestionAffaire() ;
	}

TnGestionAffaire.prototype =
	{
	initTnGestionAffaire: function()
		{
		this.initTreeNode( null,
			"Ayawf Gestion des affaires",
			true,
			"app/affaire/image/tn_gestionaffaire.bmp",
			"app/affaire/image/tn_gestionaffaire.bmp",
			null,
			null ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( "Ayawf Gestion des affaires" ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		this.addChildNode( new TnAffaires() ) ;
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
