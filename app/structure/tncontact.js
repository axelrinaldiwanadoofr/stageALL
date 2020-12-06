/*********************************************************
* Classe TnContact: TreeNode pour une adresse de 
* structure
*********************************************************/

function TnContact( modele )
	{
	herite( TnContact, TreeNode ) ;
	this.initTnContact( modele ) ;
	}

TnContact.prototype =
	{
	initTnContact: function( modele )
		{
		// Initialise le treenode
		this.initTreeNode( null,
			"Contact de structure",
			false,
			"app/structure/image/tn_contact.bmp" ,
			"app/structure/image/tn_contact.bmp" ) ;

		// Fixe le modele
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.civilite + " " + this.modele.nom + " " + this.modele.prenom + " " + this.modele.fonction + " Tél: " + this.modele.telephonebureau + " Mobile: " + this.modele.mobile ) ;
		if( this.modele.sid ) var sql = new SqlSelect( "select rs from structures where sid=" + this.modele.sid, 0, -1, this, this.onReceveRs ) ;		
		var image = "app/structure/image/tn_contact.bmp" ;
		if( this.modele.image && this.modele.image != "" ) image = this.modele.image ;
		this.setOpenImage( image ) ;
		this.setCloseImage( image ) ;
		},
	// Recoie la raison sociale
	onReceveRs: function( ss )
		{
		this.setTexte( this.modele.civilite + " " + this.modele.nom + " " + this.modele.prenom + " " + ss.rows[0][0] + " " + this.modele.fonction + " Tél: " + this.modele.telephonebureau + " Mobile: " + this.modele.mobile ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmContact( this.modele ) ) ;
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
