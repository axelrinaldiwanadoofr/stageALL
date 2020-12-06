/*********************************************************
* Classe FmContact: Formulaire de mise a jour
* d'un contact
*********************************************************/

function FmContact( modele, treenode )
	{
	herite( FmContact, Formulaire ) ;
	this.initFmContact( modele, treenode ) ;
	}

FmContact.prototype =
	{
	initFmContact: function( modele, treenode )
		{
		this.treenode = treenode ;
		
		this.initFormulaire( "Formulaire de mise a jour d'un contact" ) ;

		// Champ de recherche par nom
		this.addField( new FfSelectEdit( "r_nom", 20, 20, "select contact, concat(nom,' ',prenom,'  :  ',rs) from structurecontacts as c, structures as s where s.sid = c.sid order by nom,prenom", "nom", 50 ) ) ;
		
		this.addField( new FfSelect( "civilite", 12 ) ) ;

		this.addField( new FfInput( "nom", 20 ) ) ;
		this.addField( new FfInput( "prenom", 20 ) ) ;
		this.addField( new FfImage( "image", 100, 100, 30 ) ) ;
		if( modele ) this.addField( new FfUpLoad( "upload", "image/" + modele.id + modele.contact + ".jpg", 3000000 ) ) ;
		else this.addField( new FfUpLoad( "upload", "image/null.jpg", 3000000 ) ) ;

		this.addField( new FfSelectEdit( "sid", 5, 20, "select sid, rs from structures where 1 order by rs", "rs", 40 ) ) ;
		this.addField( new FfLabel( "rs" ) ) ;
		this.addField( new FfSelect( "etablissement", 20 ) ) ;
		this.addField( new FfCheck( "principal" ) ) ;
		
		this.addField( new FfSelectEdit( "fonction", 40, 20, "select distinct fonction, fonction from structurecontacts where 1 order by fonction", "fonction" ) ) ;

		this.addField( new FfInput( "telephonebureau", 12 ) ) ;
		this.addField( new FfInput( "telephoneprive", 12 ) ) ;
		this.addField( new FfInput( "mobile", 12 ) ) ;
		this.addField( new FfInput( "fax", 12 ) ) ;

		this.addField( new FfInput( "adresse", 80 ) ) ;
		this.addField( new FfInput( "codepostal", 10 ) ) ;
		
		this.addField( new FfSelectEdit( "ville", 20, 20, "select distinct ville, ville from structureadresses where 1 order by ville", "ville" ) ) ;
		this.addField( new FfSelect( "pays", 10, "select pays, pays from pays order by pays" ) ) ;

		this.addField( new FfInput( "mail", 80 ) ) ;

		this.addField( new FfNicEdit( "commentaire", 90, 40 ) ) ;
		
		this.getFieldByName( "civilite" ).addItem( "Monsieur", "Monsieur" ) ;
		this.getFieldByName( "civilite" ).addItem( "Madame", "Madame" ) ;
		this.getFieldByName( "civilite" ).addItem( "Mademoiselle", "Mademoiselle" ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		this.getFieldByName( "etablissement" ).clearAllItems() ;
		if( this.modele.sid )
			{
			this.getFieldByName( "etablissement" ).populateItemsFromSql( "select distinct typeadresse, typeadresse from structureadresses where sid=" + this.modele.sid + " order by typeadresse" ) ;
			var sql = new SqlSelect( "select rs from structures where sid=" + this.modele.sid, 0, -1, this, this.onReceveRs ) ;
			}
		if( this.image == "" ) this.upload = "image/" + this.modele.id + this.modele.contact + ".jpg" ;
		else this.upload = this.image ;
		this.getFieldByName( "upload" ).setWidth( 200 ) ;
		this.getFieldByName( "image" ).setWidth( 200 ) ;
		this.getFieldByName( "image" ).setHeight( 200 ) ;
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Recherche par nom:" ) ) ;
		ha.add( this.getFieldByName( "r_nom" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Civilité:" ) ) ;
		ha.add( this.getFieldByName( "civilite" ) ) ;
		ha.add( new FfEtiquette( "Nom:" ) ) ;
		ha.add( this.getFieldByName( "nom" ) ) ;
		ha.add( new FfEtiquette( "Prénom:" ) ) ;
		ha.add( this.getFieldByName( "prenom" ) ) ;
		ha.add( this.getFieldByName( "image" ) ) ;
		ha.add( this.getFieldByName( "upload" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Structure:" ) ) ;
		ha.add( this.getFieldByName( "sid" ) ) ;
		ha.add( this.getFieldByName( "rs" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Etablissement:" ) ) ;
		ha.add( this.getFieldByName( "etablissement" ) ) ;
		ha.add( new FfEtiquette( "Fonction:" ) ) ;
		ha.add( this.getFieldByName( "fonction" ) ) ;
		ha.add( new FfEtiquette( "Contact principal:" ) ) ;
		ha.add( this.getFieldByName( "principal" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Téléphone bureau:" ) ) ;
		ha.add( this.getFieldByName( "telephonebureau" ) ) ;
		ha.add( new FfEtiquette( "privé:" ) ) ;
		ha.add( this.getFieldByName( "telephoneprive" ) ) ;
		ha.add( new FfEtiquette( "mobile:" ) ) ;
		ha.add( this.getFieldByName( "mobile" ) ) ;
		ha.add( new FfEtiquette( "fax:" ) ) ;
		ha.add( this.getFieldByName( "fax" ) ) ;

		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Adresse:" ) ) ;
		ha.add( this.getFieldByName( "adresse" ) ) ;

		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Ville:" ) ) ;
		ha.add( this.getFieldByName( "ville" ) ) ;
		ha.add( new FfEtiquette( "Code postal:" ) ) ;
		ha.add( this.getFieldByName( "codepostal" ) ) ;
		ha.add( new FfEtiquette( "Pays:" ) ) ;
		ha.add( this.getFieldByName( "pays" ) ) ;

		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Mail:" ) ) ;
		ha.add( this.getFieldByName( "mail" ) ) ;
		
		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Commentaires:" ) ) ;
		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( this.getFieldByName( "commentaire" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "sid" )
			{
			this.getFieldByName( "etablissement" ).clearAllItems() ;
			if( value != "" ) 
				{
				var sql = new SqlSelect( "select rs from structures where sid=" + value, 0, -1, this, this.onReceveRs ) ;
				this.getFieldByName( "etablissement" ).populateItemsFromSql( "select distinct typeadresse, typeadresse from structureadresses where sid=" + value + " order by typeadresse" ) ;
				}
			else this.rs = "" ;			
			}
		if( fieldname == "ville" && value != "" )
			{
			var ss = new SqlSelect( "select codepostal from structureadresses where ville='" + value + "'", 0, -1, this, this.onReceveCodePostal ) ;
			}
		if( fieldname == "upload" )
			{
			this.image = value ;
			}
		if( fieldname == "r_nom" )
			{
			if( value != "" && !isNaN( parseInt( value ) ) )
				{
				var modele = ayawf.mvc.getModele( "StructureContact", value ) ;
				if( modele ) 
					{
					this.setModele( modele ) ;
					if( this.treenode )
						{
						var tn = new TnContact( modele ) ;
						this.treenode.addChildNode( tn ) ;
						tn.onRefresh() ;
						}
					}
				else ayawf.mvc.loadModeleFromSqlSelect( "StructureContact", "structurecontacts", "contact=" + value, "", this, this.onLoadModele ) ; 
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
				var tn = new TnContact( modele ) ;
				this.treenode.addChildNode( tn ) ;
				tn.onRefresh() ;
				}
			}
		},
	// Recoie le code postal
	onReceveCodePostal: function( ss )
		{
		if( ss.rows.length ) this.modele.setValue( "codepostal", ss.rows[0][0] ) ;
		else this.modele.setValue( "codepostal", "" ) ;
		this.modele.save() ;
		},
	// Recoie la raison sociale
	onReceveRs: function( ss )
		{
		if( ss.rows.length ) this.rs = ss.rows[0][0] ;
		else this.rs = "" ;
		this.copyAttributeValuesToFields() ;
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

