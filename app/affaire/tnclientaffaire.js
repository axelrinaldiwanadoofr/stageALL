/*********************************************************
* Classe TnClientAffaire: TreeNode pour
* un client regroupant des affaires
*********************************************************/

function TnClientAffaire( client, rs, image )
	{
	herite( TnClientAffaire, TreeNode ) ;
	this.initTnClientAffaire( client, rs, image ) ;
	}

TnClientAffaire.prototype =
	{
	initTnClientAffaire: function( client, rs, image )
		{
		if( image == "" ) image = "app/structure/image/tn_structure.bmp" ;

		this.initTreeNode( null,
			client + ": " + rs,
			false,
			image,
			image,
			null,
			null ) ;
			
		this.client = client ;
		this.rs = rs ;

		// Compte les affaires
		var sql = new SqlSelect( "select count(*) from affaires where client=" + this.client,
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} 
			) ;
		},
	// Cree les noeux fils
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnAffaire( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},		
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		// Liste des affaires pour le client
		ayawf.mvc.loadModeleFromSqlSelect(
			"Affaire",
			"affaires" ,
			"client=" + this.client,
			"affaire desc",
			this,
			this.onCreateChildNodeWithModele,
			false ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Creer une nouvelle affaire", "new", this, this.onNewModele ) ) ;
		this.menu.add( new MiCallMethode( "Coller une affaire", "paste", this, this.onPasteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller une affaire
	onPasteModele: function()
		{
		ayawf.mvc.addValueToRowString( "client", this.client ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur le noeud est sélectionné
	onNewModele: function()
		{
		ayawf.mvc.addValueToRowString( "client", this.client ) ;
		ayawf.mvc.newModeleToDB( "Affaire", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
