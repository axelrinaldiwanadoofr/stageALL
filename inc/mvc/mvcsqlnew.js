/*********************************************************
* Classe MvcSqlNew pour crée un nouveau modele en BD
* classname: Classe des objets à charger
* rowstring: Chaine de carateres contenant des valeurs de champ initiales pour la creation
* view, methode: Vue et methode de la à rafraichir avec le nouvel objet
*********************************************************/


function MvcSqlNew( classname, rowstring, view, methode )
	{
	this.initMvcSqlNew( classname, rowstring, view, methode ) ;
	}

MvcSqlNew.prototype =
	{
	initMvcSqlNew: function( classname, rowstring, view, methode )
		{
		this.classname = classname ;
		this.rowstring = rowstring ;
		this.view = view ;
		this.methode = methode ;
		},
	newModele: function()
		{
		var request = "mvcsqlnew.php5?classname=" + this.classname ;
		if( this.rowstring ) request += "&rowstring=" + this.rowstring ;
		AjaxSendRequest( request, this, this.onReceveAnswer ) ;
		return false ;
		},
	// A reception de la reponse AJAX
	onReceveAnswer: function( answer )
		{
		ayawf.mvc.updateModeleFromAjaxAnswer( this.classname, this.view, this.methode, false, answer ) ;
		}
	};
