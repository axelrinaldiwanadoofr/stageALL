/*********************************************************
* Classe FmCmsMotionMoveResizeAction: Formulaire d'une
* action de mouvement progressif
*********************************************************/

function FmCmsMotionMoveResizeAction( formulairecontroler, modele )
	{
	herite( FmCmsMotionMoveResizeAction, Formulaire ) ;
	this.initFmCmsMotionMoveResizeAction( formulairecontroler, modele ) ;
	}

FmCmsMotionMoveResizeAction.prototype =
	{
	initFmCmsMotionMoveResizeAction: function( modele )
		{
		this.initFormulaire( "Formulaire pour un movement progressif" ) ;

		this.addField( new FfLabel( "id" ) ) ;
		this.addField( new FfCheck( "actif" ) ) ;		
		this.addField( new FfInput( "noordre", 4 ) ) ;	
		this.addField( new FfSelect( "declencheur", 30 ) ) ;

		for( var i=1 ; i<6 ; i++ )
			{
			this.addField( new FfInput( "time"+[i], 4 ) ) ;		
			this.addField( new FfInput( "x"+[i], 4 ) ) ;		
			this.addField( new FfInput( "y"+[i], 4 ) ) ;		
			this.addField( new FfInput( "width"+[i], 4 ) ) ;		
			this.addField( new FfInput( "height"+[i], 4 ) ) ;		
			this.addField( new FfInput( "z"+[i], 4 ) ) ;		
			this.addField( new FfInput( "opacity"+[i], 4 ) ) ;		
			}
			
		this.getFieldByName( "declencheur" ).addItem( "aucun", "aucun" ) ;
		this.getFieldByName( "declencheur" ).addItem( "onStart", "de suite" ) ;
		this.getFieldByName( "declencheur" ).addItem( "onMouseOver", "quand la souris entre dans la zone" ) ;
		this.getFieldByName( "declencheur" ).addItem( "onMouseOut", "quand la souris sort dans la zone" ) ;
		this.getFieldByName( "declencheur" ).addItem( "onClick", "quand on clique dans la zone" ) ;
		this.getFieldByName( "declencheur" ).addItem( "onDblClick", "quand on double clique dans la zone" ) ;
		},
	// Change de modele
	onModeleChanged: function()
		{
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Id:" ) ) ;
		ha.add( this.getFieldByName( "id" ) ) ;
		ha.add( new FfEtiquette( "Active:" ) ) ;
		ha.add( this.getFieldByName( "actif" ) ) ;
		ha.add( new FfEtiquette( "Numéro d'ordre:" ) ) ;
		ha.add( this.getFieldByName( "noordre" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Déclenchement de l'action:" ) ) ;
		ha.add( this.getFieldByName( "declencheur" ) ) ;
		
		for( var i=1 ; i<6 ; i++ )
			{
			var ha = this.layout.add( new HTabLayout() ) ;
			ha.add( new FfEtiquette( "<b>Position " + i + ":</b>" ) ) ;

			var ha = this.layout.add( new HTabLayout() ) ;
			ha.add( new FfEtiquette( "Durée du mouvement:" ) ) ;
			ha.add( this.getFieldByName( "time"+i ) ) ;
			
			var ha = this.layout.add( new HTabLayout() ) ;
			ha.add( new FfEtiquette( "X:" ) ) ;
			ha.add( this.getFieldByName( "x"+i ) ) ;
			ha.add( new FfEtiquette( "Y:" ) ) ;
			ha.add( this.getFieldByName( "y"+i ) ) ;

			var ha = this.layout.add( new HTabLayout() ) ;
			ha.add( new FfEtiquette( "Largeur:" ) ) ;
			ha.add( this.getFieldByName( "width"+i ) ) ;
			ha.add( new FfEtiquette( "Hauteur:" ) ) ;
			ha.add( this.getFieldByName( "height"+i ) ) ;

			var ha = this.layout.add( new HTabLayout() ) ;
			ha.add( new FfEtiquette( "Elevation:" ) ) ;
			ha.add( this.getFieldByName( "z"+i ) ) ;
			ha.add( new FfEtiquette( "Opacité:" ) ) ;
			ha.add( this.getFieldByName( "opacity"+i ) ) ;
			}
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

