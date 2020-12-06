/*********************************************************
* Classe FmSociete: Formulaire des societes
*********************************************************/

function FmSociete( modele )
	{
	herite( FmSociete, Formulaire ) ;
	this.initFmSociete( modele ) ;
	}

FmSociete.prototype =
	{
	initFmSociete: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une société" ) ;
				
		this.addField( new FfLabel( "societe" ) ) ;
		this.addField( new FfInput( "rs", 40 ) ) ;
		this.addField( new FfInput( "datecreation", 15 ) ) ;

		this.addField( new FfNicEdit( "description", 80, 20 ) ) ;

		this.addField( new FfInput( "siret", 15 ) ) ;
		this.addField( new FfInput( "ape", 5 ) ) ;
		this.addField( new FfInput( "numtva", 15 ) ) ;
		
		this.addField( new FfSelect( "monaieref", 10, "select unite, libelle from unites where reference='EURO' order by libelle" ) ) ;
		this.addField( new FfSelect( "tauxtvadefaut", 10, "select tva, tva from tvataux order by tva" ) ) ;

		this.addField( new FfSelect( "stockmode", 20 ) ) ;
		this.addField( new FfCheck( "stocknegatif" ) ) ;
		
		this.getFieldByName( "stockmode" ).addItem( "NO", "Pas de gestion de stock" ) ;
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
		ha.add( new FfEtiquette( "Société:" ) ) ;
		ha.add( this.getFieldByName( "societe" ) ) ;
		ha.add( new FfEtiquette( "Raison sociale:" ) ) ;
		ha.add( this.getFieldByName( "rs" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Date de création:" ) ) ;
		ha.add( this.getFieldByName( "datecreation" ) ) ;

		var pbox = this.layout.add( new PageBoxLayout() ) ;

		// Page du résumé
		var page = this.layout.add( pbox.addPage( new PageLayout(), "Description" ) ) ;

		ha = page.add( new HTabLayout() ) ;

		page.add( this.getFieldByName( "description" ) ) ;

		// Page de la partie gestion
		page = this.layout.add( pbox.addPage( new PageLayout(), "Gestion" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "SIRET:" ) ) ;
		ha.add( this.getFieldByName( "siret" ) ) ;
		ha.add( new FfEtiquette( "Code APE:" ) ) ;
		ha.add( this.getFieldByName( "ape" ) ) ;
		ha.add( new FfEtiquette( "Numérot TVA:" ) ) ;
		ha.add( this.getFieldByName( "numtva" ) ) ;
		
		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Monaie:" ) ) ;
		ha.add( this.getFieldByName( "monaieref" ) ) ;

		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Mode de gestion de stock:" ) ) ;
		ha.add( this.getFieldByName( "stockmode" ) ) ;
		ha.add( new FfEtiquette( "Stock négatif accepté:" ) ) ;
		ha.add( this.getFieldByName( "stocknegatif" ) ) ;
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

