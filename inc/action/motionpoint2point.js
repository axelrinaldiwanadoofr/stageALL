
// Genere un mouvement uniformement accelere du point start
// au poind end.
// vstart est la vitesse de depart
// acc est l'accelaration
// Les arguments sont des instances de la classe Point2d
// L'objet est actif au depart et devient inactif
// quand la figure arrive a la position end.

function MotionPoint2Point( id, start_x, start_y, end_x, end_y, time, actif_event )
	{
	this.id = id ;
	this.x = start_x ;
	this.y = start_y ;
	this.start_x = start_x ;
	this.start_y = start_y ;
	this.end_x = end_x ;
	this.end_y = end_y ;
	this.time = time ;
	this.actif_event = actif_event ;
	this.categorie = "action" ;
	this.computeVelocity() ;
	this.itime = 0 ;
	this.actif = false ;
	}

MotionPoint2Point.prototype =
	{
	get_start_x: function()
		{
		return this.start_x ;
		},
	set_start_x: function( value, save )
		{
		this.start_x = value ;
		this.computeVelocity() ;
		if( save ) saveActionProperty( this.id, "start_x", this.start_x ) ;
		return true ;
		},
	get_start_y: function()
		{
		return this.start_y ;
		},
	set_start_y: function( value, save )
		{
		this.start_y = value ;
		this.computeVelocity() ;
		if( save ) saveActionProperty( this.id, "start_y", this.start_y ) ;
		return true ;
		},
	get_end_x: function()
		{
		return this.end_x ;
		},
	set_end_x: function( value, save )
		{
		this.end_x = value ;
		this.computeVelocity() ;
		if( save ) saveActionProperty( this.id, "end_x", this.end_x ) ;
		return true ;
		},
	get_end_y: function()
		{
		return this.end_y ;
		},
	set_end_y: function( value, save )
		{
		this.end_y = value ;
		this.computeVelocity() ;
		if( save ) saveActionProperty( this.id, "end_y", this.end_y ) ;
		return true ;
		},
	get_time: function()
		{
		return this.time * 10 ;
		},
	set_time: function( value, save )
		{
		this.time = value/10 ;
		this.computeVelocity() ;
		if( save ) saveActionProperty( this.id, "time", this.time ) ;
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
	// Activation
	setActif: function()
		{
		this.x = this.start_x ;
		this.y = this.start_y ;
		this.itime = 0 ;
		this.actif = true ;
		},
	// Activation
	computeVelocity: function()
		{
		var dx = this.end_x - this.start_x ;
		var dy = this.end_y - this.start_y ;
		this.vx = dx / this.time ;
		this.vy = dy / this.time ;
		},
	// Demarre une session de configuration
	startCfg: function( treenode )
		{
		var ax = this.node.getAbsoluteX() ;
		var ay = this.node.getAbsoluteY() ;
		this.b_start = new Bougeur( ax+this.start_x, ay+this.start_y, 0, 2000, 0, 2000, "inc/image/b_move_hv_start.bmp", this ) ;
		this.b_end = new Bougeur( ax+this.end_x, ay+this.end_y, 0, 2000, 0, 2000, "inc/image/b_move_hv_end.bmp", this ) ;
		},
	// Arrete la session de configuration
	stopCfg: function( treenode )
		{
		if( this.b_start )
			{
			this.b_start.remove() ;
			this.b_start = null ;
			}
		if( this.b_end )
			{
			this.b_end.remove() ;
			this.b_end = null ;
			}
		},
	// Gere les actions du bougeur
	onBougeurAction: function( bougeur, action )
		{
		if( bougeur == this.b_start )
			{
			var ax = this.node.getAbsoluteX() ;
			var ay = this.node.getAbsoluteY() ;
			this.start_x = bougeur.x - ax ;
			this.start_y = bougeur.y - ay ;
			this.computeVelocity() ;
			if( action == "move_end" )
				{
				saveActionProperty( this.id, "start_x", this.start_x, "start_y", this.start_y ) ;
				}
			}
		if( bougeur == this.b_end )
			{
			var ax = this.node.getAbsoluteX() ;
			var ay = this.node.getAbsoluteY() ;
			this.end_x = bougeur.x - ax ;
			this.end_y = bougeur.y - ay ;
			this.computeVelocity() ;
			if( action == "move_end" )
				{
				saveActionProperty( this.id, "end_x", this.end_x, "end_y", this.end_y ) ;
				}
			}
		},
	// Activation si on_open = true
	// Gestion du timeout
	// Gere le deplacement
	onTimeout: function( time, node )
		{
		if( this.actif )
			{
			opacityok = false ;
			node.moveTo( this.x, this.y ) ;

			this.x += this.vx ;
			this.y += this.vy ;
			this.itime++ ;

			if( this.itime >= this.time )
				{
				this.x = this.end_x ;
				this.y = this.end_y ;
				this.actif = false ;
				opacityok = true ;
				node.moveTo( this.x, this.y ) ;
				return true ;
				}
			return false ;
			}
		},
	// Evenement onOpen:
	onOpen: function( node )
		{
		this.setActif() ;
		},
	// Evenement onClose:
	onClose: function( node )
		{
		this.setActif() ;
		},
	// Evenement onClose:
	onMouseOver: function( node )
		{
		this.setActif() ;
		},
	// Evenement onClose:
	onMouseOut: function( node )
		{
		this.setActif() ;
		}
	};

