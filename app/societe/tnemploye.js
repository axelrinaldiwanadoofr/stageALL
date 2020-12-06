/*********************************************************
* Classe TnEmploye: TreeNode pour une societe
*********************************************************/

function TnEmploye( modele )
	{
	herite( TnEmploye, TreeNode ) ;
	this.initTnEmploye( modele ) ;
	}

TnEmploye.prototype =
	{
	initTnEmploye: function( modele )
		{
		this.initTreeNode( null,
			"Employe",
			true,
			"app/societe/image/tn_employe.bmp",
			"app/societe/image/tn_employe.bmp",
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;			
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( this.modele.matricule + ": " + this.modele.nom + " " + this.modele.prenom ) ;
		var image = "app/societe/image/tn_employe.bmp" ;
		if( this.modele.image && this.modele.image != "" ) image = this.modele.image ;
		this.setOpenImage( image ) ;
		this.setCloseImage( image ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste des saisies horaires
		//this.addChildNode( new TnSites( this.modele ) ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmEmploye( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier l'employé", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer l'employé", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}		
	} ;
