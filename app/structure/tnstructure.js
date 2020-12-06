/*********************************************************
* Classe TnStructure: TreeNode pour une structure
*********************************************************/

function TnStructure( modele )
	{
	herite( TnStructure, TreeNode ) ;
	this.initTnStructure( modele ) ;
	}

TnStructure.prototype =
	{
	initTnStructure: function( modele )
		{
		this.initTreeNode( null,
			"Structure",
			true,
			"app/image/tn_structure.bmp",
			"app/image/tn_structure.bmp",
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( this.modele.sid + ": " + this.modele.rs ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste des adresses
		this.addChildNode( new TnStructureAdresses( this.modele ) ) ;

		// Liste des contact
		this.addChildNode( new TnStructureContacts( this.modele ) ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmStructure( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier la structure", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer la structure", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;

