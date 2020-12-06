/*********************************************************
* Modèle dans la de gestion des affaires
*********************************************************/

ayawf.mvc.add( "Affaire", new MvcModeleControler(
	"Affaire",
	"affaire",
	"affaire" ) ) ;

ayawf.mvc.add( "AffaireLigne", new MvcModeleControler(
	"AffaireLigne",
	"affaire,nligne",
	"affaire,nligne" ) ) ;
	
ayawf.mvc.add( "AffaireRecherche", new MvcModeleControler(
	"AffaireRecherche",
	"recherche",
	"recherche,affaire,client,annee,refclient,responsable,deisgnation" ) ) ;

