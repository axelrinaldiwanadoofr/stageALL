/*********************************************************
* Classe MvcModeleControler pour gérer un groupe de modeles
* créés à partir d'une même classe
*********************************************************/

function MvcModeleControler( classname, pkstring, fieldsstring, mainclassname )
	{
	this.initMvcModeleControler( classname, pkstring, fieldsstring, mainclassname ) ;
	}

MvcModeleControler.prototype =
	{
	initMvcModeleControler: function( classname, pkstring, fieldsstring, mainclassname )
		{
		this.classname = classname ;
		this.mainclassname = mainclassname ;
		this.pkstring = pkstring ;
		this.fields = fieldsstring.split( "," ) ;
		this.fieldindexes = [] ;
		this.completed = false ;

		// Construit le tableau des index de champ
		var i ;
		for( i=0 ; i < this.fields.length ; i++ )
			{
			this.fieldindexes[this.fields[i]] = i ;
			}

		// Construit la chaine de pk
		this.updatePkIndexes() ;
		this.modeles = [] ;
		},
	// Ajoute un controleur de modele
	add: function( modele )
		{
		if( !this.modeles[modele.keystring] )
			{
			this.modeles[modele.keystring] = modele ;
			}
		return modele ;
		},
	// Enleve un modele
	detach: function( modele )
		{
		this.modeles[modele.keystring] = null ;
		},
	// Renvoie un modele à partir de son keystring
	getModele: function( keystring )
		{
		return this.modeles[keystring] ;
		},
	// Renvoie l'index d'un champ à partir de son nom
	getFieldIndex: function( fieldname )
		{
		return this.fieldindexes[fieldname] ;
		},
	// Cree un nouveau modele
	createModele: function()
		{
		var modele = new MvcModele( this, "new" ) ;
		this.modeles["new"] = modele ;
		return modele ;
		},
	// Cree un modele
	createModele: function()
		{
		var keystring = this.createKeyStringFromRow( row ) ;
		var modele = new MvcModele( this, keystring, row ) ;
		this.modeles[keystring] = modele ;
		return modele ;
		},
	// Cree un modele à partir d'un row
	createModeleFromRow: function( row )
		{
		if( !this.completed )
			{
			// Complete la définition des champs à partir d'un row
			this.updateFieldIndexesFromRow( row ) ;
			this.updatePkIndexes()
			this.completed = true ;
			}
		// Cree un modele et le met à jour à partir du row
		var modele = new MvcModele( this, "" ) ;
		modele.updateValuesFromRow( row, this.fieldindexes ) ;
		this.modeles[modele.keystring] = modele ;
		return modele ;
		},
	// Modifie un modele à partir d'un row
	updateModeleFromRow: function( keystring, row )
		{
		if( !this.completed )
			{
			// Complete la définition des champs à partir d'un row
			this.updateFieldIndexesFromRow( row ) ;
			this.updatePkIndexes()
			this.completed = true ;
			}
		var modele = this.modeles[keystring] ;
		if( !modele )
			{
			modele = new MvcModele( this, keystring ) ;
			this.modeles[keystring] = modele ;
			}
		modele.updateValuesFromRow( row, this.fieldindexes ) ;
		if( !modele.todelete )
			{			
			if( keystring != modele.keystring )
				{
				this.modeles[modele.keystring] = modele ;
				this.modeles[keystring] = null ;
				}
			}
		return modele ;
		},
	// Enregistre les données d'un modele
	updateModeleToDB: function( modele, view, methode )
		{
		var rowstring = this.createPhpRowString( modele ) ;
		var keystring = this.createPhpPkString( modele ) ;
		
		if( modele.mainmodele )
			{
			var maincontroler = modele.mainmodele.controler ;
			mainkeystring = maincontroler.createPhpPkString( modele.mainmodele ) ;

			var msu = new MvcSqlUpdate( this.classname, keystring, rowstring, maincontroler.classname, mainkeystring ) ;
			msu.updateModele() ;
			}
		else
			{
			var msu = new MvcSqlUpdate( this.classname, keystring, rowstring ) ;
			msu.updateModele() ;
			}
		},
	// Supprime les données d'un modele
	deleteModeleToDB: function( modele )
		{
		var keystring = this.createPhpPkString( modele ) ;		
		var msu = new MvcSqlDelete( this.classname, keystring ) ;
		msu.deleteModele() ;
		},
	// Copie les données d'un modele
	// modele: original
	// view, methode: Vue et methode de la vue à exécuter avec le nouveau modèle 
	copyModeleToDB: function( modele, rowstring, view, methode )
		{
		var keystring = this.createPhpPkString( modele ) ;		
		var msc = new MvcSqlCopy( this.classname, keystring, rowstring, view, methode ) ;
		msc.copyModele() ;
		},
	// Crée les données d'un nouveau modele
	// rowstring: Chaine de champs et valeurs initiale
	// view, methode: Vue et methode de la vue à exécuter avec le nouveau modèle 
	newModeleToDB: function( rowstring, view, methode )
		{
		var msn = new MvcSqlNew( this.classname, rowstring, view, methode ) ;
		msn.newModele() ;
		},
	// Met à jour le tableau des index de champ à partir d'un row
	updateFieldIndexesFromRow: function( row )
		{
		var data = row.split( "<sep>" ) ;
		this.state = data[2] ;
		if( this.state == "loaded" )
			{
			var i ;
			this.fieldindexes = [] ;
			this.fields = [] ;
			var idxn = 0 ;
			for( i=6 ; i<data.length ; i++ )
				{
				var fieldvalue = data[i].split( "<eql>" ) ;
				this.fieldindexes[fieldvalue[0]] = i-6 ;
				this.fields[i-6] = fieldvalue[0] ;
				}
			}
		},
	// Met à jour le tableau des index clé primaire
	updatePkIndexes: function()
		{
		var pk = this.pkstring.split( "," ) ;
		var i ;
		this.pkindexes = [] ;
		for( i=0 ; i<pk.length ; i++ )
			{
			this.pkindexes[i] = this.fieldindexes[pk[i]] ;
			}
		},
	// Cree une rowstring pour PHP
	createPhpRowString: function( modele )
		{
		var rowstring = "" ;
		for( i=0 ; i<this.fields.length ; i++ )
			{
			if( !i ) rowstring += this.fields[i] + "<eql>" + modele.values[i] ;
			else rowstring += "<sep>" + this.fields[i] + "<eql>" + modele.values[i] ;
			}
		return ayawf.tools.prepare_to_send( rowstring ) ;
		},
	// Cree une pkstring pour PHP
	createPhpPkString: function( modele )
		{
		var key = modele.keystring.split( "," ) ;
		var pkstring = "" ;
		for( i=0 ; i<this.pkindexes.length ; i++ )
			{
			var k = this.pkindexes[i] ;
			//if( !i ) pkstring += this.fields[k] + "<eql>" + modele.values[k] ;
			//else pkstring += "<sep>" + this.fields[k] + "<eql>" + modele.values[k] ;
			if( !i ) pkstring += this.fields[k] + "<eql>" + key[i] ;
			else pkstring += "<sep>" + this.fields[k] + "<eql>" + key[i] ;
			}
		return ayawf.tools.prepare_to_send( pkstring ) ;
		},
	// Cree une keystring à partir d'un row
	createKeyStringFromRow: function( row )
		{
		var keystring = "" ;
		for( var i=0 ; i<this.pkindexes.length ; i++ )
			{
			var index = this.pkindexes[i] ;
			if( keystring == "" ) keystring = row[index] ;
			else keystring += "," + row[index] ;
			}
		return keystring ;
		}
	} ;

