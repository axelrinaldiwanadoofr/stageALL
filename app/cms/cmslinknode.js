//Classe de gestion des noeuds lien hyper text vers un module du CMS
//

function CmsLinkNode()
	{
	herite( CmsLinkNode, CmsNode, true ) ;
	herite( CmsLinkNode, MvcView ) ;
	this.initCmsLinkNode() ;
	}

CmsLinkNode.prototype =
	{
	// Initialise la vue sur le noeud image
	initCmsLinkNode: function()
		{
		this.initCmsNode() ;							
		},
	// Specifie le modele pour le texte dans la langue courante
	setCurrentLangTexteModele: function( textemodelekeystring )
		{
		var textemodele = ayawf.mvc.getModele( "CmsLabelTexte", textemodelekeystring ) ;
		if( textemodele )
			{
			this.textemodele = textemodele ;
			textemodele.addView( this ) ;
			}
		},
	// Appelée quand le modele est changé
	// Cree les tableaux de valeur d'argument
	onModeleChanged: function()
		{
		},		
	// Rafraichissement de la vue
	onRefresh: function()
		{
		this.onRefreshCmsNode() ;

		if( this.element && this.modele && this.textemodele )
			{
			// Dimensions
			this.element.style.width = this.modele.width ;
			// Texte
			var t = this.computeValue( this.textemodele.texte ) ;
			this.element.innerHTML = t ;
			}	
		this.refreshAllChildViews() ;			
		},
	onOpenFormulaire: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsLinkNode( this.modele ) ) ;
		this.formulairectrl.show( this.x , this.y + this.element.clientHeight ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Devient selectionnée
	onGetSelected: function()
		{
		this.drawtools.push( new CmsNodeBougeur( this.modele, "x", "y", this.x, this.y ) ) ;
		this.drawtools.push( new CmsNodeSizer( this.modele, "x", "y", "width", null, 
			this.x + parseInt( this.modele.width ), this.y,
			"inc/image/b_size_h.bmp" ) ) ;
		}
	};
