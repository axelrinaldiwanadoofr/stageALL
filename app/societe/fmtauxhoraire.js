/*********************************************************
* Classe FmTauxHoraire: Formulaire de mise a jour
* d'un taux de tva
*********************************************************/

function FmTauxHoraire( modele )
	{
	herite( FmTauxHoraire, Formulaire ) ;
	this.initFmTauxHoraire( modele ) ;
	}

FmTauxHoraire.prototype =
	{
	initFmTauxHoraire: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'un taux horaire" ) ;
		
		this.addField( new FfInput( "typetaux", 15 ) ) ;
		this.addField( new FfInput( "libelle", 60 ) ) ;
		this.addField( new FfSelect( "monaie", 10, "select unite, libelle from unites where reference='EURO' order by unite" ) ) ;
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
		ha.add( new FfEtiquette( "Type de taux:" ) ) ;
		ha.add( this.getFieldByName( "typetaux" ) ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Monaie:" ) ) ;
		ha.add( this.getFieldByName( "monaie" ) ) ;
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

