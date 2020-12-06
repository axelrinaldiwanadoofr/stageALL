<?php
//////////////////////////////////////////////////////////
// article.php
//
// Définition d'un article dans Gestion
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;
require_once( "app/article/articleproperties.php" ) ;

class Article extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "reference", "articles" ) ;
		}

	public function onAfterLoadObjects( $appctx )
		{
		$fproperties = array() ;
		
		$fproperties[] = new ApString( $appctx ) ;
		$fproperties[] = new ApStringMl( $appctx ) ;
		$fproperties[] = new ApTexte( $appctx ) ;
		$fproperties[] = new ApImage( $appctx ) ;
		$fproperties[] = new ApRefArticle( $appctx ) ;

		if( $this->incondition != "" )
			{
			foreach( $fproperties as $n=>$fproperty )
				{
				$fproperty->loadProperties( $appctx, $this->incondition ) ;
				$fproperty->linkPropertiesToArticles( $this->objects ) ;
				}			
			}

		$farticleproperties = new ArticleProperties( $appctx ) ;
		foreach( $this->objects as $keystring=>$article )
			{
			$article->setPropertySet( $farticleproperties->createPropertySet( $appctx, $article ) ) ;
			$article->computeDescription( $appctx ) ;
			}			
		}
				
	public function getArticle( $appctx, $reference, $key=null, $row=null )	
		{
		if( $reference && isset( $this->objects[$reference] ) ) return $this->objects[$reference] ;
		//else return new Article( $appctx, $key, $newobject ) ;
		}
	}
	
class inArticle extends Object
	{
	protected $properties ;
	protected $propertyset ;

	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;

		$this->properties = array() ;
		
		if( !$key )
			{
			$this->reference = "art_" . DbParametreInc( $appctx->db, "ARTICLE", "numreference" ) ;
			$this->type = "Article" ;
			$this->unite = "PCE" ;
			$this->rdescription = "" ;
			$this->fabrique = "0" ;
			$this->achete = 1 ;
			$this->achatmodecalcul = "0" ;
			$this->operationmode = "0" ;
			$this->composantmode = "0" ;
			$this->puhtventecalcul = 1 ;
			$this->tva = DbParametreInc( $appctx->db, "ARTICLE", "tva" ) ;
			}
		$this->values["rdescription"] = "" ;
		}

	public function addProperty( $property )
		{
		$this->properties["$property->rubrique$property->name"] = $property ;
		$property->setMainObject( $this ) ;
		}

	public function getProperty( $rubrique, $name )
		{
		if( isset( $this->properties["$rubrique$name"]) )
			return $this->properties["$rubrique$name"] ;
		return null ;
		}

	public function setPropertySet( $propertyset )
		{
		$this->propertyset = $propertyset ;
		$this->propertyset->setMainObject( $this ) ;
		}
		
	public function getChildObject( $classname, $key )
		{
		if( $classname == "ArticleProperties" )
			{
			return $this->propertyset ;
			}
		else return $this->properties[ $key["rubrique"] . $key["name"] ] ;
		}
	// Calcule la description rdescription à partir des valeurs de propriété
	public function computeDescription( $appctx )
		{
		$this->rdescription = $this->description ;

		foreach( $this->properties as $n=>$property )
			{
			$this->rdescription = $property->updateTexte( $appctx, $this->rdescription ) ;
			}
		}
	public function updateTexte( $appctx, $texte )
		{
		if( $this->codecat != "" )
			{
			$texte = str_replace( "article.codecat", "$this->codecat", $texte ) ;
			$r_categorie = DbGetRowWhereStr( $appctx->db, "categoriearticles", "categorie", $this->codecat ) ;
			if( $r_categorie ) $texte = str_replace( "article.categorie", $r_categorie["libelle"], $texte ) ;
			else $texte = str_replace( "article.categorie", "", $texte ) ;
			}
		else
			{
			$texte = str_replace( "article.categorie", "", $texte ) ;
			$texte = str_replace( "article.codecat", "", $texte ) ;
			}

		if( $this->codefam != "" )
			{
			$texte = str_replace( "article.codefam", "$this->codefam", $texte ) ;
			$r_famille = DbGetRowWhereStr( $appctx->db, "famillearticles", "famille", $this->codefam ) ;
			if( $r_famille ) $texte = str_replace( "article.famille", $r_famille["libelle"], $texte ) ;
			else $texte = str_replace( "article.famille", "", $texte ) ;
			}
		else
			{
			$texte = str_replace( "article.famille", "", $texte ) ;
			$texte = str_replace( "article.codefam", "", $texte ) ;
			}
			
		if( $this->fabrique )
			{
			$texte = str_replace( "article.puht_fabrication", "$this->puht_fabrication", $texte ) ;
			$texte = str_replace( "article.fabrique", "fabriqué", $texte ) ;
			}
		else
			{
			$texte = str_replace( "article.puht_fabrication", "", $texte ) ;
			$texte = str_replace( "article.fabrique", "non fabriqué", $texte ) ;
			}

		if( $this->achete )
			{
			$texte = str_replace( "article.puht_achat", "$this->puht_achat", $texte ) ;
			$texte = str_replace( "article.achete", "acheté", $texte ) ;
			$texte = str_replace( "article.fabriquant", "$this->fabriquant", $texte ) ;
			$texte = str_replace( "article.reffabriquant", "$this->reffabriquant", $texte ) ;
			
			if( $this->fabriquant )
				{
				$r_fabriquant = DbGetRowWhereNumeric( $appctx->db, "structures", "sid", $this->fabriquant ) ;
				if( $r_fabriquant ) $texte = str_replace( "article.rsfabriquant", $r_fabriquant["rs"], $texte ) ;
				else $texte = str_replace( "article.rsfabriquant", "", $texte ) ;
				}
			}
		else
			{
			$texte = str_replace( "article.puht_achat", "", $texte ) ;
			$texte = str_replace( "article.achete", "non acheté", $texte ) ;
			$texte = str_replace( "article.fabriquant", "", $texte ) ;
			$texte = str_replace( "article.rsfabriquant", "", $texte ) ;
			$texte = str_replace( "article.reffabriquant", "", $texte ) ;
			}
						
		$texte = str_replace( "article.puht_revient", "$this->puht_revient", $texte ) ;
		$texte = str_replace( "article.puht_vente", "$this->puht_vente", $texte ) ;
		$texte = str_replace( "article.marge_vente", "$this->marge_vente", $texte ) ;
		
		$texte = str_replace( "article.rlibelle", "$this->rlibelle", $texte ) ;
		return $texte ;
		}
		
	// Appelée après mise à jour de l'objet ou l'un des fils
	public function onValueChanged( $appctx )
		{
		$this->rlibelle = $this->libelle ;
		$this->rdescription = $this->description ;
		
		// Cumul des valeurs operatoires
		$row = DbSql( $appctx->db, "select sum(temps) as temps, sum(pht) as pht from articleoperation where soustraitant is null and reference='$this->reference'" ) ;
		$this->temps_operation = $row["temps"] ;
		$this->puht_operation = $row["pht"] ;

		// Cumul des valeurs sous traitance
		$row = DbSql( $appctx->db, "select sum(temps) as temps, sum(pht) as pht from articleoperation where soustraitant is not null and reference='$this->reference'" ) ;
		$this->temps_soustraitance = $row["temps"] ;
		$this->puht_soustraitance = $row["pht"] ;
		
		// Cumul des valeurs composants
		$row = DbSql( $appctx->db, "select sum(temps_total*qte) as temps, sum(puht_revient*qte) as pht from articlecomposant as c,articles as a where a.reference = c.composant and c.reference='$this->reference'" ) ;
		$this->temps_composant = $row["temps"] ;
		$this->puht_composant = $row["pht"] ;
		
		// Calcul du puht_revient et du temps total
		$this->puht_revient = 0 ;
		$this->temps_total = "" ;
		
		if( $this->fabrique ) 
			{
			$this->puht_revient += $this->puht_fabrication ;
			$this->temps_total = $this->temps_fabrication ;

			if( $this->operationmode )	
				{
				// Cumul les operations interne
				$this->puht_revient += $this->puht_operation ;
				$this->temps_total += $this->temps_operation ;
				// Cumul les operations de sous traitance
				$this->puht_revient += $this->puht_soustraitance ;
				$this->temps_total += $this->temps_soustraitance ;
				}
				
			if( $this->composantmode )	
				{
				// Cumul les composants
				$this->puht_revient += $this->puht_composant ;
				$this->temps_total += $this->temps_composant ;
				}
			}
		if( $this->achete ) $this->puht_revient += $this->puht_achat ;
		
		// Calcul du puht vente
		//echo( "Marge: $this->marge_vente" ) ;
		if( $this->puhtventecalcul )
			{
			if( $this->marge_vente != "" ) $this->puht_vente = $this->puht_revient * (1.0 + $this->marge_vente / 100. ) ;
			else $this->puht_vente = $this->puht_revient ;
			}
		else
			{
			if( $this->puht_revient != 0 ) $this->marge_vente = ($this->puht_vente / $this->puht_revient - 1 ) * 100 ;
			else $this->marge_vente = "" ;
			}

		// Calcul du puttc vente

		// Taux de TVA
		if( $this->tva != "" )
			{
			//echo( "TVA: $this->tva" ) ;
			$row = DbSql( $appctx->db, "select taux from tvataux where tva ='$this->tva'" ) ;

			if( $this->puht_vente && $row["taux"] )
				{
				//echo( "Taux TVA: " . $row["taux"] ) ;
				$this->puttc_vente = $this->puht_vente * ( 1.0 + $row["taux"] ) ;
				}
			}

		foreach( $this->properties as $n=>$property )
			{
			$property->reference = $this->reference ;
			$this->rlibelle = $property->updateTexte( $appctx, $this->rlibelle ) ;
			$this->rdescription = $property->updateTexte( $appctx, $this->rdescription ) ;
			}
		$this->rlibelle = $this->updateTexte( $appctx, $this->rlibelle ) ;
		$this->rdescription = $this->updateTexte( $appctx, $this->rdescription ) ;
		}
	// Enregistre les valeurs de l'objet
	public function save()
		{
		parent::save() ;

		foreach( $this->properties as $n=>$property )
			{
			$property->save() ;
			}
		if( $this->propertyset ) $this->propertyset->save() ;
		}
	// Supprime l'article et toutes ses dépendances
	public function remove()
		{
		$this->propertyset->remove() ;

		foreach( $this->properties as $n=>$property )
			{
			$property->remove() ;
			}
		
		parent::remove() ;
		}
	public function createCopy( $appctx, $row=null )
		{
		$article = parent::createCopy( $appctx, $row=null ) ;
		
		// Copie les propriétés
		foreach( $this->properties as $n=>$property )
			{
			$new_property = $property->createCopy( $appctx, $row ) ;
			$article->addProperty( $new_property ) ;
			$new_property->reference = $article->reference ;
			}

		$farticleproperties = new ArticleProperties( $appctx ) ;
		$article->setPropertySet( $farticleproperties->createPropertySet( $appctx, $article ) ) ;
		
		$article->onValueChanged( $appctx ) ;
		
		return $article ;
		}
	// Renvoie les valeurs de l'objet
	public function sendAnswerValues( $appctx )
		{
		parent::sendAnswerValues( $appctx ) ;

		foreach( $this->properties as $n=>$property )
			{
			$property->sendAnswerValues( $appctx ) ;
			}
		if( $this->propertyset ) $this->propertyset->sendAnswerValues( $appctx ) ;
		}
	}
?>