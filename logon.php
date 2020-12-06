<?php
	require_once( "baseinclude.php") ;

	function ShowLogonForm( $appctx, $title, $config, $debug, $script, $error=false )
		{
		$appctx->loadIncJsScripts() ;

		$appctx->beginHtmlHead() ;
		$appctx->endHtmlHead() ;

		$appctx->beginHtmlBody() ;

		if( $script != "" )	$appctx->sendHtml( "<h2>$title pour l'execution du script: $script</h2>" ) ;
		else $appctx->sendHtml( "<h2>$title</h2>" ) ;
		
		if( $error )
			{
			$appctx->sendHtml( "<h4>Erreur de compte ou de mot de passé, veuillez resaisir un nom de compte et un mot de passe puis valider.</h4>") ;
			}
		else
			{
			$appctx->sendHtml( "<h4>Veuillez saisir un nom de compte et un mot de passe puis valider.</h4>") ;
			}
		$appctx->sendHtml( "<form method=\"POST\" action=\"logon.php\">") ;
		$appctx->sendHtml( "<table>") ;
		$appctx->sendHtml( "<tr><td><label>Compte:</label></td><td><input name=\"compte\" size=20 /></td></tr>") ;
		$appctx->sendHtml( "<tr><td><label>Mot de passe:</label></td><td><input type=\"password\" name=\"passwd\" size=20 /></td></tr>") ;
		$appctx->sendHtml( "<tr><td><input type=\"hidden\" name=\"config\" value=\"$config\" /></td></tr>") ;
		$appctx->sendHtml( "<tr><td><input type=\"hidden\" name=\"script\" value=\"$script\" /></td></tr>") ;
		$appctx->sendHtml( "<tr><td><input type=\"hidden\" name=\"debug\" value=\"$debug\" /></td><td><input type=\"submit\" value=\"Valider\" size=10 /></td></tr>") ;
		$appctx->sendHtml( "</table>") ;
		$appctx->sendHtml( "</form>") ;

		$appctx->sendInstructionsForJs() ;
		$appctx->endHtmlBody() ;
		}

//////////////////// Demarrage du script //////////////////////////////////////

	$appctx = new AppContexte( "home", "Ayawf" ) ;
	$appctx->setCurrentWindow( "appctx" ) ;

	$_GET["config"] = "alsaceparamoteur" ;
	if( !array_key_exists( "config", $_GET ) && !array_key_exists( "config", $_POST ) )
		{
		echo( "Vous devez spécifier une configuration avec l'argument config dans l'URL" ) ;
		}
	else
		{
		if( array_key_exists( "config", $_GET ) )	$config = $_GET["config"] ;
		if( array_key_exists( "config", $_POST ) ) $config = $_POST["config"] ;

		$debug = 0 ;
		if( array_key_exists( "debug", $_GET ) )	$debug = $_GET["debug"] ;
		if( array_key_exists( "debug", $_POST ) ) $debug = $_POST["debug"] ;

		$script = "" ;
		if( array_key_exists( "script", $_GET ) )	$script = $_GET["script"] ;
		if( array_key_exists( "script", $_POST ) ) $script = $_POST["script"] ;
		
		$cfg = $appctx->loadCfgFile( "app/start/cfg_$config.txt" ) ;

		if( array_key_exists( "compte", $_POST ) )
			{
			$compte = $_POST["compte"] ;
			$passwd = $_POST["passwd"] ;

			$appctx->db = new MySqlConnect( $cfg["dbname"], $cfg["dbsrv"], $cfg["dbusr"], $cfg["dbpasswd"] ) ;
			$appctx->db->connect() ;
			$_POST["appctx"] = $appctx ;

			$cursor = $appctx->db->buildCursor( "select * from users where compte='$compte' and passwd='$passwd'" ) ;
			$row = $cursor->fetchAssoc() ;
			if( $row && $row["config"] == $config )
				{
				session_start() ;

				$_SESSION = array() ;
				$_SESSION["appctx"] = $appctx ;

				$appctx->setUserId( $row["id"] ) ;

				echo( "<script>window.name = \"appctx\" ;</script>" ) ;
				echo( "<script>var config = \"$config\" ;</script>" ) ;

				$appctx->debug = $debug ;
				
				$appctx->beginHtmlHead() ;
				$appctx->loadIncJsScripts() ;
				$appctx->endHtmlHead() ;

				$appctx->beginHtmlBody() ;
				
				if( $script != "" )
					{
					// Execution d'un script
					require_once( "app/script/$script" ) ;
					}
				else
					{
					// Demarrage normal de l'application

					require_once( "appgestion.php" ) ;
					//require_once( $cfg["phpstart"] ) ;
				
					// Charge les fichiers presents l'attribut phpstart
					$t = explode( ",", $cfg["phpstart"] ) ;
					foreach( $t as $i=>$file )
						{
						require_once( $file ) ;
						}
					}
				
				$appctx->sendInstructionsForJs() ;

				$appctx->endHtmlBody() ;

				session_write_close() ;
				}
			else
				{
				ShowLogonForm( $appctx, $cfg["logontitle"], $config, $debug, $script, true );
				}
			}
		else
			{
			ShowLogonForm( $appctx, $cfg["logontitle"], $config, $debug, $script, false );
			}
		}
	?>