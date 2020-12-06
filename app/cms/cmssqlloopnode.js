//Classe de gestion des boucles SQL d'appel de module
//

function CmsSqlLoopNode()
	{
	herite( CmsSqlLoopNode, CmsNode, true ) ;
	herite( CmsSqlLoopNode, MvcView ) ;
	this.initCmsSqlLoopNode() ;
	}

CmsSqlLoopNode.prototype =
	{
	// Initialise la vue sur le noeud image
	initCmsSqlLoopNode: function()
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
			
		var ym = 0 ;
		var interligne = parseInt( this.modele.interligne ) ;
		
		for( var i=0 ; i<this.childs.length ; i++ )
			{
			this.childs[i].offsety = ym ;
			this.childs[i].onRefresh() ;
			ym = this.childs[i].getMaxBottom() - this.y + interligne ;
			}
		},
	onOpenFormulaire: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsSqlLoopNode( this.modele ) ) ;
		this.formulairectrl.show( this.x , this.y + this.element.clientHeight ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Devient selectionn�e
	onGetSelected: function()
		{
		this.drawtools.push( new CmsNodeBougeur( this.modele, "x", "y", this.x, this.y ) ) ;
		this.drawtools.push( new CmsNodeBougeur( this.modele, null, "interligne", 
			this.x, this.y + parseInt(this.modele.interligne ),
			"inc/image/b_size_v.bmp" ) ) ;
		}
	};
