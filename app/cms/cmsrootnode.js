//Classe de gestion des noeuds racines du CMS

function CmsRootNode( arguments )
	{
	herite( CmsRootNode, CmsNode, true ) ;
	herite( CmsRootNode, MvcView ) ;
	this.initCmsRootNode( arguments ) ;
	}

CmsRootNode.prototype =
	{
	// Initialise la vue sur le noeud image
	initCmsRootNode: function( arguments )
		{
		this.initCmsNode() ;
		
		// Construit le tableau des arguments
		var args = arguments.split( "<arg>" ) ;
		this.argnames = [] ;
		this.argvalues = [] ;
		for( var i=0 ; i<args.length ; i++ )
			{
			var a = args[i].split( "<argsep>" ) ;
			this.argnames.push( a[0] ) ;
			this.argvalues.push( a[1] ) ;
			}
		},
	// Calcule la valeur value avec les arguments
	computeValue: function( value )
		{
		for( var i=0 ; i<this.argnames.length ; i++ )
			{
			value = value.replace( "arg." + this.argnames[i], this.argvalues[i] ) ;
			}
		if( this.parent ) return this.parent.computeValue( value ) ;
		return value ;
		}		
	};
