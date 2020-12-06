/*********************************************************
* Classe TnCmsArticleNode: TreeNode pour un appel de module
* du CMS a parir d'un article
*********************************************************/

function TnCmsArticleNode( modele )
	{
	herite( TnCmsArticleNode, TnCmsNode, true ) ;
	herite( TnCmsArticleNode, TreeNode ) ;
	this.initTnCmsArticleNode( modele ) ;
	}

TnCmsArticleNode.prototype =
	{
	initTnCmsArticleNode: function( modele )
		{
		// Initialise le treenode
		this.initTnCmsNode( "Appel de module a partir d'un article : " + modele.libelle ,
			"app/cms/image/cmsarticlenode.bmp",
			"app/cms/image/cmsarticlenode.bmp",
			modele ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( "Appel de module a partir d'un article: " + this.modele.moduletocall + " : " + this.modele.libelle ) ;
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
		this.formulairectrl.addFormulaire( new FmCmsArticleNode( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth(), document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "L'appel de module", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "L'appel de module", "delete", this, this.onDeleteModele ) ) ;
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
