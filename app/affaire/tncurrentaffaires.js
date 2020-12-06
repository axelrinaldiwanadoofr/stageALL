/*********************************************************
* Classe TnCurrentAffaires: TreeNode racine pour 
* les affaires courantes
*********************************************************/

function TnCurrentAffaires()
	{
	herite( TnCurrentAffaires, TreeNode ) ;
	this.initTnCurrentAffaires() ;
	}

TnCurrentAffaires.prototype =
	{
	initTnCurrentAffaires: function()
		{
		this.initTreeNode( null,
			"Affaires courantes",
			false,
			"app/affaire/image/tn_current.bmp",
			"app/affaire/image/tn_current.bmp",
			null,
			null ) ;
		},
	// Appelée pour chaque structure
	onCreateTnAffaire: function( modele )
		{
		var tn = new TnAffaire( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer une nouvelle affaire", "new", this, this.onNewModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmAffaire( null, this ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		//this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur créer une nouvelle affaire
	onNewModele: function()
		{
		ayawf.mvc.newModeleToDB( "Affaire", this, this.onCreateTnContact ) ;
		}				
	} ;
