/*********************************************************
* Classe TreeView de gestion d'une vue arborescente
*********************************************************/

function TreeView( idx, frame )
	{
	if( idx )
		{
		this.contener = document.getElementById( idx ) ;
		this.contener.object = this ;
		}
	else
		{
		// Cree le conteneur de l'arbre
		this.contener = document.createElement( "DIV" ) ;
		this.contener.className = "treeview" ;
		this.contener.object = this ;

		var root = document.getElementById( "root" ) ;
		root.appendChild( this.contener ) ;
		}
	this.cnode = null ;
	}

TreeView.prototype =
	{
	// Ajoute une racine
	addRootNode: function( node )
		{
		node.parent = null ;
		node.treeview = this ;
		node.level = 0 ;
		node.indenteur.width = node.level * 20 ;
		this.contener.appendChild( node.maincontener ) ;
		this.contener.appendChild( node.childcontener ) ;
		this.cnode = node ;
		return node ;
		},
	// Définit le noeud courant
	setCurrentNode: function( node )
		{
		this.cnode = node ;
		},
	// Ajoute un noeud au noeud courant
	addNode: function( node )
		{
		this.cnode.addChildNode( node ) ;
		return node ;
		},
	// Ajoute un noeud au noeud courant le nouveau noeud devient le noeud courant
	pushNode: function( node )
		{
		this.cnode.addChildNode( node ) ;
		this.cnode = node ;
		return node ;
		},
	// Depile le noeud courant et le remplace par son parent
	popNode: function()
		{
		if( this.cnode ) this.cnode = this.cnode.parent ;
		return this.cnode ;
		},
	// Recupere l'absice
	getX: function()
		{
		return this.contener.offsetLeft ;
		},
	// Recupere la largeur totale de l'arborescence
	getWidth: function()
		{
		return this.contener.offsetWidth ;
		}
	} ;

