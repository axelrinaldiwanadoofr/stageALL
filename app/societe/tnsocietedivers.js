/*********************************************************
* Classe TnSocieteDivers: TreeNode racine 
* les objets divers utilises par les structures
*********************************************************/

function TnSocieteDivers()
	{
	herite( TnSocieteDivers, TreeNode ) ;
	this.initTnSocieteDivers() ;
	}

TnSocieteDivers.prototype =
	{
	initTnSocieteDivers: function()
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
		// Liste de tous les taux de tva
		this.addChildNode( new TnSql(
			"Ensemble des taux de TVA",
			"app/societe/image/tn_tvatauxs.bmp",
			"app/societe/image/tn_tvatauxs.bmp",
			"select count(*) from tvataux",
			"tvataux",
			"",
			"tva",
			"TvaTaux",
			false,
			new TnModeleFactory( 
				"app/societe/image/tn_tvataux.bmp",
				function()
					{
					this.setTexte( this.modele.tva + " à " + parseFloat(this.modele.taux)*100 + " %" ) ;
					},
				function( formulairectrl, modele )
					{
					return new FmTauxTva( formulairectrl, modele ) ;					
					},
				"Copier le taux",
				"Supprimer le taux"
				),
			"Creer un nouveau taux de TVA",
			"Coller le taux"
			) ) ;
		// Liste de tous les taux horaires
		this.addChildNode( new TnSql(
			"Ensemble des taux horaires",
			"app/societe/image/tn_tauxhoraires.bmp",
			"app/societe/image/tn_tauxhoraires.bmp",
			"select count(*) from tauxhoraire",
			"tauxhoraire",
			"",
			"typetaux",
			"TauxHoraire",
			false,
			new TnFactory( 
				function( modele )
					{
					return new TnTauxHoraire( modele ) ;					
					}
				),
			"Creer un nouveau taux horaire",
			"Coller le taux horaire"
			) ) ;
		}
	} ;
