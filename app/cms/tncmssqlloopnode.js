/*********************************************************
* Classe TnCmsSqlLoopNode: TreeNode pour un appel de module
* du CMS
*********************************************************/

function TnCmsSqlLoopNode( modele )
	{
	herite( TnCmsSqlLoopNode, TnCmsNode, true ) ;
	herite( TnCmsSqlLoopNode, TreeNode ) ;
	this.initTnCmsSqlLoopNode( modele ) ;
	}

TnCmsSqlLoopNode.prototype =
	{
	initTnCmsSqlLoopNode: function( modele )
		{
		// Initialise le treenode
		this.initTnCmsNode( "Boucle SQL d'appel de module : " + modele.libelle ,
			"app/cms/image/cmssqlloopnode.bmp",
			"app/cms/image/cmssqlloopnode.bmp",
			modele ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( "Boucle SQL d'appel de module: " + this.modele.moduletocall + " : " + this.modele.libelle ) ;
		},
	onCreateChildNode: function()
		{
		var args = this.modele.arguments.split( "<arg>" ) ;
		for( var i=0 ; i<args.length ; i++ )
			{
			arg = args[i].split( "<argsep>" ) ;
			var tn = new TnCmsCallNodeArgument( this.modele, arg[0] ) ;
			this.addChildNode( tn ) ;
			tn.onRefresh() ;
			}		
		this.onCmsNodeCreateChildNode() ;			
		},		
	onCreateTnCmsCallArgument: function( modele )
		{
		var tn = new TnCmsCallNodeArgument( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},		
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsSqlLoopNode( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth(), document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier la boucle SQL d'appel", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer la boucle SQL d'appel", "delete", this, this.onDeleteModele ) ) ;
		this.menu.add( new MiCallMethode( "Ajouter un argument", "new", this, this.onNewCmsCallArgument ) ) ;
		this.completeCmsActionContexteMenu() ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur creer une nouvelle langue
	onNewCmsCallArgument: function()
		{
		ayawf.mvc.addValueToRowString( "id", this.modele.id ) ;
		ayawf.mvc.newModeleToDB( "CmsCallArgument", this, this.onCreateChildNodeWithNewCmsCallArgument ) ;
		},
	// Sur ajout de le nouvel argument
	onCreateChildNodeWithNewCmsCallArgument: function( modele )
		{
		// Cree un treenode pour le nouvel argument
		var tn = new TnCmsCallArgument( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		}
	} ;
