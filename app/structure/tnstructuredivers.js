/*********************************************************
* Classe TnStructureDivers: TreeNode racine 
* les objets divers utilises par les structures
*********************************************************/

function TnStructureDivers()
	{
	herite( TnStructureDivers, TreeNode ) ;
	this.initTnStructureDivers() ;
	}

TnStructureDivers.prototype =
	{
	initTnStructureDivers: function()
		{
		this.initTreeNode( null,
			"Divers",
			true,
			"app/image/tn_divers.bmp",
			"app/image/tn_divers.bmp",
			null,
			null ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste de tous les pays
		this.addChildNode( new TnSql(
			"Ensemble des pays",
			"app/image/tn_payss.bmp",
			"app/image/tn_payss.bmp",
			"select count(*) from pays",
			"pays",
			"",
			"pays",
			"Pays",
			false,
			new TnModeleFactory( 
				"app/image/tn_pays.bmp",
				function()
					{
					this.setTexte( this.modele.pays ) ;
					var image = "app/image/tn_pays.bmp" ;
					if( this.modele.drapeau && this.modele.drapeau != "" ) image = this.modele.drapeau ;
					this.setOpenImage( image ) ;
					this.setCloseImage( image ) ;
					},
				function( formulairectrl, modele )
					{
					return new FmPays( formulairectrl, modele ) ;					
					},
				"Copier le pays",
				"Supprimer le pays"
				),
			"Creer un nouveau pays",
			"Coller le pays"
			) ) ;
		// Liste de toutes les langues
		this.addChildNode( new TnSql(
			"Ensemble des langues",
			"app/image/tn_langues.bmp",
			"app/image/tn_langues.bmp",
			"select count(*) from langue",
			"langue",
			"",
			"libelle",
			"Langue",
			false,
			new TnModeleFactory( 
				"app/image/tn_langue.bmp",
				function()
					{
					this.setTexte( this.modele.libelle ) ;
					},
				function( formulairectrl, modele )
					{
					return new FmLangue( formulairectrl, modele ) ;					
					},
				"Copier la langue",
				"Supprimer la langue"
				),
			"Creer une nouvelle langue",
			"Coller la langue"
			) ) ;
		// Liste de toutes les conditions de payement
		this.addChildNode( new TnSql(
			"Ensemble des conditions de payement",
			"app/image/tn_conditionpaiments.bmp",
			"app/image/tn_conditionpaiments.bmp",
			"select count(*) from conditionpaiement",
			"conditionpaiement",
			"",
			"libelle",
			"ConditionPaiement",
			false,
			new TnModeleFactory( 
				"app/image/tn_conditionpaiement.bmp",
				function()
					{
					this.setTexte( this.modele.libelle ) ;
					},
				function( formulairectrl, modele )
					{
					return new FmConditionPaiement( formulairectrl, modele ) ;					
					},
				"Copier la condition",
				"Supprimer la condition"
				),
			"Creer une nouvelle condition de paiement",
			"Coller la condition"
			) ) ;
		// Liste de tous les types d'escompte
		this.addChildNode( new TnSql(
			"Ensemble des types d'escompte",
			"app/image/tn_typeescomptes.bmp",
			"app/image/tn_typeescomptes.bmp",
			"select count(*) from typeescomptes",
			"typeescomptes",
			"",
			"libelle",
			"TypeEscompte",
			false,
			new TnModeleFactory( 
				"app/image/tn_typeescompte.bmp",
				function()
					{
					this.setTexte( this.modele.libelle ) ;
					},
				function( formulairectrl, modele )
					{
					return new FmTypeEscompte( formulairectrl, modele ) ;					
					},
				"Copier le type",
				"Supprimer le type"
				),
			"Creer un nouveau type d'escompte",
			"Coller le type d'escompte"
			) ) ;
		// Liste de tous les types de port
		this.addChildNode( new TnSql(
			"Ensemble des types de port",
			"app/image/tn_typeports.bmp",
			"app/image/tn_typeports.bmp",
			"select count(*) from typeport",
			"typeport",
			"",
			"libelle",
			"TypePort",
			false,
			new TnModeleFactory( 
				"app/image/tn_typeport.bmp",
				function()
					{
					this.setTexte( this.modele.libelle ) ;
					},
				function( formulairectrl, modele )
					{
					return new FmTypePort( formulairectrl, modele ) ;					
					},
				"Copier le type",
				"Supprimer le type"
				),
			"Creer un nouveau type de port",
			"Coller le type de port"
			) ) ;
		// Liste de toutes les unites
		this.addChildNode( new TnSql(
			"Ensemble des unités",
			"app/image/tn_unites.bmp",
			"app/image/tn_unites.bmp",
			"select count(*) from unites",
			"unites",
			"",
			"libelle",
			"Unite",
			false,
			new TnModeleFactory( 
				"app/image/tn_unite.bmp",
				function()
					{
					this.setTexte( this.modele.libelle ) ;
					},
				function( formulairectrl, modele )
					{
					return new FmUnite( formulairectrl, modele ) ;					
					},
				"Copier l'unité",
				"Supprimer l'unité"
				),
			"Creer une nouvelle unité",
			"Coller l'unité"
			) ) ;
		}
	} ;
