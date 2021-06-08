<?php
	require_once( "baseinclude.php") ;
	
	//session_start() ;
	if( array_key_exists( "config", $_GET ) )	$config = $_GET["config"] ;
	if( array_key_exists( "config", $_POST ) ) $config = $_POST["config"] ;

	$appctx = new AppContexte( "home", "Ayawf" ) ;
	$_POST["appctx"] = $appctx ;
	$cfg = $appctx->loadCfgFile( "app/start/cfg_$config.txt" ) ;
	$appctx->db = new MySqlConnect( $cfg["dbname"], $cfg["dbsrv"], $cfg["dbusr"], $cfg["dbpasswd"] ) ;
	$appctx->db->connect() ;

	$filename = $_POST["filename"] ;
	$width = $_POST["width"] ;
	$idx = $_POST["idx"] ;
	$tmp_path = $_FILES["fichier"]["tmp_name"] ;
	$selectedfilename = $_FILES["fichier"]["name"] ;

	echo( "<br>filename: $filename") ;
	echo( "<br>selected filename: $selectedfilename") ;
	echo( "<br>width: $width") ;
	echo( "<br>idx: $idx") ;
	echo( "<br>tmp_path: $tmp_path") ;

	//$appctx =	$_SESSION["appctx"] ;

	if( $appctx )
		{
		$appctx->setCurrentWindow() ;

		if( is_uploaded_file($_FILES["fichier"]["tmp_name"]) )
			{
			if( move_uploaded_file($_FILES['fichier']['tmp_name'], $filename ) )
				{
				// Retaille l'image a la taille voulue à la largeur voulue tout en gardant
				// le ratio hauteur/largeur
				list($imgwidth, $imgheight) = getimagesize( $filename ) ;
				$ratio = $imgheight/$imgwidth ;
				$height = round( $ratio * $width, 0 ) ;
				echo( "<br>height: $height") ;
				$copie = ImageCreateTrueColor( $width, $height ) ;
				$source = ImageCreateFromJpeg( $filename );
				ImageCopyResampled( $copie, $source, 0, 0, 0, 0, $width, $height, $imgwidth, $imgheight ) ;
				ImageJpeg( $copie, $filename ) ;
				$appctx->sendJs( "window.parent.cuploadbox.onUpLoadSucces( \"$selectedfilename\", $height );" ) ;
    		}
			else
				{
				$appctx->sendJs( "window.parent.cuploadbox.onUpLoadFail( \"$selectedfilename\" );" ) ;
				}
    	}
		else $appctx->sendJs( "window.parent.cuploadbox.onUpLoadSucces( \"$selectedfilename\" );" ) ;


		$appctx->sendInstructionsForJs() ;
		}
?>