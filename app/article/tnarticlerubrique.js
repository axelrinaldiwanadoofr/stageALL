/*********************************************************
* Classe TnArticleRubrique: TreeNode regroupant les
* propriétés d'un article
*********************************************************/

function TnArticleRubrique( m_article, rubrique )
	{
	herite( TnArticleRubrique, TreeNode ) ;
	this.initTnArticleRubrique( m_article, rubrique ) ;
	}

TnArticleRubrique.prototype =
	{
	initTnArticleRubrique: function( m_article, rubrique )
		{
		this.initTreeNode( null,
			"Rubrique",
			false,
			"app/article/image/tn_articlerubrique.bmp",
			"app/article/image/tn_articlerubrique.bmp",
			null,
			null ) ;
		this.m_article = m_article ;
		this.rubrique = rubrique ;

		// Proprietes ApString
		this.c_childnode = new SqlSelect( "select count(*) from ap_string where reference='" + m_article.reference + "' and rubrique='" + this.rubrique + "'",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		// Proprietes ApStringMl
		this.c_childnode = new SqlSelect( "select count(*) from ap_stringml where reference='" + m_article.reference + "' and rubrique='" + this.rubrique + "'",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		// Proprietes ApImage
		this.c_childnode = new SqlSelect( "select count(*) from ap_image where reference='" + m_article.reference + "' and rubrique='" + this.rubrique + "'",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		// Proprietes ApTexte
		this.c_childnode = new SqlSelect( "select count(*) from ap_texte where reference='" + m_article.reference + "' and rubrique='" + this.rubrique + "'",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		// Proprietes ApRefArticle
		this.c_childnode = new SqlSelect( "select count(*) from ap_refarticle where reference='" + m_article.reference + "' and rubrique='" + this.rubrique + "'",
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		},
	// Rafraichi le noeud
	onRefresh: function()
		{
		this.setTexte( this.rubrique ) ;
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
			"reference='" + this.m_article.reference + "' and rubrique='" + this.rubrique + "'",
			"name",
			this,
			this.onCreateChildNodeWithModele,
			true ) ;
		// Proprietes ApStringMl
		ayawf.mvc.loadModeleFromSqlSelect(
			"ApStringMl",
			"ap_stringml" ,
			"reference='" + this.m_article.reference + "' and rubrique='" + this.rubrique + "'",
			"name",
			this,
			this.onCreateChildNodeWithModele,
			true ) ;
		// Proprietes ApImage
		ayawf.mvc.loadModeleFromSqlSelect(
			"ApImage",
			"ap_image" ,
			"reference='" + this.m_article.reference + "' and rubrique='" + this.rubrique + "'",
			"name",
			this,
			this.onCreateChildNodeWithModele,
			true ) ;
		// Proprietes ApTexte
		ayawf.mvc.loadModeleFromSqlSelect(
			"ApTexte",
			"ap_texte" ,
			"reference='" + this.m_article.reference + "' and rubrique='" + this.rubrique + "'",
			"name",
			this,
			this.onCreateChildNodeWithModele,
			true ) ;
		// Proprietes ApRefArticle
		ayawf.mvc.loadModeleFromSqlSelect(
			"ApRefArticle",
			"ap_refarticle" ,
			"reference='" + this.m_article.reference + "' and rubrique='" + this.rubrique + "'",
			"name",
			this,
			this.onCreateChildNodeWithModele,
			true ) ;
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
		ayawf.mvc.addValueToRowString( "rubrique", this.rubrique ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur le noeud est sélectionné
	onNewProperty: function( classname, rubrique, name )
		{
		ayawf.mvc.addValueToRowString( "reference", this.m_article.reference ) ;
		ayawf.mvc.addValueToRowString( "rubrique", this.rubrique ) ;
		if( name ) ayawf.mvc.addValueToRowString( "name", name ) ;
		ayawf.mvc.newModeleToDB( classname, this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
