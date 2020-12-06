/*********************************************************
* Classe FmEmploye: Formulaire de mise a jour
* d'un employe
*********************************************************/

function FmEmploye( modele )
	{
	herite( FmEmploye, Formulaire ) ;
	this.initFmEmploye( modele ) ;
	}

FmEmploye.prototype =
	{
	initFmEmploye: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'un employé" ) ;
		
		this.addField( new FfSelect( "civilite", 12 ) ) ;

		this.addField( new FfInput( "nom", 20 ) ) ;
		this.addField( new FfInput( "prenom", 20 ) ) ;
		this.addField( new FfImage( "image", 100, 100, 30 ) ) ;
		this.addField( new FfUpLoad( "upload", "image/" + modele.id + modele.contact + ".jpg", 3000000 ) ) ;

		this.addField( new FfSelect( "societe", 20, "select societe, rs from societes order by rs" ) ) ;
		this.addField( new FfSelect( "site", 20 ) ) ;
		this.addField( new FfSelectEdit( "fonction", 40, 20, "select distinct fonction, fonction from employes where 1 order by fonction", "fonction" ) ) ;

		this.addField( new FfSelect( "tauxhoraire", 20, "select typetaux, libelle from tauxhoraire order by typetaux" ) ) ;
		this.addField( new FfInput( "datedebut", 8 ) ) ;
		this.addField( new FfInput( "datefin", 8 ) ) ;
		
		this.addField( new FfInput( "telephonebureau", 12 ) ) ;
		this.addField( new FfInput( "telephoneprive", 12 ) ) ;
		this.addField( new FfInput( "mobile", 12 ) ) ;
		this.addField( new FfInput( "fax", 12 ) ) ;

		this.addField( new FfInput( "adresse", 80 ) ) ;		
		this.addField( new FfSelectEdit( "ville", 20, 20, "select distinct ville, ville from structureadresses where 1 order by ville", "ville" ) ) ;
		this.addField( new FfInput( "codepostal", 10 ) ) ;
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
		if( this.societe )
			{
			this.getFieldByName( "site" ).clearAllItems() ;
			this.getFieldByName( "site" ).populateItemsFromSql( "select distinct site, site from sites where societe=" + this.societe + " order by site" ) ;
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
		ha.add( new FfEtiquette( "Civilité:" ) ) ;
		ha.add( this.getFieldByName( "civilite" ) ) ;
		ha.add( new FfEtiquette( "Nom:" ) ) ;
		ha.add( this.getFieldByName( "nom" ) ) ;
		ha.add( new FfEtiquette( "Prénom:" ) ) ;
		ha.add( this.getFieldByName( "prenom" ) ) ;
		ha.add( this.getFieldByName( "image" ) ) ;
		ha.add( this.getFieldByName( "upload" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Société:" ) ) ;
		ha.add( this.getFieldByName( "societe" ) ) ;
		ha.add( new FfEtiquette( "Site:" ) ) ;
		ha.add( this.getFieldByName( "site" ) ) ;
		ha.add( new FfEtiquette( "Fonction:" ) ) ;
		ha.add( this.getFieldByName( "fonction" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Taux horaire:" ) ) ;
		ha.add( this.getFieldByName( "tauxhoraire" ) ) ;
		ha.add( new FfEtiquette( "Date de début:" ) ) ;
		ha.add( this.getFieldByName( "datedebut" ) ) ;
		ha.add( new FfEtiquette( "fin:" ) ) ;
		ha.add( this.getFieldByName( "datefin" ) ) ;
		
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
		if( fieldname == "ville" && value != "" )
			{
			var ss = new SqlSelect( "select codepostal from structureadresses where ville='" + value + "'", 0, -1, this, this.onReceveCodePostal ) ;
			}
		if( fieldname == "societe" )
			{
			this.getFieldByName( "site" ).clearAllItems() ;
			this.getFieldByName( "site" ).populateItemsFromSql( "select distinct site, site from sites where societe=" + value + " order by site" ) ;
			}
		if( fieldname == "upload" )
			{
			this.image = value ;
			}
			
		return true ;
		},
	// Recoie le code postal
	onReceveCodePostal: function( ss )
		{
		if( ss.rows.length ) this.modele.setValue( "codepostal", ss.rows[0][0] ) ;
		else this.modele.setValue( "codepostal", "" ) ;
		this.modele.save() ;
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

