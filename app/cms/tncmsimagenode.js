/*********************************************************
* Classe TnCmsImageNode: TreeNode pour un noeud image
* du CMS
*********************************************************/

function TnCmsImageNode( modele )
	{
	herite( TnCmsImageNode, TnCmsNode, true ) ;
	herite( TnCmsImageNode, TreeNode ) ;
	this.initTnCmsImageNode( modele ) ;
	}

TnCmsImageNode.prototype =
	{
	initTnCmsImageNode: function( modele )
		{
		var image = "app/cms/image/cmsimagenode.bmp" ;
		if( modele.filename != "" ) image = modele.filename ;
		this.initTnCmsNode( 
			"Image " + modele.filename,
			image,
			image,
			modele ) ;
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( this.modele.filename ) ;
		var image = "app/cms/image/cmsimagenode.bmp" ;
		if( this.modele.filename != "" ) image = this.modele.filename ;
		this.setOpenImage( image ) ;
		this.setCloseImage( image ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsImageNode( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier le noeud image", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer le noeud image", "delete", this, this.onDeleteModele ) ) ;
		this.completeCmsActionContexteMenu() ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;

