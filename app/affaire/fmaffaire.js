/*********************************************************
* Classe FmAffaire: Formulaire des affaires
*********************************************************/

function FmAffaire( modele, treenode )
	{
	herite( FmAffaire, Formulaire ) ;
	this.initFmAffaire( modele, treenode ) ;
	}

FmAffaire.prototype =
	{
	initFmAffaire: function( modele, treenode )
		{
		this.treenode = treenode ;
		
		this.initFormulaire( "Formulaire de mise a jour d'une affaire" ) ;
		
		// Champs de recherche
		this.addField( new FfSelectEdit( "r_affaire", 5, 20, "select affaire, concat( affaire, ' ', rs, ' : ', designation) from affaires, structures where client=sid order by affaire desc", "affaire", 50 ) ) ;
		this.addField( new FfSelectEdit( "r_designation", 20, 20, "select affaire, concat( affaire, ' ', rs, ' : ', designation) from affaires, structures where client=sid order by designation", "designation", 50 ) ) ;
		this.addField( new FfSelectEdit( "r_client", 20, 20, "select affaire, concat( affaire, ' ', rs, ' : ', designation) from affaires, structures where client=sid order by rs, affaire desc", "rs", 50 ) ) ;
		this.addField( new FfSelectEdit( "r_refclient", 20, 20, "select affaire, concat( affaire, ' ', rs, ' : ', refclient) from affaires, structures where client=sid order by refclient", "refclient", 50 ) ) ;
		
		this.addField( new FfInput( "affaire", 5 ) ) ;
		this.addField( new FfSelect( "type" ) ) ;
		this.addField( new FfSelect( "statut" ) ) ;
		
		this.addField( new FfInput( "datedebut", 15 ) ) ;
		this.addField( new FfInput( "datefin", 15 ) ) ;
		
		this.addField( new FfSelectEdit( "client", 5, 20, "select sid, rs from structures where 1 order by rs", "rs", 40 ) ) ;
		this.addField( new FfLabel( "clientrs" ) ) ;
		this.addField( new FfInput( "refclient", 15 ) ) ;
		this.addField( new FfSelect( "clientcontact", 40 ) ) ;

		this.addField( new FfSelectEdit( "designation", 40, 20, "select distinct designation, designation from affaires where 1 order by designation", "designation" ) ) ;		
		
		this.addField( new FfNicEdit( "commentaire", 80, 20 ) ) ;
		
		this.addField( new FfSelect( "responsable", 20, "select matricule, concat( nom, ' ', prenom ) from employes order by nom, prenom" ) ) ;
		this.addField( new FfSelect( "tva", 5, "select tva, tva from tvataux order by tva" ) ) ;
		this.addField( new FfSelect( "monaie1", 10, "select unite, libelle from unites where reference='EURO' order by libelle" ) ) ;
		this.addField( new FfSelect( "monaie2", 10, "select unite, libelle from unites where reference='EURO' order by libelle" ) ) ;
		
		this.getFieldByName( "type" ).addItem( "COM", "Commerciale" ) ;
		this.getFieldByName( "type" ).addItem( "INT", "Interne" ) ;
		this.getFieldByName( "type" ).addItem( "SOUS", "Sous traitance" ) ;
		
		this.getFieldByName( "statut" ).addItem( "DEVIS", "Phase de devis" ) ;
		this.getFieldByName( "statut" ).addItem( "ETUDE", "Phase d'etude" ) ;
		this.getFieldByName( "statut" ).addItem( "REALISATION", "Phase de realisation" ) ;
		this.getFieldByName( "statut" ).addItem( "CLOSE", "Close" ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		this.getFieldByName( "clientcontact" ).clearAllItems() ;
		if( this.modele.client != "" ) this.getFieldByName( "clientcontact" ).populateItemsFromSql( "select contact, concat( nom, ' ', prenom, ' fonction: ', fonction, ' tel: ', telephonebureau) from structurecontacts where sid=" + this.modele.client + " order by nom, prenom" ) ;
		
		if( this.modele.client != "" ) var crs = new SqlSelect( "select rs from structures where sid=" + this.modele.client , 0, -1, this, this.onReceveClientRs ) ;
		},
	onReceveClientRs: function( ss )
		{
		if( ss.rows.length ) this.clientrs = ss.rows[0][0] ;
		else this.clientrs = "" ;
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
		ha.add( new FfEtiquette( "Recherche par numero d'affaire:" ) ) ;
		ha.add( this.getFieldByName( "r_affaire" ) ) ;
		ha.add( new FfEtiquette( "designation:" ) ) ;
		ha.add( this.getFieldByName( "r_designation" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Recherche par numero client:" ) ) ;
		ha.add( this.getFieldByName( "r_client" ) ) ;
		ha.add( new FfEtiquette( "reference client:" ) ) ;
		ha.add( this.getFieldByName( "r_refclient" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Numero d'affaire:" ) ) ;
		ha.add( this.getFieldByName( "affaire" ) ) ;
		ha.add( new FfEtiquette( "Type:" ) ) ;
		ha.add( this.getFieldByName( "type" ) ) ;
		ha.add( new FfEtiquette( "Statut:" ) ) ;
		ha.add( this.getFieldByName( "statut" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Date debut:" ) ) ;
		ha.add( this.getFieldByName( "datedebut" ) ) ;
		ha.add( new FfEtiquette( "fin:" ) ) ;
		ha.add( this.getFieldByName( "datefin" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Client:" ) ) ;
		ha.add( this.getFieldByName( "client" ) ) ;
		ha.add( this.getFieldByName( "clientrs" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Reference client:" ) ) ;
		ha.add( this.getFieldByName( "refclient" ) ) ;
		ha.add( new FfEtiquette( "Contact:" ) ) ;
		ha.add( this.getFieldByName( "clientcontact" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Designation:" ) ) ;
		ha.add( this.getFieldByName( "designation" ) ) ;
		
		var pbox = this.layout.add( new PageBoxLayout() ) ;

		// Page du résumé
		var page = this.layout.add( pbox.addPage( new PageLayout(), "Commentaire" ) ) ;

		ha = page.add( new HTabLayout() ) ;

		page.add( this.getFieldByName( "commentaire" ) ) ;

		// Page de la partie gestion
		page = this.layout.add( pbox.addPage( new PageLayout(), "Gestion" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Responsable:" ) ) ;
		ha.add( this.getFieldByName( "responsable" ) ) ;
		
		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Tva:" ) ) ;
		ha.add( this.getFieldByName( "tva" ) ) ;
		
		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Monaie 1:" ) ) ;
		ha.add( this.getFieldByName( "monaie1" ) ) ;
		ha.add( new FfEtiquette( "Monaie 2:" ) ) ;
		ha.add( this.getFieldByName( "monaie2" ) ) ;

		//ha = page.add( new HTabLayout() ) ;
		//ha.add( new FfEtiquette( "Conditions de payement:" ) ) ;
		//ha.add( this.getFieldByName( "conditionpayement" ) ) ;

		//ha = page.add( new HTabLayout() ) ;
		//ha.add( new FfEtiquette( "Type d'escompte:" ) ) ;
		//ha.add( this.getFieldByName( "typeescompte" ) ) ;

		//ha = page.add( new HTabLayout() ) ;
		//ha.add( new FfEtiquette( "Port par défaut:" ) ) ;
		//ha.add( this.getFieldByName( "port_defaut" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "r_affaire" || fieldname == "r_designation" || fieldname == "r_client" || fieldname == "r_refclient" )
			{
			if( value != "" )
				{
				var modele = ayawf.mvc.getModele( "Affaire", value ) ;
				if( modele ) 
					{
					this.setModele( modele ) ;
					if( this.treenode )
						{
						var tn = new TnAffaire( modele ) ;
						this.treenode.addChildNode( tn ) ;
						tn.onRefresh() ;
						}
					}
				else ayawf.mvc.loadModeleFromSqlSelect( "Affaire", "affaires", "affaire=" + value, "", this, this.onLoadModele ) ; 
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
				var tn = new TnAffaire( modele ) ;
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

