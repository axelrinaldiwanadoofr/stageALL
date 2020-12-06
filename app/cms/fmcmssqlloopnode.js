/*********************************************************
* Classe FmCmsSqlLoopNode: Formulaire d'une boucle d'appel 
* de module du CMS a partir d'une requete SQL
*********************************************************/

function FmCmsSqlLoopNode( formulairecontroler, modele )
	{
	herite( FmCmsSqlLoopNode, Formulaire ) ;
	this.initFmCmsSqlLoopNode( formulairecontroler, modele ) ;
	}

FmCmsSqlLoopNode.prototype =
	{
	initFmCmsSqlLoopNode: function( modele )
		{
		this.initFormulaire( "Formulaire pour une boucle d'appel d'un module du CMS a partir d'une requete SQL" ) ;

		this.addField( new FfLabel( "id" ) ) ;
		this.addField( new FfInput( "libelle", 50 ) ) ;		
		this.addField( new FfSelect( "moduletocall", 40 ) ) ;
		this.addField( new FfInput( "arguments", 50 ) ) ;		
		this.addField( new FfInput( "rsql", 120 ) ) ;		
		this.addField( new FfInput( "interligne", 4 ) ) ;		
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
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Identifiant:" ) ) ;
		ha.add( this.getFieldByName( "id" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Libellé:" ) ) ;
		ha.add( this.getFieldByName( "libelle" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Module appelé:" ) ) ;
		ha.add( this.getFieldByName( "moduletocall" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Arguments:" ) ) ;
		ha.add( this.getFieldByName( "arguments" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Requete SQL:" ) ) ;
		ha.add( this.getFieldByName( "rsql" ) ) ;
		
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Inter-ligne:" ) ) ;
		ha.add( this.getFieldByName( "interligne" ) ) ;
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

