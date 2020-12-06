/*********************************************************
* Classe TnAffaire: TreeNode pour une affaire 
*********************************************************/

function TnAffaire( modele )
	{
	herite( TnAffaire, TreeNode ) ;
	this.initTnAffaire( modele ) ;
	}

TnAffaire.prototype =
	{
	initTnAffaire: function( modele )
		{
		// Initialise le treenode
		this.initTreeNode( null,
			"Affaire",
			true,
			"app/affaire/image/tn_affaire.bmp" ,
			"app/affaire/image/tn_affaire.bmp" ) ;

		// Fixe le modele
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.affaire + ": " + this.modele.designation ) ;
		if( this.modele.client ) var sql = new SqlSelect( "select rs from structures where sid=" + this.modele.client, 0, -1, this, this.onReceveClientRs ) ;		
		var image = "app/affaire/image/tn_affaire.bmp" ;
		if( this.modele.image && this.modele.image != "" ) image = this.modele.image ;
		this.setOpenImage( image ) ;
		this.setCloseImage( image ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste des adresses
		this.addChildNode( new TnAffaireLignes( this.modele ) ) ;
		},
	// Recoie la raison sociale du client
	onReceveClientRs: function( ss )
		{
		this.setTexte( this.modele.affaire + ": " + ss.rows[0][0] + " " + this.modele.designation ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmAffaire( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier l'affaire", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer l'affaire", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;
