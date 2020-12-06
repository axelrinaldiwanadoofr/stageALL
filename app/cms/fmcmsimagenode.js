/*********************************************************
* Classe FmCmsImageNode: Formulaire des noeux image du CMS
*********************************************************/

function FmCmsImageNode( formulairecontroler, modele )
	{
	herite( FmCmsImageNode, Formulaire ) ;
	this.initFmCmsImageNode( formulairecontroler, modele ) ;
	}

FmCmsImageNode.prototype =
	{
	initFmCmsImageNode: function( modele )
		{
		this.initFormulaire() ;

		this.addField( new FfLabel( "id" ) ) ;
		this.addField( new FfInput( "imgwidth", 5 ) ) ;
		this.addField( new FfInput( "imgheight", 5 ) ) ;
		this.addField( new FfImage( "filename", 100, 100, 30 ) ) ;
		this.addField( new FfUpLoad( "upload", "image/" + modele.id + ".jpg", 3000000 ) ) ;
		this.addField( new FfInput( "tfilename", 50 ) ) ;
		this.addField( new FfInput( "width", 5 ) ) ;
		this.addField( new FfInput( "height", 5 ) ) ;
		this.addField( new FfCheck( "visible" ) ) ;		
		this.addField( new FfInput( "opacity", 4 ) ) ;		
		this.addField( new FfInput( "x", 4 ) ) ;		
		this.addField( new FfInput( "y", 4 ) ) ;		
		this.addField( new FfInput( "z", 4 ) ) ;		
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		if( this.filename == "" ) this.upload = "image/" + this.modele.id + ".jpg" ;
		else this.upload = this.filename ;
		this.tfilename = this.filename ;
		this.getFieldByName( "upload" ).setWidth( this.imgwidth ) ;
		this.getFieldByName( "filename" ).setWidth( this.imgwidth ) ;
		this.getFieldByName( "filename" ).setHeight( this.imgheight ) ;
		},
	// Change de modele
	onModeleChanged: function()
		{
		//this.getFieldByName( "upload" ).setFilename( this.filename ) ;
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Image id:" ) ) ;
		ha.add( this.getFieldByName( "id" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Largeur:" ) ) ;
		ha.add( this.getFieldByName( "imgwidth" ) ) ;
		ha.add( new FfEtiquette( "Hauteur:" ) ) ;
		ha.add( this.getFieldByName( "imgheight" ) ) ;
		ha.add( this.getFieldByName( "filename" ) ) ;
		ha.add( this.getFieldByName( "upload" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Nom manuel pour l'image:" ) ) ;
		ha.add( this.getFieldByName( "tfilename" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Visible:" ) ) ;
		ha.add( this.getFieldByName( "visible" ) ) ;
		ha.add( new FfEtiquette( "Opacité:" ) ) ;
		ha.add( this.getFieldByName( "opacity" ) ) ;
		ha.add( new FfEtiquette( "Largeur affichage:" ) ) ;
		ha.add( this.getFieldByName( "width" ) ) ;
		ha.add( new FfEtiquette( "Hauteur affichage:" ) ) ;
		ha.add( this.getFieldByName( "height" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Position x:" ) ) ;
		ha.add( this.getFieldByName( "x" ) ) ;
		ha.add( new FfEtiquette( "y:" ) ) ;
		ha.add( this.getFieldByName( "y" ) ) ;
		ha.add( new FfEtiquette( "Elévation:" ) ) ;
		ha.add( this.getFieldByName( "z" ) ) ;		
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "imgwidth" )
			{
			var ratio = 1.0 ;
			if( this.modele.imgwidth > 0 )	ratio = this.imgheight / this.imgwidth ;
			this.imgheight = ratio * value ;
			this.imgwidth = value ;
			this.getFieldByName( "upload" ).setWidth( this.imgwidth ) ;
			this.getFieldByName( "filename" ).setWidthWithKeepRatio( this.imgwidth ) ;
			}
		if( fieldname == "upload" )
			{
			this.filename = value ;
			this.imgheight = this.getFieldByName( "upload" ).height ;
			this.getFieldByName( "filename" ).setHeight( this.imgheight ) ;
			}
		if( fieldname == "tfilename" )
			{
			this.filename = value ;
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

