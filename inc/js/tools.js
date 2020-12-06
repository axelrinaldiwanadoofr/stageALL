/**************************************************************************************************
* 
* Ensemble d'outils de base
*
* Axel Rinaldi 08/2011
***************************************************************************************************/

// Outils JS de base et de reference des objets Node et Action

function Tools()
	{
	this.initTools() ;
	}

Tools.prototype =
	{
	initTools: function()
		{
		this.isIE = navigator.userAgent.toLowerCase().indexOf('msie')!=-1 ;
		this.isNETSCAPE = ( navigator.appName == "Netscape" ) ;
		},

	initTools: function()
		{
		this.isIE = navigator.userAgent.toLowerCase().indexOf('msie')!=-1 ;
		this.isNETSCAPE = ( navigator.appName == "Netscape" ) ;
		},
	// Chargement d'un script associe a une classe JS
	loadClasse: function( classname, filename )
		{
		var script = document.getElementById( classname ) ;
		if( !script )
			{
			script = document.createElement( "script" ) ;
			script.src = filename ;
			script.id = classname ;
			document.body.appendChild( script ) ;
			}
		},

	// Prepare une valeur a envoyee par GET
	// Remplace tous les caracteres indesirable par leur valeur ascii
	prepare_to_send: function( s )
		{
		if( typeof( s ) == "string" )
			{
			s = s.replace( /=/g, "%3D" ) ;
			s = s.replace( /&/g, "%26" ) ;
			s = s.replace( /#/g, "%23" ) ;
			}
		return s ;
		},

	// Prepare une valeur a afficher
	// Remplace tous les caracteres indesirable par leur valeur ascii
	prepare_to_show: function( s )
		{
		if( typeof( s ) == "string" )
			{
			s = s.replace( /à/g, "&agrave;" ) ;
			s = s.replace( /â/g, "&acirc;" ) ;
			s = s.replace( /ç/g, "&ccedil;" ) ;
			s = s.replace( /è/g, "&egrave" ) ;
			s = s.replace( /é/g, "&eacute;" ) ;
			s = s.replace( /ê/g, "&ecirc;" ) ;
			s = s.replace( /ë/g, "&euml;" ) ;
			s = s.replace( /ê/g, "&ecirc;" ) ;
			}
		return s ;
		},

	// Prepare une valeur figurer dans un eval
	prepare_to_eval: function( s )
		{
		if( typeof( s ) == "string" )
			{
			s = s.replace( /"/g, "\\\"" ) ;
			s = s.replace( /\\\\"/g, "\\\"" ) ;
			s = s.replace( /\n/g, "" ) ;
			s = s.replace( /\r/g, "" ) ;
			}
		return s ;
		}	
	} ;

// Ajoute a l'objet child les membres de l'objet parent
function herite( child, parent, dontfinalize )
{
	if( typeof child.initialized == "undefined" )
		{
		for( property in parent.prototype )
			{
			if( !child.prototype[property] )
				{
				child.prototype[property] = parent.prototype[property] ;
				}
			}
		if( !dontfinalize ) child.initialized = true ;
		}
}

