<!DOCTYPE html>
<%@ Page language="C#" %>
    <%@ Register Tagprefix="SharePoint" 
     Namespace="Microsoft.SharePoint.WebControls" 
     Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
        <%@ Import Namespace="Microsoft.SharePoint" %>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="IE=11"/>

                <title>BIO DATA SAMPLING SP</title>

                <!-- Basic Styles -->
                <link rel="stylesheet" type="text/css" media="screen" href="media/css/bootstrap.min.css">
                <link rel="stylesheet" type="text/css" media="screen" href="media/css/font-awesome.min.css">
                <link rel="stylesheet" type="text/css" media="screen" href="media/css/animate.css">
                <link rel="stylesheet" type="text/css" media="screen" href="media/css/style.css">
                <link rel="stylesheet" type="text/css" media="screen" href="media/css/page-load.css">
                <link rel="stylesheet" type="text/css" media="screen" href="media/css/daterangepicker.css">
                <!-- Kendo UI Styles -->
                <link rel="stylesheet" type="text/css" media="screen" href="media/css/kendo.common.min.css">
                <link rel="stylesheet" type="text/css" media="screen" href="media/css/kendo.blueopal.min.css">
                <link rel="stylesheet" type="text/css" media="screen" href="media/css/kendo.blueopal.mobile.min.css">
                
                <!-- Custom Styles -->
                <link rel="stylesheet" type="text/css" media="screen" href="media/css/custom.css">

                <!-- Favicon -->
                <link rel="icon" type="image/png" sizes="96x96" href="media/img/favicon-96x96.png">
                <!-- the following 5 js files are required to use CSOM -->
                <script src="/_layouts/1033/init.js"></script>
                <script src="media/js/MicrosoftAjax.js"></script>
                <script src="/_layouts/sp.core.js"></script>
                <script src="/_layouts/sp.runtime.js"></script>
                <script src="/_layouts/sp.js"></script>

            </head>

            <body class="top-navigation">
                     <form runat="server">
                         <SharePoint:FormDigest ID="FormDigest1" runat="server"></SharePoint:FormDigest>
                     </form>
                    <div id="wrapper">
                        <div id="page-wrapper" class="gray-bg">
                            <div class="row border-bottom">
                                <div id="nav"></div>
                            </div>
                            <div class="row wrapper border-bottom white-bg page-heading">
                                <div class="col-lg-10">
                                    <h1 class="page-title txt-color-blueDark">
                                        <i class="fa-fw fa fa-home"></i> Page Header                                    
                                    </h1>
                                    <!--<a href="#" class="btn btn-primary startTour"><i class="fa fa-play"></i> Start Tour</a>-->
                                </div>
                                <div class="col-lg-2">
                                    <!--<h1> Right Heading</h1>-->
                                </div>
                            </div>
                            <div class="row wrapper-content">
                                <div class="row">
                                    <div class="col-lg-8">
                                        <div class="ibox-title">
                                            <h5>WELCOME TO THE GPE DIL TRACKING WORKSPACE</h5>
                                            <div class="pull-right">
                                                <div class="btn-group">
                                                    <button type="button" class="k-button"><i class="fa fa-file-excel-o m-r-5"></i> Export as Excel</button>
                                                    <button type="button" class="k-button"> <i class="fa fa-file-pdf-o  m-r-5"></i> Export as PDF</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ibox">
                                            <div class="ibox-content">
                                                <h4 class="title">Lorem Ipsum</h4>
                                                <hr>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat,
                                                    est id malesuada tincidunt, nisi neque fringilla urna, at auctor lorem
                                                    eros at ligula. Duis condimentum magna id dictum fringilla. Nullam in
                                                    efficitur ipsum. Vestibulum ante ipsum primis in faucibus orci luctus
                                                    et ultrices posuere cubilia Curae; Proin ac nisl suscipit, tempor leo
                                                    sit amet, tristique odio. Vivamus cursus dignissim maximus. Pellentesque
                                                    tincidunt ut lectus vel aliquam. Morbi sit amet ante interdum, vehicula
                                                    diam non, malesuada orci. Morbi ex diam, sodales porta ipsum nec, finibus
                                                    molestie felis.</p> 
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">

                                        <div class="ibox">
                                            <div class="ibox-content">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat,
                                                    est id malesuada tincidunt, nisi neque fringilla urna, at auctor lorem
                                                    eros at ligula. Duis condimentum magna id dictum fringilla. Nullam in
                                                    efficitur ipsum. Vestibulum ante ipsum primis in faucibus orci luctus
                                                    et ultrices posuere cubilia Curae; Proin ac nisl suscipit, tempor leo
                                                    sit amet, tristique odio. Vivamus cursus dignissim maximus. Pellentesque
                                                    tincidunt ut lectus vel aliquam. Morbi sit amet ante interdum, vehicula
                                                    diam non, malesuada orci. Morbi ex diam, sodales porta ipsum nec, finibus
                                                    molestie felis.</p>

                                            </div>
                                        </div>

                                        <div class="ibox">
                                            <div class="ibox-content">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat,
                                                    est id malesuada tincidunt, nisi neque fringilla urna, at auctor lorem
                                                    eros at ligula. Duis condimentum magna id dictum fringilla. Nullam in
                                                    efficitur ipsum. Vestibulum ante ipsum primis in faucibus orci luctus
                                                    et ultrices posuere cubilia Curae; Proin ac nisl suscipit, tempor leo
                                                    sit amet, tristique odio. Vivamus cursus dignissim maximus. Pellentesque
                                                    tincidunt ut lectus vel aliquam. Morbi sit amet ante interdum, vehicula
                                                    diam non, malesuada orci. Morbi ex diam, sodales porta ipsum nec, finibus
                                                    molestie felis.</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div id="footer"></div>
                                <div id="loader-wrapper">
                                <div id="loader"></div>
                                <div class="loader-section section-left"></div>
                                <div class="loader-section section-right"></div>
                             </div>
                        </div>
                    </div>
                    <!--End Wrapper-->

                <!-- Mainly scripts -->
                    <script src="media/js/jquery-2.1.1.js"></script>
                    <script src="media/js/jquery-ui.min.js"></script>
                    <script src="media/js/jszip.min.js"></script>
                    <script src="media/js/kendo.all.min.js"></script>
                    <script src="media/js/bootstrap.min.js"></script>
                    <script src="media/js/plugin/metisMenu/jquery.metisMenu.js"></script>
                    <script src="media/js/plugin/slimscroll/jquery.slimscroll.min.js"></script>
                    <script src="media/js/plugin/moment.js"></script>
                    <script src="media/js/plugin/daterangepicker.js"></script>
                    <script src="media/js/jquery.SPWidgets.js"></script>
                    <script src="media/js/jquery.SPServices-2014.02.js"></script>
                    <!-- browser msie issue fix -->
                    <script src="media/js/plugin/msie-fix/jquery.mb.browser.min.js"></script>
                    <!-- FastClick: For mobile devices -->
                    <script src="media/js/plugin/fastclick/fastclick.min.js"></script>
                    <!-- include your app code -->
                    <script src="json/StaticGroups.js"></script>                   
                    <script src="media/js/page-script.js"></script>    
                    <script src="media/js/common.js"></script>               
                    <script src="media/js/cfg.js"></script>
                    <script src="csom/main.csom.js"></script>
                    <script src="dal/main.dal.js"></script>
                    <script src="viewmodel/main.vm.js"></script>                                  
                    <!-- Custom and plugin javascript -->
                    <script src="media/js/inspinia.js"></script>
                    <script src="media/js/plugin/jspdf/jspdf.debug.js"></script>
                    <script src="media/js/plugin/jspdf/jspdf.plugin.autotable.js"></script>
            </body>

            </html>