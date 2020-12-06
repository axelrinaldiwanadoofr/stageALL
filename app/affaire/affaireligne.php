<?php
//////////////////////////////////////////////////////////
// affaireligne.php
//
// Définition d'une ligne d'affaire
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class AffaireLigne extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "affaire,nligne", "affairelignes" ) ;
		}
	}

class inAffaireLigne extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->nligne = DbParametreInc( $appctx->db, "AFFAIRE", "numligneaffaire" ) ;
			$this->unite = "PCE" ;
			$this->tva = "T19" ;
			$this->taux_tva = 19.6 ;
			$this->emporte = "0" ;
			$this->monaieref = "EURO" ;
			$this->convref = 1.0 ;
			$this->conv_ligne = 1.0 ;
			$this->conv_article = 1.0 ;
			$this->qte = 1 ;
			}
		}
	// Appelée après mise à jour
	public function onValueChanged( $appctx )
		{
		$r_affaire = null ;
		if( $this->affaire ) $r_affaire = DbGetRowWhereNumeric( $appctx->db, "affaires", "affaire", $this->affaire ) ;

		$r_unite = null ;
		if( $this->unite != "" ) 
			{
			$r_unite = DbGetRowWhereStr( $appctx->db, "unites", "unite", $this->unite ) ;
			if( $r_unite ) $this->conv_ligne = $r_unite["coefficient"] ;
			else $this->conv_ligne = 1.0 ;
			}
		else $this->conv_ligne = 1.0 ;
		
		$r_article = null ;
		if( $this->article != "" ) 
			{
			$r_article = DbGetRowWhereStr( $appctx->db, "articles", "reference", $this->article ) ;
			if( $r_article )
				{
				$this->designation = $r_article["rlibelle"] ;
				$this->achete = $r_article["achete"] ;
				$this->fabrique = $r_article["fabrique"] ;
				$this->puht_achat_article = $r_article["puht_achat"] ;
				
				// Donnees du fabriquant de l'article
				$this->articlefabriquant = $r_article["fabriquant"] ;
				$this->articlereffabriquant = $r_article["reffabriquant"] ;
				if( $this->articlefabriquant )
					{
					$r_fabriquant = DbGetRowWhereNumeric( $appctx->db, "structures", "sid", $this->articlefabriquant ) ;
					$this->articlersfabriquant = $r_fabriquant["rs"] ;
					}
					
				// Recherche du fournisseur par defaut
				if( $this->fournisseur == "" )
					{
					$r_articlestructure = DbSql( $appctx->db, "select * from articlestructure where pardefaut=1 and reference='$this->article'" ) ;
					if( $r_articlestructure ) $this->fournisseur = $r_articlestructure["sid"] ;
					}

				// Donnee du fournisseur
				if( $this->fournisseur != "" )
					{
					$r_articlestructure = DbSql( $appctx->db, "select * from articlestructure where sid=$this->fournisseur and reference='$this->article'" ) ;
					if( $r_articlestructure ) 
						{
						$this->reffournisseur = $r_articlestructure["reffour"] ;
						$r_fournisseur = DbGetRowWhereNumeric( $appctx->db, "structures", "sid", $this->fournisseur ) ;
						$this->rsfournisseur = $r_fournisseur["rs"] ;
						if( $r_article["achatmodecalcul"] != 0 ) $this->puht_achat_article = $r_articlestructure["puht_achat"] * (1-$r_articlestructure["txremise"]/100) ;
						}
					if( $r_article["achatmodecalcul"] == 2 ) 
						{
						$r_articlestructuretarif = DbSql( $appctx->db, "select * from articlestructuretarif where sid=$this->fournisseur and reference='$this->article' and $this->qte between qtemin and qtemax" ) ;
						if( $r_articlestructuretarif )
							$this->puht_achat_article = $r_articlestructuretarif["puht_achat"] * (1-$r_articlestructuretarif["txremise"]/100) ;
						}
					}
					
				}
			}
		else 
			{
			$this->conv_ligne = 1.0 ;
			$this->puht_achat_article = "" ;

			// Donnee du fournisseur
			if( $this->fournisseur != "" )
				{
				$r_fournisseur = DbGetRowWhereNumeric( $appctx->db, "structures", "sid", $this->fournisseur ) ;
				$this->rsfournisseur = $r_fournisseur["rs"] ;
				}
			else $this->rsfournisseur = "" ;
			}
		
		// Prix achat 
		$this->puht_achat = $this->puht_achat_article ;
		if( $this->puht_achat_man != "" ) $this->puht_achat = $this->puht_achat_man ;
		
		$this->pht_achat_calc = $this->puht_achat * $this->qte * $this->conv_ligne ;
		$this->pht_achat = $this->pht_achat_calc ;
		if( $this->pht_achat_man != "" ) $this->pht_achat = $this->pht_achat_man ;

		}		
	}
?>