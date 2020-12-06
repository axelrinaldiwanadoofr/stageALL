/*********************************************************
* Classe TnArticlePropertyRubrique: TreeNode pour
* une rubrique de propriété sur un article
*********************************************************/

function TnArticlePropertyRubrique( modele )
	{
	herite( TnArticlePropertyRubrique, TreeNode ) ;
	this.initTnArticlePropertyRubrique( modele ) ;
	}

TnArticlePropertyRubrique.prototype =
	{
	initTnArticlePropertyRubrique: function( modele )
		{
		var image = "app/image/tn_propertyrubrique.bmp" ;
		if( modele.image != "" ) image = modele.image ;
		this.initTreeNode( null,
			modele.libelle,
			false,
			image,
			image,
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.libelle ) ;
		}
	} ;
