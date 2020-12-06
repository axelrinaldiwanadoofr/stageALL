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
require_once( "inc/data/dbobject.php" ) ;
require_once( "app/article/articleproperties.php" ) ;

class Article extends Factory
	{
	//Reference les articles 
	protected $articles ;

	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "reference", "articles" ) ;

		$this->articles = array() ;

		
		if( !$newobject )
			{
			// Charge les propriétés
			ApString::loadPropertyForArticle( $appctx, $this ) ;
			ApStringMl::loadPropertyForArticle( $appctx, $this ) ;
			ApTexte::loadPropertyForArticle( $appctx, $this ) ;
			ApImage::loadPropertyForArticle( $appctx, $this ) ;
			ApRefArticle::loadPropertyForArticle( $appctx, $this ) ;

			// Met à jour les textes
			$this->values["rdescription"] = "" ;
			$this->rlibelle = $this->libelle ;
			$this->rdescription = $this->description ;

			foreach( $this->properties as $n=>$property )
				{
				$this->rlibelle = $property->updateTexte( $appctx, $this->rlibelle ) ;
				$this->rdescription = $property->updateTexte( $appctx, $this->rdescription ) ;
				}

			// Construit le set de propriétés
			$this->propertyset = new ArticleProperties( $appctx, $this ) ;
			$this->propertyset->setMainObject( $this ) ;
			}
		else
			{
			$this->reference = "art_" . DbParametreInc( $appctx->db, "ARTICLE", "numreference" ) ;
			$this->values["rdescription"] = "" ;
			}
		}

	public function loadObjectsFromSql( $appctx, $from, $where, $orderby, $firstrow, $lastrow )
		{
		$sql = "select * from $from " ;
		if( $where ) $sql .= "where $where " ;
		if( $ordeby ) $sql .= "order by $orderby" ;
		$r_article = $appctx->db->buildCursor( $sql ) ;

		$nrow = $firstrow ;
		if( $r_article->goToRow( $nrow ) )
			{
			while( $row = $r_article->fetchAssoc() )
				{
				$article = new iArticle( $appctx, $this, $row ) ;
				$this->articles[$article->reference] = $article ;
				
				$nrow++ ;
				if( $nrow > $lastrow ) break ; 
				}
				if( $nrow > $lastrow ) $appctx->sendAnswer( "1<sep>$lastrow" ) ; 
				else $appctx->sendAnswer( "0<sep>$nrow" ) ; 
				}
			else
				{
				while( $row = $dbc->fetchAssoc() )
					{
					$classname = $row[$fieldclassname] ;
					$object = new $classname( $appctx, $row ) ;
					if( $object ) $object->sendAnswerValues( $appctx ) ;
					$nrow++ ;
					if( $nrow > $lastrow ) break ; 
					}
				if( $nrow > $lastrow ) $appctx->sendAnswer( "1<sep>$lastrow" ) ; 
				else $appctx->sendAnswer( "0<sep>$nrow" ) ; 
				}
			}
		}
	// Renvoie les valeurs de l'objet
	public function sendAnswerValues( $appctx )
		{
		parent::sendAnswerValues( $appctx ) ;

		foreach( $this->properties as $n=>$property )
			{
			$property->sendAnswerValues( $appctx ) ;
			}
		$this->propertyset->sendAnswerValues( $appctx ) ;
		}
	}
class iArticle extends DbObject
	{
	protected $properties ;
	protected $propertyset ;
	
	//Reference les articles 
	protected static $articles = null ;


	function __construct( $appctx, $factory, $key=null, $newobject=null )
		{
 		parent::__construct( $appctx, "reference", "articles", $key, $newobject ) ;

		$this->properties = array() ;

		
		if( !$newobject )
			{
			// Charge les propriétés
			ApString::loadPropertyForArticle( $appctx, $this ) ;
			ApStringMl::loadPropertyForArticle( $appctx, $this ) ;
			ApTexte::loadPropertyForArticle( $appctx, $this ) ;
			ApImage::loadPropertyForArticle( $appctx, $this ) ;
			ApRefArticle::loadPropertyForArticle( $appctx, $this ) ;

			// Met à jour les textes
			$this->values["rdescription"] = "" ;
			$this->rlibelle = $this->libelle ;
			$this->rdescription = $this->description ;

			foreach( $this->properties as $n=>$property )
				{
				$this->rlibelle = $property->updateTexte( $appctx, $this->rlibelle ) ;
				$this->rdescription = $property->updateTexte( $appctx, $this->rdescription ) ;
				}

			// Construit le set de propriétés
			$this->propertyset = new ArticleProperties( $appctx, $this ) ;
			$this->propertyset->setMainObject( $this ) ;
			}
		else
			{
			$this->reference = "art_" . DbParametreInc( $appctx->db, "ARTICLE", "numreference" ) ;
			$this->values["rdescription"] = "" ;
			}
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

	public function getChildObject( $classname, $key )
		{
		if( $classname == "ArticleProperties" )
			{
			return $this->propertyset ;
			}
		else return $this->properties[ $key["rubrique"] . $key["name"] ] ;
		}
	// Appelée après mise à jour de l'objet ou l'un des fils
	public function onValueChanged( $appctx )
		{
		$this->rlibelle = $this->libelle ;
		$this->rdescription = $this->description ;

		foreach( $this->properties as $n=>$property )
			{
			$property->reference = $this->reference ;
			$this->rlibelle = $property->updateTexte( $appctx, $this->rlibelle ) ;
			$this->rdescription = $property->updateTexte( $appctx, $this->rdescription ) ;
			}
		$this->propertyset->loadValues( $appctx, $this ) ;
		}
	// Enregistre les valeurs de l'objet
	public function save()
		{
		parent::save() ;

		foreach( $this->properties as $n=>$property )
			{
			$property->save() ;
			}
		$this->propertyset->save() ;
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
	// Renvoie les valeurs de l'objet
	public function sendAnswerValues( $appctx )
		{
		parent::sendAnswerValues( $appctx ) ;

		foreach( $this->properties as $n=>$property )
			{
			$property->sendAnswerValues( $appctx ) ;
			}
		$this->propertyset->sendAnswerValues( $appctx ) ;
		}

	public function createCopy( $appctx, $newvalues )
		{
		$row = $this->createDataRowIncluding( $newvalues ) ;

		$article = new Article( $appctx, $row, true ) ;
		
		$row["reference"] = $article->reference ;

		// Copie les propriétés
		foreach( $this->properties as $n=>$property )
			{
			$new_property = $property->createCopy( $appctx, $row ) ;
			$article->addProperty( $new_property ) ;
			}

		// Construit le set de propriétés
		$article->propertyset = new ArticleProperties( $appctx, $article ) ;
		$article->propertyset->setMainObject( $article ) ;
		return $article ;
		}
		
	public static function getArticle( $appctx, $reference, $key=null, $newobject=null )	
		{
		if( $reference && isset( self::$articles[$reference] ) ) return self::$articles[$reference] ;
		else return new Article( $appctx, $key, $newobject ) ;
		}
	}
?>