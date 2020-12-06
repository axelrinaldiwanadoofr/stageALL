/*********************************************************
* Classe TnPropertyRubriques: TreeNode racine pour
* les rubriques et propriétés
*********************************************************/

function TnPropertyRubriques()
	{
	herite( TnPropertyRubriques, TreeNode ) ;
	this.initTnPropertyRubriques() ;
	}

TnPropertyRubriques.prototype =
	{
	initTnPropertyRubriques: function()
		{
		// Recupere l'image
		var image = "app/image/tn_propertyrubrique.bmp" ;

		// Initialise le treenode
		this.initTreeNode( null,
			"Propriétés et rubriques",
			false,
			image,
			image ) ;

		// Compte les sous rubriques
		var sqlcount = "select count(*) from propertyrubrique where rubriqueparent is null" ;
		this.sqlcount = new SqlSelect( sqlcount,
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;

		// Compte les propriétés
		var sqlcount = "select count(*) from property where rubrique='ROOT'" ;
		this.sqlcount = new SqlSelect( sqlcount,
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		},
	onCreateChildNode: function()
		{
		// Liste des rubriques
		ayawf.mvc.loadModeleFromSqlSelect(
			"PropertyRubrique",
			"propertyrubrique",
			"rubriqueparent is null",
			"noordre",
			this,
			this.onCreateTnPropertyRubrique ) ;

		// Liste de propriétés
		ayawf.mvc.loadModeleFromSqlSelect(
			"Property",
			"property",
			"rubrique='ROOT'",
			"noordre",
			this,
			this.onCreateTnProperty ) ;
		},

	// Appelée pour chaque rubrique
	onCreateTnPropertyRubrique: function( modele )
		{
		var tn = new TnPropertyRubrique( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Appelée pour chaque propriété
	onCreateTnProperty: function( modele )
		{
		var tn = new TnProperty( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle rubrique", "new", this, this.onNewPropertyRubrique ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "PropertyRubrique" ) )
			this.menu.add( new MiCallMethode( "Coller une rubrique", "paste", this, this.onPastePropertyRubrique ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller une rubrique
	onPastePropertyRubrique: function()
		{
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateTnPropertyRubrique ) ;
		},
	// Sur créer une nouvelle rubrique
	onNewPropertyRubrique: function()
		{
		ayawf.mvc.newModeleToDB( "PropertyRubrique", this, this.onCreateTnPropertyRubrique ) ;
		}		
	} ;
