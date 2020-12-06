/*********************************************************
* Classe TnListeArticles: TnSql pour une liste d'article
*********************************************************/

function TnListeArticles( texte, image, sqlcount, from, where, orderby )
	{
	herite( TnListeArticles, TnSql, true ) ;
	herite( TnListeArticles, TreeNode ) ;
	this.initTnListeArticles( texte, image, sqlcount, from, where, orderby ) ;
	}

TnListeArticles.prototype =
	{
	initTnListeArticles: function( texte, image, sqlcount, from, where, orderby )
		{
		this.initTnSql( texte,
			image,
			image,
			sqlcount,
			from,
			where,
			orderby,
			"Article" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnArticle( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer un nouvel article", "new", this, this.onNewArticle ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "Article" ) )
			this.menu.add( new MiCallMethode( "Coller un article", "paste", this, this.onPasteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur créer une nouveau regroupement
	onNewArticle: function()
		{
		ayawf.mvc.newModeleToDB( "Article", this, this.onCreateChildNodeWithModele ) ;
		}				
	} ;
