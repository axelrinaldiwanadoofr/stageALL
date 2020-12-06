/*********************************************************
* Classe FmProperty: Formulaire des propriétés
*********************************************************/

function FmProperty( formulairecontroler, modele )
	{
	herite( FmProperty, Formulaire ) ;
	this.initFmProperty( formulairecontroler, modele ) ;
	}

FmProperty.prototype =
	{
	initFmProperty: function( modele )
		{
		this.initFormulaire( "Formulaire de propriété d'article" ) ;

		this.addField( new FfInput( "name", 20 ) ) ;
		this.addField( new FfInput( "libelle", 60 ) ) ;
		this.addField( new FfSelect( "type", 30 ) ) ;
		this.addField( new FfSelect( "rubrique", 40 ) ) ;
		this.addField( new FfImage( "image", 100, 100, 30 ) ) ;
		this.addField( new FfUpLoad( "upload", null, 3000000 ) ) ;
		this.addField( new FfSelect( "referencemodele", 20 ) ) ;
		this.addField( new FfLabel( "referencemodelelibelle", 50 ) ) ;
		this.addField( new FfCheck( "listevalue" ) ) ;
		this.addField( new FfInput( "width", 3 ) ) ;
		this.addField( new FfInput( "noordre", 3 ) ) ;
		this.addField( new FfNicEdit( "description", 90, 5 ) ) ;

		var sql = "SELECT rubrique, libelle from propertyrubrique order by rubrique" ;
		this.getFieldByName( "rubrique" ).populateItemsFromSql( sql ) ;

		sql = "SELECT type, libelle from propertytype order by type" ;
		this.getFieldByName( "type" ).populateItemsFromSql( sql ) ;

		sql = "SELECT reference, rlibelle from articles where type='Modele' order by rlibelle" ;
		this.getFieldByName( "referencemodele" ).populateItemsFromSql( sql ) ;
		},
	// Change de modele
	onModeleChanged: function()
		{
		if( this.modele )
			{
			if( this.image == "" ) this.upload = "image/" + this.modele.rubrique + "_" + this.modele.name + "_0.jpg" ;
			else this.upload = this.image ;
			}
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Propriété:" ) ) ;
		ha.add( this.getFieldByName( "name" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Type:" ) ) ;
		ha.add( this.getFieldByName( "type" ) ) ;
		ha.add( new FfEtiquette( "Rubrique:" ) ) ;
		ha.add( this.getFieldByName( "rubrique" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Image:" ) ) ;
		ha.add( this.getFieldByName( "image" ) ) ;
		ha.add( this.getFieldByName( "upload" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Modèle de référence:" ) ) ;
		ha.add( this.getFieldByName( "referencemodele" ) ) ;
		ha.add( this.getFieldByName( "referencemodelelibelle" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Liste de valeur:" ) ) ;
		ha.add( this.getFieldByName( "listevalue" ) ) ;
		ha.add( new FfEtiquette( "Largeur:" ) ) ;
		ha.add( this.getFieldByName( "width" ) ) ;
		ha.add( new FfEtiquette( "N° d'ordre:" ) ) ;
		ha.add( this.getFieldByName( "noordre" ) ) ;

		this.layout.add( new FfEtiquette( "Description:" ) ) ;
		this.layout.add( this.getFieldByName( "description" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "upload" )
			{
			this.image = value ;
			this.getFieldByName( "image" ).setHeight( this.getFieldByName( "upload" ).height ) ;
			}
		return true ;
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

