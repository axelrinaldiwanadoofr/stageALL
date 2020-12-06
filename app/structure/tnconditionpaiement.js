/*********************************************************
* Classe TnConditionPaiement: TreeNode pour une
* condition de payement
*********************************************************/

function TnConditionPaiement( modele )
	{
	herite( TnConditionPaiement, TreeNode ) ;
	this.initTnConditionPaiement( modele ) ;
	}

TnConditionPaiement.prototype =
	{
	initTnConditionPaiement: function( modele )
		{
		// Initialise le treenode
		this.initTreeNode( null,
			"Condition de payement",
			false,
			"app/image/tn_conditionpaiement.bmp" ,
			"app/image/tn_conditionpaiement.bmp" ) ;

		// Fixe le modele
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.conditionp + ": " + this.modele.libelle ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmConditionPaiement( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier la condition de payement", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer la condition de payement", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;
