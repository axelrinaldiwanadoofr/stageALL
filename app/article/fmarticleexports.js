/*********************************************************
* Classe FmArticleExports: Formulaire de recherche
* multicritere des articles
*********************************************************/

function FmArticleExports( modele, treenode )
	{
	herite( FmArticleExports, Formulaire ) ;
	this.initFmArticleExports( modele, treenode ) ;
	}

FmArticleExports.prototype =
	{
	initFmArticleExports: function( modele, treenode )
		{
		this.initFormulaire( "Formulaire de definition des champs pour l'export d'article" ) ;
		
		this.treenode = treenode ;

		this.addField( new FfSelect( "dbfield", 40, "select dbfield, etiquette from articleexport where recherche is null order by etiquette" ) ) ;		
		this.addField( new FfButton( "ajoute", "Ajouter le champ" ) ) ;

		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Champ a ajouter:" ) ) ;
		ha.add( this.getFieldByName( "dbfield" ) ) ;
		ha.add( this.getFieldByName( "ajoute" ) ) ;
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		return true ;
		},
	// Appelée quand on clique sur un champ
	onClick: function( field )
		{
		if( field.name == "ajoute" )
			{
			ayawf.mvc.addValueToRowString( "dbfield", this.getFieldByName( "dbfield" ).getElementValue() ) ;
			ayawf.mvc.addValueToRowString( "recherche", this.modele.recherche ) ;
			ayawf.mvc.newModeleToDB( "ArticleExport", this, this.onCreateChildNodeWithModele ) ;
			}
		},
	// Recupere le modele et cree un treenode fil 
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnArticleExport( modele ) ;
		this.treenode.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Devient non selectionnée
	onGetUnSelected: function()
		{
		}
	} ;

