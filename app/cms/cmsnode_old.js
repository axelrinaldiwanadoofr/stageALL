// Vue pour les noeux du CMS



function CmsNode( viewcontroler, idx, modele )
	{
	herite( CmsNode, MvcView ) ;
	this.initCmsNode( viewcontroler, idx, modele ) ;
	}

/*	// Initialise un formulaire
	initMvcView: function( viewcontroler, idx, modele )
		{
		if( idx ) this.idx = referenceObject( this, idx ) ;
		else this.idx = referenceObject( this ) ;
		
		this.viewcontroler = viewcontroler ;
		if( modele ) this.setModele( modele ) ;
		},
	
	this.id = id ;
	this.iddb = iddb ;
	this.visible = visible ;
	this.opacity = opacity ;
	this.x = x ;
	this.y = y ;
	this.z = z ;
	this.parent = parent ;
	this.admin = admin ;
	this.element = null ;
	this.childs = [] ;

	if( parent ) parent.addChild( this ) ;

	// Cree les tableaux regrougant les actions associe
	this.onopen = [] ;
	this.onclose = [] ;
	this.ontimeout = [] ;
	this.onclick = [] ;
	this.onmouseover = [] ;
	this.onmouseout = [] ;
	this.ondblclick = [] ;
	}
*/
CmsNode.prototype =
	{
	// Initialise la vue sur le noeud
	initCmsNode: function( viewcontroler, idx, modele )
		{
		this.initMvcView( viewcontroler, idx, modele ) ;
		},
	// Rafraichissement de la vue
	onRefresh: function()
		{
		this.onRefreshCmsNode() ;
		},
	// Rafraichissement de la vue specifique au CmsNode
	onRefreshCmsNode: function()
		{
		if( this.element && this.modele )
			{
			// Position
			this.element.style.left = this.modele.x ;
			this.element.style.top = this.modele.y ;
			// Profondeur
			this.element.style.zIndex = this.modele.z ;
			// Opacité
			if( isIE ) this.element.filters.alpha.opacity = this.modele.opacity ;
			else this.element.style.opacity = this.modele.opacity/100 ;
			// Visibilité
			if( this.modele.visible ) this.element.style.display = "block" ;
			else this.element.style.display = "none" ;
			}
		},
	addChild: function( child )
		{
		this.childs.push( child ) ;
		},
	getDomElementVisible: function()
		{
		if( this.element )
			{
			if( this.element.currentStyle.display == "none" ) return 0 ;
			else return 1 ;
			}
		else return 0 ;
		},
	setDomElementVisible: function( value, toallchild )
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
				this.childs[i].setVisible( opacity, toallchild ) ;
				}
			}
		},
	getDomElementOpacity: function()
		{
		if( this.element )
			{
			if( isIE ) return this.element.filters.alpha.opacity ;
			else return this.element.style.opacity * 100 ;
			}
		else return 0 ;
		},
	setDomElementOpacity: function( opacity, toallchild )
		{
		if( this.element )
			{
			if( isIE ) this.element.filters.alpha.opacity = opacity ;
			else this.element.style.opacity = opacity/100 ;
			}
		if( toallchild )
			{
			var i ;
			for( i=0 ; i<this.childs.length ; i++ )
				{
				this.childs[i].setOpacity( opacity, toallchild ) ;
				}
			}
		},
	// Associe l'element du DOM ayant l'id elementid
	// Positionne l'objet DOM associe
	linkToDomElement: function()
		{
		this.element = document.getElementById( this.id ) ;
		if( this.element )
			{
			this.element.onmouseover = CmsNodeOnMouseOver ;
			this.element.onmouseout = CmsNodeOnMouseOut ;
			this.element.onmouseclick = CmsNodeOnClick ;
			this.element.onmousedblclick = CmsNodeOnDblClick ;
			}
		},
	setDomElementX: function( x )
		{
		if( this.element ) this.element.style.left = x ;
		},
	setDomElementY: function( y )
		{
		if( this.element ) this.element.style.top = y ;
		},
	// Fixe la profondeur de l'objet DOM associe
	setDomElementZ: function( z )
		{
		// Deplace l'element DOM associe
		if( this.element )
			{
			this.element.style.zIndex = z ;
			}
		},
	// Positionne l'objet DOM associe
	moveTo: function( x, y )
		{
		this.x = x ;
		this.y = y ;
		this.moveDOM() ;
		},
	// Translate la position de tous les elements du noeud et de ses fils
	translate: function( vx, vy )
		{
		this.x += vx ;
		this.y += vy ;
		this.moveDOM() ;
		},
	// effectue le positionnement l'objet DOM associe et des noeuds fils
	moveDOM: function()
		{
		// Deplace l'element DOM associe
		if( this.element )
			{
			var ax = this.getAbsoluteX() ;
			var ay = this.getAbsoluteY() ;

			this.element.style.left = ax ;
			this.element.style.top = ay ;
			}
		},
	// Calcule et renvoie la position absolue du noeud
	getAbsoluteX: function()
		{
		var x = this.x ;
		var parent = this.parent ;
		while( parent )
			{
			x += parent.x ;
			parent = parent.parent ;
			}
		return x ;
		},
	// Calcule et renvoie la position absolue du noeud
	getAbsoluteY: function()
		{
		var y = this.y ;
		var parent = this.parent ;
		while( parent )
			{
			y += parent.y ;
			parent = parent.parent ;
			}
		return y ;
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
		var b = 0 ;
		if( this.element ) b =	this.element.offsetTop + this.element.offsetHeight ;

		var i ;
		for( i=0 ; i<this.childs.length ; i++ )
			{
			var bb = this.childs[i].getBottom() ;
			if( bb > b ) b = bb ;
			}
		return b ;
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
	// Commence une modification graphique
	beginGraphicUpdate: function()
		{
		this.setDomElementZ( 200 ) ;
		this.b_position = new Bougeur( this.x, this.y, 0, 3000, 0, 3000, this ) ;
		},
	// Termine une modification graphique
	endGraphicUpdate: function()
		{
		},
	// Gere les actions du bougeur
	onBougeurEvent: function( bougeur, event )
		{
		if( bougeur == this.b_position )
			{
			this.setDomElementX( bougeur.x ) ;
			this.setDomElementY( bougeur.y ) ;
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
	// Gestion de l'evenement onTimeout
	onTimeout: function( time )
		{
		var i ;
		// Declenche les actions associees au noeud
		for( i=0 ; i<this.ontimeout.length ; i++ )
			{
			this.ontimeout[i].onTimeout( time, this ) ;
			}
		// Propage l'evenement aux noeud fils
		for( i=0 ; i<this.childs.length ; i++ )
			{
			this.childs[i].onTimeout( time ) ;
			}
		},
	// Gestion de l'evenement onOpen
	onOpen: function()
		{
		var i ;
		// Declenche les actions associees au noeud
		for( i=0 ; i<this.onopen.length ; i++ )
			{
			this.onopen[i].onOpen( this ) ;
			}
		// Propage l'evenement aux noeud fils
		for( i=0 ; i<this.childs.length ; i++ )
			{
			this.childs[i].onOpen() ;
			}
		},
	// Gestion de l'evenement onClose
	onClose: function()
		{
		var i ;
		for( i=0 ; i<this.onclose.length ; i++ )
			{
			this.onclose[i].onClose( this ) ;
			}
		// Propage l'evenement aux noeud fils
		for( i=0 ; i<this.childs.length ; i++ )
			{
			this.childs[i].onClose() ;
			}
		},
	// Gestion de l'evenement onmouseover
	onMouseOver: function()
		{
		if( this.admin ) return ;

		var i ;
		for( i=0 ; i<this.onmouseover.length ; i++ )
			{
			this.onmouseover[i].onMouseOver( this ) ;
			}
		},
	// Gestion de l'evenement onmouseout
	onMouseOut: function()
		{
		if( this.admin ) return ;

		var i ;
		for( i=0 ; i<this.onmouseout.length ; i++ )
			{
			this.onmouseout[i].onMouseOut( this ) ;
			}
		},
	// Gestion de l'evenement onclick
	onClick: function( evt )
		{
		var i ;
		if( !evt ) evt = window.event ;

		//if( this.admin )
		//	{
		//	alert( evt ) ;
		//	}
		//else
		//	{
			for( i=0 ; i<this.onclick.length ; i++ )
				{
				this.onclick[i].onClick( this ) ;
				}
		//	}
		},
	// Gestion de l'evenement ondblclick
	onDblClick: function()
		{
		var i ;
		for( i=0 ; i<this.ondblclick.length ; i++ )
			{
			this.ondblclick[i].onDblClick( this ) ;
			}
		}
	};

// Recherche d'un noeud par son iddb
function CmsNodeFindByIdDB( iddb )
{
	var i ;
	for( i=0 ; i<cmsnodes.length ; i++ )
		{
		if( iddb == cmsnodes[i].iddb ) return cmsnodes[i] ;
		}
	return null ;
}

// Recherche d'un noeud par son iddb
function CmsNodeBeginGraphicUpdateByIddb( iddb )
{
	var node = CmsNodeFindByIdDB( iddb ) ;
	if( node ) node.beginGraphicUpdate() ;
}

function CmsNodeOnDblClick()
{
	cmsnodes[this.id].onDblClick() ;
}

function CmsNodeOnClick()
{
	cmsnodes[this.id].onClick() ;
}

function CmsNodeOnMouseOver()
{
	cmsnodes[this.id].onMouseOver() ;
}

function CmsNodeOnMouseOut()
{
	cmsnodes[this.id].onMouseOut() ;
}

function CmsNodeOnClick()
{
	cmsnodes[this.id].onDblClick() ;
}

function CmsNodeOnTimeout( time )
{
	if( !( time % 50 ) )
		{
		//AjaxSendForExecute( "") ;
		}
}
