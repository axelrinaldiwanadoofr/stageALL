/*********************************************************
* Classe TnCmsMotionOpacityAction: TreeNode pour une
* action sur un changment d'opacite progressif du CMS
*********************************************************/

function TnCmsMotionOpacityAction( modele )
	{
	herite( TnCmsMotionOpacityAction, TnCmsAction, true ) ;
	herite( TnCmsMotionOpacityAction, TreeNode ) ;
	this.initTnCmsMotionOpacityAction( modele ) ;
	}

TnCmsMotionOpacityAction.prototype =
	{
	initTnCmsMotionOpacityAction: function( modele )
		{
		this.initTnCmsAction( 
			"Changement progressif d'opacité",
			"app/cms/image/cmsmotionopacityaction.bmp",
			"app/cms/image/cmsmotionopacityaction.bmp",
			modele ) ;
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( "Changement progressif d'opacité" ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsMotionOpacityAction( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}
	} ;

