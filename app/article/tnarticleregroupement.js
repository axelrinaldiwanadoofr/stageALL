/*********************************************************
* Classe TnArticleRegroupement: TnSql pour un
* regroupement d'article
*********************************************************/

function TnArticleRegroupement( modele )
	{
	herite( TnArticleRegroupement, TnSql, true ) ;
	herite( TnArticleRegroupement, TreeNode ) ;
	this.initTnArticleRegroupement( modele ) ;
	}

TnArticleRegroupement.prototype =
	{
	initTnArticleRegroupement: function( modele )
		{
		this.initTnSql( "Définitions des regroupements d'article",
			"app/image/tn_articleregroupement.bmp",
			"app/image/tn_articleregroupement.bmp",
			"select count(*) from articleregroupement where pere='" + modele.regroupement + "'",
			"articleregroupement",
			"pere='" + modele.regroupement + "'",
			"regroupement",
			"ArticleRegroupement" ) ;

		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	onRefresh: function()
		{
		this.setTexte( this.modele.regroupement + ": " + this.modele.libelle ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnArticleRegroupement( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmArticleRegroupement( this.fcarticleregroupement, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer un nouveau regroupement", "new", this, this.onNewArticleRegroupement ) ) ;
		this.menu.add( new MiCallMethode( "Copier le regroupement", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer le regroupement", "delete", this, this.onDeleteModele ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "ArticleRegroupement" ) )
			this.menu.add( new MiCallMethode( "Coller un regroupement", "paste", this, this.onPasteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur créer une nouveau regroupement
	onNewArticleRegroupement: function()
		{
		ayawf.mvc.addValueToRowString( "pere", this.modele.regroupement ) ;
		ayawf.mvc.newModeleToDB( "ArticleRegroupement", this, this.onCreateChildNodeWithModele ) ;
		}		
	} ;
