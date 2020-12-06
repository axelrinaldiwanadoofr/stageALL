/**************************************************************************************************
* 
* Ensemble de classe pour la gestion des appels en serie
* de methodes associées à un objet
*
* Axel Rinaldi 08/2011
***************************************************************************************************/


// Gestionnaire d'un ensemble de caller
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
	// Ajoute caller au gestionnaire
	add: function( caller )
		{
		this.callers.push( caller ) ;
		},
	// Supprime un caller au gestionnaire
	remove: function( caller )
		{
		for( var i=0 ; i<this.callers.length ; i++ )
			{
			if( this.callers[i] == caller ) 
				{
				this.callers.splice( i, 1 ) ;
				return ;
				}
			}
		},
	// Supprime un caller au gestionnaire a partir de son objet
	removeFromObject: function( object )
		{
		for( var i=0 ; i<this.callers.length ; i++ )
			{
			if( this.callers[i].object == object ) 
				{
				this.callers.splice( i, 1 ) ;
				return ;
				}
			}
		},
	// Appelle tous les callers
	Call: function()
		{
		for( var i=0 ; i<this.callers.length ; i++ ) this.callers[i].Call() ;
		},
	// Appelle tous les callers avec 1 argument
	CallA1: function( arg1 )
		{
		for( var i=0 ; i<this.callers.length ; i++ ) this.callers[i].CallA1( arg1 ) ;
		},
	// Appelle tous les callers en les supprimants du gestionnaire
	// Les callers qui renvoie true sont reintégrés dans la liste
	CallOneTime: function()
		{
		var caller ;
		var callers = [] ;
		
		while( ( caller = this.callers.pop() ) )
			{
			if( caller.Call() ) callers.push( caller ) ;
			}
		this.callers = callers ;
		},
	// Appelle tous les callers en les supprimants du gestionnaire
	// Les callers qui renvoie true sont reintégrés dans la liste
	CallOneTimeA1: function( arg1 )
		{
		var caller ;
		var callers = [] ;
		
		while( ( caller = this.callers.pop() ) )
			{
			if( caller.CallA1( arg1 ) ) callers.push( caller ) ;
			}
		this.callers = callers ;
		}
	};

// Caller simple avec un objet et une méthode
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
		},
	CallA1: function( arg1 )
		{
		return this.methode.call( this.object, arg1 ) ;
		}
	};

// Caller simple avec un objet, une méthode	et 
// un argument
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

	
