
// Classe de base pour les actions

function Action( id, event_actif )
	{
	this.categorie = "action" ;
	this.id = id ;
	this.width = 0 ;
	this.height = 0 ;
	this.actif = false ;
	}

Action.prototype =
	{
	// Activation sur l'evenement onOpen
	setActif: function()
		{
		this.width = this.start_width ;
		this.height = this.start_height ;
		this.actif = true ;
		},
	// Activation si on_open = true
	// Gestion du timeout
	// Gere le changement de taille
	onTimeout: function( time, node )
		{
			return false ;
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

