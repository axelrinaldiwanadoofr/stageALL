/*********************************************************
* Classe FmCmsLinkNode: Formulaire d'un lien hyper texte
* vers un module du CMS
*********************************************************/

function FmCmsLinkNode( formulairecontroler, modele )
	{
	herite( FmCmsLinkNode, Formulaire ) ;
	this.initFmCmsLinkNode( formulairecontroler, modele ) ;
	}

FmCmsLinkNode.prototype =
	{
	initFmCmsLinkNode: function( modele )
		{
		this.initFormulaire( "Formulaire pour un lien hyper texte vers un module du CMS" ) ;

		this.addField( new FfLabel( "id" ) ) ;
		this.addField( new FfInput( "libelle", 50 ) ) ;		
		this.addField( new FfSelect( "moduletocall", 40 ) ) ;
		this.addField( new FfInput( "arguments", 50 ) ) ;		
		this.addField( new FfInput( "width", 4 ) ) ;		
		this.addField( new FfInput( "style", 20 ) ) ;		
		this.addField( new FfCheck( "visible" ) ) ;		
		this.addField( new FfInput( "opacity", 4 ) ) ;		
		this.addField( new FfInput( "x", 4 ) ) ;		
		this.addField( new FfInput( "y", 4 ) ) ;		
		this.addField( new FfInput( "z", 4 ) ) ;	

		var sql = "SELECT module, concat( module, ': ' , libelle) from cms_module order by module" ;
		this.getFieldByName( "moduletocall" ).populateItemsFromSql( sql ) ;		
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
		ha.add( new FfEtiquette( "Appel de module id:" ) ) ;
		ha.add( this.getFieldByName( "id" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Module:" ) ) ;
		ha.add( this.getFieldByName( "moduletocall" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Arguments:" ) ) ;
		ha.add( this.getFieldByName( "arguments" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Largeur du texte:" ) ) ;
		ha.add( this.getFieldByName( "width" ) ) ;
		ha.add( new FfEtiquette( "Style:" ) ) ;
		ha.add( this.getFieldByName( "style" ) ) ;
		
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
		if( fieldname == "moduletocall" )
			{
			if( value != "" )
				{
				var sql = new SqlSelect( "select name, value from cms_moduleargument where module='" + value + "'",
				0, -1,
				this,
				function( sql )
					{
					var s = "" ;
					for( var i=0 ; i<sql.rows.length ; i++ )
						{
						if( !i ) s = sql.rows[i][0] + "<argsep>" + sql.rows[i][1] ;
						else s += "<arg>" + sql.rows[i][0] + "<argsep>" + sql.rows[i][1] ;
						}
					this.modele.setValue( "arguments", s ) ;
					this.modele.save() ;
					} ) ;
				}
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

