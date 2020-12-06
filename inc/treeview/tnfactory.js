/********************************************************************************************
* Classe TnFactory 
*
* Factory pour la creation d'un treenode de base
*
* oncreatechildnodewithmodele : fonction creant et retournant un treenode a partir d'un modele
************************************************************************************************/

function TnFactory( oncreatechildnodewithmodele )
	{
	this.initTnFactory( oncreatechildnodewithmodele ) ;
	}

TnFactory.prototype =
	{
	initTnFactory: function( oncreatechildnodewithmodele )
		{
		this.oncreatechildnodewithmodele = oncreatechildnodewithmodele ;
		},
	onCreateChildNodeWithModele: function( tnparent, modele )
		{
		if( this.oncreatechildnodewithmodele )
			{
			var tn = this.oncreatechildnodewithmodele.call( this, modele ) ;
			tnparent.addChildNode( tn ) ;
			tn.onRefresh() ;
			}
		}
	} ;
