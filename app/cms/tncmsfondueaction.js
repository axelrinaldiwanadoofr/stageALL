/*********************************************************
* Classe TnCmsFondueAction: TreeNode pour une
* action de fondue d'opacite sur les noeux fils
*********************************************************/

function TnCmsFondueAction( modele )
	{
	herite( TnCmsFondueAction, TnCmsAction, true ) ;
	herite( TnCmsFondueAction, TreeNode ) ;
	this.initTnCmsFondueAction( modele ) ;
	}

TnCmsFondueAction.prototype =
	{
	initTnCmsFondueAction: function( modele )
		{
		this.initTnCmsAction( 
			"Fondue enchainee",
			"app/cms/image/cmsfondueaction.bmp",
			"app/cms/image/cmsfondueaction.bmp",
			modele ) ;
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( "Fondue enchainee" ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsFondueAction( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}
	} ;

