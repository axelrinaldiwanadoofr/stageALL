/*********************************************************
* Classe MvcSqlDelete pour delete d'un modele en BD
* classname: Classe des objets à charger
* keystring: chaine indentifiante de l'objet supprimer
*********************************************************/


function MvcSqlDelete( classname, keystring )
	{
	this.initMvcSqlDelete( classname, keystring ) ;
	}

MvcSqlDelete.prototype =
	{
	initMvcSqlDelete: function( classname, keystring )
		{
		this.classname = classname ;
		this.keystring = keystring ;
		},
	deleteModele: function()
		{
		var request = "mvcsqldelete.php5?classname=" + this.classname ;
		request += "&keystring=" + this.keystring ;
		AjaxSendRequest( request, this, this.onReceveAnswer ) ;
		return false ;
		},
	// A reception de la reponse AJAX
	onReceveAnswer: function( answer )
		{
		ayawf.mvc.updateModeleFromAjaxAnswer( this.classname, this.view, this.methode, false, answer ) ;
		}
	};
