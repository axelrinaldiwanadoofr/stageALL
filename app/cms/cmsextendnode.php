<?php
//////////////////////////////////////////////////////////
// cmsextendnode.php
//
// D�finition d'une extention d'un noeud
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class CmsExtendNode extends Factory
{	
	protected	$fnode ; // Factory des noeux de base

	function __construct( $appctx, $table, $fnode=null )
	{
 		parent::__construct( $appctx, "id", $table ) ;
		$this->fnode = $fnode ;
	}

	// Renvoie la factory de la base du noeud
	public function getBaseFactory()
	{
		return $this->fnode ;
	}

	// Apres chargement direct d'un cmslabelnode
	public function onAfterLoadObjects( $appctx )
	{
		$fcmsnode = new CmsNode( $appctx ) ;
		
		foreach( $this->objects as $k=>$cmsextendnode )
		{
			$key = array() ;
			$key["id"] = $cmsextendnode->id ;
			$cmsextendnode->node = $fcmsnode->loadObjectFromKey( $appctx, $key ) ;
		}			
	}

	// Lie chaque CmsLabelNode au CmsNode associe
	public function linkToCmsNode( $cmsnodes )
	{
		foreach( $this->objects as $keystring=>$cmsextendnode )
		{
			$cmsnode = $cmsnodes[$cmsextendnode->id] ;
			$cmsnode->setSpNode( $cmsextendnode ) ;
			$cmsextendnode->node = $cmsnode ;
		}
	}

	public function createNewObject( $appctx, $row = null )
	{		
		$this->fnode = new CmsNode( $appctx ) ;
		$node = $this->fnode->createNewObject( $appctx, $row ) ;
		$row["id"] = $node->id ;
		$extendnode = parent::createNewObject( $appctx, $row ) ;
		$node->setSpNode( $extendnode ) ;
		$extendnode->node = $node ;
		return $extendnode ;
	}

	// Cree une copie de l'objet en mettant � jour les champs non cr�� par le constructeur � partir de ceux de l'original
	public function copyObject( $appctx, $original, $row = null )
	{
		$values = array() ;
		foreach( $original->values as $field=>$value ) $values[$field] = $value ;
		foreach( $original->node->values as $field=>$value ) $values[$field] = $value ;
		if( $row ) foreach( $row as $field=>$value ) $values[$field] = $value ;
		
		$object = $this->createNewObject( $appctx, $values ) ;
		return $object ;
	}		
}

class inCmsExtendNode extends BaseObject
{
	public $node ; // Lien vers le noeud principal

	function __construct( $appctx, $factory, $key=null, $row=null )
	{		
 		parent::__construct( $appctx, $factory, $key, $row ) ;
	}

	// Met a jour les champs � partir du tableau associatif
	public function updateAttributesFromRow( $appctx, $row )
	{
		$ok = true ;
		if( !$this->node->updateAttributesFromRow( $appctx, $row ) ) $ok = false ;
		if( !parent::updateAttributesFromRow( $appctx, $row ) ) $ok = false ;
		return $ok ;
	}		

	// Marque l'objet comme etant a detruire au prochain save
	public function remove()
	{
		parent::remove() ;
		$this->node->remove() ;
	}		

	public function save()
	{
		$ok = true ;
		if( !$this->node->save() ) $ok = false ;
		if( !parent::save() ) $ok = false ;
		if( $this->node->state != "loaded" ) $this->state = $this->node->state ;
		return $ok ;
	}

	// Renvoie les valeurs de la partie specifique du noeud et du node associ� comme s'il s'agissait d'un meme objet specifique
	public function sendAnswerValues( $appctx )
	{
		$this->copyAttributesToValues() ;		
		$answer = $this->createStringHeadToSend() ;
		$answer .= $this->createStringValuesToSend() ;
		$this->node->copyAttributesToValues() ;		
		$answer .= $this->node->createStringValuesToSend() ;
		$appctx->sendAnswer( $answer ) ;
	}	

	// Genere la vue sur le noeud
	function createView( $appctx, $parentview, $arguments )
	{
		return new vwCmsNode( $appctx, $this, $parentview ) ;
	}		

	// Cree une copie d'un noeud
	public function createCopy( $appctx, $row=null )
	{
		// Charge le module dans lequel le noeud se trouve
		$node = $this->node ;
		$fnode = new CmsNode( $appctx ) ;
		$root_node = $fnode->loadModule( $appctx, $node->module, $node->version ) ;
		$original = $root_node->getNodeById( $this->id ) ;
		
		if( $original )
		{
			// Cree une copie du noeud et de son arborescence
			$new_node = $original->createCopy( $appctx, $row ) ;
			return $new_node->getSpNode() ;
		}
		return null ;
	}		
}
?>