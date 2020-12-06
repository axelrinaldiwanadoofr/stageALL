// Vue pour les actions du CMS



function CmsAction()
	{
	herite( CmsAction, MvcView ) ;
	this.initCmsAction() ;
	}

CmsAction.prototype =
	{
	// Initialise la vue sur le noeud
	initCmsAction: function()
		{
		this.initMvcView( null, null ) ;
		this.childs = [] ;
		this.parent = cms.cparentaction ;
		this.node = cms.cparentnode ;
		if( this.parent ) this.parent.addChild( this ) ;
		else this.node.addAction( this ) ;
		this.drawtools = [] ;
		},
	// Rafraichissement de la vue
	onRefresh: function()
		{
		this.onRefreshCmsAction() ;
		this.refreshAllChildViews() ;
		},
	// Rafraichissement de la vue specifique au CmsAction
	onRefreshCmsAction: function()
		{
		},
	// Suppression de la vue
	onRemove: function()
		{
		this.onRemoveCmsAction() ;
		},
	// Suppression de la vue
	onRemoveCmsAction: function()
		{
		// Supprime les objets de dessin associes
		for( var i=0 ; i<this.drawtools ; i++ )
			{
			this.drawtools.remove( this ) ;
			}
		},
	addChild: function( child )
		{
		this.childs.push( child ) ;
		},
	// Calcule la valeur value avec les arguments
	computeValue: function( value )
		{
		if( this.parent ) return this.parent.computeValue( value ) ;
		return value ;
		},		
	refreshAllChildViews: function()
		{
		for( var i=0 ; i<this.childs.length ; i++ )
			{
			this.childs[i].onRefresh() ;
			}
		},
	// Selectionne le tree node et deselectionne l'ancien
	setSelected: function()
		{
		if( cms.selectedview )
			{
			cms.selectedview.restoreStyle() ;
			cms.selectedview.onGetUnSelected() ;
			}
		cms.selectedview = this ;
		this.onGetSelected() ;
		this.setSelectedStyle() ;
		},
	// renvoie l'indice d'un noeud fils
	getChildIndex: function( child )
		{
		var i ;
		for( i=0 ; i< this.childs.length ; i++ )
			{
			if( child == this.childs[i] ) return i ;
			}
		return -1 ;
		},
	// Devient selectionnée
	onGetSelected: function()
		{
		//this.drawtools.push( new CmsActionBougeur( this.modele, "x", "y", this.x, this.y ) ) ;
		},
	// Devient non selectionnée
	onGetUnSelected: function()
		{
		var dt ;
		while( dt = this.drawtools.pop() )
			{
			dt.remove( this ) ;
			}
		if( this.formulairectrl )
			{
			this.formulairectrl.remove() ;
			this.formulairectrl = null ;
			}
		if( this.menu )
			{
			this.menu.remove() ;
			this.menu = null ;
			}
		},
	// Gestion de l'evenement onOpen
	onOpenFormulaire: function()
		{
		},
	// Gestion de l'evenement onTimeout
	onTimeout: function( time )
		{
		},
	// Gestion de l'evenement onStart
	onStart: function()
		{
		},
	// Gestion de l'evenement onStop
	onStop: function()
		{
		},
	// Gestion de l'evenement onmouseover
	onMouseOver: function( node )
		{
		this.onMouseOverAllChilds( node ) ;
		},
	// Gestion de l'evenement onmouseout
	onMouseOut: function( node )
		{
		this.onMouseOutAllChilds( node ) ;
		},
	// Gestion de l'evenement onclick
	onClick: function( node )
		{
		this.onClickAllChilds( node ) ;
		},
	// Gestion de l'evenement ondblclick
	onDblClick: function( node )
		{
		this.onDblClickAllChilds( node ) ;
		},
	// Gestion de l'evenement onmouseover pour les actions filles
	onMouseOverAllChilds: function( node )
		{
		for( var i=0 ; i<this.childs.length ; i++ ) this.childs[i].onMouseOver( node ) ;
		},
	// Gestion de l'evenement onmouseout pour les actions filles
	onMouseOutAllChilds: function( node )
		{
		for( var i=0 ; i<this.childs.length ; i++ ) this.childs[i].onMouseOut( node ) ;
		},
	// Gestion de l'evenement onclick pour les actions filles
	onClickAllChilds: function( node )
		{
		for( var i=0 ; i<this.childs.length ; i++ ) this.childs[i].onClick( node ) ;
		},
	// Gestion de l'evenement ondblclick pour les actions filles
	onDblClickAllChilds: function( node )
		{
		for( var i=0 ; i<this.childs.length ; i++ ) this.childs[i].onDblClick( node ) ;
		}
	};

