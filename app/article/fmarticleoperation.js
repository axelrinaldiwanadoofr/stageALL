/*********************************************************
* Classe FmArticleOperation: Formulaire de mise a jour
* d'un lien article - operation
*********************************************************/

function FmArticleOperation( modele )
	{
	herite( FmArticleOperation, Formulaire ) ;
	this.initFmArticleOperation( modele ) ;
	}

FmArticleOperation.prototype =
	{
	initFmArticleOperation: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une operation" ) ;
		
		this.addField( new FfLabel( "reference" ) ) ;
		this.addField( new FfInput( "noordre", 5 ) ) ;
		this.addField( new FfSelectEdit( "operation", 20, 10, "select operation,libelle from operations where 1 order by libelle", "libelle", 40 ) ) ;
		this.addField( new FfInput( "libelle", 50 ) ) ;
		this.addField( new FfInputFloat( "temps", 8 ) ) ;
		this.addField( new FfInputFloat( "pht", 8 ) ) ;
		this.addField( new FfSelect( "modecalculpht", 50 ) ) ;
		this.addField( new FfSelectEdit( "soustraitant", 5, 10, "select sid,rs from structures where 1 order by rs", "rs", 40 ) ) ;
		this.addField( new FfLabel( "rssoustraitant" ) ) ;
		this.addField( new FfNicEdit( "commentaire", 80, 30 ) ) ;
		
		this.getFieldByName( "modecalculpht" ).addItem( "0", "Saisie manuelle dans le champ pht" ) ;		
		this.getFieldByName( "modecalculpht" ).addItem( "1", "A partir du temps et du taux horaire associe a l'operation" ) ;		
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Reception de la raison sociale
	onReceveLibelle: function( sql )
		{
		this.modele.setValue( "libelle", sql.rows[0][0] ) ;
		this.modele.save() ;
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Article:" ) ) ;
		ha.add( this.getFieldByName( "reference" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "N. ordre:" ) ) ;
		ha.add( this.getFieldByName( "noordre" ) ) ;
		ha.add( new FfEtiquette( "Operation:" ) ) ;
		ha.add( this.getFieldByName( "operation" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Temps operatoire (Hrs):" ) ) ;
		ha.add( this.getFieldByName( "temps" ) ) ;
		ha.add( new FfEtiquette( "Cout HT operatoire:" ) ) ;
		ha.add( this.getFieldByName( "pht" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Mode de calcul du cout:" ) ) ;
		ha.add( this.getFieldByName( "modecalculpht" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Sous traitant:" ) ) ;
		ha.add( this.getFieldByName( "soustraitant" ) ) ;
		ha.add( this.getFieldByName( "rssoustraitant" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Commentaire:" ) ) ;
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( this.getFieldByName( "commentaire" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "operation" )
			{
			if( value != "" ) var sql = new SqlSelect( "select libelle from operations where operation='" + value + "'", 0, -1, this, this.onReceveLibelle ) ;
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

