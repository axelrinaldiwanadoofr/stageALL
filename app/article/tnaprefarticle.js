/*********************************************************
* Classe TnApRefArticle: TreeNode pour une propriété lien
* vers un autre article
*********************************************************/

function TnApRefArticle( modele )
	{
	herite( TnApRefArticle, TreeNode ) ;
	this.initTnApRefArticle( modele ) ;
	}

TnApRefArticle.prototype =
	{
	initTnApRefArticle: function( modele )
		{
		this.initTreeNode( null,
			modele.name + ": " + modele.libelle,
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
		this.setTexte( this.modele.name + ": " + this.modele.libelle ) ;
		},
	// Sur le noeud est sélectionné
	onSelected: function()
		{
		this.fcproperty = new FormulaireControler() ;
		this.fcproperty.addFormulaire( new FmApRefArticle() ) ;
		this.fcproperty.show( this.getAbsoluteX() + this.getWidth(), this.getAbsoluteY() ) ;
		this.fcproperty.setModele( this.modele ) ;
		},
	// Sur le noeud est desélectionné
	onUnSelected: function()
		{
		if( this.fcproperty )
			{
			this.fcproperty.remove() ;
			this.fcproperty = null ;
			}
		}
	} ;
