/*********************************************************
* Classe TnCmsNode: TreeNode pour un noeud de base du CMS
*********************************************************/

function TnCmsNode( modele )
	{
	herite( TnCmsNode, TreeNode ) ;
	this.initTnCmsNode( modele ) ;
	}

TnCmsNode.prototype =
	{
	initTnCmsNode: function( texte, imgclose, imgopen, modele )
		{
		this.initTreeNode( null,
			texte,
			false,
			imgclose,
			imgopen ) ;
					
		this.c_childnode = new SqlSelect( "select count(*) from cms_node where idparent=" + modele.id,
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;

		this.c_action = new SqlSelect( "select count(*) from cms_action where idnode=" + modele.id,
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
				
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( "CmsNode (" + this.modele.id + ")" ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		this.onCmsNodeCreateChildNode() ;
		},		
	onCmsNodeCreateChildNode: function()
		{
		// Noeud fils
		ayawf.mvc.loadModeleFromSqlSelect(
			"CmsNode",
			"cms_node" ,
			"idparent=" + this.modele.id,
			"",
			this,
			this.onCreateChildNodeWithModele,
			true ) ;
			
		// Actions
		ayawf.mvc.loadModeleFromSqlSelect(
			"CmsAction",
			"cms_action",
			"idnode=" + this.modele.id,
			"noordre",
			this,
			this.onCreateChildNodeWithModele,
			true ) ;
		},		
	// Cree les noeux fils
	onCreateChildNodeWithModele: function( modele )
		{
		var tn ;
		var classname = modele.getClassname() ;
		
		// Noeud du CMS
		if( classname == "CmsLabelNode" ) tn = new TnCmsLabelNode( modele ) ;
		else if( classname == "CmsImageNode" ) tn = new TnCmsImageNode( modele ) ;
		else if( classname == "CmsRootNode" ) tn = new TnCmsRootNode( modele ) ;
		else if( classname == "CmsCallNode" ) tn = new TnCmsCallNode( modele ) ;
		else if( classname == "CmsLinkNode" ) tn = new TnCmsLinkNode( modele ) ;
		else if( classname == "CmsSqlLoopNode" ) tn = new TnCmsSqlLoopNode( modele ) ;
		else if( classname == "CmsArticleNode" ) tn = new TnCmsArticleNode( modele ) ;

		// Action du CMS
		else if( classname == "CmsMotionMoveResizeAction" ) tn = new TnCmsMotionMoveResizeAction( modele ) ;
		else if( classname == "CmsFondueAction" ) tn = new TnCmsFondueAction( modele ) ;
		else if( classname == "CmsGalerieAction" ) tn = new TnCmsGalerieAction( modele ) ;
		else if( classname == "CmsSequenceAction" ) tn = new TnCmsSequenceAction( modele ) ;
		
		if( tn )
			{
			this.addChildNode( tn ) ;
			tn.onRefresh() ;
			}
		},		
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsNode( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.completeContexteMenu() ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Menu d'ajout de noeud
	completeCmsNodeContexteMenu: function()
		{
		this.menu.add( new MiCallMethode( "Coller un noeud", "paste", this, this.onPasteCmsNode ) ) ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle racine", "CmsRootNode", this, this.onNewCmsNode ) ) ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle image", "CmsImageNode", this, this.onNewCmsNode ) ) ;
		this.menu.add( new MiCallMethode( "Créer un nouveau texte", "CmsLabelNode", this, this.onNewCmsNode ) ) ;
		this.menu.add( new MiCallMethode( "Créer un nouvel appel de module", "CmsCallNode", this, this.onNewCmsNode ) ) ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle boucle SQL d'appel de module", "CmsSqlLoopNode", this, this.onNewCmsNode ) ) ;
		this.menu.add( new MiCallMethode( "Créer un nouveau lien hyper texte de module", "CmsLinkNode", this, this.onNewCmsNode ) ) ;
		this.menu.add( new MiCallMethode( "Créer un nouvel appel de module a partir d'un article", "CmsArticleNode", this, this.onNewCmsNode ) ) ;
		},
	// Menu d'ajout d'action
	completeCmsActionContexteMenu: function()
		{
		this.menu.add( new MiCallMethode( "Créer un mouvement progressif", "CmsMotionMoveResizeAction", this, this.onNewCmsAction ) ) ;
		this.menu.add( new MiCallMethode( "Créer une sequence d'actions", "CmsSequenceAction", this, this.onNewCmsAction ) ) ;
		},
	// Sur coller une rubrique
	onPasteCmsNode: function()
		{
		ayawf.mvc.addValueToRowString( "module", this.modele.module ) ;
		ayawf.mvc.addValueToRowString( "version", this.modele.version ) ;
		ayawf.mvc.addValueToRowString( "idparent", this.modele.id ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur le noeud est sélectionné
	onNewCmsNode: function( classname )
		{
		ayawf.mvc.addValueToRowString( "module", this.modele.module ) ;
		ayawf.mvc.addValueToRowString( "version", this.modele.version ) ;
		ayawf.mvc.addValueToRowString( "idparent", this.modele.id ) ;
		ayawf.mvc.addValueToRowString( "type", classname ) ;
		ayawf.mvc.newModeleToDB( classname, this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur le noeud est sélectionné
	onNewCmsAction: function( classname )
		{
		ayawf.mvc.addValueToRowString( "module", this.modele.module ) ;
		ayawf.mvc.addValueToRowString( "version", this.modele.version ) ;
		ayawf.mvc.addValueToRowString( "idnode", this.modele.id ) ;
		ayawf.mvc.addValueToRowString( "type", classname ) ;
		ayawf.mvc.newModeleToDB( classname, this, this.onCreateChildNodeWithModele ) ;
		}
	} ;

