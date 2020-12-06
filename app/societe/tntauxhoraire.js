/*********************************************************
* Classe TnTauxHoraire: TnSql pour un taux horaire
*********************************************************/

function TnTauxHoraire( modele )
	{
	herite( TnTauxHoraire, TnSql, true ) ;
	herite( TnTauxHoraire, TreeNode ) ;
	this.initTnTauxHoraire( modele ) ;
	}

TnTauxHoraire.prototype =
	{
	initTnTauxHoraire: function( modele )
		{
		this.initTnSql( "Taux horaire",
			"app/societe/image/tn_tauxhoraire.bmp",
			"app/societe/image/tn_tauxhoraire.bmp",
			"select count(*) from tauxhorairevaleur where typetaux='" + modele.typetaux + "'",
			"tauxhorairevaleur",
			"typetaux='" + modele.typetaux + "'",
			"debut desc",
			"TauxHoraireValeur" ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;			
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( this.modele.typetaux + ": " + this.modele.libelle ) ;
		},		
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnTauxHoraireValeur( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmTauxHoraire( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle période", "new", this, this.onNewObject ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "TauxHoraireValeur" ) )
			this.menu.add( new MiCallMethode( "Coller une période", "paste", this, this.onPasteObject ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller un objet
	onPasteObject: function()
		{
		ayawf.mvc.addValueToRowString( "typetaux", this.modele.typetaux ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur créer un nouvel objet
	onNewObject: function()
		{
		ayawf.mvc.addValueToRowString( "typetaux", this.modele.typetaux ) ;
		ayawf.mvc.newModeleToDB( "TauxHoraireValeur", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
