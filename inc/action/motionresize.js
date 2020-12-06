
// Genere un mouvement uniformement accelere du point start
// au poind end.
// vstart est la vitesse de depart
// acc est l'accelaration
// Les arguments sont des instances de la classe Point2d
// L'objet est actif au depart et devient inactif
// quand la figure arrive a la position end.

function MotionResize( id, start_width, start_height, start_z, end_width, end_height, end_z, time, event_actif )
	{
	this.categorie = "action" ;
	this.id = id ;
	this.start_width = start_width ;
	this.start_height = start_height ;
	this.start_z = start_z ;
	this.width = start_width ;
	this.height = start_height ;
	this.end_width = end_width ;
	this.end_height = end_height ;
	this.end_z = end_z ;
	this.time = time ;
	this.event_actif = event_actif ;
	this.computeVwidthVheight() ;
	this.actif = false ;
	}

MotionResize.prototype =
	{
	get_start_width: function()
		{
		return this.start_width ;
		},
	set_start_width: function( value, save )
		{
		if( value >= 0 )
			{
			this.start_width = value ;
			this.computeVwidthVheight() ;
			if( save ) saveActionProperty( this.id, "start_width", this.start_width ) ;
			return true ;
			}
		else
			{
			alert( "La largeur doit etre positive" ) ;
			return false ;
			}
		},
	get_start_height: function()
		{
		return this.start_height ;
		},
	set_start_height: function( value, save )
		{
		if( value >= 0 )
			{
			this.start_height = value ;
			this.computeVwidthVheight() ;
			if( save ) saveActionProperty( this.id, "start_height", this.start_height ) ;
			return true ;
			}
		else
			{
			alert( "La hauteur doit etre positive" ) ;
			return false ;
			}
		},
	get_start_z: function()
		{
		return this.start_z ;
		},
	set_start_z: function( value, save )
		{
		this.start_z = value ;
		if( save ) saveActionProperty( this.id, "start_z", this.start_z ) ;
		return true ;
		},
	get_end_width: function()
		{
		return this.end_width ;
		},
	set_end_width: function( value, save )
		{
		if( value >= 0 )
			{
			this.end_width = value ;
			this.computeVwidthVheight() ;
			if( save ) saveActionProperty( this.id, "end_width", this.end_width ) ;
			return true ;
			}
		else
			{
			alert( "La largeur doit etre positive" ) ;
			return false ;
			}
		},
	get_end_height: function()
		{
		return this.end_height ;
		},
	set_end_height: function( value, save )
		{
		if( value >= 0 )
			{
			this.end_height = value ;
			this.computeVwidthVheight() ;
			if( save ) saveActionProperty( this.id, "end_height", this.end_height ) ;
			return true ;
			}
		else
			{
			alert( "La hauteur doit etre positive" ) ;
			return false ;
			}
		},
	get_end_z: function()
		{
		return this.end_z ;
		},
	set_end_z: function( value, save )
		{
		this.end_z = value ;
		if( save ) saveActionProperty( this.id, "end_z", this.end_z ) ;
		return true ;
		},
	get_time: function()
		{
		return this.time ;
		},
	set_time: function( value, save )
		{
		this.time = value ;
		this.computeVwidthVheight() ;
		if( save ) saveActionProperty( this.id, "time", this.time ) ;
		return true ;
		},
	get_actif: function()
		{
		return this.event_actif ;
		},
	set_actif: function( value, save )
		{
		this.event_actif = value ;
		if( save ) saveActionProperty( this.id, "actif", this.event_actif ) ;
		return true ;
		},
	// Activation sur l'evenement onOpen
	setActif: function()
		{
		this.width = this.start_width ;
		this.height = this.start_height ;
		this.actif = true ;
		},
	// Activation sur l'evenement onOpen
	computeVwidthVheight: function()
		{
		var n = (this.time / 10) + 1 ; // Nombre de 1/100 secondes
		this.v_width = (this.end_width - this.start_width)/n ;
		this.v_height = (this.end_height - this.start_height)/n ;
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
	// Gestion du timeout
	// Gere le changement de taille
	onTimeout: function( time, node )
		{
		if( this.actif )
			{
			opacityok = false ;
			node.resizeTo( this.width, this.height ) ;
			node.setZ( this.start_z ) ;

			this.width += this.v_width ;
			this.height += this.v_height ;

			if( this.v_width >= 0 && this.width > this.end_width ||
					this.v_width < 0 && this.width < this.end_width ||
					this.v_height >= 0 && this.height > this.end_height ||
					this.v_height < 0 && this.height < this.end_height )
				{
				this.width = this.end_width ;
				this.height = this.end_height ;
				this.actif = false ;
				opacityok = true ;
				node.resizeTo( this.width, this.height ) ;
				node.setZ( this.end_z ) ;
				return true ;
				}
			return false ;
			}
		},
	// Evenement onOpen:
	// Activation si on_open = true
	onOpen: function( node )
		{
		this.setActif() ;
		},
	// Evenement onClose:
	// Activation si on_open = true
	onClose: function( node )
		{
		this.setActif() ;
		},
	// Evenement onmouseover:
	// Activation si on_mouseover = true
	onMouseOver: function( node )
		{
		this.setActif() ;
		},
	// Evenement onmouseover:
	// Activation si on_mouseover = true
	onMouseOut: function( node )
		{
		this.setActif() ;
		}
	};

