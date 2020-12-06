/*********************************************************
* Classe FmApImage: Formulaire des propriétés ApString
*********************************************************/

function FmApImage( modele, hidetitle )
	{
	herite( FmApImage, Formulaire ) ;
	this.initFmApImage( modele, hidetitle ) ;
	}

FmApImage.prototype =
	{
	initFmApImage: function( modele, hidetitle )
		{
		this.initFormulaire( "Formulaire de mise d'une propriete image", hidetitle ) ;

		this.addField( new FfLabel( "name", 20 ) ) ;
		this.addField( new FfInput( "width", 5 ) ) ;
		this.addField( new FfInput( "height", 5 ) ) ;
		this.addField( new FfImage( "fichier", 100, 100, 30 ) ) ;
		this.addField( new FfUpLoad( "upload", null, 3000000 ) ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		this.getFieldByName( "upload" ).setWidth( this.width ) ;
		this.getFieldByName( "fichier" ).setWidth( this.width ) ;
		this.getFieldByName( "fichier" ).setHeight( this.height ) ;
		},
	// Change de modele
	onModeleChanged: function()
		{
		if( this.fichier == "" ) this.upload = "image/" + this.modele.reference + "_" + this.modele.rubrique + "_" + this.modele.name + "_0.jpg" ;
		else this.upload = this.fichier ;
		//this.getFieldByName( "upload" ).setFilename( this.fichier ) ;
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Propriété:" ) ) ;
		ha.add( this.getFieldByName( "name" ) ) ;
		ha.add( new FfEtiquette( "Largeur:" ) ) ;
		ha.add( this.getFieldByName( "width" ) ) ;
		ha.add( new FfEtiquette( "Hauteur:" ) ) ;
		ha.add( this.getFieldByName( "height" ) ) ;
		ha.add( this.getFieldByName( "fichier" ) ) ;
		ha.add( this.getFieldByName( "upload" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "width" )
			{
			var ratio = 1.0 ;
			if( this.modele.width > 0 )	ratio = this.height / this.width ;
			this.height = ratio * value ;
			this.width = value ;
			this.getFieldByName( "upload" ).setWidth( this.width ) ;
			this.getFieldByName( "fichier" ).setWidthWithKeepRatio( this.width ) ;
			}
		if( fieldname == "upload" )
			{
			this.fichier = value ;
			this.height = this.getFieldByName( "upload" ).height ;
			this.getFieldByName( "fichier" ).setHeight( this.height ) ;
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

