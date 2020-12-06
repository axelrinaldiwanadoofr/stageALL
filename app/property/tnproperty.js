/*********************************************************
* Classe TnProperty: TreeNode pour une propriété
*********************************************************/

function TnProperty( modele )
	{
	herite( TnProperty, TreeNode ) ;
	this.initTnProperty( modele ) ;
	}

TnProperty.prototype =
	{
	initTnProperty: function( modele )
		{
		// Recupere l'image
		var image = "app/image/tn_property.bmp" ;
		if( modele.image != "" ) image = modele.image ;

		// Initialise le treenode
		this.initTreeNode( null,
			modele.libelle,
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
		this.setTexte( this.modele.name + ": " + this.modele.libelle ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmProperty( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Copier la propriété", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer la propriété", "delete", this, this.onDeleteModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;
