/*********************************************************
* Classe TnCmsCallNodeArgument: TreeNode pour un argument
* d'appel de module du CMS
*********************************************************/

function TnCmsCallNodeArgument( modele, argname )
	{
	herite( TnCmsCallNodeArgument, TreeNode ) ;
	this.initTnCmsCallNodeArgument( modele, argname ) ;
	}

TnCmsCallNodeArgument.prototype =
	{
	initTnCmsCallNodeArgument: function( modele, argname )
		{
		this.argname = argname ;
		this.modele = modele ;
		// Initialise le treenode
		this.initTreeNode( null,
			argname + ": " + this.getArgumentValue(),
			false,
			"app/cms/image/cmscallnodeargument.bmp",
			"app/cms/image/cmscallnodeargument.bmp" ) ;
		this.modele.addView( this ) ;
		},
	// Recherche la valeur de l'arguement
	getArgumentValue: function()
		{
		var args = this.modele.arguments.split( "<arg>" ) ;
		for( var i=0 ; i<args.length ; i++ )
			{
			arg = args[i].split( "<argsep>" ) ;
			if( arg[0] == this.argname ) return arg[1] ;
			}
		return "" ;
		},
	// Cree les noeux fils
	onRefresh: function()
		{
		this.setTexte( this.argname + ": " + this.getArgumentValue() ) ;
		},
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsCallNodeArgument( this.formulairectrl, this.modele, this.argname ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		}		
	} ;
