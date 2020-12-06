/*********************************************************
* Classe TnAffaireLigne: TreeNode pour une ligne d'affaire
*********************************************************/

function TnAffaireLigne( modele, m_affaire )
	{
	herite( TnAffaireLigne, TnSql, true ) ;
	herite( TnAffaireLigne, TreeNode ) ;
	this.initTnAffaireLigne( modele, m_affaire ) ;
	}

TnAffaireLigne.prototype =
	{
	initTnAffaireLigne: function( modele, m_affaire )
		{
		this.initTnSql( "Ligne d'affaire",
			"app/affaire/image/tn_affaireligne.bmp",
			"app/affaire/image/tn_affaireligne.bmp",
			"select count(*) from affairelignes where nligneparent=" + modele.nligne + " and affaire=" + m_affaire.affaire,
			"affairelignes",
			"nligneparent=" + modele.nligne + " and affaire=" + m_affaire.affaire,
			"nligne",
			"AffaireLigne" ) ;

		// Fixe le modele
		this.modele = modele ;
		this.m_affaire = m_affaire ;
		this.modele.addView( this ) ;
		
		if( this.modele.article != "" ) this.setHasChild() ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.modele.nligne + " " + this.modele.designation + " " + this.modele.qte + " " + this.modele.unite ) ;
		var image = "app/affaire/image/tn_affaireligne.bmp" ;
		if( this.modele.image && this.modele.image != "" ) image = this.modele.image ;
		this.setOpenImage( image ) ;
		this.setCloseImage( image ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		if( this.modele.article != "" )
			{
			ayawf.mvc.loadModeleFromSqlSelect(
				"Article",
				"articles",
				"reference='" + this.modele.article + "'",
				"",
				this,
				this.onCreateChildNodeWithModele ) ;
			}

		this.onTnSqlCreateChildNode() ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		if( modele.controler.classname == "AffaireLigne" )
			{
			var tn = new TnAffaireLigne( modele, this.m_affaire ) ;
			this.addChildNode( tn ) ;
			tn.onRefresh() ;
			}
		else if( modele.controler.classname == "Article" )
			{
			var tn = new TnArticle( modele ) ;
			this.addChildNode( tn ) ;
			tn.onRefresh() ;
			}
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmAffaireLigne( this.modele, this.m_affaire ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier la ligne", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer la ligne", "delete", this, this.onDeleteModele ) ) ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle ligne fille", "new", this, this.onNewModele ) ) ;
		if( ayawf.mvc.isThereModeleToCopy( "AffaireLigne" ) )
			this.menu.add( new MiCallMethode( "Coller une ligne fille", "paste", this, this.onPasteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller une ligne
	onPasteModele: function()
		{
		ayawf.mvc.addValueToRowString( "affaire", this.m_affaire.affaire ) ;
		ayawf.mvc.addValueToRowString( "nligneparent", this.modele.nligne ) ;
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur créer une nouvelle ligne
	onNewModele: function()
		{
		ayawf.mvc.addValueToRowString( "affaire", this.m_affaire.affaire ) ;
		ayawf.mvc.addValueToRowString( "nligneparent", this.modele.nligne ) ;
		ayawf.mvc.newModeleToDB( "AffaireLigne", this, this.onCreateChildNodeWithModele ) ;
		}		
	} ;
