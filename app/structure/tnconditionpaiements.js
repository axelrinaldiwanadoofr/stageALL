/*********************************************************
* Classe TnConditionPaiements: TnSql pour la liste 
* des conditions de payement
*********************************************************/

function TnConditionPaiements()
	{
	herite( TnConditionPaiements, TnSql, true ) ;
	herite( TnConditionPaiements, TreeNode ) ;
	this.initTnConditionPaiements() ;
	}

TnConditionPaiements.prototype =
	{
	initTnConditionPaiements: function()
		{
		this.initTnSql( "Ensemble des conditions de payement",
			"app/image/tn_conditionpaiements.bmp",
			"app/image/tn_conditionpaiements.bmp",
			"select count(*) from conditionpaiement",
			"conditionpaiement",
			"",
			"libelle",
			"ConditionPaiement" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnConditionPaiement( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle condition de payement", "new", this, this.onNewObject ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "Pays" ) )
			this.menu.add( new MiCallMethode( "Coller une condition de payement", "paste", this, this.onPasteObject ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller un contact
	onPasteObject: function()
		{
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur créer un nouveau contact
	onNewObject: function()
		{
		ayawf.mvc.newModeleToDB( "Pays", this, this.onCreateChildNodeWithModele ) ;
		}
	} ;
