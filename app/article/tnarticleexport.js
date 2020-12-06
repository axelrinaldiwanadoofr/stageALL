/*********************************************************
* Classe TnArticleExport: TnSql pour description d'un champs 
* pour l'export d'une liste d'article
*********************************************************/

function TnArticleExport( modele )
	{
	herite( TnArticleExport, TreeNode ) ;
	this.initTnArticleExport( modele ) ;
	}

TnArticleExport.prototype =
	{
	initTnArticleExport: function( modele )
		{
		this.initTreeNode( null,
			"Champ d'export",
			false,
			"app/article/image/tn_articleexport.bmp",
			"app/article/image/tn_articleexport.bmp",
			null,
			null ) ;

		// Fixe le modele
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.etiquette + ": " + this.modele.dbfield ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmArticleExport( this ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Suprimer le champ", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;
