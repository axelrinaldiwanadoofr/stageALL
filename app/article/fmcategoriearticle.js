/*********************************************************
* Classe FmCategorieArticle: Formulaire de mise a jour
* d'une famille d'article
*********************************************************/

function FmCategorieArticle( modele )
	{
	herite( FmCategorieArticle, Formulaire ) ;
	this.initFmCategorieArticle( modele ) ;
	}

FmCategorieArticle.prototype =
	{
	initFmCategorieArticle: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une catégorie" ) ;
		
		this.addField( new FfInput( "categorie", 10 ) ) ;
		this.addField( new FfImage( "image", 100, 100, 30 ) ) ;
		this.addField( new FfUpLoad( "upload", modele.categorie, 100, 3000000 ) ) ;
		this.addField( new FfInput( "libelle", 80 ) ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		},
	// Change de modele
	onModeleChanged: function()
		{
		this.upload = "image/" + this.modele.categorie ;
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Catégorie:" ) ) ;
		ha.add( this.getFieldByName( "categorie" ) ) ;
		ha.add( new FfEtiquette( "Image:" ) ) ;
		ha.add( this.getFieldByName( "image" ) ) ;
		ha.add( this.getFieldByName( "upload" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;
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

