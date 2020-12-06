/*********************************************************
* Classe FmCmsGalerieAction: Formulaire d'une
* action de galerie d'image sur les noeux fils
*********************************************************/

function FmCmsGalerieAction( formulairecontroler, modele )
	{
	herite( FmCmsGalerieAction, Formulaire ) ;
	this.initFmCmsGalerieAction( formulairecontroler, modele ) ;
	}

FmCmsGalerieAction.prototype =
	{
	initFmCmsGalerieAction: function( modele )
		{
		this.initFormulaire( "Formulaire pour une Galerie enchainee" ) ;

		this.addField( new FfLabel( "id" ) ) ;
		this.addField( new FfCheck( "actif" ) ) ;		
		this.addField( new FfInput( "noordre", 4 ) ) ;		
		this.addField( new FfInput( "timepause", 4 ) ) ;		
		this.addField( new FfInput( "countvisible", 4 ) ) ;		
		this.addField( new FfInput( "width", 4 ) ) ;		
		this.addField( new FfInput( "height", 4 ) ) ;		
		this.addField( new FfInput( "marge", 4 ) ) ;		
		this.addField( new FfInput( "xview", 4 ) ) ;		
		this.addField( new FfInput( "yview", 4 ) ) ;		
		this.addField( new FfInput( "widthview", 4 ) ) ;		
		this.addField( new FfInput( "heightview", 4 ) ) ;		
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Id:" ) ) ;
		ha.add( this.getFieldByName( "id" ) ) ;
		ha.add( new FfEtiquette( "Active:" ) ) ;
		ha.add( this.getFieldByName( "actif" ) ) ;
		ha.add( new FfEtiquette( "Numéro d'ordre:" ) ) ;
		ha.add( this.getFieldByName( "noordre" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Largeur du bandeau:" ) ) ;
		ha.add( this.getFieldByName( "width" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Hauteur du bandeau:" ) ) ;
		ha.add( this.getFieldByName( "height" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Marge entre 2 images du bandeau:" ) ) ;
		ha.add( this.getFieldByName( "marge" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Nombre d'images visibles dans le bandeau:" ) ) ;
		ha.add( this.getFieldByName( "countvisible" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Position de l'image principale x:" ) ) ;
		ha.add( this.getFieldByName( "xview" ) ) ;
		ha.add( new FfEtiquette( "y:" ) ) ;
		ha.add( this.getFieldByName( "yview" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Taille de l'image principale largeur:" ) ) ;
		ha.add( this.getFieldByName( "widthview" ) ) ;
		ha.add( new FfEtiquette( "hauteur:" ) ) ;
		ha.add( this.getFieldByName( "heightview" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Temps de pause:" ) ) ;
		ha.add( this.getFieldByName( "timepause" ) ) ;
		},
		
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
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

