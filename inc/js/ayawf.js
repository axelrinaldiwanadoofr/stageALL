/**************************************************************************************************
* 
* Classe de base des outils AYAWF
*
* Axel Rinaldi 08/2011
***************************************************************************************************/


/*********************************************************
* Classe Ayawf 
*********************************************************/

function Ayawf()
{
	this.initAyawf() ;
}

Ayawf.prototype =
{
	initAyawf: function()
	{
		// Ensemble des outils basiques
		this.tools = new Tools() ;

		this.opacityok = true ; // Permet de stopper les traitements d'opacite qui ralentissent tout
		this.sessionid ; // Numero de session
		
		// Gestionnaire des controleurs MVC
		this.mvc = new MvcModeleControlerManager() ;
		
		// Gestion du timer
		this.ontimer = new MethodeCallerManager() ; // Manager de caller pour le timer
		this.time = 0 ; // Compteur de timeout ;
		this.timerenable = true ; // Marche/arret du timer
		this.elapsetime = 10 ; // Temps de timeout
		
		// Gestion des événements liés à la fenetre
		this.onload = new MethodeCallerManager() ; // Manager de caller pour la prise en compte du chargement de la fenetre
		this.onresize = new MethodeCallerManager() ; // Manager de caller pour la prise en compte du retaillage de la fenetre
	},

	// Au déclenchement du timer
	onTimeout: function()
	{
		if( this.timerenable )
		{
			this.ontimer.CallOneTimeA1( this.time ) ;
			this.time++ ;
		}
		window.setTimeout('onTimeout()', this.elapsetime );
	},

	// Au chargement da la page
	onLoad: function()
	{
		this.onload.Call() ;
	},

	// Au changement de taille
	onResize: function()
	{
		this.onresize.Call() ;
	}
};

// Crée une instance de Ayawf
var ayawf = new Ayawf() ;
	
// Fonction appelee au chargement
function onLoad()
{
	ayawf.onLoad() ;
}

// Fonction appelee au changment de taille de la fenetre
function onResize()
{
	ayawf.onResize() ;
}

// Fonction appelee par le timer
function onTimeout()
{
	ayawf.onTimeout() ;
}
	
window.onload = onLoad ;
window.onresize = onResize ;
window.setTimeout('onTimeout()', 10 );
