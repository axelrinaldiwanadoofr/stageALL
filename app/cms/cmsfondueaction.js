//Classe de gestion des actions de fondue du CMS

function CmsFondueAction()
{
	herite( CmsFondueAction, CmsAction, true ) ;
	herite( CmsFondueAction, MvcView ) ;
	this.initCmsFondueAction() ;
}

CmsFondueAction.prototype =
{
	// Initialise la vue sur le noeud image
	initCmsFondueAction: function()
	{
		this.initCmsAction() ;
		ayawf.ontimer.add( new MethodeCaller( this, this.onTimeout ) ) ;
		cms.onstart.add( new MethodeCaller( this, this.onStart ) ) ;
		this.actif = false ;
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

		//Copie les valeurs du modele
		this.actif = parseInt( this.modele.actif ) ;		
		this.timepause = parseInt( this.modele.timepause ) ;
		this.timefondue = parseInt( this.modele.timefondue ) ;
		
		this.zforhide = parseInt( this.modele.zforhide ) ;
		this.zforshow = parseInt( this.modele.zforshow ) ;

		// Calcule l'increment d'opacite
		if( this.timefondue > 0 )
		{
			this.opacityinc = 100.0 / this.timefondue ;
			this.opacity = 0.0 ;
		}
		else
		{
			this.opacity = 0.0 ;
		}		
		this.refreshAllChildViews() ;
	},
	
	// Au demarrage de l'action
	onStart: function()
	{
		//Copie les valeurs du modele
		this.actif = parseInt( this.modele.actif ) ;		
		this.timepause = parseInt( this.modele.timepause ) ;
		this.timefondue = parseInt( this.modele.timefondue ) ;
		
		// Calcule l'increment d'opacite
		if( this.timefondue > 0 )
		{
			this.opacityinc = 100.0 / this.timefondue ;
			this.opacity = 0.0 ;
		}
		else
		{
			this.opacity = 0.0 ;
		}
		this.icurrentchild = 0 ;
		this.ipreviouschild = -1 ;
		this.time = this.timepause + 1 ;
		
		// Cache tous les noeux fils de la racine sauf le premier
		var nb = this.node.childs.length ;
		for( var i=0 ; i<nb ; i++ )
		{
			this.node.childs[i].setDomOpacity( 0 ) ;
		}
		if( nb > 0 ) 
		{
			this.node.childs[0].setDomOpacity( 100 ) ;
		}
	},

	onOpenFormulaire: function()
	{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsFondueAction( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.x , this.y + this.element.clientHeight ) ;
		this.formulairectrl.setModele( this.modele ) ;
	},

	// Devient selectionn�e
	onGetSelected: function()
	{
	},

	// Devient selectionn�e
	onTimeout: function( time )
	{
		if( this.actif )
		{
			if( this.time >= this.timepause )
			{
				// Passe a l'image suivante
				this.ipreviouschild = this.icurrentchild ;
				this.icurrentchild++ ;
				if( this.icurrentchild >= this.node.childs.length ) this.icurrentchild = 0 ;
				var current = this.node.childs[this.icurrentchild] ;
				var previous = this.node.childs[this.ipreviouschild] ;
				// Met a 0 l'opacite de l'image courante
				this.opacity = 0.0 ;
				this.time = 0 ;
			}
			if( ayawf.opacityok && this.time < this.timefondue )
			{
				// Augmente progressivement l'opacite de l'image courante
				this.opacity += this.opacityinc ;
				if( ayawf.opacityok && this.timefondue > 0 ) 
				{
					this.node.childs[this.icurrentchild].setDomOpacity( this.opacity ) ;
					this.node.childs[this.ipreviouschild].setDomOpacity( 100 - this.opacity ) ;
				}
			}
			this.time++ ;
		}		
		return true ;
	}
};
