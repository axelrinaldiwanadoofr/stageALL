/********************************************************************************************
* Classe TnModeleFactory 
*
* Factory pour la creation d'un treenode de type TnModele
*
* modele: Modele exploitate par le treenode
* image:  Nom et chemin du fichier image pour le treenode
* methonrefresh: Source de la methode executee pour rafraichir le treenode
* messageforcopy: Message pour l'item de menu copy, si null l'item n'apparait pas.
* messagefordelete: Message pour l'item de menu delete, si null l'item n'apparait pas.
************************************************************************************************/

function TnModeleFactory( image, methonrefresh, methcreateform, messageforcopy, messagefordelete )
	{
	this.initTnModeleFactory( image, methonrefresh, methcreateform, messageforcopy, messagefordelete ) ;
	}

TnModeleFactory.prototype =
	{
	initTnModeleFactory: function( image, methonrefresh, methcreateform, messageforcopy, messagefordelete )
		{
		this.image = image ;
		this.methonrefresh = methonrefresh ;
		this.methcreateform = methcreateform ;
		this.messageforcopy = messageforcopy ;
		this.messagefordelete = messagefordelete ;
		},
	onCreateChildNodeWithModele: function( tnparent, modele )
		{
		var tn = new TnModele( modele, this.image, this.methonrefresh, this.methcreateform, this.messageforcopy, this.messagefordelete ) ;
		tnparent.addChildNode( tn ) ;
		tn.onRefresh() ;
		}
	} ;
