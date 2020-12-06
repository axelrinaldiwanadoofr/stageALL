/*********************************************************
* Modèle dans la de gestion des articles
*********************************************************/

ayawf.mvc.add( "Article", new MvcModeleControler(
	"Article",
	"reference",
	"reference,type,referencemodele,libelle,codecat,codefam,unite,debut,fin,description,icone,image" ) ) ;

ayawf.mvc.add( "PropertyRubrique", new MvcModeleControler(
	"PropertyRubrique",
	"rubrique",
	"rubrique,libelle,image,noordre" ) ) ;

ayawf.mvc.add( "Property", new MvcModeleControler(
	"Property",
	"rubrique,name",
	"rubrique,name,type,description,image,libelle,referencemodele,listevalue,width,noordre" ) ) ;

ayawf.mvc.add( "ApString", new MvcModeleControler(
	"ApString",
	"reference,rubrique,name",
	"reference,rubrique,name,value" ) ) ;

ayawf.mvc.add( "ApStringMl", new MvcModeleControler(
	"ApStringMl",
	"reference,rubrique,name",
	"reference,rubrique,name,value" ) ) ;

ayawf.mvc.add( "ApImage", new MvcModeleControler(
	"ApImage",
	"reference,rubrique,name",
	"reference,rubrique,name,fichier,width,height" ) ) ;

ayawf.mvc.add( "ApTexte", new MvcModeleControler(
	"ApTexte",
	"reference,rubrique,name",
	"reference,rubrique,name,texte" ) ) ;

ayawf.mvc.add( "ApRefArticle", new MvcModeleControler(
	"ApRefArticle",
	"reference,rubrique,name",
	"reference,rubrique,name,article" ) ) ;

ayawf.mvc.add( "ArticleProperties", new MvcModeleControler(
	"ArticleProperties",
	"reference",
	"reference" ) ) ;

ayawf.mvc.add( "CategorieArticle", new MvcModeleControler(
	"CategorieArticle",
	"categorie",
	"categorie,libelle" ) ) ;

ayawf.mvc.add( "FamilleArticle", new MvcModeleControler(
	"FamilleArticle",
	"famille",
	"famille,libelle,parent" ) ) ;
		
ayawf.mvc.add( "ArticleRegroupement", new MvcModeleControler(
	"ArticleRegroupement",
	"regroupement",
	"regroupement,pere,libelle,articles,rubrique,property,value,type,modeshow,image,imagevalue,referencemodele,referencemodelecreate" ) ) ;

ayawf.mvc.add( "ArticleRecherche", new MvcModeleControler(
	"ArticleRecherche",
	"recherche",
	"recherche" ) ) ;

ayawf.mvc.add( "ArticleStructure", new MvcModeleControler(
	"ArticleStructure",
	"reference,sid",
	"reference,sid,client,pardefaut,reffour,puht,txremise,commentaire" ) ) ;

ayawf.mvc.add( "ArticleStructureTarif", new MvcModeleControler(
	"ArticleStructureTarif",
	"reference,sid,datedebut,datefin,qtemin,qtemax",
	"reference,sid,datedebut,datefin,qtemin,qtemax,puht,txremise" ) ) ;

ayawf.mvc.add( "Operation", new MvcModeleControler(
	"Operation",
	"operation",
	"operation,libelle" ) ) ;

ayawf.mvc.add( "Tva", new MvcModeleControler(
		"Tva",
		"tva",
		"tva,taux" ) ) ;

ayawf.mvc.add( "ArticleOperation", new MvcModeleControler(
	"ArticleOperation",
	"reference,noordre",
	"reference,noordre,operation,libelle" ) ) ;

ayawf.mvc.add( "ArticleComposant", new MvcModeleControler(
	"ArticleComposant",
	"reference,composant",
	"reference,composant,qte" ) ) ;

ayawf.mvc.add( "ArticleExport", new MvcModeleControler(
	"ArticleExport",
	"recherche,dbfield",
	"recherche,dbfield" ) ) ;
	
// Charge les rubriques
ayawf.mvc.loadModeleFromSqlSelect( "PropertyRubrique", "propertyrubrique" ) ;

