/*********************************************************
* Classe TnCmsSequenceAction: TreeNode pour une
* action lancant une sequence d'action du CMS
*********************************************************/

function TnCmsSequenceAction( modele )
	{
	herite( TnCmsSequenceAction, TnCmsAction, true ) ;
	herite( TnCmsSequenceAction, TreeNode ) ;
	this.initTnCmsSequenceAction( modele ) ;
	}

TnCmsSequenceAction.prototype =
	{
	initTnCmsSequenceAction: function( modele )
		{
		this.initTnCmsAction( 
			"Sequence d'action",
			"app/cms/image/cmssequenceaction.bmp",
			"app/cms/image/cmssequenceaction.bmp",
			modele ) ;
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( "Sequence d'action" ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsSequenceAction( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}
	} ;

