/*********************************************************
* Classe TnStructureContact: TreeNode pour une adresse de 
* structure
*********************************************************/

function TnStructureContact( modele )
	{
	herite( TnStructureContact, TreeNode ) ;
	this.initTnStructureContact( modele ) ;
	}

TnStructureContact.prototype =
	{
	initTnStructureContact: function( modele )
		{
		// Initialise le treenode
		this.initTreeNode( null,
			"Contact de structure",
			false,
			"app/image/tn_structurecontact.bmp" ,
			"app/image/tn_structurecontact.bmp" ) ;

		// Fixe le modele
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		if( parseInt(this.modele.principal) )
			this.setTexte( this.modele.contact + " <u>" + this.modele.civilite + " " + this.modele.nom + " " + this.modele.prenom + "</u> " + this.modele.fonction + " Tél: " + this.modele.telephonebureau + " Mobile: " + this.modele.mobile ) ;
		else
			this.setTexte( this.modele.contact + " " + this.modele.civilite + " " + this.modele.nom + " " + this.modele.prenom + " " + this.modele.fonction + " Tél: " + this.modele.telephonebureau + " Mobile: " + this.modele.mobile ) ;
		var image = "app/image/tn_structurecontact.bmp" ;
		if( this.modele.image && this.modele.image != "" ) image = this.modele.image ;
		this.setOpenImage( image ) ;
		this.setCloseImage( image ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmStructureContact( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier le contact", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer le contact", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;
