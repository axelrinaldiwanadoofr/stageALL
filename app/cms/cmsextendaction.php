<?php
//////////////////////////////////////////////////////////
// cmsextendaction.php
//
// D�finition d'une extention d'une action
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class CmsExtendAction extends Factory
{
	protected $faction ; // Factory de base
	
	function __construct( $appctx, $table, $faction=null )
	{
 		parent::__construct( $appctx, "id", $table ) ;
		$this->faction = $faction ;
	}

	// Renvoie la factory de la base de l'action
	public function getBaseFactory()
	{
		return $this->faction ;
	}

	// Apres chargement direct d'un cmslabelnode
	public function onAfterLoadObjects( $appctx )
	{
		$fcmsaction = new CmsAction( $appctx ) ;
		
		foreach( $this->objects as $k=>$cmsextendaction )
		{
			$key = array() ;
			$key["id"] = $cmsextendaction->id ;
			$cmsextendaction->action = $fcmsaction->loadObjectFromKey( $appctx, $key ) ;
		}			
	}

	// Lie chaque CmsExtendAction au CmsAction associe
	public function linkToCmsAction( $cmsactions )
	{
		foreach( $this->objects as $keystring=>$cmsextendaction )
		{
			$cmsaction = $cmsactions[$cmsextendaction->id] ;
			$cmsaction->setSpAction( $cmsextendaction ) ;
			$cmsextendaction->action = $cmsaction ;
		}
	}

	public function createNewObject( $appctx, $row = null )
	{
		$this->faction = new CmsAction( $appctx ) ;
		$action = $this->faction->createNewObject( $appctx, $row ) ;
		$row["id"] = $action->id ;
		$extendaction = parent::createNewObject( $appctx, $row ) ;
		$action->setSpAction( $extendaction ) ;
		$extendaction->action = $action ;
		return $extendaction ;
	}		
}

class inCmsExtendAction extends BaseObject
{
	public $action ; // Lien vers le noeud principal

	function __construct( $appctx, $factory, $key=null, $row=null )
	{		
 		parent::__construct( $appctx, $factory, $key, $row ) ;
	}

	// Met a jour les champs � partir du tableau associatif
	public function updateAttributesFromRow( $appctx, $row )
	{
		$ok = true ;
		if( !$this->action->updateAttributesFromRow( $appctx, $row ) ) $ok = false ;
		if( !parent::updateAttributesFromRow( $appctx, $row ) ) $ok = false ;
		return $ok ;
	}		

	// Marque l'objet comme etant a detruire au prochain save
	public function remove()
	{
		$this->remove() ;
	}		

	public function save()
	{
		$ok = true ;
		if( !$this->action->save() ) $ok = false ;
		if( !parent::save() ) $ok = false ;
		if( $this->action->state != "loaded" ) $this->state = $this->action->state ;
		return $ok ;
	}

	// Renvoie les valeurs de la partie specifique du noeud et du node associ� comme s'il s'agissait d'un meme objet specifique
	public function sendAnswerValues( $appctx )
	{
		$this->copyAttributesToValues() ;		
		$answer = $this->createStringHeadToSend() ;
		$answer .= $this->createStringValuesToSend() ;
		$this->action->copyAttributesToValues() ;		
		$answer .= $this->action->createStringValuesToSend() ;
		$appctx->sendAnswer( $answer ) ;
	}		

	// Genere la vue sur l'action
	function createView( $appctx, $parentview, $arguments )
	{
		return new vwCmsAction( $appctx, $this, $parentview ) ;
	}				
}
?>