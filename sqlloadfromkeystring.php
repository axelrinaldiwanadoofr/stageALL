<?php
	require_once( "baseinclude.php5") ;

	session_start() ;

	if( array_key_exists( "select", $_POST ) )	$select = $_POST["select"] ;
	else if( array_key_exists( "select", $_GET ) )	$select = $_GET["select"] ;

	if( array_key_exists( "table", $_POST ) )	$table = $_POST["table"] ;
	else if( array_key_exists( "table", $_GET ) )	$table = $_GET["table"] ;

	if( array_key_exists( "pkstring", $_POST ) )	$pkstring = $_POST["pkstring"] ;
	else if( array_key_exists( "pkstring", $_GET ) )	$pkstring = $_GET["pkstring"] ;

	if( array_key_exists( "keystring", $_POST ) )	$keystring = $_POST["keystring"] ;
	else if( array_key_exists( "keystring", $_GET ) )	$keystring = $_GET["keystring"] ;

	$appctx =	$_SESSION["appctx"] ;

	if( $appctx )
		{
		$fields = explode( ",", $select ) ;
		$pk = new PrimaryKey( $pkstring ) ;
		$stc = new SqlTableContener( $appctx->db, $table, $pk ) ;
		$key = $pk->createKeyFromKeyString( $keystring ) ;
		$row = $stc->loadDataRow( $key ) ;

		if( $row )
			{
			$t = array() ;
			foreach( $fields as $i=>$field ) $t[] = $row[$field] ;
			$data = implode( "%%", $t ) ;
			$appctx->sendAnswer( $data ) ;
			}

		$appctx->sendAnswersForAjax() ;
		}
?>