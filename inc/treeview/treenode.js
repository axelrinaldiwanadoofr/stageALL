/*********************************************************
* Classe TreeNode de  pour les noeuds
* dans gestion d'une vue arborescente
*********************************************************/

var i_directory = "inc/image/" ;
var i_tend = i_directory + "tend.bmp" ;
var i_tbar = i_directory + "tbar.bmp" ;
var i_tplus = i_directory + "tplus.bmp" ;
var i_tmoins = i_directory + "tmoins.bmp" ;
var i_tchild = i_directory + "tchild.bmp" ;
var i_tvide = i_directory + "tvide.bmp" ;
var i_timgmenu = i_directory + "t_imgmenu.bmp" ;
var ctreenode = null ;

function TreeNode( idx, texte, haschild, imgopen, imgclose, contextmenu, ondropdown )
	{
	this.initTreeNode( idx, texte, haschild, imgopen, imgclose, contextmenu, ondropdown ) ;
	}

TreeNode.prototype =
	{
	// Ajoute un noeud fils
	initTreeNode: function( idx, texte, haschild, imgopen, imgclose, contextmenu, ondropdown )
		{
		this.parent = null ;
		this.treeview = null ;
		this.level = 0 ;
		this.dropdown = false ;
		this.haschild = haschild ;
		this.imgopen = imgopen ;
		this.imgclose = imgclose ;
		if( !this.imgclose ) this.imgclose = imgopen ;
		this.contextmenu = contextmenu ;
		this.ondropdown = ondropdown ;

		// Cree le conteneur principal du noeud
		this.maincontener = document.createElement( "DIV" ) ;
		this.maincontener.className = "treenode" ;
		this.maincontener.height = 20 ;
		// Cree l'indenteur et l'ajoute au conteneur principal
		this.indenteur = document.createElement( "IMG" ) ;
		this.indenteur.width = 20 ;
		this.indenteur.height = 20 ;
		this.indenteur.src = i_tvide ;
		this.maincontener.appendChild( this.indenteur ) ;
		// Cree le droppeur et l'ajoute au conteneur principal
		this.droppeur = document.createElement( "IMG" ) ;
		this.droppeur.width = 20 ;
		this.droppeur.height = 20 ;
		this.droppeur.object = this ;
		if( this.haschild )
			{
			this.droppeur.src = i_tplus ;
			this.droppeur.onclick = onTreeNodeDropUpDown ;
			}
		else this.droppeur.src = i_tvide ;
		this.maincontener.appendChild( this.droppeur ) ;
		// Cree l'image associee et l'ajoute au conteneur principal
		this.image = document.createElement( "IMG" ) ;
		this.image.className = "treenodeimage" ;
		if( this.imgclose )
			{
			this.image.src = this.imgclose ;
			this.image.object = this ;
			this.image.onclick=onTreeNodeClick ;
			this.image.oncontextmenu=onTreeNodeContextMenu ;
			}
		else
			{
			this.imgclose = i_tvide ;
			this.image.src = i_tvide ;
			}
		this.maincontener.appendChild( this.image ) ;
		// Cree une icone pour le menucontextuel
		this.imgmenu = document.createElement( "IMG" ) ;
		this.imgmenu.className = "treenodeimage" ;
		this.imgmenu.src = i_timgmenu ;
		this.imgmenu.object = this ;
		this.imgmenu.onclick=onTreeNodeContextMenu ;
		this.maincontener.appendChild( this.imgmenu ) ;
		// Cree le texte associe et l'ajoute au conteneur principal
		this.libelle = document.createElement( "LABEL" ) ;
		this.libelle.object = this ;
		this.libelle.innerHTML = ayawf.tools.prepare_to_show( texte ) ;
		this.libelle.onclick=onTreeNodeClick ;
		this.libelle.onkeydown=onTreeNodeKeyDown ;
		this.libelle.oncontextmenu=onTreeNodeContextMenu ;
		this.maincontener.appendChild( this.libelle ) ;
		// Cree le conteneur pour les noeud fils
		this.childcontener = document.createElement( "DIV" ) ;
		this.childcontener.style.display = "none" ;
		this.last = null ;
		this.childs = [] ;
		},
	// Ajoute un noeud fils
	addChildNode: function( node )
		{
		if( this.getChildNodeIndex( node ) == -1 )
			{
			node.parent = this ;
			node.treeview = this.treeview ;
			node.level = this.level + 1 ;
			node.indenteur.width = node.level * 20 ;
			this.childs.push( node ) ;
			if( !this.haschild )
				{
				this.haschild = true ;
				this.droppeur.src = i_tplus ;
				this.droppeur.onclick = onTreeNodeDropUpDown ;
				}
			this.childcontener.appendChild( node.maincontener ) ;
			this.childcontener.appendChild( node.childcontener ) ;
			this.showChildsNode() ;
			}
		return node ;
		},
	// Renvoie l'index d'un noeud fil
	getChildNodeIndex: function( node )
		{
		var i ;
		for( i=0 ; i<this.childs.length ; i++ )
			{
			if( node == this.childs[i] ) return i ;
			}
		return -1 ;
		},
	// Libere un noeud fil
	detachChildNode: function( node )
		{
		var i ;
		for( i=0 ; i<this.childs.length ; i++ )
			{
			if( node == this.childs[i] )
				{
				this.childs.splice(i,i) ;
				//this.childs[i] = null ;
				return true ;
				}
			}
		return false ;
		},
	// Detruit le noeud
	remove: function()
		{
		this.removeChildsNode() ;
		this.onRemove() ;
		if( this.parent ) this.parent.detachChildNode( this ) ;
		if( this.modele ) this.modele.detachView( this ) ;
		this.maincontener.innerHTML = "" ;
		},
	// Detruit le noeud
	removeChildsNode: function()
		{
		var child = this.childs.pop() ;
		while( child )
			{
			child.remove() ;
			child = this.childs.pop() ;
			}
		this.childcontener.innerHTML = "" ;
		},
	// Affiche les noeuds fils
	showChildsNode: function()
		{
		this.dropdown = true ;
		this.droppeur.src = i_tmoins ;
		if( this.imgopen ) this.image.src = this.imgopen ;
		this.childcontener.style.display = "block" ;
		if( !this.childs.length ) this.onCreateChildNode() ;
		},
	// Cache les noeuds fils
	hideChildsNode: function()
		{
		this.dropdown = false ;
		this.droppeur.src = i_tplus ;
		this.image.src = this.imgclose ;
		this.childcontener.style.display = "none" ;
		},
	// Met a jour le texte
	setTexte: function( texte )
		{
		this.libelle.innerHTML = ayawf.tools.prepare_to_show( texte ) ;
		},
	// Met a jour l'image ouverte
	setOpenImage: function( image )
		{
		this.imgopen = image ;
		this.image.src = image ;
		},
	// Met a jour l'image ouverte
	setCloseImage: function( image )
		{
		this.imgclose = image ;
		this.image.src = image ;
		},
	// Selectionne le controle s'il n'est pas caché (classe de style "hide")
	// Ajoute "_s" au nom de la classe de style
	setSelectedStyle: function()
		{
		var t = this.maincontener.className.split( "_" ) ;
		this.maincontener.className = t[0] + "_s" ;
		},
	// Retablit le style d'origine
	restoreStyle: function()
		{
		var t = this.maincontener.className.split( "_" ) ;
		this.maincontener.className = t[0] ;
		},
	// Selectionne le tree node et deselectionne l'ancien
	setSelected: function()
		{
		if( ctreenode )
			{
			ctreenode.restoreStyle() ;
			ctreenode.onGetUnSelected() ;
			}
		ctreenode = this ;
		this.onGetSelected() ;
		this.setSelectedStyle() ;
		},
	// Fait apparaitre le dropper +
	setHasChild: function()
		{
		this.haschild = true ;
		this.droppeur.src = i_tplus ;
		this.droppeur.onclick = onTreeNodeDropUpDown ;
		},
	// Appellé pour creer les noeux fils
	onCreateChildNode: function()
		{
		},
	// Appelé pour chaque noeux fils à créer avec un modele MVC
	onCreateChildNodeWithModele: function( modele )
		{
		// var tn = new TnArticleRegroupement( modele ) ;
		// this.addChildNode( tn ) ;
		// tn.onRefresh() ;
		},
	// Sur drop down / drop up
	onDropUpDown: function()
		{
		this.setSelected() ;
		if( this.dropdown ) this.hideChildsNode() ;
		else this.showChildsNode() ;
		},
	// Sur click
	onClick: function()
		{
		},
	// Sur le noeud est sélectionné
	onGetSelected: function()
		{
		},
	// Sur le noeud est desélectionné
	onGetUnSelected: function()
		{
		if( this.formulairectrl )
			{
			this.formulairectrl.remove() ;
			this.formulairectrl = null ;
			}
		if( this.menu )
			{
			this.menu.remove() ;
			this.menu = null ;
			}
		},
	// Sur keydown
	onKeyDown: function( keycode, shift, alt )
		{
		},
	// Sur contexte menu
	onContextMenu: function()
		{
		this.setSelected() ;
		},
	// Sur destruction du noeud
	onRemove: function()
		{
		},
	// Sur copy du modele associé au noeux
	onCopyModele: function()
		{
		ayawf.mvc.setModeleToCopy( this.modele ) ;
		},
	// Sur collage d'un modele
	onPasteModele: function()
		{
		ayawf.mvc.pasteModeleToCopy( this, this.onCreateChildNodeWithModele ) ;
		},
	// Sur suppression du module
	onDeleteModele: function()
		{
		if( confirm( ayawf.tools.prepare_to_show( "Voulez vous supprimer la ligne sélectionnée ?" ) ) ) this.modele.deleteToDB() ;
		},
	// Calcule et renvoie la largeur du noeud
	getWidth: function()
		{
		return this.libelle.offsetWidth ;
		},
	getHeight: function()
		{
		return this.libelle.offsetHeight ;
		},
	// Calcule et renvoie la position absolue du noeud
	getAbsoluteX: function()
		{
		var x = this.libelle.offsetLeft ;
		x += this.treeview.contener.offsetLeft ;
		return x ;
		},
	getAbsoluteY: function()
		{
		var y = this.libelle.offsetTop ;
		y += this.treeview.contener.offsetTop ;
		return y ;
		}
	} ;

// Developpe les fils d'un noeud a partir d'une image
function onTreeNodeDropUpDown()
	{
	hideCurrentMenu() ;
	this.object.onDropUpDown() ;
	}

// Gestion du onClick sur un noeud
function onTreeNodeClick()
	{
	hideCurrentMenu() ;
	if( this.object.modele ) this.object.modele.setSelectedAllViews() ;
	else this.object.setSelected() ;
	this.object.onClick() ;
	}

// Gestion du onKeyDown sur un noeud
function	onTreeNodeKeyDown()
	{
	hideCurrentMenu() ;
	if( isNETSCAPE )
		{
		var keycode = e.keyCode ;
		var shift = e.shiftKey ;
		var alt = e.altKey ;
		}
	else
		{
		var keycode = window.event.keyCode ;
		var shift = window.event.shiftKey ;
		var alt = window.event.altKey ;
		}
	this.object.onKeyDown( keycode, shift, alt ) ;
	}

// Gestion du onClick sur un noeud
function onTreeNodeContextMenu()
	{
	hideCurrentMenu() ;
	this.object.onContextMenu() ;
	return false ;
	}
