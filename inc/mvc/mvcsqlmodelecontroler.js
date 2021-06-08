/*********************************************************
* Classe MvcSqlModeleControler pour gérer des modeles
* avec leur chargement à partir d'une BD SQL
*********************************************************/

function MvcSqlModeleControler( classname, fieldsstring, table, pkindexes, fct_updateattributesfromrow )
{
	herite( MvcSqlModeleControler, MvcModeleControler ) ;
	this.initMvcSqlModeleControler( classname, fieldsstring, table, pkindexes, fct_updateattributesfromrow ) ;
}

MvcSqlModeleControler.prototype =
{
	initMvcSqlModeleControler: function( classname, fieldsstring, table, pkindexes )
	{
		this.initMvcModeleControler( classname, fieldsstring, pkindexes ) ;
		this.table = table ;
	},

	// Renvoie un modele à partir de son keystring
	getModele: function( keystring )
	{
		var modele = this.modeles[keystring] ;
		if( modele )
		{
			if( this.object ) this.methode.call( this.object, modele ) ;
			return modele ;
		}
		return this.loadModele( keystring ) ;
	},

	// Charge un modele à partir d'un keystring
	loadModeleFromKeyString: function( keystring )
	{
		var request = "sqlloadfromkeystring.php?select=" + this.select + "&table=" + this.table + "&pkstring=" + this.pkstring + "&keystring=" + keystring ;
		AjaxSendRequest( request, this, this.onReceveAnswerForLoadModele ) ;
	},

	// A reception de la reponse AJAX
	onReceveAnswerForLoadModele: function( answer )
	{
		var row = answer.split( "%%" ) ;
		var modele = this.createModeleFromRow( row ) ;
		if( this.object ) this.methode.call( this.object, modele ) ;
	}
} ;

