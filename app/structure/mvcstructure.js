/*********************************************************
* Modèles utilisé dans la gestion des structures
*********************************************************/

ayawf.mvc.add( "Structure", new MvcModeleControler(
	"Structure",
	"sid",
	"sid,nature,activite,description,datecreation,siret,numtva,ape,,conditionpayement,typeescompte,categorie,monaie1,monaie2,port_defaut,typeadresse_commande,typeadresse_devis,typeadresse_bl,typeadresse_facture,typeadresse_livraison" ) ) ;

ayawf.mvc.add( "StructureRecherche", new MvcModeleControler(
	"StructureRecherche",
	"recherche",
	"recherche" ) ) ;

ayawf.mvc.add( "ContactRecherche", new MvcModeleControler(
	"ContactRecherche",
	"recherche",
	"recherche" ) ) ;
	
ayawf.mvc.add( "StructureAdresse", new MvcModeleControler(
	"StructureAdresse",
	"sid,typeadresse",
	"sid,typeadresse" ) ) ;
	
ayawf.mvc.add( "StructureContact", new MvcModeleControler(
	"StructureContact",
	"contact",
	"sid,contact" ) ) ;

ayawf.mvc.add( "Pays", new MvcModeleControler(
	"Pays",
	"pays",
	"pays,drapeau" ) ) ;

ayawf.mvc.add( "ConditionPaiement", new MvcModeleControler(
	"ConditionPaiement",
	"conditionpaiement",
	"conditionp" ) ) ;

ayawf.mvc.add( "TypeEscompte", new MvcModeleControler(
	"TypeEscompte",
	"typeescomptes",
	"typeescompte,libelle" ) ) ;

ayawf.mvc.add( "TypePort", new MvcModeleControler(
	"TypePort",
	"type",
	"type,libelle" ) ) ;
	
ayawf.mvc.add( "Langue", new MvcModeleControler(
	"Langue",
	"langue",
	"code,libelle" ) ) ;

ayawf.mvc.add( "Unite", new MvcModeleControler(
	"Unite",
	"unite",
	"unite,libelle,reference,coefficient" ) ) ;
	