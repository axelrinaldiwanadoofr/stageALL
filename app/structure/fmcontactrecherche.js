/*********************************************************
* Classe FmContactRecherche: Formulaire de recherche
* multicritere des articles
*********************************************************/

function FmContactRecherche( modele, treenode )
	{
	herite( FmContactRecherche, Formulaire ) ;
	this.initFmContactRecherche( modele, treenode ) ;
	}

FmContactRecherche.prototype =
	{
	initFmContactRecherche: function( modele, treenode )
		{
		this.initFormulaire( "Formulaire de recherche multi-critere de contact" ) ;
		
		this.treenode = treenode ;

		this.addField( new FfInput( "recherche", 80 ) ) ;

		this.addField( new FfInput( "sid", 5 ) ) ;
		this.addField( new FfSelectEdit( "rs", 40, 20, "select distinct rs, rs from structures where 1 order by rs", "rs" ) ) ;
		this.addField( new FfCheck( "nonaffecte" ) ) ;
		this.addField( new FfSelectEdit( "activite", 80, 20, "select distinct activite, activite from structures where 1 order by activite", "activite" ) ) ;

		this.addField( new FfSelectEdit( "ville", 40, 20, "select distinct ville, ville from structurecontacts where 1 order by ville", "ville" ) ) ;
		this.addField( new FfSelectEdit( "fonction", 40, 20, "select distinct fonction, fonction from structurecontacts where 1 order by fonction", "fonction" ) ) ;
		
		this.addField( new FfSelectEdit( "nom", 20, 20, "select distinct nom, nom from structurecontacts where 1 order by nom", "nom" ) ) ;
		this.addField( new FfSelect( "prenom", 20 ) ) ;
		
		this.addField( new FfButton( "requery", "Execute la requete" ) ) ;

		this.getFieldByName( "activite" ).addItem( "", "" ) ;
		this.getFieldByName( "ville" ).addItem( "", "" ) ;		
		this.getFieldByName( "fonction" ).addItem( "", "" ) ;		
		this.getFieldByName( "nom" ).addItem( "", "" ) ;		
		this.getFieldByName( "rs" ).addItem( "", "" ) ;		
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		this.getFieldByName( "prenom" ).clearAllItems() ;
		
		if( this.nom != "" )
			{
			this.getFieldByName( "prenom" ).populateItemsFromSql( "select distinct prenom, prenom from structurecontacts where nom='" + this.nom + "' order by prenom" ) ;
			}
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Recherche de contact:" ) ) ;
		ha.add( this.getFieldByName( "recherche" ) ) ;
		ha.add( this.getFieldByName( "requery" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Sid:" ) ) ;
		ha.add( this.getFieldByName( "sid" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Raison sociale:" ) ) ;
		ha.add( this.getFieldByName( "rs" ) ) ;
		ha.add( new FfEtiquette( "Non affecté à une structure:" ) ) ;
		ha.add( this.getFieldByName( "nonaffecte" ) ) ;

		
		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Activité:" ) ) ;
		ha.add( this.getFieldByName( "activite" ) ) ;

		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Ville:" ) ) ;
		ha.add( this.getFieldByName( "ville" ) ) ;

		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Fonction:" ) ) ;
		ha.add( this.getFieldByName( "fonction" ) ) ;
		
		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Contact nom, prenom:" ) ) ;
		ha.add( this.getFieldByName( "nom" ) ) ;
		ha.add( this.getFieldByName( "prenom" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "nom" )
			{
			this.nom = value ;
			this.getFieldByName( "prenom" ).clearAllItems() ;
			this.getFieldByName( "prenom" ).populateItemsFromSql( "select distinct prenom, prenom from structurecontacts where nom='" + value + "' order by prenom" ) ;
			}
		if( fieldname == "prenom" ) this.prenom = value ;
		if( fieldname == "sid" ) this.sid = value ;
		if( fieldname == "rs" ) this.rs = value ;
		if( fieldname == "activite" ) this.activite = value ;
		if( fieldname == "ville" ) this.ville = value ;
		if( fieldname == "fonction" ) this.fonction = value ;
		if( fieldname == "nonaffecte" ) this.nonaffecte = value ;
		
		this.createSQL() ;
		return true ;
		},
	// Genere la requete SQL de recherche
	createSQL: function()
		{
		var sql = " 1" ;
		if( this.sid != "" )
			{
			sql += " and sid in( select sid from structureadresses where ville='" + this.ville.replace( "'", "#cote#" ) + "')" ;
			}
		if( this.rs != "" )
			{
			sql += " and sid in( select sid from structures where rs='" + this.rs.replace( "'", "#cote#" ) + "')" ;
			}
		if( this.activite != "" ) 
			{
			sql += " and sid in( select sid from structures where rs='" + this.activite.replace( "'", "#cote#" ) + "')" ;
			}
		if( this.ville != "" ) sql += " and ville='" + this.ville + "'" ;
		if( this.fonction != "" ) sql += " and fonction='" + this.fonction + "'" ;
		if( this.nom != "" ) sql += " and nom='" + this.nom.replace( "'", "#cote#" ) + "'" ;
		if( this.prenom != "" ) sql += " and prenom='" + this.prenom.replace( "'", "#cote#" ) + "'" ;
		if( this.nonaffecte == "1" ) sql += " and sid is null" ;

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

