/*********************************************************
* Classe TnAffaires: TreeNode racine pour les affaires
*********************************************************/

function TnAffaires()
	{
	herite( TnAffaires, TreeNode ) ;
	this.initTnAffaires() ;
	}

TnAffaires.prototype =
	{
	initTnAffaires: function()
		{
		this.initTreeNode( null,
			"Affaires",
			true,
			"app/affaire/image/tn_affaires.bmp",
			"app/affaire/image/tn_affaires.bmp",
			null,
			null ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste des affaires courantes
		this.addChildNode( new TnCurrentAffaires() ) ;
		
		// Liste de toutes les recherches
		ayawf.mvc.loadModeleFromSqlSelect(
			"AffaireRecherche",
			"affairerecherche",
			"",
			"recherche",			
			this,
			this.onCreateTnAffaireRecherche ) ;

		// Liste des affaires par clients
		this.addChildNode( new TnClientAffaires() ) ;						
		},
	// Appelée pour chaque recherche d'article
	onCreateTnAffaireRecherche: function( modele )
		{
		var tn = new TnAffaireRecherche( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		//this.formulairectrl = new FormulaireControler() ;
		//this.formulairectrl.addFormulaire( new FmArticleRecherche() ) ;
		//this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle liste multi-criteres", "new", this, this.onNewAffaireRecherche ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur créer une nouvelle recherche
	onNewAffaireRecherche: function()
		{
		ayawf.mvc.newModeleToDB( "AffaireRecherche", this, this.onCreateTnAffaireRecherche ) ;
		}		
	} ;
