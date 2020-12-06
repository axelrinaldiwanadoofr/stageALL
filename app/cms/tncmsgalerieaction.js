/*********************************************************
* Classe TnCmsGalerieAction: TreeNode pour une
* action de galerie d'image sur les noeux fils
*********************************************************/

function TnCmsGalerieAction( modele )
	{
	herite( TnCmsGalerieAction, TnCmsAction, true ) ;
	herite( TnCmsGalerieAction, TreeNode ) ;
	this.initTnCmsGalerieAction( modele ) ;
	}

TnCmsGalerieAction.prototype =
	{
	initTnCmsGalerieAction: function( modele )
		{
		this.initTnCmsAction( 
			"Galerie d'images",
			"app/cms/image/cmsgalerieaction.bmp",
			"app/cms/image/cmsgalerieaction.bmp",
			modele ) ;
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( "Galerie d'image" ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsGalerieAction( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}
	} ;

