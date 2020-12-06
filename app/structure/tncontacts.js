/*********************************************************
* Classe TnContacts: TreeNode racine pour les structures
*********************************************************/

function TnContacts()
	{
	herite( TnContacts, TreeNode ) ;
	this.initTnContacts() ;
	}

TnContacts.prototype =
	{
	initTnContacts: function()
		{
		this.initTreeNode( null,
			"Contacts",
			true,
			"app/structure/image/tn_contacts.bmp",
			"app/structure/image/tn_contacts.bmp",
			null,
			null ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Contacts courants
		this.addChildNode( new TnCurrentContacts() ) ;
		
		// Liste de toutes les recherches
		ayawf.mvc.loadModeleFromSqlSelect(
			"ContactRecherche",
			"contactrecherche",
			"",
			"recherche",			
			this,
			this.onCreateTnContactRecherche ) ;
			
		// Liste de toutes les contacts
		this.addChildNode( new TnSql(
			"Tous les contacts",
			"app/structure/image/tn_contacts.bmp",
			"app/structure/image/tn_contacts.bmp",
			"select count(*) from structurecontacts",
			"structurecontacts",
			"",
			"nom,prenom",
			"StructureContact",
			false,
			new TnFactory( 
				function( modele )
					{
					return new TnContact( modele ) ;
					}
				),
			"Creer un nouveau contact",
			"Coller le contact"
			) ) ;
		},
	// Appelée pour chaque recherche de structure
	onCreateTnContactRecherche: function( modele )
		{
		var tn = new TnContactRecherche( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle liste multi-criteres", "new", this, this.onNewContactRecherche ) ) ;
		this.menu.add( new MiCallMethode( "Créer un nouveau contact", "delete", this, this.onNewStructureContact ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur créer une nouvelle recherche
	onNewContactRecherche: function()
		{
		ayawf.mvc.newModeleToDB( "ContactRecherche", this, this.onCreateTnContactRecherche ) ;
		},				
	// Sur créer une nouveau contact
	onNewStructureContact: function()
		{
		ayawf.mvc.newModeleToDB( "StructureContact", this, this.onCreateTnStructureContact ) ;
		}				
	} ;
