/*********************************************************
* Classe FmAffaireRecherche: Formulaire de recherche
* multicritere des articles
*********************************************************/

function FmAffaireRecherche( modele, treenode )
	{
	herite( FmAffaireRecherche, Formulaire ) ;
	this.initFmAffaireRecherche( modele, treenode ) ;
	}

FmAffaireRecherche.prototype =
	{
	initFmAffaireRecherche: function( modele, treenode )
		{
		this.initFormulaire( "Formulaire de recherche multi-critere d'affaire" ) ;
		
		this.treenode = treenode ;

		this.addField( new FfInput( "recherche", 80 ) ) ;

		this.addField( new FfInput( "affaire", 5 ) ) ;
		this.addField( new FfSelectEdit( "designation", 40, 20, "select distinct designation, designation from affaires where 1 order by designation", "designation" ) ) ;
		this.addField( new FfSelectEdit( "client", 5, 20, "select distinct sid, rs from structures, affaires where client=sid order by rs", "rs", 40 ) ) ;
		this.addField( new FfLabel( "clientrs" ) ) ;
		this.addField( new FfSelectEdit( "refclient", 20, 20, "select distinct refclient, refclient from affaires where 1 order by refclient", "refclient" ) ) ;
		this.addField( new FfSelect( "responsable", 20, "select distinct responsable, concat( nom, ' ', prenom) from affaires, employes where matricule=responsable order by nom,prenom" ) ) ;

		this.addField( new FfButton( "requery", "Execute la requete" ) ) ;
		
		this.getFieldByName( "client" ).addItem( "", "" ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{		
		if( this.client != "" )	var sql = new SqlSelect( "select rs from structures where sid=" + this.modele.client, 0, -1, this, this.onReceveClientRs ) ;
		else this.clientrs = "" ;
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Recoie la raison sociale du client
	onReceveClientRs: function( ss )
		{
		if( ss.rows.length ) this.clientrs = ss.rows[0][0] ;
		else this.clientrs = "" ;
		this.copyAttributeValuesToFields() ;
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Recherche d'affaire:" ) ) ;
		ha.add( this.getFieldByName( "recherche" ) ) ;
		ha.add( this.getFieldByName( "requery" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Affaire:" ) ) ;
		ha.add( this.getFieldByName( "affaire" ) ) ;
		ha.add( new FfEtiquette( "Designation:" ) ) ;
		ha.add( this.getFieldByName( "designation" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Client:" ) ) ;
		ha.add( this.getFieldByName( "client" ) ) ;
		ha.add( this.getFieldByName( "clientrs" ) ) ;		

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Reference client:" ) ) ;
		ha.add( this.getFieldByName( "refclient" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Responsable:" ) ) ;
		ha.add( this.getFieldByName( "responsable" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "client" )
			{
			this.client = value ;
			if( value != "" ) var sql = new SqlSelect( "select rs from structures where sid=" + value, 0, -1, this, this.onReceveClientRs ) ;
			else this.clientrs = "" ;
			}
		if( fieldname == "affaire" ) this.affaire = value ;
		if( fieldname == "designation" ) this.designation = value ;
		if( fieldname == "refclient" ) this.refclient = value ;
		if( fieldname == "responsable" ) this.responsable = value ;
		
		this.createSQL() ;
		return true ;
		},
	// Genere la requete SQL de recherche
	createSQL: function()
		{
		var sql = " 1" ;
		//if( this.sid != "" )
		//	{
		//	sql += " and sid in( select sid from structureadresses where ville='" + this.ville.replace( "'", "#cote#" ) + "')" ;
		//	}
		if( this.affaire != "" ) sql += " and affaire=" + this.affaire ;
		if( this.client != "" ) sql += " and client=" + this.client ;
		if( this.refclient != "" ) sql += " and refclient like '" + this.refclient.replace( "'", "#cote#" ) + "%'" ;
		if( this.designation != "" ) sql += " and designation like '" + this.designation.replace( "'", "#cote#" ) + "%'" ;
		if( this.responsable != "" ) sql += " and responsable=" + this.responsable ;

		this.modele.setValue( "rsqlwhere", sql ) ;
		},
	// Appelée quand on clique sur un champ
	onClick: function( field )
		{
		if( field.name == "requery" )
			{
			this.treenode.removeChildsNode() ;
			this.treenode.showChildsNode() ;
			}
		},
	// Devient selectionnée
	onGetSelected: function()
		{
		},
	// Devient non selectionnée
	onGetUnSelected: function()
		{
		}
	} ;

