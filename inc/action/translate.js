
// Translate un noeud et ses fils

function Translate( id, x, y, actif_event )
	{
	this.id = id ;
	this.x = x ;
	this.y = y ;
	this.actif_event = actif_event ;
	this.categorie = "action" ;
	}

Translate.prototype =
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
	onTimeout: function( time, node )
		{
		node.translate( this.x, this.y ) ;
		},
	// Evenement onOpen:
	onOpen: function( node )
		{
		node.translate( this.x, this.y ) ;
		},
	// Evenement onClose:
	onClose: function( node )
		{
		node.translate( this.x, this.y ) ;
		},
	// Evenement onmouseover:
	onMouseOver: function( node )
		{
		node.translate( this.x, this.y ) ;
		},
	// Evenement onmouseover:
	onMouseOut: function( node )
		{
		node.translate( this.x, this.y ) ;
		},
	// Evenement onresize:
	onResize: function( node )
		{
		node.translate( this.x, this.y ) ;
		}
	};

