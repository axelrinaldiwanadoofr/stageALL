/*********************************************************
* Classe TnStructureContacts: TnSql pour une liste 
* des contacts d'une structure
*********************************************************/

function TnStructureContacts( m_structure )
	{
	herite( TnStructureContacts, TnSql, true ) ;
	herite( TnStructureContacts, TreeNode ) ;
	this.initTnStructureContacts( m_structure ) ;
	}

TnStructureContacts.prototype =
	{
	initTnStructureContacts: function( m_structure )
		{
		this.m_structure = m_structure ;
		
		this.initTnSql( "Contacts",
			"app/image/tn_structurecontacts.bmp",
			"app/image/tn_structurecontacts.bmp",
			"select count(*) from structurecontacts where sid=" + m_structure.sid,
			"structurecontacts",
			"sid=" + m_structure.sid,
			"nom,prenom",
			"StructureContact" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnStructureContact( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer un nouveau contact", "new", this, this.onNewStructureContact ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "StructureContact" ) )
			this.menu.add( new MiCallMethode( "Coller un contact", "paste", this, this.onPasteStructureContact ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller un contact
	onPasteStructureContact: function()
		{
		ayawf.mvc.addValueToRowString( "sid", this.m_structure.sid ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur créer un nouveau contact
	onNewStructureContact: function()
		{
		ayawf.mvc.addValueToRowString( "sid", this.m_structure.sid ) ;
		ayawf.mvc.newModeleToDB( "StructureContact", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
