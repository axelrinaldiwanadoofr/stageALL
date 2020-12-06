// Gestion d'une sequence d'action

function Sequence( id, flag, vflag, actif_event, valid )
	{
	this.id = id ;
	this.flag = flag ;
	this.vflag = vflag ;
	this.actif_event = actif_event ;
	this.valid = valid ;
	this.categorie = "action" ;
	this.actions = [] ;
	this.index = 0 ;
	this.actif = false ;
	}

Sequence.prototype =
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
	get_flag: function()
		{
		return this.flag ;
		},
	set_flag: function( value, save )
		{
		this.flag = value ;
		if( save ) saveActionProperty( this.id, "flag", this.flag ) ;
		return true ;
		},
	get_vflag: function()
		{
		return this.vflag ;
		},
	set_vflag: function( value, save )
		{
		this.vflag = value ;
		if( save ) saveActionProperty( this.id, "vflag", this.vflag ) ;
		return true ;
		},
	// Ajoute une action a la sequence
	add: function( action )
		{
		this.actions.push( action ) ;
		},
	// Retourne true si la sequence est cours d'execution
	getActif: function()
		{
		return this.actif ;
		},
	// Lance l'execution de la sequence
	setActif: function()
		{
		if( this.valid )
			{
			this.actif = true ;
			this.index = 0 ;
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
	// Gestion du timeout
	// Gere le changement de taille
	onTimeout: function( time, node )
		{
		if( this.actif )
			{
			if( this.index < this.actions.length )
				{
				var a = this.actions[this.index] ;
				if( !a.actif ) a.setActif() ;
				if( a.onTimeout( time, node ) )	this.index++ ;
				return false ;
				}
			this.actif = false ;
			return true ;
			}
		return true ;
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

