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
      <title> GPE-DIL-WORKSPACE - UNAUTHORIZED</title>
      <!-- Basic Styles -->
      <link rel="stylesheet" type="text/css" media="screen" href="media/css/bootstrap.min.css">
      <link rel="stylesheet" type="text/css" media="screen" href="media/css/font-awesome.min.css">
      <link rel="stylesheet" type="text/css" media="screen" href="media/css/animate.css">
      <link rel="stylesheet" type="text/css" media="screen" href="media/css/style.css">
      <!-- Favicon -->
      <link rel="icon" type="image/png" sizes="96x96" href="media/img/favicon-96x96.png">
      <!-- the following 5 js files are required to use CSOM -->
      <script src="/_layouts/1033/init.js"></script>
      <script src="media/js/MicrosoftAjax.js"></script>
      <script src="/_layouts/sp.core.js"></script>
      <script src="/_layouts/sp.runtime.js"></script>
      <script src="/_layouts/sp.js"></script>
   </head>
   <body class="gray-bg">
      <form runat="server">
         <SharePoint:FormDigest ID="FormDigest2" runat="server"></SharePoint:FormDigest>
      </form>
        <div class="middle-box text-center animated fadeInDown">
            <h2 class="font-bold">UNAUTHORIZED</h2>
            <div class="error-desc">
                <p>Contact your administrator.</p>
                <p id="redirect-message" style="display: none;">You will be redirected in 3 seconds.</p>
            </div>
         </div>
      <!--End Wrapper-->
      <!-- Mainly scripts -->
      <script src="media/js/jquery.min.js"></script>
      <script src="media/js/bootstrap.min.js"></script>
      <!-- include your app code -->
       <script src="media/js/common.js"></script>
       <script src="viewmodel/unauthorized.vm.js"></script>
   </body>
</html>