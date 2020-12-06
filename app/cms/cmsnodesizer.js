


function CmsNodeSizer( modele, xfieldname, yfieldname, widthfieldname, heightfieldname, x, y, imagesrc, imgwidth, imgheight, xmin, xmax, ymin, ymax )
	{
	herite( CmsNodeSizer, Bougeur, true ) ;
	herite( CmsNodeSizer, MvcView ) ;
	this.initCmsNodeSizer( modele,  xfieldname, yfieldname, widthfieldname, heightfieldname, x, y, imagesrc, imgwidth, imgheight, xmin, xmax, ymin, ymax ) ;
	}

CmsNodeSizer.prototype =
	{
	// Initialise la vue bougeur
	initCmsNodeSizer: function( modele, xfieldname, yfieldname, widthfieldname, heightfieldname, x, y, imagesrc, imgwidth, imgheight, xmin, xmax, ymin, ymax )
		{
		this.xfieldname = xfieldname ;
		this.yfieldname = yfieldname ;
		this.widthfieldname = widthfieldname ;
		this.heightfieldname = heightfieldname ;
		this.ref_x = x ;
		this.ref_y = y ;
		this.base_x = -1 ;
		this.base_y = -1 ;

		this.computeModeleCoordinates( modele ) ;
		this.initBougeur( this.base_x + this.modele_x + this.modele_width, this.base_y + this.modele_y + this.modele_height, imagesrc, imgwidth, imgheight, xmin, xmax, ymin, ymax, modele ) ;
		},
	// Calcule les coordonnees du modele
	computeModeleCoordinates: function( modele )
		{
		this.modele_x = 0 ;
		if( this.xfieldname )
			{
			this.modele_x = modele.getValue( this.xfieldname ) ;
			if( this.modele_x != "" ) this.modele_x = parseInt( this.modele_x ) ;
			else this.modele_x = 0 ;
			}
		this.modele_y = 0 ;
		if( this.yfieldname )
			{
			this.modele_y = modele.getValue( this.yfieldname ) ;
			if( this.modele_y != "" ) this.modele_y = parseInt( this.modele_y ) ;
			else this.modele_y = 0 ;
			}			
		this.modele_width = 0 ;
		if( this.widthfieldname )
			{
			this.modele_width = modele.getValue( this.widthfieldname ) ;
			if( this.modele_width != "" ) this.modele_width = parseInt( this.modele_width ) ;
			else this.modele_width = 0 ;
			}
		if( this.base_x == -1 ) this.base_x = this.ref_x - this.modele_x - this.modele_width ;
		this.xmin = this.base_x + this.modele_x ; ;
		this.xmax = this.base_x + this.modele_x + 3000 ;
			
		this.modele_height = 0 ;
		if( this.heightfieldname )
			{
			this.modele_height = modele.getValue( this.heightfieldname ) ;
			if( this.modele_height != "" ) this.modele_height = parseInt( this.modele_height ) ;
			else this.modele_height = 0 ;
			}
		if( this.base_y == -1 ) this.base_y = this.ref_y - this.modele_y - this.modele_height ;
		this.ymin = this.base_y + this.modele_y ;
		this.ymax = this.base_y + this.modele_y + 3000 ;
		},
	// Cree les elements DOM associés
	onRefresh: function()
		{
		this.computeModeleCoordinates( this.modele ) ;
		this.moveTo( this.base_x + this.modele_x + this.modele_width, this.base_y + this.modele_y + this.modele_height ) ;
		},
	onMoveTarget: function( x, y, endmouvement )
		{
		if( this.widthfieldname )
			{
			this.modele.setValue( this.widthfieldname, x - ( this.modele_x + this.base_x ) ) ;
			}
		if( this.heightfieldname )
			{
			this.modele.setValue( this.heightfieldname, y - ( this.modele_y + this.base_y ) ) ;
			}
		this.modele.refreshAllViews( this ) ;
		if( endmouvement ) this.modele.save() ;
		}
	};
