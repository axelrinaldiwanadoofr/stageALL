/*********************************************************
* Classe TnCmsModuleArgument: TreeNode pour un argument
* de module du CMS
*********************************************************/

function TnCmsModuleArgument( modele )
	{
	herite( TnCmsModuleArgument, TreeNode ) ;
	this.initTnCmsModuleArgument( modele ) ;
	}

TnCmsModuleArgument.prototype =
	{
	initTnCmsModuleArgument: function( modele )
		{
		// Initialise le treenode
		this.initTreeNode( null,
			modele.name + ": " + modele.value,
			false,
			"app/cms/image/cmsmoduleargument.bmp",
			"app/cms/image/cmsmoduleargument.bmp" ) ;

		// Fixe le modele
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.name + ": " + this.modele.libelle + " valeur: " + this.modele.value ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsModuleArgument( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Supprimer l'argument", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;
