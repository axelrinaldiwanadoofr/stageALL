/*********************************************************
* Classe TnCmsPage: TreeNode pour une page du CMS
*********************************************************/

function TnCmsPage( modele )
	{
	herite( TnCmsPage, TreeNode ) ;
	this.initTnCmsPage( modele ) ;
	}

TnCmsPage.prototype =
	{
	initTnCmsPage: function( modele )
		{
		// Initialise le treenode
		this.initTreeNode( null,
			modele.page + ": " + modele.libelle,
			false,
			"app/cms/image/cmspage.bmp",
			"app/cms/image/cmspage.bmp" ) ;

		// Fixe le modele
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.page + ": " + this.modele.libelle ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsPage( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier la page", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer la page", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;
