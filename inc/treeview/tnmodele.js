/********************************************************************************************
* Classe TnModele: TreeNode 
* offrant des fonctionnalites de bases pour la gestion
* d'un modele
*
* modele: Modele exploitate par le treenode
* image:  Nom et chemin du fichier image pour le treenode
* methonrefresh: Source de la methode executee pour rafraichir le treenode
* messageforcopy: Message pour l'item de menu copy, si null l'item n'apparait pas.
* messagefordelete: Message pour l'item de menu delete, si null l'item n'apparait pas.
************************************************************************************************/

function TnModele( modele, image, methonrefresh, methcreateform, messageforcopy, messagefordelete )
	{
	herite( TnModele, TreeNode ) ;
	this.initTnModele( modele, image, methonrefresh, methcreateform, messageforcopy, messagefordelete ) ;
	}

TnModele.prototype =
	{
	initTnModele: function( modele, image, methonrefresh, methcreateform, messageforcopy, messagefordelete )
		{
		// Initialise le treenode
		this.initTreeNode( null,
			"Tree node pour un modele",
			false,
			image ,
			image ) ;

		this.methonrefresh = methonrefresh ;
		this.methcreateform = methcreateform ;
		this.messageforcopy = messageforcopy ;
		this.messagefordelete = messagefordelete ;
		
		// Fixe le modele
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		if( this.methonrefresh ) this.methonrefresh.call( this ) ;
		},
	onClick: function()
		{
		if( this.methcreateform )
			{
			this.formulairectrl = new FormulaireControler() ;
			var form = this.methcreateform.call( this, this.formulairectrl, this.modele ) ;
			if( form )
				{
				this.formulairectrl.addFormulaire( form ) ;
				this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
				this.formulairectrl.setModele( this.modele ) ;
				}
			}
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		if( this.messageforcopy ) this.menu.add( new MiCallMethode( this.messageforcopy, "copy", this, this.onCopyModele ) ) ;
		if( this.messagefordelete ) this.menu.add( new MiCallMethode( this.messagefordelete, "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;
