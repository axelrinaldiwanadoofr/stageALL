/*********************************************************
* Classe TnApTexte: TreeNode pour un texte formaté pour
* un article
*********************************************************/

function TnApTexte( modele )
	{
	herite( TnApTexte, TreeNode ) ;
	this.initTnApTexte( modele ) ;
	}

TnApTexte.prototype =
	{
	initTnApTexte: function( modele )
		{
		this.initTreeNode( null,
			modele.name,
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
		this.setTexte( this.modele.name + ": " + this.modele.texte ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmApTexte() ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}
	} ;

