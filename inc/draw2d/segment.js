
// Dessine un segment

function Segment( x0, y0, x1, y1, color )
	{
	this.x0 = x0 ;
	this.y0 = y0 ;
	this.x1 = x1 ;
	this.y1 = y1 ;
	this.dx = x1 - x0 ;
	this.dy = y1 - y0 ;
	this.color = color ;
	if( this.dx != 0 ) this.dyx = this.dy / this.dx ;
	else if( this.dy != 0 ) this.dxy = this.dx / this.dy ;
	var wf = document.getElementById( "webfactory" ) ;
	wf.appendChild( this.image ) ;
	}

Segment.prototype =
	{
	dessine: function()
		{
		var wf = document.getElementById( "webfactory" ) ;
		wf.removeChild( this.image ) ;
		delete this.image ;
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
		this.image.style.left = this.x - this.image.width / 2 ;
		this.image.style.top = this.y - this.image.height / 2 ;
		},
	internalMoveTo: function( x, y )
		{
		this.x = x ;
		this.y = y ;
		if( this.x < this.xmin ) this.x = this.xmin ;
		if( this.x > this.xmax ) this.x = this.xmax ;
		if( this.y < this.ymin ) this.y = this.ymin ;
		if( this.y > this.ymax ) this.y = this.ymax ;
		this.image.style.left = this.x - this.image.width / 2 ;
		this.image.style.top = this.y - this.image.height / 2 ;
		},
	onMouseDown: function( evt )
		{
		if( this.moving == 1 )
			{
			this.moving = 0 ;
			cbougeur = null ;
			document.onmousemove = this.fct_onmousemove ;
			document.onmousedown = this.fct_onmousedown ;
			if( evt.button == 1 ) this.internalMoveTo( evt.clientX - this.dx, evt.clientY - this.dy ) ; // Bouton gauche
			else this.internalMoveTo( this.old_x, this.old_y ) ; // Bouton droit, annulation
			this.object.onBougeurAction( this, "move_end" ) ;
			}
		else if( this.moving == 2 )
			{
			this.moving-- ;
			}
		else
			{
			this.moving = 2 ;
			cbougeur = this ;
			this.old_x = this.x ;
			this.old_y = this.y ;
			this.fct_onmousemove = document.onmousemove ;
			this.fct_onmousedown = document.onmousedown ;
			document.onmousedown = onBougeurMouseDown ;
			document.onmousemove = onBougeurMouseMove ;
			this.dx = evt.clientX - this.x ;
			this.dy = evt.clientY - this.y ;
			this.object.onBougeurAction( this, "move_begin" ) ;
			return false ;
			}
		},
	onMouseMove: function( evt )
		{
		if( this.moving )
			{
			this.internalMoveTo( evt.clientX - this.dx, evt.clientY - this.dy ) ;
			this.object.onBougeurAction( this, "move" ) ;
			}
		}
	};

function onBougeurMouseDown( evt )
{
	if( !evt ) evt = window.event ;
	if( cbougeur ) cbougeur.onMouseDown( evt ) ;
	else
		{
		var idbougeur = this.getAttribute( "idbougeur" ) ;
		var bougeur = bougeurs[idbougeur] ;
		bougeur.onMouseDown( evt ) ;
		}
	return true ;
}

function onBougeurMouseMove( evt )
{
	if( !evt ) evt = window.event ;
	if( cbougeur ) cbougeur.onMouseMove( evt ) ;
}

var bougeurs = [] ;
var nbougeur = 0 ;

function addBougeur( bougeur )
{
	bougeurs[nbougeur] = bougeur ;
	return nbougeur++ ;
}
