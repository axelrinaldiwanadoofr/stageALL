/*********************************************************
* Classe FmApString: Formulaire des propriétés ApString
*********************************************************/

function FmApString( modele, hidetitle )
	{
	herite( FmApString, Formulaire ) ;
	this.initFmApString( modele, hidetitle ) ;
	}

FmApString.prototype =
	{
	initFmApString: function( modele, hidetitle )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une propriete d'une propriete", hidetitle) ;

		this.addField( new FfLabel( "name", 20 ) ) ;
		this.addField( new FfInput( "value", 90 ) ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		},
	// Change de modele
	onModeleChanged: function()
		{
		if( this.modele.rubrique && this.modele.name )
			{
			var cursor = new SqlSelect( "select width from property where rubrique='" + this.modele.rubrique + "' and name='" + this.modele.name + "'", 0, -1, this, this.onReceveWidth ) ;
			}
		},
	// Recoie largeur
	onReceveWidth: function( cursor )
		{
		this.getFieldByName( "value" ).setSize( parseInt( cursor.rows[0][0] ) ) ;
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Propriété:" ) ) ;
		ha.add( this.getFieldByName( "name" ) ) ;
		ha.add( this.getFieldByName( "value" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( field, value )
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

