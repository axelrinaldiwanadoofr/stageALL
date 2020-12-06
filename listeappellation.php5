<?php
require_once( "baseinclude.php5") ;

//session_start() ;
if( array_key_exists( "config", $_GET ) )	$config = $_GET["config"] ;
if( array_key_exists( "config", $_POST ) ) $config = $_POST["config"] ;

$appctx = new AppContexte( "home", "Ayawf" ) ;
$_POST["appctx"] = $appctx ;
$cfg = $appctx->loadCfgFile( "app/start/cfg_$config.txt" ) ;
$appctx->db = new MySqlConnect( $cfg["dbname"], $cfg["dbsrv"], $cfg["dbusr"], $cfg["dbpasswd"] ) ;
$appctx->db->connect() ;

if( array_key_exists( "jeton", $_POST ) )	$jeton = $_POST["jeton"] ;
else if( array_key_exists( "jeton", $_GET ) )	$jeton = $_GET["jeton"] ;

$window = "appctx" ;
if( array_key_exists( "window", $_POST ) )	$window = $_POST["window"] ;
else if( array_key_exists( "window", $_GET ) )	$window = $_GET["window"] ;


//if( array_key_exists( "appctx", $_SESSION ) )	$appctx = $_SESSION["appctx"] ;

if( $appctx )
	{
	$appctx->beginHtmlHead( "appvin.css" ) ;
	$appctx->endHtmlHead() ;

	$appctx->beginHtmlBody() ;
	
	$appctx->sendHtml( "<h1>Carte des vins de la Cave de l'Anneau</h1>" ) ;

	$r_region = $appctx->db->buildCursor( "select distinct value from ap_string where rubrique='Domaine' and name='Region' order by value" ) ;

	$afficheenteteprix = true ;
	$appctx->sendHtml( "<table>" ) ;
	while( $region = $r_region->fetchAssoc() )
		{
		$appctx->sendHtml( "<tr>" ) ;
		$appctx->sendHtml( "<td>" ) ;
		$appctx->sendHtml( "<h2>" . $region["value"] . "</h2>" ) ;
		$appctx->sendHtml( "</td>" ) ;
		if( $region["value"] && $afficheenteteprix )
			{
			$appctx->sendHtml( "<td>" ) ;
			$appctx->sendHtml( "<label class=\"prixentete\">Prix 75 cl en Euros<br>Coté-cour</label>" ) ;
			$appctx->sendHtml( "</td>" ) ;
			$appctx->sendHtml( "</tr>" ) ;
			$afficheenteteprix = false ;
			}
		
		$sql = "select distinct value from ap_string where rubrique='Domaine' and name='Appellation' " ;
		$sql .= "and reference in ( select reference from ap_string where rubrique='Domaine' and name='Region' " ;
		$sql .= " and value='" . $region["value"] . "' ) order by value" ;
		$r_appellation = $appctx->db->buildCursor( $sql ) ;

		while( $appellation = $r_appellation->fetchAssoc() )
			{
			$appctx->sendHtml( "<tr>" ) ;
			$appctx->sendHtml( "<td>" ) ;
			$appctx->sendHtml( "<h3>" . $appellation["value"] . "</h3>" ) ;
			$appctx->sendHtml( "</td>" ) ;
			$appctx->sendHtml( "</tr>" ) ;

			$sql = "select a.reference as reference,rlibelle from articles as a, ap_string as p where rubrique='Domaine' and name='Appellation' " ;
			$sql .= "and a.reference=p.reference and value='" . $appellation["value"] . "' order by a.reference" ;
			$r_article = $appctx->db->buildCursor( $sql ) ;

			while( $article = $r_article->fetchAssoc() )
				{
				$appctx->sendHtml( "<tr>" ) ;
				$appctx->sendHtml( "<td>" ) ;
				$appctx->sendHtml( "<h4>" . $article["rlibelle"] . "</h4>" ) ;
				$appctx->sendHtml( "</td>" ) ;
				$appctx->sendHtml( "</tr>" ) ;
				
				$sql = "select * from articles as a, ap_string as p where a.reference = p.reference " ;
				$sql .= "and p.rubrique='Prix' and p.name='Prix75' and a.reference in (select reference from ap_refarticle " ;
				$sql .= "where rubrique='Vin' and name='Domaine' and article='" . $article["reference"] . "') order by rlibelle" ; 
				$r_vin = $appctx->db->buildCursor( $sql ) ;
				while( $vin = $r_vin->fetchAssoc() )
					{
					$appctx->sendHtml( "<tr>" ) ;
					$appctx->sendHtml( "<td>" ) ;
					$appctx->sendHtml( "<h5><a href=\"unvin.php5?vin=" . $vin["reference"] . "&config=$config\">" . $vin["rlibelle"] . "</a></h5>" ) ;
					$appctx->sendHtml( "</td>" ) ;
					$appctx->sendHtml( "<td>" ) ;
					$appctx->sendHtml( "<p class=\"prix\">" . $vin["value"] . "</p>" ) ;
					$appctx->sendHtml( "</td>" ) ;
					$appctx->sendHtml( "</tr>" ) ;
					}
				}
			}
		}
	
	$appctx->sendHtml( "</table>" ) ;
	$appctx->endHtmlBody() ;
	}
else echo( "Pas de session, veuillez vous reconnecter." ) ;

?>