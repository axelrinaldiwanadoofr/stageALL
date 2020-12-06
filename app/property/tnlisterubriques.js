/*********************************************************
* Classe TnListeRubriques: TnSql pour une liste d'article
*********************************************************/

function TnListeRubriques( rubriqueparent, modelecontrolermanager )
	{
	herite( TnListeRubriques, TnSql, true ) ;
	herite( TnListeRubriques, TreeNode ) ;
	this.initTnListeRubriques( rubriqueparent, modelecontrolermanager ) ;
	}

TnListeRubriques.prototype =
	{
	initTnListeRubriques: function( rubriqueparent, modelecontrolermanager )
		{
		var sqlcount ;
		var sqlrow ;
		this.rubriqueparent = rubriqueparent ;
		if( rubriqueparent )
			{
			sqlcount = "select count(*) from propertyrubrique where rubriqueparent='" + rubriqueparent + "'" ;
			sqlrow = "select * from propertyrubrique where rubriqueparent='" + rubriqueparent + "' order by noordre" ;
			}
		else
			{
			sqlcount = "select count(*) from propertyrubrique where rubriqueparent is null" ;
			sqlrow = "select * from propertyrubrique where rubriqueparent is null order by noordre" ;
			}

		this.initTnSql( "Rubriques",
			"app/image/tn_propertyrubrique.bmp",
			"app/image/tn_propertyrubrique.bmp",
			sqlcount,
			sqlrow,
			"PropertyRubrique",
			modelecontrolermanager ) ;
		},
	onCreateChildNodeWithModele: function( modele )
		{
		var tn = new TnPropertyRubrique( modele ) ;
		this.addChildNode( tn ) ;
		tn.onRefresh() ;
		}
	} ;
