/*********************************************************
* Classe TnAffaireRecherche: TnSql pour une
* recherche d'affaire
*********************************************************/

function TnAffaireRecherche( modele )
	{
	herite( TnAffaireRecherche, TnSql, true ) ;
	herite( TnAffaireRecherche, TreeNode ) ;
	this.initTnAffaireRecherche( modele ) ;
	}

TnAffaireRecherche.prototype =
	{
	initTnAffaireRecherche: function( modele )
		{
		this.initTnSql( "Ensemble des listes d'affaire",
			"app/affaire/image/tn_recherche.bmp",
			"app/affaire/image/tn_recherche.bmp",
			"select count(*) from affaires where " + modele.rsqlwhere,
			"affaires",
			modele.rsqlwhere,
			"affaire desc",
			"Affaire" ) ;

		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	onRefresh: function()
		{
		this.setTexte( this.modele.recherche ) ;
		this.where = this.modele.rsqlwhere ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnAffaire( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Supprimer la liste", "delete", this, this.onDeleteModele ) ) ;
		this.menu.add( new MiCallMethode( "Créer une affaire", "new", this, this.onNewModele ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "Affaire" ) )
			this.menu.add( new MiCallMethode( "Coller une affaire", "paste", this, this.onPasteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur créer un nouveau modele
	onNewModele: function()
		{
		ayawf.mvc.newModeleToDB( "Affaire", this, this.onCreateChildNodeWithModele ) ;
		},				
	onPasteModele: function()
		{
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmAffaireRecherche( this.modele, this ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}
	} ;
