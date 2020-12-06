/*********************************************************
* Classe FmCmsMotionPoint2PointAction: Formulaire d'une
* action de deplacement progressif d'un point vers un 
* autre
*********************************************************/

function FmCmsMotionPoint2PointAction( formulairecontroler, modele )
	{
	herite( FmCmsMotionPoint2PointAction, Formulaire ) ;
	this.initFmCmsMotionPoint2PointAction( formulairecontroler, modele ) ;
	}

FmCmsMotionPoint2PointAction.prototype =
	{
	initFmCmsMotionPoint2PointAction: function( modele )
		{
		this.initFormulaire() ;

		this.addField( new FfLabel( "id" ) ) ;
		this.addField( new FfInput( "noordre", 4 ) ) ;		
		this.addField( new FfInput( "time", 4 ) ) ;		
		this.addField( new FfInput( "start_x", 4 ) ) ;		
		this.addField( new FfInput( "start_y", 4 ) ) ;		
		this.addField( new FfInput( "start_z", 4 ) ) ;	
		this.addField( new FfInput( "end_x", 4 ) ) ;		
		this.addField( new FfInput( "end_y", 4 ) ) ;		
		this.addField( new FfInput( "end_z", 4 ) ) ;	
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Deplacement progressif d'un point vers un autre id:" ) ) ;
		ha.add( this.getFieldByName( "id" ) ) ;
		ha.add( new FfEtiquette( "Numéro d'ordre:" ) ) ;
		ha.add( this.getFieldByName( "noordre" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Temps de déplacement:" ) ) ;
		ha.add( this.getFieldByName( "time" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Point de départ: x:" ) ) ;
		ha.add( this.getFieldByName( "start_x" ) ) ;
		ha.add( new FfEtiquette( "y:" ) ) ;
		ha.add( this.getFieldByName( "start_y" ) ) ;
		ha.add( new FfEtiquette( "Elévation:" ) ) ;
		ha.add( this.getFieldByName( "start_z" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Point d'arrivé: x:" ) ) ;
		ha.add( this.getFieldByName( "end_x" ) ) ;
		ha.add( new FfEtiquette( "y:" ) ) ;
		ha.add( this.getFieldByName( "end_y" ) ) ;
		ha.add( new FfEtiquette( "Elévation:" ) ) ;
		ha.add( this.getFieldByName( "end_z" ) ) ;
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

