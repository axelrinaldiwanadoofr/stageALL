// Groupe d'actions lancees et executees en meme temps

function SameTimeAction( id, actif_event )
	{
	this.id = id ;
	this.actif_event = actif_event ;
	this.categorie = "action" ;
	this.actions = [] ;
	this.index = 0 ;
	this.actif = false ;
	}

SameTimeAction.prototype =
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
	// Ajoute une action a la sequence
	add: function( action )
		{
		this.actions.push( action ) ;
		},
	// Lance l'execution de la sequence
	setActif: function()
		{
		var i ;
		for( i=0 ; i<this.actions.length ; i++ )
			{
			this.actions[i].setActif() ;
			}
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
	// Gere le changement de taille
	onTimeout: function( time, node )
		{
		if( this.actif )
			{
			var i ;
			var busy = false ;
			for( i=0 ; i<this.actions.length ; i++ )
				{
				this.actions[i].onTimeout( time, node ) ;
				if( this.actions[i].actif ) busy = true ;
				}
			if( busy ) return false ;
			this.actif = false ;
			return true ;
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

