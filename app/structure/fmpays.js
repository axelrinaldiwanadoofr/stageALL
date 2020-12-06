/*********************************************************
* Classe FmPays: Formulaire de mise a jour
* d'un contact
*********************************************************/

function FmPays( modele )
	{
	herite( FmPays, Formulaire ) ;
	this.initFmPays( modele ) ;
	}

FmPays.prototype =
	{
	initFmPays: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'un pays" ) ;
		

		this.addField( new FfInput( "pays", 20 ) ) ;
		this.addField( new FfImage( "drapeau", 100, 100, 30 ) ) ;
		this.addField( new FfUpLoad( "upload", "image/" + modele.pays + ".jpg", 3000000 ) ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		if( this.drapeau == "" ) this.upload = "image/" + this.modele.pays + ".jpg" ;
		else this.upload = this.drapeau ;
		this.getFieldByName( "upload" ).setWidth( 200 ) ;
		this.getFieldByName( "drapeau" ).setWidth( 200 ) ;
		this.getFieldByName( "drapeau" ).setHeight( 200 ) ;
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Pays:" ) ) ;
		ha.add( this.getFieldByName( "pays" ) ) ;
		ha.add( this.getFieldByName( "drapeau" ) ) ;
		ha.add( this.getFieldByName( "upload" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "upload" )
			{
			this.drapeau = value ;
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

