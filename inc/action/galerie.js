
// Genere une galerie sur les noeuds fils du noeud cible

function Galerie( id, x, y, width, height, marge, countvisible, timepause, xview, yview, widthview, heightview, actif_event )
	{
	this.id = id ;
	this.node = null ;
	this.x = x ;
	this.y = y ;
	this.width = width ;
	this.height = height ;
	this.countvisible = countvisible ;
	this.marge = marge ;
	this.timepause = timepause ;
	this.xview = xview ;
	this.yview = yview ;
	this.widthview = widthview ;
	this.heightview = heightview ;
	this.actif_event = actif_event ;
	this.initialised = false ;
	this.icurrentchild = 0 ;
	this.time = 0 ;
	this.vdefilement = 0 ;
	this.image = document.createElement( "IMG" ) ;
	this.image.style.display = "none" ;
	this.image.style.position = "absolute" ;
	var root = document.getElementById( "root" ) ;
	root.appendChild( this.image ) ;
	this.actif = false ;
	}

Galerie.prototype =
	{
	get_width: function()
		{
		return this.width ;
		},
	set_width: function( value, save )
		{
		if( value >= 0 )
			{
			this.width = value ;
			if( save ) saveActionProperty( this.id, "width", this.width ) ;
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
		return this.height ;
		},
	set_height: function( value, save )
		{
		if( value >= 0 )
			{
			this.height = value ;
			if( save ) saveActionProperty( this.id, "height", this.height ) ;
			return true ;
			}
		else
			{
			alert( "La hauteur doit etre positive" ) ;
			return false ;
			}
		},
	get_x: function()
		{
		return this.x ;
		},
	set_x: function( value, save )
		{
		this.x = value ;
		if( save ) saveActionProperty( this.id, "x", this.x ) ;
		return true ;
		},
	get_y: function()
		{
		return this.y ;
		},
	set_y: function( value, save )
		{
		this.y = value ;
		if( save ) saveActionProperty( this.id, "y", this.y ) ;
		return true ;
		},
	get_timepause: function()
		{
		return this.timepause ;
		},
	set_timepause: function( value, save )
		{
		this.timepause = value ;
		if( save ) saveActionProperty( this.id, "timepause", this.timepause ) ;
		return true ;
		},
	get_countvisible: function()
		{
		return this.countvisible ;
		},
	set_countvisible: function( value, save )
		{
		this.countvisible = value ;
		if( save ) saveActionProperty( this.id, "countvisible", this.countvisible ) ;
		return true ;
		},
	get_marge: function()
		{
		return this.marge ;
		},
	set_marge: function( value, save )
		{
		this.marge = value ;
		if( save ) saveActionProperty( this.id, "marge", this.marge ) ;
		return true ;
		},
	get_widthview: function()
		{
		return this.widthview ;
		},
	set_widthview: function( value, save )
		{
		if( value >= 0 )
			{
			this.widthview = value ;
			if( save ) saveActionProperty( this.id, "widthview", this.widthview ) ;
			return true ;
			}
		else
			{
			alert( "La largeur doit etre positive" ) ;
			return false ;
			}
		},
	get_heightview: function()
		{
		return this.heightview ;
		},
	set_heightview: function( value, save )
		{
		if( value >= 0 )
			{
			this.heightview = value ;
			if( save ) saveActionProperty( this.id, "heightview", this.heightview ) ;
			return true ;
			}
		else
			{
			alert( "La hauteur doit etre positive" ) ;
			return false ;
			}
		},
	get_xview: function()
		{
		return this.xview ;
		},
	set_xview: function( value, save )
		{
		this.xview = value ;
		if( save ) saveActionProperty( this.id, "xview", this.xview ) ;
		return true ;
		},
	get_yview: function()
		{
		return this.yview ;
		},
	set_yview: function( value, save )
		{
		this.yview = value ;
		if( save ) saveActionProperty( this.id, "yview", this.yview ) ;
		return true ;
		},
	get_actif: function()
		{
		return this.actif_event ;
		},
	set_actif: function( value, save )
		{
		this.actif_event = value ;
		if( save ) saveActionProperty( this.id, "actif", this.actif_event ) ;
		return true ;
		},
	// Initialise les elements de la galerie
	init: function()
		{
		var i ;
		if( !this.initialised )
			{
			// Ajoute la gestion de l'evenement onMouseOver
			for( i=0 ; i< this.node.childs.length ; i++ )
				{
				var c = this.node.childs[i] ;
				c.onmouseover.push( this ) ;
				}
			this.initialised = true ;
			}
		// Positionne la grande image
		if( this.widthview && this.heightview )
			{
			this.image.style.width = this.widthview ;
			this.image.style.height = this.heightview ;
			this.image.style.left = this.xview + this.node.getAbsoluteX() ;
			this.image.style.top = this.yview + this.node.getAbsoluteY() ;
			this.image.style.zIndex = 50 ;
			this.image.style.display = "block" ;
			if( this.node.childs[this.icurrentchild].element.src )
				this.image.src = this.node.childs[this.icurrentchild].element.src ;
			}
		},
	// Affiche les countvisibles premier noeud
	show: function()
		{
		var i ;
		var h = this.icurrentchild ;
		var n = this.node.childs.length ;
		// Cache tous les fils
		for( i=0 ; i<n && this.countvisible ; i++ )
			{
			var c = this.node.childs[i] ;
			c.element.style.display = "none" ;
			}
		// Affiche les countvisible fils
		for( i=0 ; i<this.countvisible && n ; i++ )
			{
			var c = this.node.childs[h] ;
			c.setZ( 50 ) ;
			c.moveTo( this.x+i*(this.width+this.marge), this.y ) ;
			c.resizeTo( this.width, this.height ) ;
			c.element.style.display = "block" ;
			h++ ;
			if( h >= n ) h = 0 ;
			}
		// Positionne la grande image
		if( this.widthview && this.heightview )
			{
			this.image.style.width = this.widthview ;
			this.image.style.height = this.heightview ;
			this.image.style.left = this.xview + this.node.getAbsoluteX() ;
			this.image.style.top = this.yview + this.node.getAbsoluteY() ;
			this.image.style.zIndex = 50 ;
			this.image.style.display = "block" ;
			if( this.node.childs[this.icurrentchild].element.src )
				this.image.src = this.node.childs[this.icurrentchild].element.src ;
			}
		},
	// Gestion du timeout
	// Gere l'enchainement en fondue
	onTimeout: function( time, node )
		{
		if( this.actif )
			{
			if( this.time >= this.timepause )
				{
				this.time = 0 ;
				this.icurrentchild++ ;
				if( this.icurrentchild >= this.node.childs.length ) this.icurrentchild = 0 ;
				this.show() ;
				}
			this.time++ ;
			}
		},
	// Evenement onOpen:
	onOpen: function( node )
		{
		this.init() ;
		this.show() ;
		this.actif = true ;
		},
	// Evenement onResize:
	onResize: function( node )
		{
		if( this.widthview && this.heightview )
			{
			this.image.style.left = this.xview + this.node.getAbsoluteX() ;
			this.image.style.top = this.yview + this.node.getAbsoluteY() ;
			}
		},
	// Evenement onMouseOver:
	onMouseOver: function( node )
		{
		var i = this.node.getChildIndex( node ) ;
		if( i > -1 )
			{
			this.image.style.left = this.xview + this.node.getAbsoluteX() ;
			this.image.style.top = this.yview + this.node.getAbsoluteY() ;
			this.image.style.zIndex = 50 ;
			if( this.node.childs[i].element.src )
				this.image.src = this.node.childs[i].element.src ;
			}
		},
	// Demarre une session de configuration
	startCfg: function( treenode )
		{
		},
	// Arrete la session de configuration
	stopCfg: function( treenode )
		{
		},
	// Activation si on_open = true
	// Recupere le focus d'un tree node
	getFocus: function( treenode )
		{
		this.b_position = new Bougeur( this.x, this.y, this ) ;
		this.b_resize = new Bougeur( this.x + this.width, this.y + this.height, this ) ;
		},
	// Recupere le focus d'un tree node
	lostFocus: function( treenode )
		{
		alert( "lostfocus" ) ;
		},
	// Gestion des actions des bougeurs
	onBougeurAction: function( bougeur, action )
		{
		if( this.b_position == bougeur )
			{
			this.x = bougeur.x ;
			this.y = bougeur.y ;
			this.b_resize.moveTo( this.x + this.width, this.y + this.height ) ;
			}
		if( this.b_resize == bougeur )
			{
			this.width = bougeur.x - this.x ;
			this.height = bougeur.y - this.y ;
			}
		}
	};

