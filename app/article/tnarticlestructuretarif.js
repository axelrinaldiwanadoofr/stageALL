/*********************************************************
* Classe TnArticleStructureTarif: TreeNode pour une 
* periode associe a un taux horaire
*********************************************************/

function TnArticleStructureTarif( modele )
	{
	herite( TnArticleStructureTarif, TreeNode ) ;
	this.initTnArticleStructureTarif( modele ) ;
	}

TnArticleStructureTarif.prototype =
	{
	initTnArticleStructureTarif: function( modele )
		{
		this.initTreeNode( null,
			"Politique tarifaire",
			false,
			"app/article/image/tn_articlestructuretarif.bmp",
			"app/article/image/tn_articlestructuretarif.bmp",
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;			
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( "du " + this.modele.datedebut + " au " + this.modele.datefin + " de " + this.modele.qtemin + " à " + this.modele.qtemax + " PuHT: " + this.modele.puht_achat + " remise: " + this.modele.txremise ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmArticleStructureTarif( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier la politique tarifaire", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer la politique tarifaire", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}		
	} ;
