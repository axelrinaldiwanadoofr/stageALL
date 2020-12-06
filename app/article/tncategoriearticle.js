/*********************************************************
* Classe TnCategorieArticle: TnSql pour une categorie et ses
* familles associees 
*********************************************************/

function TnCategorieArticle( modele )
	{
	herite( TnCategorieArticle, TnSql, true ) ;
	herite( TnCategorieArticle, TreeNode ) ;
	this.initTnCategorieArticle( modele ) ;
	}

TnCategorieArticle.prototype =
	{
	initTnCategorieArticle: function( modele )
		{
		this.initTnSql( "Categorie",
			"app/article/image/tn_categoriearticle.bmp",
			"app/article/image/tn_categoriearticle.bmp",
			"select count(*) from famillearticles where categorie='" + modele.categorie + "'",
			"famillearticles",
			"categorie='" + modele.categorie + "'",
			"famille",
			"FamilleArticle",
			false,
			new TnModeleFactory( 
				"app/article/image/tn_famillearticle.bmp",
				function()
					{
					this.setTexte( this.modele.famille + ": " + this.modele.libelle ) ;
					if( this.modele.image != "" )
						{
						this.setCloseImage( this.modele.image ) ;
						this.setOpenImage( this.modele.image ) ;
						}
					},
				function( formulairectrl, modele )
					{
					return new FmFamilleArticle( modele ) ;					
					},
				"Copier la famille",
				"Supprimer la famille"
				)
			) ;
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Rafraichi le noeud
	onRefresh: function()
		{
		this.setTexte( this.modele.categorie + ": " + this.modele.libelle ) ;
		if( this.modele.image != "" )
			{
			this.setCloseImage( this.modele.image ) ;
			this.setOpenImage( this.modele.image ) ;
			}
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCategorieArticle( this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier une categorie", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer une categorie", "delete", this, this.onDeleteModele ) ) ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle famille", "new", this, this.onNewModele ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "FamilleArticle" ) )
			this.menu.add( new MiCallMethode( "Coller une famille", "paste", this, this.onPasteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur créer une nouveau regroupement
	onNewModele: function()
		{
		ayawf.mvc.addValueToRowString( "categorie", this.modele.categorie ) ;
		ayawf.mvc.newModeleToDB( "FamilleArticle", this, this.onCreateChildNodeWithModele ) ;
		}		
	} ;
