/*********************************************************
* Classe FmApString: Formulaire des propriétés ApString
*********************************************************/

function FmApRefArticle( modele, hidetitle )
	{
	herite( FmApRefArticle, Formulaire ) ;
	this.initFmApRefArticle( modele, hidetitle ) ;
	}

FmApRefArticle.prototype =
	{
	initFmApRefArticle: function( modele, hidetitle )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une propriete de reference vers un article", hidetitle ) ;

		this.addField( new FfLabel( "name", 20 ) ) ;
		this.addField( new FfSelect( "article", 20 ) ) ;
		this.addField( new FfLabel( "libelle", 80 ) ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		},
	// Change de modele
	onModeleChanged: function()
		{
		if( this.modele )
			{
			var sql = "SELECT reference, rlibelle " ;
			sql += "FROM articles AS a, property AS p " ;
			sql += "WHERE rubrique = '" + this.modele.rubrique + "' " ;
			sql += "AND name = '" + this.modele.name + "' " ;
			sql += "AND a.referencemodele = p.referencemodele " ;
			sql += "ORDER BY rlibelle" ;
			this.getFieldByName( "article" ).populateItemsFromSql( sql ) ;
			}
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Propriété:" ) ) ;
		ha.add( this.getFieldByName( "name" ) ) ;
		ha.add( this.getFieldByName( "article" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;
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

