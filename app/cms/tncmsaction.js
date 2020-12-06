/*********************************************************
* Classe TnCmsAction: TreeNode pour une action de base du CMS
*********************************************************/

function TnCmsAction( modele )
	{
	herite( TnCmsAction, TreeNode ) ;
	this.initTnCmsAction( modele ) ;
	}

TnCmsAction.prototype =
	{
	initTnCmsAction: function( texte, imgclose, imgopen, modele )
		{
		this.initTreeNode( null,
			texte,
			false,
			imgclose,
			imgopen ) ;
					
		this.c_action = new SqlSelect( "select count(*) from cms_action where idparent=" + modele.id,
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
				
		this.modele = modele ;
		this.modele.addView( this ) ;
		},
	// Rafraichie la vue
	onRefresh: function()
		{
		this.setTexte( "CmsAction (" + this.modele.id + ")" ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		this.onCmsActionCreateChildNode() ;
		},		
	onCmsActionCreateChildNode: function()
		{
		// Actions filles
		ayawf.mvc.loadModeleFromSqlSelect(
			"CmsAction",
			"cms_action",
			"idparent=" + this.modele.id,
			"noordre",
			this,
			this.onCreateChildNodeWithModele,
			true ) ;
		},		
	// Cree les noeux fils
	onCreateChildNodeWithModele: function( modele )
		{
		var tn ;
		var classname = modele.getClassname() ;
		
		// Action du CMS
		if( classname == "CmsMotionMoveResizeAction" ) tn = new TnCmsMotionMoveResizeAction( modele ) ;
		else if( classname == "CmsFondueAction" ) tn = new TnCmsFondueAction( modele ) ;
		else if( classname == "CmsGalerieAction" ) tn = new TnCmsGalerieAction( modele ) ;
		else if( classname == "CmsSequenceAction" ) tn = new TnCmsSequenceAction( modele ) ;
		
		if( tn )
			{
			this.addChildNode( tn ) ;
			tn.onRefresh() ;
			}
		},		
	// Sur le noeud est sélectionné
	onClick: function()
		{
		this.formulairectrl = new FormulaireControler() ;
		this.formulairectrl.addFormulaire( new FmCmsAction( this.formulairectrl, this.modele ) ) ;
		this.formulairectrl.show( this.getAbsoluteX() + this.getWidth() / 2, document.body.scrollTop + 100 ) ;
		this.formulairectrl.setModele( this.modele ) ;
		},
	// Sur contexte menu
	onActionContextMenu: function()
		{
		this.menu.add( new MiCallMethode( "Copier l'action", "copy", this, this.onCopyModele ) ) ;
		this.menu.add( new MiCallMethode( "Supprimer l'action", "delete", this, this.onDeleteModele ) ) ;
		},
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		this.onActionContextMenu() ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		}
	} ;

