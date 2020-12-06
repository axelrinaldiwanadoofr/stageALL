// Donne une taille absolue a un element

function Size( id, width, height, actif_event )
	{
	this.id = id ;
	this.width = width ;
	this.height = height ;
	this.actif_event = actif_event ;
	this.categorie = "action" ;
	}

Size.prototype =
	{
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
	// Activation sur l'evenement onOpen
	setActif: function()
		{
		this.actif = true ;
		},
	// Demarre une session de configuration
	startCfg: function( treenode )
		{
		this.b_size = new Bougeur( this.node.x+this.width, this.node.y+this.height, this.node.x, 2000, this.node.y, 2000, "inc/image/b_size_hv.bmp", this ) ;
		},
	// Arrete la session de configuration
	stopCfg: function( treenode )
		{
		},
	// Gere les actions du bougeur
	onBougeurAction: function( bougeur, action )
		{
		if( bougeur == this.b_size )
			{
			this.width = bougeur.x - this.node.x ;
			this.height = bougeur.y - this.node.y ;
			}
		},
	// Activation si on_open = true
	// Gestion du timeout
	onTimeout: function( time, node )
		{
		node.resizeTo( this.width, this.height ) ;
		return true ;
		},
	// Evenement onOpen:
	onOpen: function( node )
		{
		node.resizeTo( this.width, this.height ) ;
		},
	// Evenement onClose:
	onClose: function( node )
		{
		node.resizeTo( this.width, this.height ) ;
		},
	// Evenement onmouseover:
	onMouseOver: function( node )
		{
		node.resizeTo( this.width, this.height ) ;
		},
	// Evenement onmouseover:
	onMouseOut: function( node )
		{
		node.resizeTo( this.width, this.height ) ;
		}
	};

