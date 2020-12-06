/*********************************************************
* Classe FmConditionPaiement: Formulaire de mise a jour
* d'une condition de payement
*********************************************************/

function FmConditionPaiement( modele )
	{
	herite( FmConditionPaiement, Formulaire ) ;
	this.initFmConditionPaiement( modele ) ;
	}

FmConditionPaiement.prototype =
	{
	initFmConditionPaiement: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une condition de payement" ) ;
		
		this.addField( new FfInput( "conditionp", 30 ) ) ;
		this.addField( new FfInput( "libelle", 80 ) ) ;
		this.addField( new FfInput( "nbjour", 3 ) ) ;
		this.addField( new FfInput( "nbmois", 3 ) ) ;
		this.addField( new FfInput( "jour", 3 ) ) ;
		this.addField( new FfCheck( "finmois" ) ) ;
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
		ha.add( new FfEtiquette( "Condition:" ) ) ;
		ha.add( this.getFieldByName( "conditionp" ) ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Nb jours:" ) ) ;
		ha.add( this.getFieldByName( "nbjour" ) ) ;
		ha.add( new FfEtiquette( "Nb mois:" ) ) ;
		ha.add( this.getFieldByName( "nbjour" ) ) ;
		ha.add( new FfEtiquette( "Numéro du jour:" ) ) ;
		ha.add( this.getFieldByName( "jour" ) ) ;
		ha.add( new FfEtiquette( "Fin de mois:" ) ) ;
		ha.add( this.getFieldByName( "finmois" ) ) ;
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

