/*********************************************************
* Classe TnListeStructures: TnSql pour une liste de 
* structure
*********************************************************/

function TnListeStructures( texte, image, sqlcount, from, where, orderby )
	{
	herite( TnListeStructures, TnSql, true ) ;
	herite( TnListeStructures, TreeNode ) ;
	this.initTnListeStructures( texte, image, sqlcount, from, where, orderby ) ;
	}

TnListeStructures.prototype =
	{
	initTnListeStructures: function( texte, image, sqlcount, from, where, orderby )
		{
		this.initTnSql( texte,
			image,
			image,
			sqlcount,
			from,
			where,
			orderby,
			"Structure" ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnStructure( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		}
	} ;
