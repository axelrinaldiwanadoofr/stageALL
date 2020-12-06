alert( "load motionresize.js" ) ;

// Genere un mouvement uniformement accelere du point start
// au poind end.
// vstart est la vitesse de depart
// acc est l'accelaration
// Les arguments sont des instances de la classe Point2d
// L'objet est actif au depart et devient inactif
// quand la figure arrive a la position end.

function MotionResize( start_width, start_height, end_width, end_height, v_width, v_height )
	{
	this.start_width = start_width ;
	this.start_height = start_height ;
	this.width = start_width ;
	this.height = start_height ;
	this.end_width = end_width ;
	this.end_height = end_height ;
	this.v_width = v_width ;
	this.v_height = v_height ;
	this.actif = false ;
	}

MotionResize.prototype =
	{
	// Activation sur l'evenement onOpen
	setActif: function()
		{
		this.actif = true ;
		},
	// Gestion du timeout
	// Gere le changement de taille
	onTimeout: function( time, node )
		{
		if( this.actif )
			{
			node.resizeTo( this.width, this.height ) ;

			this.width += this.v_width ;
			this.height += this.v_height ;

			if( this.v_width >= 0 && this.width >= this.end_width ||
					this.v_width < 0 && this.width <= this.end_width ||
					this.v_height >= 0 && this.height >= this.end_height ||
					this.v_height < 0 && this.height <= this.end_height )
				{
				this.width = this.end_width ;
				this.height = this.end_height ;
				this.actif = false ;
				node.resizeTo( this.width, this.width ) ;
				}
			}
		},
	// Evenement onOpen:
	// Activation si on_open = true
	onOpen: function( node )
		{
		this.width = this.start_width ;
		this.height = this.start_height ;
		this.actif = true ;
		},
	// Evenement onClose:
	// Activation si on_open = true
	onClose: function( node )
		{
		this.width = this.start_width ;
		this.height = this.start_height ;
		this.actif = true ;
		},
	// Evenement onmouseover:
	// Activation si on_mouseover = true
	onMouseOver: function( node )
		{
		this.width = this.start_width ;
		this.height = this.start_height ;
		this.actif = true ;
		},
	// Evenement onmouseover:
	// Activation si on_mouseover = true
	onMouseOut: function( node )
		{
		this.width = this.start_width ;
		this.height = this.start_height ;
		this.actif = true ;
		}
	};

