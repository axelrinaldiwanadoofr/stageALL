/*********************************************************
* Classe TnApImage: TreeNode pour une propriété image d'un
* article
*********************************************************/

function TnApImage( modele )
	{
	herite( TnApImage, TreeNode ) ;
	this.initTnApImage( modele ) ;
	}

TnApImage.prototype =
	{
	initTnApImage: function( modele )
		{
		this.initTreeNode( null,
			modele.name,
			false,
			modele.fichier,
			modele.fichier,
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.name ) ;
		this.setOpenImage( this.modele.fichier ) ;
		this.setCloseImage( this.modele.fichier ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmApImage() ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}
	} ;

