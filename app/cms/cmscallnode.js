//Classe de gestion des noeuds label du CMS
//
// arguments: Chaine argumentaire
// previousnode: 0 = pas de noeud precedent, 1 = noeud precedent a gauche, 2 = noeud precedent au dessus

function CmsCallNode()
{
	herite( CmsCallNode, CmsNode, true ) ;
	herite( CmsCallNode, MvcView ) ;
	this.initCmsCallNode() ;
}

CmsCallNode.prototype =
{
	// Initialise la vue sur le noeud image
	initCmsCallNode: function()
	{
		this.initCmsNode() ;							
	},

	// Appel�e quand le modele est chang�
	// Cree les tableaux de valeur d'argument
	onModeleChanged: function()
	{
	},		

	// Rafraichissement de la vue
	onRefresh: function()
	{
		this.onRefreshCmsNode() ;
		this.refreshAllChildViews() ;
	},

	onOpenFormulaire: function()
	{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsCallNode( this.modele ) ) ;
		this.formulairectrl.show( this.x , this.y + this.element.clientHeight ) ;
		this.formulairectrl.setModele( this.modele ) ;
	},

	// Devient selectionn�e
	onGetSelected: function()
	{
		this.drawtools.push( new CmsNodeBougeur( this.modele, "x", "y", this.x, this.y ) ) ;
	}
};
