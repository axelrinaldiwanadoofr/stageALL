//Classe de gestion des noeuds

var nodes = new Array ; // Tableau de tous les noeuds

function Node( id, iddb, parent, visible, opacity, x, y, z, admin )
	{
	this.id = id ;
	this.iddb = iddb ;
	this.visible = visible ;
	this.opacity = opacity ;
	this.x = x ;
	this.y = y ;
	this.parent = parent ;
	this.admin = admin ;
	this.element = null ;
	this.childs = [] ;
	this.categorie = "node" ;

	if( parent ) parent.addChild( this ) ;

	// Cree les tableaux regrougant les actions associe
	this.onopen = [] ;
	this.onclose = [] ;
	this.ontimeout = [] ;
	this.onclick = [] ;
	this.onmouseover = [] ;
	this.onmouseout = [] ;
	this.ondblclick = [] ;
	this.onresize = [] ;
	this.onsignal = [] ;
	}

Node.prototype =
	{
	get_width: function()
		{
		if( this.element ) return this.element.offsetWidth ;
		else return 0 ;
		},
	set_width: function( value, save )
		{
		if( value >= 0 )
			{
			if( this.element ) this.element.style.width = value ;
			if( save ) saveNodeProperty( this.id, "width", value ) ;
			return true ;
			}
		else
			{
			alert( "La largeur doit etre positive" ) ;
			return false ;
			}
		},
	get_height: function()
		{
		if( this.element ) return this.element.offsetHeight ;
		else return 0 ;
		},
	set_height: function( value, save )
		{
		if( value >= 0 )
			{
			if( this.element ) this.element.style.height = value ;
			if( save ) saveNodeProperty( this.id, "height", value ) ;
			return true ;
			}
		else
			{
			alert( "La hauteur doit etre positive" ) ;
			return false ;
			}
		},
	get_visible: function()
		{
		if( this.element )
			{
			if( this.element.currentStyle.display == "none" ) return 0 ;
			else return 1 ;
			}
		else return 0 ;
		},
	set_visible: function( value, save )
		{
		if( value == 0 || value == 1 )
			{
			this.visible = value ;
			if( this.element )
				{
				if( value ) this.element.style.display = "block" ;
				else this.element.style.display = "none" ;
				}
			if( save ) saveNodeProperty( this.id, "visible", value ) ;
			return true ;
			}
		else
			{
			alert( "Utiliser 1 pour visible et 0 pour non visible" ) ;
			return false ;
			}
		},
	get_opacity: function()
		{
		if( this.element )
			{
			return getOpacity( this.element.id ) ;
			}
		else return 0 ;
		},
	set_opacity: function( value, save )
		{
		if( value >= 0 && value <= 100 )
			{
			this.opacity = value ;
			if( this.element ) setOpacity( this.element.id, value ) ;
			if( save ) saveNodeProperty( this.id, "opacity", value ) ;
			return true ;
			}
		else
			{
			alert( "L'opacite doit etre comprise entre 0 et 100" ) ;
			return false ;
			}
		},
	get_titre: function()
		{
		if( this.titre ) return this.titre ;
		else return "" ;
		},
	set_titre: function( value, save )
		{
		this.titre = value ;
		if( save ) saveNodeProperty( this.id, "titre", value ) ;
		return true ;
		},
	get_image: function()
		{
		if( this.element )
			{
			return this.element.src ;
			}
		else return "" ;
		},
	set_image: function( value, save )
		{
		if( this.element )
			{
			this.element.src = value ;
			if( save ) saveNodeProperty( this.id, "image", value ) ;
			return true ;
			}
		return false ;
		},
	get_module: function()
		{
		if( this.module ) return this.module ;
		else return "" ;
		},
	set_module: function( value, save )
		{
		this.module = value ;
		if( save ) saveNodeProperty( this.id, "module", value ) ;
		return true ;
		},
	get_argument: function()
		{
		if( this.argument ) return this.argument ;
		else return "" ;
		},
	set_argument: function( value, save )
		{
		this.arguement = value ;
		if( save ) saveNodeProperty( this.id, "argument", value ) ;
		return true ;
		},
	// Associe l'element du DOM ayant l'id elementid
	// Positionne l'objet DOM associe
	linkToDOMElement: function()
		{
		this.element = document.getElementById( this.id ) ;
		if( this.element )
			{
			this.element.onmouseover = NodeOnMouseOver ;
			this.element.onmouseout = NodeOnMouseOut ;
			this.element.onmouseclick = NodeOnClick ;
			this.element.onmousedblclick = NodeOnDblClick ;

			this.element.style.left = this.x ;
			this.element.style.top = this.y ;
			}
		},
	// Met a jour l'opacite de l'element associe au noeud et des noeud fils
	setOpacity: function( opacity, allchild )
		{
		if( this.element )
			{
			if( isIE ) this.element.filters.alpha.opacity = opacity ;
			else this.element.style.opacity = opacity/100 ;
			}

		if( allchild )
			{
			var i ;
			for( i=0 ; i<this.childs.length ; i++ )
				{
				this.childs[i].setOpacity( opacity, allchild ) ;
				}
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

			if( this.b_size )
				{
				var xs = ax + this.element.offsetWidth ;
				var ys = ay + this.element.offsetHeight ;
				this.b_size.moveTo( xs, ys ) ;
				}

			if( this.b_uploader )
				{
				var xs = ax + this.element.offsetWidth/2 ;
				var ys = ay + this.element.offsetHeight/2 ;
				this.b_uploader.moveTo( xs, ys ) ;
				}
			if( this.b_texteditor )
				{
				var xs = ax + this.element.offsetWidth/2 ;
				var ys = ay + this.element.offsetHeight/2 ;
				this.b_texteditor.moveTo( xs, ys ) ;
				}
			}
		var i ;
		for( i=0 ; i<this.childs.length ; i++ )
			{
			this.childs[i].moveDOM() ;
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
	getLeft: function()
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
	getRight: function()
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
	getTop: function()
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
	getBottom: function()
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
	// Fixe la profondeur de l'objet DOM associe
	setZ: function( z )
		{
		// Deplace l'element DOM associe
		if( this.element )
			{
			this.element.style.zIndex = z ;
			}
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
	// Ajoute des Dom fils
	addChild: function( node )
		{
		this.childs.push( node ) ;
		},
	startCfg: function( treeview, treenode )
		{
		var i ;
		var ax = this.getAbsoluteX() ;
		var ay = this.getAbsoluteY() ;

		if( this.element )
			{
			var xs = ax + this.element.offsetWidth ;
			var ys = ay + this.element.offsetHeight ;
			this.oldz = this.element.style.zIndex ;
			this.element.style.zIndex = 90 ;
			this.b_size = new Bougeur( xs, ys, ax, 2000, ay, 2000, "inc/image/b_size_hv.bmp", this ) ;
			if( this.element.tagName == "IMG" )
				{
				xs = ax + this.element.offsetWidth/2 ;
				ys = ay + this.element.offsetHeight/2 ;
				this.b_uploader = new UpLoader( xs, ys, "nodepropertysetandupload.php5", "inc/image/b_uploader.bmp", this, "image" ) ;
				}
			if( this.element.tagName == "SPAN" )
				{
				xs = ax + this.element.offsetWidth/2 ;
				ys = ay + this.element.offsetHeight/2 ;
				this.b_texteditor = new TextEditor( xs, ys, "nodepropertysettextedit.php5", "inc/image/b_texteditor.bmp", this, "texte", this.element.innerHTML ) ;
				}
			}
		// Propage aux actions
		for( i=0 ; i<this.onopen.length ; i++ )
			{
			this.onopen[i].startCfg( treeview, treenode ) ;
			}
		},
	// Recupere le focus d'un tree node
	stopCfg: function( treenode, treenode )
		{
		var i ;

		if( this.element ) this.element.style.zIndex = this.oldz ;

		if( this.b_size )
			{
			this.b_size.remove() ;
			this.b_size = null ;
			}
		if( this.b_uploader )
			{
			this.b_uploader.remove() ;
			this.b_uploader = null ;
			}
		if( this.b_texteditor )
			{
			this.b_texteditor.remove() ;
			this.b_texteditor = null ;
			}
		// Propage aux actions
		for( i=0 ; i<this.onopen.length ; i++ )
			{
			this.onopen[i].stopCfg( treeview, treenode ) ;
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
	// Gere les actions du bougeur
	onBougeurAction: function( bougeur, action )
		{
		if( bougeur == this.b_size )
			{
			var ax = this.getAbsoluteX() ;
			var ay = this.getAbsoluteY() ;
			var width = bougeur.x - ax ;
			var height = bougeur.y - ay ;
			this.resizeTo( width, height ) ;
			if( action == "move_end" )
				{
				saveNodeProperty( this.id, "width", width, "height", height ) ;
				}
			}
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

		// Fait apparaitre les elements DOM
		if( this.element )
			{
			if( this.visible ) this.element.style.display = "block" ;
			if( isIE )
				{
				if( this.element.filters.alpha.opacity == 0 )	this.element.filters.alpha.opacity = this.opacity ;
				}
			else
				{
				if( this.element.style.opacity == 0 )	this.element.style.opacity = this.opacity/100 ;
				}
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
	// Gestion de l'evenement onresize
	onResize: function()
		{
		var i ;
		for( i=0 ; i<this.onresize.length ; i++ )
			{
			this.onresize[i].onResize( this ) ;
			}
		// Propage l'evenement aux noeud fils
		for( i=0 ; i<this.childs.length ; i++ )
			{
			this.childs[i].onResize() ;
			}
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

function NodeOnDblClick()
{
	nodes[this.id].onDblClick() ;
}

function NodeOnClick()
{
	nodes[this.id].onClick() ;
}

function NodeOnMouseOver()
{
	nodes[this.id].onMouseOver() ;
}

function NodeOnMouseOut()
{
	nodes[this.id].onMouseOut() ;
}

function NodeOnClick()
{
	nodes[this.id].onDblClick() ;
}
