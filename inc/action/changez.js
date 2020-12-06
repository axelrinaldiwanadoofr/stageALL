
// Echange le z-index avec la valeur z au premier evenement
// et stock l'ancienne.
// Au deuxieme evenement restore l'ancienne valeur

function ChangeZ( id, z, actif_event )
	{
	this.id = id ;
	this.z = z ;
	this.actif_event = actif_event ;
	this.oldz = 0 ;
	this.actif = false ;
	this.categorie = "action" ;
	}

ChangeZ.prototype =
	{
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
	// Swap zindex
	swapZ: function( node )
		{
		if( node.element )
			{
			if( !this.actif )
				{
				this.oldz = node.element.style.zIndex ;
				node.element.style.zIndex = this.z ;
				this.actif = true ;
				}
			else
				{
				node.element.style.zIndex = this.oldz ;
				this.actif = false ;
				}
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
	onOpen: function( node )
		{
		swapZ( node ) ;
		},
	// Evenement onClose:
	// Activation si on_open = true
	onClose: function( node )
		{
		swapZ( node ) ;
		},
	// Evenement onmouseover:
	// Activation si on_mouseover = true
	onMouseOver: function( node )
		{
		swapZ( node ) ;
		},
	// Evenement onmouseover:
	// Activation si on_mouseover = true
	onMouseOut: function( node )
		{
		swapZ( node ) ;
		}
	};

