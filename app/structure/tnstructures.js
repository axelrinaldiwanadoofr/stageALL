/*********************************************************
* Classe TnStructures: TreeNode racine pour les structures
*********************************************************/

function TnStructures()
	{
	herite( TnStructures, TreeNode ) ;
	this.initTnStructures() ;
	}

TnStructures.prototype =
	{
	initTnStructures: function()
		{
		this.initTreeNode( null,
			"Structures",
			true,
			"app/image/tn_structures.bmp",
			"app/image/tn_structures.bmp",
			null,
			null ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste des structures courante
		this.addChildNode( new TnCurrentStructures() ) ;
		// Liste de toutes les recherches
		ayawf.mvc.loadModeleFromSqlSelect(
			"StructureRecherche",
			"structurerecherche",
			"",
			"recherche",			
			this,
			this.onCreateTnStructureRecherche ) ;
			
		// Liste de toutes les structures
		this.addChildNode( new TnListeStructures(
			"Toutes les structures",
			"app/image/tn_touteslesstructures.bmp",
			"select count(*) from structures",
			"structures",
			"",
			"rs" ) ) ;
		},
	// Appelée pour chaque recherche de structure
	onCreateTnStructureRecherche: function( modele )
		{
		var tn = new TnStructureRecherche( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle liste multi-criteres", "new", this, this.onNewStructureRecherche ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur créer une nouvelle recherche
	onNewStructureRecherche: function()
		{
		ayawf.mvc.newModeleToDB( "StructureRecherche", this, this.onCreateTnStructureRecherche ) ;
		}
	} ;
