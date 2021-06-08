/*********************************************************
* Classe MvcModeleControlerManager pour gérer les
* controleurs de modèle
*********************************************************/

function MvcModeleControlerManager()
{
	this.initMvcModeleControlerManager() ;
}

MvcModeleControlerManager.prototype =
{
	initMvcModeleControlerManager: function()
	{
		this.modeleforcopy = null ;
		this.rowstring = null ;
		this.controlers = [] ;
	},

	// Ajoute un controleur de modele
	add: function( name, controler )
	{
		if( !this.controlers[name] ) this.controlers[name] = controler ;
		controler.manager = this ;
		return controler ;
	},

	// Renvoie un controleur par son nom
	getControler: function( name )
	{
		return this.controlers[name] ;
	},

	// Renvoie un modele
	getModele: function( controlername, keystring )
	{
		var controler = this.controlers[controlername] ;
		if( controler ) return controler.getModele( keystring ) ;
		return null ;
	},

	// Specifie un modele à copier
	setModeleToCopy: function( modele )
	{
		this.modeleforcopy = modele ;
	},

	// Renvoie true s'il y a un modele correspondant à la classe classname à copier
	isThereModeleToCopy: function( classname )
	{
		if( this.modeleforcopy && this.modeleforcopy.getClassname() == classname ) return true ;
		return false ;
	},

	// Copie le modele dans le buffer de copie et appele la methode de la vue specifié
	pasteModeleToCopy: function( view, methode )
	{
		if( this.modeleforcopy ) this.modeleforcopy.copyToDB( this.rowstring, view, methode ) ;
		this.rowstring = null ;
	},

	// Ajoute un champ valeur au rowstring utilisé pour l'envoie de valeur à la creation d'un nouvel objet en PHP
	addValueToRowString: function( field, value )
	{
		if( this.rowstring ) this.rowstring += "<sep>" + field + "<eql>" + ayawf.tools.prepare_to_send( value ) ;
		else this.rowstring = field + "<eql>" + ayawf.tools.prepare_to_send( value ) ;
	},

	// Reset la chaine rowstring pour l'envoie de valeur
	resetRowString: function()
	{
		this.rowstring = null ;
	},

	// Charge une suite de modele à partir d'une requete sql pour mettre à jour ensuite une vue
	// classname: Classe des objets à charger
	// sql: Requette SQL donnant la liste des objets à charger ( primary key)
	// view, methode: Vue à mettre à jour en appelant la methode pointée par methode à chaque objet chargé
	loadModeleFromSqlSelect: function( classname, from, where, orderby, view, methode, firstrow, lastrow, step, timeout )
	{
		var msl = new MvcSqlLoader( classname, from, where, orderby, view, methode, firstrow, lastrow, step, timeout ) ;
		msl.loadModeles() ;
	},

	// Crée un objet vide
	newModeleToDB: function( classname, view, methode )
	{
		var msn = new MvcSqlNew( classname, this.rowstring, view, methode ) ;
		this.rowstring = null ;
		msn.newModele() ;
	},

	// Met à jour ou cree les modeles à partir des données chargées apres l'appel AJAX
	// La reponse est composée de row séparées par le symbole <row>. Chaque row est composé
	// de champs séparés par <sep>
	//
	// Le premier row donne l'état de la réponse:
	//		Error, doit avoir la valeur DataNoError si non il y a erreur
	//	    Champ 1: EOF, contient 1 s'il n'y a plus de row à charger ou 0 s'il y en a encore
	// Les row suivants suivent la même description:
	//		Champ 0: Classe, nom de la classe de l'objet chargé afin de trouver le controleur de modèle
	//		Champ 1: Keystring, keystring de l'objet chargé afin de trouver le modèle s'il existe déja
	//		Champ 2: Etat, Etat de l'objet: dberror = erreur SQL, inserted = l'objet vient d'etre inseré en BD, 
	//					deleted = l'objet vient d'etre supprimé de la BD, updated = l'objet vient d'etre modifié,
	//					loaded = l'objet vient juste d'etre chargé.
	// Le dernier row donne l'état de l'avancement de la lecture
	//	    Champ 0: EOF, contient 1 s'il n'y a plus de row à charger ou 0 s'il y en a encore
	//		Champ 1: NROW, contient le prochain n° d'enregistrement à charger
	//
	// Si l'objet est de la même classe que celle mentionnée dans l'argument refclassname alors la méthode contenue dans
	// methode de la vue view est exécutée pour le modèle créé à partir de l'objet.
	//
	updateModeleFromAjaxAnswer: function( refclassname, view, methode, updviewanyway, answer )
	{
		var rows = answer.split( "<row>" ) ;
		
		if( rows[0] == "DataNoError" )
		{
			var tocallmethode = new MethodeCallerManager() ;
			
			for( var i=1 ; i<rows.length - 1 ; i++ )
			{
				var data = rows[i].split( "<sep>" ) ;
				var classname = data[0] ;
				var keystring = data[1] ;
				var state = data[2] ;

				if( state != "dberror" )
				{
					var controler = this.controlers[classname] ;
					if( controler )
					{
						var modele = null ;
						if( state == "inserted" )
						{
							modele = controler.createModeleFromRow( rows[i] ) ;
						}
						else
						{
							modele = controler.updateModeleFromRow( keystring, rows[i] ) ;
						}
						if( modele )
						{
							modele.toupdate = false ;
							if( modele.state == "updated" ) modele.refreshAllViews() ;
							// Supprime le modele s'il doit etre supprimé
							if( modele.todelete ) modele.remove() ;
							// Stocke le modele pour appel de la methode de la vue
							if( ( updviewanyway || classname == refclassname) && view ) tocallmethode.add( new MethodeCallerA1( view, methode, modele ) ) ;
						}
					}
				}
				else
				{
					alert( "Error: " + rows[i] ) ;
					return false ;
				}
			}
			// Appele la methode de la vue
			tocallmethode.Call() ;
		}
		else 
		{
			alert( "Error: " + rows[0] ) ;
			return false ;
		}
		var answerstate = rows[rows.length-1].split( "<sep>" ) ;			
		return parseInt( answerstate[0] ) ;
	}		
};
