/*********************************************************
* Classe TnCmsMotionResizeAction: TreeNode pour une
* action de changement progressif de taille
*********************************************************/

function TnCmsMotionResizeAction( modele )
	{
	herite( TnCmsMotionResizeAction, TnCmsAction, true ) ;
	herite( TnCmsMotionResizeAction, TreeNode ) ;
	this.initTnCmsMotionResizeAction( modele ) ;
	}

TnCmsMotionResizeAction.prototype =
	{
	initTnCmsMotionResizeAction: function( modele )
		{
		this.initTnCmsAction( 
			"Changement progressif de taille",
			"app/cms/image/cmsmotionresizeaction.bmp",
			"app/cms/image/cmsmotionresizeaction.bmp",
			modele ) ;
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( "Changement progressif de taille" ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsMotionResizeAction( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}
	} ;

