/*********************************************************
* Classe SqlSelect cursor SQL
*********************************************************/

function SqlSelect( sql, firstnrow, lastnrow, object, methode, valuetofind )
	{
	//herite( TnArticles, TreeNode ) ;
	this.initSqlSelect( sql, firstnrow, lastnrow, object, methode, valuetofind ) ;
	}

SqlSelect.prototype =
	{
	initSqlSelect: function( sql, firstnrow, lastnrow, object, methode, valuetofind )
		{
		this.sql = sql ;
		this.methode = methode ;
		this.object = object ;
		this.valuetofind = valuetofind ;
		
		if( firstnrow ) 
			{
			this.firstnrow = firstnrow ;
			this.nrow = firstnrow ;
			}
		else
			{
			this.firstnrow = 0 ;
			this.nrow = 0 ;
			}
		if( lastnrow && lastnrow != -1 ) this.lastnrow = lastnrow ;
		else this.lastnrow = 999999 ;
		this.step = 100 ;
		this.timeout = 10 ;
		
		this.loadData() ;
		},
	loadData: function()
		{
		var request = "sqlselect.php5?sql=" + this.sql ;
		request += "&firstnrow=" + this.nrow ;
		if( this.lastnrow < this.nrow + this.step ) request += "&lastnrow=" + this.lastnrow ;
		else request += "&lastnrow=" + parseInt(this.nrow) + parseInt(this.step) ;
		if( this.valuetofind ) request += "&valuetofind=" + this.valuetofind ;
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
			
			var redo = false ;
			if( parseInt( this.rows[this.rows.length-2][0] ) ) redo = true ;
			
			this.rows.pop() ;
			this.rows.pop() ;
			
			if( this.object ) this.methode.call( this.object, this ) ;

			// Lance le chargement de la suite.
			if( redo && this.nrow < this.lastnrow )
				{
				this.nrow += this.step ;
				if( this.nrow > this.lastnrow ) this.nrow = this.lastnrow ;
				ayawf.ontimer.add( new MethodeCaller( this, this.loadData ) ) ;
				}
			}
		else alert( "Error: " + this.rows[0] ) ;
		}
	} ;
