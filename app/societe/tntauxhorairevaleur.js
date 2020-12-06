/*********************************************************
* Classe TnTauxHoraireValeur: TreeNode pour une 
* periode associe a un taux horaire
*********************************************************/

function TnTauxHoraireValeur( modele )
	{
	herite( TnTauxHoraireValeur, TreeNode ) ;
	this.initTnTauxHoraireValeur( modele ) ;
	}

TnTauxHoraireValeur.prototype =
	{
	initTnTauxHoraireValeur: function( modele )
		{
		this.initTreeNode( null,
			"Periode de taux horaire",
			true,
			"app/societe/image/tn_tauxhorairevaleur.bmp",
			"app/societe/image/tn_tauxhorairevaleur.bmp",
			null,
			null ) ;
		this.modele = modele ;
		this.modele.addView( this ) ;			
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( this.modele.debut + " - " + this.modele.fin + ": " + this.modele.taux_normal + " Euro" ) ;
		},
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmTauxHoraireValeur( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier la période", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer la période", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}		
	} ;
