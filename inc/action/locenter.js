
// Gestionnaire de position au centre (Layout)

function LoCenter( id, x, y )
	{
	this.id = id ;
	this.xcenter = 0 ;
	this.ycenter = 0 ;
	this.x = x ;
	this.y = y ;
	}

LoCenter.prototype =
	{
	get_x: function()
		{
		return this.x ;
		},
	set_x: function( value )
		{
		this.x = value ;
		},
	get_y: function()
		{
		return this.y ;
		},
	set_y: function( value )
		{
		this.y = value ;
		},
	// Activation sur l'evenement onOpen
	setActif: function()
		{
		},
	// Demarre une session de configuration
	startCfg: function( treenode )
		{
		var ax = this.node.getAbsoluteX() ;
		var ay = this.node.getAbsoluteY() ;
		this.b_position = new Bougeur( this.xcenter + this.x, this.ycenter + this.y, 0, 2000, 0, 2000, "inc/image/b_move_hv.bmp", this ) ;
		},
	// Arrete la session de configuration
	stopCfg: function( treenode )
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
			this.x = bougeur.x - this.xcenter ;
			this.y = bougeur.y - this.ycenter ;

			this.node.moveTo( this.xcenter + this.x, this.ycenter + this.y ) ;
			if( action == "move_end" )
				{
				saveActionProperty( this.id, "x", this.x, "y", this.y ) ;
				}
			}
		},
	// Activation si on_open = true
	// Activation sur l'evenement onOpen
	computeLocation: function( node )
		{
		var window_width ;
		var window_height ;

		// Calcule la taille de la fenetre
		if (window.innerWidth) window_width = window.innerWidth;
	 	else if (document.body && document.body.offsetWidth) window_width = document.body.offsetWidth;
 		else window_width = 0 ;

		if (window.innerHeight) window_height = window.innerHeight  ;
 		else if (document.body && document.body.offsetHeight) window_height = document.body.offsetHeight;
 		else window_height = 0 ;

 		this.xcenter = window_width / 2 ;
 		this.ycenter = window_height / 2 ;

		this.node.moveTo( this.xcenter + this.x, this.ycenter + this.y ) ;
		},
	// Gestion du timeout
	onTimeout: function( time, node )
		{
		this.computeLocation( node ) ;
		},
	// Evenement onOpen:
	onOpen: function( node )
		{
		this.computeLocation( node ) ;
		},
	// Evenement onClose:
	onClose: function( node )
		{
		this.computeLocation( node ) ;
		},
	// Evenement onmouseover:
	onMouseOver: function( node )
		{
		this.computeLocation( node ) ;
		},
	// Evenement onmouseover:
	onMouseOut: function( node )
		{
		this.computeLocation( node ) ;
		},
	// Evenement onresize
	onResize: function( node )
		{
		this.computeLocation( node ) ;
		}
	};

