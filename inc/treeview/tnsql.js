/*********************************************************
* Classe TnSql TreeNode avec requette SQL
*
* texte: Texte du noeud
* imgopen: Image dossier ouvert
* imgclose: Image dossier fermé
* sqlcount: Requette SQL de comptage pour les sous noeuds
* from: Clause from pour la requete de chargement des modeles fils
* where: Clause where pour la requete de chargement des modeles fils
* orderby: Clause orderby pour la requete de chargement des modeles fils
* classname: Nom de classe des modeles fils
* updviewanyway: Provoque l'ajout du noeud fils dans la vue au chargement de chaque modele fils meme si 
*                le modele charge n'est pas de la classe specifiee dans classname.
* tnmodelefactory: Fabrique de treenode TnModele a utiliser pour la creation des noeuds fils
* messagefornewobject: Message de l'item de menu New, si null l'item n'apparait pas
* messageforpasteobject: Message de l'item de menu Paste, si null l'item n'apparait pas
* modelecontrolermanager: Manegeur de controleurs de modèles
*********************************************************/

function TnSql( titre, imgopen, imgclose, sqlcount, from, where, orderby, classname, updviewanyway, tnmodelefactory, messagefornewobject, messageforpasteobject )
	{
	herite( TnSql, TreeNode ) ;
	this.initTnSql( titre, imgopen, imgclose, sqlcount, from, where, orderby, classname, updviewanyway, tnmodelefactory, messagefornewobject, messageforpasteobject ) ;
	}

TnSql.prototype =
	{
	initTnSql: function( titre, imgopen, imgclose, sqlcount, from, where, orderby, classname, updviewanyway, tnmodelefactory, messagefornewobject, messageforpasteobject )
		{
		this.initTreeNode( null,
			titre,
			false,
			imgclose,
			imgopen ) ;
		this.from = from ;
		this.where = where ;
		this.orderby = orderby ;
		this.classname = classname ;
		this.updviewanyway = updviewanyway ;
		this.tnmodelefactory = tnmodelefactory ;
		this.messagefornewobject = messagefornewobject ;
		this.messageforpasteobject = messageforpasteobject ;
		
		this.sqlcount = new SqlSelect( sqlcount,
			0, -1,
			this,
			function( sql )
				{
				if( parseInt( sql.rows[0][0] ) ) this.setHasChild() ;
				} ) ;
		},
	// Cree les noeux fils
	onCreateChildNode: function()
		{
		this.onTnSqlCreateChildNode() ;
		},
	// Cree les noeux fils
	onTnSqlCreateChildNode: function()
		{
		ayawf.mvc.loadModeleFromSqlSelect(
			this.classname,
			this.from,
			this.where,
			this.orderby,
			this,
			this.onCreateChildNodeWithModele,
			this.updviewanyway ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		if( this.tnmodelefactory ) this.tnmodelefactory.onCreateChildNodeWithModele( this, modele ) ;
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.menu = new MenuContextuel() ;
		if( this.messagefornewobject ) this.menu.add( new MiCallMethode( this.messagefornewobject, "new", this, this.onNewObject ) ) ;
		if( this.messageforpasteobject && ayawf.mvc.isThereModeleToCopy( this.classname ) )
			this.menu.add( new MiCallMethode( this.messageforpasteobject, "paste", this, this.onPasteObject ) ) ;
		this.menu.show( this.getAbsoluteX(), this.getAbsoluteY() + this.getHeight() ) ;
		},
	// Sur coller un contact
	onPasteObject: function()
		{
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur créer un nouveau contact
	onNewObject: function()
		{
		ayawf.mvc.newModeleToDB( this.classname, this, this.onCreateChildNodeWithModele ) ;
		}		
	} ;

