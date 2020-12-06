/*********************************************************
* Classe FmCmsLabelTexte: Formulaire d'un texte
* associé à une langue d'un label du CMS
*********************************************************/

function FmCmsLabelTexte( modele, hidetitle )
	{
	herite( FmCmsLabelTexte, Formulaire ) ;
	this.initFmCmsLabelTexte( modele, hidetitle ) ;
	}

FmCmsLabelTexte.prototype =
	{
	initFmCmsLabelTexte: function( modele, hidetitle )
		{
		this.initFormulaire( "Formulaire de mise a jour d'un texte dans une langue particulière", hidetitle ) ;

		this.addField( new FfSelect( "lang", 8 ) ) ;
		this.addField( new FfButton( "efface", "Effacer tout le texte" ) ) ;
		this.addField( new FfNicEdit( "texte", 120, 30 ) ) ;
		
		this.getFieldByName( "lang" ).addItem( "FRA", "Français" ) ;
		this.getFieldByName( "lang" ).addItem( "ENG", "English" ) ;
		this.getFieldByName( "lang" ).addItem( "DEU", "Deutch" ) ;
		this.getFieldByName( "lang" ).addItem( "ITA", "Italiano" ) ;
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Change de modele
	onClick: function( field )
		{
		if( field == this.getFieldByName( "efface" ) )
			{
			this.texte = "" ;
			this.validateAttributeChange() ;
			}
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Langue:" ) ) ;
		ha.add( this.getFieldByName( "lang" ) ) ;
		ha.add( this.getFieldByName( "efface" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( this.getFieldByName( "texte" ) ) ;
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

