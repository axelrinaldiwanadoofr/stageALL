/*********************************************************
* Classe TnStructureRecherche: TnSql pour une
* recherche de structure
*********************************************************/

function TnStructureRecherche( modele )
	{
	herite( TnStructureRecherche, TnSql, true ) ;
	herite( TnStructureRecherche, TreeNode ) ;
	this.initTnStructureRecherche( modele ) ;
	}

TnStructureRecherche.prototype =
	{
	initTnStructureRecherche: function( modele )
		{
		this.initTnSql( "Ensemble des listes de structure",
			"app/image/tn_recherche.bmp",
			"app/image/tn_recherche.bmp",
			"select count(*) from structures where " + modele.rsqlwhere,
			"structures",
			modele.rsqlwhere,
			"rs",
			"Structure" ) ;

		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	onRefresh: function()
		{
		this.setTexte( this.modele.recherche ) ;
		this.where = this.modele.rsqlwhere ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnStructure( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Supprimer la liste", "delete", this, this.onDeleteModele ) ) ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle structure", "delete", this, this.onNewStructure ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "Structure" ) )
			this.menu.add( new MiCallMethode( "Coller une structure", "paste", this, this.onPasteStructure ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur créer une nouveau regroupement
	onNewStructure: function()
		{
		ayawf.mvc.newModeleToDB( "Structure", this, this.onCreateChildNodeWithModele ) ;
		},				
	onPasteStructure: function()
		{
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmStructureRecherche( this.modele, this ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}
	} ;
