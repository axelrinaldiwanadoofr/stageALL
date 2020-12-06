/*********************************************************
* Classe FmFamilleArticle: Formulaire de mise a jour
* d'une famille d'article
*********************************************************/

function FmFamilleArticle( modele )
	{
	herite( FmFamilleArticle, Formulaire ) ;
	this.initFmFamilleArticle( modele ) ;
	}

FmFamilleArticle.prototype =
	{
	initFmFamilleArticle: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une famille" ) ;
		
		this.addField( new FfInput( "famille", 10 ) ) ;
		this.addField( new FfImage( "image", 100, 100, 30 ) ) ;
		this.addField( new FfUpLoad( "upload", modele.famille, 100, 3000000 ) ) ;		
		this.addField( new FfInput( "libelle", 80 ) ) ;
		this.addField( new FfSelect( "categorie", 30, "select categorie, libelle from categoriearticles order by categorie" ) ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		},
	// Change de modele
	onModeleChanged: function()
		{
		this.upload = "image/" + this.modele.famille ;
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Famille:" ) ) ;
		ha.add( this.getFieldByName( "famille" ) ) ;
		ha.add( new FfEtiquette( "Image:" ) ) ;
		ha.add( this.getFieldByName( "image" ) ) ;
		ha.add( this.getFieldByName( "upload" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Catégorie:" ) ) ;
		ha.add( this.getFieldByName( "categorie" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "upload" )
			{
			this.image = value ;
			this.getFieldByName( "image" ).setHeight( this.getFieldByName( "upload" ).height ) ;
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

