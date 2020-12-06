/*********************************************************
* Classe FmArticleStructure: Formulaire de mise a jour
* d'un lien article - structure
*********************************************************/

function FmArticleStructure( modele )
	{
	herite( FmArticleStructure, Formulaire ) ;
	this.initFmArticleStructure( modele ) ;
	}

FmArticleStructure.prototype =
	{
	initFmArticleStructure: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'un lien fournisseur" ) ;
		
		this.addField( new FfLabel( "reference" ) ) ;
		this.addField( new FfSelectEdit( "sid", 5, 10, "select sid,rs from structures where 1 order by rs", "rs", 30 ) ) ;
		this.addField( new FfLabel( "rs" ) ) ;
		this.addField( new FfInput( "reffour", 20 ) ) ;
		this.addField( new FfCheck( "pardefaut" ) ) ;
		this.addField( new FfInputFloat( "puht_achat", 8 ) ) ;
		this.addField( new FfInputFloat( "txremise", 4 ) ) ;
		this.addField( new FfNicEdit( "commentaire", 50, 30 ) ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		},
	// Change de modele
	onModeleChanged: function()
		{
		if( this.modele.sid ) var sql = new SqlSelect( "select rs from structures where sid=" + this.modele.sid, 0, -1, this, this.onReceveRs ) ;
		},
	// Reception de la raison sociale
	onReceveRs: function( sql )
		{
		this.rs = sql.rows[0][0] ;
		this.copyAttributeValuesToFields() ;
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Article:" ) ) ;
		ha.add( this.getFieldByName( "reference" ) ) ;
		ha.add( new FfEtiquette( "Fournisseur:" ) ) ;
		ha.add( this.getFieldByName( "sid" ) ) ;
		ha.add( this.getFieldByName( "rs" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Référence fournisseur:" ) ) ;
		ha.add( this.getFieldByName( "reffour" ) ) ;
		ha.add( new FfEtiquette( "Fournisseur par défaut" ) ) ;
		ha.add( this.getFieldByName( "pardefaut" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Prix unitaire HT:" ) ) ;
		ha.add( this.getFieldByName( "puht_achat" ) ) ;
		ha.add( new FfEtiquette( "Taux de remise:" ) ) ;
		ha.add( this.getFieldByName( "txremise" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Commentaire:" ) ) ;
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( this.getFieldByName( "commentaire" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "sid" )
			{
			if( value != "" ) var sql = new SqlSelect( "select rs from structures where sid=" + value, 0, -1, this, this.onReceveRs ) ;
			else this.rs = "" ;
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

