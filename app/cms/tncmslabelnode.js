/*********************************************************
* Classe TnCmsLabelNode: TreeNode pour un label
* multi-langue du CMS
*********************************************************/

function TnCmsLabelNode( modele )
	{
	herite( TnCmsLabelNode, TnCmsNode, true ) ;
	herite( TnCmsLabelNode, TreeNode ) ;
	this.initTnCmsLabelNode( modele ) ;
	}

TnCmsLabelNode.prototype =
	{
	initTnCmsLabelNode: function( modele )
		{
		// Initialise le treenode
		this.initTnCmsNode( "Label: " + modele.libelle ,
			"app/cms/image/cmslabelnode.bmp",
			"app/cms/image/cmslabelnode.bmp",
			modele ) ;

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
		this.setTexte( "Label: " + this.modele.libelle ) ;
		},
	onCreateChildNode: function()
		{
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
	onCreateTnCmsLabelTexte: function( modele )
		{
		var tn = new TnCmsLabelTexte( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},		
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsLabelNode( this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth(), document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier le label", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer le label", "delete", this, this.onDeleteModele ) ) ;
		this.menu.add( new MiCallMethode( "Ajouter une langue", "new", this, this.onNewCmsLabelTexte ) ) ;
		this.completeCmsActionContexteMenu() ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
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
