
/*********************************************************
* Classe GraphiqueCirculaire2D de dessin
*********************************************************/


function GraphiqueCirculaire2D( painter, x, y )
	{
	this.painter = painter ;
	this.x = x ;
	this.y = y ;
	this.axeradians = new Array() ;
	this.axecirculaires = new Array() ;
	}

GraphiqueCirculaire2D.prototype =
	{
	// Commence une figure
	add: function( axe )
		{
		if( axe.classname == "GcAxeRadian" ) this.axeradians.push( axe ) ;
		if( axe.classname == "GcAxeCirculaire" ) this.axecirculaires.push( axe ) ;
		},

	draw: function()
		{
		var i ;
		for( i=0 ; i<this.axeradians.length ; i++ )	this.axeradians[i].draw( this.painter, this.x, this.y ) ;
		for( i=0 ; i<this.axecirculaires.length ; i++ )	this.axecirculaires[i].draw( this.painter, this.x, this.y ) ;
		},
	} ;

function GcAxeRadian( angle, rayon, color, libelle )
	{
	this.angle = angle ;
	this.rayon = rayon ;
	this.color = color ;
	this.libelle = libelle ;
	this.classname = "GcAxeRadian" ;
	}

GcAxeRadian.prototype =
	{
	// Commence une figure
	draw: function( painter, x, y )
		{
		var x1 = x + this.rayon * Math.cos( this.angle ) ;
		var y1 = y + this.rayon * Math.sin( this.angle ) ;
		painter.color = this.color ;
		painter.drawLine( x, y, x1, y1 ) ;
		if( this.angle > Math.PI / 2 && this.angle < Math.PI * 3 / 2 ) x1 -= this.libelle.length*7 ;
		if( this.angle > Math.PI ) y1 -= 20 ;
		painter.drawText( x1, y1, this.libelle ) ;
		}
	};

function GcAxeCirculaire( rayon, color, libelle )
	{
	this.rayon = rayon ;
	this.color = color ;
	this.libelle = libelle ;
	this.classname = "GcAxeCirculaire" ;
	}

GcAxeCirculaire.prototype =
	{
	// Commence une figure
	draw: function( painter, x, y )
		{
		painter.color = this.color ;
		painter.drawCircle( x, y, this.rayon ) ;
		}
	};
