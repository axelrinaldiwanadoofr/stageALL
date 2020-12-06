// Vue pour les noeux du CMS



function CmsNode()
	{
	herite( CmsNode, MvcView ) ;
	this.initCmsNode() ;
	}

CmsNode.prototype =
	{
	// Initialise la vue sur le noeud
	initCmsNode: function()
		{
		this.initMvcView( null, null ) ;
		this.childs = [] ;
		this.actions = [] ;
		this.parent = cms.cparentnode ;
		if( this.parent ) this.parent.addChild( this ) ;
		this.drawtools = [] ;
		this.offsetx = 0 ;
		this.offsety = 0 ;
		},
	// Rafraichissement de la vue
	onRefresh: function()
		{
		this.onRefreshCmsNode() ;
		this.refreshAllActionViews() ;
		this.refreshAllChildViews() ;
		},
	// Rafraichissement de la vue specifique au CmsNode
	onRefreshCmsNode: function()
		{
		if( this.modele )
			{
			var x = 0 ;
			var y = 0 ;
			var z = 0 ;
			this.visible = parseInt(this.modele.visible) ;
			this.opacity = parseInt(this.modele.opacity) ;
			if( this.modele.x != "" ) x = parseInt( this.modele.x ) ;
			if( this.modele.y != "" ) y = parseInt( this.modele.y ) ;
			if( this.modele.z != "" ) z = parseInt( this.modele.z ) ;
			// Calcule la position
			if( this.parent )
				{
				this.x = this.parent.x + x + this.offsetx ;
				this.y = this.parent.y + y + this.offsety ;
				this.z = this.parent.z + z ;
				if( !this.parent.visible ) this.visible = false ;
				if( this.parent.opacity < this.opacity ) this.opacity = this.parent.opacity ;
				}
			else
				{
				this.x = parseInt( this.viewcontroler.x ) + x + this.offsetx ;
				this.y = parseInt( this.viewcontroler.y ) + y + this.offsety ;
				this.z = parseInt( this.viewcontroler.z ) + z ;
				}
			if( this.element )
				{
				// Position
				this.element.style.left = this.x ;
				this.element.style.top = this.y ;
				// Profondeur
				this.element.style.zIndex = this.z ;
				// Opacité
				if( ayawf.tools.isIE )
					{
					if( this.element.filters ) 
						{
						this.element.filters.alpha.opacity = this.opacity ;
						}
					}
				else this.element.style.opacity = this.opacity/100 ;
				//this.element.style.opacity = this.opacity/100 ;
				//this.style.filter = DXImageTransform.Microsoft.Alpha(this.opacity) ; // IE8
				if( this.visible ) this.element.style.display = "block" ;
				else this.element.style.display = "none" ;
				}
			}
		},
	// Suppression de la vue
	onRemove: function()
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
	addAction: function( action )
		{
		this.actions.push( action ) ;
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
	refreshAllActionViews: function()
		{
		for( var i=0 ; i<this.actions.length ; i++ )
			{
			this.actions[i].onRefresh() ;
			}
		},
	// Associe l'element du DOM ayant l'id elementid
	// Positionne l'objet DOM associe
	// Lie l'elements DOM a la vue
	linkDomObject: function( id )
		{
		this.element = document.getElementById( id ) ;
		if( this.element )
			{
			this.element.object = this ;
			this.element.onmouseover = CmsNodeOnMouseOver ;
			this.element.onmouseout = CmsNodeOnMouseOut ;
			this.element.onclick = CmsNodeOnClick ;
			this.element.ondblclick = CmsNodeOnDblClick ;
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
	setDomX: function( x )
		{
		if( this.element ) this.element.style.left = x ;
		},
	setDomY: function( y )
		{
		if( this.element ) this.element.style.top = y ;
		},
	// Fixe la profondeur de l'objet DOM associe
	setDomZ: function( z )
		{
		// Deplace l'element DOM associe
		if( this.element ) this.element.style.zIndex = z ;
		},
	getDomWidth: function()
		{
		return 0 ;
		},
	setDomWidth: function( value )
		{
		},
	getDomHeight: function()
		{
		return 0 ;
		},
	setDomHeight: function( value )
		{
		if( this.element ) this.element.style.height = value ;
		},
	getDomVisible: function()
		{
		if( this.element )
			{
			if( this.element.currentStyle.display == "none" ) return 0 ;
			else return 1 ;
			}
		else return 0 ;
		},
	setDomVisible: function( value, toallchild )
		{
		this.visible = value ;
		if( this.element )
			{
			if( value ) this.element.style.display = "block" ;
			else this.element.style.display = "none" ;
			}
		if( toallchild )
			{
			var i ;
			for( i=0 ; i<this.childs.length ; i++ )
				{
				this.childs[i].setDomVisible( opacity, toallchild ) ;
				}
			}
		},
	getDomOpacity: function()
		{
		if( this.element )
			{
			if( ayawf.tools.isIE ) return this.element.filters.alpha.opacity ;
			else return this.element.style.opacity * 100 ;
			}
		else return 0 ;
		},
	setDomOpacity: function( opacity, toallchild )
		{
		if( this.element )
			{
			if( ayawf.tools.isIE ) this.element.filters.alpha.opacity = opacity ;
			else this.element.style.opacity = opacity/100 ;
			}
		if( toallchild )
			{
			var i ;
			for( i=0 ; i<this.childs.length ; i++ )
				{
				this.childs[i].setDomOpacity( opacity, toallchild ) ;
				}
			}
		},
	// Positionne l'objet DOM associe
	setDomPosition: function( x, y, z )
		{
		if( this.element ) 
			{
			this.element.style.left = x ;
			this.element.style.top = y ;
			this.element.style.zIndex = z ;
			}
		},
	// Retaille l'objet DOM associe
	setDomSize: function( width, height )
		{
		},
	// Renvoie la position la plus a gauche de tous les elements du noeud et de ses fils
	getMinLeft: function()
		{
		var left = 3000 ;
		if( this.element ) left =	this.element.offsetLeft ;

		var i ;
		for( i=0 ; i<this.childs.length ; i++ )
			{
			var ll = this.childs[i].getLeft() ;
			if( ll < left ) left = ll ;
			}
		return left ;
		},
	// Renvoie la position la plus a droite de tous les elements du noeud et de ses fils
	getMaxRight: function()
		{
		var right = 0 ;
		if( this.element ) right =	this.element.offsetLeft + this.element.offsetWidth ;

		var i ;
		for( i=0 ; i<this.childs.length ; i++ )
			{
			var rr = this.childs[i].getRight() ;
			if( rr > right ) right = rr ;
			}
		return right ;
		},
	// Renvoie la position la plus en haut de tous les elements du noeud et de ses fils
	getMinTop: function()
		{
		var t = 3000 ;
		if( this.element ) t =	this.element.offsetTop

		var i ;
		for( i=0 ; i<this.childs.length ; i++ )
			{
			var tt = this.childs[i].getTop() ;
			if( tt < t ) t = tt ;
			}
		return t ;
		},
	// Renvoie la position la plus en bas de tous les elements du noeud et de ses fils
	getMaxBottom: function()
		{
		var b = this.y ;
		if( this.element ) b +=	this.element.offsetHeight ;

		var i ;
		for( i=0 ; i<this.childs.length ; i++ )
			{
			var bb = this.childs[i].getMaxBottom() ;
			if( bb > b ) b = bb ;
			}
		return b ;
		},
	// Renvoie elements du noeud et de ses fils
	getHeight: function()
		{
		var h = 0 ;
		if( this.element ) h = this.element.offsetHeight ;

		var i ;
		for( i=0 ; i<this.childs.length ; i++ )
			{
			var ch = this.childs[i].x + this.childs[i].getHeight() ;
			if( ch > h ) h = ch ;
			}
		return h ;
		},
	// Retaille l'objet DOM associe
	resizeTo: function( width, height )
		{
		// Deplace l'element DOM associe
		if( this.element )
			{
			this.element.style.width = width ;
			this.element.style.height = height ;
			}
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
		this.drawtools.push( new CmsNodeBougeur( this.modele, "x", "y", this.x, this.y ) ) ;
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
	// Gestion de l'evenement onmouseover
	onMouseOver: function()
		{
		if( cms.admin ) return ;
		for( var i=0 ; i<this.actions.length ; i++ ) this.actions[i].onMouseOver( this ) ;
		},
	// Gestion de l'evenement onmouseout
	onMouseOut: function()
		{
		if( cms.admin ) return ;
		for( var i=0 ; i<this.actions.length ; i++ ) this.actions[i].onMouseOut( this ) ;
		},
	// Gestion de l'evenement onclick
	onClick: function( evt )
		{
		if( !evt ) evt = window.event ;
		if( cms.admin )	
			{
			this.onOpenFormulaire() ;
			}
		else for( var i=0 ; i<this.actions.length ; i++ ) this.actions[i].onClick( this ) ;
		},
	// Gestion de l'evenement ondblclick
	onDblClick: function()
		{
		if( cms.admin ) return ;
		for( var i=0 ; i<this.actions.length ; i++ ) this.actions[i].onDblClick( this ) ;
		}
	};

function CmsNodeOnDblClick()
{
	this.object.onDblClick() ;
}

function CmsNodeOnClick()
{
	if( cms.admin )
		{
		if( this.object.modele ) this.object.modele.setSelectedAllViews() ;
		else this.object.setSelected() ;
		}
	this.object.onClick() ;
}

function CmsNodeOnMouseOver()
{
	this.object.onMouseOver() ;
}

function CmsNodeOnMouseOut()
{
	this.object.onMouseOut() ;
}

