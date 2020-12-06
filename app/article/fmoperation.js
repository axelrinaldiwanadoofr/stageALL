/*********************************************************
* Classe FmOperation: Formulaire de mise a jour
* d'un lien article - operation
*********************************************************/

function FmOperation( modele )
	{
	herite( FmOperation, Formulaire ) ;
	this.initFmOperation( modele ) ;
	}

FmOperation.prototype =
	{
	initFmOperation: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une operation" ) ;
		
		this.addField( new FfInput( "operation", 15 ) ) ;
		this.addField( new FfInput( "libelle", 50 ) ) ;
		this.addField( new FfSelect( "tauxhoraire", 20, "select typetaux, libelle from tauxhoraire order by libelle" ) ) ;
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
		ha.add( new FfEtiquette( "Opération:" ) ) ;
		ha.add( this.getFieldByName( "operation" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libelle:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Taux horaire:" ) ) ;
		ha.add( this.getFieldByName( "tauxhoraire" ) ) ;
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

