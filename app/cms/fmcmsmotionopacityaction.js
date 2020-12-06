/*********************************************************
* Classe FmCmsMotionOpacityAction: Formulaire d'une
* action de changement progressif d'opacite
* autre
*********************************************************/

function FmCmsMotionOpacityAction( formulairecontroler, modele )
	{
	herite( FmCmsMotionOpacityAction, Formulaire ) ;
	this.initFmCmsMotionOpacityAction( formulairecontroler, modele ) ;
	}

FmCmsMotionOpacityAction.prototype =
	{
	initFmCmsMotionOpacityAction: function( modele )
		{
		this.initFormulaire() ;

		this.addField( new FfLabel( "id" ) ) ;
		this.addField( new FfInput( "noordre", 4 ) ) ;		
		this.addField( new FfInput( "velocity", 4 ) ) ;		
		this.addField( new FfInput( "startopacity", 4 ) ) ;		
		this.addField( new FfInput( "endopacity", 4 ) ) ;		
		this.addField( new FfCheck( "allchild", 4 ) ) ;	
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Changement progressif d'opacité id:" ) ) ;
		ha.add( this.getFieldByName( "id" ) ) ;
		ha.add( new FfEtiquette( "Numéro d'ordre:" ) ) ;
		ha.add( this.getFieldByName( "noordre" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Temps de chagement:" ) ) ;
		ha.add( this.getFieldByName( "velocity" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Opacité de départ: x:" ) ) ;
		ha.add( this.getFieldByName( "startopacity" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Opacité d'arrivé: x:" ) ) ;
		ha.add( this.getFieldByName( "endopacity" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Applique le changement a tous les noeux fils:" ) ) ;
		ha.add( this.getFieldByName( "allchild" ) ) ;
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

