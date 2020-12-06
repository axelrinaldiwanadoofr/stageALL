/*********************************************************
* Classe FmCmsRootNode: Formulaire d'un racine
* du CMS
*********************************************************/

function FmCmsRootNode( formulairecontroler, modele )
	{
	herite( FmCmsRootNode, Formulaire ) ;
	this.initFmCmsRootNode( formulairecontroler, modele ) ;
	}

FmCmsRootNode.prototype =
	{
	initFmCmsRootNode: function( modele )
		{
		this.initFormulaire() ;

		this.addField( new FfLabel( "id" ) ) ;
		this.addField( new FfCheck( "visible" ) ) ;		
		this.addField( new FfInput( "opacity", 4 ) ) ;		
		this.addField( new FfInput( "x", 4 ) ) ;		
		this.addField( new FfInput( "y", 4 ) ) ;		
		this.addField( new FfInput( "z", 4 ) ) ;		
		this.addField( new FfInput( "style", 50 ) ) ;		
		this.addField( new FfInput( "libelle", 120 ) ) ;		
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Noeud racine id:" ) ) ;
		ha.add( this.getFieldByName( "id" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Visible:" ) ) ;
		ha.add( this.getFieldByName( "visible" ) ) ;
		ha.add( new FfEtiquette( "Opacité:" ) ) ;
		ha.add( this.getFieldByName( "opacity" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Position x:" ) ) ;
		ha.add( this.getFieldByName( "x" ) ) ;
		ha.add( new FfEtiquette( "y:" ) ) ;
		ha.add( this.getFieldByName( "y" ) ) ;
		ha.add( new FfEtiquette( "Elévation:" ) ) ;
		ha.add( this.getFieldByName( "z" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Style:" ) ) ;
		ha.add( this.getFieldByName( "style" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libelle:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;
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

