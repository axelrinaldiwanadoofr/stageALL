/*********************************************************
* Classe MvcModele pour gérer un modele d'objet
*********************************************************/

var modeleforcopy = null ;

function MvcModele( controler )
	{
	this.initMvcModele( controler ) ;
	}

MvcModele.prototype =
	{
	initMvcModele: function( controler )
		{
		this.controler = controler ;
		this.keystring = "" ;
		this.torefreshviews = false ;
		this.toupdate = false ;
		this.todelete = false ;
		this.toinsert = false ;
		this.values = [] ;
		this.views = [] ;
		},
	// renvoie la classe du modele
	getClassname: function()
		{
		return this.controler.classname ;
		},
	// Met a jour une valeur
	setValue: function( fieldname, value )
		{
		var i = this.controler.getFieldIndex( fieldname ) ;
		if( i > -1 && this.values[i] != value )
			{
			this.values[i] = value ;
			v = ayawf.tools.prepare_to_eval( value ) ;
			eval( "this." + fieldname + "=\"" + v + "\";" ) ;
			this.toupdate = true ;
			this.torefreshview = true ;
			}
		},
	// Retourne vrai le modele possede le champ de nom name
	hasField: function( fieldname )
		{
		var i = this.controler.getFieldIndex( fieldname ) ;
		if( i>-1 ) return true ;
		return false ;
		},
	// Renvoie une valeur
	getValue: function( fieldname )
		{
		var i = this.controler.getFieldIndex( fieldname ) ;
		if( i>-1 ) return this.values[i] ;
		return null ;
		},
	// Met a jour toutes les valeur à partir d'un row
	updateValuesFromRow: function( row, fieldindexes )
		{
		var data = row.split( "<sep>" ) ;
		this.state = data[2] ;
		if( this.state != "deleted" )
			{
			// Traitement d'un modele principal associé
			var mainclassname = data[3] ;
			var mainkeystring = data[4] ;
			if( mainclassname != "" )
				{
				this.mainmodele = this.controler.manager.getModele( mainclassname, mainkeystring ) ;
				}
			var i ;
			// Mise a jour des champs
			for( i=6 ; i<data.length ; i++ )
				{
				var fieldvalue = data[i].split( "<eql>" ) ;
				var idx = fieldindexes[fieldvalue[0]] ;
				this.values[idx] = fieldvalue[1] ;
				var v = ayawf.tools.prepare_to_eval( fieldvalue[1] ) ;
				eval( "this." + fieldvalue[0] + "=\"" + v + "\";" ) ;
				}
			}
		else this.todelete = true ;
		this.keystring = this.controler.createKeyStringFromRow( this.values ) ; ;
		this.torefreshview = true ;
		this.toupdate = false ;
		this.toinsert = false ;
		},
	// ajoute une vue
	addView: function( view )
		{
		if( this.getViewIndex( view ) == -1 ) this.views.push( view ) ;
		},
	// Enleve une vue
	detachView: function( view )
		{
		var i = this.getViewIndex( view ) ;
		if( i > -1 ) this.views[i] = null ;
		},
	// rafraichi toutes les vue sauf celle pointée par view
	refreshAllViews: function( view )
		{
		if( this.torefreshview )
			{
			var i ;
			for( i=0 ; i<this.views.length ; i++ )
				{
				if( this.views[i] && this.views[i] != view ) this.views[i].onRefresh() ; ;
				}
			this.torefreshview = false ;
			}
		},
	// Selectionne toute les vue du modele
	setSelectedAllViews: function()
		{
		for( var i=0 ; i<this.views.length ; i++ )
			{
			if( this.views[i] ) this.views[i].setSelected() ; ;
			}
		},
	// renvoie l'index d'une vue
	getViewIndex: function( view )
		{
		for( var i=0 ; i<this.views.length ; i++ )
			{
			if( this.views[i] == view ) return i ;
			}
		return -1 ;
		},
	// Enregistre les modifications en base de donnée
	save: function( view, methode )
		{
		if( this.toupdate )
			{
			this.controler.updateModeleToDB( this, view, methode ) ;
			}
		},
	// Enregistre les modifications en base de donnée
	updateToDB: function()
		{
		this.controler.updateModeleToDB( this ) ;
		},
	// Supprime les donnée en base de donnée
	deleteToDB: function()
		{
		this.controler.deleteModeleToDB( this ) ;
		},
	// Copie les donnée en base de donnée
	copyToDB: function( rowstring, view, methode )
		{
		this.controler.copyModeleToDB( this, rowstring, view, methode ) ;
		},
	// Supprime le modele
	remove: function()
		{
		this.controler.detach( this ) ;
		
		// Fait une copie du tableau des vues
		var views = [] ;
		for( var i=0 ; i<this.views.length ; i++ ) views[i] = this.views[i] ;
		
		// Supprime les à partir de la copie
		for( var i=0 ; i<views.length ; i++ )
			{
			if( views[i] ) views[i].remove() ;
			}
		}
	} ;

