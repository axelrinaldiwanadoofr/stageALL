/*********************************************************
* Classe FmStructureAdresse: Formulaire de mise a jour
* d'une adresse de structure
*********************************************************/

function FmStructureAdresse( modele )
	{
	herite( FmStructureAdresse, Formulaire ) ;
	this.initFmStructureAdresse( modele ) ;
	}

FmStructureAdresse.prototype =
	{
	initFmStructureAdresse: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une adresse" ) ;
		
		this.addField( new FfSelectEdit( "typeadresse", 12, 10, "select distinct typeadresse, typeadresse from structureadresses where 1 order by typeadresse", "typeadresse" ) ) ;
		this.addField( new FfCheck( "principal" ) ) ;

		this.addField( new FfInput( "telephone", 12 ) ) ;
		this.addField( new FfInput( "mobile", 12 ) ) ;
		this.addField( new FfInput( "fax", 12 ) ) ;

		this.addField( new FfInput( "adresse", 80 ) ) ;		
		this.addField( new FfSelectEdit( "ville", 20, 20, "select distinct ville, ville from structureadresses where 1 order by ville", "ville" ) ) ;
		this.addField( new FfInput( "codepostal", 10 ) ) ;
		this.addField( new FfSelect( "pays", 10, "select pays, pays from pays order by pays" ) ) ;

		this.addField( new FfInput( "mail", 80 ) ) ;
		this.addField( new FfInput( "web", 80 ) ) ;

		this.addField( new FfSelectEdit( "activite", 40, 20, "select distinct activite, activite from structures where 1 order by activite", "activite" ) ) ;		
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Etablissement:" ) ) ;
		ha.add( this.getFieldByName( "typeadresse" ) ) ;
		ha.add( new FfEtiquette( "Adresse principale:" ) ) ;
		ha.add( this.getFieldByName( "principal" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Téléphone:" ) ) ;
		ha.add( this.getFieldByName( "telephone" ) ) ;
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
		ha.add( new FfEtiquette( "Web:" ) ) ;
		ha.add( this.getFieldByName( "web" ) ) ;
		
		ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Activité:" ) ) ;
		ha.add( this.getFieldByName( "activite" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "ville" && value != "" )
			{
			var ss = new SqlSelect( "select codepostal from structureadresses where ville='" + value + "'", 0, -1, this, this.onReceveCodePostal ) ;
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

