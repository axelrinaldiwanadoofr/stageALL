/*********************************************************
* Classe TnArticleStructure: TnSql pour un lien
* article - structure
*********************************************************/

function TnArticleStructure( modele )
	{
	herite( TnArticleStructure, TnSql, true ) ;
	herite( TnArticleStructure, TreeNode ) ;
	this.initTnArticleStructure( modele ) ;
	}

TnArticleStructure.prototype =
	{
	initTnArticleStructure: function( modele )
		{
		this.initTnSql( "Fournisseurs",
			"app/article/image/tn_articlestructure.bmp",
			"app/article/image/tn_articlestructure.bmp",
			"select count(*) from articlestructuretarif where reference='" + modele.reference + "' and sid=" + modele.sid,
			"articlestructuretarif",
			"reference='" + modele.reference + "' and sid=" + modele.sid,
			"datedebut,qtemin",
			"ArticleStructureTarif" ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( this.modele.sid + ": " ) ;
		if( this.modele.sid ) var sql = new SqlSelect( "select rs from structures where sid=" + this.modele.sid, 0, -1, this, this.onReceveRs ) ;
		else this.setTexte( this.modele.sid ) ;
		},
	// Reception de la raison sociale
	onReceveRs: function( sql )
		{
		if( parseInt( this.modele.pardefaut) ) this.setTexte( "<u>" + this.modele.sid + ": " + sql.rows[0][0] + "</u> PuHT: " + this.modele.puht_achat + " remise: " + this.modele.txremise ) ;
		else this.setTexte( this.modele.sid + ": " + sql.rows[0][0] + " PuHT: " + this.modele.puht_achat + " remise: " + this.modele.txremise ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnArticleStructureTarif( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmArticleStructure() ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Creer une nouvelle politique tarifaire", "new", this, this.onNewObject ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "ArticleStructureTarif" ) )
			this.menu.add( new MiCallMethode( "Coller une politique tarifaire", "paste", this, this.onPasteObject ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller un objet
	onPasteObject: function()
		{
		ayawf.mvc.addValueToRowString( "reference", this.modele.reference ) ;
		ayawf.mvc.addValueToRowString( "sid", this.modele.sid ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur créer un nouvel objet
	onNewObject: function()
		{
		ayawf.mvc.addValueToRowString( "reference", this.modele.reference ) ;
		ayawf.mvc.addValueToRowString( "sid", this.modele.sid ) ;
		ayawf.mvc.newModeleToDB( "ArticleStructureTarif", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
