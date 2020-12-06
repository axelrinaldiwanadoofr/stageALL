/*********************************************************
* Classe TnApStingMl: TreeNode pour une propriété de valeur
* multiligne pour un article
*********************************************************/

function TnApStringMl( modele )
	{
	herite( TnApStringMl, TreeNode ) ;
	this.initTnApStringMl( modele ) ;
	}

TnApStringMl.prototype =
	{
	initTnApStringMl: function( modele )
		{
		this.initTreeNode( null,
			modele.name + ": " + modele.value,
			false,
			"app/image/tn_property.bmp",
			"app/image/tn_property.bmp",
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.name + ": " + this.modele.value ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmApStringMl() ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}
	} ;
