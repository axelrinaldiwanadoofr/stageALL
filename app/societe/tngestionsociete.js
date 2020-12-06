/*********************************************************
* Classe TnGestionSociete: Noeud racine de la gestion
* des structures
*********************************************************/


function TnGestionSociete()
	{
	herite( TnGestionSociete, TreeNode ) ;
	this.initTnGestionSociete() ;
	}

TnGestionSociete.prototype =
	{
	initTnGestionSociete: function()
		{
		this.initTreeNode( null,
			"Ayawf Gestion des sociétés",
			true,
			"app/societe/image/tn_gestionsocietes.bmp",
			"app/societe/image/tn_gestionsocietes.bmp",
			null,
			null ) ;
		},
		
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( "Ayawf Gestion des sociétés" ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste de toutes les societes
		this.addChildNode( new TnSql(
			"Sociétés",
			"app/societe/image/tn_societes.bmp",
			"app/societe/image/tn_societes.bmp",
			"select count(*) from societes",
			"societes",
			"",
			"societe",
			"Societe",
			false,
			new TnFactory( 
				function( modele )
					{
					return new TnSociete( modele ) ;					
					}
				),
			"Creer une nouvelle société",
			"Coller la société"
			) ) ;
		// Liste de tous les employes
		this.addChildNode( new TnSql(
			"Employés",
			"app/societe/image/tn_employes.bmp",
			"app/societe/image/tn_employes.bmp",
			"select count(*) from employes",
			"employes",
			"",
			"nom,prenom",
			"Employe",
			false,
			new TnFactory( 
				function( modele )
					{
					return new TnEmploye( modele ) ;					
					}
				),
			"Creer un nouvel employé",
			"Coller l'employé"
			) ) ;
		// Noeud divers
		this.addChildNode( new TnSocieteDivers() ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		//this.menu.add( new MiCallMethode( "Liste des vins par région, appellations et domaine", "aff", this, this.onAfficheToutesLesAppellation ) ) ;
		//this.menu.add( new MiCallMethode( "Liste des vins par domaine", "aff", this, this.onAfficheTousLesVin ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;
