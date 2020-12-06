/*********************************************************
* Classe FmCmsSequenceAction: Formulaire d'une
* action d'execution en sequence d'actions filles
*********************************************************/

function FmCmsSequenceAction( formulairecontroler, modele )
	{
	herite( FmCmsSequenceAction, Formulaire ) ;
	this.initFmCmsSequenceAction( formulairecontroler, modele ) ;
	}

FmCmsSequenceAction.prototype =
	{
	initFmCmsSequenceAction: function( modele )
		{
		this.initFormulaire() ;

		this.addField( new FfLabel( "id" ) ) ;
		this.addField( new FfInput( "noordre", 4 ) ) ;		
		this.addField( new FfInput( "flag", 40 ) ) ;		
		this.addField( new FfInput( "vflag", 40 ) ) ;		
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
		ha.add( new FfEtiquette( "Flag:" ) ) ;
		ha.add( this.getFieldByName( "flag" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "VFlag:" ) ) ;
		ha.add( this.getFieldByName( "vflag" ) ) ;
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

