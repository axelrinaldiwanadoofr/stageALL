/*********************************************************
* Classe FmArticle formulaire de mise à jour des articles
*********************************************************/

var ctrlmgr = new MvcModeleControlerManager() ;

ctrlmgr.add( "Article", new MvcModeleControler(
	"Article",
	"reference,type,referencemodele,libelle,codecat,codefam,unite,debut,fin,description,icone,image",
	"0" ) ) ;

ctrlmgr.add( "PropertyRubrique", new MvcModeleControler(
	"PropertyRubrique",
	"rubrique,libelle,image",
	"0" ) ) ;

ctrlmgr.add( "ApString", new MvcModeleControler(
	"ApString",
	"reference,rubrique,name,value",
	"0,1,2" ) ) ;

ctrlmgr.add( "ApStringMl", new MvcModeleControler(
	"ApStringMl",
	"reference,rubrique,name,value",
	"0,1,2" ) ) ;

ctrlmgr.add( "ApImage", new MvcModeleControler(
	"ApImage",
	"reference,rubrique,name,fichier,width,height",
	"0,1,2" ) ) ;

ctrlmgr.add( "ApTexte", new MvcModeleControler(
	"ApTexte",
	"reference,rubrique,name,texte",
	"0,1,2" ) ) ;

ctrlmgr.add( "ApRefArticle", new MvcModeleControler(
	"ApRefArticle",
	"reference,rubrique,name,article",
	"0,1,2" ) ) ;

ctrlmgr.add( "ArticleProperties", new MvcModeleControler(
	"ArticleProperties",
	"reference",
	"0" ) ) ;

// Charge les rubriques
ctrlmgr.loadModeleFromSqlSelect( "PropertyRubrique", "select * from propertyrubrique" ) ;

function TnArticles()
	{
	herite( TnArticles, TreeNode ) ;
	this.initTnArticles() ;
	}

TnArticles.prototype =
	{
	initTnArticles: function()
		{
		this.initTreeNode( null,
			"Articles",
			true,
			"app/image/tn_articles.bmp",
			"app/image/tn_articles.bmp",
			null,
			null ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste de tous les modèles
		this.addChildNode( new TnListeArticles(
			"Tous les modèles",
			"app/image/tn_listemodele.bmp",
			"select count(*) from articles where type='Modele'",
			"select reference from articles where type='Modele' order by libelle",
			ctrlmgr ) ) ;
		// Liste de tous les articles
		this.addChildNode( new TnListeArticles(
			"Tous les articles",
			"app/image/tn_listearticle.bmp",
			"select count(*) from articles where type='Article'",
			"select reference from articles where type='Article' order by libelle",
			ctrlmgr ) ) ;
		}
	} ;

function TnSql( texte, imgopen, imgclose, sqlcount, sqlrow, classname, modelecontrolermanager )
	{
	herite( TnSql, TreeNode ) ;
	this.initTnSql( texte, imgopen, imgclose, sqlcount, sqlrow, classname, modelecontrolermanager ) ;
	}

TnSql.prototype =
	{
	initTnSql: function( texte, imgopen, imgclose, sqlcount, sqlrow, classname, modelecontrolermanager )
		{
		this.initTreeNode( null,
			texte,
			false,
			imgclose,
			imgopen ) ;
		this.sqlrow = sqlrow ;
		this.classname = classname ;
		this.modelecontrolermanager = modelecontrolermanager ;
		this.sqlcount = new SqlSelect( sqlcount,
			0, -1,
			this,
			function( sql )
				{
				if( sql.rows[0][0] ) this.setHasChild() ;
				} ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		this.modelecontrolermanager.loadModeleFromSqlSelect(
			this.classname,
			this.sqlrow,
			this,
			this.onCreateChildNodeWithModele ) ;
		}
	} ;

function TnListeArticles( texte, image, sqlcount, sqlrow, modelecontrolermanager )
	{
	herite( TnListeArticles, TnSql, true ) ;
	herite( TnListeArticles, TreeNode ) ;
	this.initTnListeArticles( texte, image, sqlcount, sqlrow, modelecontrolermanager ) ;
	}

TnListeArticles.prototype =
	{
	initTnListeArticles: function( texte, image, sqlcount, sqlrow, modelecontrolermanager )
		{
		this.initTnSql( texte,
			image,
			image,
			sqlcount,
			sqlrow,
			"Article",
			modelecontrolermanager ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnArticle( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		}
	} ;

function TnArticle( modele )
	{
	herite( TnArticle, TreeNode ) ;
	this.initTnArticle( modele ) ;
	}

TnArticle.prototype =
	{
	initTnArticle: function( modele )
		{
		this.initTreeNode( null,
			"Article",
			true,
			"app/image/tn_article.bmp",
			"app/image/tn_article.bmp",
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.reference + ": " + this.modele.rlibelle ) ;
		if( this.modele.icone != "" )
			{
			this.setCloseImage( this.modele.icone ) ;
			this.setOpenImage( this.modele.icone ) ;
			}
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		this.addChildNode( new TnArticleProperties( this.modele ) ) ;
		}
	} ;

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
			true,
			"app/image/tn_liste.bmp",
			"app/image/tn_liste.bmp",
			null,
			null ) ;
		this.modele = ctrlmgr.getModele( "ArticleProperties", m_article.reference ) ; ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		var values = this.modele.values ;
		var tnr = null ;
		var tnp = null ;
		for( var i=1 ; i < values.length ; i++ )
			{
			var t = values[i].split( "$" ) ;
			var modele = ctrlmgr.getModele( t[0], t[1] ) ;
			if( t[0] == "PropertyRubrique" )
				{
				tnr = new TnPropertyRubrique( modele ) ;
				this.addChildNode( tnr ) ;
				}
			else if( t[0] == "ApString" )
				{
				tnp = new TnApString( modele ) ;
				if( tnr ) tnr.addChildNode( tnp ) ;
				else this.addChildNode( tnp ) ;
				}
			else if( t[0] == "ApStringMl" )
				{
				tnp = new TnApStringMl( modele ) ;
				if( tnr ) tnr.addChildNode( tnp ) ;
				else this.addChildNode( tnp ) ;
				}
			else if( t[0] == "ApImage" )
				{
				tnp = new TnApImage( modele ) ;
				if( tnr ) tnr.addChildNode( tnp ) ;
				else this.addChildNode( tnp ) ;
				}
			else if( t[0] == "ApTexte" )
				{
				tnp = new TnApTexte( modele ) ;
				if( tnr ) tnr.addChildNode( tnp ) ;
				else this.addChildNode( tnp ) ;
				}
			else if( t[0] == "ApRefArticle" )
				{
				tnp = new TnApRefArticle( modele ) ;
				if( tnr ) tnr.addChildNode( tnp ) ;
				else this.addChildNode( tnp ) ;
				}
			}
		}
	} ;

function TnPropertyRubrique( modele )
	{
	herite( TnPropertyRubrique, TreeNode ) ;
	this.initTnPropertyRubrique( modele ) ;
	}

TnPropertyRubrique.prototype =
	{
	initTnPropertyRubrique: function( modele )
		{
		var image = "app/image/tn_propertyrubrique.bmp" ;
		if( modele.image != "" ) image = modele.image ;
		this.initTreeNode( null,
			modele.libelle,
			false,
			image,
			image,
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.libelle ) ;
		}
	} ;

function TnApString( modele )
	{
	herite( TnApString, TreeNode ) ;
	this.initTnApString( modele ) ;
	}

TnApString.prototype =
	{
	initTnApString: function( modele )
		{
		this.initTreeNode( null,
			modele.name + ": " + modele.value,
			false,
			"app/image/tn_property.bmp",
			"app/image/tn_property.bmp",
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.name + ": " + this.modele.value ) ;
		}
	} ;

function TnApStringMl( modele )
	{
	herite( TnApStringMl, TreeNode ) ;
	this.initTnApStringMl( modele ) ;
	}

TnApStringMl.prototype =
	{
	initTnApStringMl: function( modele )
		{
		this.initTreeNode( null,
			modele.name + ": " + modele.value,
			false,
			"app/image/tn_property.bmp",
			"app/image/tn_property.bmp",
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.name + ": " + this.modele.value ) ;
		}
	} ;

function TnApTexte( modele )
	{
	herite( TnApTexte, TreeNode ) ;
	this.initTnApTexte( modele ) ;
	}

TnApTexte.prototype =
	{
	initTnApTexte: function( modele )
		{
		this.initTreeNode( null,
			modele.name,
			false,
			"app/image/tn_property.bmp",
			"app/image/tn_property.bmp",
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.name ) ;
		}
	} ;

function TnApRefArticle( modele )
	{
	herite( TnApRefArticle, TreeNode ) ;
	this.initTnApRefArticle( modele ) ;
	}

TnApRefArticle.prototype =
	{
	initTnApRefArticle: function( modele )
		{
		this.initTreeNode( null,
			modele.name + ": " + modele.libelle,
			false,
			"app/image/tn_property.bmp",
			"app/image/tn_property.bmp",
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.name + ": " + modele.libelle ) ;
		}
	} ;

function TnApImage( modele )
	{
	herite( TnApImage, TreeNode ) ;
	this.initTnApImage( modele ) ;
	}

TnApImage.prototype =
	{
	initTnApImage: function( modele )
		{
		this.initTreeNode( null,
			modele.name,
			false,
			modele.fichier,
			modele.fichier,
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.name ) ;
		this.setOpenImage( this.modele.fichier ) ;
		this.setCloseImage( this.modele.fichier ) ;
		}
	} ;


var treeview = new TreeView() ;

treeview.addRootNode(
	new TreeNode( null,
		"Ayawf Gestion des articles",
		true,
		"app/image/tn_ayawfcms.bmp",
		"app/image/tn_ayawfcms.bmp",
		null,
		function()
			{
			this.addChildNode( new TnArticles() ) ;
			} ) ) ;
