//Classe de gestion des actions de Galerie du CMS

function CmsGalerieAction()
	{
	herite( CmsGalerieAction, CmsAction, true ) ;
	herite( CmsGalerieAction, MvcView ) ;
	this.initCmsGalerieAction() ;
	}

CmsGalerieAction.prototype =
	{
	// Initialise la vue sur le noeud image
	initCmsGalerieAction: function()
		{
		this.initCmsAction() ;
		ayawf.ontimer.add( new MethodeCaller( this, this.onTimeout ) ) ;
		cms.onstart.add( new MethodeCaller( this, this.onStart ) ) ;
		this.actif = false ;
		
		this.icurrentchild = 0 ;
		this.time = 0 ;
		
		// Cree la grande image
		this.image = document.createElement( "IMG" ) ;
		this.image.style.display = "none" ;
		this.image.style.position = "absolute" ;
		cms.viewcontroler.element.appendChild( this.image ) ;		
		},
	// Positionne les images des noeuds fils pour contituer le banderau ainsi que l'image principale
	showGalerie: function()
		{
		var i ;
		var h = this.icurrentchild ;
		var n = this.node.childs.length ;
		// Cache toutes les images
		for( var i=0 ; i<n && this.countvisible ; i++ )
			{
			var c = this.node.childs[i] ;
			c.setDomVisible( false ) ;
			}
		// Affiche les countvisible images
		for( var i=0 ; i<this.countvisible && n ; i++ )
			{
			var c = this.node.childs[h] ;
			c.setDomPosition( this.x+i*(this.width+this.marge), this.y, this.z ) ;
			c.setDomSize( this.width, this.height ) ;
			c.setDomVisible( true ) ;
			h++ ;
			if( h >= n ) h = 0 ;
			}

		// Repositionne l'image principale
		if( this.widthview && this.heightview )
			{
			this.image.style.width = this.widthview ;
			this.image.style.height = this.heightview ;
			this.image.style.left = this.x + this.xview ;
			this.image.style.top = this.y + this.yview ;
			this.image.style.zIndex = this.z ;
			this.image.style.display = "block" ;
			}
		if( this.node.childs[this.icurrentchild].element.src )
		this.image.src = this.node.childs[this.icurrentchild].getDomImage() ;
		},
	// Suppression de la vue
	onRemove: function()
		{
		this.onRemoveCmsAction() ;
		ayawf.ontimer.removeFromObject( this ) ;
		cms.onstart.removeFromObject( this ) ;
		delete this.image ;
		},
	// Rafraichissement de la vue
	onRefresh: function()
		{
		this.onRefreshCmsAction() ;

		this.x = this.node.x ;
		this.y = this.node.y ;
		this.z = this.node.z ;
		
		//Copie les valeurs du modele
		
		this.actif = parseInt( this.modele.actif ) ;		
		this.width = parseInt( this.modele.width ) ;
		this.height = parseInt( this.modele.height ) ;
		this.countvisible = parseInt( this.modele.countvisible ) ;
		this.marge = parseInt( this.modele.marge ) ;
		this.timepause = parseInt( this.modele.timepause ) ;
		this.xview = parseInt( this.modele.xview ) ;
		this.yview = parseInt( this.modele.yview ) ;
		this.widthview = parseInt( this.modele.widthview ) ;
		this.heightview = parseInt( this.modele.heightview ) ;
		
		this.showGalerie() ;
		
		this.refreshAllChildViews() ;
		},
	// Au demarrage de l'action
	onStart: function()
		{
		this.x = this.node.x ;
		this.y = this.node.y ;
		this.actif = parseInt( this.modele.actif ) ;		
		this.width = parseInt( this.modele.width ) ;
		this.height = parseInt( this.modele.height ) ;
		this.countvisible = parseInt( this.modele.countvisible ) ;
		this.marge = parseInt( this.modele.marge ) ;
		this.timepause = parseInt( this.modele.timepause ) ;
		this.xview = parseInt( this.modele.xview ) ;
		this.yview = parseInt( this.modele.yview ) ;
		this.widthview = parseInt( this.modele.widthview ) ;
		this.heightview = parseInt( this.modele.heightview ) ;
			
		// Ajoute l'action sur les noeux fils pour gestion de l'evenement onMouseOver 
		for( var i=0 ; i< this.node.childs.length ; i++ )  this.node.childs[i].addAction( this ) ;
		
		this.showGalerie() ;
		},
	onOpenFormulaire: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsGalerieAction( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.x , this.y + this.element.clientHeight ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Devient selectionnée
	onGetSelected: function()
		{
		this.drawtools.push( new CmsNodeBougeur( this.modele, "xview", "yview", 
			this.x + parseInt( this.modele.xview ), this.y + parseInt( this.modele.yview ) ) ) ;
			
		this.drawtools.push( new CmsNodeSizer( this.modele, "xview", "yview", "widthview", "heightview", 
			this.x + parseInt( this.modele.xview ) + parseInt( this.modele.widthview ), this.y + parseInt( this.modele.yview ) + parseInt( this.modele.heightview ),
			"inc/image/b_size_hv_reel.bmp", 20, 20 ) ) ;
			
		this.drawtools.push( new CmsNodeSizer( this.modele, null, null, "width", "height", 
			this.x + parseInt( this.modele.width ), this.y + parseInt( this.modele.height ),
			"inc/image/b_size_hv_affiche.bmp", 20, 20 ) ) ;
		},
	// Gestion de l'evenement onmouseover
	onMouseOver: function( node )
		{
		this.image.src = node.getDomImage() ;		
		},
	// Devient selectionnée
	onTimeout: function( time )
		{
		if( this.actif )
			{
			if( this.time >= this.timepause )
				{
				this.time = 0 ;
				this.icurrentchild++ ;
				if( this.icurrentchild >= this.node.childs.length ) this.icurrentchild = 0 ;
				this.showGalerie() ;
				}
			this.time++ ;
			}
		return true ;
		}
	};
