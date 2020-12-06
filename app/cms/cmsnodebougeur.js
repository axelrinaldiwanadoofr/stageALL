


function CmsNodeBougeur( modele, xfieldname, yfieldname, x, y, imagesrc, width, height, xmin, xmax, ymin, ymax )
	{
	herite( CmsNodeBougeur, Bougeur, true ) ;
	herite( CmsNodeBougeur, MvcView ) ;
	this.initCmsNodeBougeur( modele,  xfieldname, yfieldname, x, y, imagesrc, width, height, xmin, xmax, ymin, ymax ) ;
	}

CmsNodeBougeur.prototype =
	{
	// Initialise la vue bougeur
	initCmsNodeBougeur: function( modele, xfieldname, yfieldname, x, y, imagesrc, width, height, xmin, xmax, ymin, ymax )
		{
		this.xfieldname = xfieldname ;
		this.yfieldname = yfieldname ;
		this.ref_x = x ;
		this.ref_y = y ;
		this.base_x = -1 ;
		this.base_y = -1 ;

		this.computeModeleCoordinates( modele ) ;
		
		this.initBougeur( this.base_x + this.modele_x, this.base_y + this.modele_y, imagesrc, width, height, xmin, xmax, ymin, ymax, modele ) ;
		},
	// Calcule les coordonnees du modele
	computeModeleCoordinates: function( modele )
		{
		if( this.xfieldname )
			{
			this.modele_x = modele.getValue( this.xfieldname ) ;
			if( this.modele_x != "" ) this.modele_x = parseInt( this.modele_x ) ;
			else this.modele_x = 0 ;
			}
		if( this.base_x == -1 ) this.base_x = this.ref_x - this.modele_x ;
		if( this.yfieldname )
			{
			this.modele_y = modele.getValue( this.yfieldname ) ;
			if( this.modele_y != "" ) this.modele_y = parseInt( this.modele_y ) ;
			else this.modele_y = 0 ;
			}			
		if( this.base_y == -1 ) this.base_y = this.ref_y - this.modele_y ;
		},
	// Cree les elements DOM associés
	onRefresh: function()
		{
		this.computeModeleCoordinates( this.modele ) ;
		this.moveTo( this.base_x + this.modele_x, this.base_y + this.modele_y ) ;
		},
	onMoveTarget: function( x, y, endmouvement )
		{
		if( this.xfieldname )
			{
			this.modele.setValue( this.xfieldname, x - this.base_x ) ;
			}
		if( this.yfieldname )
			{
			this.modele.setValue( this.yfieldname, y - this.base_y ) ;
			}
		this.modele.refreshAllViews( this ) ;
		if( endmouvement ) this.modele.save() ;
		}
	};
