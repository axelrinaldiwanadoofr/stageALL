/*********************************************************
* Classe TnCurrentContacts: TreeNode racine pour 
* les contacts courants
*********************************************************/

function TnCurrentContacts()
	{
	herite( TnCurrentContacts, TreeNode ) ;
	this.initTnCurrentContacts() ;
	}

TnCurrentContacts.prototype =
	{
	initTnCurrentContacts: function()
		{
		this.initTreeNode( null,
			"Contacts courants",
			false,
			"app/structure/image/tn_current.bmp",
			"app/structure/image/tn_current.bmp",
			null,
			null ) ;
		},
	// Appelée pour chaque structure
	onCreateTnContact: function( modele )
		{
		var tn = new TnContact( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.menu.add( new MiCallMethode( "Créer un nouveau contact", "new", this, this.onNewModele ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmContact( null, this ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		//this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur créer une nouvelle structure
	onNewModele: function()
		{
		ayawf.mvc.newModeleToDB( "StructureContact", this, this.onCreateTnContact ) ;
		}				
	} ;
