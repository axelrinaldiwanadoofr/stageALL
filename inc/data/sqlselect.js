/*********************************************************
* Classe SqlSelect cursor SQL
*********************************************************/

function SqlSelect( sql, nrow, rowcount, object, methode, fieldforfind, valuetofind )
	{
	//herite( TnArticles, TreeNode ) ;
	this.initSqlSelect( sql, nrow, rowcount, object, methode, fieldforfind, valuetofind ) ;
	}

SqlSelect.prototype =
	{
	initSqlSelect: function( sql, nrow, rowcount, object, methode, fieldforfind, valuetofind )
		{
		this.sql = sql ;
		this.methode = methode ;
		this.object = object ;
		
		if( fieldforfind && valuetofind )
			{
			valuetofind = valuetofind.replace( "'", "#cote#" ) ;
			var sqlfind = "where ucase(" + fieldforfind + ") like '" + valuetofind.toUpperCase() + "%' and " ;
			this.sql = this.sql.replace( "where", sqlfind ) ;
			}
		
		if( nrow ) this.nrow = nrow ;
		else this.nrow = 0 ;
		if( rowcount != -1 ) this.rowcount = rowcount ;
		else this.rowcount = 9999999 ;
		
		this.loadData() ;
		},
	loadData: function()
		{
		var request = "sqlselect.php5?sql=" + this.sql ;
		request += "&nrow=" + this.nrow ;
		request += "&rowcount=" + this.rowcount ;
		AjaxSendRequest( request, this, this.onReceveAnswer ) ;
		return false ;
		},
	// A reception de la reponse AJAX
	onReceveAnswer: function( answer )
		{
		this.answer = answer ;
		this.rows = answer.split( "<row>" ) ;
		
		if( this.rows[0] == "DataNoError" )
			{
			var i ;
			for( i=1 ; i<this.rows.length ; i++ ) this.rows[i-1] = this.rows[i].split( "<sep>" ) ;
			
			this.lastrow = true ;
			if( parseInt( this.rows[this.rows.length-2][0] ) ) this.lastrow = false ;
			this.nrow = parseInt( this.rows[this.rows.length-2][1] ) ;
			
			this.rows.pop() ;
			this.rows.pop() ;
			
			if( this.object ) this.methode.call( this.object, this ) ;
			}
		else alert( "Error: " + this.rows[0] ) ;
		}
	} ;
