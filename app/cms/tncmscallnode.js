/*********************************************************
* Classe TnCmsCallNode: TreeNode pour un appel de module
* du CMS
*********************************************************/

function TnCmsCallNode( modele )
	{
	herite( TnCmsCallNode, TnCmsNode, true ) ;
	herite( TnCmsCallNode, TreeNode ) ;
	this.initTnCmsCallNode( modele ) ;
	}

TnCmsCallNode.prototype =
	{
	initTnCmsCallNode: function( modele )
		{
		// Initialise le treenode
		this.initTnCmsNode( "Appel de module: " + modele.libelle ,
			"app/cms/image/cmscallnode.bmp",
			"app/cms/image/cmscallnode.bmp",
			modele ) ;

		if( modele.arguments != "" ) this.setHasChild() ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( "Appel: " + this.modele.moduletocall + " : " + this.modele.libelle ) ;
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
		this.formulairectrl.addFormulaire( new FmCmsCallNode( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth(), document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier le noeud d'appel", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer le noeud d'appel", "delete", this, this.onDeleteModele ) ) ;
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
