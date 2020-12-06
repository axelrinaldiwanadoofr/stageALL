/*********************************************************
* Classe TnCmsMotionMoveResizeAction: TreeNode pour une
* action de mouvement progressif
*********************************************************/

function TnCmsMotionMoveResizeAction( modele )
	{
	herite( TnCmsMotionMoveResizeAction, TnCmsAction, true ) ;
	herite( TnCmsMotionMoveResizeAction, TreeNode ) ;
	this.initTnCmsMotionMoveResizeAction( modele ) ;
	}

TnCmsMotionMoveResizeAction.prototype =
	{
	initTnCmsMotionMoveResizeAction: function( modele )
		{
		this.initTnCmsAction( 
			"Mouvement progressif",
			"app/cms/image/cmsmotionmoveresizeaction.bmp",
			"app/cms/image/cmsmotionmoveresizeaction.bmp",
			modele ) ;
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( "Mouvement progressif sur " + this.modele.declencheur ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsMotionMoveResizeAction( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Déclenche l'action", "declenche", this, this.onDeclenche ) ) ;
		this.onActionContextMenu() ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},		
	onDeclenche: function()
		{
		this.modele.start = true ;
		this.modele.torefreshview = true ;
		this.modele.refreshAllViews( this ) ;
		}
	} ;

