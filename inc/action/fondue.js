
// Genere une fondue enchainee sur les noeuds fils du noeud cible

function Fondue( id, width, height, timepause, timefondue, z, actif_event )
	{
	//herite( Fondue, Action ) ;
	this.id = id ;
	this.width = width ;
	this.height = height ;
	this.timefondue = timefondue ;
	this.z = z ;

	if( timefondue > 0 )
		{
		this.opacityinc = 100.0 / timefondue ;
		this.opacity = 0.0 ;
		}
	else
		{
		this.opacity = 0.0 ;
		}
	this.timepause = timepause ;
	this.actif_event = actif_event ;
	this.categorie = "action" ;
	this.icurrentchild = 0 ;
	this.ipreviouschild = -1 ;
	this.time = timepause + 1 ;
	this.actif = false ;
	}

Fondue.prototype =
	{
	get_width: function()
		{
		return this.width ;
		},
	set_width: function( value, save )
		{
		if( value >= 0 )
			{
			this.width = value ;
			if( save ) saveActionProperty( this.id, "width", this.width ) ;
			return true ;
			}
		else
			{
			alert( "La largeur doit etre positive" ) ;
			return false ;
			}
		},
	get_height: function()
		{
		return this.height ;
		},
	set_height: function( value, save )
		{
		if( value >= 0 )
			{
			this.height = value ;
			if( save ) saveActionProperty( this.id, "height", this.height ) ;
			return true ;
			}
		else
			{
			alert( "La hauteur doit etre positive" ) ;
			return false ;
			}
		},
	get_timepause: function()
		{
		return this.timepause ;
		},
	set_timepause: function( value, save )
		{
		this.timepause = value ;
		if( save ) saveActionProperty( this.id, "timepause", this.timepause ) ;
		return true ;
		},
	get_timefondue: function()
		{
		return this.timefondue ;
		},
	set_timefondue: function( value, save )
		{
		this.timefondue = value ;
		if( save ) saveActionProperty( this.id, "timefondue", this.timefondue ) ;
		return true ;
		},
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
	// Gestion du timeout
	// Gere l'enchainement en fondue
	onTimeout: function( time, node )
		{
		if( this.actif )
			{
			if( this.time >= this.timepause )
				{
				if( this.ipreviouschild > -1 ) node.childs[this.ipreviouschild].setZ( this.z ) ;
				var nc = node.childs[this.icurrentchild] ;
				this.ipreviouschild = this.icurrentchild ;
				this.icurrentchild++ ;
				if( this.icurrentchild >= node.childs.length ) this.icurrentchild = 0 ;
				node.childs[this.ipreviouschild].setZ( this.z + 5 ) ;
				node.childs[this.icurrentchild].setZ( this.z + 10 ) ;
				this.opacity = 0.0 ;
				if( node.childs[this.icurrentchild].element )
					{
					if( opacityok && this.timefondue > 0 )
						{
						if( isIE ) node.childs[this.icurrentchild].element.filters.alpha.opacity = this.opacity ;
						else node.childs[this.icurrentchild].element.style.opacity = this.opacity/100 ;
						}
					}
				this.time = 0 ;
				}
			if( opacityok && this.time < this.timefondue )
				{
				this.opacity += this.opacityinc ;
				if( node.childs[this.icurrentchild].element )
					{
					if( isIE ) node.childs[this.icurrentchild].element.filters.alpha.opacity = this.opacity ;
					else node.childs[this.icurrentchild].element.style.opacity = this.opacity/100 ;
					}
				}
			this.time++ ;
			}
		},
	// Evenement onOpen:
	onOpen: function( node )
		{
		var i ;
		var n = node.childs.length ;
		for( i=0 ; i<n ; i++ )
			{
			var c = node.childs[i] ;
			c.setZ( this.z ) ;
			c.resizeTo( this.width, this.height ) ;
			}
		if( node.childs.length > 0 ) node.childs[0].setZ( this.z + 5 ) ;
		this.actif = true ;
		},
	// Evenement onClose:
	onClose: function( node )
		{
		this.actif = false ;
		}
	};

