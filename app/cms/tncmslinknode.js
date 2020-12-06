/*********************************************************
* Classe TnCmsLinkNode: TreeNode pour un lien hyper texte
// vers un module du CMS
*********************************************************/

function TnCmsLinkNode( modele )
	{
	herite( TnCmsLinkNode, TnCmsNode, true ) ;
	herite( TnCmsLinkNode, TreeNode ) ;
	this.initTnCmsLinkNode( modele ) ;
	}

TnCmsLinkNode.prototype =
	{
	initTnCmsLinkNode: function( modele )
		{
		// Initialise le treenode
		this.initTnCmsNode( "Lien hyper texte vers un module: " + modele.libelle ,
			"app/cms/image/cmslinknode.bmp",
			"app/cms/image/cmslinknode.bmp",
			modele ) ;

		if( modele.arguments != "" ) this.setHasChild() ;
		this.c_argumemts = new SqlSelect( "select count(*) from cms_labeltexte where id=" + modele.id,
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;		
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( "Lien hyper texte vers: " + this.modele.moduletocall + " : " + this.modele.libelle ) ;
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
		// Texte multi langue
		ayawf.mvc.loadModeleFromSqlSelect(
			"CmsLabelTexte",
			"cms_labeltexte",
			"id=" + this.modele.id,
			"",
			this,
			this.onCreateTnCmsLabelTexte,
			true ) ;
		
		this.onCmsNodeCreateChildNode() ;			
		},		
	onCreateTnCmsCallArgument: function( modele )
		{
		var tn = new TnCmsCallNodeArgument( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},		
	onCreateTnCmsLabelTexte: function( modele )
		{
		var tn = new TnCmsLabelTexte( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},		
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsLinkNode( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth(), document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier le lien hyper texte", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer le lien hyper texte", "delete", this, this.onDeleteModele ) ) ;
		this.menu.add( new MiCallMethode( "Ajouter un argument", "new", this, this.onNewCmsCallArgument ) ) ;
		this.menu.add( new MiCallMethode( "Ajouter une langue", "new", this, this.onNewCmsLabelTexte ) ) ;
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
		},
	// Sur creer une nouvelle langue
	onNewCmsLabelTexte: function()
		{
		ayawf.mvc.addValueToRowString( "id", this.modele.id ) ;
		ayawf.mvc.newModeleToDB( "CmsLabelTexte", this, this.onCreateChildNodeWithNewCmsLabelTexte ) ;
		},
	// Sur ajout de la nouvelle langue crée
	onCreateChildNodeWithNewCmsLabelTexte: function( modele )
		{
		// Cree un treenode pour la nouvelle langue
		var tn = new TnCmsLabelTexte( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		}
	} ;
