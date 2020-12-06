/*********************************************************
* Classe FmArticleProperties: Formulaire permettant
* d'associer une nouvelle propriété à un article
*********************************************************/

function FmArticleProperties( tnarticleproperties )
	{
	herite( FmArticleProperties, Formulaire ) ;
	this.initFmArticleProperties( tnarticleproperties ) ;
	}

FmArticleProperties.prototype =
	{
	initFmArticleProperties: function( tnarticleproperties )
		{
		this.tnarticleproperties = tnarticleproperties ;
		
		this.initFormulaire( "Formulaire d'ajout de propriété pour un article" ) ;

		this.addField( new FfLabel( "reference", 20 ) ) ;
		this.addField( new FfLabel( "rlibelle", 80 ) ) ;
		this.addField( new FfSelect( "rubrique", 30 ) ) ;
		this.addField( new FfSelect( "name", 30 ) ) ;
		this.addField( new FfButton( "ajouter", "Ajouter la propriété" ) ) ;

		this.getFieldByName( "rubrique" ).populateItemsFromSql( "SELECT rubrique, libelle FROM propertyrubrique order by rubrique" ) ;
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
		ha.add( new FfEtiquette( "Ajout d'une propriété pour l'article:" ) ) ;
		ha.add( this.getFieldByName( "reference" ) ) ;
		ha.add( this.getFieldByName( "rlibelle" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Sélectionnez une rubrique:" ) ) ;
		ha.add( this.getFieldByName( "rubrique" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Sélectionnez une propriété:" ) ) ;
		ha.add( this.getFieldByName( "name" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( this.getFieldByName( "ajouter" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "rubrique" && value != "" )
			{
			this.getFieldByName( "name" ).clearAllItems() ;
			this.getFieldByName( "name" ).populateItemsFromSql( "SELECT name, libelle FROM property where rubrique='" + value + "' order by name" ) ;			
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
		},
	// Devient non selectionnée
	onClick: function( field ) 
		{
		if( field.name == "ajouter" )
			{
			if( this.rubrique && this.property )
				{
				var cursor = new SqlSelect( "select rubrique, name, type from property where rubrique='" + this.rubrique + "' and name='" + this.property + "'", 0, -1, this, this.onReceveProperty ) ;
				}
			else if( this.rubrique )
				{
				var cursor = new SqlSelect( "select rubrique, name, type from property where rubrique='" + this.rubrique + "'", 0, -1, this, this.onReceveProperty ) ;
				}
			}
		},
	// Devient non selectionnée
	onReceveProperty: function( cursor ) 
		{
		for( var i=0 ; i<cursor.rows.length ; i++ )
			{
			this.tnarticleproperties.onNewProperty( cursor.rows[i][2], cursor.rows[i][0], cursor.rows[i][1] ) ;
			}
		}
	} ;

