/*********************************************************
* Classe FmCmsPage: Formulaire des pages du CMS
*********************************************************/

function FmCmsPage( formulairecontroler, modele )
	{
	herite( FmCmsPage, Formulaire ) ;
	this.initFmCmsPage( formulairecontroler, modele ) ;
	}

FmCmsPage.prototype =
	{
	initFmCmsPage: function( modele )
		{
		this.initFormulaire( "Formulaire d'une page WEB du CMS" ) ;

		this.addField( new FfInput( "page", 40 ) ) ;
		this.addField( new FfInput( "libelle", 90 ) ) ;
		this.addField( new FfInput( "url", 80 ) ) ;
		this.addField( new FfSelect( "module", 40 ) ) ;
		this.addField( new FfInput( "title", 80 ) ) ;
		this.addField( new FfInput( "description", 80 ) ) ;
		this.addField( new FfInput( "keywords", 80 ) ) ;

		var sql = "SELECT module, concat( module, ': ' , libelle) from cms_module order by module" ;
		this.getFieldByName( "module" ).populateItemsFromSql( sql ) ;
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Page:" ) ) ;
		ha.add( this.getFieldByName( "page" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Url:" ) ) ;
		ha.add( this.getFieldByName( "url" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Module:" ) ) ;
		ha.add( this.getFieldByName( "module" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Titre de la page:" ) ) ;
		ha.add( this.getFieldByName( "title" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Description:" ) ) ;
		ha.add( this.getFieldByName( "description" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Mots cles:" ) ) ;
		ha.add( this.getFieldByName( "keywords" ) ) ;
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

