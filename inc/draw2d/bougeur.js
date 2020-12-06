
// Objet pouvant etre bougee interactivement avec la souri
// L'argument mode defini la maniere de bouger

var cbougeur ;

function Bougeur( x, y, imagesrc, width, height, xmin, xmax, ymin, ymax, modele )
	{
	herite( Bougeur, MvcView ) ;
	this.initBougeur( x, y, imagesrc, width, height, xmin, xmax, ymin, ymax, modele ) ;
	}

Bougeur.prototype =
	{
	// Initialise la vue bougeur
	initBougeur: function( x, y, imagesrc, width, height, xmin, xmax, ymin, ymax, modele )
		{
		this.initMvcView( null, modele ) ;
		this.x = x ;
		this.y = y ;
		this.old_x = x ;
		this.old_y = y ;
		this.width = 11 ;
		if( width ) this.width = width ;
		this.height = 11 ;
		if( height ) this.height = height ;
		if( imagesrc ) this.imagesrc = imagesrc ;
		else this.imagesrc = "inc/image/b_horizontal_vertical.bmp" ;
		if( xmin ) this.xmin = xmin ;
		else this.xmin = 0 ;
		if( xmax ) this.xmax = xmax ;
		else this.xmax = 30000 ;
		if( ymin ) this.ymin = ymin ;
		else this.ymin = 0 ;
		if( ymax ) this.ymax = ymax ;
		else this.ymax = 30000 ;
		this.moving = 0 ;
		this.createDomObject() ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "IMG" ) ;
		this.element.object = this ;
		this.element.onmousedown=onBougeurMouseDown ;
		this.element.onmousmove=onBougeurMouseMove ;
		this.element.src = this.imagesrc ;
		this.element.width = this.width ;
		this.element.height = this.height ;
		this.element.style.position = "absolute" ;
		this.element.style.left = this.x - this.element.width / 2 ;
		this.element.style.top = this.y - this.element.height / 2 ;
		this.element.style.zIndex = 500 ;
		var wf = document.getElementById( "webfactory" ) ;
		wf.appendChild( this.element ) ;
		},
	onRemove: function()
		{
		var wf = document.getElementById( "webfactory" ) ;
		wf.removeChild( this.element ) ;
		delete this.element ;
		},
	onMoveTarget: function( x, y, endmouvement )
		{
		},
	moveTo: function( x, y )
		{
		var sxmin = this.xmin - this.x ;
		var sxmax = this.xmax - this.x ;
		var symin = this.ymin - this.y ;
		var symax = this.ymax - this.y ;

		this.x = x ;
		this.y = y ;
		this.xmin = x + sxmin ;
		this.xmax = x + sxmax ;
		this.ymin = y + symin ;
		this.xmax = y + symax ;
		this.element.style.left = this.x - this.element.width / 2 ;
		this.element.style.top = this.y - this.element.height / 2 ;
		},
	internalMoveTo: function( x, y )
		{
		this.x = x ;
		this.y = y ;
		if( this.x < this.xmin ) this.x = this.xmin ;
		if( this.x > this.xmax ) this.x = this.xmax ;
		if( this.y < this.ymin ) this.y = this.ymin ;
		if( this.y > this.ymax ) this.y = this.ymax ;
		this.element.style.left = this.x - this.element.width / 2 ;
		this.element.style.top = this.y - this.element.height / 2 ;
		},
	onMouseDown: function( evt )
		{
		if( !cbougeur )
			{
			// Demarrage du mouvement
			cbougeur = this ;
			this.moving = 0 ;
			this.old_x = this.x ;
			this.old_y = this.y ;
			this.fct_onmousemove = document.onmousemove ;
			this.fct_onmousedown = document.onmousedown ;
			document.onmousemove = onBougeurMouseMove ;
			document.onmousedown = onBougeurMouseDown ;
			this.internalMoveTo( evt.clientX + document.body.scrollLeft, evt.clientY + document.body.scrollTop ) ;
			}
		else if( cbougeur == this ) 
			{
			if( this.moving )
				{
				// Arret du mouvement
				this.moving = 0 ;
				cbougeur = null ;
				document.onmousemove = this.fct_onmousemove ;
				document.onmousedown = this.fct_onmousedown ;
				if( evt.button == 2 ) 
					{
					// Bouton droit, annulation
					this.internalMoveTo( this.old_x, this.old_y ) ; 
					this.onMoveTarget( this.old_x, this.old_y, true ) ;
					}
				else 
					{
					// Bouton gauche
					this.internalMoveTo( evt.clientX + document.body.scrollLeft, evt.clientY + document.body.scrollTop ) ;
					this.onMoveTarget( this.x, this.y, true ) ;
					}
				}
			}
		},
	onMouseMove: function( evt )
		{
		if( cbougeur == this )
			{
			this.moving = 1 ;
			this.internalMoveTo( evt.clientX + document.body.scrollLeft, evt.clientY + document.body.scrollTop ) ;
			this.onMoveTarget( this.x, this.y, false ) ;
			
			// Scrolle automatiquement la fenetre
			if( evt.clientX > document.body.clientWidth - 30 )
				{
				window.scrollBy( 30, 0 ) ;
				}
			if( evt.clientY > document.body.clientHeight - 30 )
				{
				window.scrollBy( 0, 30 ) ;
				}
			if( evt.clientX < 20 )
				{
				window.scrollBy( -20, 0 ) ;
				}
			if( evt.clientY < 20 )
				{
				window.scrollBy( 0, -20 ) ;
				}
			}
		}
	};

function onBougeurMouseDown( evt )
{
	if( !evt ) evt = window.event ;
	if( cbougeur ) 	cbougeur.onMouseDown( evt ) ;
	else
		{
		var bougeur = this.object ;
		if( bougeur ) bougeur.onMouseDown( evt ) ;
		}
	return false ;
}

function onBougeurMouseMove( evt )
{
	if( !evt ) evt = window.event ;
	if( cbougeur ) cbougeur.onMouseMove( evt ) ;
}
