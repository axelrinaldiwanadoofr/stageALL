/*********************************************************
* Classe TnCmsLabelTexte: TreeNode pour un texte d'un
* label node du CMS
*********************************************************/

function TnCmsLabelTexte( modele )
	{
	herite( TnCmsLabelTexte, TreeNode ) ;
	this.initTnCmsLabelTexte( modele ) ;
	}

TnCmsLabelTexte.prototype =
	{
	initTnCmsLabelTexte: function( modele )
		{
		var image = "app/cms/image/FRA.bmp" ;
		if( modele.lang != "" ) image = "app/cms/image/" + modele.lang + ".bmp" ;
		
		// Initialise le treenode
		this.initTreeNode( null,
			modele.texte.substr( 0, 30 ),
			false,
			image,
			image ) ;

		// Fixe le modele
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		var image = "app/cms/image/FRA.bmp" ;
		if( this.modele.lang != "" ) image = "app/cms/image/" + this.modele.lang + ".bmp" ;
		this.setOpenImage( image ) ;
		this.setCloseImage( image ) ;
		this.setTexte( this.modele.texte.substr( 0, 30 ) ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsLabelTexte( this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Supprimer la langue", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;
