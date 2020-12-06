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
			true,
			"app/image/tn_liste.bmp",
			"app/image/tn_liste.bmp",
			null,
			null ) ;
		this.m_article = m_article ;
		
		// Compte les proprietes
		var sqlcount = "select count(*) from ap_string where reference='" + m_article + "'" ;
		this.sqlcount = new SqlSelect( sqlcount,
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		
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
			var modele = ayawf.mvc.getModele( t[0], t[1] ) ;
			if( t[0] == "PropertyRubrique" )
				{
				tnr = new TnArticlePropertyRubrique( modele ) ;
				this.addChildNode( tnr ) ;
				}
			else if( t[0] == "ApString" )
				{
				tnp = new TnApString( modele ) ;
				if( tnr ) tnr.addChildNode( tnp ) ;
				else this.addChildNode( tnp ) ;
				tnp.onRefresh() ;
				}
			else if( t[0] == "ApStringMl" )
				{
				tnp = new TnApStringMl( modele ) ;
				if( tnr ) tnr.addChildNode( tnp ) ;
				else this.addChildNode( tnp ) ;
				tnp.onRefresh() ;
				}
			else if( t[0] == "ApImage" )
				{
				tnp = new TnApImage( modele ) ;
				if( tnr ) tnr.addChildNode( tnp ) ;
				else this.addChildNode( tnp ) ;
				tnp.onRefresh() ;
				}
			else if( t[0] == "ApTexte" )
				{
				tnp = new TnApTexte( modele ) ;
				if( tnr ) tnr.addChildNode( tnp ) ;
				else this.addChildNode( tnp ) ;
				tnp.onRefresh() ;
				}
			else if( t[0] == "ApRefArticle" )
				{
				tnp = new TnApRefArticle( modele ) ;
				if( tnr ) tnr.addChildNode( tnp ) ;
				else this.addChildNode( tnp ) ;
				tnp.onRefresh() ;
				}
			}
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmArticleProperties() ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.m_article ) ;
		}		
	} ;
