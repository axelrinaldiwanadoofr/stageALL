/*********************************************************
* Classe TnCmsModuleVersion: TreeNode pour une version de 
* module du CMS
*********************************************************/

function TnCmsModuleVersion( modele )
	{
	herite( TnCmsModuleVersion, TnSql, true ) ;
	herite( TnCmsModuleVersion, TreeNode ) ;
	this.initTnCmsModuleVersion( modele ) ;
	}

TnCmsModuleVersion.prototype =
	{
	initTnCmsModuleVersion: function( modele )
		{
		// Définie le texte à afficher
		var texte ;
		if( parseInt( modele.actif ) )	texte = modele.version + " (publiée) : " + modele.libelle ;
		else texte = modele.version + " (non publiée) : " + modele.libelle ;
		// Initialise le treenode
		this.initTnSql( texte,
			"app/cms/image/cmsmoduleversion.bmp",
			"app/cms/image/cmsmoduleversion.bmp",
			"select count(*) from cms_node where module='" + modele.module + "' and version='" + modele.version + "' and type='CmsRootNode' and idparent is null",
			"cms_node",
			"module='" + modele.module + "' and version='" + modele.version + "' and type='CmsRootNode' and idparent is null",
			"",
			"CmsNode",
			true ) ;

		// Fixe le modele
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		if( parseInt( this.modele.actif ) )	this.setTexte( this.modele.version + " (publiée) : " + this.modele.libelle ) ;
		else this.setTexte( this.modele.version + " (non publiée) : " + this.modele.libelle ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnCmsRootNode( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},				
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsModuleVersion( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Afficher la version", "copy", this, this.onShowVersion ) ) ;
		this.menu.add( new MiCallMethode( "Créer un nouveau noeud racine", "CmsRootNode", this, this.onNewCmsRootNode ) ) ;
		this.menu.add( new MiCallMethode( "Coller un noeud racine", "paste", this, this.onPasteCmsNode ) ) ;
		this.menu.add( new MiCallMethode( "Copier la version", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer la version", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	onShowVersion: function()
		{
		cms.loadCmsModule( this.modele.module, this.modele.version ) ;
		cms.setPosition( this.treeview.getX() + this.treeview.getWidth() + 10, 0, 0 ) ;
		},
	// Sur coller une rubrique
	onPasteCmsNode: function()
		{
		ayawf.mvc.addValueToRowString( "module", this.modele.module ) ;
		ayawf.mvc.addValueToRowString( "version", this.modele.version ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur le noeud est sélectionné
	onNewCmsRootNode: function( classname )
		{
		ayawf.mvc.addValueToRowString( "module", this.modele.module ) ;
		ayawf.mvc.addValueToRowString( "version", this.modele.version ) ;
		//ayawf.mvc.addValueToRowString( "idparent",  ) ;
		ayawf.mvc.addValueToRowString( "type", classname ) ;
		ayawf.mvc.newModeleToDB( classname, this, this.onCreateChildNodeWithModele ) ;
		}		
	} ;
