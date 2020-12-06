/*********************************************************
* Classe FmTypeEscompte: Formulaire de mise a jour
* d'un type de port
*********************************************************/

function FmTypeEscompte( modele )
	{
	herite( FmTypeEscompte, Formulaire ) ;
	this.initFmTypeEscompte( modele ) ;
	}

FmTypeEscompte.prototype =
	{
	initFmTypeEscompte: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'un type d'escompte" ) ;
		
		this.addField( new FfInput( "typeescompte", 30 ) ) ;
		this.addField( new FfInput( "libelle", 80 ) ) ;
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
		ha.add( new FfEtiquette( "Type:" ) ) ;
		ha.add( this.getFieldByName( "typeescompte" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;
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

