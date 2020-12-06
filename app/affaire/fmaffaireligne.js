/*********************************************************
* Classe FmAffaireLigne: Formulaire des structures
*********************************************************/

function FmAffaireLigne( modele, m_affaire )
	{
	herite( FmAffaireLigne, Formulaire ) ;
	this.initFmAffaireLigne( modele, m_affaire ) ;
	}

FmAffaireLigne.prototype =
	{
	initFmAffaireLigne: function( modele, m_affaire )
		{
		this.m_affaire = m_affaire ;
		
		this.initFormulaire( "Formulaire de mise a jour d'une ligne d'affaire" ) ;
				
		this.addField( new FfLabel( "affaire" ) ) ;
		this.addField( new FfInput( "nligne", 5 ) ) ;

		this.addField( new FfSelectEdit( "article", 10, 20, "select reference, concat( reffabriquant, ' : ', rlibelle) from articles where 1 order by rlibelle", "rlibelle", 50 ) ) ;
		this.addField( new FfSelectEdit( "designation", 50, 20, "select distinct designation, designation from affairelignes where 1 order by designation", "designation" ) ) ;

		this.addField( new FfInput( "articlefabriquant", 5, true ) ) ;
		this.addField( new FfInput( "articlersfabriquant", 50, true ) ) ;
		this.addField( new FfInput( "articlereffabriquant", 20, true ) ) ;

		
		this.addField( new FfInputFloat( "qte", 5 ) ) ;
		this.addField( new FfSelect( "unite", 10, "select unite, libelle from unites where reference='PCE' order by unite" ) ) ;

		this.addField( new FfCheck( "achete" ) ) ;

		this.addField( new FfSelectEdit( "fournisseur", 5, 20, "select sid, rs from structures where 1 order by rs", "rs", 50 ) ) ;
		this.addField( new FfInput( "rsfournisseur", 50, true ) ) ;
		this.addField( new FfInput( "reffournisseur", 20 ) ) ;
		
		this.addField( new FfInputFloat( "puht_achat_article", 8, true ) ) ;
		this.addField( new FfInputFloat( "puht_achat_man", 8 ) ) ;
		this.addField( new FfInputFloat( "puht_achat", 8, true ) ) ;

		this.addField( new FfInputFloat( "pht_achat_calc", 8, true ) ) ;
		this.addField( new FfInputFloat( "pht_achat_man", 8 ) ) ;
		this.addField( new FfInputFloat( "pht_achat", 8, true ) ) ;


		this.addField( new FfCheck( "fabrique" ) ) ;
		
		this.addField( new FfNicEdit( "commentaire", 80, 20 ) ) ;

		
		this.addField( new FfSelect( "monaieref", 10, "select unite, libelle from unites where reference='EURO' order by libelle" ) ) ;


		
		//this.getFieldByName( "nature" ).addItem( "CLIENT", "Client" ) ;
		},
	// Rafraichie la vue
	onAttributesChanged: function()
		{
		},
	onReceveRLibelle: function( ss )
		{
		if( ss.rows.length ) this.modele.designation = ss.rows[0][0] ;
		else this.modele.designation = "" ;
		this.modele.save() ;
		},
	/*
	onReceveAdressePrincipale: function( ss )
		{
		if( ss.rows.length ) this.adresseprincipale = ss.rows[0][0] + ", tel: " + ss.rows[0][1] + ", mobile: " + ss.rows[0][2] + ", fax: " + ss.rows[0][3] + ", mail: " + ss.rows[0][4] ;
		else this.adresseprincipale = "" ;
		this.copyAttributeValuesToFields() ;
		},
	*/
	// Change de modele
	onModeleChanged: function()
		{
		// Affiche ou cache la zone article
		if( this.modele.article != "" )
			{
			this.la_article.show() ;
			this.getFieldByName( "fournisseur" ).requery( "select f.sid, concat( s.rs, ' puHT: ', f.puht_achat, ' remise: ', f.txremise ) from articlestructure as f, structures as s where s.sid=f.sid and f.reference='" + this.modele.article + "' order by rs" ) ;
			}
		else 
			{
			this.la_article.hide() ;
			this.getFieldByName( "fournisseur" ).requery( "select sid, rs from structures as s where 1 order by rs" ) ;
			}
		// Affiche ou cache la zone achete
		if( parseInt( this.modele.achete ) ) this.la_achete.show() ;
		else this.la_achete.hide() ;
		
		},
	// Appelée quand le modele est changé
	onLayout: function()
		{
		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Affaire:" ) ) ;
		ha.add( this.getFieldByName( "affaire" ) ) ;
		ha.add( new FfEtiquette( "Num. ligne:" ) ) ;
		ha.add( this.getFieldByName( "nligne" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Article:" ) ) ;
		ha.add( this.getFieldByName( "article" ) ) ;
		
		ha.add( new FfEtiquette( "Designation:" ) ) ;
		ha.add( this.getFieldByName( "designation" ) ) ;
		
		// Donnees de l'article
		this.la_article = this.layout.add( new VTabLayout( "cadrebleu" ) ) ;
		
		ha = this.la_article.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Fabriquant:" ) ) ;
		ha.add( this.getFieldByName( "articlefabriquant" ) ) ;
		ha.add( this.getFieldByName( "articlersfabriquant" ) ) ;

		ha = this.la_article.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Reference du fabriquant:" ) ) ;
		ha.add( this.getFieldByName( "articlereffabriquant" ) ) ;		

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Quantite" ) ) ;
		ha.add( this.getFieldByName( "qte" ) ) ;
		ha.add( this.getFieldByName( "unite" ) ) ;

		var ha = this.layout.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "Objet acheté" ) ) ;
		ha.add( this.getFieldByName( "achete" ) ) ;
		
		// Donnees d'achat
		this.la_achete = this.layout.add( new VTabLayout( "cadrebleu" ) ) ;
		
		ha = this.la_achete.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "<u>Fournisseur:</u>" ) ) ;
		ha.add( this.getFieldByName( "fournisseur" ) ) ;
		ha.add( this.getFieldByName( "rsfournisseur" ) ) ;
		ha.add( new FfEtiquette( "Ref. four.:" ) ) ;
		ha.add( this.getFieldByName( "reffournisseur" ) ) ;
		
		ha = this.la_achete.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "<u>Prix achat unitaire HT:</u>" ) ) ;
		ha.add( new FfEtiquette( "Article:" ) ) ;
		ha.add( this.getFieldByName( "puht_achat_article" ) ) ;
		ha.add( new FfEtiquette( "Manuel:" ) ) ;
		ha.add( this.getFieldByName( "puht_achat_man" ) ) ;
		ha.add( new FfEtiquette( "Final:" ) ) ;
		ha.add( this.getFieldByName( "puht_achat" ) ) ;

		ha = this.la_achete.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "<u>Prix achat total HT:</u> (Pu final * qte)" ) ) ;
		ha.add( new FfEtiquette( "Calculé:" ) ) ;
		ha.add( this.getFieldByName( "pht_achat_calc" ) ) ;
		ha.add( new FfEtiquette( "Manuel:" ) ) ;
		ha.add( this.getFieldByName( "pht_achat_man" ) ) ;
		ha.add( new FfEtiquette( "Ligne:" ) ) ;
		ha.add( this.getFieldByName( "pht_achat" ) ) ;

		
		
		var pbox = this.layout.add( new PageBoxLayout() ) ;

		// Page de la partie gestion
		page = this.layout.add( pbox.addPage( new PageLayout(), "Achat" ) ) ;

		
		
		// Page de commentaire
		var page = this.layout.add( pbox.addPage( new PageLayout(), "Commentaire" ) ) ;

		ha = page.add( new HTabLayout() ) ;

		page.add( this.getFieldByName( "commentaire" ) ) ;

		// Page de la partie gestion
		page = this.layout.add( pbox.addPage( new PageLayout(), "Gestion" ) ) ;

		/*
		ha = page.add( new HTabLayout() ) ;
		ha.add( new FfEtiquette( "SIRET:" ) ) ;
		ha.add( this.getFieldByName( "siret" ) ) ;
		ha.add( new FfEtiquette( "Code APE:" ) ) ;
		ha.add( this.getFieldByName( "ape" ) ) ;
		ha.add( new FfEtiquette( "Numérot TVA:" ) ) ;
		ha.add( this.getFieldByName( "numtva" ) ) ;
		*/
		},
	// Appelée quand un champ change de valeur
	onValueChanged: function( fieldname, value )
		{
		if( fieldname == "article" )
			{
			if( value != "" ) this.la_article.show() ;
			else this.la_article.hide() ;
			if( value != "" )
				{
				this.la_article.show() ;
				this.getFieldByName( "fournisseur" ).requery( "select f.sid, concat( s.rs, ' puHT: ', f.puht_achat, ' remise: ', f.txremise ) from articlestructure as f, structures as s where s.sid=f.sid and f.reference='" + value + "' order by rs" ) ;
				}
			else 
				{
				this.la_article.hide() ;
				this.getFieldByName( "fournisseur" ).requery( "select sid, rs from structures as s where 1 order by rs" ) ;
				}
			}			
		if( fieldname == "achete" )
			{
			if( parseInt(value) ) this.la_achete.show() ;
			else this.la_achete.hide() ;
			}			
			
		return true ;
		},
	// Devient selectionnée
	onLoadModele: function( modele )
		{
		},
	// Devient selectionnée
	onGetSelected: function()
		{
		},
	// Devient non selectionnée
	onGetUnSelected: function()
		{
		}
	} ;

