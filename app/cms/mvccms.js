/*********************************************************
* Modèles utilisé dans la gestion du CMS
*********************************************************/

ayawf.mvc.add( "CmsPage", new MvcModeleControler(
	"CmsPage",
	"page",
	"url,page,module,libelle" ) ) ;

ayawf.mvc.add( "CmsModule", new MvcModeleControler(
	"CmsModule",
	"module",
	"module,libelle" ) ) ;

ayawf.mvc.add( "CmsModuleVersion", new MvcModeleControler(
	"CmsModuleVersion",
	"module,version",
	"module,version,actif,libelle" ) ) ;

ayawf.mvc.add( "CmsModuleArgument", new MvcModeleControler(
	"CmsModuleArgument",
	"module,name",
	"module,name,type,value,libelle" ) ) ;
	
ayawf.mvc.add( "CmsNode", new MvcModeleControler(
	"CmsNode",
	"id",
	"id,module,version,idparent,type,visible,opacity,x,y,z" ) ) ;
	
ayawf.mvc.add( "CmsRootNode", new MvcModeleControler(
	"CmsRootNode",
	"id",
	"id,module,version,idparent,type,visible,opacity,x,y,z,style,libelle" ) ) ;

ayawf.mvc.add( "CmsImageNode", new MvcModeleControler(
	"CmsImageNode",
	"id",
	"id,module,version,idparent,type,visible,opacity,x,y,z,width,height,imgwidth,imgheight,style,filename" ) ) ;

ayawf.mvc.add( "CmsLabelNode", new MvcModeleControler(
	"CmsLabelNode",
	"id",
	"id,module,version,idparent,type,visible,opacity,x,y,z,width,style,libelle" ) ) ;

ayawf.mvc.add( "CmsLabelTexte", new MvcModeleControler(
	"CmsLabelTexte",
	"id,lang",
	"id,lang,texte" ) ) ;
	
ayawf.mvc.add( "CmsCallNode", new MvcModeleControler(
	"CmsCallNode",
	"id",
	"id,module,version,idparent,type,visible,opacity,x,y,z,module,arguments,libelle,moduletocall,style" ) ) ;

ayawf.mvc.add( "CmsLinkNode", new MvcModeleControler(
	"CmsLinkNode",
	"id",
	"id,module,version,idparent,type,visible,opacity,x,y,z,module,argument,libelle,moduletocall,width,style,arguments" ) ) ;

ayawf.mvc.add( "CmsSqlLoopNode", new MvcModeleControler(
	"CmsSqlLoopNode",
	"id",
	"id,module,version,idparent,type,visible,opacity,x,y,z,moduletocall,arguments,libelle,style,rsql,interligne" ) ) ;

ayawf.mvc.add( "CmsArticleNode", new MvcModeleControler(
	"CmsArticleNode",
	"id",
	"id,module,version,idparent,type,visible,opacity,x,y,z,module,argument,libelle" ) ) ;
	
ayawf.mvc.add( "CmsCallArgument", new MvcModeleControler(
	"CmsCallArgument",
	"id",
	"id,name,argument,value" ) ) ;

ayawf.mvc.add( "CmsAction", new MvcModeleControler(
	"CmsAction",
	"id",
	"id,module,version,idparent,type,idnode,actif,noordre" ) ) ;
		
ayawf.mvc.add( "CmsSequenceAction", new MvcModeleControler(
	"CmsSequenceAction",
	"id",
	"id,module,version,idparent,type,idnode,flag,vflag" ) ) ;
	
ayawf.mvc.add( "CmsMotionMoveResizeAction", new MvcModeleControler(
	"CmsMotionMoveResizeAction",
	"id",
	"id,module,version,idparent,type,idnode,noordre,declencheur"
	+ ",time1,width1,height1,x1,y1,z1,opacity1"
	+ ",time2,width2,height2,x2,y2,z2,opacity2"
	+ ",time3,width3,height3,x3,y3,z3,opacity3"
	+ ",time4,width4,height4,x4,y4,z4,opacity4"
	+ ",time5,width5,height5,x5,y5,z5,opacity5" ) ) ;
	
ayawf.mvc.add( "CmsFondueAction", new MvcModeleControler(
	"CmsFondueAction",
	"id",
	"id,module,version,idparent,type,idnode,noordre,actif,timefondue,timepause" ) ) ;
	
ayawf.mvc.add( "CmsGalerieAction", new MvcModeleControler(
	"CmsGalerieAction",
	"id",
	"id,module,version,idparent,type,idnode,actif,noordre,countvisible,marge,width,height,xview,yview,widthview,heightview,timepause" ) ) ;
