
/*********************************************************
* Classe FfEtiquette affiche un champ d'une vue dans un
* element DOM de type LABEL
*********************************************************/

function FfEtiquette( texte )
	{
	this.initFfEtiquette( texte )
	}

FfEtiquette.prototype =
	{
	initFfEtiquette: function( texte )
		{
		this.texte = texte ;
		this.createDomObject() ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "LABEL" ) ;
		this.element.className = "etiquette" ;
		var t = ayawf.tools.prepare_to_show( this.texte ) ;
		this.element.innerHTML = t ;
		},
	remove: function()
		{
		},
	setTexte: function( texte )
		{
		var t = ayawf.tools.prepare_to_show( texte ) ;
		if( this.element ) this.element.innerHTML = t ;
		},
	getTexte: function()
		{
		if( this.element ) return this.element.innerHTML ;
		return null ;
		}
	} ;
