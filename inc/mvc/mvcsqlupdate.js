/*********************************************************
* Classe MvcSqlUpdate pour updater un modele en BD
* classname: Classe des objets à charger
* keystring: chaine indentifiante de l'objet à mettre à jour
* rowstring: chaine de donnée de l'objet pour la mise à jour
* mainclassname: classe de l'objet principal
* mainkeystring: chaine indentifiante de l'objet principal à mettre à jour
*********************************************************/


function MvcSqlUpdate( classname, keystring, rowstring, mainclassname, mainkeystring, view, methode )
{
	this.initMvcSqlUpdate( classname, keystring, rowstring, mainclassname, mainkeystring, view, methode ) ;
}

MvcSqlUpdate.prototype =
{
	initMvcSqlUpdate: function( classname, keystring, rowstring, mainclassname, mainkeystring, view, methode )
	{
		this.classname = classname ;
		this.keystring = keystring ;
		this.rowstring = rowstring ;
		this.mainclassname = mainclassname ;
		this.mainkeystring = mainkeystring ;
		this.view = view ;
		this.methode = methode ;
	},

	updateModele: function()
	{
		var request_head = "mvcsqlupdate.php?classname=" + this.classname ;
		if( this.mainclassname ) request_head += "&mainclassname=" + this.mainclassname ;
		if( this.mainkeystring ) request_head += "&mainkeystring=" + this.mainkeystring ;
		request_head += "&keystring=" + ayawf.tools.prepare_to_send( this.keystring ) ;
		
		var data = ayawf.tools.prepare_to_send( this.rowstring ) ;
		var length = data.length ;
		var nbr = length/400 ;
		for( var i=0 ; i<nbr ; i++ )
		{
			var starti = i*400 ;
			var endi = (i+1)*400 ;
			if( endi >= length ) endi = length ;
			var request_data = data.substring( starti, endi ) ; 
			if( !i ) 
			{
				if( nbr < 1 ) var request = request_head + "&state=startend&rowstring=" + request_data ;
				else var request = request_head + "&state=start&rowstring=" + request_data ;
			}
			else if( i >= nbr-1 ) var request = request_head + "&state=end&rowstring=" + request_data ;
			else var request = request_head + "&state=continue&rowstring=" + request_data ;
			AjaxSendRequest( request, this, this.onReceveAnswer ) ;
		}
		return false ;
	},

	// A reception de la reponse AJAX
	onReceveAnswer: function( answer )
	{
		ayawf.mvc.updateModeleFromAjaxAnswer( this.classname, this.view, this.methode, false, answer ) ;
	}
};
