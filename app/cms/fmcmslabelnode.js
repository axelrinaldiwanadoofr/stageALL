/*********************************************************
* Classe FmCmsLabelNode: Formulaire d'un label
* du CMS
*********************************************************/

function FmCmsLabelNode( modele )
	{
	herite( FmCmsLabelNode, Formulaire ) ;
	this.initFmCmsLabelNode( modele ) ;
	}

FmCmsLabelNode.prototype =
	{
	initFmCmsLabelNode: function( modele )
		{
		this.initFormulaire( "Formulaire de mise a jour d'une zone de texte du CMS" ) ;

		this.addField( new FfLabel( "id" ) ) ;
		this.addField( new FfInput( "libelle", 50 ) ) ;		
		this.addField( new FfInput( "width", 4 ) ) ;		
		this.addField( new FfCheck( "visible" ) ) ;		
		this.addField( new FfInput( "opacity", 4 ) ) ;		
		this.addField( new FfInput( "x", 4 ) ) ;		
		this.addField( new FfInput( "y", 4 ) ) ;		
		this.addField( new FfInput( "z", 4 ) ) ;		
		},
	// Change de modele
	onModeleChanged: function()
		{
		// Cree les formulaires pour le texte en francais
		fc_texte = this.formulairecontroler ;
		var modele_texte = ayawf.mvc.getModele( "CmsLabelTexte", this.modele.id + ",FRA" ) ;
		if( modele_texte )
			{
			var fmt = new FmCmsLabelTexte( modele_texte, true ) ;
			fc_texte.addFormulaire( fmt ) ;
			fmt.onLayout() ;
			this.la_texte.add( fmt ) ;
			fmt.setModele( modele_texte ) ;
			fmt.onAfterShow() ;
			fmt.onRefresh() ;
			}
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Label id:" ) ) ;
		ha.add( this.getFieldByName( "id" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Largeur:" ) ) ;
		ha.add( this.getFieldByName( "width" ) ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;

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

		this.la_texte = this.layout.add( new HTabLayout() ) ;
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

