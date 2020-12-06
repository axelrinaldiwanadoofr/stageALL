<?php
//////////////////////////////////////////////////////////
// atelier.php
//
// Gestion des elements de l'atelier Yawf
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////


class Atelier
	{
	var $cfg ;		// Tableau des parametres

	function __construct( $cfg )
		{
		$this->cfg = $cfg ;
		}
	// Formulaire pour upload de fichier
	function showUploadForm( &$appctx )
		{
		$appctx->Indent() ; echo( "<div class=\"uploadform\" id=\"uploadform\">\n" ) ;
		$appctx->Indent() ; echo( "<form method=\"post\" action=\"nodepropertysetandupload.php5\" enctype=\"multipart/form-data\" target=\"compute\">\n" ) ;
  	$appctx->Indent() ; echo( "<input type=\"file\" name=\"node_property_value\" id=\"uploadform_property_value\" /><br />\n" ) ;
		$appctx->Indent() ; echo( "<input type=\"hidden\" name=\"MAX_FILE_SIZE\" value=\"3048576\" />\n" ) ;
		$appctx->Indent() ; echo( "<input type=\"hidden\" id=\"uploadform_nodeid\" name=\"node_id\" value=\"\" />\n" ) ;
		$appctx->Indent() ; echo( "<input type=\"hidden\" id=\"uploadform_property\" name=\"node_property\" value=\"\" />\n" ) ;
  	$appctx->Indent() ; echo( "<input type=\"submit\" name=\"submit\" value=\"Envoyer\" />\n" ) ;
		$appctx->Indent() ; echo( "</form>\n" ) ;
		$appctx->Indent() ; echo( "</div>\n" ) ;
		}
	// Formulaire pour l'edition de texte
	function showTextEditForm( &$appctx )
		{
		$appctx->Indent() ; echo( "<div class=\"texteditform\" id=\"texteditform\">\n" ) ;
		$appctx->Indent() ; echo( "<button onclick=\"onSetBold() ;\"><b>B</b></button>\n" ) ;
		$appctx->Indent() ; echo( "<button onclick=\"onSetColor( this );\" style=\"color:#ff0000\">A</button>\n" ) ;
		$appctx->Indent() ; echo( "<button onclick=\"onSetColor( this );\" style=\"color:#00ff00\">A</button>\n" ) ;
		$appctx->Indent() ; echo( "<button onclick=\"onSetColor( this );\" style=\"color:#0000ff\">A</button>\n" ) ;
		$appctx->Indent() ; echo( "<button onclick=\"onSetColor( this );\" style=\"color:#ffff00\">A</button>\n" ) ;
		$appctx->Indent() ; echo( "<button onclick=\"onSetColor( this );\" style=\"color:#ff00ff\">A</button>\n" ) ;
		$appctx->Indent() ; echo( "<button onclick=\"onSetColor( this );\" style=\"color:#00ffff\">A</button>\n" ) ;
		$appctx->Indent() ; echo( "<button onclick=\"onSetColor( this );\" style=\"color:#ffffff\">A</button>\n" ) ;
		$appctx->Indent() ; echo( "<button onclick=\"onSetColor( this );\" style=\"color:#000000\">A</button>\n" ) ;
		$appctx->Indent() ; echo( "<label>Taille:</label>\n" ) ;
		$appctx->Indent() ; echo( "<select onchange=\"onSetFontSize( this.value );\">\n" ) ;
		$appctx->Indent() ; echo( "<option value=1>1</option>\n" ) ;
		$appctx->Indent() ; echo( "<option value=2>2</option>\n" ) ;
		$appctx->Indent() ; echo( "<option value=3>3</option>\n" ) ;
		$appctx->Indent() ; echo( "<option value=4>4</option>\n" ) ;
		$appctx->Indent() ; echo( "<option value=5>5</option>\n" ) ;
		$appctx->Indent() ; echo( "<option value=6>6</option>\n" ) ;
		$appctx->Indent() ; echo( "<option value=7>7</option>\n" ) ;
		$appctx->Indent() ; echo( "<option value=8>8</option>\n" ) ;
		$appctx->Indent() ; echo( "<option value=9>9</option>\n" ) ;
		$appctx->Indent() ; echo( "<option value=10>10</option>\n" ) ;
		$appctx->Indent() ; echo( "<option value=11>11</option>\n" ) ;
		$appctx->Indent() ; echo( "<option value=12>12</option>\n" ) ;
		$appctx->Indent() ; echo( "<option value=13>13</option>\n" ) ;
		$appctx->Indent() ; echo( "<option value=14>14</option>\n" ) ;
		$appctx->Indent() ; echo( "<option value=15>15</option>\n" ) ;
		$appctx->Indent() ; echo( "</select>\n" ) ;
		$appctx->Indent() ; echo( "<button onclick=\"onClearStyle() ;\">Clear style</button>\n" ) ;
		$appctx->Indent() ; echo( "<button onclick=\"onClear() ;\">Clear all</button>\n" ) ;
		$appctx->Indent() ; echo( "<button onclick=\"onSaveText();\">Valider</button>\n" ) ;
		$appctx->Indent() ; echo( "</div>\n" ) ;
		}
	// Formulaire pour la creation d'une nouvelle page
	function showNewPageForm( &$appctx )
		{
		$appctx->Indent() ; echo( "<div class=\"newpageform\" id=\"newpageform\">\n" ) ;
		$appctx->Indent() ; echo( "<form method=\"post\" action=\"newpage.php5\" enctype=\"multipart/form-data\" target=\"compute\">\n" ) ;
		$appctx->Indent() ; echo( "<label>Saisissez le nom de la nouvelle page:</label>\n" ) ;
		$appctx->Indent() ; echo( "<input type=\"hidden\" id=\"srcpageversion\" name=\"srcpageversion\" value=\"\" /><br>\n" ) ;
		$appctx->Indent() ; echo( "<input type=\"text\" id=\"page\" name=\"page\" value=\"\" /><br>\n" ) ;
		$appctx->Indent() ; echo( "<label>Saisissez le nom la premiere version:</label>\n" ) ;
		$appctx->Indent() ; echo( "<input type=\"text\" id=\"version\" name=\"version\" value=\"\" /><br>\n" ) ;
  	$appctx->Indent() ; echo( "<input type=\"submit\" name=\"submit\" value=\"Valider\" />\n" ) ;
		$appctx->Indent() ; echo( "</form>\n" ) ;
		$appctx->Indent() ; echo( "</div>\n" ) ;
		}
	// Formulaire pour la creation d'un nouveau module
	function showNewModuleForm( &$appctx )
		{
		$appctx->Indent() ; echo( "<div class=\"newmoduleform\" id=\"newmoduleform\">\n" ) ;
		$appctx->Indent() ; echo( "<form method=\"post\" action=\"newmodule.php5\" enctype=\"multipart/form-data\" target=\"compute\">\n" ) ;
		$appctx->Indent() ; echo( "<input type=\"hidden\" id=\"srcmoduleversion\" name=\"srcmoduleversion\" value=\"\" /><br>\n" ) ;
		$appctx->Indent() ; echo( "<label>Saisissez le nom du nouveau module:</label>\n" ) ;
		$appctx->Indent() ; echo( "<input type=\"text\" id=\"page\" name=\"page\" value=\"\" /><br>\n" ) ;
		$appctx->Indent() ; echo( "<label>Saisissez le nom la premiere version:</label>\n" ) ;
		$appctx->Indent() ; echo( "<input type=\"text\" id=\"version\" name=\"version\" value=\"\" /><br>\n" ) ;
  	$appctx->Indent() ; echo( "<input type=\"submit\" name=\"submit\" value=\"Valider\" />\n" ) ;
		$appctx->Indent() ; echo( "</form>\n" ) ;
		$appctx->Indent() ; echo( "</div>\n" ) ;
		}
	// Formulaire pour la creation d'une nouvelle propriete
	function showNewVariableForm( &$appctx )
		{
		$appctx->Indent() ; echo( "<div class=\"newvariableform\" id=\"newvariableform\">\n" ) ;
		$appctx->Indent() ; echo( "<form method=\"post\" action=\"nodevariablenew.php5\" enctype=\"multipart/form-data\" target=\"compute\">\n" ) ;
		$appctx->Indent() ; echo( "<input type=\"hidden\" id=\"newvariableformnodeid\" name=\"id\" value=\"\" /><br>\n" ) ;
		$appctx->Indent() ; echo( "<label>Saisissez le nom de la nouvelle propriete:</label>\n" ) ;
		$appctx->Indent() ; echo( "<input type=\"text\" id=\"variable\" name=\"variable\" value=\"\" /><br>\n" ) ;
  	$appctx->Indent() ; echo( "<input type=\"submit\" name=\"submit\" value=\"Valider\" />\n" ) ;
		$appctx->Indent() ; echo( "</form>\n" ) ;
		$appctx->Indent() ; echo( "</div>\n" ) ;
		}
	// Cree les elements pour l'atelier web
	function showWebFactory( &$appctx )
		{
		$appctx->Indent() ; echo( "<div id=\"webfactory\">\n" ) ;
		$appctx->Indent() ; echo( "</div>\n" ) ;
		}
	// Construit le treeview pour l'ensemble des modeles
	function buildTreeView( &$appctx, $jsvariable, $contenerid, $framenum0=-1, $framenum1=-1 )
		{
		$appctx->Indent() ; echo( "<script>\n" ) ;

		$appctx->Indent() ; echo( "var treeview = new TreeView( \"$contenerid\", $framenum0, $framenum1 ) ;\n" ) ;
		$appctx->Indent() ; echo( "var $jsvariable = treeview ;\n" ) ;

		// Cree le tree node racine d'administration
		$appctx->Indent() ; echo( "treeview.addChildNode( treeview.createTexteNode( \"Admin\", \"$appctx->rep_inc/image/t_head.bmp\", 1, null, null, cmenu ) ) ;\n" ) ;

		// Cree un menu contextuel
		$appctx->Indent() ; echo( "cmenu = new Menu() ;\n" ) ;
		$appctx->Indent() ; echo( "cmenu.addItem( new MenuItem( \"Creer une page\", newPage ) ) ;\n" ) ;
		$appctx->Indent() ; echo( "cmenu.addItem( new MenuItem( \"Creer un module\", newModule ) ) ;\n" ) ;
		$appctx->Indent() ; echo( "cmenu.addItem( new MenuItem( \"Exporter\", exportUrl ) ) ;\n" ) ;

		// Cree le tree node racine pour le site courant
		$url = $this->cfg["url"] ;
		$appctx->Indent() ; echo( "treeview.addChildNode( treeview.createTexteNode( \"$url\", \"$appctx->rep_inc/image/t_http.bmp\", 1, new ToolType( \"page\", \"$url\" ), null, cmenu ) ) ;\n" ) ;

		$this->populateTreeViewPage( $appctx, $url ) ;
		$appctx->Indent() ; echo( "treeview.moveParent() ;\n" ) ;

		// Cree le tree node racine pour la boite a outils
		$appctx->Indent() ; echo( "treeview.addChildNode( treeview.createTexteNode( \"Tools box\", \"$appctx->rep_inc/image/t_toolbox.bmp\", 1, null, null, null ) ) ;\n" ) ;

		// Cree le tree node racine pour les type de noeuds simples
		$this->populateTreeViewNodeType( $appctx, $url ) ;

		// Cree le tree node racine pour les type d'action simples
		$this->populateTreeViewActionType( $appctx, $url ) ;

		// Cree le tree node racine pour les modules references dans la tool box
		$this->populateTreeViewToolBoxModule( $appctx, $url ) ;

		$appctx->Indent() ; echo( "treeview.moveParent() ;\n" ) ;
		$appctx->Indent() ; echo( "</script>\n" ) ;
		}

	// Charge tous modeles et creer les tree node associes
	function populateTreeViewPage( &$appctx, $url )
		{
		$cursor = $appctx->db->BuildCursor( "select distinct page, type from page where url=\"$url\"" ) ;

		while( $fields = $cursor->FetchRow() )
			{
			$page = $fields[0] ;
			$type = $fields[1] ;

			// Cree un menu contextuel
			$appctx->Indent() ; echo( "cmenu = new Menu() ;\n" ) ;
			$appctx->Indent() ; echo( "cmenu.addItem( new MenuItem( \"Coller\" ) ) ;\n" ) ;
			$appctx->Indent() ; echo( "cmenu.addItem( new MenuItem( \"Supprimer\" ) ) ;\n" ) ;

			$appctx->Indent() ;
			if( $type == "MODULE")
				echo( "treeview.addChildNode( treeview.createTexteNode( \"$page\", \"$appctx->rep_inc/image/t_module.bmp\", 0, null, null, cmenu ) ) ;\n" ) ;
			else
				echo( "treeview.addChildNode( treeview.createTexteNode( \"$page\", \"$appctx->rep_inc/image/t_head.bmp\", 0, null, null, cmenu ) ) ;\n" ) ;

			$this->populateTreeViewVersion( $appctx, $url, $page ) ;
			$appctx->Indent() ; echo( "treeview.moveParent() ;\n" ) ;
			}
		$cursor->Close() ;
		}
	// Charge le detail d'un modele et creer les tree node associes
	function populateTreeViewVersion( &$appctx, $url, $page )
		{
		$cursor = $appctx->db->BuildCursor( "select version, actif from page where url=\"$url\" and page=\"$page\" order by version" ) ;

		while( $fields = $cursor->FetchRow() )
			{
			$version = $fields[0] ;
			if( $fields[1] ) $actif = "publié" ;
			else $actif = "non publié" ;

			// Cree un menu contextuel
			$appctx->Indent() ; echo( "cmenu = new Menu() ;\n" ) ;
			$appctx->Indent() ; echo( "cmenu.addItem( new MenuItem( \"Afficher\", loadPageForAdmin, null, \"$page@$version\" ) ) ;\n" ) ;
			$appctx->Indent() ; echo( "cmenu.addItem( new MenuItem( \"Publier\", setVersionActif, null, \"$page@$version\" ) ) ;\n" ) ;
			$appctx->Indent() ; echo( "cmenu.addItem( new MenuItem( \"Copie\", newModule, null, \"$page@$version\" ) ) ;\n" ) ;
			$appctx->Indent() ; echo( "cmenu.addItem( new MenuItem( \"Supprimer\", deleteVersion,  null, \"$page@$version\" ) ) ;\n" ) ;
			$appctx->Indent() ; echo( "cmenu.addItem( new MenuItem( \"Exporter\", exportVersion,  null, \"$page@$version\" ) ) ;\n" ) ;

			$appctx->Indent() ; echo( "treeview.addChildNode( treeview.createTexteNode( \"$version: $actif\", \"$appctx->rep_inc/image/t_version.bmp\", 0, new ToolType( \"page\", \"$url\" ), null, cmenu ) ) ;\n" ) ;
			$appctx->Indent() ; echo( "treeview.moveParent() ;\n" ) ;
			}
		$cursor->Close() ;
		}
	// Charge tous types de noeud pour la toolbox
	function populateTreeViewNodeType( &$appctx )
		{
		// Cree le tree node racine pour les type de noeuds simples
		$appctx->Indent() ; echo( "treeview.addChildNode( treeview.createTexteNode( \"Noeuds\", \"$appctx->rep_inc/image/t_child.bmp\", 1, null, null, null ) ) ;\n" ) ;

		$cursor = $appctx->db->BuildCursor( "select type, libelle, twimage from nodetype" ) ;

		while( $fields = $cursor->FetchRow() )
			{
			$modele = $fields[0] ;

			// Cree un menu contextuel
			$appctx->Indent() ; echo( "cmenu = new Menu() ;\n" ) ;
			$appctx->Indent() ; echo( "cmenu.addItem( new MenuItem( \"Coller\" ) ) ;\n" ) ;
			$appctx->Indent() ; echo( "cmenu.addItem( new MenuItem( \"Supprimer\" ) ) ;\n" ) ;

			$appctx->Indent() ; echo( "treeview.addChildNode( treeview.createTexteNode( \"$fields[0]: $fields[1]\", \"$appctx->rep_inc/image/$fields[2]\", 0, new ToolType( \"node\", \"$fields[0]\" ), null, cmenu ) ) ;\n" ) ;
			$appctx->Indent() ; echo( "treeview.moveParent() ;\n" ) ;
			}
		$cursor->Close() ;

		$appctx->Indent() ; echo( "treeview.moveParent() ;\n" ) ;
		}

	// Charge tous types d'action pour la toolbox
	function populateTreeViewActionType( &$appctx )
		{
		// Cree le tree node racine pour les type de noeuds simples
		$appctx->Indent() ; echo( "treeview.addChildNode( treeview.createTexteNode( \"Actions\", \"$appctx->rep_inc/image/t_action.bmp\", 1, null, null, null ) ) ;\n" ) ;

		$cursor = $appctx->db->BuildCursor( "select type, libelle, twimage from actiontype" ) ;

		while( $fields = $cursor->FetchRow() )
			{
			$modele = $fields[0] ;

			// Cree un menu contextuel
			$appctx->Indent() ; echo( "cmenu = new Menu() ;\n" ) ;
			$appctx->Indent() ; echo( "cmenu.addItem( new MenuItem( \"Coller\" ) ) ;\n" ) ;
			$appctx->Indent() ; echo( "cmenu.addItem( new MenuItem( \"Supprimer\" ) ) ;\n" ) ;

			$appctx->Indent() ; echo( "treeview.addChildNode( treeview.createTexteNode( \"$fields[0]: $fields[1]\", \"$appctx->rep_inc/image/$fields[2]\", 0, new ToolType( \"action\", \"$fields[0]\" ), null, cmenu ) ) ;\n" ) ;
			$appctx->Indent() ; echo( "treeview.moveParent() ;\n" ) ;
			}
		$cursor->Close() ;

		$appctx->Indent() ; echo( "treeview.moveParent() ;\n" ) ;
		}
	// Charge tous les modules references dans la toolbox
	function populateTreeViewToolBoxModule( &$appctx )
		{
		// Cree le tree node racine pour les type de noeuds simples
		$appctx->Indent() ; echo( "treeview.addChildNode( treeview.createTexteNode( \"Modules\", \"$appctx->rep_inc/image/t_module.bmp\", 1, null, null, null ) ) ;\n" ) ;


		$appctx->Indent() ; echo( "treeview.moveParent() ;\n" ) ;
		}

	// Export les donnees d'une table
	function exportDbTable( &$appctx, $table, $url, $pageversion )
		{
		if( $pageversion == "" ) $cursor = $appctx->db->BuildCursor( "select * from $table where url=\"$url\"" ) ;
		else $cursor = $appctx->db->BuildCursor( "select * from $table where url=\"$url\" and modele=\"$pageversion\"" ) ;

		while( $fields = $cursor->FetchRow() )
			{
			echo( "insert into $table( " ) ;
			$first = true ;
			foreach( $fields as $field=>$value )
				{
				$fieldname = $cursor->FieldName($field) ;
				if( $first ) echo( $fieldname ) ;
				else echo( ",$fieldname" ) ;
				$first = false ;
				}
			echo( ") values(" ) ;
			$first = true ;
			foreach( $fields as $field=>$value )
				{
				if( $first ) echo( "\"$value\"" ) ;
				else echo( ",\"$value\"" ) ;
				$first = false ;
				}
			echo( ");<br>\n" ) ;
			}
		$cursor->Close() ;
		}
	// Supprime les donnees d'une version dans la table $table
	function deleteVersionFromDbTable( &$appctx, $table, $url, $pageversion )
		{
		if( $table == "page" )
			{
			$t = explode( "@", $pageversion ) ;
			$appctx->db->Execute( "delete from $table where url=\"$url\" and page=\"$t[0]\" and version=\"$t[1]\"" ) ;
			}
		else $appctx->db->Execute( "delete from $table where url=\"$url\" and modele=\"$pageversion\"" ) ;
		}
	// Rend active une version
	function setActiveVersionDbTable( &$appctx, $url, $pageversion )
		{
		$t = explode( "@", $pageversion ) ;
		$appctx->db->Execute( "update page set actif=0 where url=\"$url\" and page=\"$t[0]\"" ) ;
		$appctx->db->Execute( "update page set actif=1 where url=\"$url\" and page=\"$t[0]\" and version=\"$t[1]\"" ) ;
		}
	// Duplique les donnee d'une table pour une nouvelle version
	function copyVersionInDbTable( &$appctx, $table, $url, $pageversion, $page, $version )
		{
		$src = explode( "@", $pageversion ) ;

		if( $table == "page" ) $cursor = $appctx->db->BuildCursor( "select * from $table where url=\"$url\" and page=\"$src[0]\" and version=\"$src[1]\"" ) ;
		else $cursor = $appctx->db->BuildCursor( "select * from $table where url=\"$url\" and modele=\"$pageversion\"" ) ;

		while( $fields = $cursor->FetchRow() )
			{
			$sql = "insert into $table( " ;
			$first = true ;
			foreach( $fields as $field=>$value )
				{
				$fieldname = $cursor->FieldName($field) ;
				if( $first ) $sql = $sql . $fieldname ;
				else $sql = $sql . ",$fieldname" ;
				$first = false ;
				}
			$sql = $sql . ") values(" ;
			$first = true ;
			foreach( $fields as $field=>$value )
				{
				if( $cursor->FieldName($field) == "modele" ) $value = $page . "@" . $version ;
				else if( $cursor->FieldName($field) == "page" ) $value = $page ;
				else if( $cursor->FieldName($field) == "version" ) $value = $version ;
				else if( $cursor->FieldName($field) == "id" )	$value = str_replace( $pageversion, $page . "@" . $version, $value ) ;
				else if( $cursor->FieldName($field) == "parent" )	$value = str_replace( $pageversion, $page . "@" . $version, $value ) ;
				else if( $cursor->FieldName($field) == "idnode" )	$value = str_replace( $pageversion, $page . "@" . $version, $value ) ;
				else if( $cursor->FieldName($field) == "idaction" )	$value = str_replace( $pageversion, $page . "@" . $version, $value ) ;
				else if( $cursor->FieldName($field) == "idchildaction" )	$value = str_replace( $pageversion, $page . "@" . $version, $value ) ;

				if( $first ) $sql = $sql . "\"$value\"" ;
				else $sql = $sql . ",\"$value\"" ;
				$first = false ;
				}
			$sql = $sql . ")" ;
			//echo( "<p>$sql</p>") ;
			$appctx->db->Execute( $sql ) ;
			}
		$cursor->Close() ;
		}
	}

?>