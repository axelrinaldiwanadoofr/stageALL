<?php
//////////////////////////////////////////////////////////
// cmssequenceaction.php
//
// Définition d'une action de gestion d'execution d'actions
// filles en sequence
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "app/cms/cmsextendaction.php" ) ;

class CmsSequenceAction extends CmsExtendAction
	{	
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "cms_sequenceaction" ) ;
		}
	// Charge les actions dont les id sont dans la liste $incondition
	public function loadActions( $appctx, $incondition )
		{
		$sql = "select * from cms_sequenceaction where ( id ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
		}
	}
class inCmsSequenceAction extends inCmsExtendAction
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{		
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		}
	}
?>