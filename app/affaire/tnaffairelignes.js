/*********************************************************
* Classe TnAffaireLignes: TnSql pour les adresses
* d'une structure
*********************************************************/

function TnAffaireLignes( m_affaire )
	{
	herite( TnAffaireLignes, TnSql, true ) ;
	herite( TnAffaireLignes, TreeNode ) ;
	this.initTnAffaireLignes( m_affaire ) ;
	}

TnAffaireLignes.prototype =
	{
	initTnAffaireLignes: function( m_affaire )
		{
		this.m_affaire = m_affaire ;
		
		this.initTnSql( "Lignes d'affaire",
			"app/affaire/image/tn_affairelignes.bmp",
			"app/affaire/image/tn_affairelignes.bmp",
			"select count(*) from affairelignes where nligneparent is null and affaire=" + m_affaire.affaire,
			"affairelignes",
			"nligneparent is null and affaire=" + m_affaire.affaire,
			"nligne",
			"AffaireLigne" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnAffaireLigne( modele, this.m_affaire ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle ligne", "new", this, this.onNewModele ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "AffaireLigne" ) )
			this.menu.add( new MiCallMethode( "Coller une ligne", "paste", this, this.onPasteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller une ligne
	onPasteModele: function()
		{
		ayawf.mvc.addValueToRowString( "affaire", this.m_affaire.affaire ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur créer une nouvelle ligne
	onNewModele: function()
		{
		ayawf.mvc.addValueToRowString( "affaire", this.m_affaire.affaire ) ;
		ayawf.mvc.newModeleToDB( "AffaireLigne", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
