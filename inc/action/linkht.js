// Lien Hyper text vers une autre page

function LinkHT( id, page, arguments, actif_event, admin )
	{
	this.id = id ;
	this.page = page ;
	this.arguments = arguments ;
	this.actif_event = actif_event ;
	this.admin = admin ;
	this.categorie = "action" ;
	this.actif = false ;
	}

LinkHT.prototype =
	{
	get_page: function()
		{
		return this.page ;
		},
	set_page: function( value, save )
		{
		this.page = value ;
		if( save ) saveActionProperty( this.id, "page", this.page ) ;
		return true ;
		},
	get_arguments: function()
		{
		return this.arguments ;
		},
	set_arguments: function( value, save )
		{
		this.arguments = value ;
		if( save ) saveActionProperty( this.id, "arguments", this.arguments ) ;
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
	goToPage: function()
		{
		var href ;
		if( !this.admin )
			{
			href = "test.php5?page=" + this.page ;
			if( this.arguments != "" )	href = href + "&" + this.arguments.replace( "^","&" ) ;
			document.location.href = href ;
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
	// Activation si on_open = true
	onOpen: function( node )
		{
		this.goToPage() ;
		},
	// Evenement onClose:
	onClose: function( node )
		{
		this.goToPage() ;
		},
	// Evenement onmouseover:
	onMouseOver: function( node )
		{
		this.goToPage() ;
		},
	// Evenement onmouseover:
	onMouseOut: function( node )
		{
		this.goToPage() ;
		},
	// Evenement onmouseover:
	onClick: function( node )
		{
		this.goToPage() ;
		}
	};

