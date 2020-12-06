/*********************************************************
* Classe TnCmsMotionPoint2PointAction: TreeNode pour une
* action de deplacement d'un point vers un autre
*********************************************************/

function TnCmsMotionPoint2PointAction( modele )
	{
	herite( TnCmsMotionPoint2PointAction, TnCmsAction, true ) ;
	herite( TnCmsMotionPoint2PointAction, TreeNode ) ;
	this.initTnCmsMotionPoint2PointAction( modele ) ;
	}

TnCmsMotionPoint2PointAction.prototype =
	{
	initTnCmsMotionPoint2PointAction: function( modele )
		{
		this.initTnCmsAction( 
			"Deplacement progressif d'un point vers un autre",
			"app/cms/image/cmsmotionpoint2pointaction.bmp",
			"app/cms/image/cmsmotionpoint2pointaction.bmp",
			modele ) ;
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( "Deplacement progressif d'un point vers un autre" ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsMotionPoint2PointAction( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}
	} ;

