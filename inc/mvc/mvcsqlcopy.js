/*********************************************************
* Classe MvcSqlCopy pour copier un modele en BD
* classname: Classe des objets à charger
* keystring: chaine indentifiante de l'objet copier
* view, methode: Vue et methode de la à rafraichir avec le nouvel objet
*********************************************************/


function MvcSqlCopy( classname, keystring, rowstring, view, methode )
	{
	this.initMvcSqlCopy( classname, keystring, rowstring, view, methode ) ;
	}

MvcSqlCopy.prototype =
	{
	initMvcSqlCopy: function( classname, keystring, rowstring, view, methode )
		{
		this.classname = classname ;
		this.keystring = keystring ;
		this.rowstring = rowstring ;
		this.view = view ;
		this.methode = methode ;
		},
	copyModele: function()
		{
		var request = "mvcsqlcopy.php5?classname=" + this.classname ;
		request += "&keystring=" + this.keystring ;
		request += "&rowstring=" + this.rowstring ;
		AjaxSendRequest( request, this, this.onReceveAnswer ) ;
		return false ;
		},
	// A reception de la reponse AJAX
	onReceveAnswer: function( answer )
		{
		ayawf.mvc.updateModeleFromAjaxAnswer( this.classname, this.view, this.methode, false, answer ) ;
		}
	};
