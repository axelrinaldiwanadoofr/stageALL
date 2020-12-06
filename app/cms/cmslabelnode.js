//Classe de gestion des noeuds label du CMS

function CmsLabelNode( idx, parentidx )
	{
	herite( CmsLabelNode, CmsNode, true ) ;
	herite( CmsLabelNode, MvcView ) ;
	this.initCmsLabelNode( idx, parentidx ) ;
	}

CmsLabelNode.prototype =
	{
	// Initialise la vue sur le noeud image
	initCmsLabelNode: function( idx, parentidx )
		{
		this.initCmsNode( idx, parentidx ) ;
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
		this.formulairectrl.addFormulaire( new FmCmsLabelNode( this.modele ) ) ;
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
		},
	getDomElementSize: function()
		{
		if( this.element ) return this.element.style.width ;
		else return 0 ;
		},
	setDomElementSize: function( value )
		{
		if( this.element ) this.element.style.width = value ;
		},
	getDomElementTexte: function()
		{
		if( this.element ) return this.element.innerHTML ;
		else return "" ;
		},
	setDomElementTexte: function( value )
		{
		if( this.element ) this.element.innerHTML = value ;
		}
	};
