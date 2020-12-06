// Temps de pause

function MotionPause( id, time_pause, actif_event )
	{
	this.id = id ;
	this.time_pause = time_pause ;
	this.actif_event = actif_event ;
	this.categorie = "action" ;
	this.time = 0 ;
	this.actif = false ;
	}

MotionPause.prototype =
	{
	get_time_pause: function()
		{
		return this.time_pause ;
		},
	set_time_pause: function( value, save )
		{
		this.time_pause = value ;
		if( save ) saveActionProperty( this.id, "time_pause", this.time_pause ) ;
		return true ;
		},
	setActif: function()
		{
		this.time = 0 ;
		this.actif = true ;
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
			if( this.time_pause <= this.time )
				{
				this.actif = false ;
				return true ;
				}
			this.time++ ;
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
	onClose: function( node )
		{
		this.setActif() ;
		},
	// Evenement onmouseover:
	onMouseOver: function( node )
		{
		this.setActif() ;
		},
	// Evenement onmouseover:
	onMouseOut: function( node )
		{
		this.setActif() ;
		}
	};

