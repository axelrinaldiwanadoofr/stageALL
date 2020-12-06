
/*********************************************************
* Classe Draw2D de dessin
*********************************************************/


function Draw2D( contextid )
	{
	this.context = document.getElementById( contextid ) ;
	this.width = 1 ;
	this.color = "#000" ;
	this.figures = new Array() ;
	}

Draw2D.prototype =
	{
	// Efface le dessin
	clearAll: function()
		{
		this.context.innerHTML="<div></div>" ;
		},
	// Commence une figure
	createFigure: function()
		{
		return new Array() ;
		},
	// Commence une figure
	drawFigure: function( figure )
		{
		var div = document.createElement("div");
		div.innerHTML = figure.join( "" ) ;
		this.figures[this.figures.length] = div ;
		this.context.appendChild( div ) ;
		},
	addPixelToFigure: function( figure, x, y )
		{
		figure[figure.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + x + "px;top:" + y + "px;width:" + this.width + "px;height:" + this.width + "px;background-color:" + this.color + "\">.</DIV>" ;
		},
	addTextToFigure: function( figure, x, y, text )
		{
		var l = text.length ;
		figure[figure.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + x + "px;top:" + y + "px;width:" + l*10 + "px\">" + text + "</DIV>" ;
		},
	// Dessine un pixel
	drawPixel: function( x, y )
		{
		var figure = this.createFigure() ;
		this.addPixelToFigure( figure, x, y ) ;
		this.drawFigure( figure ) ;
		},
	// Dessine une ligne
	drawLine: function( x0, y0, x1, y1 )
		{
		var figure = this.createFigure() ;
		if( x1 != x0 )
			{
			var cx = x1 - x0 ;
			var cy = y1 - y0 ;
			var nb = 0 ;
			if( cx > 0 ) nb = cx ;
			else nb = -cx ;
			if( cy < nb && cy > -nb )
				{
				cy = (y1-y0)/Math.abs(x1-x0) ;
				if( cx > 0 ) cx = 1 ;
				else cx = -1 ;
				}
			else
				{
				cx = (x1-x0)/Math.abs(y1-y0) ;
				if( cy > 0 )
					{
					nb = cy ;
					cy = 1 ;
					}
				else
					{
					nb = -cy ;
					cy = -1 ;
					}
				}
			var x = x0 ;
			var y = y0 ;
			var i ;
			for( i=0 ; i<nb ; i++ )
				{
				this.addPixelToFigure( figure, x, y ) ;
				x += cx ;
				y += cy ;
				}
			}
		this.drawFigure( figure ) ;
		},
	// Dessine un cercle
	drawCircle: function( xc, yc, rayon )
		{
		var figure = this.createFigure() ;
		var i ;
		var nb = 2*Math.PI*rayon + 1 ;
		var ra = 2*Math.PI / nb ;
		var aa = 0.0 ;

		for( i=0 ; i<nb ; i++ )
			{
			x = xc + rayon * Math.cos( aa ) ;
			y = yc + rayon * Math.sin( aa ) ;
			this.addPixelToFigure( figure, x, y ) ;
			aa += ra ;
			}
		this.drawFigure( figure ) ;
		},
	// Dessine du texte
	drawText: function( x, y, text )
		{
		var figure = this.createFigure() ;
		this.addTextToFigure( figure, x, y, text ) ;
		this.drawFigure( figure ) ;
		}
	} ;
