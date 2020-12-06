/*********************************************************
* Classe TnCmsModule: TreeNode pour un module du CMS
*********************************************************/

function TnCmsModule( modele )
	{
	herite( TnCmsModule, TreeNode ) ;
	this.initTnCmsModule( modele ) ;
	}

TnCmsModule.prototype =
	{
	initTnCmsModule: function( modele )
		{
		// Initialise le treenode
		this.initTreeNode( null,
			modele.module + ": " + modele.libelle,
			false,
			"app/cms/image/cmsmodule.bmp",
			"app/cms/image/cmsmodule.bmp" ) ;
					
		this.c_childnode = new SqlSelect( "select count(*) from cms_moduleversion where module='" + modele.module + "'",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;

		this.c_action = new SqlSelect( "select count(*) from cms_moduleargument where module='" + modele.module + "'",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
				
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.module + ": " + this.modele.libelle ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		this.onCmsNodeCreateChildNode() ;
		},		
	onCmsNodeCreateChildNode: function()
		{
		// Versions
		ayawf.mvc.loadModeleFromSqlSelect(
			"CmsModuleVersion",
			"cms_moduleversion" ,
			"module='" + this.modele.module + "'",
			"version",
			this,
			this.onCreateChildNodeWithModele,
			true ) ;
			
		// Arguments
		ayawf.mvc.loadModeleFromSqlSelect(
			"CmsModuleArgument",
			"cms_moduleargument" ,
			"module='" + this.modele.module + "'",
			"name",
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
		if( classname == "CmsModuleVersion" ) tn = new TnCmsModuleVersion( modele ) ;
		else if( classname == "CmsModuleArgument" ) tn = new TnCmsModuleArgument( modele ) ;
		
		if( tn )
			{
			this.addChildNode( tn ) ;
			tn.onRefresh() ;
			}
		},		
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsModule( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier le module", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer le module", "delete", this, this.onDeleteModele ) ) ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle version", "new", this, this.onNewCmsModuleVersion ) ) ;
		this.menu.add( new MiCallMethode( "Créer un nouvel argument", "new", this, this.onNewCmsModuleArgument ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "CmsModuleVersion" ) )
			this.menu.add( new MiCallMethode( "Coller une version", "paste", this, this.onPasteCmsModuleVersion ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller une version de module
	onPasteCmsModuleVersion: function()
		{
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateTnCmsModuleVersionFromCopy ) ;
		},
	// Sur créer une nouvelle version de module
	onNewCmsModuleVersion: function()
		{
		ayawf.mvc.addValueToRowString( "module", this.modele.module ) ;
		ayawf.mvc.newModeleToDB( "CmsModuleVersion", this, this.onCreateChildNodeWithModele ) ;
		},
	// Appelée pour chaque nouvelle version créée
	onCreateTnCmsModuleVersionFromCopy: function( modele )
		{
		// Cree un treenode pour la nouvelle version
		var tn = new TnCmsModuleVersion( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		// Met à jour le champ module de la nouvelle version
		modele.setValue( "module", this.module ) ;
		modele.save() ;
		},		
	// Sur créer un nouvel argument
	onNewCmsModuleArgument: function()
		{
		ayawf.mvc.addValueToRowString( "module", this.modele.module ) ;
		ayawf.mvc.newModeleToDB( "CmsModuleArgument", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
