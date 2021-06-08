/*********************************************************
* Fonctions pour l'utilisation d'ajax
*********************************************************/
//
// Cree et retourne un composant ajax
//

var debug = false ; // Debug activé
var tdebug = new Array ; // Pile des messages debug
var tajax = new Array ; // File d'attente des requettes Ajax (car JS n'est pas multi thread)
var currentrequest = null ;

function Ajax( request, object, methode )
{
	this.ajax = null ;
	this.request = request ;
	this.object = object ;
	this.methode = methode ;

	if( window.XMLHttpRequest )
	{
		this.ajax = new XMLHttpRequest() ;
	}
	else
	{
		this.ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
}

Ajax.prototype =
{
	//
	// Squelete du traitement standard d'une reponse ajax
	//
	reponseStd: function()
	{
		if( this.ajax.readyState == 4 )
		{
			var	str = this.ajax.responseText ;
			if( str.indexOf( "no row found", 0 ) == -1 )
			{
				//alert( "reponseStd: " + str ) ;
				var methode = this.methode ;
				if( this.object ) this.methode.call( this.object, str ) ;
				else this.methode( str ) ;
			}
			// Envoie la requette suivante dans la fille d'attente
			if( tajax.length )
			{
				currentrequest = tajax.pop() ;
				if( currentrequest ) currentrequest.sendRequest() ;
			}
			else currentrequest = null ;
			}
	},

	//
	// Chargement d'une page avec ajax
	// page: URL de la page: http://127.0.0.1/fichier
	// fct: Adresse de la fonction traitant la réponse ajax
	//
	sendRequest: function()
	{
		//alert( "sendRequest: " + this.request ) ;
		this.request += "&config=" + config ;
		this.ajax.onreadystatechange = function() { AjaxReponseStd( this ); } ;
		this.ajax.open( "GET", this.request, true ) ;
		this.ajax.send( null ) ;
	},

	//
	// Chargement d'une page avec ajax
	// page: URL de la page: http://127.0.0.1/fichier
	// fct: Adresse de la fonction traitant la réponse ajax
	//
	sendRequestForExecute: function( request )
	{
		//alert( "Ajax::sendRequestForExecute: " + request ) ;
		if( window.name != "" ) request += "&window=" + window.name ;
		this.ajax.onreadystatechange = function() { AjaxReponseForExecute( this ); } ;
		//this.ajax.open( "GET", request, false ) ;
		this.ajax.open( "GET", request, true ) ;
		this.ajax.send( null ) ;
	}
}

// Envoie une requette pour execution d'une action au retour
function AjaxSendForExecute( request )
{
	if( !tajax.length )
	{
		var ar = new Ajax() ;
		ar.sendRequestForExecute( request ) ;
	}
	else
	{
		tajax.unshift( request ) ;
	}
}

// Envoie une requette ajax
function AjaxSendRequest( request, object, methode )
{
	var ar = new Ajax( request, object, methode ) ;
	if( !currentrequest )
	{
		currentrequest = ar ;
		ar.sendRequest() ;
	}
	else
	{
		tajax.unshift( ar ) ;
	}
}

// Reponse standard
function AjaxReponseStd( ajax )
{
	currentrequest.reponseStd() ;
}

// Reponse pour execution d'une serie d'action
function AjaxReponseForExecute( ajax )
{
	if( ajax.readyState == 4 )
	{
		if( ajax.status == 200 )
		{
			var	str = ajax.responseText ;
			//alert( str ) ;
			if( str.indexOf( "no row found", 0 ) == -1 )
			{
				var actions = str.split( "<ins>" ) ;
				if( actions[0] == "Saute premiere ligne" )
				{
					// Traitement des actions en mode release
					for( var i=1 ; i<actions.length ; i++ )
					{
						try
						{
							eval( actions[i] ) ;
						}
						catch( err )
						{
							alert( actions(i) ) ;
						}
					}
				}
				else alert( actions[0] ) ;
			}
		}
	}
	// Envoie la requette suivante dans la fille d'attente
	if( tajax.length )
	{
		var request = tajax.pop() ;
		var ar = new Ajax() ;
		ar.sendRequestForExecute( request ) ;
	}
}