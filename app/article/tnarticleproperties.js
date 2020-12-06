/*********************************************************
* Classe TnArticleProperties: TreeNode regroupant les
* propriétés d'un article
*********************************************************/

function TnArticleProperties( m_article )
	{
	herite( TnArticleProperties, TreeNode ) ;
	this.initTnArticleProperties( m_article ) ;
	}

TnArticleProperties.prototype =
	{
	initTnArticleProperties: function( m_article )
		{
		this.initTreeNode( null,
			"Propriétés",
			false,
			"app/image/tn_liste.bmp",
			"app/image/tn_liste.bmp",
			null,
			null ) ;
		this.m_article = m_article ;

		// Proprietes ApString
		this.c_childnode = new SqlSelect( "select count(*) from ap_string where rubrique is null and reference='" + m_article.reference + "'",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		// Proprietes ApStringMl
		this.c_childnode = new SqlSelect( "select count(*) from ap_stringml where rubrique is null and reference='" + m_article.reference + "'",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		// Proprietes ApImage
		this.c_childnode = new SqlSelect( "select count(*) from ap_image where rubrique is null and reference='" + m_article.reference + "'",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		// Proprietes ApTexte
		this.c_childnode = new SqlSelect( "select count(*) from ap_texte where rubrique is null and reference='" + m_article.reference + "'",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		// Proprietes ApRefArticle
		this.c_childnode = new SqlSelect( "select count(*) from ap_refarticle where rubrique is null and reference='" + m_article.reference + "'",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		// Rubrique
		this.c_childnode = new SqlSelect( "select count(*) from ap_string where rubrique is not null and reference='" + m_article.reference + "'",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		},
	// Cree les noeux fils
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = null ;
		var classname = modele.getClassname() ;
		
		// Proprietes
		if( classname == "ApString" ) tn = new TnApString( modele ) ;
		else if( classname == "ApStringMl" ) tn = new TnApStringMl( modele ) ;
		else if( classname == "ApImage" ) tn = new TnApImage( modele ) ;
		else if( classname == "ApTexte" ) tn = new TnApTexte( modele ) ;
		else if( classname == "ApRefArticle" ) tn = new TnApRefArticle( modele ) ;
		
		if( tn )
			{
			this.addChildNode( tn ) ;
			tn.onRefresh() ;
			}
		},		
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Proprietes ApString
		ayawf.mvc.loadModeleFromSqlSelect(
			"ApString",
			"ap_string" ,
			"rubrique is null and reference='" + this.m_article.reference + "'",
			"name",
			this,
			this.onCreateChildNodeWithModele,
			true ) ;
		// Proprietes ApStringMl
		ayawf.mvc.loadModeleFromSqlSelect(
			"ApStringMl",
			"ap_stringml" ,
			"rubrique is null and reference='" + this.m_article.reference + "'",
			"name",
			this,
			this.onCreateChildNodeWithModele,
			true ) ;
		// Proprietes ApImage
		ayawf.mvc.loadModeleFromSqlSelect(
			"ApImage",
			"ap_image" ,
			"rubrique is null and reference='" + this.m_article.reference + "'",
			"name",
			this,
			this.onCreateChildNodeWithModele,
			true ) ;
		// Proprietes ApTexte
		ayawf.mvc.loadModeleFromSqlSelect(
			"ApTexte",
			"ap_texte" ,
			"rubrique is null and reference='" + this.m_article.reference + "'",
			"name",
			this,
			this.onCreateChildNodeWithModele,
			true ) ;
		// Proprietes ApRefArticle
		ayawf.mvc.loadModeleFromSqlSelect(
			"ApRefArticle",
			"ap_refarticle" ,
			"rubrique is null and reference='" + this.m_article.reference + "'",
			"name",
			this,
			this.onCreateChildNodeWithModele,
			true ) ;
		// Rubrique
		
		this.c_childnode = new SqlSelect( "select distinct ap.rubrique from ap_string as ap, propertyrubrique as r where ap.rubrique = r.rubrique and reference='" + this.m_article.reference + "' order by noordre",
			0, -1,
			this,
			this.onReceveRubrique
			) ;
		},
	// Cree les noeux fils
	onReceveRubrique: function( sql )
		{
		for( var i=0 ; i<sql.rows.length ; i++ )
			{
			var tn = new TnArticleRubrique( this.m_article, sql.rows[i][0] ) ;
			this.addChildNode( tn ) ;
			tn.onRefresh() ;
			}
		},		
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmArticleProperties( this ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.m_article ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Coller une propriété", "paste", this, this.onPasteProperty ) ) ;
		//this.menu.add( new MiCallMethode( "Créer une nouvelle propriété valeur", "ApString", this, this.onNewProperty ) ) ;
		//this.menu.add( new MiCallMethode( "Créer une nouvelle propriété valeur multiligne", "ApStringMl", this, this.onNewProperty ) ) ;
		//this.menu.add( new MiCallMethode( "Créer une nouvelle propriété texte", "ApTexte", this, this.onNewProperty ) ) ;
		//this.menu.add( new MiCallMethode( "Créer une nouvelle propriété image", "ApString", this, this.onNewProperty ) ) ;
		//this.menu.add( new MiCallMethode( "Créer une nouvelle propriété référence vers un article", "ApRefArticle", this, this.onNewProperty ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller une rubrique
	onPasteProperty: function()
		{
		ayawf.mvc.addValueToRowString( "reference", this.m_article.reference ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur le noeud est sélectionné
	onNewProperty: function( classname, rubrique, name )
		{
		ayawf.mvc.addValueToRowString( "reference", this.m_article.reference ) ;
		if( rubrique ) ayawf.mvc.addValueToRowString( "rubrique", rubrique ) ;
		if( name ) ayawf.mvc.addValueToRowString( "name", name ) ;
		ayawf.mvc.newModeleToDB( classname, this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
