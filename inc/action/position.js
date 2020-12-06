//alert( "load position.js" ) ;

// Donne une position absolue a un element par rapport aux coordonnes du noeud pere de niveau level
// Si level == 0 alors la position est donnee en absolue

function Position( id, x, y, z, actif_event )
	{
	this.id = id ;
	this.node = null ;
	this.x = x ;
	this.y = y ;
	this.z = z ;
	this.actif_event = actif_event ;
	this.categorie = "action" ;
	}

Position.prototype =
	{
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
	get_z: function()
		{
		return this.z ;
		},
	set_z: function( value, save )
		{
		this.z = value ;
		if( save ) saveActionProperty( this.id, "z", this.z ) ;
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
	// Activation sur l'evenement onOpen
	setActif: function()
		{
		this.actif = true ;
		},
	// Calcule la position et effectue le mouvement
	moveNode: function()
		{
		this.node.moveTo( this.x, this.y ) ;
		this.node.setZ( this.z ) ;
		},
	// Gestion du timeout
	onTimeout: function( time, node )
		{
		this.moveNode() ;
		return true ;
		},
	// Evenement onOpen:
	onOpen: function( node )
		{
		this.moveNode() ;
		},
	// Evenement onClose:
	onClose: function( node )
		{
		this.moveNode() ;
		},
	// Evenement onClose:
	onResize: function( node )
		{
		this.moveNode() ;
		},
	// Evenement onmouseover:
	onMouseOver: function( node )
		{
		this.moveNode() ;
		},
	// Evenement onmouseover:
	onMouseOut: function( node )
		{
		this.moveNode() ;
		},
	// Recupere le focus d'un tree node
	startCfg: function( treeview, treenode )
		{
		var ax = this.node.getAbsoluteX() ;
		var ay = this.node.getAbsoluteY() ;
		this.b_position = new Bougeur( ax, ay, 0, 2000, 0, 2000, "inc/image/b_move_hv.bmp", this ) ;
		},
	// Recupere le focus d'un tree node
	stopCfg: function( treeview, treenode )
		{
		if( this.b_position )
			{
			this.b_position.remove() ;
			this.b_position = null ;
			}
		},
	// Gere les actions du bougeur
	onBougeurAction: function( bougeur, action )
		{
		if( bougeur == this.b_position )
			{
			var ax = this.node.getAbsoluteX() ;
			var ay = this.node.getAbsoluteY() ;
			this.x += bougeur.x - ax ;
			this.y += bougeur.y - ay ;
			this.moveNode() ;
			if( action == "move_end" )
				{
				saveActionProperty( this.id, "x", this.x, "y", this.y ) ;
				}
			}
		}
	};

