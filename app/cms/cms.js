/**************************************************************************************************
* 
* Ensemble des objets du CMS
*
* Axel Rinaldi 08/2011
***************************************************************************************************/


function Cms( admin, x, y, z, width, height )
	{
	this.initCms( admin, x, y, z, width, height ) ;
	}

Cms.prototype =
	{
	initCms: function( admin, x, y, z, width, height )
		{
		this.width = width ;
		this.height = height ;
		this.x = x ;
		this.y = y ;
		this.z = z ;
		
		this.viewcontroler = new MvcViewControler( "cms" ) ;
		this.viewcontroler.createDomObject() ;
				
		if( x || y || z ) this.viewcontroler.setPosition( x, y, z ) ;
		this.rootnode = null ;
		this.parentnodes = [] ;
		this.cparentnode = null ;
		this.parentactions = [] ;
		this.cparentaction = null ;
		this.admin = admin ;
		this.selectedview = null ;
		this.onstart = new MethodeCallerManager() ; // Manager de caller pour le demarrage des actions
		// Programme l'evenement onLoad
		ayawf.onload.add( new MethodeCaller( this, this.onLoad ) ) ;		
		},
	// Ajoute une vue d'un noeud et lui associe le modele correspondant.
	pushNodeView: function( view, modeleclassname, modelekeystring, idx )
		{
		this.cparentnode = view ;
		this.parentnodes.push( view ) ;
		if( !this.rootnode ) this.rootnode = view ;
		view.setViewControler( this.viewcontroler ) ;
		this.viewcontroler.addView( view ) ;
		view.linkDomObject( idx ) ;
		view.setModele( ayawf.mvc.getModele( modeleclassname, modelekeystring ) ) ;
		return view ;
		},
	// Ajoute une vue sur une action et lui associe le modele correspondant.
	pushActionView: function( view, modeleclassname, modelekeystring )
		{
		this.cparentaction = view ;
		this.parentactions.push( view ) ;
		view.setViewControler( this.viewcontroler ) ;
		this.viewcontroler.addView( view ) ;
		view.setModele( ayawf.mvc.getModele( modeleclassname, modelekeystring ) ) ;
		return view ;
		},
	// Depile une vue sur un noeud de la pile des parents
	popNodeView: function()
		{
		this.parentnodes.pop() ;
		var n = this.parentnodes.length ;
		if( n ) this.cparentnode = this.parentnodes[n-1] ;
		else this.cparentnode = null ;
		},
	// Depile une vue sur une action de la pile des parents
	popActionView: function()
		{
		this.parentactions.pop() ;
		var n = this.parentactions.length ;
		if( n ) this.cparentaction = this.parentactions[n-1] ;
		else this.cparentaction = null ;
		},
	// Charge un module au travers d'AJAX
	loadCmsModule: function( module, version )
		{
		// Supprime les vues existante
		this.parentnodes = [] ;
		this.cparentnode = null ;
		this.rootnode = null ;
		this.parentactions = [] ;
		this.cparentaction = null ;
		this.viewcontroler.removeAllViews() ;
		this.completeCmsDom() ;
		
		// Lance le chargement
		var request = "cmsbackofficeloadmodule.php5?config=" + config + "&module=" + module ;
		if( version ) request += "&version=" + version ;
		AjaxSendForExecute( request ) ;
		},
	// Change la position de la zone d'affichage du CMS
	setPosition: function( x, y, z )
		{
		this.x = x ;
		this.y = y ;
		this.z = z ;
		this.viewcontroler.setPosition( x, y, z ) ;
		this.imagefond.style.left = this.x ;
		this.imagefond.style.top = this.y ;
		this.imagefond.style.zIndex = -50 ;
		if( this.rootnode ) this.rootnode.onRefresh() ;
		},
	// Rafraichie toutes les vue de maniere arborescente
	refreshAllViews: function()
		{
		if( this.rootnode ) this.rootnode.onRefresh() ;
		},
	// Comlete le DOM du CMS
	completeCmsDom: function()
		{
		this.imagefond = document.createElement( "IMG" ) ;
		this.imagefond.src = "app/cms/image/rectangle_blanc.bmp" ;
		this.imagefond.style.left = this.x ;
		this.imagefond.style.top = this.y ;
		this.imagefond.width = this.width ;
		this.imagefond.height = this.height ;
		this.imagefond.className = "cmsimagefond" ;
		var root = document.getElementById( "root" ) ;
		root.appendChild( this.imagefond ) ;

		//this.viewcontroler.element.appendChild( this.imagefond ) ;
		},
	// Rafraichie toutes les vue de maniere arborescente
	createAllDomObjectFromHtml: function( html )
		{
		this.viewcontroler.createDomObjectFromHtml( html ) ;
		},
	// Traitement apres le chargement d'une page
	startAllActions: function()
		{
		this.onstart.Call() ;
		},
	// Traitement apres le chargement d'une page
	onLoad: function()
		{
		this.refreshAllViews() ;
		this.onstart.Call() ;
		}
	}


