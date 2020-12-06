/*********************************************************
* Classe FmCmsFondueAction: Formulaire d'une
* action gestion d'affichage enchaine de noeux fils
* par variation des opacites. 
*********************************************************/

function FmCmsFondueAction( formulairecontroler, modele )
	{
	herite( FmCmsFondueAction, Formulaire ) ;
	this.initFmCmsFondueAction( formulairecontroler, modele ) ;
	}

FmCmsFondueAction.prototype =
	{
	initFmCmsFondueAction: function( modele )
		{
		this.initFormulaire( "Formulaire pour une fondue enchainee" ) ;

		this.addField( new FfLabel( "id" ) ) ;
		this.addField( new FfCheck( "actif" ) ) ;		
		this.addField( new FfInput( "noordre", 4 ) ) ;		
		this.addField( new FfInput( "timefondue", 4 ) ) ;		
		this.addField( new FfInput( "timepause", 4 ) ) ;		
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
		ha.add( new FfEtiquette( "Temps de transfert d'une image a l'autre:" ) ) ;
		ha.add( this.getFieldByName( "timefondue" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Temps de pause entre deux transfert:" ) ) ;
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

