/*********************************************************
* Classe TnStructureAdresse: TreeNode pour une adresse de 
* structure
*********************************************************/

function TnStructureAdresse( modele )
	{
	herite( TnStructureAdresse, TreeNode ) ;
	this.initTnStructureAdresse( modele ) ;
	}

TnStructureAdresse.prototype =
	{
	initTnStructureAdresse: function( modele )
		{
		// Initialise le treenode
		this.initTreeNode( null,
			"Adresse de structure",
			false,
			"app/image/tn_structureadresse.bmp" ,
			"app/image/tn_structureadresse.bmp" ) ;

		// Fixe le modele
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		if( parseInt( this.modele.principal ) )
			this.setTexte( "<u>" + this.modele.typeadresse + "</u>: " + this.modele.adresse + " " + this.modele.codepostal + " " + this.modele.ville + " Tél: " + this.modele.telephone ) ;
		else
			this.setTexte( this.modele.typeadresse + ": " + this.modele.adresse + " " + this.modele.codepostal + " " + this.modele.ville + " Tél: " + this.modele.telephone ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmStructureAdresse( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier l'adresse", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer l'adresse", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;
