/*********************************************************
* Classe TnStructureAdresses: TnSql pour les adresses
* d'une structure
*********************************************************/

function TnStructureAdresses( m_structure )
	{
	herite( TnStructureAdresses, TnSql, true ) ;
	herite( TnStructureAdresses, TreeNode ) ;
	this.initTnStructureAdresses( m_structure ) ;
	}

TnStructureAdresses.prototype =
	{
	initTnStructureAdresses: function( m_structure )
		{
		this.m_structure = m_structure ;
		
		this.initTnSql( "Adresses",
			"app/image/tn_structureadresses.bmp",
			"app/image/tn_structureadresses.bmp",
			"select count(*) from structureadresses where sid=" + m_structure.sid,
			"structureadresses",
			"sid=" + m_structure.sid,
			"typeadresse",
			"StructureAdresse" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnStructureAdresse( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle adresse", "new", this, this.onNewStructureAdresse ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "StructureAdresse" ) )
			this.menu.add( new MiCallMethode( "Coller une adresse", "paste", this, this.onPasteStructureAdresse ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller une adresse
	onPasteStructureAdresse: function()
		{
		ayawf.mvc.addValueToRowString( "sid", this.m_structure.sid ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur créer une nouvelle adresse
	onNewStructureAdresse: function()
		{
		ayawf.mvc.addValueToRowString( "sid", this.m_structure.sid ) ;
		ayawf.mvc.newModeleToDB( "StructureAdresse", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
