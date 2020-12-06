/*********************************************************
* Classe TnGestionStructure: Noeud racine de la gestion
* des structures
*********************************************************/


function TnGestionStructure()
	{
	herite( TnGestionStructure, TreeNode ) ;
	this.initTnGestionStructure() ;
	}

TnGestionStructure.prototype =
	{
	initTnGestionStructure: function()
		{
		this.initTreeNode( null,
			"Ayawf Gestion des structures",
			true,
			"app/image/tn_structures.bmp",
			"app/image/tn_structures.bmp",
			null,
			null ) ;
		},
		
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( "Ayawf Gestion des strutures" ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		this.addChildNode( new TnStructures() ) ;
		this.addChildNode( new TnContacts() ) ;
		this.addChildNode( new TnStructureDivers() ) ;
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
