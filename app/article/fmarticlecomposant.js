/*********************************************************
* Classe FmArticleComposant: Formulaire de mise a jour
* d'un lien article - structure
*********************************************************/

function FmArticleComposant( modele )
	{
	herite( FmArticleComposant, Formulaire ) ;
	this.initFmArticleComposant( modele ) ;
	}

FmArticleComposant.prototype =
	{
	initFmArticleComposant: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'un composant" ) ;
		
		this.addField( new FfLabel( "reference" ) ) ;
		this.addField( new FfSelectEdit( "composant", 10, 10, "select reference,rlibelle from articles where 1 order by rlibelle", "rlibelle", 50 ) ) ;
		this.addField( new FfLabel( "rlibelle" ) ) ;
		this.addField( new FfInputFloat( "qte", 8 ) ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		},
	// Change de modele
	onModeleChanged: function()
		{
		if( this.modele.composant ) var sql = new SqlSelect( "select rlibelle from articles where reference='" + this.modele.composant + "'", 0, -1, this, this.onReceveRLibelle ) ;
		},
	// Reception de la raison sociale
	onReceveRLibelle: function( sql )
		{
		this.rlibelle = sql.rows[0][0] ;
		this.copyAttributeValuesToFields() ;
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Article:" ) ) ;
		ha.add( this.getFieldByName( "reference" ) ) ;
		ha.add( new FfEtiquette( "Composant:" ) ) ;
		ha.add( this.getFieldByName( "composant" ) ) ;
		ha.add( this.getFieldByName( "rlibelle" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Quantite:" ) ) ;
		ha.add( this.getFieldByName( "qte" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "composant" )
			{
			if( value != "" ) var sql = new SqlSelect( "select rlibelle from articles where reference='" + value + "'", 0, -1, this, this.onReceveRLibelle ) ;
			else this.rlibelle = "" ;
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

