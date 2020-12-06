/*********************************************************
* Classe TnContactRecherche: TnSql pour une
* recherche de structure
*********************************************************/

function TnContactRecherche( modele )
	{
	herite( TnContactRecherche, TnSql, true ) ;
	herite( TnContactRecherche, TreeNode ) ;
	this.initTnContactRecherche( modele ) ;
	}

TnContactRecherche.prototype =
	{
	initTnContactRecherche: function( modele )
		{
		this.initTnSql( "Ensemble des listes de contact",
			"app/image/tn_recherche.bmp",
			"app/image/tn_recherche.bmp",
			"select count(*) from structurecontacts where " + modele.rsqlwhere,
			"structurecontacts",
			modele.rsqlwhere,
			"nom,prenom",
			"StructureContact" ) ;

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
		var tn = new TnContact( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Supprimer la liste", "delete", this, this.onDeleteModele ) ) ;
		this.menu.add( new MiCallMethode( "Créer un nouveau contact", "new", this, this.onNewModele ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "StructureContact" ) )
			this.menu.add( new MiCallMethode( "Coller un contact", "paste", this, this.onPasteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur créer un nouveau modele
	onNewModele: function()
		{
		ayawf.mvc.newModeleToDB( "StructureContact", this, this.onCreateChildNodeWithModele ) ;
		},				
	onPasteModele: function()
		{
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmContactRecherche( this.modele, this ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}
	} ;
