/*********************************************************
* Classe FmPropertyRubrique: Formulaire des  rubriques de
* propriétés
*********************************************************/

function FmPropertyRubrique( formulairecontroler, modele )
	{
	herite( FmPropertyRubrique, Formulaire ) ;
	this.initFmPropertyRubrique( formulairecontroler, modele ) ;
	}

FmPropertyRubrique.prototype =
	{
	initFmPropertyRubrique: function( modele )
		{
		this.initFormulaire( "Formulaire des rubriques de propriété d'article" ) ;

		this.addField( new FfInput( "rubrique", 40 ) ) ;
		this.addField( new FfInput( "libelle", 60 ) ) ;
		this.addField( new FfSelect( "rubriqueparent", 40 ) ) ;
		this.addField( new FfImage( "image", 100, 100, 30 ) ) ;
		this.addField( new FfUpLoad( "upload", null, 3000000 ) ) ;
		this.addField( new FfInput( "noordre", 3 ) ) ;
		},
	// Change de modele
	onModeleChanged: function()
		{
		if( this.modele )
			{
			var sql = "SELECT rubrique, libelle from propertyrubrique order by rubrique" ;
			this.getFieldByName( "rubriqueparent" ).populateItemsFromSql( sql ) ;

			if( this.image == "" ) this.upload = "image/" + this.modele.rubrique + "_0.jpg" ;
			else this.upload = this.image ;
			}
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Rubrique:" ) ) ;
		ha.add( this.getFieldByName( "rubrique" ) ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Rubrique parent:" ) ) ;
		ha.add( this.getFieldByName( "rubriqueparent" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Image de la rubrique:" ) ) ;
		ha.add( this.getFieldByName( "image" ) ) ;
		ha.add( this.getFieldByName( "upload" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "N° d'ordre:" ) ) ;
		ha.add( this.getFieldByName( "noordre" ) ) ;
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

