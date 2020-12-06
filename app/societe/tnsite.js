/*********************************************************
* Classe TnSite: TreeNode pour un site d'une societe
*********************************************************/

function TnSite( modele )
	{
	herite( TnSite, TreeNode ) ;
	this.initTnSite( modele ) ;
	}

TnSite.prototype =
	{
	initTnSite: function( modele )
		{
		this.initTreeNode( null,
			"Site",
			true,
			"app/societe/image/tn_site.bmp",
			"app/societe/image/tn_site.bmp",
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;			
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( this.modele.site + " " + this.ville ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste des employes
		this.addChildNode( new TnEmployes( this.modele ) ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmSite( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier le site", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer le site", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}		
	} ;
