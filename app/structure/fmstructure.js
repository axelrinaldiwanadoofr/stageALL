/*********************************************************
* Classe FmStructure: Formulaire des structures
*********************************************************/

function FmStructure( modele, treenode )
	{
	herite( FmStructure, Formulaire ) ;
	this.initFmStructure( modele, treenode ) ;
	}

FmStructure.prototype =
	{
	initFmStructure: function( modele, treenode )
		{
		this.treenode = treenode ;
		
		this.initFormulaire( "Formulaire de mise a jour d'une structure" ) ;
		
		// Champ de recherche par libelle
		this.addField( new FfSelectEdit( "r_rs", 40, 20, "select sid, rs from structures where 1 order by rs", "rs" ) ) ;
		
		this.addField( new FfLabel( "sid" ) ) ;
		this.addField( new FfInput( "rs", 40 ) ) ;
		this.addField( new FfSelect( "nature" ) ) ;
		
		this.addField( new FfInput( "datecreation", 15 ) ) ;
		this.addField( new FfSelectEdit( "categorie", 10, 20, "select distinct categorie, categorie from structures where 1 order by categorie", "categorie" ) ) ;

		this.addField( new FfSelectEdit( "activite", 40, 20, "select distinct activite, activite from structures where 1 order by activite", "activite" ) ) ;		

		this.addField( new FfLabel( "adresseprincipale" ) ) ;
		this.addField( new FfLabel( "contactprincipal" ) ) ;

		this.addField( new FfNicEdit( "description", 80, 20 ) ) ;

		this.addField( new FfInput( "siret", 15 ) ) ;
		this.addField( new FfInput( "ape", 5 ) ) ;
		this.addField( new FfInput( "numtva", 15 ) ) ;
		
		this.addField( new FfSelect( "monaie1", 10, "select unite, libelle from unites where reference='EURO' order by libelle" ) ) ;
		this.addField( new FfSelect( "monaie2", 10, "select unite, libelle from unites where reference='EURO' order by libelle" ) ) ;

		this.addField( new FfSelect( "conditionpayement", 30, "select conditionp, libelle from conditionpaiement order by libelle" ) ) ;
		this.addField( new FfSelect( "typeescompte", 30, "select typeescompte, libelle from typeescomptes order by libelle" ) ) ;
		this.addField( new FfSelect( "port_defaut", 30, "select type, libelle from typeport order by libelle" ) ) ;

		this.addField( new FfSelect( "typeadresse_commande", 20 ) ) ;
		this.addField( new FfSelect( "typeadresse_bl", 20 ) ) ;
		this.addField( new FfSelect( "typeadresse_facture", 20 ) ) ;
		this.addField( new FfSelect( "typeadresse_livraison", 20 ) ) ;
		
		this.getFieldByName( "nature" ).addItem( "CLIENT", "Client" ) ;
		this.getFieldByName( "nature" ).addItem( "FOUR", "Fournisseur" ) ;
		this.getFieldByName( "nature" ).addItem( "CLIFOUR", "Client/fournisseur" ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		this.getFieldByName( "typeadresse_commande" ).clearAllItems() ;
		this.getFieldByName( "typeadresse_bl" ).clearAllItems() ;
		this.getFieldByName( "typeadresse_facture" ).clearAllItems() ;
		this.getFieldByName( "typeadresse_livraison" ).clearAllItems() ;
		this.getFieldByName( "typeadresse_commande" ).populateItemsFromSql( "select distinct typeadresse, typeadresse from structureadresses where sid=" + this.modele.sid + " order by typeadresse" ) ;
		this.getFieldByName( "typeadresse_bl" ).populateItemsFromSql( "select distinct typeadresse, typeadresse from structureadresses where sid=" + this.modele.sid + " order by typeadresse" ) ;
		this.getFieldByName( "typeadresse_facture" ).populateItemsFromSql( "select distinct typeadresse, typeadresse from structureadresses where sid=" + this.modele.sid + " order by typeadresse" ) ;
		this.getFieldByName( "typeadresse_livraison" ).populateItemsFromSql( "select distinct typeadresse, typeadresse from structureadresses where sid=" + this.modele.sid + " order by typeadresse" ) ;
		
		var cp = new SqlSelect( "select civilite, nom, prenom, fonction, telephonebureau, mobile from structurecontacts where principal=1 and sid=" + this.modele.sid , 0, -1, this, this.onReceveContactPrincipal ) ;
		var ap = new SqlSelect( "select ville, telephone, mobile, fax, mail from structureadresses where principal=1 and sid=" + this.modele.sid , 0, -1, this, this.onReceveAdressePrincipale ) ;
		},
	onReceveContactPrincipal: function( ss )
		{
		if( ss.rows.length ) this.contactprincipal = ss.rows[0][0] + " " + ss.rows[0][1] + " " + ss.rows[0][2] + ", fonction: " + ss.rows[0][3] + ", tel: " + ss.rows[0][4] + ", mobile: " + ss.rows[0][5] ;
		else this.contactprincipal = "" ;
		this.copyAttributeValuesToFields() ;
		},
	onReceveAdressePrincipale: function( ss )
		{
		if( ss.rows.length ) this.adresseprincipale = ss.rows[0][0] + ", tel: " + ss.rows[0][1] + ", mobile: " + ss.rows[0][2] + ", fax: " + ss.rows[0][3] + ", mail: " + ss.rows[0][4] ;
		else this.adresseprincipale = "" ;
		this.copyAttributeValuesToFields() ;
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Recherche par raison sociale:" ) ) ;
		ha.add( this.getFieldByName( "r_rs" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Sid:" ) ) ;
		ha.add( this.getFieldByName( "sid" ) ) ;
		ha.add( new FfEtiquette( "Raison sociale:" ) ) ;
		ha.add( this.getFieldByName( "rs" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Nature:" ) ) ;
		ha.add( this.getFieldByName( "nature" ) ) ;
		ha.add( new FfEtiquette( "Catégorie:" ) ) ;
		ha.add( this.getFieldByName( "categorie" ) ) ;
		ha.add( new FfEtiquette( "Date de création:" ) ) ;
		ha.add( this.getFieldByName( "datecreation" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Activité:" ) ) ;
		ha.add( this.getFieldByName( "activite" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Adresse principale:" ) ) ;
		ha.add( this.getFieldByName( "adresseprincipale" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Contact principal:" ) ) ;
		ha.add( this.getFieldByName( "contactprincipal" ) ) ;
		
		var pbox = this.layout.add( new PageBoxLayout() ) ;

		// Page du résumé
		var page = this.layout.add( pbox.addPage( new PageLayout(), "Description" ) ) ;

		ha = page.add( new HTabLayout() ) ;

		page.add( this.getFieldByName( "description" ) ) ;

		// Page de la partie gestion
		page = this.layout.add( pbox.addPage( new PageLayout(), "Gestion" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "SIRET:" ) ) ;
		ha.add( this.getFieldByName( "siret" ) ) ;
		ha.add( new FfEtiquette( "Code APE:" ) ) ;
		ha.add( this.getFieldByName( "ape" ) ) ;
		ha.add( new FfEtiquette( "Numérot TVA:" ) ) ;
		ha.add( this.getFieldByName( "numtva" ) ) ;
		
		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Monaie 1:" ) ) ;
		ha.add( this.getFieldByName( "monaie1" ) ) ;
		ha.add( new FfEtiquette( "Monaie 2:" ) ) ;
		ha.add( this.getFieldByName( "monaie2" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Conditions de payement:" ) ) ;
		ha.add( this.getFieldByName( "conditionpayement" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Type d'escompte:" ) ) ;
		ha.add( this.getFieldByName( "typeescompte" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Port par défaut:" ) ) ;
		ha.add( this.getFieldByName( "port_defaut" ) ) ;

		// Page de la partie parametre
		page = this.layout.add( pbox.addPage( new PageLayout(), "Paramêtres" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		page.add( new FfEtiquette( "Adresse pour les commandes:" ) ) ;
		page.add( this.getFieldByName( "typeadresse_commande" ) ) ;
		page.add( new FfEtiquette( "Adresse pour les bon de livraison:" ) ) ;
		page.add( this.getFieldByName( "typeadresse_bl" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		page.add( new FfEtiquette( "Adresse pour les factures:" ) ) ;
		page.add( this.getFieldByName( "typeadresse_facture" ) ) ;
		page.add( new FfEtiquette( "Adresse pour les livraison:" ) ) ;
		page.add( this.getFieldByName( "typeadresse_livraison" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "r_rs" )
			{
			if( value != "" )
				{
				var modele = ayawf.mvc.getModele( "Structure", value ) ;
				if( modele ) 
					{
					this.setModele( modele ) ;
					if( this.treenode )
						{
						var tn = new TnStructure( modele ) ;
						this.treenode.addChildNode( tn ) ;
						tn.onRefresh() ;
						}
					}
				else ayawf.mvc.loadModeleFromSqlSelect( "Structure", "structures", "sid=" + value, "", this, this.onLoadModele ) ; 
				}
			}
		return true ;
		},
	// Devient selectionnée
	onLoadModele: function( modele )
		{
		if( modele ) 
			{
			this.setModele( modele ) ;
			if( this.treenode )
				{
				var tn = new TnStructure( modele ) ;
				this.treenode.addChildNode( tn ) ;
				tn.onRefresh() ;
				}
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

