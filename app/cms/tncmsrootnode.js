/*********************************************************
* Classe TnCmsRootNode: TreeNode pour un noeud racine
* d'une version de module: CmsRootNode
*********************************************************/

function TnCmsRootNode( modele )
	{
	herite( TnCmsRootNode, TnCmsNode, true ) ;
	herite( TnCmsRootNode, TreeNode ) ;
	this.initTnCmsRootNode( modele ) ;
	}

TnCmsRootNode.prototype =
	{
	initTnCmsRootNode: function( modele )
		{
		this.initTnCmsNode( "Racine (" + modele.id + ")",
			"app/cms/image/cmsrootnode.bmp",
			"app/cms/image/cmsrootnode.bmp",
			modele ) ;
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( "Racine: " + this.modele.libelle ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsRootNode( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier le noeud", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer le noeud", "delete", this, this.onDeleteModele ) ) ;
		this.completeCmsNodeContexteMenu() ;
		this.completeCmsActionContexteMenu() ;
		this.menu.add( new MiCallMethode( "Créer une fondue enchainee", "CmsFondueAction", this, this.onNewCmsAction ) ) ;
		this.menu.add( new MiCallMethode( "Créer une galerie", "CmsGalerieAction", this, this.onNewCmsAction ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;

