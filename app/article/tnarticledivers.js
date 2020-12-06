/*********************************************************
* Classe TnArticleDivers: TreeNode racine 
* les objets divers utilises par les articles
*********************************************************/

function TnArticleDivers()
	{
	herite( TnArticleDivers, TreeNode ) ;
	this.initTnArticleDivers() ;
	}

TnArticleDivers.prototype =
	{
	initTnArticleDivers: function()
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
		// Liste de toutes les categorie
		this.addChildNode( new TnSql(
			"Ensemble des catégorie",
			"app/article/image/tn_categoriearticles.bmp",
			"app/article/image/tn_categoriearticles.bmp",
			"select count(*) from categoriearticles",
			"categoriearticles",
			"",
			"libelle",
			"CategorieArticle",
			false,
			new TnFactory( 
				function( modele )
					{
					return new TnCategorieArticle( modele ) ;
					}
				),
			"Creer une nouvelle catégorie",
			"Coller la catégorie"
			) ) ;
		// Liste de toutes les familles
		this.addChildNode( new TnSql(
			"Ensemble des familles",
			"app/article/image/tn_famillearticles.bmp",
			"app/article/image/tn_famillearticles.bmp",
			"select count(*) from famillearticles",
			"famillearticles",
			"",
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
					return new FmFamilleArticle( formulairectrl, modele ) ;					
					},
				"Copier la famille",
				"Supprimer la famille"
				),
			"Creer une nouvelle famille",
			"Coller la famille"
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
		// Liste de toutes les tva
		this.addChildNode( new TnSql(
			"Ensemble des taux de TVA",
			"app/article/image/tn_tvas.bmp",
			"app/article/image/tn_tvas.bmp",
			"select count(*) from tvataux",
			"tvataux",
			"",
			"tva",
			"Tva",
			false,
			new TnModeleFactory( 
				"app/article/image/tn_tva.bmp",
				function()
					{
					this.setTexte( this.modele.tva + " " + this.modele.taux ) ;
					},
				function( formulairectrl, modele )
					{
					ayawf.tools.loadClasse( "FmTva", "app/article/fmtva.js" ) ;
					return new FmTva( formulairectrl, modele ) ;					
					},
				"Copier le taux de TVA",
				"Supprimer le taux de TVA"
				),
			"Creer un nouveau taux de TVA",
			"Coller le taux de TVA"
			) ) ;
		// Liste de toutes les operations
		this.addChildNode( new TnSql(
			"Ensemble des opérations",
			"app/article/image/tn_operations.bmp",
			"app/article/image/tn_operations.bmp",
			"select count(*) from operations",
			"operations",
			"",
			"libelle",
			"Operation",
			false,
			new TnModeleFactory( 
				"app/article/image/tn_operation.bmp",
				function()
					{
					this.setTexte( this.modele.operation + " : " + this.modele.libelle ) ;
					},
				function( formulairectrl, modele )
					{
					return new FmOperation( formulairectrl, modele ) ;					
					},
				"Copier l'opération",
				"Supprimer l'opération"
				),
			"Creer une nouvelle opération",
			"Coller l'opération"
			) ) ;
		}
	} ;
