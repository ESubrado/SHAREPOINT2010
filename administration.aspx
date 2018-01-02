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
      <title> GPE-DIL-WORKSPACE - ADMINISTRATION</title>
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
         <div class="row wrapper-content">
            <div class="row">
               <div class="col-lg-12 m-b-xl">
                  <div id="tabstrip" data-role="tabstrip" data-bind="events: { select: onTabSelect}">
                     <ul>
                        <li class="k-state-active"><i class="fa fa-users"></i> Users</li>
                        <li class=""><i class="fa fa-book"></i> Studies</li>
                        <li class=""><i class="fa fa-archive"></i> DILs Product</li>
                        <li class=""><i class="fa fa-tag"></i> Metadata</li>
						<%--<li class=""><i class="k-icon k-i-template-manager"></i> Template</li>--%>
                     </ul>
                     <div>
                        <!--Grid of Users-->
                        <div class="boxFix">
                           <div class="ibox">
                              <div class="ibox-title">
                                 <h5 class="title">Users</h5>
                                 <div class="pull-right">
                                    <div class="btn-group">
                                       <button type="button" class="k-button" data-bind="click: onUsersExportExcelBtn, disabled: isusergridExportDisabled"><i class="fa fa-file-excel-o m-r-5"></i> Export as Excel</button>
                                       <button type="button" class="k-button" data-bind="click: onUsersOnlyExportExcelBtn, disabled: isusergridExportDisabled"><i class="fa fa-file-excel-o m-r-5"></i> Export as Excel (Users Only)</button>
                                    </div>
                                 </div>
                              </div>
                              <div class="ibox-content users">
                                 <div id="usergrid" 
                                    data-role="grid" 
                                    data-groupable="false"
                                    data-editable="popup" 
                                    data-sortable="true"
                                    data-column-menu="false"
                                    data-filterable="{extra: false}"
                                    data-pageable="{pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }"
                                    data-toolbar="[{ template: kendo.template($('#createuserbtn').html())}, { template: kendo.template($('#usersearchtemplate').html())}]"
                                    data-bind="source: username_list, events: { detailInit: onDetailInitUserGrid, dataBound: onGridDataBound, filterMenuInit: userInitFilter }" 
                                    data-detail-template="userdetailTemplate"
                                    data-columns="[{ title: 'Action', template: kendo.template($('#icontemplate').html()), width: '40px' },
                                    { 'field': 'userName', title:'User name', width: '100px', filterable: true }, 
                                    { 'field': 'userProfile', title:'User Profile', width: '100px', filterable: true }, 
                                    { 'field': 'userEntity', title:'User Entity', width: '100px', filterable: true },
                                    { 'field': 'country', title:'User Country', width: '100px', filterable: false, hidden: true },
                                    { field: 'countryString', title: 'User Country', width: '100px', filterable: true },
                                    { field: 'countryName', title: 'User Country', template: function (data) { return data.countryName.join(', '); }, width: '300px', filterable: false, hidden: true },
                                    { 'field': 'userStatus', title:'User Status', width: '100px', filterable: true }]">
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div>
                        <!--Grid of Studies-->
                        <div class="boxFix">
                           <div class="ibox">
                              <div class="ibox-title">
                                 <h5 class="title">Study Management</h5>
                                 <div class="pull-right">
                                    <div class="btn-group">
                                       <button type="button" class="k-button"  data-bind="click: onStudyExportExcelBtn, disabled: isstudygridExportDisabled"><i class="fa fa-file-excel-o m-r-5"></i> Export as Excel</button>
                                    </div>
                                 </div>
                              </div>
                              <div class="ibox-content products">
                                 <div id="studygrid" 
									  data-role="grid" 
									  data-sortable="true" 
									  data-editable="{ mode: 'popup', template: kendo.template($('#studyEditTemplate').html()) }" 
                                      data-filterable="{extra: false}" 
									  data-pageable="{ refresh: false, pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }"
                                      data-toolbar="[{ template: kendo.template($('#createstudybtn').html())}, { template: kendo.template($('#studysearchtemplate').html())}]"
                                      data-bind="source: study_source, events: { dataBound: onGridDataBound, filterMenuInit: studyInitFilter, edit: onEditStudy, cancel: onCancelEditStudy }" 
                                      data-columns="[   { command:[ { name: 'edit', text: '', className: 'command-btn' } ], 'title': 'Action', 'width': '25px', attributes: { 'class': 'text-center' }},
														{ 'field': 'studyId', title:'Study ID', width: '80px', filterable: true },
														{ 'field': 'primaryInvProdDILProduct', title:'Primary Investigational Product', width: '180px', filterable: true },
														{ 'field': 'investigationalDILProductString', title:'Investigational Product(s)', width: '180px', filterable: true },
														{ 'field': 'studySponsorship', title:'Study Sponsorship', width: '50px', filterable: true }, 
														{ 'field': 'studyBlindedStatus', title:'Study Blinded Status', width: '50px', filterable: true },
														{ 'field': 'retire', title: 'Retired', width: '30px', attributes: { 'class': 'text-center' }, filterable: false, editable: false, template: '<input type=\'checkbox\' data-bind=\'checked: retire\' class=\'checkbox\' style=\'margin: auto\' disabled/>' },]">
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div>
                        <!--Grid of Products -->
                        <div class="boxFix">
                           <div class="ibox">
                              <div class="ibox-title">
                                 <h5 class="title">DILs Product</h5>
                                 <div class="pull-right">
                                     <a href="products.aspx" style="margin-right: 10px; font-size: 14px;"><span>[<u>Link to view all products to all users.</u>]</span></a>                                    
                                    <div class="btn-group">
                                       <button type="button" class="k-button"  data-bind="click: onProductExportExcelBtn, disabled: isproductgridExportDisabled"><i class="fa fa-file-excel-o m-r-5"></i> Export as Excel</button>
                                       <button type="button" class="k-button" data-bind="click: onProductOnlyExportExcelBtn, disabled: isusergridExportDisabled"><i class="fa fa-file-excel-o m-r-5"></i> Export as Excel (Products Only)</button>
                                    </div>
                                 </div>
                              </div>
                              <div class="ibox-content">
                                 <div id="productgrid" 
                                    data-role="grid" 
                                    data-sortable="true"
                                    data-editable="{ mode: 'popup', template: kendo.template($('#productEditTemplate').html()) }"
                                    data-filterable="{extra: false}"
                                    data-pageable="{ pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }"
                                    data-toolbar="[{ template: kendo.template($('#createprodbtn').html())}, { template: kendo.template($('#dilsproductsearchtemplate').html())}]"
                                    data-bind="source: product_list, events: { cancel: product_onCancelGrid, edit: product_onEditGrid, save: product_onSaveGrid, dataBound: onGridDataBound, detailInit: onDetailInitProductGrid, filterMenuInit: productInitFilter }"
                                    data-detail-template="dilsProductDetailTemplate"
                                    data-columns="[
                                    { command:[ { name: 'edit', text: '', className: 'command-btn' }], 'title': 'Action', 'width': '40px', attributes: { 'class': 'text-center' }},
                                    { field: 'dilProduct', title:'DIL Product', width: '240px', filterable: true },
                                    { field: 'code', title:'Product Code', width: '100px', filterable: true }, 
                                    { field: 'nickname', title:'Product Nick name', width: '150px', filterable: true },
                                    { field: 'inn', title:'PV Database INN', width: '200px', filterable: true },
                                    { field: 'entity', title:'Product Entity', width: '100px', filterable: true },
                                    { field: 'retired', title: 'Retired', width: '40px', filterable: false, attributes: { 'class': 'text-center' }, template: '<input type=\'checkbox\' data-bind=\'checked: retired\' class=\'checkbox\' style=\'margin: auto\' disabled/>' },
                                    ]">
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div>
                        <!--Metadata Tab-->
                        <div class="boxFix">
                           <div class="col-lg-6">
                              <div class="ibox">
                                 <div class="ibox float-e-margins">
                                    <div class="ibox-title">
                                       <h5 class="title">Welcome Message</h5>
                                    </div>
                                    <div class="ibox-content">
                                       <div id="welcome-message-grid" 
                                          data-role="grid"
                                          data-height="445px"  
                                          data-editable="{ mode: 'popup', template: kendo.template($('#welcomeMessageEditTemplate').html()) }"
                                          data-bind="source: welcome_message_source, events: { dataBound: onGridDataBound, edit: welcomeMessageEdit, cancel: onCancelEdit }" 
                                          data-columns="[ 
															<%--{ 'title': 'Action', className:'command-btn', template: kendo.template($('#welcomemessage').html()), width: '15%', attributes: { 'class': 'text-center' } },--%>
															{ command:[ { name: 'edit', text: '', className: 'command-btn' } ], 'title': 'Action', 'width': '10%', attributes: { 'class': 'text-center' }},
															{ 'field': 'message', title:'Welcome Message', width: '90%', filterable: false, encoded: false },]">
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="ibox">
                                 <div class="ibox float-e-margins">
                                    <div class="ibox-title">
                                       <h5 class="title">Product Entity</h5>
                                       <div class="pull-right">
                                          <div class="btn-group">
                                             <button type="button" class="k-button" data-bind="click: onProdEntityExcelWindow"><i class="fa fa-file-excel-o m-r-5"></i> Export as Excel</button>
                                             <button type="button" class="k-button" data-bind="click: onProdEntityPdfWindow"> <i class="fa fa-file-pdf-o  m-r-5"></i> Export as PDF</button>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="ibox-content">
                                       <div id="product-entity-grid" 
                                          data-role="grid"
                                          data-height="445px"  
                                          data-editable="{ mode: 'popup', template: kendo.template($('#productEntityEditTemplate').html()) }"
                                          data-filterable="{extra: false}"
                                          data-sortable="true"
                                          data-pageable="{ pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }"
                                          data-toolbar="[ { template: kendo.template($('#productentitytemplate').html())}]"
                                          data-bind="source: product_entity_list, events: { edit: productEntityEdit, dataBound: onGridDataBound, pdfExport: onProdEntityPdfExport }" 
                                          data-columns="[ 
															<%--{ 'title': 'Action', className:'command-btn', template: kendo.template($('#productentityaction').html()), width: '10%', attributes: { 'class': 'text-center' } },--%>
															{ command:[ { name: 'edit', text: '', className: 'command-btn' } ], 'title': 'Action', 'width': '10%', attributes: { 'class': 'text-center' }},
															{ 'field': 'entity', title:'Company Name', filterable: false, width: '80%' },
															{ 'field': 'retired', title: 'Retired', width: '10%', filterable: false, editable: false, attributes: { 'class': 'text-align-center' }, template: '<input type=\'checkbox\' data-bind=\'checked: retired\' class=\'checkbox margin-auto short-list\' disabled/>' },]">
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="ibox">
                                 <div class="ibox float-e-margins">
                                    <div class="ibox-title">
                                       <h5 class="title">Study Sponsorship</h5>
                                       <div class="pull-right">
                                          <div class="btn-group">
                                             <button type="button" class="k-button" data-bind="click: onStudySponsorshipExcelWindow"><i class="fa fa-file-excel-o m-r-5"></i> Export as Excel</button>
                                             <button type="button" class="k-button" data-bind="click: onStudySponsorshipPdfWindow"> <i class="fa fa-file-pdf-o  m-r-5"></i> Export as PDF</button>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="ibox-content">
                                       <div id="study-sponsorship-grid" 
                                          data-role="grid"
                                          data-height="445px"   
                                          data-editable="{ mode: 'popup', template: kendo.template($('#studySponsorshipEditTemplate').html()) }"
                                          data-filterable="{extra: false}"
                                          data-sortable="true"
                                          data-pageable="{ pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }"
                                          data-toolbar="[ { template: kendo.template($('#studysponsorshiptemplate').html())}]"
                                          data-bind="source: study_sponsorship_list, events: { edit: studySponsorshipEdit, dataBound: onGridDataBound, pdfExport: onStudySponsorshipPdfExport }" 
                                          data-columns="[ 
															<%--{ 'title': 'Action', className:'command-btn', template: kendo.template($('#studysponsorshipaction').html()), width: '10%', attributes: { 'class': 'text-center' } },--%>
															{ command:[ { name: 'edit', text: '', className: 'command-btn' } ], 'title': 'Action', 'width': '10%', attributes: { 'class': 'text-center' }},
															{ 'field': 'studySponsorship', title:'Company Name', filterable: false, width: '80%' },
															{ 'field': 'retired', title: 'Retired', width: '10%', filterable: false, editable: false, attributes: { 'class': 'text-align-center' }, template: '<input type=\'checkbox\' data-bind=\'checked: retired\' class=\'checkbox margin-auto short-list\' disabled/>' },]">
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="boxFix">
                           <div class="col-lg-6">
                              <div class="ibox">
                                 <div class="ibox float-e-margins">
                                    <div class="ibox-title">
                                       <h5 class="title">User Entity</h5>
                                       <div class="pull-right">
                                          <div class="btn-group">
                                             <button type="button" class="k-button" data-bind="click: onUserEntityExcelWindow"><i class="fa fa-file-excel-o m-r-5"></i> Export as Excel</button>
                                             <button type="button" class="k-button" data-bind="click: onUserEntityPdfWindow"> <i class="fa fa-file-pdf-o  m-r-5"></i> Export as PDF</button>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="ibox-content">
                                       <div id="user-entity-grid" 
                                          data-role="grid"
                                          data-height="445px" 
                                          data-editable="{ mode: 'popup', template: kendo.template($('#userEntityEditTemplate').html()) }"
                                          data-filterable="{extra: false}"
                                          data-sortable="true"
                                          data-pageable="{ pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }"
                                          data-toolbar="[ { template: kendo.template($('#userentitytemplate').html())}]"
                                          data-bind="source: user_entity_list, events: { edit: userEntityEdit, dataBound: onGridDataBound, pdfExport: onUserEntityPdfExport }" 
                                          data-columns="[ 
															<%--{ 'title': 'Action', className:'command-btn', template: kendo.template($('#userentityaction').html()), width: '10%', attributes: { 'class': 'text-center' } },--%>
															{ command:[ { name: 'edit', text: '', className: 'command-btn' } ], 'title': 'Action', 'width': '10%', attributes: { 'class': 'text-center' }},
															{ 'field': 'userEntity', title:'Company Name', filterable: false, width: '80%' },
															{ 'field': 'retired', title: 'Retired', width: '10%', filterable: false, editable: false, attributes: { 'class': 'text-align-center' }, template: '<input type=\'checkbox\' data-bind=\'checked: retired\' class=\'checkbox margin-auto short-list\' disabled/>' },]">
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="ibox">
                                 <div class="ibox float-e-margins">
                                    <div class="ibox-title">
                                       <h5 class="title">AWARE Studies</h5>
                                       <div class="pull-right">
                                          <div class="btn-group">
                                             <button type="button" class="k-button" data-bind="click: onStudyAwareINNExcelWindow"><i class="fa fa-file-excel-o m-r-5"></i> Export as Excel</button>
                                             <button type="button" class="k-button" data-bind="click: onStudyAwareINNPdfWindow"> <i class="fa fa-file-pdf-o  m-r-5"></i> Export as PDF</button>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="ibox-content">
                                       <div id="study-aware-inn" 
                                          data-role="grid"
                                          data-height="445px"   
                                          data-filterable="{extra: false}"
                                          data-editable="{ mode: 'popup', template: kendo.template($('#awareStudiesEditTemplate').html()) }"
                                          data-sortable="true"
                                          data-pageable="{ pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }"
                                          data-toolbar="[ { template: kendo.template($('#awarestudiestemplate').html())}]"
                                          data-bind="source: aware_study_inn_list, events: { edit: awareStudyEdit, dataBound: onGridDataBound, pdfExport: onStudyAwareINNPdfExport }" 
                                          data-columns="[ 
														  <%--{ 'title': 'Action', className:'command-btn',template: kendo.template($('#awarestudiesaction').html()), width: '10%', attributes: { 'class': 'text-center' } },--%>
														  { command:[ { name: 'edit', text: '', className: 'command-btn' } ], 'title': 'Action', 'width': '10%', attributes: { 'class': 'text-center' }},
														  { 'field': 'studyInn', title:'Studies', width: '40%', filterable: false },
														  { 'field': 'drugName', title:'Drug Name', width: '40%', filterable: false },
														  { field: 'retired', title: 'Retire', width: '10%', filterable: false, editable: false, attributes: { 'class': 'text-align-center' }, template: '<input type=\'checkbox\' data-bind=\'checked: retired\' class=\'checkbox margin-auto short-list\' disabled/>' },]">
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="ibox">
                                 <div class="ibox float-e-margins">
                                    <div class="ibox-title">
                                       <h5 class="title">PV DATABASE INN</h5>
                                       <div class="pull-right">
                                          <div class="btn-group">
                                             <button type="button" class="k-button" data-bind="click: onAwareINNExcelWindow"><i class="fa fa-file-excel-o m-r-5"></i> Export as Excel</button>
                                             <button type="button" class="k-button" data-bind="click: onAwareINNPdfWindow"> <i class="fa fa-file-pdf-o  m-r-5"></i> Export as PDF</button>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="ibox-content">
                                       <div id="aware-inn-grid" 
                                          data-role="grid"
                                          data-height="445px" 
                                          data-editable="{ mode: 'popup', template: kendo.template($('#awareINNEditTemplate').html()) }"
                                          data-filterable="{extra: false}"
                                          data-sortable="true"                                         
                                          data-pageable="{ pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }"
                                          data-toolbar="[ { template: kendo.template($('#awareinntemplate').html())}]"
                                          data-bind="source: aware_inn_list, events: { edit: awareINNEdit, dataBound: onGridDataBound, pdfExport: onAwareINNPdfExport }" 
                                          data-columns="[ 
														  <%--{ 'title': 'Action', className:'command-btn',template: kendo.template($('#awareinnaction').html()), width: '10%', attributes: { 'class': 'text-center' } },--%>
														  { command:[ { name: 'edit', text: '', className: 'command-btn' } ], 'title': 'Action', 'width': '10%', attributes: { 'class': 'text-center' }},
														  { 'field': 'awareInn', title:'INN', width: '65%', filterable: false },
                                                          { 'field': 'sourceInn', title:'Source', width: '15%', filterable: false },
														  { field: 'retired', title: 'Retire', width: '10%', filterable: false, editable: false, attributes: { 'class': 'text-align-center' }, template: '<input type=\'checkbox\' data-bind=\'checked: retired\' class=\'checkbox margin-auto short-list\' disabled/>' },]">
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
					 <div>
                        <div class="boxFix">
                           <div class="col-lg-6">
                              <div class="ibox">
                                 <div class="ibox float-e-margins">
                                    <div class="ibox-title">
                                       <h5 class="title">Cover Letter</h5>
                                    </div>
                                    <div class="ibox-content">
                                       <div id="cover-letter-grid" 
                                          data-role="grid"
                                          data-height="445px"  
                                          data-editable="{ mode: 'popup', template: kendo.template($('#coverLetterEditTemplate').html()) }"
                                          data-bind="source: cover_letter_source, events: { dataBound: onGridDataBound, edit: coverLetterEdit, cancel: onCancelEdit }" 
                                          data-columns="[ 
															{ command:[ { name: 'edit', text: '', className: 'command-btn' } ], 'title': 'Action', 'width': '10%', attributes: { 'class': 'text-center' }},
															{ 'field': 'coverLetterValue', title:'Template', width: '90%', filterable: false, encoded: false },]">
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="boxFix">
                           <div class="col-lg-6">
                           </div>
                        </div>
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
         <div id="popWindow">
            <!--Create Study-->
            <div id="createStudy" data-actions="false" data-resizable="false" data-role="window" data-title="New Study Information" data-width="800px" data-height="500px" data-modal="true">
               <form data-role="validator" novalidate="novalidate">
                  <div class="form-group pull-left">
                     <button class="k-button"  type="submit" data-bind="visible: isAuditStudyBtnVisible, click: auditLogStudyOpen"><span class="fa fa-file-text-o"></span> Show Audit Trail</button>
                  </div>
                  <div class="form-group pull-right">
                     <button class="k-primary k-button" type="submit" data-bind="click: validateCreateStudy"> <span class="k-icon k-i-save"></span> Save</button>
                     <button class="k-button" type="submit" data-bind="click: onCancelStudy"><span class="k-icon k-i-cancel" ></span> Cancel</button>
                  </div>
                  <div class="hr-line-solid clearfix"></div>
                  <div class="boxFix">
                     <div class="col-xs-6 col-md-4 b-r">
                        <div class="form-group">
                           <label>Study ID <span class="required">*</span></label>
                           <input id="studyautocomplete" name="studyautocomplete" data-role="combobox" data-auto-bind="true" data-placeholder="Study ID" data-value-primitive="true"
                              data-text-field="studyInn" data-value-field="studyInn" data-bind=" value: study_id, source: study_aware_inn_source, events: { change: trimStudyId }"
                              class="form-control" required="required" data-required-msg="Enter Study ID" />
                           <span class="k-invalid-msg" data-for="studyautocomplete"></span>
                        </div>
                     </div>
                     <div class="col-xs-6 col-md-4 b-r">
                        <div class="form-group">
                           <label>Study Sponsorship<span class="required"> *</span></label>
                           <select name="studysponsorship"
                              id="studysponsorship"
                              data-role="dropdownlist" 
                              data-value-primitive="true"
                              data-text-field="sponsor"
                              data-value-field="sponsor"
                              data-bind="value: study_sponsorship, source: study_sponsorship_source, events: { change: dirtyStudySponsorship }"
                              class="form-control" required="required" data-required-msg="Select Study Sponsorship">
                           </select>
                           <span class="k-invalid-msg" data-for="studysponsorship"></span>
                        </div>
                     </div>
                     <div class="col-xs-6 col-md-4">
                        <div class="form-group">
                           <label>Study Blinded Status<span class="required"> *</span></label>
                           <select name="studyblindedstatus"
                              id="studyblindedstatus"
                              data-value-primitive="true"
                              data-text-field="status"
                              data-value-field="status"
                              data-bind="value: study_blinded_status, source: study_blinded_status_source, events: { change: dirtyStudyStatus }"
                              class="form-control" required="required" data-required-msg="Select Study Blinded Status">
                           </select>
                           <span class="k-invalid-msg" data-for="studyblindedstatus"></span>
                        </div>
                     </div>
                  </div>
                  <div class="clearfix"></div>
                  <div class="form-group m-t ">
                     <p class="font-bold text-uppercase">Investigational Product(s) <span class="required"> *</span></p>
					 <span id="investigational-product-validation" class="hide custom-tooltip" role="alert"><span class="k-icon k-i-warning"> </span> At least one Investigational Product is required and a Primary Investigational Product is required.</span>
					 <span id="primary-investigational-product-validation" class="hide custom-tooltip" role="alert"><span class="k-icon k-i-warning"> </span> A Primary Investigational Product is required.</span>
                     <div id="createstudygrid" 
                        data-role="grid"
						data-height="290px"
                        data-sortable="true"
                        data-pageable="{ pageSizes: [5, 10, 20], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }"
                        data-bind="source: study_create_list, events: { detailInit: onStudyProductDetailInit, dataBound: onGridDataBound, edit: onCreateStudyProductLink, remove: onCreateOrEditStudyRemove }"
                        data-editable="{ mode: 'popup', template: kendo.template($('#studyeditproduct').html()), confirmation: false }"
                        data-filterable="{extra: false}"
                        data-detail-template="studyProductDetailTemplate"
                        data-toolbar="[{ template: kendo.template($('#linktousercreatestudy').html())}]" 
                        data-columns="[  
										{ command: [{ text: 'Make Primary', click: confirmPrimaryProduct }], width:'50px'},
										{ 'field': 'dilProduct', title:'DIL Product', width: '140px', filterable: false, encoded: false }, 
										{ 'command':[ { name:'edit', text: '', imageClass: 'k-icon k-i-link-horizontal', className: 'command-btn-user',}, { name:'destroy', text: '', imageClass: 'k-icon k-i-hyperlink-remove', className: 'command-btn-user unlink-btn',} ], 'title': 'Action', 'width': '40px' }, ]">
                     </div>
                  </div>
               </form>
            </div>
            <div id="linkProductToStudy"
               data-role="window"
               data-title="Link Product"
               data-width="400px"
               data-resizable="false"
               data-height="auto"
               data-modal="true"
               data-visible="false">
				<span id="product-validation-edit" class="hide custom-tooltip" role="alert"><span class="k-icon k-i-warning"> </span> Please select a Product.</span>
               <div class="p-sm">
                  <label>Product</label>
                  <div class="row">
                     <div class="col-lg-11">
                        <div class="form-group">
                           <input data-role="dropdownlist" name="linkproducttostudy" id="linkproducttostudy" data-option-label="Select Product" 
                              required data-filter="contains" data-required-msg="Select Product" data-value-primitive="true" data-text-field="dilProduct" 
                              data-value-field="id" data-bind="value: investigational_product, source: study_product_source, events: { change: selectEditProduct }"
                              class="w-300"/>
                           <span class="k-invalid-msg" data-for="username"></span>
                        </div>
                        <button class="k-primary k-button" type="submit"  data-bind="click: study_validateLinkProduct" > Link</button>
                        <button class="k-button" type="submit" data-bind="click: closeLinkProductToStudy" >Cancel</button>
                     </div>
                  </div>
               </div>
            </div>
			<div id="linkProductToCreateStudy"
               data-role="window"
               data-title="Link Product"
               data-width="400px"
               data-resizable="false"
               data-height="auto"
               data-modal="true"
               data-visible="false">
			   <span id="product-validation-create" class="hide custom-tooltip" role="alert"><span class="k-icon k-i-warning"> </span> Please select a Product.</span>
               <div class="p-sm">
                  <label>Product</label>
                  <div class="row">
                     <div class="col-lg-11">
                        <div class="form-group">
                           <input data-role="dropdownlist" name="linkproducttocreatestudy" id="linkproducttocreatestudy" data-option-label="Select Product" 
                              required data-filter="contains" data-required-msg="Select Product" data-value-primitive="true" data-text-field="dilProduct" 
                              data-value-field="id" data-bind="value: investigational_product, source: study_product_source, events: { change: selectCreateProduct }"
                              class="w-300"/>
                           <span class="k-invalid-msg" data-for="username"></span>
                        </div>
                        <button class="k-primary k-button" type="submit"  data-bind="click: createStudy_validateLinkProduct" > Link</button>
                        <button class="k-button" type="submit" data-bind="click: closeLinkProductToCreateStudy" >Cancel</button>
                     </div>
                  </div>
               </div>
            </div>
            <!--Create Product-->
            <div id="createProduct" data-role="window" data-title="New Product Information" data-width="1000px" data-action="false" data-resizable="false" data-height="auto" data-bind="events: { open: product_resetCreateProductWindow }" data-modal="true">
               <form data-role="validator" novalidate="novalidate">
                  <div class="form-group pull-right">
                     <button class="k-primary k-button" type="submit" data-bind="click: validateCreateProduct"><span class="k-icon k-i-save"></span> Save</button>
                     <button class="k-button"  type="submit" data-bind="click: onCancelProduct" ><span class="k-icon k-i-cancel" ></span> Cancel</button>
                  </div>
                  <div class="hr-line-solid clearfix"></div>
                  <div class="boxFix">
                     <div class="col-xs-6 col-md-4 b-r">
                        <div class="form-group clearable-input">
                           <label>Product Code</label>
                           <input type="text" data-bind="value: product_code, events: { keyup: product_onProductTextKeyup, change: product_onProductTextChange }" data-value-update="change" class="form-control" id="productCode" name="productCode" placeholder="Product Code" maxlength="255"/>
                           <span data-clear-input class="k-icon k-i-close"></span>
                        </div>
                        <div class="form-group clearable-input">
                           <label>Product Nick Name</label>
                           <input type="text" data-bind="value: product_nickname, events: { keyup: product_onProductTextKeyup, change: product_onProductTextChange }" data-value-update="change" class="form-control" id="productNickname" name="productNickname" placeholder="Product Nick Name" maxlength="255"/>
                           <span data-clear-input class="k-icon k-i-close"></span>
                        </div>
                     </div>
                     <div class="col-xs-6 col-md-4 b-r">
                        <div class="form-group">
                           <label>PV Database INN <span class="required"> *</span></label>
                           <input id="productDropDownINN" data-role="dropdownlist" data-filter="contains" name="productINN" data-option-label="Select PV Database INN" required data-required-msg="Select PV Database INN" data-value-primitive="false"
                              data-text-field="inn" data-value-field="inn" data-bind="value: product_awareInn, source: product_inn_list, events: { change: product_onProductTextChange }" class="form-control h-19"/>
                           <span class="k-invalid-msg" data-for="productINN"></span>
                        </div>
                        <div class="form-group">
                           <label>Product Entity <span class="required"> *</span></label>
                           <input data-role="dropdownlist" name="productEntity"  data-auto-bind="false" data-option-label="Select Product Entity" id="productEntity" required data-required-msg="Select Product Entity" data-value-primitive="true"
                              data-text-field="entity" data-value-field="entity" data-bind="value: product_entity, source: product_entity_list_drp" class="form-control"/>
                           <span class="k-invalid-msg" data-for="productEntity"></span>
                        </div>
                     </div>
                     <div class="col-xs-6 col-md-4">
                        <div class="form-group">
                           <label>DIL Product</label>
                           <input type="text" data-bind="value: product_folder" class="form-control" id="productFolder" name="dilProduct" readonly placeholder="Product Code" maxlength="255">
                           <button class="form-control k-button" style="margin-top: 10px;" data-bind="events: { click: editProductName }">
                           <span class="k-icon k-i-edit"></span>View Complete Text
                           </button>
                        </div>
                     </div>
                  </div>
                  <div class="clearfix"></div>
                  <div class="form-group ">
                     <div class="m-sm">
                      <button class="k-button k-button-icontext" name="product_createUser" data-bind="click: product_onCreateUserOfCreateProduct"><span class="k-icon k-i-add"></span> Create User</button>
                     </div>
                     <div>
                        <div class="animated fadeInDown">
                                <div id="">
                                <div class="dual-list list-left col-md-5">
                                    <h3>Users</h3>
                                    <div class="well">
										<div class="form-inline">
                                            <div class="input-group clearable-input grid-search userProductLink">
                                                <input type="text" class="k-textbox m-r-xs w-300" name="searchUserInput" data-bind="value: searchUserInput, events: { keyup: onSearchKeyUp }" placeholder="User Name" data-value-update="input"/>
                                                <span data-clear-input class="k-icon k-i-close"></span>
                                               <button type="button" class="btn btn-sm k-button search-button" name="searchProductUsers" data-bind="click: onSearchUsers">Search</button>
                                            </div>
                                        </div>
                                        <ul id="productUsersListview"
                                            class="list-group"
                                            style="height: 300px; overflow: scroll;"
                                            data-role="listview"
                                            data-bind="source: product_user_list_all"
                                            data-template="productListViewUserTemplate">
                                        </ul>
                                    </div>
                                </div>
                                <div class="list-arrows col-md-1 text-center">
                                    <label>Link All</label>
                                    <button data-bind="events: { click: product_addAllToSelectedListView }" title="Link All" type="button" class="k-button atr" data-type="atr"><span class="glyphicon glyphicon-list"></span> <span class="glyphicon glyphicon-chevron-right"></span></button>
                                    <label>Unlink All</label>
                                    <button data-bind=" events: { click: product_removeAllFromSelectedListView }" title="Unlink All" type="button" class="k-button atl" data-type="atl"><span class="glyphicon glyphicon-chevron-left"></span> <span class="glyphicon glyphicon-list"></span></button>
                                    <label>Unlink</label>
                                    <button data-bind="events: { click: product_removeFromSelectedListView }" title="Unlink" class="k-button move-left"><span class="glyphicon glyphicon-chevron-left"></span></button>
                                    <label>Link</label>
                                    <button data-bind="events: { click: product_addToSelectedListView }" title="Link" class="k-button move-right"><span class="glyphicon glyphicon-chevron-right"></span></button>                                        
                                </div>
                                <div class="dual-list list-right col-md-5">
                                    <h3>Linked Users</h3>
                                    <div class="well">
										<div class="form-inline">
                                            <div class="input-group clearable-input grid-search userProductLink">
                                                <input type="text" class="k-textbox m-r-xs w-300" name="searchLinkedUserInput" data-bind="value: searchLinkedUserInput, events: { keyup: onSearchKeyUp }" placeholder="User Name" data-value-update="input"/>
                                                <span data-clear-input class="k-icon k-i-close"></span>
                                               <button type="button" class="btn btn-sm k-button search-button" name="searchProductUsers" data-bind="click: onSearchLinkedUsers">Search</button>
                                            </div>
                                        </div>
										<ul id="productLinkedUsersListview"
											class="list-group" style="height: 300px; overflow: scroll;"
											data-role="listview"
											data-bind="source: product_create_list"
											data-template="productListViewUserProductTemplate">
										</ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
               </form>
            </div>
            <div id="userLink"
               data-role="window"
               data-title="Link User"
               data-width="400px"
               data-resizable="false"
               data-height="auto"
               data-modal="true"
               data-visible="false">
               <div class="p-sm">
                  <label>User</label>
                  <div class="row">
                     <div class="col-lg-11">
                        <div class="form-group">
                           <input data-role="dropdownlist" name="username" data-option-label="Select User" id="product_link_user_window" required data-filter="contains" data-required-msg="Select User" data-value-primitive="true"
                              data-text-field="userName" data-value-field="id" data-bind="value: product_link_user, source: product_user_list_all" class="form-control"/>
                           <span class="k-invalid-msg" data-for="username"></span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <!--Create User-->
            <div id="createUser" data-role="window" data-resizable="false" data-title="New User Information" data-width="1000px" data-actions="false" data-height="auto" data-modal="true"  data-bind="events: { open: userCreateOnOpen }">
               <form data-role="validator" novalidate="novalidate">
                  <div class="form-group pull-left">
                     <button class="k-button"  type="submit" data-bind="visible: isLogBtnVisible, click: userAccessRightsData"><span class="k-icon k-i-file-txt"></span> Log</button>
                     <button class="k-button"  type="submit" data-bind="visible: isAuditUserBtnVisible, click: auditLogUserOpen"><span class="fa fa-file-text-o"></span> Show Audit Trail</button>
                       <button class="k-button"  type="submit" data-bind="visible: isUserNotifHistroyBtnVisible, click: userNotifHistoryOpen"><span class="fa fa-file-text-o"></span> Show Notification History</button>
                  </div>
                  <div class="form-group pull-right">
                     <button class="k-primary k-button"  type="submit" data-bind="click: onSaveNewUser"><span class="k-icon k-i-save"></span> <span data-bind="text: user_TextBtn"></span></button>
                     <button class="k-button"  type="submit" data-bind="click: onCancelUser"><span class="k-icon k-i-cancel" ></span> Cancel</button>
                  </div>
                  <div class="hr-line-solid clearfix"></div>
                  <div class="boxFix">
                     <div class="col-xs-6 col-md-4 b-r">
                        <div class="form-group" id="userPick">
                           <label>User Name <span class="required"> *</span></label>
                           <input id="user_userName" data-bind="value: user_userNameValue, events: { change: detectUserDirty }" name="user_userName" required data-required-msg="Select a Valid Username" data-value-primitive="true" class="w-300"/>
                        </div>
                        <div class="form-group">
                           <label>Department</label>
                           <textarea rows="1" id="spDepartment" name="department" placeholder="e.g. Sharepoint" disabled="isNameDisabled" required data-email-msg="Email format is not valid" style="overflow:auto; resize:initial;"
                              class="form-control"></textarea>
                        </div>
                        <div class="form-group">
                           <label class="control-label" for="userstatus">User Status<span class="required"> *</span></label>
                           <select name="userstatus" id="userstatus" required data-required-msg="Select User Status" data-value-primitive="true" data-text-field="UserStatusName"
                              data-value-field="UserStatusName" data-bind="value: user_statusValue, source: user_status_list, disabled: isUserStatusDisabled, events: { change: hasUserStatChanged }" class="form-control"></select>
                           <span class="k-invalid-msg" data-for="userstatus"></span>
                        </div>
                     </div>
                     <div class="col-xs-6 col-md-4 b-r">
                        <div class="form-group">
                           <label>Email Address</label>
                           <input type="email" id="spEmail" name="Email" placeholder="e.g. namee@domain.net" disabled="isNameDisabled" required data-email-msg="Email format is not valid"
                              class="form-control" />
                        </div>
                        <div class="form-group">
                           <label>User Entity<span class="required"> *</span></label>
                           <select name="userentity" id="userentity" data-role="dropdownlist" required data-required-msg="Select User Entity" data-value-primitive="true" data-text-field="UserEntityName"
                              data-value-field="UserEntityName" data-bind="value: user_entityValue, source: user_entity_list_drp, disabled: isUserEditDisabled, events: { change: detectUserDirty }" class="form-control"></select>
                           <span class="k-invalid-msg" data-for="userentity"></span>
                        </div>
                        <div class="form-group">
                           <label>User Profile <span class="required"> *</span></label>
                           <select name="userprofile" id="userprofile" required data-required-msg="Select User Profile" data-value-primitive="true"
                              data-text-field="UserProfileName" data-value-field="UserProfileName" data-bind="value: user_profileValue, source: user_profile_list, disabled: isUserEditDisabled, events: { change: isProfileChange }" class="form-control"></select>
                           <span class="k-invalid-msg" data-for="userprofile"></span>
                        </div>
                     </div>
                     <div class="col-xs-6 col-md-4">
                        <div class="form-group">
                           <label>User Country<span class="required"> *</span></label>
                           <select id="userCountry" data-role="multiselect" data-value-primitive="true" data-text-field="country" data-value-field="country" data-clear-button="true" data-placeholder="Select Country"                                                                       
                              data-bind="value: user_countryValue, source: user_country_list, events: { change: detectUserDirty }" name="country" autocomplete="off" class="form-control" style="height: auto;" 
                              required data-required-msg="Select Country"></select>   
                           <span class="k-invalid-msg" data-for="country"></span>                              
                        </div>
                        <div>
                           <div class="form-group">
                                  <input type="checkbox" name="all_BO" id="allOpenCheckbox" data-bind="checked: user_isAllOpenChecked, events: { change: detectUserDirty }"/>
                                  <label for="allOpenCheckbox">All Products Unblinded</label>
                           </div>
                            <div class="form-group">
                                <input type="checkbox" name="all_BO" id="allBlindedCheckbox" data-bind="checked: user_isAllBlindedChecked, events: { change: detectUserDirty }"/>
                                <label for="allBlindedCheckbox">All Products Blinded</label>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="clearfix"></div>                   
                   <div id="editUserlistgroup">                      
                      <div data-bind="visible: listViewIsVisible">
                         <div class="animated fadeInDown">
                            <span id="user-productlink-validation" style="margin-left: 10px;" class="hide custom-tooltip" role="alert"><span class="k-icon k-i-warning"> </span> At least one DIL Product is required</span>
							<div id="listgroup">                                
								<div class="dual-list list-left col-md-5">
									<h3>DIL Products</h3>
									<div class="well">
										<div class="input-group clearable-input grid-search userProductLink">
                                                <input type="text" class="k-textbox m-r-xs w-300" name="searchUserInputProducts" data-bind="value: userProductInput, events: { keyup: onSearchKeyUp }" placeholder="Product" data-value-update="input"/>
                                               <span data-clear-input class="k-icon k-i-close"></span>
                                               <button type="button" class="btn btn-sm k-button search-button" name="searchProductUsers" data-bind="click: onSearchUserProducts">Search</button>
                                            </div>
										<ul id="available_listview" class="list-group" style="height: 300px; overflow: scroll;" data-role="listview" data-auto-bind="false" data-bind="source: available_Product, disabled: user_linkProductDisabled" data-template="boxtemplate"></ul>
									</div>
								</div>
								<div class="list-arrows col-md-1 text-center">
									<label>Link All</label>
									<button data-bind=" disabled: user_linkProductDisabled, events: { click: addAllToSelectedListView }" title="Link All" type="button" class="k-button atr" data-type="atr"><span class="glyphicon glyphicon-list"></span> <span class="glyphicon glyphicon-chevron-right"></span></button>
									<label>Unlink All</label>
									<button data-bind=" disabled: user_linkProductDisabled, events:{ click: removeAllFromSelectedListView}" title="Unlink All" type="button" class="k-button atl" data-type="atl"><span class="glyphicon glyphicon-chevron-left"></span> <span class="glyphicon glyphicon-list"></span></button>
									<label>Unlink</label>
									<button data-bind=" disabled: user_linkProductDisabled, events: { click: removeFromSelectedListView }" title="Unlink" class="k-button move-left">
									<span class="glyphicon glyphicon-chevron-left"></span>
									</button>
									<label>Link</label>
									<button data-bind=" disabled: user_linkProductDisabled, events: { click: addToSelectedListView }" title="Link" class="k-button move-right">
									<span class="glyphicon glyphicon-chevron-right"></span>
									</button>                                        
								</div>
								<div class="dual-list list-right col-md-5">
									<h3>Linked Products<span class="required"> *</span></h3>
									<div class="well">
										<div class="input-group clearable-input grid-search userProductLink">
                                                <input type="text" class="k-textbox m-r-xs w-300" name="searchUserLinkedProducts" data-bind="value: userLinkedProductInput, events: { keyup: onSearchKeyUp }" placeholder="Product" data-value-update="input"/>
                                                <span data-clear-input class="k-icon k-i-close"></span>
                                               <button type="button" class="btn btn-sm k-button search-button" name="searchLinkedProductUsers" data-bind="click: onSearchUserLinkedProducts">Search</button>
                                            </div>
										<ul id="selected_listview" class="list-group" style="height: 300px; overflow: scroll;" data-role="listview" data-auto-bind="false" data-bind="source: user_selected_products, disabled: user_linkProductDisabled" data-template="boxtemplate_linked"></ul>
									</div>
								</div>
							</div>
                         </div>
                      </div>
                   </div>
                  <div class="clearfix"></div>
               </form>
            </div>
            <div id="productLink"
               data-role="window"
               data-title="Link Product"
               data-width="400px"
               data-resizable="false"                                    
               data-height="auto"
               data-modal="true"
               data-bind="events: { open: user_resetLinkProductWindow, close: user_unbindLinkProductWindowEvents }"
               data-visible="false">
               <div class="p-sm">
                  <label>DIL Product</label>
                  <div class="row">
                     <div class="col-lg-11">
                        <div class="form-group">
                           <input data-role="dropdownlist" name="username" data-option-label="Select Product" id="user_link_product_window" required data-filter="contains" data-required-msg="Select Product" data-value-primitive="true"
                              data-text-field="dilproduct" data-value-field="id" data-bind="value: user_link_product, source: available_Product" class="form-control"/>
                           <span class="k-invalid-msg" data-for="username"></span>
                        </div>
                     </div>
                  </div>
                  <label>Status<span class="required"> *</span></label>
                  <div class="row">
                     <div class="col-lg-11">
                        <div class="form-group">
                           <div class="checkbox checkbox-inline">
                              <input type="checkbox" name="user_status" id="user_link_product_window_blinded" value="Blinded" checked class="">
                              <label class="" for="user_link_product_window_blinded">Blinded</label>
                           </div>
                           <div class="checkbox checkbox-inline">
                              <input type="checkbox" name="user_status" id="user_link_product_window_open" value="Open" class="">
                              <label class="" for="user_link_product_window_open">Unblinded</label>
                           </div>
                        </div>
                     </div>
                  </div>                  
                  <div class="row">
                  <div class="col-lg-11">
                  <button class="k-primary k-button" type="submit"  data-bind="click: user_onSaveLinkProduct" ><span class="k-icon k-i-save"></span> SAVE</button>
                  <button class="k-button"  type="submit" data-bind="click: user_onCancelLinkProduct" >Cancel</button>
                  </div>
                  </div>
               </div>
            </div>
            <!--User Access Rights-->
            <div id="userRightAccessInfo" data-role="window" data-actions="false" data-resizable="false" data-title="USER ACCESS LOG" data-width="1000px" data-height="auto" data-modal="true"  data-bind="events: { open: viewLogOnOpen }">
                <div class="form-group">
                    <div class="pull-right m-b-sm">
                        <button class="btn k-button" data-bind="click: onAccessLogExportExcelBtn, disabled: isuserRightsAccessGridExportDisabled"><i class="fa fa-file-excel-o m-r-5"></i> EXPORT AS EXCEL</button>                                                      
                        <button class="k-button" data-bind="click: closeLogWindow">CLOSE</button>                            
                    </div>
                    <div class="hr-line-solid clearfix"></div>
                    <div id="userRightsAccessGrid" 
                       data-role="grid" 
                       data-sortable="true"
                       data-scrollable="false"
                       data-pageable="{ pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }" 
                       data-editable="false"                                 
                       data-actions="false" 
                       data-filterable="{extra: false}"                                                               
                       data-bind="source: user_rights_access_src, events: { dataBound: onGridDataBound, filterMenuInit: userAccessLogInitFilter}"
                       data-toolbar="[{ template: kendo.template($('#userRightsAccessRange').html())}]"                                                
                       data-columns="[                                
                       { 'field':'userName', title:'User', width: '608px', hidden: true, filterable: true }, 
                       { 'field':'dilProductName', title:'DIL Product', width: '608px', hidden: true, filterable: true }, 
                       { 'field':'access', title:'Access', width: '101px', template: kendo.template($('#userLogGridStatus').html()), filterable: true },
                       { 'field':'action', title:'Action', width: '113px', filterable: true },
                       { 'field':'created', title:'Log Date', width: '163px', filterable: true, format: '{0:dd-MMM-yyyy HH:mm}'} 
                       ]">
                    </div>
                </div>
            </div>
            <!--Audit Trails-->
            <div id="viewAuditTrailProduct" data-role="window" data-title="Audit Trail" data-width="1300px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" class="no-display" data-actions="false">
                <div class="form-group">    
                    <div class="pull-right m-b-sm">                  
                        <button class="k-button" data-bind="click: onauditTrailProductGridExcelBtn, disabled: isauditTrailProductGridExportDisabled"><i class="fa fa-file-excel-o m-r-5"></i> EXPORT AS EXCEL</button>
                        <button class="btn k-button" data-bind="click: closeAuditTrailAdmin ">CLOSE</button>
                    </div>
                    <div class="hr-line-solid clearfix"></div>               
                    <h2><span data-bind="text: auditProductName"></span></h2>
                    <div id="auditTrailProductGrid"
                       data-role="grid"                      
                       data-resizable="false"
                       data-scrollable="true"
                       data-auto-bind="false"                                                                                                            
                       data-width="500"
                       data-height="300"
                       data-sortable="true"
                       data-filterable="{extra: false}"                                
                       data-pageable="{pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }"                                
                       data-bind="source: auditTrailProduct, events: { dataBound: onGridDataBound, filterMenuInit: productAuditTrailInitFilter }"                              
                       data-columns="[
                       { 'field': 'Version', title: 'Version No.', width: '100px', filterable: true },
                       { 'field': 'ProductCode', title: 'Product Code', width: '100px', filterable: true },                                
                       { 'field': 'AWAREINN', title: 'PV DATABASE INN', width: '150px', filterable: true },
                       { 'field': 'ProductEntity', title: 'Product Entity', width: '100px', filterable: true },
                       { 'field': 'DILProduct', title: 'DIL Product', width: '150px', filterable: true },
                       { 'field': 'Status', title: 'Status', width: '100px', filterable: true },
                       { 'field': 'Created', title: 'Created On', width: '150px', format: '{0:dd-MMM-yyyy hh:mm:ss tt}', filterable: false },
                       { 'field': 'Author', title: 'Created By', width: '150px', filterable: false },
                       { 'field': 'Modified', title: 'Modified On', width: '150px', format: '{0:dd-MMM-yyyy hh:mm:ss tt}', filterable: true },
                       { 'field': 'ModifiedBy', title: 'Modified By', width: '150px', filterable: true }
                       ]">
                    </div>
                </div>
            </div>   
            <div id="viewAuditTrailStudy" data-role="window" data-title="Audit Trail" data-width="1300px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" class="no-display" data-actions="false">
                <div class="form-group">
                    <div class="pull-right m-b-sm">  
                        <button class="k-button" data-bind="click: onauditTrailStudyGridExcelBtn, disabled: isauditTrailStudyGridExportDisabled"><i class="fa fa-file-excel-o m-r-5"></i> EXPORT AS EXCEL</button>
                        <button class="btn k-button" data-bind="click: closeAuditTrailAdmin ">CLOSE</button> 
                    </div>
                    <div class="hr-line-solid clearfix"></div>                   
                    <h2><span data-bind="text: auditStudyName"></span></h2>
                    <div id="auditTrailStudyGrid"
                       data-role="grid"
                       data-resizable="false"
                       data-scrollable="true"
                       data-sortable="true"
                       data-auto-bind="false"                                                                                                            
                       data-width="500"
                       data-height="300"
                       data-filterable="{extra: false}"                             
                       data-pageable="{pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }"                             
                       data-bind="source: auditTrailStudy, events: { dataBound: onGridDataBound, filterMenuInit: studyAuditTrailInitFilter }"                              
                       data-columns="[
                       { 'field': 'Version', title: 'Version No.', width: '100px', filterable: true },
                       { 'field': 'StudyID', title: 'Study ID', width: '100px', filterable: false  },                                
                       { 'field': 'StudySponsorship', title: 'Study Sponsorship', width: '150px', filterable: true  },                                      
                       { 'field': 'InvestigationalDILProductsString', title: 'Investigational DIL Products', width: '150px', filterable: true  },
                       { 'field': 'InvestigationalDILProductsName', title: 'Investigational DIL Products', width: '150px', template: function (data) { return data.InvestigationalDILProductsName.join(', '); }, filterable: true, hidden: true  },
                       { 'field': 'PrimaryInvProdDILProduct', title: 'Primary Investigational DIL Products', width: '150px', filterable: true },
                       { 'field': 'StudyBlindedStatus', title: 'Study Blinded Status', width: '100px', filterable: true  },                                
                       { 'field': 'Retired', title: 'Retired', width: '100px', filterable: true  },
                       { 'field': 'isImported', title: 'Imported', width: '100px', filterable: false  },
                       { 'field': 'Created', title: 'Created On', width: '150px', format: '{0:dd-MMM-yyyy hh:mm:ss tt}', filterable: false },
                       { 'field': 'Author', title: 'Created By', width: '150px', filterable: false },
                       { 'field': 'Modified', title: 'Modified On', width: '150px', format: '{0:dd-MMM-yyyy hh:mm:ss tt}', filterable: true  },
                       { 'field': 'ModifiedBy', title: 'Modified By', width: '150px', filterable: true }
                       ]">
                    </div>
                </div>
            </div>
            <div id="viewAuditTrailUser" data-role="window" data-title="Audit Trail" data-width="1300px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" class="no-display" data-actions="false">
                <div class="form-group">                   
                    <div class="pull-right m-b-sm"> 
                        <button class="k-button" data-bind="click: onauditTrailUserGridExcelBtn, disabled: isauditTrailUserGridExportDisabled"><i class="fa fa-file-excel-o m-r-5"></i> EXPORT AS EXCEL</button>
                        <button class="btn k-button" data-bind="click: closeAuditTrailAdmin ">CLOSE</button> 
                    </div>
                    <div class="hr-line-solid clearfix"></div>
                    <h2><span data-bind="text: auditUserName"></span></h2>
                    <div id="auditTrailUserGrid"
                       data-role="grid"
                       data-resizable="false"
                       data-sortable="true"
                       data-scrollable="true"
                       data-auto-bind="false" 
                       data-width="500"
                       data-height="300"
                       data-filterable="{extra: false}"    
                       data-pageable="{pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }"                          
                       data-bind="source: auditTrailUser, events: { dataBound: onGridDataBound, filterMenuInit: userAuditTrailInitFilter }"                              
                       data-columns="[
                       { 'field': 'Version', title: 'Version No.', width: '100px', filterable: true  },
                       { 'field': 'Name', title: 'Name', width: '100px', filterable: false },      
                       { 'field': 'CountryString', title: 'Country', width: '150px', filterable: true },
                       { 'field': 'CountryName', title: 'User Country', template: function (data) { return data.CountryName.join(', '); }, width: '300px', filterable: false, hidden: true },
                       { 'field': 'UserProfile', title: 'User Profile', width: '150px', filterable: true },
                       { 'field': 'UserEntity', title: 'User Entity', width: '150px', filterable: true },
                       { 'field': 'UserStatus', title: 'User Status', width: '100px', filterable: true },                                
                       { 'field': 'Created', title: 'Created On', width: '150px', filterable: false, format: '{0:dd-MMM-yyyy hh:mm:ss tt}' },
                       { 'field': 'Author', title: 'Created By', width: '150px' , filterable: false},
                       { 'field': 'Modified', title: 'Modified On', width: '150px', filterable: true, format: '{0:dd-MMM-yyyy hh:mm:ss tt}' },
                       { 'field': 'ModifiedBy', title: 'Modified By', width: '150px', filterable: true }
                       ]">
                    </div>
                </div>
            </div>                
             <div id="viewUserHistoryNotif" data-role="window" data-title="User Notification History" data-width="1300px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" class="no-display" data-actions="false">
                <div class="form-group">                   
                    <div class="pull-right m-b-sm">                                             
                        <button class="k-button" data-bind="click: onuserNoficationHistoryGridExcelBtn, disabled: isuserNoficationHistoryGridExportDisabled"><i class="fa fa-file-excel-o m-r-5"></i> EXPORT AS EXCEL</button>
                        <button class="btn k-button" data-bind="click: closeAuditTrailAdmin ">CLOSE</button> 
                    </div>
                    <div class="hr-line-solid clearfix"></div>
                    <h2><span data-bind="text: auditUserName"></span></h2>
                    <div id="userNoficationHistoryGrid"
                       data-role="grid"
                       data-resizable="false"
                       data-sortable="true"
                       data-scrollable="true"
                       data-auto-bind="false" 
                       data-width="500"
                       data-height="300"
                       data-filterable="{extra: false}"
                       data-editable="{ mode: 'popup', template: kendo.template($('#productNotifHistoryMetaDataTemplate').html()) }"                                               
                       data-pageable="{ pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }"                          
                       data-bind="source: userNotificationHistory, events: { dataBound: onGridDataBound, edit: userNotifHistoryOnEdit, filterMenuInit: userNotifHistInitFilter }"                              
                       data-columns="[
                        { command: [{ name: 'edit', text: '', imageClass: 'k-icon k-i-file-txt', className: 'command-btn-view' }], 'title': 'View', 'width': '5%', filterable: false, attributes: { 'class': 'text-center' } },                      
                        { field: 'notificationType', title: 'Notification Type', width: '10%', filterable: true},
                        { field: 'initiatorName', title: 'Initiator', width: '15%', filterable: true },
                        { field: 'recipients', title: 'Recipients', width: '55%', filterable: true },                        
                        { field: 'sentDate', title: 'Sent Date', width: '15%', format: '{0:dd-MMM-yyyy hh:mm:ss tt}', filterable: true },
                       ]">
                    </div>
                </div>
            </div>
             <div id="viewProductHistoryNotif" data-role="window" data-title="Product Notification History" data-width="1300px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" class="no-display" data-actions="false">
                <div class="form-group">                   
                    <div class="pull-right m-b-sm">                                             
                        <button class="k-button" data-bind="click: onproductNoficationHistoryGridExcelBtn, disabled: isproductNoficationHistoryGridExportDisabled"><i class="fa fa-file-excel-o m-r-5"></i> EXPORT AS EXCEL</button>
                        <button class="btn k-button" data-bind="click: closeAuditTrailAdmin ">CLOSE</button> 
                    </div>
                    <div class="hr-line-solid clearfix"></div>
                    <h2><span data-bind="text: auditProductName"></span></h2>
                    <div id="productNoficationHistoryGrid"
                       data-role="grid"
                       data-resizable="false"
                       data-sortable="true"
                       data-scrollable="true"
                       data-auto-bind="true" 
                       data-width="500"
                       data-height="300"
                       data-filterable="{extra: false}"
                       data-editable="{ mode: 'popup', template: kendo.template($('#userNotifHistoryMetaDataTemplate').html()) }"                                               
                       data-pageable="{ pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items'} }"                          
                       data-bind="source: productNotificationHistory, events: { dataBound: onGridDataBound, edit: product_NotifHistoryOnEdit, filterMenuInit: productNotifHistInitFilter }"                              
                       data-columns="[
                        { command: [{ name: 'edit', text: '', imageClass: 'k-icon k-i-file-txt', className: 'command-btn-view' }], 'title': 'View', 'width': '5%', filterable: false, attributes: { 'class': 'text-center' } },                      
                        { field: 'notificationType', title: 'Notification Type', width: '10%', filterable: true},
                        { field: 'initiatorName', title: 'Initiator', width: '15%', filterable: true },
                        { field: 'recipientsString', title: 'Recipients', width: '55%', filterable: true },
                        { field: 'recipientsName', title: 'Recipients', template: function (data) { return data.recipientsName.join(',') }, width: '10%', filterable: false, hidden: true },
                        { field: 'sentDate', title: 'Sent Date', width: '15%', format: '{0:dd-MMM-yyyy hh:mm:ss tt}', filterable: true },
                       ]">
                    </div>
                </div>
            </div>
            <!--Pop up Confirmation-->
            <div id="confirmationWindow"></div>
			<div id="confirmCoverLetterEdit" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>Are you sure you want to save changes?</h3>
					<button class="k-primary k-button" data-bind="click: saveCoverLetterChanges">YES</button>
					<button class="k-button" data-bind="click: cancelCoverLetterChanges ">NO</button>
				</div>
			</div>
			<div id="confirmCancelCoverLetterEdit" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>Do you want to cancel?</h3>
					<button class="k-primary k-button" data-bind="click: cancelCoverLetterEdit">YES</button>
					<button class="k-button" data-bind="click: cancelCancelCoverLetterEdit ">NO</button>
				</div>
			</div>
            <div id="generalPrompt" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-actions="false" data-visible="false">
                <div class="text-center">
                    <h3>Processing...</h3>                                                          
                </div>
            </div>
			<div id="cancelStudyEdit" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
					<button class="k-primary k-button" data-bind="click: cancelStudyEdit">YES</button>
					<button class="k-button" data-bind="click: cancelCancelStudyChanges ">NO</button>
				</div>
			</div>
			<div id="confirmStudyEdit" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>Are you sure you want to update study?</h3>
					<button class="k-primary k-button" data-bind="click: saveStudyChanges">YES</button>
					<button class="k-button" data-bind="click: cancelStudyChanges ">NO</button>
				</div>
			</div>
			<div id="confirmINNCreate" class="no-display" data-role="window" data-title="Save PV Database Inn" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>Are you sure you want to save the new PV DATABASE INN?</h3>
					<button class="k-primary k-button" data-bind="click: createINN">YES</button>
					<button class="k-button" data-bind="click: cancelINN ">NO</button>
				</div>
			</div>
			<div id="confirmCancelINNCreate" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
					<button class="k-primary k-button" data-bind="click: confirmINNCancel">YES</button>
					<button class="k-button" data-bind="click: confirmCancelINNStudy ">NO</button>
				</div>
			</div>
			<div id="confirmAWARECreate" class="no-display" data-role="window" data-title="Save AWARE STUDY" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>Are you sure you want to save the new AWARE Study?</h3>
					<button class="k-primary k-button" data-bind="click: createAWARE">YES</button>
					<button class="k-button" data-bind="click: cancelAWARE ">NO</button>
				</div>
			</div>
			<div id="confirmCancelAWARECreate" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
					<button class="k-primary k-button" data-bind="click: confirmAWARECancel">YES</button>
					<button class="k-button" data-bind="click: confirmCancelAWAREStudy ">NO</button>
				</div>
			</div>
			<div id="confirmStudiesCreate" class="no-display" data-role="window" data-title="Save Study Sponsorship" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>Are you sure you want to save the new Study Sponsorship?</h3>
					<button class="k-primary k-button" data-bind="click: createStudySponsorship">YES</button>
					<button class="k-button" data-bind="click: cancelSponsorshipStudy ">NO</button>
				</div>
			</div>
			<div id="confirmCancelStudiesCreate" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
					<button class="k-primary k-button" data-bind="click: confirmSponsorshipStudyCancel">YES</button>
					<button class="k-button" data-bind="click: confirmCancelSponsorshipStudy ">NO</button>
				</div>
			</div>
			<div id="confirmProductCreate" class="no-display" data-role="window" data-title="Save Product Entity" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>Are you sure you want to save the new Product Entity?</h3>
					<button class="k-primary k-button" data-bind="click: createProductEntity">YES</button>
					<button class="k-button" data-bind="click: cancelProductEntity ">NO</button>
				</div>
			</div>
			<div id="confirmCancelProductCreate" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
					<button class="k-primary k-button" data-bind="click: confirmProductEntityCancel">YES</button>
					<button class="k-button" data-bind="click: confirmCancelProductEntity ">NO</button>
				</div>
			</div>
			<div id="confirmUserCreate" class="no-display" data-role="window" data-title="Save User Entity" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>Are you sure you want to save the new User Entity?</h3>
					<button class="k-primary k-button" data-bind="click: createUserEntity">YES</button>
					<button class="k-button" data-bind="click: cancelUserEntity ">NO</button>
				</div>
			</div>
			<div id="confirmCancelUserCreate" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
					<button class="k-primary k-button" data-bind="click: confirmUserEntityCancel">YES</button>
					<button class="k-button" data-bind="click: confirmCancelUserEntity ">NO</button>
				</div>
			</div>
			<div id="confirmMessageEdit" class="no-display" data-role="window" data-title="Save Welcome Message" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>Are you sure you want to save changes?</h3>
					<button class="k-primary k-button" data-bind="click: saveMessageChanges">YES</button>
					<button class="k-button" data-bind="click: cancelMessageChanges ">NO</button>
				</div>
			</div>
			<div id="confirmCancelMessageEdit" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
					<button class="k-primary k-button" data-bind="click: cancelMessageEdit">YES</button>
					<button class="k-button" data-bind="click: cancelCancelMessageEdit ">NO</button>
				</div>
			</div>
			<div id="confirmProductEdit" class="no-display" data-role="window" data-title="Save Product Entity" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>Are you sure you want to save changes?</h3>
					<button class="k-primary k-button" data-bind="click: saveProductChanges">YES</button>
					<button class="k-button" data-bind="click: cancelProductChanges ">NO</button>
				</div>
			</div>
			<div id="confirmCancelProductEdit" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
					<button class="k-primary k-button" data-bind="click: cancelProductEdit">YES</button>
					<button class="k-button" data-bind="click: cancelCancelProductEdit ">NO</button>
				</div>
			</div>
			<div id="confirmSponsorshipEdit" class="no-display" data-role="window" data-title="Save Study Sponsorship" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>Are you sure you want to save changes?</h3>
					<button class="k-primary k-button" data-bind="click: saveSponsorshipChanges">YES</button>
					<button class="k-button" data-bind="click: cancelSponsorshipChanges ">NO</button>
				</div>
			</div>
			<div id="confirmCancelSponsorshipEdit" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
					<button class="k-primary k-button" data-bind="click: cancelSponsorshipEdit">YES</button>
					<button class="k-button" data-bind="click: cancelCancelSponsorshipChanges ">NO</button>
				</div>
			</div>
			<div id="confirmUserEdit" class="no-display" data-role="window" data-title="Save User Entity" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>Are you sure you want to save changes?</h3>
					<button class="k-primary k-button" data-bind="click: saveUserChanges">YES</button>
					<button class="k-button" data-bind="click: cancelUserChanges ">NO</button>
				</div>
			</div>
			<div id="confirmCancelUserEdit" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
					<button class="k-primary k-button" data-bind="click: cancelUserEdit">YES</button>
					<button class="k-button" data-bind="click: cancelCancelUserChanges ">NO</button>
				</div>
			</div>
			<div id="confirmStudiesEdit" class="no-display" data-role="window" data-title="Save AWARE STUDY" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>Are you sure you want to save changes?</h3>
					<button class="k-primary k-button" data-bind="click: saveStudiesChanges">YES</button>
					<button class="k-button" data-bind="click: cancelStudiesChanges ">NO</button>
				</div>
			</div>
			<div id="confirmCancelStudiesEdit" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
					<button class="k-primary k-button" data-bind="click: cancelStudiesEdit">YES</button>
					<button class="k-button" data-bind="click: cancelCancelStudiesChanges ">NO</button>
				</div>
			</div>
			<div id="confirmINNEdit" class="no-display" data-role="window" data-title="Save PV Database Inn" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>Are you sure you want to save changes?</h3>
					<button class="k-primary k-button" data-bind="click: saveINNChanges">YES</button>
					<button class="k-button" data-bind="click: cancelINNChanges ">NO</button>
				</div>
			</div>
			<div id="confirmCancelINNEdit" class="no-display" data-role="window" data-title="GPE - DIL"" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
				<div class="text-center">
					<h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
					<button class="k-primary k-button" data-bind="click: cancelINNEdit">YES</button>
					<button class="k-button" data-bind="click: cancelCancelINNChanges ">NO</button>
				</div>
			</div>
            <div id="confirmStudyLinkUsers"></div>
            <div id="unlinkProdConfirmationWindow"></div>           
            <div id="saveUser" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-actions="false" data-visible="false">
                <div class="text-center">
                    <h3><span data-bind="text: save_prompt"></span></h3>
                    <button class="k-primary k-button" data-bind="click: saveUserData ">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>
                </div>
            </div>
            <div id="generalErrorWin" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-actions="false" data-visible="false">
                <div class="text-center">
                    <h3><span data-bind="text: user_error_text"></span></h3>
                    <button class="k-primary k-button" data-bind="click: closeWindow ">CLOSE</button>                                       
                </div>
            </div>
            <div id="user_statusActivity" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-actions="false" data-visible="false">
                <div class="text-center">
                    <h4>When user is inactive, the products chosen will be unlinked and the user may not be able to access this site. Would you like to proceed?</h4>
                    <button class="k-primary k-button" data-bind="click: user_selectInactive ">YES</button>
                    <button class="k-button" data-bind="click: closeWindowActive ">NO</button>                                     
                </div>
            </div>
            <div id="user_profileConfirm" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-actions="false" data-visible="false">
                <div class="text-center">
                    <h4>When user is not read-only, the products chosen will be unlinked. Do you wish to proceed?</h4>
                    <button class="k-primary k-button" data-bind="click: user_selectProfile ">YES</button>
                    <button class="k-button" data-bind="click: closeWindowProfile ">NO</button>                                     
                </div>
            </div>
             <div id="linkAllProductsConfirm" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-actions="false" data-visible="false">
                <div class="text-center">
                    <h4>Linking all products to this user may take a few seconds to process. Do you wish to proceed?</h4>
                    <button class="k-primary k-button" data-bind="click: linkProductsOnClick ">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>                                     
                </div>
            </div>
             <div id="unlinkAllProductsConfirm" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-actions="false" data-visible="false">
                <div class="text-center">
                    <h4>Unlinking all products to this user may take a few seconds to process. Do you wish to proceed?</h4>
                    <button class="k-primary k-button" data-bind="click: unlinkProductsOnClick ">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>                                     
                </div>
            </div>
            <div id="studyUpdateError" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
                <div class="text-center">
                    <h3><span data-bind="text: study_error_text"></span>.</h3>
                    <button class="k-primary k-button" data-bind="click: closeWindow ">YES</button>                                       
                </div>
            </div>
            <div id="saveStudy" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>Save Studies</h3>
                    <button class="k-primary k-button" data-bind="click: saveWindow ">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>
                </div>
            </div>
            <div id="saveProduct" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>Save Product</h3>
                    <button class="k-primary k-button" data-bind="click: saveWindow ">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>
                </div>
            </div>
            <div id="cancelUser" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
                    <button class="k-primary k-button" data-bind="click: cancelUserWindow ">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>
                </div>
            </div>
            <div id="cancelStudy" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
                    <button class="k-primary k-button" data-bind="click: cancelStudyWindow ">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>
                </div>
            </div>
            <div id="cancelProduct" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>There are unsaved changes in this window. Are sure you want to cancel?</h3>
                    <button class="k-primary k-button" data-bind="click: cancelProductWindow ">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>
                </div>
            </div>
            <div id="confirmSaveUserEntity" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>Are you sure you want to save changes to user entity list?</h3>
                    <button id="saveUserEntity" class="k-primary k-button" data-bind="click: saveUserEntity">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>
                </div>
            </div>
            <div id="confirmSaveAwareINN" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>Are you sure you want to save changes to PV Database INN list?</h3>
                    <button id="saveAwareINN" class="k-primary k-button" data-bind="click: saveAwareINN">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>
                </div>
            </div>
            <div id="confirmStudySponsorship" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>Are you sure you want to save changes to study sponsorship list?</h3>
                    <button id="saveStudySponsorship" class="k-primary k-button" data-bind="click: saveStudySponsorship">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>
                </div>
            </div>
            <div id="confirmProductEntity" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>Are you sure you want to save changes to product entity list?</h3>
                    <button id="saveProductEntity" class="k-primary k-button" data-bind="events: { click: saveProductEntity }">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>
                </div>
            </div>
            <div id="confirmAwareStudyInn" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>Are you sure you want to save changes to AWARE Study list?</h3>
                    <button id="saveAwareStudyInn" class="k-primary k-button" data-bind="events: { click: saveAwareStudyInn }">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>
                </div>
            </div>
            </div>
            <div id="exportExcel" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>Complience Message </h3>
                    <button class="k-button" class="no-display" data-bind="click: closeWindow ">CLOSE</button>
                </div>
            </div>
            <div id="exportPdf" class="no-display" data-role="window" data-title="GPE - DIL"  data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>Complience Message </h3>
                    <button class="k-button" data-bind="click: closeWindow ">CLOSE</button>
                </div>
            </div>
			<div id="metaSuccessMessage" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3><span data-bind="text: meta_success_message"></span></h3>
                    <button class="k-button" data-bind="click: closeWindow ">CLOSE</button>
                </div>
            </div>
			<div id="editWelcomeSuccessMessage" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3><span data-bind="text: welcome_success_message"></span></h3>
                    <button class="k-button" data-bind="click: closeEditWelcomeSuccess ">CLOSE</button>
                </div>
            </div>
			<div id="studySuccessMessage" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3><span data-bind="text: study_success_message"></span></h3>
                    <button class="k-button" data-bind="click: closeWindowStudy ">CLOSE</button>
                </div>
            </div>
            <div id="createStudyError" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3><span data-bind="text: study_error_message"></span></h3>
                    <button class="k-button" data-bind="click: closeWindow ">CLOSE</button>
                </div>
            </div>
            <div id="duplicateStudyId" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3><span data-bind="text: study_error_message"></span></h3>
                    <button class="k-button" data-bind="click: closeWindow ">CLOSE</button>
                </div>
            </div>
            <div id="editStudyError" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3><span data-bind="text: study_error_message"></span></h3>
                    <button class="k-button" data-bind="click: closeWindow ">CLOSE</button>
                </div>
            </div>
            <div id="confirmCreateStudy" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>Are you sure you want to save the new study?</h3>
                    <button class="k-primary k-button" data-bind="click: onSaveStudy ">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>
                </div>
            </div>
            <div id="studyLinkProductError" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>This product is already linked to this study. Please try again.</h3>
                    <button class="k-button" data-bind="click: closeStudyProductError ">OK</button>
                </div>
            </div>
            <div id="confirmEditStudy" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-action="false" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-bind="events: { deactivate: onDeactivateConfirmWindow }">
                <div class="text-center">
                    <h3>Are you sure you want to update the study information?</h3>
                    <button class="k-primary k-button" data-bind="click: updateStudy ">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>
                </div>
            </div>
            <div id="confirmCreateProduct" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-bind="events: { deactivate: onDeactivateConfirmWindow }" data-action="false">
                <div class="text-center">
                    <h3>Please allow up to a minute for the system to propagate all changes. Are you sure you want to save the new product?</h3>
                    <button class="k-primary k-button" data-bind="click: product_onSaveProduct ">YES</button>
                    <button class="k-button" data-bind="click: closeWindow ">NO</button>
                </div>
            </div>
            <div id="createProductError" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>Create Product Error</h3>
                    <button class="k-primary k-button" data-bind="click: closeWindow ">OK</button>
                </div>
            </div>
            <div id="missingFieldsError" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false" data-action="false">
                <div class="text-center">
                    <h3>Please satisfy all required fields.</h3>
                    <button class="k-primary k-button" data-bind="click: closeWindow ">OK</button>
                </div>
            </div>
            
         </div>
         <div id="confirm-primary-product" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-height="auto" data-resizable="false" data-modal="true" data-visible="false" data-action="false">
             <div class="confirm-message text-center">
                 <h3>Do you want to make this your Primary Investigational Product?</h3>
                 <button class="k-primary k-button" data-bind="click: makePrimary">Yes</button>
                 <button class="k-button" data-bind="click: closeWindow">No</button>
             </div>
         </div>
		 <div id="confirm-edit-primary-product" class="no-display" data-role="window" data-title="GPE - DIL" data-width="360px" data-height="auto" data-resizable="false" data-modal="true" data-visible="false" data-action="false">
             <div class="confirm-message text-center">
                 <h3>Do you want to make this your Primary Investigational Product?</h3>
                 <button class="k-primary k-button" data-bind="click: makeEditPrimary">Yes</button>
                 <button class="k-button" data-bind="click: closeWindow">No</button>
             </div>
         </div>
        <div id="editProductFolderText" class="no-display" data-role="window" data-title="GPE - DIL" data-width="800px" data-height="160px" data-action="false" data-resizable="false" data-modal="true" data-visible="false">
            <div class="text-center">
                <textarea rows="5" cols="50" type="textbox" class="form-control" data-bind="value: product_folder_temp, events: { change: product_onProductTempChange }" style="resize: none;"></textarea>
                <div class="m-t-md clearfix"></div>
                <button class="k-primary k-button" data-bind="click: saveProductFolderTxtName">Save</button>
                <button class="k-button" data-bind="click: closeWindow ">Cancel</button>
            </div>
        </div>
        <div id="removeUserProductWin" class="no-display">
             <div class="text-center">
                 <h3>Unlink this product?</h3>
                 <button id="Uyes" class="k-primary k-button">Yes</button>
                 <button id="Uno" class="k-button">No</button>
             </div>
        </div>
        <div id="metaErrorMessage" data-role="window" data-title="GPE - DIL" data-width="360px" data-resizable="false" data-height="auto" data-modal="true" data-visible="false"  data-actions="false">
            <div class="text-center">
                <h3><span data-bind="text: metadata_error_message"></span></h3>
                <button class="k-button" data-bind="click: closeWindow ">CLOSE</button>
            </div>
        </div>        
        <div id="addAwareINNWindow" data-role="window" data-title="New PV DATABASE INN" data-width="400px" data-actions="false" data-resizable="false" data-height="245" data-modal="true" data-visible="false">
            <form data-role="validator" novalidate="novalidate">                
                <div class="form-group pull-right">
                    <button class="k-primary k-button" data-bind="click: validateCreateAwareINN"> <span class="k-icon k-i-save"></span> Save</button>
                    <button class="k-button" data-bind="click: cancelAddINN "><span class="k-icon k-i-cancel"></span> Cancel</button>
                </div>
                <div class="hr-line-solid clearfix"></div>
                <div class="col-sm-11">
                    <div class="form-group">
                        <label>PV DATABASE INN<span class="required"> *</span></label>
                        <input type="text" data-bind="value: aware_inn, events: { change: trimAWAREINN }" class="form-control" id="aware_inn" name="aware_inn" placeholder="PV DATABASE INN"  required data-required-msg="PV DATABASE INN is required"/>
                  </div>
               </div>
                <div class="col-sm-11">
                    <div class="form-group">
                        <label>Source<span class="required"> *</span></label>                        
                        <select name="sourceInn" id="sourceInn" data-role="dropdownlist" required data-required-msg="Source is required" data-text-field="SourceInn"
                              data-value-field="SourceInn" data-bind="value: source_inn, source: sourceInn_drp" class="form-control"></select>
                  </div>
               </div>                 
            </form>
         </div>
        <script id="welcomemessage" type="text/x-kendo-template">
            <a class="k-button k-edit-button command-btn" data-bind="click: editMessage" href="\\#"><span class="k-icon k-i-edit"></span></a>  
        </script>
         <script id="awareinntemplate" type="text/x-kendo-template">
            <button id="addbtnawarestudies" class="k-button k-button-icontext" data-bind="click: addAwareINN"><span class="k-icon k-i-add"></span>Add New Content</button>
            <div class="pull-right">
                <div class="form-inline">
                    <div class="input-group clearable-input grid-search">
                        <input id="searchInputAwareInn" data-bind="value: awareINNInput, events: { keyup: onSearchKeyUp }" data-value-update="input" type="text" placeholder="Search" class="k-textbox m-xxs"> 
                        <span data-clear-input class="k-icon k-i-close"></span>
                        <button type="button" class="btn btn-sm k-button search-button" data-bind="click: onSearchAWAREINN"><span class="k-icon k-i-search"></span></button>
                    </div>
                </div>
            </div>
        </script>
		<script id="awareinnaction" type="text/x-kendo-template">
			<a class="k-button k-edit-button command-btn" data-bind="click: editAWAREINN" href="\\#"><span class="k-icon k-i-edit"></span></a>  
		</script>
		<div id="addAwareStudiesWindow" data-role="window" data-title="New AWARE Studies" data-width="400px" data-actions="false" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
            <form data-role="validator" novalidate="novalidate">               
                <div class="form-group pull-right">
                    <button class="k-primary k-button" data-bind="click: validateCreateAwareStudies"> <span class="k-icon k-i-save"></span> Save</button>
                    <button class="k-button" data-bind="click: cancelAddAWAREStudies "><span class="k-icon k-i-cancel"></span> Cancel</button>
                </div>
                <div class="hr-line-solid clearfix"></div>
                <div class="col-sm-11">
                    <div class="form-group">
                        <label>Study<span class="required"> *</span></label>
                        <input type="text" data-bind="value: study_inn, events: { change: trimStudyINN }" class="form-control" id="study_inn" name="study_inn" placeholder="Study"  required data-required-msg="Study is required"/>
                    </div>
                </div>
                <div class="col-sm-11">
                    <div class="form-group">
                        <label>Drug Name<span class="required"> *</span></label>
                        <input type="text" data-bind="value: drug_name, events: { change: trimDrugName }" class="form-control" id="drug_name" name="drug_name" placeholder="Drug Name"  required data-required-msg="Drug Name is required"/>
                    </div>
                </div>
            </form>
        </div>
         <script id="awarestudiestemplate" type="text/x-kendo-template">
            <button id="addbtnawarestudies" class="k-button k-button-icontext" data-bind="click: addAwareStudies"><span class="k-icon k-i-add"></span>Add New Content</button>
            <div class="pull-right">
                <div class="form-inline">
                    <div class="input-group clearable-input grid-search">
                        <input id="searchInputStudyInn" data-bind="value: studyINNInput, events: { keyup: onSearchKeyUp }" data-value-update="input" type="text" placeholder="Search" class="k-textbox m-xxs"> 
                        <span data-clear-input class="k-icon k-i-close"></span>
                        <button type="button" class="btn btn-sm k-button search-button" data-bind="click: onSearchStudiesINN"><span class="k-icon k-i-search"></span></button>
                    </div>
                </div>
            </div>
        </script>
         <script id="awarestudiesaction" type="text/x-kendo-template">
            <a class="k-button k-edit-button command-btn" data-bind="click: editStudyINN" href="\\#"><span class="k-icon k-i-edit"></span></a>  
         </script>
         <div id="addUserEntityWindow" data-role="window" data-title="New User Entity" data-width="400px" data-actions="false" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
            <form data-role="validator" novalidate="novalidate">
                <div class="form-group pull-right">
                    <button class="k-primary k-button" data-bind="click: validateCreateUserEntity"> <span class="k-icon k-i-save"></span> Save</button>
                    <button class="k-button" data-bind="click: cancelAddUserEntity "> <span class="k-icon k-i-cancel"></span> Cancel</button>
                </div>
                 <div class="hr-line-solid clearfix"></div>
                <div class="col-sm-11">
                    <div class="form-group">
                        <label>Company Name<span class="required"> *</span></label>
                        <input type="text" data-bind="value: user_entity_company_name, events: { change: trimUserEntity }" class="form-control" id="user_entity_company_name" name="user_entity_company_name" placeholder="Company Name"  required data-required-msg="Company Name is required"/>
                    </div>
                </div>              
            </form>
         </div>
         <script id="userentitytemplate" type="text/x-kendo-template">
            <button id="addbtnuserentity" class="k-button k-button-icontext" data-bind="click: addUserEntity"><span class="k-icon k-i-add"></span>Add New Content</button>
                     <div class="pull-right">
                <div class="form-inline">
                    <div class="input-group clearable-input grid-search">
                        <input id="searchInputUserEntity" data-bind="value: userEntityInput, events: { keyup: onSearchKeyUp }" type="text" placeholder="Search" data-value-update="input" class="k-textbox m-xxs">
                        <span data-clear-input class="k-icon k-i-close"></span>
                        <button type="button" class="btn btn-sm k-button search-button" data-bind="click: onSearchUserEntity"><span class="k-icon k-i-search"></span></button>
                    </div>
                </div>
            </div>
        </script>
         <script id="userentityaction" type="text/x-kendo-template">
            <a class="k-button k-edit-button command-btn" data-bind="click: editUserEntity" href="\\#"><span class="k-icon k-i-edit"></span></a>  
         </script>
         <div id="addStudySponsorshipWindow" data-role="window" data-title="New Study Sponsorship" data-width="400px" data-actions="false" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
            <form data-role="validator" novalidate="novalidate">              
               <div class="form-group pull-right">
                  <button class="k-primary k-button" data-bind="click: validateCreateStudySponsorship"> <span class="k-icon k-i-save"></span> Save</button>
                  <button class="k-button" data-bind="click: cancelAddStudySponsorship "><span class="k-icon k-i-cancel"></span> Cancel</button>
               </div>
               <div class="hr-line-solid clearfix"></div>
               <div class="col-sm-11">
                  <div class="form-group">
                     <label>Company Name<span class="required"> *</span></label>
                     <input type="text" data-bind="value: sponsorship_company_name, events: { change: trimStudySponsorship }" class="form-control" id="sponsorship_company_name" name="sponsorship_company_name" placeholder="Company Name"  required data-required-msg="Company Name is required"/>
                  </div>
               </div>               
            </form>
         </div>
         <script id="studysponsorshiptemplate" type="text/x-kendo-template">
            <button id="addbtnstudysponsorship" class="k-button k-button-icontext" data-bind="click: addStudySponsorship"><span class="k-icon k-i-add"></span>Add New Content</button>
            <div class="pull-right">
                <div class="form-inline">
                    <div class="input-group clearable-input grid-search">
                        <input id="searchInputSponsorship" data-bind="value: studySponsorshipInput, events: { keyup: onSearchKeyUp }" type="text" placeholder="Search" data-value-update="input" class="k-textbox m-xxs">
                        <span data-clear-input class="k-icon k-i-close"></span>
                        <button type="button" class="btn btn-sm k-button search-button" data-bind="click: onSearchStudySponsorship"><span class="k-icon k-i-search"></span></button>
                    </div>
                </div>
            </div>
        </script>
         <script id="studysponsorshipaction" type="text/x-kendo-template">
            <a class="k-button k-edit-button command-btn" data-bind="click: editStudySponsorship" href="\\#"><span class="k-icon k-i-edit"></span></a>  
         </script>
         <div id="addProductEntityWindow" data-role="window" data-title="New Product Entity" data-width="400px" data-actions="false" data-resizable="false" data-height="auto" data-modal="true" data-visible="false">
            <form data-role="validator" novalidate="novalidate">                
                <div class="form-group pull-right">
                    <button class="k-primary k-button" data-bind="click: validateCreateProductEntity"> <span class="k-icon k-i-save"></span> Save</button>
                    <button class="k-button" data-bind="click: cancelAddProductEntity "><span class="k-icon k-i-cancel"></span> Cancel</button>
                </div>
                <div class="hr-line-solid clearfix"></div>
               <div class="col-sm-11">
                  <div class="form-group">
                     <label>Company Name<span class="required"> *</span></label>
                     <input type="text" data-bind="value: company_name, events: { change: trimProductEntity }" class="form-control" id="company_name" name="company_name" placeholder="Company Name"  required data-required-msg="Company Name is required"/>
                  </div>
               </div>
            </form>
         </div>
         <script id="productentitytemplate" type="text/x-kendo-template">
            <button id="addbtnuseful" class="k-button k-button-icontext" data-bind="click: addProductEntity"><span class="k-icon k-i-add"></span>Add New Content</button>
            <div class="pull-right">
                <div class="form-inline">
                    <div class="input-group clearable-input grid-search">
                        <input id="searchInputProductEntity" data-bind="value: productEntityInput, events: { keyup: onSearchKeyUp }" type="text" placeholder="Search" data-value-update="input" class="k-textbox m-xxs">
                        <span data-clear-input class="k-icon k-i-close"></span>
                        <button type="button" class="btn btn-sm k-button search-button" data-bind="click: onSearchProductEntity"><span class="k-icon k-i-search"></span></button>
                    </div>
                </div>
            </div>
        </script>
         <script id="productentityaction" type="text/x-kendo-template">
            <a id="prodentityeditbtn" class="k-button k-edit-button command-btn" data-bind="click: editProductEntity" href="\\#"><span class="k-icon k-i-edit"></span></a>  
         </script>
        <div id="okWindow"></div>
         <script type="text/x-kendo-template" id="okWindowTemplate">
            <div class="float-e-margins">
            <div class="text-center">
                <h3>#:msg#</h3>
                <button class="k-button" id="closeOkWindow">OK</button>
            </div>
         </script>
        <div id="yesNoWindow"></div>
        <script type="text/x-kendo-template" id="yesNoWindowTemplate">
            <div class="float-e-margins">
            <div class="text-center">
                <h3>#:msg#</h3>
                <button class="k-button k-primary" id="yesWindow">YES</button>
                <button class="k-button" id="noWindow">NO</button>
            </div>
         </script>
        <script type="text/x-kendo-template" id="yesNoH4WindowTemplate">
            <div class="float-e-margins">
            <div class="text-center">
                <h4>#:msg#</h4>
                <button class="k-button k-primary" id="yesWindow">YES</button>
                <button class="k-button" id="noWindow">NO</button>
            </div>
         </script>
        <script type="text/x-kendo-template" id="exportWindowTemplate">
            <div class="float-e-margins">
            <div class="text-center">
                <h4>#:disclaimer#</h4>
                <h4>#:msg#</h4>
                <button class="k-button k-primary" id="yesWindow">YES</button>
                <button class="k-button" id="noWindow">NO</button>
            </div>
         </script>
        <div id="waitingWindow"></div>
        <script type="text/x-kendo-template" id="waitingWindowTemplate">
            <div class="float-e-margins">
            <div class="text-center">
                <h3>#:msg#</h3>
            </div>
        </script>
          <script type="text/x-kendo-template" id="studyUserLinkTemplate">
            <div class="float-e-margins">
            <div class="text-center">
                <h3>#:msg#</h3>
                <button class="k-button k-primary" id="StudyUserYES">YES</button>
                <button class="k-button" id="StudyUserNO">NO</button>
            </div>
         </script>
		<div id="successWindow"></div>
        <script type="text/x-kendo-template" id="successWindowTemplate">
			<div class="float-e-margins">
			<div class="text-center">
				<h3>#:msg#</h3>
				<button class="k-button" id="closeSuccessWindow">OK</button>
			</div>
        </script>
         <script id="linkuserbtn" type="text/x-kendo-template">
            <button class="k-button k-button-icontext" name="product_createUser" data-bind="click: product_onCreateUserOfCreateProduct"><span class="k-icon k-i-add"></span> Create User</button>
         </script>
         <script id="linktouserstudy" type="text/x-kendo-template">
            <button class="k-button k-button-icontext" name="study_LinkProduct" data-bind="click: study_LinkProducts"><span class="k-icon k-i-hyperlink-insert"></span> Link Products</button>
            <button class="k-button k-button-icontext" name="study_LinkUser" data-bind="click: study_onCreateUserOfCreateStudy"><span class="k-icon k-i-add"></span> Create User</button>
            <button class="k-button k-button-icontext" name="study_CreateNewProduct" data-bind="click: study_onCreateProductOfCreateStudy"><span class="k-icon k-i-add"></span> Create New Product</button>
         </script>
		 <script id="linktousercreatestudy" type="text/x-kendo-template">
            <button class="k-button k-button-icontext" name="studyCreate_LinkProduct" data-bind="click: studyCreate_LinkProducts"><span class="k-icon k-i-hyperlink-insert"></span> Link Products</button>
            <button class="k-button k-button-icontext" name="studyCreate_LinkUser" data-bind="click: study_onCreateUserOfCreateStudy"><span class="k-icon k-i-add"></span> Create User</button>
            <button class="k-button k-button-icontext" name="studyCreate_CreateNewProduct" data-bind="click: study_onCreateProductOfCreateStudy"><span class="k-icon k-i-add"></span> Create New Product</button>
         </script>
         <script id="addnewuserbtn" type="text/x-kendo-template">
            <a class="k-button k-button-icontext k-grid-add" href="\#"><span class="k-icon k-i-add"></span>Add New Product </a>
         </script>
         <script id="createprodbtn" type="text/x-kendo-template">
            <button type="button" class="k-primary k-button" data-bind="click: confirmCreatePrd">Create Product</button>
         </script>
         <script id="createstudybtn" type="text/x-kendo-template">
            <button type="button" class="k-primary k-button" data-bind="click: confirmCreateStudy">Create Study</button>
         </script>
         <script id="createuserbtn" type="text/x-kendo-template">
            <button type="button" class="k-primary k-button" data-bind="click: confirmCreateNewUser">Create User</button>
         </script>
         <script id="boxtemplate" type="text/x-kendo-tmpl" >
            <li class="list-group-item">#:dilProductName#</li>
         </script>
         <script id="productListViewUserTemplate" type="text/x-kendo-tmpl">
            <li class="list-group-item">#:userName#</li>
         </script>
         <script id="productListViewUserProductTemplate" type="text/x-kendo-tmpl">
            <li class="list-group-item">
                <div class="btn-group">
                    <label class="radio radio-inline" style="margin-left: 4px"><input type="radio" name="access#:id#" data-bind="checked: access" class="blindedselector" value="Blinded">B</label>
                    <label class="radio radio-inline" style="margin-left: 4px"><input type="radio" name="access#:id#" data-bind="checked: access" class="unblindedselector" value="Open">U</label>
                </div>
                <span class="list-vertical">&nbsp;&nbsp;#:userName#</span>
            </li>
         </script>
         <script id="productListViewUserProductEditTemplate" type="text/x-kendo-tmpl">
            <li class="list-group-item">
                <div class="btn-group">
                    <label class="radio radio-inline" style="margin-left: 4px"><input type="radio" name="access#:userRefId#" data-bind="checked: access" class="blindedselector" value="Blinded">B</label>
                    <label class="radio radio-inline" style="margin-left: 4px"><input type="radio" name="access#:userRefId#" data-bind="checked: access" class="unblindedselector" value="Open">U</label>
                </div>
                <span class="list-vertical">&nbsp;&nbsp;#:userName#</span>
            </li>
         </script>
         <script id="linkproductsbtn" type="text/x-kendo-template">                                
            <button class="k-button k-button-icontext" data-bind="click: product_onLinkProductsAvailable, disabled: user_linkProductDisabled"><span class="k-icon k-i-hyperlink-insert"></span>&nbsp;Link Product</button>
         </script>
         <script id="userRightsAccessRange" type="text/x-kendo-template">                                
            <%--<button class="k-button k-button-icontext" data-bind="click: openUserAccessTimeRange"><span class="k-icon k-i-calendar"></span> Filter Date</button>--%>
             <div class="form-inline p-xs">
               <label for="filterdate" class="control-label">Specify Date Range</label>
                    <div class="form-group">
                        <input id="userAccessDateFro" placeholder="User Access Date From" data-role="datepicker" data-format="dd-MMM-yy" data-bind="visible: isVisible, enabled: isEnabled, value: userAccessRangeFrom">
                    </div>
                    <div class="form-group">
                        <input id="userAccessDateTo" placeholder="User Access Date To" data-role="datepicker" data-format="dd-MMM-yy" data-bind="visible: isVisible, enabled: isEnabled, value: userAccessRangeTo">
                    </div>
                 <button class="btn btn-sm k-button" data-bind="click: queryDateRangeValues">Search</button>
                <button class="k-button k-button-icontext" data-bind="click: resetUserAccessLog">Reset</button> 
             </div>
         </script>
         <script id="boxtemplate_linked" type="text/x-kendo-tmpl" >
             <li class="list-group-item">
                <div class="frb-default">
                  <label class="radio radio-inline"><input type="radio" name="access#:refID#" data-bind="checked: access" class="blindedselector" value="Blinded">B</label>
                  <label class="radio radio-inline"><input type="radio" name="access#:refID#" data-bind="checked: access" class="unblindedselector" value="Open">U</label>
                  <label class="list-vertical"><span class="frb-description">#:dilProductName#</span></label>
                </div>
             </li>
         </script>
         <script id="icontemplate" type="text/x-kendo-template">
            <a class="k-button k-edit-button command-btn" data-bind="click: openUserWindowEdit, disabled: userWindowEditDisabled" href="\\#"><span class="k-icon k-i-edit"></span></a>
            <a class="k-button k-delete-button command-btn-email" data-bind="click: user_sendEmailRequest" href="\\#""><i class="fa fa-envelope"></i></a>
         </script>
         <script id="studyedittemplate" type="text/x-kendo-template">
            <a class="k-button k-edit-button command-btn" data-bind="click: studyOpenEditWindow" href="\\#"><span class="k-icon k-i-edit"></span></a>  
         </script>
         <script id="createstudyproductedittemplate" type="text/x-kendo-template">
            <a class="k-button k-edit-button" data-bind="click: study_onEditOfCreateStudy" href="\\#"><span class="k-icon k-i-edit"></span></a>
         </script>
         <script type="text/x-kendo-template" id="windowTemplate">
            <div class="text-center">
                <h3>Please allow up to a minute for the system to propagate all changes.</h3>
                <h3>Unlink this user? This will remove the user's access rights to this product.</h3>
                <button class="k-primary k-button" id="yesButton">Yes</button>
                <button class="k-button" id="noButton"> No</button>
            </div>
         </script>
		 <script type="text/x-kendo-template" id="removeStudyProduct">
            <div class="text-center">
                <h3>Unlink this product?</h3>
                <button class="k-primary k-button" id="yesButton">Yes</button>
                <button class="k-button" id="noButton"> No</button>
            </div>
         </script>
         <script type="text/x-kendo-template" id="userWindowTemp">
            <div class="text-center">
                <h3>On unlinking this product, please allow up to a minute for the system to propagate. Do you wish to proceed?</h3>
                <button class="k-primary k-button" id="userYesButton">Yes</button>
                <button class="k-button" id="userNoButton"> No</button>
            </div>
         </script>         
         <script id="usersearchtemplate" type="text/x-kendo-template">
            <div class="pull-right">
                <div class="form-inline">
                    <div class="input-group clearable-input grid-search">
                        <input id="searchInputUser" data-bind="value: userInput, events: { keyup: onSearchKeyUp }" type="text" placeholder="Search User" data-value-update="input" class="k-textbox m-xxs">
                        <span data-clear-input class="k-icon k-i-close"></span>
                        <button type="button" class="btn btn-sm k-button search-button" data-bind="click: onSearchUserGrid"><span class="k-icon k-i-search"></span></button>
                    </div>
                </div>
            </div>
         </script>
         <script id="studysearchtemplate" type="text/x-kendo-template">
            <div class="pull-right">
                <div class="form-inline">
                    <div class="input-group clearable-input grid-search">
                        <input id="searchInputStudy" data-bind="value: studyInput, events: { keyup: onSearchKeyUp }" type="text" placeholder="Search Study" data-value-update="input" class="k-textbox m-xxs">
                        <span data-clear-input class="k-icon k-i-close"></span>
                        <button type="button" class="btn btn-sm k-button search-button" data-bind="click: onSearchStudyGrid"><span class="k-icon k-i-search"></span></button>
                    </div>
                </div>
            </div>
         </script>
         <script id="dilsproductsearchtemplate" type="text/x-kendo-template">
            <div class="pull-right">
                <div class="form-inline">
                    <div class="input-group clearable-input grid-search">
                        <input id="searchInputProduct" data-bind="value: dilsProductInput, events: { keyup: onSearchKeyUp }" type="text" placeholder="Search Product" data-value-update="input" class="k-textbox m-xxs">
                        <span data-clear-input class="k-icon k-i-close"></span>
                        <button type="button" class="btn btn-sm k-button search-button" data-bind="click: onSearchDilsProductGrid"><span class="k-icon k-i-search"></span></button>
                    </div>
                </div>
            </div>
         </script>
         <script id="studyprotocolproductstatus" type="text/x-kendo-template">
            <div class="pull-right">
                <div class="form-inline">
                    <div class="input-group"><input data-bind="value: studyProtocolProductStatusInput, events: { keyup: onSearchKeyUp }" data-value-update="input" type="text" placeholder="Search" class="k-textbox m-xxs"> 
                    <button type="button" class="btn btn-sm k-button" data-bind="click: onSearchStudyProtocolProductStatus"><span class="k-icon k-i-search"></span></button> </div>
                </div>
            </div>
         </script>
         <script id="userdetailTemplate" type="text/x-kendo-tmpl">
            <div class="user-grid-detail"></div>                               
         </script>                            
         <script id="userdetailTemplaterowtemplate" type="text/x-kendo-tmpl">
            <tr> 
                <td> #=ProductName# </td>
                <td> #=Productstatus# </td>
                <td> 
                    <div class="edit-buttons">
                        <a class="k-button k-edit-button" href="\\#"><span class="k-icon k-i-edit"></span></a>
                        <a class="k-button k-delete-button" href="\\#"><span class="k-icon k-delete"></span></a>
                    </div>                                   
                </td>
            </tr>
         </script>
         <script id="dilsProductDetailTemplate" type="text/x-kendo-tmpl">
            <div class="product-grid-detail"></div>
         </script>
         <script id="studyProductDetailTemplate" type="text/x-kendo-tmpl">
            <div class="study-product-grid-detail"></div>
         </script>        
         <script id="editlinkeduserproduct" type="text/x-kendo-tmpl">
              <label>User</label>
                <div class="row">
                   <div class="col-lg-11">
                      <div class="form-group">
                         <input type="text" data-bind="value: userName" class="form-control" name="userName" disabled/>
                      </div>
                   </div>
                </div>
                <label>Status</label>
                <div class="row">
                   <div class="col-lg-11">
                      <div class="form-group">
                        <div class="checkbox checkbox-inline">
                                <input type="checkbox" name="product_access_create_product" id="product_link_user_window_blinded_edit" value="Blinded" class="">
                                <label class="" for="product_link_user_window_blinded_edit">Blinded</label>
                            </div>
                            <div class="checkbox checkbox-inline">
                                <input type="checkbox" name="product_access_create_product" id="product_link_user_window_open_edit" value="Open" class="">
                                <label class="" for="product_link_user_window_open_edit">Unblinded</label>
                            </div>
                      </div>
                   </div>
                </div>
         </script>
         <script id="productEditUserProductTemplate" type="text/x-kendo-tmpl">
              <label>User</label>
                <div class="row">
                   <div class="col-lg-11">
                      <div class="form-group">
                        <input type="text" data-bind="value: userName" class="form-control" name="userName" disabled/>
                      </div>
                   </div>
                </div>
                <label>Status</label>
                <div class="row">
                   <div class="col-lg-11">
                      <div class="form-group">
                        <div class="checkbox checkbox-inline">
                                <input type="checkbox" name="product_access_create_product" id="product_link_user_window_blinded_edit" value="Blinded" class="">
                                <label class="" for="product_link_user_window_blinded_edit">Blinded</label>
                            </div>
                            <div class="checkbox checkbox-inline">
                                <input type="checkbox" name="product_access_create_product" id="product_link_user_window_open_edit" value="Open" class="">
                                <label class="" for="product_link_user_window_open_edit">Unblinded</label>
                            </div>
                      </div>
                   </div>
                </div>
         </script>
		 <script id="studyeditproduct" type="text/x-kendo-template">
		 <form data-role="validator" novalidate="novalidate">
			<div id="editUserlistgroup">
				<div class="animated fadeInDown">
					<div class="k-edit-buttons k-state-default" style="border-width: 0px;">
						<a role="button" class="k-button k-button-icontext k-primary" id="saveLinkUser" name="saveLinkUser"><span class="k-icon k-i-save"></span> Save</a>
						<a role="button" class="k-button k-button-icontext" id="cancelLinkUser" name="cancelLinkUser"><span class="k-icon k-i-cancel"></span> Cancel</a>
					</div>
					<div class="hr-line-solid clearfix"></div>
					<h3>DIL Product: <b> #=dilProduct# </b></h3>
					<div id="listgroup">
						<div class="dual-list list-left col-md-5">
							<h3>Users</h3>
							<div class="well">
                                    <div class="input-group clearable-input-edit grid-search">
                                       <input name="searchStudyInputUsers" type="text" placeholder="User Name" class="k-textbox m-r-xs w-306">
                                        <span data-clear-input class="k-icon k-i-close" style="top:10px; right: 75px"></span>
                                        <button class="btn btn-sm  k-button search-button" type="button" name="searchStudyUsers">Search</button>
                                    </div>
									<ul id="availableusers_listview" name="availableusers_listview" data-bind="source: product_user_list_all" class="list-group" style="height: 300px; overflow: scroll;"></ul>
                                </div>
							</div>
						</div>
						<div class="list-arrows col-md-1 text-center">
							<label>Link All</label>
							<button name="linkall" title="Link All" type="button" class="k-button atr"><span class="glyphicon glyphicon-list"></span> <span class="glyphicon glyphicon-chevron-right"></span></button>
							<label>Unlink All</label>
							<button name="unlinkall" title="Unlink All" type="button" class="k-button atl" data-type="atl"><span class="glyphicon glyphicon-chevron-left"></span> <span class="glyphicon glyphicon-list"></span></button>
							<label>Unlink</label>
							<button name="unlink" title="Unlink" class="k-button move-left">
							<span class="glyphicon glyphicon-chevron-left"></span>
							</button>
							<label>Link</label>
							<button name="link" title="Link" class="k-button move-right">
							<span class="glyphicon glyphicon-chevron-right"></span>
							</button>                                        
						</div>
						<div class="dual-list list-right col-md-5">
							<h3>Linked Users</h3>
							<div class="well">
                                   <div class="input-group clearable-input-edit grid-search">
                                       <input type="text"  class="k-textbox m-r-xs w-306" name="searchStudyLinkedUsers" placeholder="User Name"/>
                                        <span data-clear-input class="k-icon k-i-close" style="top:10px; right: 75px"></span>
                                        <button type="button" class="btn btn-sm k-button search-button" name="searchStudyLinkedUsers">Search</button>
                                    </div>
									<ul id="selectedusers_listview" name="selectedusers_listview" data-bind="source: product_user_product_list" class="list-group" style="height: 300px; overflow: scroll;"></ul>
                                </div>
							</div>
						</div>
					</div>
				</div>
            </div>
		 </form>
         </script>
		 <script id="studyUserListTemplate" type="text/x-kendo-tmpl">
            <li class="list-group-item">#:userName#</li>
         </script>
		 <script id="studyLinkedUserTemplate" type="text/x-kendo-tmpl" >
            <li class="list-group-item">
                <div class="btn-group">
                    <label class="radio radio-inline" style="margin-left: 4px"><input type="radio" name="access#:userRefId#" data-bind="checked: access" class="blindedselector" value="Blinded">B</label>
                    <label class="radio radio-inline" style="margin-left: 4px"><input type="radio" name="access#:userRefId#" data-bind="checked: access" class="unblindedselector" value="Open">U</label>
                </div>
                <span class="list-vertical">&nbsp;&nbsp;#:userName#</span>
            </li>
         </script>
         <script id="productEditTemplate" type="text/x-kendo-template">
            <form data-role="validator" novalidate="novalidate">
             <div class="boxFix">
                <div class="col-xs-12 col-md-12 b-r" name="retire-msg-associated" style="margin-bottom: 8px; margin-top: -8px; display: none;">
                    <span class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" data-for="retired" role="alert"><span class="k-icon k-i-warning"> </span> Unable to retire. Product is associated to a Study.</span>
                    <br/>
                </div>
                <div class="col-xs-12 col-md-12 b-r" name="retire-msg-pending" style="margin-bottom: 8px; margin-top: -8px; display: none;">
                    <span class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" data-for="retired" role="alert"><span class="k-icon k-i-warning"> </span> Unable to retire. Product is still being processed.</span>
                    <br/>
                </div>
                <div class="col-xs-6 col-md-4 b-r">
                    <div class="form-group clearable-input-edit">
                        <label>Product Code</label>
                        <input type="text" data-bind="value: code" class="form-control" name="code" placeholder="Product Code" maxlength="255" />
                        <span data-clear-input class="k-icon k-i-close"></span>
                    </div>
                    <div class="form-group clearable-input-edit">
                        <label>Product Nick Name</label>
                        <input type="text" data-bind="value: nickname" class="form-control" name="nickname" placeholder="Product Nick Name" maxlength="255"/>
                        <span data-clear-input class="k-icon k-i-close"></span>
                    </div>
                </div>
                <div class="col-xs-6 col-md-4 b-r">
                    <div class="form-group">
                        <label>PV Database INN  <span class="required"> *</span></label>
                        <input name="inn" class="form-control" required data-required-msg="Select PV Database INN" maxlength="255"/>
                        <span class="k-invalid-msg" data-for="inn"></span>
                    </div>
                    <div class="form-group">
                        <label>Product Entity <span class="required"> *</span></label>
                        <input name="entity" class="form-control"/>
                        <span class="k-invalid-msg" data-for="entity"></span>
                    </div>
                </div>
                <div class="col-xs-6 col-md-4">
                    <div class="form-group">
                        <label>DIL Product</label>
                        <input type="text" class="form-control" name="dilProduct" placeholder="DIL Product" readonly maxlength="255"/>
                        <button name="viewCompleteText" data-icon="edit" class="form-control k-button" style="margin-top: 10px;">
                            <span class="k-icon k-i-edit"></span>View Complete Text
                        </button>
                    </div>
                    <div class="form-group">
                        <label>Retire</label>
                        <input type="checkbox" name="retired" value="retired" class="" disabled>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="form-group">
                    <div class="m-sm">
                    <button class="k-button p-sm k-button-icontext" name="product_createUser"><span class="k-icon k-i-add"></span> Create User</button>
                    </div>
                        <div class="animated fadeInDown">
                                <div id="">
                                <div class="dual-list list-left col-md-5">
                                    <h3>Users</h3>
                                    <div class="well">
                                         <div class="input-group clearable-input-edit grid-search">
                                            <input type="text" class="k-textbox m-r-xs w-280" name="searchProductInputUsers" placeholder="User Name"/>
                                            <span data-clear-input class="k-icon k-i-close" style="top:10px; right: 75px"></span>
                                            <button type="button" class="btn btn-sm k-button search-button" name="searchProductUsers">Search</button>
                                        </div>
                                        <ul id="availableUsers"
											class="list-group product-users-listview"
                                            style="height: 300px; overflow: scroll;"
                                            data-bind="source: product_user_list_all">
                                        </ul>
                                    </div>
                                </div>
                                <div class="list-arrows col-md-2 text-center">
                                    <label>Link All</label>
                                    <button name="product_addAllToSelectedListView" title="Link All" type="button" class="k-button atr" data-type="atr"><span class="glyphicon glyphicon-list"></span> <span class="glyphicon glyphicon-chevron-right"></span></button>
                                    <label>Unlink All</label>
                                    <button name="product_removeAllFromSelectedListView" title="Unlink All" type="button" class="k-button atl" data-type="atl"><span class="glyphicon glyphicon-chevron-left"></span> <span class="glyphicon glyphicon-list"></span></button>
                                    <label>Unlink</label>
                                    <button name="product_removeFromSelectedListView" title="Unlink" class="k-button move-left"><span class="glyphicon glyphicon-chevron-left"></span></button>
                                    <label>Link</label>
                                    <button name="product_addToSelectedListView" title="Link" class="k-button move-right"><span class="glyphicon glyphicon-chevron-right"></span></button>                                        
                                </div>
                                <div class="dual-list list-right col-md-5">
                                    <h3>Linked Users</h3>
                                    <div class="well">
                                        <div class="input-group clearable-input-edit grid-search">
                                            <input type="text" class="k-textbox m-r-xs w-280" name="searchProductInputLinkedUsers" placeholder="User Name"/>
                                            <span data-clear-input class="k-icon k-i-close" style="top:10px; right: 75px"></span>
                                            <button type="button" class="btn btn-sm k-button search-button" name="searchProductLinkedUsers">Search</button>
                                        </div>
                                        <ul id="LinkedUsers"
										    class="list-group product-linked-users-listview"
                                            style="height: 300px; overflow: scroll;"
                                            data-bind="source: product_user_product_list">
                                        </ul>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
             </div>
            </form>
         </script>
         <script id="userEditUserProductTemplate" type="text/x-kendo-tmpl">
                <label>Product Name</label>
                <div class="row">
                   <div class="col-lg-11">
                      <div class="form-group">
                         <input type="text" data-bind="value: dilProductName" class="form-control" name="Product Name" disabled/>
                      </div>
                   </div>
                </div>
                <label>Status</label>
                <div class="row">
                   <div class="col-lg-11">
                      <div class="form-group">
                        <div class="checkbox checkbox-inline">
                                <input type="checkbox" name="user_access_create_user" id="user_link_product_window_blinded_edit" value="Blinded" class="">
                                <label class="" for="user_link_product_window_blinded_edit">Blinded</label>
                            </div>
                            <div class="checkbox checkbox-inline">
                                <input type="checkbox" name="user_access_create_user" id="user_link_product_window_open_edit" value="Open" class="">
                                <label class="" for="user_link_product_window_open_edit">Unblinded</label>
                            </div>
                      </div>
                   </div>
                </div>
         </script>
		 <script id="studyEditTemplate" type="text/x-kendo-template">
				<form name="validator" data-role="validator" novalidate="novalidate">
                  <div class="form-group pull-left">
                     <button class="k-button"  type="submit" data-bind="visible: isAuditStudyBtnVisible, click: auditLogStudyOpen"><span class="fa fa-file-text-o"></span> Show Audit Trail</button>
                  </div>
				  <span name="associated-to-susar-message" class="hide k-widget k-tooltip k-tooltip-validation k-invalid-msg" role="alert"><span class="k-icon k-i-warning"> </span> Unable to retire and change primary investigational product. Study is associated to a SUSAR.</span>
                  <div class="boxFix">
                     <div class="col-xs-6 col-md-4 b-r">
                        <div id="studyContainer" class="form-group">
                           <label>Study ID <span class="required">*</span></label>
                           <input type="text" id="studyautocomplete" name="studyId" placeholder="Study ID" class="form-control" required data-required-msg="Select Study ID"/>
                           <span class="k-invalid-msg" data-for="studyautocomplete"></span>
                        </div>
                     </div>
                     <div class="col-xs-6 col-md-4 b-r">
                        <div class="form-group">
                           <label>Study Sponsorship<span class="required"> *</span></label>
						   <input name="studySponsorship" class="form-control" required data-required-msg="Select Study Sponsorship"/>
                           <span class="k-invalid-msg" data-for="studySponsorship"></span>
                        </div>
                     </div>
                     <div class="col-xs-6 col-md-4">
                        <div class="form-group">
                           <label>Study Blinded Status<span class="required"> *</span></label>
						   <input name="studyBlindedStatus" class="form-control" required data-required-msg="Select Study Blinded Status"/>
                           <span class="k-invalid-msg" data-for="studyBlindedStatus"></span>
                        </div>
                     </div>
                     <div class="col-md-10">
                        <div class="checkbox checkbox-inline">
                           <input type="checkbox" name="retire" value="retire" class="studycheckbox"> <label>Retire</label>
                        </div>
                     </div>
                  </div>
                  <div class="clearfix"></div>
                  <div class="form-group m-t ">
                     <p class="font-bold text-uppercase">Investigational Product(s) <span class="required"> *</span></p>
					 <span id="edit-investigational-product-validation" class="hide k-widget k-tooltip k-tooltip-validation k-invalid-msg" role="alert"><span class="k-icon k-i-warning"> </span> At least one Investigational Product is required and a Primary Investigational Product is required.</span>
					 <span id="edit-primary-investigational-product-validation" class="hide k-widget k-tooltip k-tooltip-validation k-invalid-msg" role="alert"><span class="k-icon k-i-warning"> </span> A Primary Investigational Product is required.</span>
					 <div id="editstudygrid" class="create-study-grid"></div>
                  </div>
               </form>
		 </script>
		 <script id="welcomeMessageEditTemplate" type="text/x-kendo-template">
            <form name="validator" data-role="validator" novalidate="novalidate">
             <div class="boxFix">
                <div class="col-sm-12">
					<div class="form-group">
						<label>Welcome Message</label>
						<textarea id="welcomeEditor" name="message" class="k-textbox form-control" required data-required-msg="Welcome Message is required" style="height: 500px"/></textarea>
						<span data-for="message" class="k-invalid-msg"></span>
					</div>
				</div>
             </div>
            </form>
         </script>

		 <script id="productEntityEditTemplate" type="text/x-kendo-template">
			 <form name="validator" data-role="validator" novalidate="novalidate">
				<span name="associated-to-product-message" class="hide k-widget k-tooltip k-tooltip-validation k-invalid-msg" role="alert"><span class="k-icon k-i-warning"> </span> Unable to retire. Product Entity is associated to a Product.</span>
				<div class="col-sm-11">
					<div class="form-group">
						<label>Company Name<span class="required"> *</span></label>
						<input type="text" class="form-control" name="entity" placeholder="Company Name" disabled maxlength="255"/>
					</div>
				</div>
				<div class="col-sm-11">
					<div class="form-group">
						<label>Retire</label>
						<input type="checkbox" name="retired" value="retired" class="" disabled>
					</div>
				</div>
			</form>
		 </script>
		 <script id="studySponsorshipEditTemplate" type="text/x-kendo-template">
			 <form name="validator" data-role="validator" novalidate="novalidate">
				<span name="associated-to-study-message" class="hide k-widget k-tooltip k-tooltip-validation k-invalid-msg" role="alert"><span class="k-icon k-i-warning"> </span> Unable to retire. Study Sponsorship is associated to a Study.</span>
				<div class="col-sm-11">
					<div class="form-group">
						<label>Company Name<span class="required"> *</span></label>
						<input type="text" class="form-control" name="studySponsorship" placeholder="Company Name" disabled maxlength="255"/>
					</div>
				</div>
				<div class="col-sm-11">
					<div class="form-group">
						<label>Retire</label>
						<input type="checkbox" name="retired" value="retired" class="" disabled>
					</div>
				</div>
			</form>
		 </script>
		 <script id="userEntityEditTemplate" type="text/x-kendo-template">
			 <form name="validator" data-role="validator" novalidate="novalidate">
				<span name="associated-to-user-message" class="hide k-widget k-tooltip k-tooltip-validation k-invalid-msg" role="alert"><span class="k-icon k-i-warning"> </span> Unable to retire. User Entity is associated to a User.</span>
				<div class="col-sm-11">
					<div class="form-group">
						<label>Company Name<span class="required"> *</span></label>
						<input type="text" class="form-control" name="userEntity" placeholder="Company Name" disabled maxlength="255"/>
					</div>
				</div>
				<div class="col-sm-11">
					<div class="form-group">
						<label>Retire</label>
						<input type="checkbox" name="retired" value="retired" class="" disabled>
					</div>
				</div>
			</form>
		 </script>
		 <script id="awareStudiesEditTemplate" type="text/x-kendo-template">
			 <form name="validator" data-role="validator" novalidate="novalidate">
				<span name="associated-to-study-message" class="hide k-widget k-tooltip k-tooltip-validation k-invalid-msg" role="alert"><span class="k-icon k-i-warning"> </span> Unable to retire. Aware Studies is associated to a Study.</span>
				<div class="col-sm-11">
					<div class="form-group">
						<label>Study<span class="required"> *</span></label>
						<input type="text" class="form-control" name="studyInn" placeholder="Study" disabled maxlength="255"/>
					</div>
				</div>
				<div class="col-sm-11">
					<div class="form-group">
						<label>Drug Name<span class="required"> *</span></label>
						<input type="text" class="form-control" required data-required-msg="Drug Name is required" name="drugName" placeholder="Drug Name" disabled maxlength="255"/>
						<span data-for="drugName" class="k-invalid-msg"></span>
					</div>
				</div>
				<div class="col-sm-11">
					<div class="form-group">
						<label>Retire</label>
						<input type="checkbox" name="retired" value="retired" class="" disabled>
					</div>
				</div>
			</form>
		 </script>
		 <script id="awareINNEditTemplate" type="text/x-kendo-template">
			 <form name="validator" data-role="validator" novalidate="novalidate">
				<span name="associated-to-product-message" class="hide k-widget k-tooltip k-tooltip-validation k-invalid-msg" role="alert"><span class="k-icon k-i-warning"> </span> Unable to retire. PV Database INN is associated to a Product.</span>
				<div class="col-sm-11">
					<div class="form-group">
						<label>Company Name<span class="required"> *</span></label>
						<input type="text" class="form-control" name="awareInn" placeholder="PV DATABASE INN" disabled maxlength="255"/>
					</div>
				</div>
                <div class="col-sm-11">
					<div class="form-group">
						<label>Source<span class="required"> *</span></label>
						<input id="srcInn" class="form-control" name="sourceInn" placeholder="Source Inn" maxlength="50" required data-required-msg="Source is required"/>
					</div>
				</div>
				<div class="col-sm-11">
					<div class="form-group">
						<label>Retire</label>
						<input type="checkbox" name="retired" value="retired" class="" disabled>
					</div>
				</div>
			</form>
		 </script>
		 <script id="coverLetterEditTemplate" type="text/x-kendo-template">
            <form name="validator" data-role="validator" novalidate="novalidate">
             <div class="boxFix">
                <div class="col-sm-12">
					<div class="form-group">
						<label>Cover Letter<span class="required"> *</span></label>
						<textarea id="coverEditor" name="coverLetterValue" class="k-textbox form-control" required data-required-msg="Cover Letter is required" style="height: 500px"/></textarea>
						<span data-for="coverLetterValue" class="k-invalid-msg"></span>
					</div>
				</div>
             </div>
            </form>
         </script>
        <script type="text/x-kendo-template" id="userNotifHistoryMetaDataTemplate"> 
			<form data-role="validator" novalidate="novalidate">
				<div id="metaDataDiv" data-bind="html: metaData"></div>
			</form>
        </script>
        <script type="text/x-kendo-template" id="productNotifHistoryMetaDataTemplate"> 
			<form data-role="validator" novalidate="novalidate">
				<div id="metaDataDivPro" data-bind="html: metaData"></div>
			</form>
        </script>
        <script type="text/x-kendo-template" id="userProductStatusDetail"> 
            #if (access === 'Open'){#
                Unblinded
            #} else {#
                #:access#
            #}#
        </script>
        <script type="text/x-kendo-template" id="userLogGridStatus"> 
            #if (access === 'Open'){#
                Unblinded
            #} else if (access === 'AllOpen'){#
                AllUnblinded
            #}else {#
                #:access#
            #}#
        </script>
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
      <script src="csom/admin.csom.js"></script>
      <script src="dal/admin.dal.js"></script>
      <script src="viewmodel/admin.vm.js"></script>
      <!-- Custom and plugin javascript -->
      <script src="media/js/inspinia.js"></script>
      <script src="media/js/plugin/jspdf/jspdf.debug.js"></script>
      <script src="media/js/plugin/jspdf/jspdf.plugin.autotable.js"></script>
   </body>
</html>