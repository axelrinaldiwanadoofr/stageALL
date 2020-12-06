/*********************************************************
* Classe TnApString: TreeNode pour une propriété de valeur
* de chaine de caractère pour un article
*********************************************************/


function TnApString( modele )
	{
	herite( TnApString, TreeNode ) ;
	this.initTnApString( modele ) ;
	}

TnApString.prototype =
	{
	initTnApString: function( modele )
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
	// Rafraichi le noeud
	onRefresh: function()
		{
		this.setTexte( this.modele.name + ": " + this.modele.value ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmApString() ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}
	} ;
