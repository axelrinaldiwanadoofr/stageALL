/*********************************************************
* Classe FmArticleExport: Formulaire de mise a jour
* d'un lien article - operation
*********************************************************/

function FmArticleExport( modele )
	{
	herite( FmArticleExport, Formulaire ) ;
	this.initFmArticleExport( modele ) ;
	}

FmArticleExport.prototype =
	{
	initFmArticleExport: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'un champ d'export" ) ;
		
		this.addField( new FfSelect( "dbfield", 20, "select dbfield, etiquette from articleexport where recherche is null order by etiquette" ) ) ;
		this.addField( new FfInput( "entete", 50 ) ) ;
		this.addField( new FfInput( "noordre", 5 ) ) ;
		this.addField( new FfSelect( "format", 20 ) ) ;
		
		this.getFieldByName( "format" ).addItem( "S", "Chaine de caracteres" ) ;
		this.getFieldByName( "format" ).addItem( "I", "Entier" ) ;
		this.getFieldByName( "format" ).addItem( "F|2|,| |€", "Euro" ) ;
		this.getFieldByName( "format" ).addItem( "F|2|,| |", "Reel 2 chiffres" ) ;
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
		ha.add( new FfEtiquette( "Champ:" ) ) ;
		ha.add( this.getFieldByName( "dbfield" ) ) ;
		ha.add( new FfEtiquette( "Nom d'entete:" ) ) ;
		ha.add( this.getFieldByName( "entete" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "N. ordre:" ) ) ;
		ha.add( this.getFieldByName( "noordre" ) ) ;
		ha.add( new FfEtiquette( "Format:" ) ) ;
		ha.add( this.getFieldByName( "format" ) ) ;
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

