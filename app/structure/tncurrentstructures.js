/*********************************************************
* Classe TnCurrentStructures: TreeNode racine pour les structures
*********************************************************/

function TnCurrentStructures()
	{
	herite( TnCurrentStructures, TreeNode ) ;
	this.initTnCurrentStructures() ;
	}

TnCurrentStructures.prototype =
	{
	initTnCurrentStructures: function()
		{
		this.initTreeNode( null,
			"Structures courantes",
			false,
			"app/structure/image/tn_current.bmp",
			"app/structure/image/tn_current.bmp",
			null,
			null ) ;
		},
	// Appelée pour chaque structure
	onCreateTnStructure: function( modele )
		{
		var tn = new TnStructure( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle structure", "delete", this, this.onNewModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmStructure( null, this ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		//this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur créer une nouvelle structure
	onNewModele: function()
		{
		ayawf.mvc.newModeleToDB( "Structure", this, this.onCreateTnStructure ) ;
		}				
	} ;
