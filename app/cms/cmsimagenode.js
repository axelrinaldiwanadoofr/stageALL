//Classe de gestion des noeuds image du CMS

function CmsImageNode()
	{
	herite( CmsImageNode, CmsNode, true ) ;
	herite( CmsImageNode, MvcView ) ;
	this.initCmsImageNode() ;
	}

CmsImageNode.prototype =
	{
	// Initialise la vue sur le noeud image
	initCmsImageNode: function()
		{
		this.initCmsNode() ;
		},
	// Rafraichissement de la vue
	onRefresh: function()
		{
		this.onRefreshCmsNode() ;
		if( this.element && this.modele )
			{
			// Dimensions
			if( this.modele.width != "" ) this.element.style.width = this.modele.width ;
			if( this.modele.height != "" ) this.element.style.height = this.modele.height ;
			// Image
			var filename = this.computeValue( this.modele.filename ) ;
			this.element.src = filename ;
			}
		this.refreshAllActionViews() ;
		this.refreshAllChildViews() ;
		},
	onOpenFormulaire: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsImageNode( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.x , this.y + this.element.clientHeight ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Devient selectionnée
	onGetSelected: function()
		{
		this.drawtools.push( new CmsNodeBougeur( this.modele, "x", "y", this.x, this.y ) ) ;
		this.drawtools.push( new CmsNodeSizer( this.modele, "x", "y", "imgwidth", "imgheight", 
			this.x + parseInt( this.modele.imgwidth ), this.y + parseInt( this.modele.imgheight ),
			"inc/image/b_size_hv_reel.bmp", 20, 20 ) ) ;
		this.drawtools.push( new CmsNodeSizer( this.modele, "x", "y", "width", "height", 
			this.x + parseInt( this.modele.width ), this.y + parseInt( this.modele.height ),
			"inc/image/b_size_hv_affiche.bmp", 20, 20 ) ) ;
		},
	getDomWidth: function()
		{
		if( this.element ) return this.element.offsetWidth ;
		else return 0 ;
		},
	setDomWidth: function( value )
		{
		if( this.element ) this.element.style.width = value ;
		},
	getDomHeight: function()
		{
		if( this.element ) return this.element.offsetHeight ;
		else return 0 ;
		},
	setDomHeight: function( value )
		{
		if( this.element ) this.element.style.height = value ;
		},
	setDomSize: function( width, height )
		{
		if( this.element ) 
			{
			this.element.style.width = width ;
			this.element.style.height = height ;
			}
		},
	getDomImage: function()
		{
		if( this.element ) return this.element.src ;
		else return "" ;
		},
	setDomImage: function( value )
		{
		if( this.element ) this.element.src = value ;
		}
	};
