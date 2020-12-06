/*********************************************************
* Classe TnPropertyRubrique: TreeNode pour une rubrique de
* propriété
*********************************************************/

function TnPropertyRubrique( modele )
	{
	herite( TnPropertyRubrique, TreeNode ) ;
	this.initTnPropertyRubrique( modele ) ;
	}

TnPropertyRubrique.prototype =
	{
	initTnPropertyRubrique: function( modele )
		{
		// Recupere l'image
		var image = "app/image/tn_propertyrubrique.bmp" ;
		if( modele.image != "" ) image = modele.image ;

		// Initialise le treenode
		this.initTreeNode( null,
			modele.libelle,
			false,
			image,
			image ) ;

		// Compte les sous rubriques
		var sqlcount = "select count(*) from propertyrubrique where rubriqueparent='" + modele.rubrique + "'" ;
		this.sqlcount = new SqlSelect( sqlcount,
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;

		// Compte les propriétés
		var sqlcount = "select count(*) from property where rubrique='" + modele.rubrique + "'" ;
		this.sqlcount = new SqlSelect( sqlcount,
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;

		// Fixe le modele
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.rubrique + ": " + this.modele.libelle ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste de sous rubriques
		ayawf.mvc.loadModeleFromSqlSelect(
			"PropertyRubrique",
			"propertyrubrique",
			"rubriqueparent='" + this.modele.rubrique + "'",
			"noordre",
			this,
			this.onCreateTnPropertyRubrique ) ;

		// Liste de propriétés
		ayawf.mvc.loadModeleFromSqlSelect(
			"Property",
			"property",
			"rubrique='" + this.modele.rubrique + "'",
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
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmPropertyRubrique( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier la rubrique", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer la rubrique", "delete", this, this.onDeleteModele ) ) ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle rubrique", "new", this, this.onNewPropertyRubrique ) ) ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle propriété", "new", this, this.onNewProperty ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "PropertyRubrique" ) )
			this.menu.add( new MiCallMethode( "Coller une rubrique", "paste", this, this.onPastePropertyRubrique ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "Property" ) )
			this.menu.add( new MiCallMethode( "Coller une propriété", "paste", this, this.onPasteProperty ) ) ;
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
		ayawf.mvc.addValueToRowString( "rubriqueparent", this.modele.rubrique ) ;
		ayawf.mvc.newModeleToDB( "PropertyRubrique", this, this.onCreateTnPropertyRubrique ) ;
		},
	// Sur coller une propriété
	onPasteProperty: function()
		{
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateTnProperty ) ;
		},
	// Sur créer une nouvelle propriété
	onNewProperty: function()
		{
		ayawf.mvc.addValueToRowString( "rubrique", this.modele.rubrique ) ;
		ayawf.mvc.newModeleToDB( "Property", this, this.onCreateTnProperty ) ;
		}
	} ;
