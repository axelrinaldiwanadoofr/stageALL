/*********************************************************
* Classe TnSociete: TreeNode pour une societe
*********************************************************/

function TnSociete( modele )
	{
	herite( TnSociete, TreeNode ) ;
	this.initTnSociete( modele ) ;
	}

TnSociete.prototype =
	{
	initTnSociete: function( modele )
		{
		this.initTreeNode( null,
			"Societe",
			true,
			"app/societe/image/tn_societe.bmp",
			"app/societe/image/tn_societe.bmp",
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;			
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( this.modele.societe + ": " + this.modele.rs ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste des sites
		this.addChildNode( new TnSites( this.modele ) ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmSociete( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier la société", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer la société", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}		
	} ;
