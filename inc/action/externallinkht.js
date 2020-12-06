// Lien Hyper text vers une url d'un autre site

function ExternalLinkHT( id, url, actif_event )
	{
	this.id = id ;
	this.url = url ;
	this.actif_event = actif_event ;
	this.categorie = "action" ;
	this.actif = false ;
	}

ExternalLinkHT.prototype =
	{
	get_url: function()
		{
		return this.url ;
		},
	set_url: function( value, save )
		{
		this.url = value ;
		if( save ) saveActionProperty( this.id, "url", this.url ) ;
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
	// Activation si on_open = true
	onOpen: function( node )
		{
		document.location.href = this.url ;
		},
	// Evenement onClose:
	onClose: function( node )
		{
		document.location.href = this.url ;
		},
	// Evenement onmouseover:
	onMouseOver: function( node )
		{
		document.location.href = this.url ;
		},
	// Evenement onmouseover:
	onMouseOut: function( node )
		{
		document.location.href = this.url ;
		},
	// Evenement onmouseover:
	onClick: function( node )
		{
		document.location.href = this.url ;
		}
	};

