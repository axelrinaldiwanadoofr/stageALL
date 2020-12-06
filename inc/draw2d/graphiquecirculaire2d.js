
/*********************************************************
* Classe GraphiqueCirculaire2D de dessin
*********************************************************/


function GraphiqueCirculaire2D( painter, x, y )
	{
	this.painter = painter ;
	this.x = x ;
	this.y = y ;
	this.cx = 0 ;
	this.cy = 0 ;
	this.angles = new Array() ;
	this.rayons = new Array() ;
	}

GraphiqueCirculaire2D.prototype =
	{
	// Dessine un axe radian
	drawAxeRadian: function( angle, rayon, color, libelle )
		{
		this.angles.push( angle ) ;
		var x1 = this.x + rayon * Math.cos( angle ) ;
		var y1 = this.y + rayon * Math.sin( angle ) ;
		this.painter.color = color ;
		this.painter.drawLine( this.x, this.y, x1, y1 ) ;
		if( angle > Math.PI / 2 && angle < Math.PI * 3 / 2 ) x1 -= libelle.length*7 ;
		if( angle > Math.PI ) y1 -= 20 ;
		this.painter.drawText( x1, y1, libelle ) ;
		},
	// Dessine un axe circulaire
	drawAxeCirculaire: function( rayon, color, libelle )
		{
		this.rayons.push( rayon ) ;
		this.painter.color = color ;
		this.painter.drawCircle( this.x, this.y, rayon ) ;
		var angle = Math.PI / 2 ;
		var x1 = this.x + rayon * Math.cos( angle ) ;
		var y1 = this.y + rayon * Math.sin( angle ) ;
		this.painter.drawText( x1, y1-10, libelle ) ;
		},
	// Commence une nouvelle courbe
	beginLine: function( angle, rayon, color )
		{
		this.painter.color = color ;
		var a = this.angles[angle] ;
		var r = this.rayons[rayon] ;
		this.cx = this.x + r * Math.cos( a ) ;
		this.cy = this.y + r * Math.sin( a ) ;
		},
	// Commence une figure
	addPointToLine: function( angle, rayon )
		{
		var a = this.angles[angle] ;
		var r = this.rayons[rayon] ;
		var x1 = this.x + r * Math.cos( a ) ;
		var y1 = this.y + r * Math.sin( a ) ;
		this.painter.drawLine( this.cx, this.cy, x1, y1 ) ;
		this.cx = x1 ;
		this.cy = y1 ;
		}
	} ;
