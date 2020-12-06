//Classe de gestion d'appel de module a partir d'un article
//

function CmsArticleNode()
	{
	herite( CmsArticleNode, CmsNode, true ) ;
	herite( CmsArticleNode, MvcView ) ;
	this.initCmsArticleNode() ;
	}

CmsArticleNode.prototype =
	{
	// Initialise la vue sur le noeud image
	initCmsArticleNode: function()
		{
		this.initCmsNode() ;							
		},
	// Appel�e quand le modele est chang�
	// Cree les tableaux de valeur d'argument
	onModeleChanged: function()
		{
		},		
	onOpenFormulaire: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsArticleNode( this.modele ) ) ;
		this.formulairectrl.show( this.x , this.y + this.element.clientHeight ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Devient selectionn�e
	onGetSelected: function()
		{
		this.drawtools.push( new CmsNodeBougeur( this.modele, "x", "y", this.x, this.y ) ) ;
		}
	};
