
// Outils JS de base et de reference des objets Node et Action

var isIE = navigator.userAgent.toLowerCase().indexOf('msie')!=-1 ;
var isNETSCAPE = ( navigator.appName == "Netscape" ) ;

var opacityok = true ; // Permet de stopper les traitements d'opacite qui ralentissent tout

var sessionid ; // Numero de session
var ontimeoutfct = [] ; // Tableau des fonctions gérant le timer
var onloadfct = [] ; // Tableau des fonctions gérant le chargerment
var onresizefct = [] ; // Tableau des fonctions gérant le retaillage de la fenetre
var time = 0 ; // Compteur de timeout ;
var timerenable = true ; // Marche/arret du timer


/*********************************************************
* Classe Ayawf 
*********************************************************/

function Ayawf()
	{
	this.initAyawf() ;
	}

Ayawf.prototype =
	{
	initAyawf: function()
		{
		this.isIE = navigator.userAgent.toLowerCase().indexOf('msie')!=-1 ;
		this.isNETSCAPE = ( navigator.appName == "Netscape" ) ;

		this.opacityok = true ; // Permet de stopper les traitements d'opacite qui ralentissent tout

		this.sessionid ; // Numero de session
		
		this.ontimer = [] ; // Tableau des fonctions gérant le timer
		this.time = 0 ; // Compteur de timeout ;
		this.timerenable = true ; // Marche/arret du timer
		this.elapsetime = 10 ; // Temps de timeout
		
		this.onload = [] ; // Tableau des fonctions gérant le chargerment
		this.onresize = [] ; // Tableau des fonctions gérant le retaillage de la fenetre
		},
	// Ajoute un objet avec une methode à appeller dans le timer
	addToTimer: function( caller )
		{
		this.ontimer.push( caller ) ;
		},
	// Ajoute un objet avec une methode à appeller apres chargement de la page
	addToLoad: function( caller )
		{
		this.onload.push( caller ) ;
		},
	// Ajoute un objet avec une methode à appeller apres un resize de la fenetre
	addToResize: function( caller )
		{
		this.ontimer.push( caller ) ;
		},
	// Au déclenchement du timer
	onTimer: function()
		{
		var ontimer = [] ;
		
		while( var caller = this.ontimer.pop() )
			{
			if( caller.Call( this.time ) ) ontimer.push( caller ) ;
			}
		this.time++ ;
		this.ontimer = ontimer ;
		window.setTimeout('onTimeout()', this.elapsetime );
		},
	// Au chargement da la page
	onLoad: function()
		{
		for( var i=0 ; i<onload.length ; i++ ) onload[i].Call() ;
		},
	// Au changement de taille
	onResize: function()
		{
		for( var i=0 ; i<onresize.length ; i++ ) onresize[i].Call() ;
		}
	};

function MethodeCallerManager()
	{
	this.initMethodeCallerManager() ;
	}

MethodeCallerManager.prototype =
	{
	initMethodeCallerManager: function( object, methode )
		{
		this.callers = [] ;
		},
	// Ajoute caller
	add: function( caller )
		{
		this.callers.push( caller ) ;
		},
	Call: function()
		{
		for( var i=0 ; i<callers.length ; i++ ) callers[i].Call() ;
		},
	CallOneTime: function()
		{
		var callers = [] ;
		
		while( var caller = this.callers.pop() )
			{
			if( caller.Call( this.time ) ) callers.push( caller ) ;
			}
		this.callers = callers ;
		}
	};
	
function MethodeCaller( object, methode )
	{
	this.initMethodeCaller( object, methode ) ;
	}

MethodeCaller.prototype =
	{
	initMethodeCaller: function( object, methode )
		{
		this.object = object ;
		this.methode = methode ;
		},
	Call: function()
		{
		return this.methode.call( this.object ) ;
		}
	};

function MethodeCallerA1( object, methode, arg1 )
	{
	this.initMethodeCallerA1( object, methode, arg1 ) ;
	}

MethodeCallerA1.prototype =
	{
	initMethodeCallerA1: function( object, methode, arg1 )
		{
		this.object = object ;
		this.methode = methode ;
		this.arg1 = arg1 ;
		},
	Call: function()
		{
		return this.methode.call( this.object, this.arg1 ) ;
		}
	};
	

function enableTimer()
{
	timerenable = true ;
}

function desableTimer()
{
	timerenable = false ;
}

// Fonction appelee au chargement
function onLoad()
{
	var i ;
	for( i=0 ; i<onloadfct.length ; i++ )
		{
		onloadfct[i]( time ) ;
		}
	window.setTimeout('onTimeout()', 10 );
}

// Fonction appelee au changment de taille de la fenetre
function onResize()
{
	var i ;
	for( i=0 ; i<onresizefct.length ; i++ )
		{
		onresizefct[i]( time ) ;
		}
}

// Fonction appelee par le timer
function onTimeout()
{
	if( timerenable )
		{
		var i ;
		for( i=0 ; i<ontimer.length ; i++ )
			{
			ontimer[i]( time ) ;
			}
		time++ ;
		window.setTimeout('onTimeout()', 100 );
		}
}

// Prepare une valeur a envoyee par GET
// Remplace tous les caracteres indesirable par leur valeur ascii
function prepare_to_send( s )
{
	if( typeof( s ) == "string" )
		{
		s = s.replace( /=/g, "%3D" ) ;
		s = s.replace( /&/g, "%26" ) ;
		s = s.replace( /#/g, "%23" ) ;
		}
	return s ;
}

// Prepare une valeur a afficher
// Remplace tous les caracteres indesirable par leur valeur ascii
function prepare_to_show( s )
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
}

// Prepare une valeur figurer dans un eval
function prepare_to_eval( s )
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

// Cree un element DOM venant remplacer un DIV inseré dans le DIV root
function createDomElement( content, id, idx, rootid )
{
	if( id )
		{
		var el = document.getElementById( id ) ;
		if( el )
			{
			el.style.display = "block" ;
			var idxelements = document.getElementsByName( "idx" ) ;
			var i = 0 ;
			for( i=0 ; i<idxelements.length ; i++)
				{
				idxelements[i].value = idx ;
				}
			return el ;
			}
		}
	var element = document.createElement( "DIV" ) ;
	element.innerHTML = content ;
	var root ;
	if( rootid ) root = document.getElementById( rootid ) ;
	else root = document.getElementById( "root" ) ;
	root.appendChild( element ) ;
	return element ;
}

// Remplace un element DOM identifié par id
function replaceDomElement( content, id )
{
	var element = document.getElementById( id ) ;
	element.outerHTML = content ;
	return element ;
}

// Efface un element
function hideDomElement( id, numframe )
{
	var w = parent.frames[numframe] ;
	var el = w.document.getElementById( id ) ;
	el.style.display = "none" ;
}



// Envoie le buffer d'instruction JS
function flushJsInstructionList( time )
{
	if( (time % 10) == 0 )
		{
		var request = "flushjsinstructionlist.php5?sessionid=" + sessionid ;
		AjaxSendForExecute( request ) ;
		}
}

//addOnTimeoutFct( flushJsInstructionList ) ;

window.onload = onLoad ;
window.onresize = onResize ;
