// Changement progressif d'opacite

function MotionOpacity( id, start_opacity, end_opacity, v_opacity, allchild, actif_event )
	{
	this.id = id ;
	this.start_opacity = start_opacity ;
	this.opacity = start_opacity ;
	this.end_opacity = end_opacity ;
	this.v_opacity = v_opacity ;
	this.allchild = allchild ;
	this.actif_event = actif_event ;
	this.actif = false ;
	}

MotionOpacity.prototype =
	{
	setActif: function()
		{
		this.opacity = this.start_opacity ;
		this.actif = true ;
		},
	get_start_opacity: function()
		{
		return this.start_opacity ;
		},
	set_start_opacity: function( value, save )
		{
		this.start_opacity = value ;
		if( save ) saveActionProperty( this.id, "start_opacity", this.start_opacity ) ;
		return true ;
		},
	get_end_opacity: function()
		{
		return this.end_opacity ;
		},
	set_end_opacity: function( value, save )
		{
		this.end_opacity = value ;
		if( save ) saveActionProperty( this.id, "end_opacity", this.end_opacity ) ;
		return true ;
		},
	get_v_opacity: function()
		{
		return this.v_opacity ;
		},
	set_v_opacity: function( value, save )
		{
		this.v_opacity = value ;
		if( save ) saveActionProperty( this.id, "v_opacity", this.v_opacity ) ;
		return true ;
		},
	get_allchild: function()
		{
		return this.allchild ;
		},
	set_allchild: function( value, save )
		{
		this.allchild = value ;
		if( save ) saveActionProperty( this.id, "allchild", this.allchild ) ;
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
			if( opacityok )	node.setOpacity( this.opacity, this.allchild ) ;
			this.opacity += this.v_opacity ;

			if( this.v_opacity > 0 && this.opacity >= this.end_opacity )
				{
				node.setOpacity( this.end_opacity, this.allchild ) ;
				this.actif = false ;
				return true ;
				}
			if( this.v_opacity < 0 && this.opacity <= this.end_opacity )
				{
				node.setOpacity( this.end_opacity, this.allchild ) ;
				this.actif = false ;
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

