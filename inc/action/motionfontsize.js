
// Changement progressif de taille de police de caractere et de pronfondeur

function MotionFontSize( id, start_size, start_z, end_size, end_z, time, event_actif )
	{
	this.categorie = "action" ;
	this.id = id ;
	this.start_size = start_size ;
	this.start_z = start_z ;
	this.size = start_size ;
	this.end_size = end_size ;
	this.end_z = end_z ;
	this.time = time ;
	this.event_actif = event_actif ;
	this.computeVsize() ;
	this.actif = false ;
	}

MotionFontSize.prototype =
	{
	get_start_size: function()
		{
		return this.start_size ;
		},
	set_start_size: function( value, save )
		{
		if( value >= 0 )
			{
			this.start_size = value ;
			this.computeVsize() ;
			if( save ) saveActionProperty( this.id, "start_size", this.start_size ) ;
			return true ;
			}
		else
			{
			alert( "La taille doit etre positive" ) ;
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
	get_end_size: function()
		{
		return this.end_size ;
		},
	set_end_size: function( value, save )
		{
		if( value >= 0 )
			{
			this.end_size = value ;
			this.computeVsize() ;
			if( save ) saveActionProperty( this.id, "end_size", this.end_size ) ;
			return true ;
			}
		else
			{
			alert( "La taille doit etre positive" ) ;
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
		this.computeVsize() ;
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
		this.size = this.start_size ;
		this.actif = true ;
		},
	// Activation sur l'evenement onOpen
	computeVsize: function()
		{
		var n = (this.time / 10) + 1 ; // Nombre de 1/100 secondes
		this.v_size = (this.end_size - this.start_size)/n ;
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
			node.element.style.fontSize = this.size ;
			node.setZ( this.start_z ) ;

			this.size += this.v_size ;

			if( this.v_size >= 0 && this.size > this.end_size ||
					this.v_size < 0 && this.size < this.end_size )
				{
				this.size = this.end_size ;
				this.actif = false ;
				opacityok = true ;
				node.element.style.fontSize = this.size ;
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

