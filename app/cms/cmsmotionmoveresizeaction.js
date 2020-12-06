//Classe de gestion des actions de mouvement et retaillage progressif du CMS

function CmsMotionMoveResizeAction()
	{
	herite( CmsMotionMoveResizeAction, CmsAction, true ) ;
	herite( CmsMotionMoveResizeAction, MvcView ) ;
	this.initCmsMotionMoveResizeAction() ;
	}

CmsMotionMoveResizeAction.prototype =
	{
	// Initialise la vue sur le noeud image
	initCmsMotionMoveResizeAction: function()
		{
		this.initCmsAction() ;
		ayawf.ontimer.add( new MethodeCaller( this, this.onTimeout ) ) ;
		cms.onstart.add( new MethodeCaller( this, this.onStart ) ) ;
		this.actif = false ;		
		this.go = false ;
		this.ctime = 0 ;	
		this.cstep = 0 ;
		this.time = [] ;
		this.x = [] ;
		this.y = [] ;
		this.z = [] ;
		this.width = [] ;
		this.height = [] ;
		this.opacity = [] ;
		},
	// Calcule les valeurs de travail
	computeValues: function()
		{
		this.node_x = this.node.x ;
		this.node_y = this.node.y ;
		this.node_z = this.node.z ;
		
		//Copie les valeurs du modele
		
		this.actif = parseInt( this.modele.actif ) ;		
		this.declencheur = this.modele.declencheur ;
		
		this.time[0] = parseInt( this.modele.time1 ) ;
		this.x[0] = parseInt( this.modele.x1 ) ;
		this.y[0] = parseInt( this.modele.y1 ) ;
		this.z[0] = parseInt( this.modele.z1 ) ;
		this.width[0] = parseInt( this.modele.width1 ) ;
		this.height[0] = parseInt( this.modele.height1 ) ;
		this.opacity[0] = parseInt( this.modele.opacity1 ) ;

		this.time[1] = parseInt( this.modele.time2 ) ;
		this.x[1] = parseInt( this.modele.x2 ) ;
		this.y[1] = parseInt( this.modele.y2 ) ;
		this.z[1] = parseInt( this.modele.z2 ) ;
		this.width[1] = parseInt( this.modele.width2 ) ;
		this.height[1] = parseInt( this.modele.height2 ) ;
		this.opacity[1] = parseInt( this.modele.opacity2 ) ;
		
		this.time[2] = parseInt( this.modele.time3 ) ;
		this.x[2] = parseInt( this.modele.x3 ) ;
		this.y[2] = parseInt( this.modele.y3 ) ;
		this.z[2] = parseInt( this.modele.z3 ) ;
		this.width[2] = parseInt( this.modele.width3 ) ;
		this.height[2] = parseInt( this.modele.height3 ) ;
		this.opacity[2] = parseInt( this.modele.opacity3 ) ;

		this.time[3] = parseInt( this.modele.time4 ) ;
		this.x[3] = parseInt( this.modele.x4 ) ;
		this.y[3] = parseInt( this.modele.y4 ) ;
		this.z[3] = parseInt( this.modele.z4 ) ;
		this.width[3] = parseInt( this.modele.width4 ) ;
		this.height[3] = parseInt( this.modele.height4 ) ;
		this.opacity[3] = parseInt( this.modele.opacity4 ) ;
		
		this.time[4] = parseInt( this.modele.time5 ) ;
		this.x[4] = parseInt( this.modele.x5 ) ;
		this.y[4] = parseInt( this.modele.y5 ) ;
		this.z[4] = parseInt( this.modele.z5 ) ;
		this.width[4] = parseInt( this.modele.width5 ) ;
		this.height[4] = parseInt( this.modele.height5 ) ;
		this.opacity[4] = parseInt( this.modele.opacity5 ) ;
		
		if( this.modele.start )
			{
			this.modele.start = false ;
			this.start() ;
			}
		},
	// Passe au prochain pas actif
	nextStep: function()
		{
		this.cstep++ ;
		while( this.time[this.cstep] == -1 && this.cstep < 4 ) this.cstep++ ;
		if( this.cstep >= 4 ) return false ;

		// Calcule les valeurs pour l'execution du pas
		var i = this.cstep ;
		this.inc_x = this.x[i+1] - this.x[i] ;
		this.inc_y = this.y[i+1] - this.y[i] ;
		this.inc_z = this.z[i+1] - this.z[i] ;
		this.inc_width = this.width[i+1] - this.width[i] ;
		this.inc_height = this.height[i+1] - this.height[i] ;
		this.inc_opacity = this.opacity[i+1] - this.opacity[i] ;
		
		if( this.time[i] )
			{
			this.inc_x /= this.time[i] ;
			this.inc_y /= this.time[i] ;
			this.inc_z /= this.time[i] ;
			this.inc_width /= this.time[i] ;
			this.inc_height /= this.time[i] ;
			this.inc_opacity /= this.time[i] ;
			}		
		
		this.cx = this.x[i] + this.node_x ;
		this.cy = this.y[i] + this.node_y ;
		this.cz = this.z[i] + this.node_z ;
		this.cwidth = this.width[i] ;
		this.cheight = this.height[i] ;
		this.copacity = this.opacity[i] ;
		this.ctime = 0 ;
		return true ;
		},
	// Demarre l'action
	start: function()
		{
		this.cstep = -1 ;
		if( this.nextStep() ) this.go = true ;
		},
	// Suppression de la vue
	onRemove: function()
		{
		this.onRemoveCmsAction() ;
		ayawf.ontimer.removeFromObject( this ) ;
		cms.onstart.removeFromObject( this ) ;
		},
	// Rafraichissement de la vue
	onRefresh: function()
		{
		this.onRefreshCmsAction() ;
		this.computeValues() ;
		this.refreshAllChildViews() ;
		},
	onOpenFormulaire: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsMotionMoveResizeAction( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.x , this.y + this.element.clientHeight ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Devient selectionnée
	onGetSelected: function()
		{
		for( var i=1 ; i<6 ; i++ )
			{
			this.drawtools.push( new CmsNodeBougeur( this.modele, "x"+i, "y"+i, 
				this.node_x + this.x[i-1] , this.node_y + this.y[i-1],
			"inc/image/b_move_hv_" + i + ".bmp", 20, 20 ) ) ;

			this.drawtools.push( new CmsNodeSizer( this.modele, "x"+i, "y"+i, "width"+i, "height"+i, 
			this.node_x + this.x[i-1] + this.width[i-1], this.node_y + this.y[i-1] + this.height[i-1],
			"inc/image/b_size_hv_" + i + ".bmp", 20, 20 ) ) ;
			
			if( this.time[i-1] == -1 ) break ;
			}
		},
	// Gestion de l'evenement onmouseover
	onMouseOver: function( node )
		{
		if( this.declencheur == "onMouseOver" ) this.start() ;
		},
	// Gestion de l'evenement onmouseout
	onMouseOut: function( node )
		{
		if( this.declencheur == "onMouseOut" ) this.start() ;	
		},
	// Gestion de l'evenement onmouseout
	onClick: function( node )
		{
		if( this.declencheur == "onClick" ) this.start() ;	
		},
	// Gestion de l'evenement onmouseout
	onDblClick: function( node )
		{
		if( this.declencheur == "onDblClick" ) this.start() ;
		},
	// Au demarrage de l'action
	onStart: function()
		{
		if( this.declencheur == "onStart" ) this.start() ;
		},
	// Devient selectionnée
	onTimeout: function( time )
		{
		if( this.actif && this.go )
			{
			this.node.setDomPosition( this.cx, this.cy, this.cz ) ;
			this.node.setDomSize( this.cwidth, this.cheight ) ;
			if( this.copacity != -1 ) this.node.setDomOpacity( this.copacity ) ;
			this.cx += this.inc_x ;
			this.cy += this.inc_y ;
			this.cz += this.inc_z ;
			this.cwidth += this.inc_width ;
			this.cheight += this.inc_height ;
			this.copacity += this.inc_opacity ;
			this.ctime++ ;
			if( this.ctime >= this.time[this.cstep] )
				{
				this.node.setDomPosition( this.x[this.cstep+1] + this.node_x, this.y[this.cstep+1] + this.node_y, this.z[this.cstep+1] + this.node_z ) ;
				this.node.setDomSize( this.width[this.cstep+1], this.height[this.cstep+1] ) ;
				if( this.copacity != -1 ) this.node.setDomOpacity( this.opacity[this.cstep+1] ) ;
				if( !this.nextStep() ) this.go = false ;
				}
			}
		return true ;
		}
	};
