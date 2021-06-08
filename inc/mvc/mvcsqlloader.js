/*********************************************************
* Classe MvcSqlLoader pour charger un ensemble de modele
* mcm: ModeleControlerManager
* sql: Requete SQL sans la partie SELECT
* classname: Classe des objets à charger
* view: Vue pour laquelle la méthode est appellée à chaque modèle
* methode: Methode de la vue appelée pour chaque modèle
* firstrow: N° du premier enrgistrement à charger (par défaut 0)
* lastrow: N° du dernier enregistrement à charger (par défaut 999999)
* step: Nombre d'enregistrement chargé à chaque requette (par defaut 32)
* timeout: Temps entre le chargement de chaque paquet de step enrgistrement
*********************************************************/


function MvcSqlLoader( classname, from, where, orderby, view, methode, updviewanyway, firstrow, lastrow, step, timeout )
{
	this.initMvcSqlLoader( classname, from, where, orderby, view, methode, updviewanyway, firstrow, lastrow, step, timeout ) ;
}

MvcSqlLoader.prototype =
{
	initMvcSqlLoader: function( classname, from, where, orderby, view, methode, updviewanyway, firstnrow, lastnrow, step, timeout )
	{
		this.from = from ;
		this.where = where ;
		this.orderby = orderby ;
		this.classname = classname ;
		this.view = view ;
		this.methode = methode ; 
		if( updviewanyway ) this.updviewanyway = updviewanyway ;
		else this.updviewanyway = false ;		
		if( firstnrow ) 
		{
			this.firstnrow = firstnrow ;
			this.nrow = firstnrow ;
		}
		else
		{
			this.firstnrow = 0 ;
			this.nrow = 0 ;
		}
		if( lastnrow ) this.lastnrow = lastnrow ;
		else this.lastnrow = 999999 ;
		if( step ) this.step = step ;
		else this.step = 32 ;
		if( timeout ) this.timeout = timeout ;
		else this.timeout = 10 ;
	},

	loadModeles: function()
	{
		var request = "mvcsqlloader.php?classname=" + this.classname ;
		request += "&from=" + this.from ;
		if( this.where ) request += "&where=" + this.where ;
		if( this.orderby ) request += "&orderby=" + this.orderby ;
		request += "&firstnrow=" + this.nrow ;
		if( this.lastnrow < this.nrow + this.step ) request += "&lastnrow=" + this.lastnrow ;
		else request += "&lastnrow=" + parseInt(this.nrow) + parseInt(this.step) ;
		AjaxSendRequest( request, this, this.onReceveAnswer ) ;
		return false ;
	},

	// A reception de la reponse AJAX
	onReceveAnswer: function( answer )
	{
		if( ayawf.mvc.updateModeleFromAjaxAnswer( this.classname, this.view, this.methode, this.updviewanyway, answer ) )
		{
			// Lance le chargement de la suite.
			if( this.nrow < this.lastnrow )
			{
				this.nrow += this.step ;
				if( this.nrow > this.lastnrow ) this.nrow = this.lastnrow ;
				ayawf.ontimer.add( new MethodeCaller( this, this.loadModeles ) ) ;
			}
		}
	}
};
