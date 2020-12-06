<?php
//////////////////////////////////////////////////////////
// cmsimagenode.php
//
// Définition d'un noeud image du CMS
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "app/cms/cmsnode.php" ) ;
require_once( "app/cms/cmsextendnode.php" ) ;

class CmsImageNode extends CmsExtendNode
	{
	function __construct( $appctx, $fnode=null )
		{
 		parent::__construct( $appctx, "cms_imagenode", $fnode ) ;
		}
	// Charge les CmsImageNode dont les id sont dans la liste $incondition
	public function loadNodes( $appctx, $incondition )
		{
		$sql = "select * from cms_imagenode where ( id ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
		}
	}
	
class inCmsImageNode extends inCmsExtendNode
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{		
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		if( !$key )
			{
			$this->width = 100 ;
			$this->height = 100 ;
			$this->imgwidth = 100 ;
			$this->imgheight = 100 ;
			}
		}
		
	// Genere la vue sur le noeud
	function createView( $appctx, $parentview, $arguments )
		{
		return new vwCmsImageNode( $appctx, $this, $parentview ) ;
		}		
	}
	
// Vue sur le noeud image	
class vwCmsImageNode extends vwCmsNode
	{
	function __construct( $appctx, $innode, $parent )
		{
		parent::__construct( $appctx, $innode, $parent ) ;
		}
	// Genere une vue associee en JS
	function pushJsView( $appctx )
		{
		$appctx->sendJs( "cms.pushNodeView( new CmsImageNode(), \"CmsImageNode\", \"$this->id\", \"$this->idx\" ) ;" ) ;
		}
	// Genere la balise d'entete
	function createDomHead( $appctx )
		{
		$style = "cmsimage" ;
		if( $this->style ) $style = $this->style ;
		$appctx->PushIndent() ;
		$appctx->sendHtml( "<img id=\"$this->idx\" class=\"$style\" src=\"$this->filename\" width=\"$this->width\" height=\"$this->height\" >") ;
		}
		
	}
	
?>