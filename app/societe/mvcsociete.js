/*********************************************************
* Modèles utilisé dans la gestion des structures
*********************************************************/

ayawf.mvc.add( "Societe", new MvcModeleControler(
	"Societe",
	"societe",
	"societe" ) ) ;

ayawf.mvc.add( "Site", new MvcModeleControler(
	"Site",
	"societe,site",
	"societe,site" ) ) ;

ayawf.mvc.add( "Employe", new MvcModeleControler(
	"Employe",
	"matricule",
	"matricule" ) ) ;
	
ayawf.mvc.add( "TvaTaux", new MvcModeleControler(
	"TvaTaux",
	"tva",
	"tva,taux" ) ) ;
	
ayawf.mvc.add( "TauxHoraire", new MvcModeleControler(
	"TauxHoraire",
	"typetaux",
	"typetaux,libelle,monaie" ) ) ;

ayawf.mvc.add( "TauxHoraireValeur", new MvcModeleControler(
	"TauxHoraireValeur",
	"typetaux,debut,fin",
	"typetaux,debut,fin,taux_normal,taux_10,taux_25,taux_50,taux_100" ) ) ;
