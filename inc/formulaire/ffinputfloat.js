/*********************************************************
* Classe FfInputFloat gere un champ de vue associe a un
* element INPUT pour des nombre reel du DOM
*********************************************************/

function FfInputFloat( name, size, disable, sepdecimal, nbdecimal, sepmille )
	{
	herite( FfInputFloat, FormField ) ;
	this.initFfInputFloat( name, size, disable, sepdecimal, nbdecimal, sepmille )
	}

FfInputFloat.prototype =
	{
	initFfInputFloat: function( name, size, disable, sepdecimal, nbdecimal, sepmille )
		{
		this.initFormField( name ) ;
		this.size = size ;
		this.sepdecimal = "," ;
		this.nbdecimal = 2 ;
		this.sepmille = " " ;
		if( sepdecimal ) this.sepdecimal = sepdecimal ;
		if( nbdecimal ) this.nbdecimal = nbdecimal ;
		if( sepmille ) this.sepmille = sepmille ;
		this.disable = disable ;
		if( disable ) this.focusable = false ;
		else this.focusable = false ;
		this.createDomObject() ;
		this.hasfocus = false ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "INPUT" ) ;
		this.setupDomObject() ;
		if( this.disable ) this.element.className = "inputnumericdisable" ;
		else this.element.className = "inputnumeric" ;
		this.element.style.width = this.size*10 ;
		},
	// Detruit le formulaire et tous les champs associés
	value2String: function( value )
		{
		if( value && value != "null" && value != "" )
			{
			var r_int = new RegExp( "^[+-]?[0-9]+", "g" ) ;
			var v_int = r_int.exec( value )[0] ;
			var t = "" ;
			var cc = 0 ;
			if( this.sepmille )
				{
				for( var i = v_int.length-1 ; i>=0 ; i-- )
					{
					if( cc == 3 ) 
						{
						cc = 0 ;
						if( v_int.charAt( i ) != "-" ) t = this.sepmille + t ;
						}
					t = v_int.charAt( i ) + t ;
					cc++ ;
					}
				}
			else t = v_int ;
		
			var r_dec = new RegExp( "[.][0-9]+$", "g" ) ;
			var v_dec = r_dec.exec( value ) ;
			var h_dec = "" ;
			var nbd = 0 ;
			if( v_dec )	
				{
				h_dec = v_dec[0].substr( 1, this.nbdecimal ) ;
				nbd = h_dec.length ;
				}
			for( var i=0 ; i<this.nbdecimal-nbd ; i++ ) h_dec = h_dec + "0" ;
		
			return t + this.sepdecimal + h_dec ;
			}
		return "" ;
		},
	setElementValue: function( value )
		{
		if( !value || value == "null" ) value = "" ;
		this.fvalue = value ;
	 	if( this.element ) 
			{
			if( this.hasfocus )
				{
				this.element.value = this.fvalue ;
				this.element.select() ;
				}
			else this.element.value = this.value2String( value ) ;
			}
		},
	getElementValue: function()
		{
		if( this.element ) 
			{
			var value = this.element.value ;
			var number = parseFloat( value ) ;
			if( isNaN( number ) ) return null ;
			return number ;
			}
		return "" ;
		},
	setSize: function( size )
		{
		this.size = size ;
		if( this.element ) this.element.style.width = size*10 ;
		},
	// Recoie du focus
	onFocus: function()
		{
		if( this.disable ) 
			{
			this.element.blur() ;
			return ;
			}
		this.hasfocus = true ;
	 	if( this.element )
			{
			this.element.value = this.fvalue ;
			this.element.select() ;
			}
		if( cfield && cfield != this ) cfield.hideList() ;
		cfield = this ;
		this.formulaire.onFocus( this ) ;
		},
	// Perte du focus
	onBlur: function()
		{
		this.hasfocus = false ;
		this.onValueChanged() ;
		this.setElementValue( this.fvalue ) ;
		}		
	} ;

