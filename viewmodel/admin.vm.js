$(document).ready(function () {
	var viewModel = kendo.observable({
		//variables
		isVisible: true,
		isEnabled: true,
		isChecked: false,
		userInput: '',
		studyInput: '',
		dilsProductInput: '',
		studyProtocolProductStatusInput: '',
		userProductInput: '',
		userLinkedProductInput: '',
		searchUserInput: '',
		searchLinkedUserInput: '',
		okWindowTemplate: null,
		okWindow: null,
		yesNoWindowTemplate: null,
		yesNoH4WindowTemplate: null,
		exportWindowTemplate: null,
		yesNoWindow: null,
		successWindowTemplate: null,
		successWindow: null,
		waitingWindowTemplate: null,
		waitingWindow: null,
	    //export variables
		isusergridExportDisabled: true,
		isstudygridExportDisabled: true,
		isproductgridExportDisabled: true,
		isuserNoficationHistoryGridExportDisabled: true,
		isproductNoficationHistoryGridExportDisabled: true,
		isauditTrailUserGridExportDisabled: true,
		isauditTrailStudyGridExportDisabled: true,
		isauditTrailProductGridExportDisabled: true,
		dateColumnWidth: 150,
		dateColumnFormat: 'dd-MMM-yyyy',
		dateTimeColumnFormat: 'dd-MMM-yyyy hh:mm:ss',

		//common
		user: {},

		//user variables
		dirtyPage: false,
		user_userNameValue: null,
		user_profileValue: '',
		user_entityValue: '',
		user_countryValue: '',
		user_statusValue: 'Active',
		user_createError: '',
		user_emailAddress: '',
		user_department: '',
		user_id: '',
		user_spid: '',
		user_newCreatedId: 0,
		user_productData: null,
		user_userName: '',
        user_accountName: '',
		user_dataItems: [],
		user_rightAccessDataLog: {},
		user_store_dataItems: [],
		user_isAllOpenChecked: false,
	    user_isAllBlindedChecked: false,
		user_isAllOpenDisabled: true,	   
		userAccessRangeFrom: null,
		userAccessRangeTo: null,
		userAccessMinDate: new Date(2000,0,1),
		userAccessMaxDate: new Date((new Date()).valueOf() + 1000*3600*24),
		userNameEdit: '',
		user_resetLog: false,
		listViewIsVisible: true,
        isStatusActive: true,
		user_editMode: false,
		isUserEditDisabled: false,
		isUserStatusDisabled: false,
	    isUserReadOnly: false,
		user_link_product: 0,
		save_prompt: 'Save New User',
		user_TextBtn: 'Save',
		isLogBtnVisible: false,
		user_error_text: '',
		user_rights_access_src: [],
		user_origDataFillEdit: null,
		tabIndex: COMM.getTabIndexCookie('tabIndex') ? COMM.getTabIndexCookie('tabIndex') : 0,
		tab: COMM.getTabIndexCookie('tabIndex') ? COMM.getTabIndexCookie('tabIndex') : 0,
		user_linkProductDisabled: true,
		userExportBtnDisabled: true,
		userWindowEditDisabled: false,
        userUnlinkAllProductsOnClick: false,

		//study variables
	    study_id: '',
		studyInvestigationalProducts: null,
		dils_product: '',
		investigational_product: 0,
		study_blinded_status: null,
		study_sponsorship: null,
		primary_investigational_product_source: [],
		primaryDataSource: [],
		link_study_to_product_source: [],
		study_product_link_user: 0,
		study_userId: 0,
		study_userName: '',
		study_access: '',
		study_isImported: null,
		study_userSPId: '',
		sid: 0,
		study_create_list: [],
		primaryButtonText: '',
		primaryButtonState: '',
		study_Retire: false,
		study_error_message: '',
		study_success_message: '',
		meta_success_message: '',
		welcome_success_message: '',
		study_selected_product: 0,
		study_susar_status: 0,
		if_study_create_user: false,
		study_associated_to_susar: false,
		study_error_text: null,
		originalPrimaryProduct: 0,
		study_investigational_product: null,
		study_original_investigational_product: null,        
		edit_study_id: null,

		//product variables
		product_code: '',
		product_nickname: '',
		product_awareInn: '',
		product_entity: 0,
		product_user: 0,
		product_folder: '',
		product_folder_temp: '',
		product_link_user: 0,
		product_dirty: false,
		isuserRightsAccessGridExportDisabled: true,
		
		//meta variables
		meta_userentity_datasource: null,
		meta_studysponsorship_datasource: null,
		meta_productentity_datasource: null,
		meta_awarestudyinn_datasource: null,
		meta_awareinn_datasource: null,
		meta_paging: null,
		productEntitySource: null,
		associatedToProduct: null,
		productEntityRetireList: '',
        
		//audit trail and notification history
		auditTrailProduct: [],
		auditTrailStudy: [],
		auditTrailUser: [],
		userNotificationHistory: [],
		productNotificationHistory: [],
		auditProductName: '',
		auditStudyName: '',
		auditUserName: '',
		isAuditStudyBtnVisible: false,
		isAuditUserBtnVisible: false,
	    isUserNotifHistroyBtnVisible: false,

		company_name: '',
		metadata_error_message: '',
		edit_product_entity_id: null,
		edit_company_name: '',
		prodEntityRetire: null,

		sponsorship_company_name: '',
		edit_study_sponsorship_id: null,
		edit_study_company_name: '',
		studySponsorshipRetire: null,

		user_entity_company_name: '',
		edit_user_entity_id: null,
		edit_user_company_name: '',
		userEntityRetire: null,

		edit_study_inn_id: null,
		study_inn: '',
		drug_name: '',
		edit_study_inn: '',
		edit_drug_name: '',
		studyAwareRetire: null,

		aware_inn: '',
		source_inn: '',
		edit_aware_inn_id: null,
		edit_aware_inn: '',
		awareINNRetire: null,

		edit_message_id: null,
		message: '',

		checkIfAssociated: false,
		primaryProduct: 0,
		primaryDILProduct: null,

		createStudyDirty: false,
		//datasources
		study_create_list: function () {
			return new kendo.data.DataSource({
				data: [],
				schema: {
					model: {
						id: "id",
						fields: {
							id: { type: "number" },
							dilProduct: { type: "string" },
						}
					}
				},
				pageSize: 10,
			});
		},
		available_Product: function () {
		    return new kendo.data.DataSource({
		        data: [],
		        schema: {
		            model: {
		                id: "id",
		                fields: {
		                    id: { type: "number" },
                            refID: {type: "number"},
		                    code: { type: "string" },
		                    nickname: { type: "string" },
		                    dilProductName: { type: "string"},
		                    access: { type: "string"},
		                    susarOpenGroupId: { type: "number" },
		                    susarGroupId: { type: "number" },
		                    objVersion: { type: "number" },
		                }
		            }
		        }
		    });
		},
        suspect_product_status_list: ADMINDAL.suspect_product_status(),
        username_list: ADMINDAL.user_getUserList(),
        username_list_product: [],
		
        user_entity_list_drp: function (){
            return ADMINDAL.user_entity(function (r) {
                if (!r.error) {
                    if (r.noData) {
                        console.log(r.message);
                    }
                }
            });
        },
        user_status_list: ADMINDAL.user_status(),               
        user_profile_list: ADMINDAL.user_profile(),
        user_country_list: function (){
            return ADMINDAL.user_country(function (r) {
                if (!r.error) {
                    if (r.noData) {
                        console.log(r.message);
                    }
                }
            });		    
        },
        user_selected_products: function () {
            return new kendo.data.DataSource({
                data: [],
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            id: { type: "number" },
                            refID: { type: "number" },
                            code: { type: "string" },
                            nickname: { type: "string" },
                            dilProductName: { type: "string" },
                            access: { type: "string"},
                            susarOpenGroupId: { type: "number" },
                            susarGroupId: { type: "number" },
                            objVersion: { type: "number" },
                        }
                    }
                }                
            });
        },
        
        study_sponsorship_source: ADMINDAL.study_sponsorship_source(),
        study_product_source: ADMINDAL.study_product_source,
        study_blinded_status_source: ADMINDAL.study_blinded_status_source(),
        //study_user_list_all: ADMINDAL.study_user_list_all(),
        study_aware_inn_source: ADMINDAL.getStudy_AwareInn,
		
		product_list: function () {
			return ADMINDAL.product_list({}, function (r) {
			    if (r.error) {
			        console.error(r);
			        if (r.duplicate) {
			            viewModel.displayOkWindow('Unable to save because duplicate entry exists.');
			        } else if (viewModel.parseError(r.message)) {
			            viewModel.displayOkWindow(viewModel.parseError(r.message));
			        } else {
			            viewModel.displayOkWindow('An error has occurred in Products tab.');
			        }
			    } else {
			        if (r.update) {
			            $('#productgrid').data('kendoGrid').dataSource.read();
			            viewModel.updateGrids('productgrid');
			        }
			    }
			});
		},
		product_entity_list_drp: ADMINDAL.product_entity,
		product_inn_list: ADMINDAL.product_inn_list,
		product_user_list_all: ADMINDAL.product_user_list_all,
		product_create_list: ADMINDAL.product_userProduct_empty,

	    //functions
		displayLoading: function (element, loading, blockWrapper) {
		    if (blockWrapper) {
		        kendo.ui.progress($('.wrapper-content'), loading);
		    } else {
		        kendo.ui.progress($(element), loading);
		    }
		},

		parseError: function (msg) {
		    if (msg.toUpperCase().indexOf('VERSION CONFLICT') !== -1 || msg.toUpperCase().indexOf('SAVE CONFLICT') !== -1) {
		        return COMM.PROPERTY.CONFLICTMESSAGE;
		    } else if (msg.toUpperCase().indexOf('ACCESS DENIED') !== -1) {
		        return COMM.PROPERTY.USERACCESSERROR;
		    } else if (msg.toUpperCase().indexOf('DUPLICATE') !== -1) {
		        return COMM.PROPERTY.DUPLICATEERROR;
		    }
		    return false;
		},

		createUserProductQueueString: function (productId, arr) {
		    var str = productId + ';';
		    var userProducts = [];
		    for (var i = 0; i < arr.length; i++) {
		        userProducts.push((arr[i].userRefId ? arr[i].userRefId : arr[i].id) + ':' + arr[i].access);
		    }
		    return (str + (userProducts.join(',')));
		},

        displayOkWindow: function (msg) {
            viewModel.okWindow.content(viewModel.okWindowTemplate({ msg: msg })); //send the row data object to the template and render it
            viewModel.okWindow.center().open();
            $("#closeOkWindow").click(function () {
                if (msg.toUpperCase().indexOf('ACCESS DENIED') !== -1) {
                viewModel.okWindow.close();
                    location.reload();
                } else {
                    viewModel.okWindow.close();
                }
            });
        },

        displaySuccessWindow: function (msg) {
        	viewModel.successWindow.content(viewModel.successWindowTemplate({ msg: msg })); //send the row data object to the template and render it
        	viewModel.successWindow.center().open();
        	$("#closeSuccessWindow").click(function () {
        		viewModel.successWindow.close();
        	});
        },

        displayWaitingWindow: function (msg) {
            viewModel.waitingWindow.content(viewModel.waitingWindowTemplate({ msg: msg })); //send the row data object to the template and render it
            viewModel.waitingWindow.center().open();
        },

        product_removeExistingUsers: function (e) {
            var active = {};
            var linkedDataSource = new kendo.data.DataSource();
            var userDataSource = new kendo.data.DataSource();
            kendo.ui.progress($('#createProduct'), true);
            //Get data of grid either from create product window or edit product window
            if ($('div#createProduct:not(:hidden)').length > 0) { //create window is open
                userDataSource = $('#productUsersListview').data('kendoListView').dataSource;
                linkedDataSource = $('#productLinkedUsersListview').data('kendoListView').dataSource;
                active.create = true;
            } else if ($('div[name="editProductForm"]:not(:hidden)').length > 0) { //edit window is open
                userDataSource = $('ul.product-users-listview').data('kendoListView').dataSource;
                linkedDataSource = $('ul.product-linked-users-listview').data('kendoListView').dataSource;
                active.edit = true;
            }

            if (active.create) {
                kendo.ui.progress($('#createProduct'), true);
            } else {
                kendo.ui.progress($('div[name="editProductForm"]'), true);
            }

            //Reset datasource
            $("#productUsersListview").data('kendoListView').dataSource.read().then(function () {
                //Remove already included users of active grid
                for (var i = 0; i < linkedDataSource.data().length; i++) {
                    var dataItem = null;
                    dataItem = active.create ? userDataSource.get(linkedDataSource.data()[i].id) : userDataSource.get(linkedDataSource.data()[i].userRefId);
                    try {
                        userDataSource.remove(dataItem);
                    } catch (err) { console.error(err.message); }
                }
                if (active.create) {
                    kendo.ui.progress($('#createProduct'), false);
                } else {
                    kendo.ui.progress($('div[name="editProductForm"]'), false);
                }
            });
        },

        product_resetCreateProductWindow: function (e) {
            this.set('product_code', '');
            this.set('product_nickname', '');
            this.set('product_folder', '');
            this.set('product_awareInn', '');
            this.set('product_entity', 0);
            this.set('product_user', 0);
            $('#productDropDownINN').data('kendoDropDownList').dataSource.filter([]);
            $('#productUsersListview').data('kendoListView').dataSource.read();
            $('#productLinkedUsersListview').data('kendoListView').dataSource.data([]);
        },

        user_resetLinkProductWindow: function (e) {
            //$('#user_link_product_window').data('kendoDropDownList').dataSource.read().then(function () {
            //    viewModel.set('user_link_product', (viewModel.user_newCreatedId && viewModel.user_newCreatedId > 0) ? viewModel.user_newCreatedId : 0);
            //	viewModel.set('user_newCreatedId', 0);
            //});

            this.set('user_link_product', 0);

            $("input[name=user_status]").prop('checked', false);
            $("#user_link_product_window_blinded").prop("checked", true);
            $('#user_link_product_window_blinded').change(function () {
                $('#user_link_product_window_open').prop('checked', (this.checked ? false : true));
            });
            $('#user_link_product_window_open').change(function () {
                $('#user_link_product_window_blinded').prop('checked', (this.checked ? false : true));
            });
        },

        user_unbindLinkProductWindowEvents: function (e) {
            $('#user_link_product_window_blinded').unbind('change');
            $('#user_link_product_window_open').unbind('change');
        },

        getFileName: function () {
            var now = new Date();
            var start = new Date();
            start.setDate(now.getDate() - 365);
            start = new Date(start);

            now = kendo.toString(now, 'dd-MMM-yyyy');
            start = kendo.toString(new Date(start), 'dd-MMM-yyyy');
            return 'DILs from ' + start + ' to ' + now;
        },

        updateGrids: function (gridId) {
            if (gridId === 'usergrid') {
            	if ($('div[name="editProductForm"]:not(:hidden)').length <= 0) $('#productgrid').data('kendoGrid').dataSource.read();
            	if ($('div[name="editStudyForm"]:not(:hidden)').length <= 0) $('#studygrid').data('kendoGrid').dataSource.read();
                $('#product_link_user_window').data('kendoDropDownList').dataSource.read({ readAgain: true });
            } else if (gridId === 'studygrid') {
                $('#productgrid').data('kendoGrid').dataSource.read();
            } else if (gridId === 'productgrid') {
                $('#usergrid').data('kendoGrid').dataSource.read();
                if ($('div[name="editStudyForm"]:not(:hidden)').length <= 0) $('#studygrid').data('kendoGrid').dataSource.read();
                $('#linkproducttocreatestudy').data('kendoDropDownList').dataSource.read();
                $('#linkproducttostudy').data('kendoDropDownList').dataSource.read();
            } else if (gridId === 'user-entity-grid') {
                $('#usergrid').data('kendoGrid').dataSource.read();
            } else if (gridId === 'product-entity-grid') {
                $('#productEntity').data('kendoDropDownList').dataSource.read();
            } else if (gridId === 'study-aware-inn') {
                $('#studyautocomplete').data('kendoComboBox').dataSource.read();
            } else if (gridId === 'study-sponsorship-grid') {
                $('#studysponsorship').data('kendoDropDownList').dataSource.read();
            } else if (gridId === 'aware-inn-grid') {
                $('#productDropDownINN').data('kendoDropDownList').dataSource.read();
            }
        },

        delayedProcessing: function (callback) {
            viewModel.displayWaitingWindow('Processing...');
            viewModel.displayLoading('', true, true);
            setTimeout(function () {
                if (callback) callback();
                $('#waitingWindow').data('kendoWindow').close();
                viewModel.displayLoading('', false, true);
            }, 7000);
        },

        //events

        /************ PRODUCT tab ************/
        product_onProductTextKeyup: function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
            }
        },

        product_onProductTextChange: function (e) {
            e.preventDefault();
            this.set('product_code', this.product_code ? this.product_code.trim() : '');
            this.set('product_nickname', this.product_nickname ? this.product_nickname.trim() : '');
            //this.set('product_awareInn', this.product_awareInn ? this.product_awareInn.trim() : '');
            this.set('product_folder', ((this.product_code ? this.product_code + (this.product_nickname || this.product_awareInn ? '-' : '') : '') + (this.product_nickname ? this.product_nickname.trim() + (this.product_awareInn ? '-' : '') : '') + this.product_awareInn).substring(0, 255));
        },

        product_onProductTempChange: function (e) {
            e.preventDefault();
            this.set('product_folder_temp', this.product_folder_temp ? this.product_folder_temp.trim() : '');
        },

        product_onCreateUserOfCreateProduct: function (e) {
            e.preventDefault();
            this.confirmCreateNewUser(e, true);
        },

        product_onSaveLinkUser: function (e) {
            e.preventDefault();
            if (!this.product_link_user || this.product_link_user === 0 || $('input[name="product_status"]:checked').length !== 1) {
                this.displayOkWindow('All fields required.');
                return;
            }

            //edit mode
            if ($('div.k-popup-edit-form.k-window-content.k-content:not(:hidden)').length > 0) {
                var grid = $($('div.k-popup-edit-form.k-window-content.k-content:not(:hidden)').find('[data-role="grid"]')[0]).data('kendoGrid');
                grid.dataSource.pushCreate(
                    {
                        id: 0,
                        userId: $('#product_link_user_window').data('kendoDropDownList').value(),
                        userRefId: $('#product_link_user_window').data('kendoDropDownList').value(),
                        spid: $('#product_link_user_window').data('kendoDropDownList').dataSource.get($('#product_link_user_window').data('kendoDropDownList').value()).userId,
                        userName: $('#product_link_user_window').data('kendoDropDownList').text(),
                        access: $('input[name="product_status"]:checked', '#userLink').val(),
                        productId: $('#productgrid').data('kendoGrid').dataSource.getByUid($($('div.k-popup-edit-form.k-window-content.k-content:not(:hidden)')[0]).attr('data-uid')).id,
                    });
            } else { //create mode
                $('#createProductgrid').data('kendoGrid').dataSource.pushCreate(
                    {
                        id: this.product_link_user,
                        userId: $('#product_link_user_window').data('kendoDropDownList').dataSource.get(this.product_link_user).userId,
                        userName: $('#product_link_user_window').data('kendoDropDownList').dataSource.get(this.product_link_user).userName,
                        userProfile: $('#product_link_user_window').data('kendoDropDownList').dataSource.get(this.product_link_user).userProfile,
                        userRefId: this.product_link_user,
                        access: $('input[name="product_status"]:checked', '#userLink').val()
                    });
            }
            $('#usergrid').data('kendoGrid').dataSource.read();
            $("#userLink").data("kendoWindow").close();

        },

        product_onEditOfCreateProduct: function (e) {
            //bind change events for checkbox
            $('#product_link_user_window_blinded_edit').change(function () {
                $('#product_link_user_window_open_edit').prop('checked', (this.checked ? false : true));
            });
            $('#product_link_user_window_open_edit').change(function () {
                $('#product_link_user_window_blinded_edit').prop('checked', (this.checked ? false : true));
            });

            //uncheck all checkboxes then assign checked for value
            $("input[name=product_access_create_product]").prop('checked', false);
            if (e.model.access === COMM.PROPERTY.OPEN) {
                $('#product_link_user_window_open_edit').prop('checked', true);
            } else {
                $('#product_link_user_window_blinded_edit').prop('checked', true);
            }

        },

        product_onCancelOfCreateProduct: function (e) {
            //unbind change events in checkbox
            $('#product_link_user_window_blinded_edit').unbind('change');
            $('#product_link_user_window_open_edit').unbind('change');
        },

        product_onEditSaveOfCreateProduct: function (e) {
            var access = $('input[name="product_access_create_product"]:checked').val();
            if (typeof access === 'undefined'){
                e.preventDefault();
                return;
            }
            var dataItem = $('#createProductgrid').data('kendoGrid').dataSource.getByUid(e.model.uid);
            dataItem.access = access;
            
            $('#createProductgrid').data('kendoGrid').refresh();
        },

        validateCreateProduct: function (e) {
            e.preventDefault();

            
            // attach a validator to the container and get a reference
            var validatable = $("#createProduct").kendoValidator().data("kendoValidator");
            validatable.hideMessages();

            //validate the input elements and check if there are any errors
            if (validatable.validate()) {
                //Checking for product code, product nickname, product entity
                if (this.product_entity === 0 || !this.product_awareInn || !this.product_awareInn.trim() || !this.product_folder.trim() || !this.product_folder.trim() === '') {
                    $("#missingFieldsError").data("kendoWindow").center().open();
                }
                else {
                    this.set('product_code', (this.product_code ? this.product_code.trim() : ''));
                    this.set('product_nickname', (this.product_nickname ? this.product_nickname.trim() : ''));
                    //this.set('product_awareInn', this.product_awareInn.trim());
                    this.set('product_folder', this.product_folder.trim());
                    $("#confirmCreateProduct").data("kendoWindow").center().open();
                }
            }
           
        },

        product_onSaveProduct: function (e) {
            kendo.ui.progress($(e.currentTarget).parent(), true);
            $(e.currentTarget).parent().find('button').prop('disabled', true);
            e.preventDefault();

            ADMINDAL.product_createProduct({
                code: this.product_code,
                nickname: this.product_nickname,
                entity: this.product_entity,
                inn: this.product_awareInn,
                folder: this.product_folder,
                users: $('#productLinkedUsersListview').data('kendoListView').dataSource.data(),
                queueData: viewModel.createUserProductQueueString('', $('#productLinkedUsersListview').data('kendoListView').dataSource.data()),
            }, function (r) {
                if (r.error) {
                    console.error(r);
                    if (r.duplicate) {
                        viewModel.displayOkWindow('Unable to save because duplicate entry exists.');
                    } else {
                        viewModel.displayOkWindow(r.message);
                    }
                    $("#confirmCreateProduct").data("kendoWindow").close();
                } else {
                    viewModel.delayedProcessing(function () {
                        $('#productgrid').data('kendoGrid').dataSource.read();
                        viewModel.updateGrids('productgrid');
                    });
                    $("#confirmCreateProduct").data("kendoWindow").close();
                    $("#createProduct").data("kendoWindow").close();
                }
            });
        },

        product_onCancelGrid: function (e) {
            $(':focus').blur();
            //check if edit form is dirty
            if (this.product_dirty ||
                $('#productgrid').data('kendoGrid').dataSource.hasChanges() ||
                $('.product-linked-users-listview').data('kendoListView') && $('.product-linked-users-listview').data('kendoListView').dataSource.hasChanges()
                ) {
                e.preventDefault();
                viewModel.yesNoWindow.content(viewModel.yesNoWindowTemplate({ msg: 'There are unsaved changes in this window. Are sure you want to cancel?' })); //send the row data object to the template and render it
                viewModel.yesNoWindow.center().open();
                $("#yesWindow").click(function () {
                    viewModel.yesNoWindow.close();
                    e.sender.cancelRow();
                });
                $("#noWindow").click(function () {
                    viewModel.yesNoWindow.close();
                });
            }
        },

        onDeactivateConfirmWindow: function (e) {
            kendo.ui.progress($(e.sender.wrapper), false);
            $(e.sender.wrapper).find('button').prop('disabled', false);
        },

        product_onEditGrid: function (e) {
            e.container.data("kendoWindow").title('Edit Product Information');
            $(e.container).attr('name', 'editProductForm');
            $(e.container).attr('id', e.model.id);
            $($(e.container).children()[0]).css({ width: '1000px', padding: '.58em' });
            e.container.data("kendoWindow").center();

            //override close event to support for save only button
            var window = e.container.data("kendoWindow");
            window.bind("close", function (c) {
                viewModel.set('product_dirty', false);
            });

            $("input[name=searchProductInputUsers]").val('');
            $("input[name=searchProductInputLinkedUsers]").val('');

            //Change Update text to Save 
            var update = $(e.container).parent().find(".k-grid-update");
            var cancel = $(e.container).parent().find(".k-grid-cancel");
            $(update).html('<span class="k-icon k-i-save"></span> Save');
            $(cancel).html('<span class="k-icon k-i-cancel"></span> Cancel');

            //remove close icon(x) from window
            $(e.container).parent().find(".k-window-action").css("visibility", "hidden");

            var windowTemplate = kendo.template($("#windowTemplate").html());
            var window = $("#confirmationWindow").kendoWindow({
                title: "Confirm",
                visible: false, //the window will not appear before its .open method is called
                width: "360px",
                height: "auto",
                modal: true,
            }).data("kendoWindow");

            //Insert show logs button
            e.container.find(".k-edit-buttons .k-grid-update")
                .before('<div class="pull-left"><button class="k-button k-button-icontext k-show-logs"><span class="k-icon k-i-file-txt"></span> Log</button></div>');
            e.container.find(".k-button.k-show-logs").on("click", function (b) {
                b.preventDefault();
                viewModel.userAccessRightsData({ data: { product_id: e.model.id, isByProduct: true }, preventDefault: function () { } });
            });

            // Insert audit trail button
            e.container.find(".k-edit-buttons .k-grid-update")
               .before('<div class="pull-left"><button class="k-button k-button-icontext k-show-product-audit"><span class="fa fa-file-text-o"></span> Show Audit Trail</button></div>');
            e.container.find(".k-button.k-show-product-audit").on("click", function (b) {
                b.preventDefault();
                $("#viewAuditTrailProduct").data("kendoWindow").center().open();
                viewModel.displayLoading($('#auditTrailProductGrid'), true);
                setTimeout(function () {
                    viewModel.set('auditProductName', e.model.dilProduct);
                    viewModel.set('auditTrailProduct', ADMINDAL.audit_trail_product({
                        id: e.model.id,
                        listname: "Product"
                    }, function (loading) {
                        viewModel.displayLoading($('.k-widget .k-window'), loading, true);
                    }, function (r) {
                        if (r && !r.error) {
                            viewModel.displayLoading($('#viewAuditTrailProduct'), false);
                        }
                    }));
                    $('#auditTrailProductGrid').data('kendoGrid').dataSource.read();
                    $('#auditTrailProductGrid').data('kendoGrid').refresh();
                }, 500);
            });
            // Insert product history notification button
            e.container.find(".k-edit-buttons .k-grid-update")
               .before('<div class="pull-left"><button class="k-button k-button-icontext k-show-product-history-notif"><span class="fa fa-file-text-o"></span> Show Notification History</button></div>');
            e.container.find(".k-button.k-show-product-history-notif").on("click", function (b) {
                b.preventDefault();
                $("#viewProductHistoryNotif").data("kendoWindow").center().open();
                viewModel.displayLoading($('#productNoficationHistoryGrid'), true);
                setTimeout(function () {
                    viewModel.set('auditProductName', e.model.dilProduct);
                    viewModel.set('productNotificationHistory', ADMINDAL.product_notification_hist({
                        id: e.model.id
                    }, function (loading) {
                        viewModel.displayLoading($('.k-widget .k-window'), loading, true);
                    }, function (r) {
                        if (r && !r.error) {
                            viewModel.set('userExportBtnDisabled', false);
                            viewModel.displayLoading($('#productNoficationHistoryGrid'), false);
                        }
                    }));
                    $('#productNoficationHistoryGrid').data('kendoGrid').dataSource.read();
                    $('#productNoficationHistoryGrid').data('kendoGrid').refresh();
                }, 500);
            });

            //move edit buttons up on top
            var form = e.container.find('form');
            $('<div class="hr-line-solid clearfix"></div>').prependTo(form);
            e.container.find(".k-edit-buttons.k-state-default").css('border-width', 0).prependTo(form);

			//search users
            e.container.find("input[name='searchProductInputUsers']").keyup(function (a) {
            	viewModel.onSearchKeyUp(a);
            });

            e.container.find("button[name='searchProductUsers']").click(function (a) {
            	var value = $("input[name=searchProductInputUsers]").val();
            	viewModel.onSearchProductUsers(a, value);
            });

            e.container.find("input[name='searchProductInputLinkedUsers']").keyup(function (a) {
            	viewModel.onSearchKeyUp(a);
            });

            e.container.find("button[name='searchProductLinkedUsers']").click(function (a) {
            	var value = $("input[name=searchProductInputLinkedUsers]").val();
            	viewModel.onSearchProductLinkedUsers(a, value);
            });

            ADMINDAL.product_inn_list.filter([]); //reset filter of datasource
            var dropObj = {
                dataTextField: "inn",
                dataValueField: "inn",
                filter: "contains",
                valuePrimitive: false,
                dataSource: ADMINDAL.product_inn_list,
            };
            if (!e.model.inn) {
                $.extend(dropObj, { optionLabel: "Select PV Database INN" });
            }
            e.container.find("input[name='inn']").kendoDropDownList(dropObj);
            e.container.find("input[name='entity']").kendoDropDownList({
                dataTextField: "entity",
                dataValueField: "entity",
                dataSource: ADMINDAL.product_entity
            });
            e.container.find("input[name='code']").change(function (a) {
                $(a.currentTarget).val($(a.currentTarget).val().trim());
                e.container.find("input[name='dilProduct']").val(
                    ((e.container.find("input[name='code']").val() ? e.container.find("input[name='code']").val().trim() + (e.container.find("input[name='nickname']").val() || e.container.find("input[name='inn']").val() ? '-' : '') : '') +
                    (e.container.find("input[name='nickname']").val() ? e.container.find("input[name='nickname']").val().trim() + (e.container.find("input[name='inn']").val() ? '-' : '') : '') +
                    e.container.find("input[name='inn']").val().trim()).substring(0, 255));
            });
            e.container.find("input[name='nickname']").change(function (a) {
                $(a.currentTarget).val($(a.currentTarget).val().trim());
                e.container.find("input[name='dilProduct']").val(
                    ((e.container.find("input[name='code']").val() ? e.container.find("input[name='code']").val().trim() + (e.container.find("input[name='nickname']").val() || e.container.find("input[name='inn']").val() ? '-' : '') : '') +
                    (e.container.find("input[name='nickname']").val() ? e.container.find("input[name='nickname']").val().trim() + (e.container.find("input[name='inn']").val() ? '-' : '') : '') +
                    e.container.find("input[name='inn']").val().trim()).substring(0, 255));
            });
            e.container.find("input[name='inn']").change(function (a) {
                $(a.currentTarget).data('kendoDropDownList').value($(a.currentTarget).data('kendoDropDownList').value().trim());
                e.container.find("input[name='dilProduct']").val(
                    ((e.container.find("input[name='code']").val() ? e.container.find("input[name='code']").val().trim() + (e.container.find("input[name='nickname']").val() || e.container.find("input[name='inn']").val() ? '-' : '') : '') +
                    (e.container.find("input[name='nickname']").val() ? e.container.find("input[name='nickname']").val().trim() + (e.container.find("input[name='inn']").val() ? '-' : '') : '') +
                    e.container.find("input[name='inn']").val().trim()).substring(0, 255));
            });
            e.container.find('button[name="viewCompleteText"]').click(function (a) {
                a.preventDefault();
                viewModel.set('product_dirty', true);
                viewModel.set('product_folder_temp', e.container.find("input[name='dilProduct']").val());
                $("#editProductFolderText").data("kendoWindow").center().open();
            });
            e.container.find('button[name="product_createUser"]').click(function (j) {
                j.preventDefault();
                viewModel.confirmCreateNewUser(j, true);
            });
            $('#productUsersListview').data('kendoListView').dataSource.read();
            e.container.find("ul.product-users-listview").kendoListView({
                dataSource: ADMINDAL.product_user_list_all,
                dataBound: function (a) {
                    var usersDS = a.sender.dataSource;
                    var linkedUsersLv = e.container.find("ul.product-linked-users-listview").data('kendoListView');
                    if (!linkedUsersLv || !linkedUsersLv.dataSource) {
                        return;
                    } else {
                    }
                    var linkedUsersDS = linkedUsersLv.dataSource;
                    var linkedUsers = linkedUsersDS.data();
                    for (var i = 0; i < linkedUsers.length; i++) {
                        var dataItem = null;
                        dataItem = usersDS.get(linkedUsers[i].userRefId);
                        try {
                            usersDS.remove(dataItem);
                        } catch (err) {}
                    }
                },
                template: kendo.template($("#productListViewUserTemplate").html()),
            });

            e.container.find("ul.product-linked-users-listview").kendoListView({
                dataSource: ADMINDAL.product_user_product_list_no_page({ productId: e.model.id, susarGroupId: e.model.susarGroupId, susarGroupOpenId: e.model.susarGroupOpenId }, function (r) {
                    if (r.error) {
                        if (viewModel.parseError(r.message)) {
                            viewModel.displayOkWindow(viewModel.parseError(r.message));
                        } else {
                            viewModel.displayOkWindow('An error has occurred.');
                        }
                    }
                }),
                dataBound: function (a) {
                    var usersLv = e.container.find("ul.product-users-listview").data('kendoListView');
                    if (!usersLv || !usersLv.dataSource) {
                        return;
                    }
                    var usersDS = usersLv.dataSource;
                    var linkedUsers = a.sender.dataSource.data();
                    for (var i = 0; i < linkedUsers.length; i++) {
                        var dataItem = null;
                        dataItem = usersDS.get(linkedUsers[i].userRefId);
                        try {
                            usersDS.remove(dataItem);
                        } catch (err) {}
                    }
                },
                template: kendo.template($("#productListViewUserProductEditTemplate").html()),
            });

            $(e.container).on('click', '.list-group .list-group-item', function () {
                $(this).toggleClass('active');
            });

        	//'X' button on the right side of the text box
            $('.clearable-input-edit').each(function (i, el) {
            	var input = el.querySelector('input');
            	conditionallyHideClearIcon();
            	input.addEventListener('input', conditionallyHideClearIcon);
            	el.querySelector('[data-clear-input]').addEventListener('click', function (a) {
            		if ($(a.currentTarget).prev()[0].name === 'searchProductInputUsers') {
            			e.container.find("input[name='searchProductInputUsers']").val('');
            			$('#availableUsers').data('kendoListView').dataSource.filter([]);
            		} else if ($(a.currentTarget).prev()[0].name === 'searchProductInputLinkedUsers') {
            			e.container.find("input[name='searchProductInputLinkedUsers']").val('');
            			$('#LinkedUsers').data('kendoListView').dataSource.filter([]);
            		}
            		conditionallyHideClearIcon();
            	});

            	function conditionallyHideClearIcon(a) {
            		var target = (a && a.target) || input;
            		target.nextElementSibling.style.display = target.value ? 'block' : 'none';
            	}
            });

            e.container.find('button[name="product_addAllToSelectedListView"]').click(function (j) {
                j.preventDefault();

                viewModel.yesNoWindow.content(viewModel.yesNoH4WindowTemplate({ msg: 'Linking all users to this product may take a few seconds to process. Do you wish to proceed?' })); //send the row data object to the template and render it
                viewModel.yesNoWindow.center().open();
                $("#yesWindow").click(function () {
                    viewModel.yesNoWindow.close();
                    viewModel.displayWaitingWindow('Processing...');
                    setTimeout(function () {
                        var usersLv = e.container.find("ul.product-users-listview").data('kendoListView');
                        var linkedUsersLv = e.container.find("ul.product-linked-users-listview").data('kendoListView');
                        var items = usersLv.items();
                        $.map(items, function (a, i) {
                            var dataItem = usersLv.dataItem(a);
                            dataItem.userRefId = dataItem.userRefId ? dataItem.userRefId : dataItem.id;
                            dataItem.id = dataItem.userProductId ? dataItem.userProductId : 0;
                            if (dataItem.deleteRequested) dataItem.dirty = true;
                            dataItem.deleteRequested = false;
                            dataItem.dilProductId = e.model.id;
                            dataItem.access = COMM.PROPERTY.BLINDED;
                            linkedUsersLv.dataSource.insert(0, dataItem);
                            usersLv.dataSource.remove(usersLv.dataItem(a));
                        });
                        $('#waitingWindow').data('kendoWindow').close();
                    }, 1000);
                });
                $("#noWindow").click(function () {
                    viewModel.yesNoWindow.close();
                });
            });
            e.container.find('button[name="product_removeAllFromSelectedListView"]').click(function (j) {
                j.preventDefault();

                viewModel.yesNoWindow.content(viewModel.yesNoH4WindowTemplate({ msg: 'Unlinking all users to this product may take a few seconds to process. Do you wish to proceed?' })); //send the row data object to the template and render it
                viewModel.yesNoWindow.center().open();
                $("#yesWindow").click(function () {
                    viewModel.yesNoWindow.close();
                    viewModel.displayWaitingWindow('Processing...');
                    setTimeout(function () {
                        var usersLv = e.container.find("ul.product-users-listview").data('kendoListView');
                        var linkedUsersLv = e.container.find("ul.product-linked-users-listview").data('kendoListView');
                        var items = linkedUsersLv.items();
                        $.map(items, function (a, i) {
                            var dataItem = linkedUsersLv.dataItem(a);
                            dataItem.userRefId = dataItem.userRefId;
                            dataItem.userProductId = dataItem.id;
                            dataItem.deleteRequested = true;
                            usersLv.dataSource.insert(i++, linkedUsersLv.dataItem(a));
                            linkedUsersLv.dataSource.remove(linkedUsersLv.dataItem(a));
                        });
                        $('#waitingWindow').data('kendoWindow').close();
                    }, 1000);
                });
                $("#noWindow").click(function () {
                    viewModel.yesNoWindow.close();
                });
            });
            e.container.find('button[name="product_removeFromSelectedListView"]').click(function (j) {
                j.preventDefault();
                var usersLv = e.container.find("ul.product-users-listview").data('kendoListView');
                var linkedUsersLv = e.container.find("ul.product-linked-users-listview").data('kendoListView');
                var items = linkedUsersLv.items();
                var i = 0;
                $.map(items, function (a, i) {
                    if ($(a).hasClass('active')) {
                        var dataItem = linkedUsersLv.dataItem(a);
                        dataItem.userRefId = dataItem.userRefId;
                        dataItem.userProductId = dataItem.id;
                        dataItem.deleteRequested = true;
                        usersLv.dataSource.insert(i++, linkedUsersLv.dataItem(a));
                        linkedUsersLv.dataSource.remove(linkedUsersLv.dataItem(a));
                    }
                });
            });
            e.container.find('button[name="product_addToSelectedListView"]').click(function (j) {
                j.preventDefault();
                var usersLv = e.container.find("ul.product-users-listview").data('kendoListView');
                var linkedUsersLv = e.container.find("ul.product-linked-users-listview").data('kendoListView');
                var items = usersLv.items();

                $.map(items, function (a, i) {
                    if ($(a).hasClass('active')) {
                        var dataItem = usersLv.dataItem(a);
                        dataItem.userRefId = dataItem.userRefId ? dataItem.userRefId : dataItem.id;
                        dataItem.id = dataItem.userProductId ? dataItem.userProductId : 0;
                        if (dataItem.deleteRequested) dataItem.dirty = true;
                        dataItem.deleteRequested = false;
                        dataItem.dilProductId = e.model.id;
                        dataItem.access = COMM.PROPERTY.BLINDED;
                        linkedUsersLv.dataSource.insert(0, dataItem);
                        usersLv.dataSource.remove(usersLv.dataItem(a));
                    }
                });
            });
            e.container.find("ul.product-linked-users-listview").data('kendoListView').dataSource.online(false);

            $('#availableUsers').data('kendoListView').dataSource.filter([]);
            $('#LinkedUsers').data('kendoListView').dataSource.filter([]);

            //'X' button on the right side of the text box
            $('.clearable-input-edit').each(function (i, el) {
                var input = el.querySelector('input');
                conditionallyHideClearIcon();
                input.addEventListener('input', conditionallyHideClearIcon);
                el.querySelector('[data-clear-input]').addEventListener('click', function (a) {
                    e.model.dirty = true;
                    if ($(a.currentTarget).prev()[0].name === 'code') {
                        e.model.code = '';
                        e.container.find("input[name='code']").val('');
                    } else if ($(a.currentTarget).prev()[0].name === 'nickname') {
                        e.model.nickname = '';
                        e.container.find("input[name='nickname']").val('');
                    }
                    e.container.find("input[name='dilProduct']").val(
                        (e.container.find("input[name='code']").val() ? e.container.find("input[name='code']").val().trim() + (e.container.find("input[name='nickname']").val() || e.container.find("input[name='inn']").val() ? '-' : '') : '') +
                        (e.container.find("input[name='nickname']").val() ? e.container.find("input[name='nickname']").val().trim() + (e.container.find("input[name='inn']").val() ? '-' : '') : '') +
                        e.container.find("input[name='inn']").val().trim());
                    conditionallyHideClearIcon();
                });

                function conditionallyHideClearIcon(a) {
                    var target = (a && a.target) || input;
                    target.nextElementSibling.style.display = target.value ? 'block' : 'none';
                }
            });

            //Search through study grid if can retire
            if (e.model.status === COMM.PROPERTY.PRODUCT.PENDING) {
                e.container.find("div[name='retire-msg-pending']").show();
                return;
            }
            var studyArr = $('#studygrid').data('kendoGrid').dataSource.data();
            if (!e.model.retired) {
                for (var i = 0; i < studyArr.length; i++) {
                    if (studyArr[i].investigationalDILProductID.indexOf(e.model.id) !== -1) {
                        e.container.find("div[name='retire-msg-associated']").show();
                        return;
                    }
                }
            }
            e.container.find("input[name='retired']").removeAttr('disabled');
        },

        product_onSaveGrid: function (e) {
            e.preventDefault();
            if (e.model.inn === null || e.model.inn.trim() === '' || !e.container.find("input[name='dilProduct']").val() || e.container.find("input[name='dilProduct']").val().trim() === '') {
                $("#missingFieldsError").data("kendoWindow").center().open();
                return;
            }
            viewModel.yesNoWindow.content(viewModel.yesNoWindowTemplate({ msg: 'Please allow up to a minute for the system to propagate all changes. Are you sure you want to update product?' })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                e.model.code = (e.model.code ? e.model.code.trim() : '');
                e.model.nickname = (e.model.nickname ? e.model.nickname.trim() : '');
                e.model.inn = e.model.inn.trim();
                e.model.folder = $("input.form-control[name='dilProduct']:not(#productFolder)").val();
                if (e.model.dilProduct !== e.model.folder) {
                    e.model.dirty = true;
                }
                var lvDS = e.container.find("ul.product-linked-users-listview").data('kendoListView').dataSource;
                if (lvDS.hasChanges()) {
                    e.model.dirty = true;
                    e.model.queueData = viewModel.createUserProductQueueString(e.model.id, e.container.find("ul.product-linked-users-listview").data('kendoListView').dataSource.data());
                }
                e.sender.dataSource.sync()
                    .done(function () {
                        viewModel.delayedProcessing(function () {
                            $('#productgrid').data('kendoGrid').dataSource.read();
                            viewModel.updateGrids('productgrid');
                        });
                    })
                    .fail(function (err) {
                        console.error(err);
                        if (viewModel.parseError(err)) {
                            viewModel.displayOkWindow(viewModel.parseError(err));
                        } else {
                            viewModel.displayOkWindow('An error has occurred. Please refresh page.');
                        }
                    });
                viewModel.yesNoWindow.close();
                //e.container.find("ul.product-linked-users-listview").data('kendoListView').dataSource.online(true);
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onDetailInitProductGrid: function (a) {
            var dataItem = $("#productgrid").data("kendoGrid").dataItem(a.masterRow);
            var windowTemplate = kendo.template($("#windowTemplate").html());
            var window = $("#confirmationWindow").kendoWindow({
                title: "Confirm",
                visible: false, //the window will not appear before its .open method is called
                width: "360px",
                height: "auto",
                modal: true,
            }).data("kendoWindow");
            a.detailRow.find('.product-grid-detail').kendoGrid({
                dataSource: ADMINDAL.product_user_product_list({ productId: dataItem.id, susarGroupId: dataItem.susarGroupId, susarGroupOpenId: dataItem.susarGroupOpenId }, function (r) {
                    if (r.error) {
                        if (viewModel.parseError(r.message)) {
                            viewModel.displayOkWindow(viewModel.parseError(r.message));
                        } else {
                            viewModel.displayOkWindow('An error has occurred.');
                        }
                    } else {
                        //a.detailRow.find('.product-grid-detail').data('kendoGrid').dataSource.read();
                    }
                }, viewModel.delayedProcessing),
                columns: [
                    {
                        command: [{ name: 'edit', text: '', className: 'command-btn' }, {
                            name: 'unlink', text: '', imageClass: 'k-icon k-i-hyperlink-remove', className: 'command-btn unlink-btn', click: function (e) {
                                e.preventDefault(); //prevent page scroll reset
                                var tr = $(e.target).closest("tr"); //get the row
                                var data = this.dataItem(tr); //get the row data so it can be referred later
                                var grid = this;
                                window.content(windowTemplate(data)); //send the row data object to the template and render it
                                window.center().open();

                                $("#yesButton").click(function () {
                                    data.dirty = true;
                                    grid.dataSource.remove(data);  //prepare a "destroy" request
                                    grid.dataSource.sync();  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
                                    window.close();
                                })
                                $("#noButton").click(function () {
                                    grid.dataSource.cancelChanges();
                                    window.close();
                                })
                            }
                        }], 'title': 'Action', 'width': '30px', attributes: { 'class': 'text-center' }
                    },
                    { field: 'userName', title: 'User', width: '150px' },
                    { field: 'access', title: 'Status', template: kendo.template($('#userProductStatusDetail').html()), width: '150px' },
                ],
                dataBound: function (e) {
                    if (e.sender.dataSource.view().length === 0) {
                        var count = 0
                        $.map(e.sender.columns, function (val, i) { if (!val.hidden) { ++count; } }); //count visible columns of grid
                        e.sender.tbody.append($("<tr><td colspan='" + count + "'>No records</td></tr>"));
                    }
                    $('.k-grid span.k-icon.k-i-arrowhead-s').text('');
                    $('.k-grid span.k-icon.k-i-filter').text('');

                    COMM.tooltip(e);
                },
                cancel: function (e) {
                    //unbind change events in checkbox
                    $('#product_link_user_window_blinded_edit').unbind('change');
                    $('#product_link_user_window_open_edit').unbind('change');
                },
                edit: function (e) {

                    //uncheck all checkboxes then assign checked for vale
                    $("input[name=product_access_create_product]").prop('checked', false);
                    $("input[name=product_access_create_product]").prop('checked', false);
                    if (e.model.access === COMM.PROPERTY.OPEN) {
                        $('#product_link_user_window_open_edit').prop('checked', true);
                    } else {
                        $('#product_link_user_window_blinded_edit').prop('checked', true);
                    }

                    //bind change events for checkbox
                    $('#product_link_user_window_blinded_edit').change(function () {
                        e.model.dirty = true;
                        $('#product_link_user_window_open_edit').prop('checked', (this.checked ? false : true));
                    });
                    $('#product_link_user_window_open_edit').change(function () {
                        e.model.dirty = true;
                        $('#product_link_user_window_blinded_edit').prop('checked', (this.checked ? false : true));
                    });

                    $($(e.container).children()[0]).addClass('p-sm');

                    //Change Update text to Save 
                    var update = $(e.container).parent().find(".k-grid-update");
                    var cancel = $(e.container).parent().find(".k-grid-cancel");
                    $(update).html('<span class="k-icon k-i-save"></span> Save');
                    $(cancel).html('<span class="k-icon k-i-cancel"></span> Cancel');

                    //remove close icon(x) from window
                    $(e.container).parent().find(".k-window-action").css("visibility", "hidden");


                },
                editable: {
                    mode: "popup",
                    template: kendo.template($("#productEditUserProductTemplate").html()),
                    confirmation: false,
                },
                pageable: {
                    pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items' }
                },
                remove: function (e) {
                    e.preventDefault();
                    return;
                },
                save: function (e) {
                    e.preventDefault();
                    var access = $('input[name="product_access_create_product"]:checked').val();
                    if (typeof access === 'undefined') {
                        e.preventDefault();
                        return;
                    }
                    e.model.access = access;

                    viewModel.yesNoWindow.content(viewModel.yesNoWindowTemplate({ msg: 'Please allow up to a minute for the system to propagate all changes. Do you wish to proceed?' })); //send the row data object to the template and render it
                    viewModel.yesNoWindow.center().open();
                    $("#yesWindow").click(function () {
                        viewModel.yesNoWindow.close();
                        e.sender.saveChanges();
                    });
                    $("#noWindow").click(function () {
                        viewModel.yesNoWindow.close();
                    });
                },
                scrollable: true,
                sortable: true,
            }).data("kendoGrid");
        },

        editProductName: function (e) {
            e.preventDefault();
            viewModel.set('product_folder_temp', viewModel.product_folder);
            $("#editProductFolderText").data("kendoWindow").center().open();
        },

        saveProductFolderTxtName: function(e){
            e.preventDefault();
            viewModel.set('product_folder', viewModel.product_folder_temp.substring(0, 255));
            $("input[name='dilProduct']").val(viewModel.product_folder_temp.substring(0, 255));
            $("#editProductFolderText").data("kendoWindow").close();           
        },

        confirmCreatePrd: function (e) {
        	e.preventDefault();
        	viewModel.set('searchUserInput', '');
        	viewModel.set('searchLinkedUserInput', '');
        	$('#productUsersListview').data('kendoListView').dataSource.filter([]);
        	$('#productLinkedUsersListview').data('kendoListView').dataSource.filter([]);
            var validator = $("#createProduct").kendoValidator().data("kendoValidator");
            validator.hideMessages();
            $("#createProduct").data("kendoWindow").center().open();

            $("#productEntity").kendoDropDownList({ optionLabel: "Select Product Entity" });
            $("#productINN").kendoDropDownList({ optionLabel: "Select PV Database INN" });
            $("#Uname").kendoDropDownList({ optionLabel: "Select Username" });

        },

        product_addAllToSelectedListView: function (e) { //link all
            e.preventDefault();
            viewModel.yesNoWindow.content(viewModel.yesNoH4WindowTemplate({ msg: 'Linking all users to this product may take a few seconds to process. Do you wish to proceed?' })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                viewModel.displayWaitingWindow('Processing...');
                setTimeout(function () {
                    var lv = $('#productUsersListview').data('kendoListView');
                    var items = lv.items();
                    $.map(items, function (e, i) {
                        var dataItem = lv.dataItem(e);
                        dataItem.access = COMM.PROPERTY.BLINDED;
                        $('#productLinkedUsersListview').data('kendoListView').dataSource.insert(i++, dataItem);
                        $('#productUsersListview').data('kendoListView').dataSource.remove(lv.dataItem(e));
                    });
                    $('#waitingWindow').data('kendoWindow').close();
                }, 1000);
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        product_removeAllFromSelectedListView: function (e) { //unlink all
            e.preventDefault();
            viewModel.yesNoWindow.content(viewModel.yesNoH4WindowTemplate({ msg: 'Unlinking all users to this product may take a few seconds to process. Do you wish to proceed?' })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                viewModel.displayWaitingWindow('Processing...');
                setTimeout(function () {
                    var lv = $('#productLinkedUsersListview').data('kendoListView');
                    var items = lv.items();
                    $.map(items, function (e, i) {
                        $('#productUsersListview').data('kendoListView').dataSource.insert(i++, lv.dataItem(e));
                        $('#productLinkedUsersListview').data('kendoListView').dataSource.remove(lv.dataItem(e));
                    });
                    $('#waitingWindow').data('kendoWindow').close();
                }, 1000);
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        product_removeFromSelectedListView: function (e) { //unlink
            e.preventDefault();
            var lv = $('#productLinkedUsersListview').data('kendoListView');
            var items = lv.items();
            var i = 0;
            $.map(items, function (e, i) {
                if ($(e).hasClass('active')) {
                    $('#productUsersListview').data('kendoListView').dataSource.insert(i++, lv.dataItem(e));
                    $('#productLinkedUsersListview').data('kendoListView').dataSource.remove(lv.dataItem(e));
                }
            });
        },

        product_addToSelectedListView: function (e) { //link
            e.preventDefault();
            var lv = $('#productUsersListview').data('kendoListView');
            var items = lv.items();

            $.map(items, function (e, i) {
                if ($(e).hasClass('active')) {
                    var dataItem = lv.dataItem(e);
                    dataItem.access = 'Blinded';
                    $('#productLinkedUsersListview').data('kendoListView').dataSource.insert(i++, dataItem);
                    $('#productUsersListview').data('kendoListView').dataSource.remove(lv.dataItem(e));
                }
            });
        },

        product_NotifHistoryOnEdit: function(e){
            e.container.data("kendoWindow").title('View E-mail');
            $(e.container).attr('name', 'viewEmail');
            $(e.container).attr('id', 'viewEmail');
            $($(e.container).children()[0]).css({ width: '700px', padding: '.58em', height: 'auto' });
            e.container.data("kendoWindow").center();
            //Change Update text to Save
            $(e.container).parent().find(".k-grid-update").hide();
            var cancel = $(e.container).parent().find(".k-grid-cancel");
            $(cancel).html('<span class="k-icon k-i-cancel"></span> Close');

            //Insert print-friendly version button
            e.container.find(".k-edit-buttons.k-state-default")
                .prepend('<button class="k-button k-button-icontext k-print-friendly"><span class="k-icon k-i-print"></span> Print-Friendly Version</button>');
            e.container.find(".k-button.k-print-friendly").on("click", function (b) {
                b.preventDefault();
                var win = window.open('', '_blank');
                var data = e.model.metaData;

                //Insert print button
                var preBody = '<!DOCTYPE html><html><head></head><body class="top-navigation pace-done" style="margin: 0; padding: 0; font-family: Verdana; box-sizing: border-box; font-size: 12px;"><div class="productNotification">';
                var aftBody = '</div></body></html>';
                var withBodyClass = preBody + '<div class="container">' + data + '</div>' + aftBody;

                //Insert css scripts
                var scriptIndex = withBodyClass.indexOf('</head>');
                var cssScript = '';
                cssScript += ' <link rel="stylesheet" type="text/css" media="screen" href="media/css/kendo.common.min.css">';
                cssScript += ' <link rel="stylesheet" type="text/css" media="screen" href="media/css/kendo.blueopal.min.css">';
                cssScript += ' <link rel="stylesheet" type="text/css" media="screen" href="media/css/kendo.blueopal.mobile.min.css">';
                cssScript += ' <link rel="stylesheet" type="text/css" media="screen" href="media/css/style.css">';
                cssScript += ' <link rel="stylesheet" type="text/css" media="screen" href="media/css/custom.css">';
                cssScript += ' <link rel="stylesheet" type="text/css" media="screen" href="media/css/email-style.css">';
                var newData = withBodyClass.slice(0, scriptIndex) + cssScript + withBodyClass.slice(scriptIndex);

                //Insert print button
                var printIndex = newData.indexOf('<div class="productNotification">');
                var printButton = '<div style="text-align: right; margin: 10px 500px 0 0; "><button id="printFriendly" class="k-button k-button-icontext k-print-friendly" onclick="onPrintButton()"><span class="k-icon k-i-print"></span> Print</button></div>';
                printButton += '<div class="hr-line-solid clearfix"></div>';
                var withPrintData = newData.slice(0, printIndex) + printButton + newData.slice(printIndex);

                //Insert event button
                var eventIndex = withPrintData.indexOf('</body>');
                var eventString = '';
                eventString += "<script>function onPrintButton(){ var printButton=document.getElementById('printFriendly');printButton.style.visibility='hidden'; window.focus(); window.print(); printButton.style.visibility='visible'; } </script>";
                var withEventString = withPrintData.slice(0, eventIndex) + eventString + withPrintData.slice(eventIndex);

                var finalData = withEventString;
                win.document.write(finalData);
                win.document.title = 'GPE-DIL';
                win.document.close();
            });

            //move edit buttons up on top
            var form = e.container.find('form');
            $('<div class="hr-line-solid clearfix"></div>').prependTo(form);
            e.container.find(".k-edit-buttons.k-state-default").css('border-width', 0).prependTo(form);
            var metaDataViewModel = kendo.observable({
                metaData: e.model.metaData
            });
            kendo.bind($("#metaDataDivPro"), metaDataViewModel);
        },
    	/************ END of PRODUCT tab ************/

		/************ STUDY tab ************/

		/************** STUDY GRID FUNCTIONS ***************/

		//GRID STUDY DATASOURCE
        study_source: function () {
        	return ADMINDAL.study_source(function (r) {
        		if (r.error) {

        			$("#edit-primary-investigational-product-validation").addClass("hide");
        			$("#edit-investigational-product-validation").addClass("hide");

					if (viewModel.parseError(r.message)) {
        				viewModel.displayOkWindow(viewModel.parseError(r.message));
        			}
        			else if (r.duplicate) {
        				viewModel.displayOkWindow('Unable to save because duplicate entry exists.');
        			}
        			else if (r.primary) {
        				$("#edit-primary-investigational-product-validation").removeClass("hide");
        			}
        			else if (r.product) {
        				$("#edit-investigational-product-validation").removeClass("hide");
        			}
        			else {
        				viewModel.displayOkWindow('An error has occurred in Study tab.');
        			}
        		} else {
        			if (r.update) {
        				$('#studygrid').data('kendoGrid').dataSource.read();
        				$('#studygrid').data('kendoGrid').refresh();

        				viewModel.set('primaryProduct', 0);
        				viewModel.set('link_study_to_product_source', []);

        				$('#linkproducttostudy').data('kendoDropDownList').dataSource.filter([]);

        				if (viewModel.study_associated_to_susar === true) {
        					viewModel.set('study_success_message', 'Study and its associated non-approved SUSAR is updated.');
        				}
        				else {
        				    viewModel.set('study_success_message', ' Study Updated.');
        				}

        				$("#studySuccessMessage").data("kendoWindow").center().open();
        			}
        		}
        	});
        },
		//END OF STUDY GRID DATASOURCE

		//COMMON FUNCTIONS FOR STUDY GRID 
        makePrimary: function (e) {
        	$("#confirm-primary-product").data("kendoWindow").close();
        	$("#primary-investigational-product-validation").addClass("hide");
        	var primaryProductData = getProductData();
        	viewModel.set('primaryProduct', primaryProductData.id);
        	$('#createstudygrid').data('kendoGrid').refresh();
        },

        selectCreateProduct: function (e) {
        	$("#product-validation-create").addClass("hide");
        	viewModel.set('investigational_product', e.sender.value());
        },

        createStudy_validateLinkProduct: function (e) {
        	e.preventDefault();
        	if (viewModel.investigational_product !== 0) {
        		$("#linkProductToCreateStudy").data("kendoWindow").close();

        	    //create new data to createstudygrid locally
        		$('#createstudygrid').data('kendoGrid').dataSource.pushCreate({
        		    id: this.investigational_product,
        		    dilProduct: $('#linkproducttocreatestudy').data('kendoDropDownList').dataSource.get(this.investigational_product).dilProduct,
        		    susarGroupId: $('#linkproducttocreatestudy').data('kendoDropDownList').dataSource.get(this.investigational_product).susarGroupId,
        		    susarOpenGroupId: $('#linkproducttocreatestudy').data('kendoDropDownList').dataSource.get(this.investigational_product).susarOpenGroupId,
        		});

        		$("#investigational-product-validation").addClass("hide");
        		$("#primary-investigational-product-validation").addClass("hide");                        	  

        	    viewModel.set('investigational_product', 0);
        	}
        	else {
        		$("#product-validation-create").removeClass("hide");
        	}
        },

        closeLinkProductToCreateStudy: function () {
        	viewModel.set('investigational_product', 0);
        	$("#linkProductToCreateStudy").data("kendoWindow").close();
        },
		//END OF COMMON FUNCTIONS FOR STUDY GRID  

		//FUNCTIONS FOR STUDY GRID CREATE 

        trimStudyId: function (e) {
        	viewModel.set('study_id', viewModel.study_id.trim());
        	viewModel.set('createStudyDirty', true);
        },
        dirtyStudySponsorship: function (e) {
        	viewModel.set('createStudyDirty', true);
        },
        dirtyStudyStatus: function (e) {
        	viewModel.set('createStudyDirty', true);
        },

        confirmCreateStudy: function (e) {
            e.preventDefault();

            var validator = $("#createStudy").kendoValidator().data("kendoValidator");
            validator.hideMessages();
            $("#createStudy").data("kendoWindow").center().open();

        	viewModel.set('primaryProduct', 0);
        	viewModel.set('study_create_list', []);        	

        	$("#studysponsorship").kendoDropDownList({ optionLabel: "Select Study Sponsorship" });
        	$("#studyblindedstatus").kendoDropDownList({ optionLabel: "Select Study Blinded Status" });
        	$("#primaryinvproduct").kendoDropDownList({ optionLabel: "Primary Investigational Product" });
        },

        studyCreate_LinkProducts: function (e) {
        	e.preventDefault();
        	$("#product-validation-create").addClass("hide");
        	viewModel.set('investigational_product', 0);
        	if ($("#createstudygrid").data("kendoGrid").dataSource.data().length > 0) {
        		var len = $("#createstudygrid").data("kendoGrid").dataSource.data().length;
        		var productListDataSource = $("#linkproducttocreatestudy").data("kendoDropDownList").dataSource;
        		var filter = { logic: "and",filters: [] }
        		var filterValue = $("#createstudygrid").data("kendoGrid").dataSource.data()
        		for (var i = 0; i < len; i++) {
        			filter.filters.push({ field: "id", operator: "neq", value: filterValue[i].id });
        			productListDataSource.filter(filter);
        		}
        	}
        	$("#linkproducttocreatestudy").data("kendoDropDownList").refresh();
        	$("#linkProductToCreateStudy").data("kendoWindow").center().open();
        },

        validateCreateStudy: function (e) {
        	e.preventDefault();
        	var investigationalProduct = [];
        	var dataItem = $("#createstudygrid").data("kendoGrid").dataSource.data();
        	for (var i = 0; i < dataItem.length; i++) {
        		investigationalProduct[i] = dataItem[i].id;
        	}
        	viewModel.set('studyInvestigationalProducts', investigationalProduct);

        	$("#investigational-product-validation").addClass("hide");
        	$("#primary-investigational-product-validation").addClass("hide");

        	if (!$("#createStudy").kendoValidator().data("kendoValidator").validate()) {
        		if (viewModel.studyInvestigationalProducts.length === 0) {
        			$("#investigational-product-validation").removeClass("hide");
        		}
        		else if (viewModel.primaryProduct === 0) {
        			$("#primary-investigational-product-validation").removeClass("hide");
        		}
        	}
        	else if ($("#createStudy").kendoValidator().data("kendoValidator").validate()) {
        		if (this.study_id.trim() === '' || this.study_sponsorship === null || this.study_blinded_status === null) {
        			$("#missingFieldsError").data("kendoWindow").center().open();
        		}
        		else if (viewModel.studyInvestigationalProducts.length === 0) {
        			$("#investigational-product-validation").removeClass("hide");
        		}
        		else if (viewModel.primaryProduct === 0) {
        			$("#primary-investigational-product-validation").removeClass("hide");
        		}
        		else {
        			viewModel.set('study_id', this.study_id.trim().toUpperCase());
        			$("#confirmCreateStudy").data("kendoWindow").center().open();
        		}
        	}
        },

        onCancelStudy: function (e) {
        	e.preventDefault();

        	if (viewModel.createStudyDirty === true || $('#createstudygrid').data('kendoGrid').dataSource.data().length > 0) {
        		$("#cancelStudy").data("kendoWindow").center().open();
        	}
        	else if (viewModel.createStudyDirty === false || $('#createstudygrid').data('kendoGrid').dataSource.data().length === 0) {
        	viewModel.set('study_id', '')
        	viewModel.set('study_sponsorship', null)
        	viewModel.set('study_blinded_status', null)

        	$('#linkproducttostudy').data('kendoDropDownList').dataSource.filter([]);

        		$("#createStudy").data("kendoWindow").close();
        	}
        },

        onSaveStudy: function (e) {
        	e.preventDefault();
        	try {
        		//check for null and empty values
        		if (viewModel.study_id.trim() === '' || viewModel.study_id === null ||
					viewModel.studyInvestigationalProducts.length === 0 || viewModel.studyInvestigationalProducts === null ||
					viewModel.primaryProduct === 0 || viewModel.primaryProduct === null ||
					viewModel.study_sponsorship.trim() === '' || viewModel.study_sponsorship === null ||
					viewModel.study_blinded_status.trim() === '' || viewModel.study_blinded_status === null) {
        			viewModel.set('study_error_message', 'An error has occured.');
        			$("#createStudyError").data("kendoWindow").center().open();
        		}
        		else {
        			//proceed to creation of study
        			ADMINDAL.createStudy_StudyList({
        				studyId: viewModel.study_id,
        				investigationalProduct: viewModel.studyInvestigationalProducts,
        				primaryInvestigationalProduct: viewModel.primaryProduct,
        				studySponsorship: viewModel.study_sponsorship,
        				studyBlindedStatus: viewModel.study_blinded_status,
        			}, function (r) {
        			    if (r.error) {
        			        $("#confirmCreateStudy").data("kendoWindow").close();
        			        if (viewModel.parseError(r.message)) {
        			            viewModel.displayOkWindow(viewModel.parseError(r.message));
        			        } else {
        			            viewModel.displayOkWindow('An error has occurred.');
        			        }
        				}
        				else if (!r.error) {
        					//close all popup windows and refresh the ui and datasource of the grid
        					viewModel.set('study_success_message', 'Study successfully created.');
        					$("#studySuccessMessage").data("kendoWindow").center().open();
        					$("#confirmCreateStudy").data("kendoWindow").center().close();
        					$("#createStudy").data("kendoWindow").center().close();
        					$('#studygrid').data('kendoGrid').dataSource.read();
        					$('#studygrid').data('kendoGrid').refresh();

        					//resets all parameter to null or empty after creation of study
        					viewModel.set('study_id', '');
        					viewModel.set('studyInvestigationalProducts', null);
        					viewModel.set('primaryProduct', 0);
        					viewModel.set('study_sponsorship', '');
        					viewModel.set('study_blinded_status', '');

        					viewModel.set('investigational_product', 0);
        					viewModel.set('study_create_list', []);
        					viewModel.set('link_study_to_product_source', []);

        					$('#linkproducttocreatestudy').data('kendoDropDownList').dataSource.filter([]);

        				}
        			});
        		}
        	}
        	catch (error) {
        		console.log(error);
        	}
        },
        
        onCreateStudyProductLink: function (e) {
            e.container.data("kendoWindow").title('Link User To Product');
            $(e.container).attr('name', 'createStudyForm');
            $(e.container).attr('id', 'createstudyProductLink');
            $($(e.container).children()[0]).css({ width: '1000px', padding: '.58em' });
            e.container.data("kendoWindow").center().open();

            $('#createstudygrid').find('.k-edit-buttons').remove();

            //$(".k-grid-update").html('<span class="k-icon k-i-save"></span> Save');
            //$(".k-grid-cancel").html('<span class="k-icon k-i-cancel"></span> Cancel');

            //var buttons = $('#createstudygrid').find('.k-edit-buttons');
            //var form = $('#createstudyProductLink');
            //buttons.prependTo(form);

            ////move edit buttons up on top
            //var form = e.container.find('form');
            //$('<div class="hr-line-solid clearfix"></div>').prependTo(form);
            //e.container.find(".k-edit-buttons.k-state-default").css('border-width', 0).prependTo(form);

            $("input[name=searchStudyInputUsers]").val('');
            $("input[name=searchStudyLinkedUsers]").val('');

            //search users
            e.container.find("input[name='searchStudyInputUsers']").keyup(function (a) {
                viewModel.onSearchKeyUp(a);
            });

            e.container.find("button[name='searchStudyUsers']").click(function (a) {
                var value = $("input[name=searchStudyInputUsers]").val();
                viewModel.onSearchStudyUsers(a, value);
            });

            e.container.find("input[name='searchStudyLinkedUsers']").keyup(function (a) {
                viewModel.onSearchKeyUp(a);
            });

            e.container.find("button[name='searchStudyLinkedUsers']").click(function (a) {
                var value = $("input[name=searchStudyLinkedUsers]").val();
                viewModel.onSearchStudyLinkedUsers(a, value);
            });


            e.container.find("ul[name='availableusers_listview']").kendoListView({
                dataSource: ADMINDAL.product_user_list_all,
                dataBound: function (a) {
                    //a.sender.dataSource.read();
                    var usersDS = a.sender.dataSource;
                    var linkedUsersLv = e.container.find("ul[name='selectedusers_listview']").data('kendoListView');
                    if (!linkedUsersLv || !linkedUsersLv.dataSource) {
                        return;
                    } else {
                    }
                    var linkedUsersDS = linkedUsersLv.dataSource;
                    var linkedUsers = linkedUsersDS.data();
                    for (var i = 0; i < linkedUsers.length; i++) {
                        var dataItem = null;
                        dataItem = usersDS.get(linkedUsers[i].userRefId);
                        try {
                            usersDS.remove(dataItem);
                        } catch (err) { }
                    }
                },
                template: kendo.template($("#studyUserListTemplate").html())
            });

            var previousSelectedData = null;
            e.container.find("ul[name='selectedusers_listview']").kendoListView({
                dataSource: ADMINDAL.product_user_product_list_no_page({ productId: e.model.id }, function (r) {
                    if (r.error) {
                        viewModel.displayOkWindow(r.message);
                    } else {
                        previousSelectedData = r;
                    }
                }),
                dataBound: function (a) {
                    var usersLv = e.container.find("ul[name='availableusers_listview']").data('kendoListView');
                    if (!usersLv || !usersLv.dataSource) {
                        return;
                    }
                    var usersDS = usersLv.dataSource;
                    var linkedUsers = a.sender.dataSource.data();
                    for (var i = 0; i < linkedUsers.length; i++) {
                        var dataItem = null;
                        dataItem = usersDS.get(linkedUsers[i].userRefId);
                        try {
                            usersDS.remove(dataItem);
                        } catch (err) { }
                    }
                },
                template: kendo.template($("#studyLinkedUserTemplate").html())
            });

            e.container.find("ul[name='availableusers_listview']").data('kendoListView').dataSource.filter([]);
            e.container.find("ul[name='selectedusers_listview']").data('kendoListView').dataSource.filter([]);
            e.container.find("ul[name='availableusers_listview']").data('kendoListView').refresh();
            e.container.find("ul[name='selectedusers_listview']").data('kendoListView').refresh();
            e.container.find("ul[name='availableusers_listview']").data('kendoListView').dataSource.read();
            e.container.find("ul[name='selectedusers_listview']").data('kendoListView').dataSource.read();

            $(e.container).on('click', '.list-group .list-group-item', function () {
                $(this).toggleClass('active');
            });

        	//'X' button on the right side of the text box
            $('.clearable-input-edit').each(function (i, el) {
            	var input = el.querySelector('input');
            	conditionallyHideClearIcon();
            	input.addEventListener('input', conditionallyHideClearIcon);
            	el.querySelector('[data-clear-input]').addEventListener('click', function (a) {
            		if ($(a.currentTarget).prev()[0].name === 'searchStudyInputUsers') {
            			e.container.find("input[name='searchStudyInputUsers']").val('');
            			e.container.find("ul[name='availableusers_listview']").data('kendoListView').dataSource.filter([]);
            		} else if ($(a.currentTarget).prev()[0].name === 'searchStudyLinkedUsers') {
            			e.container.find("input[name='searchStudyLinkedUsers']").val('');
            			e.container.find("ul[name='selectedusers_listview']").data('kendoListView').dataSource.filter([]);
            		}
            		conditionallyHideClearIcon();
            	});

            	function conditionallyHideClearIcon(a) {
            		var target = (a && a.target) || input;
            		target.nextElementSibling.style.display = target.value ? 'block' : 'none';
            	}
            });

            e.container.find('button[name="linkall"]').click(function (j) {
                j.preventDefault();
                viewModel.yesNoWindow.content(viewModel.yesNoH4WindowTemplate({ msg: 'Linking all users to this product may take a few seconds to process. Do you wish to proceed?' })); //send the row data object to the template and render it
                viewModel.yesNoWindow.center().open();
                $("#yesWindow").click(function () {
                    viewModel.yesNoWindow.close();
                    viewModel.displayWaitingWindow('Processing...');
                    setTimeout(function () {
                        viewModel.set('dirtyPage', true);
                        var usersLv = e.container.find("ul[name='availableusers_listview']").data('kendoListView');
                        var linkedUsersLv = e.container.find("ul[name='selectedusers_listview']").data('kendoListView');
                        var items = usersLv.items();
                        $.map(items, function (a, i) {
                            var dataItem = usersLv.dataItem(a);
                            dataItem.userRefId = dataItem.userRefId ? dataItem.userRefId : dataItem.id;
                            dataItem.id = dataItem.userProductId ? dataItem.userProductId : 0;
                            if (dataItem.deleteRequested) dataItem.dirty = true;
                            dataItem.deleteRequested = false;
                            dataItem.dilProductId = e.model.id;
                            dataItem.access = COMM.PROPERTY.BLINDED;
                            linkedUsersLv.dataSource.insert(0, dataItem);
                            usersLv.dataSource.remove(usersLv.dataItem(a));
                        });
                        $('#waitingWindow').data('kendoWindow').close();
                    }, 1000);
                });
                $("#noWindow").click(function () {
                    viewModel.yesNoWindow.close();
                });
            });
            e.container.find('button[name="unlinkall"]').click(function (j) {
                j.preventDefault();
                viewModel.yesNoWindow.content(viewModel.yesNoH4WindowTemplate({ msg: 'Unlinking all users to this product may take a few seconds to process. Do you wish to proceed?' })); //send the row data object to the template and render it
                viewModel.yesNoWindow.center().open();
                $("#yesWindow").click(function () {
                    viewModel.yesNoWindow.close();
                    viewModel.displayWaitingWindow('Processing...');
                    setTimeout(function () {
                        viewModel.set('dirtyPage', true);
                        var usersLv = e.container.find("ul[name='availableusers_listview']").data('kendoListView');
                        var linkedUsersLv = e.container.find("ul[name='selectedusers_listview']").data('kendoListView');
                        var items = linkedUsersLv.items();
                        $.map(items, function (a, i) {
                            var dataItem = linkedUsersLv.dataItem(a);
                            dataItem.userRefId = dataItem.userRefId;
                            dataItem.userProductId = dataItem.id;
                            dataItem.deleteRequested = true;
                            usersLv.dataSource.insert(i++, linkedUsersLv.dataItem(a));
                            linkedUsersLv.dataSource.remove(linkedUsersLv.dataItem(a));
                        });
                        $('#waitingWindow').data('kendoWindow').close();
                    }, 1000);
                });
                $("#noWindow").click(function () {
                    viewModel.yesNoWindow.close();
                });
            });
            e.container.find('button[name="unlink"]').click(function (j) {
                j.preventDefault();
                viewModel.set('dirtyPage', true);
                var usersLv = e.container.find("ul#availableusers_listview").data('kendoListView');
                var linkedUsersLv = e.container.find("ul#selectedusers_listview").data('kendoListView');
                var items = linkedUsersLv.items();
                var i = 0;
                $.map(items, function (a, i) {
                    if ($(a).hasClass('active')) {
                        var dataItem = linkedUsersLv.dataItem(a);
                        dataItem.userRefId = dataItem.userRefId;
                        dataItem.userProductId = dataItem.id;
                        dataItem.deleteRequested = true;
                        usersLv.dataSource.insert(i++, linkedUsersLv.dataItem(a));
                        linkedUsersLv.dataSource.remove(linkedUsersLv.dataItem(a));
                    }
                });
            });
            e.container.find('button[name="link"]').click(function (j) {
                j.preventDefault();
                viewModel.set('dirtyPage', true);
                var usersLv = e.container.find("ul#availableusers_listview").data('kendoListView');
                var linkedUsersLv = e.container.find("ul#selectedusers_listview").data('kendoListView');
                var items = usersLv.items();
                $.map(items, function (a, i) {
                    if ($(a).hasClass('active')) {
                        var dataItem = usersLv.dataItem(a);
                        dataItem.userRefId = dataItem.userRefId ? dataItem.userRefId : dataItem.id;
                        dataItem.id = dataItem.userProductId ? dataItem.userProductId : 0;
                        if (dataItem.deleteRequested) dataItem.dirty = true;
                        dataItem.deleteRequested = false;
                        dataItem.dilProductId = e.model.id;
                        dataItem.access = COMM.PROPERTY.BLINDED;
                        linkedUsersLv.dataSource.insert(0, dataItem);
                        usersLv.dataSource.remove(usersLv.dataItem(a));
                    }
                });
            });

            e.container.find('a[name="saveLinkUser"]').click(function (j) {
                j.preventDefault();
                var dataItem = e.container.find("ul[name='selectedusers_listview']").data('kendoListView').dataSource.data();
                var eData = e;
                var windowLinkUser = $("#confirmStudyLinkUsers").kendoWindow({
                    title: "GPE - DIL",
                    visible: false, //the window will not appear before its .open method is called
                    width: "360px",
                    height: "auto",
                    modal: true,
                    resizable: false,
                }).data("kendoWindow");
                var studyUserLinkTemplate = kendo.template($("#studyUserLinkTemplate").html());
                windowLinkUser.content(studyUserLinkTemplate({ msg: 'On saving, please allow up to a minute for the system to propagate all changes. Would you like to proceed?' })); //send the row data object to the template and render it
                windowLinkUser.center().open();

                $("#StudyUserYES").click(function () {
                    ADMINDAL.study_createUserProductByProduct({
                        productId: eData.model.id,
                        users: dataItem,
                        susarGroupId: eData.model.susarGroupId,
                        susarOpenGroupId: eData.model.susarOpenGroupId,
                        previousSelectedData: previousSelectedData,
                    }, function (r) {
                        if (r.error) {
                            viewModel.set('study_error_message', r.message);
                            $("#createStudyError").data("kendoWindow").center().open();
                        } else {
                            viewModel.delayedProcessing(function () {
                                $('#createstudygrid').data('kendoGrid').refresh();
                            });
                            windowLinkUser.close();
                            viewModel.set('dirtyPage', false);
                        }
                    });
                })
                $("#StudyUserNO").click(function () {
                    viewModel.set('dirtyPage', false);
                    windowLinkUser.close();
                })
            });

            e.container.find('a[name="cancelLinkUser"]').click(function (j) {
            	j.preventDefault();
            	//e.container.data("kendoWindow").close();
            	$('#createstudygrid').data('kendoGrid').dataSource.cancelChanges();
            	viewModel.set('dirtyPage', false);
            });

        },

        onStudyProductLink: function (e) {
        	e.container.data("kendoWindow").title('Link User To Product');
        	$(e.container).attr('id', 'studyProductLink');
        	$($(e.container).children()[0]).css({ width: '1000px', padding: '.58em' });
        	e.container.data("kendoWindow").center().open();

        	//$(".k-grid-update").html('<span class="k-icon k-i-save"></span> Save');
        	//$(".k-grid-cancel").html('<span class="k-icon k-i-cancel"></span> Cancel');

        	$('#editstudygrid').find('.k-edit-buttons').remove();

        	//var buttons = $('#editstudygrid').find('.k-edit-buttons');
        	//var form = $('#studyProductLink');
        	//buttons.prependTo(form);

        	////move edit buttons up on top
        	//var form = e.container.find('form');
        	//$('<div class="hr-line-solid clearfix"></div>').prependTo(form);
        	//e.container.find(".k-edit-buttons.k-state-default").css('border-width', 0).prependTo(form);

        	$("input[name=searchStudyInputUsers]").val('');
        	$("input[name=searchStudyLinkedUsers]").val('');

        	//search users
        	e.container.find("input[name='searchStudyInputUsers']").keyup(function (a) {
        		viewModel.onSearchKeyUp(a);
        	});

        	e.container.find("button[name='searchStudyUsers']").click(function (a) {
        		var value = $("input[name=searchStudyInputUsers]").val();
        		viewModel.onSearchStudyUsers(a, value);
        	});

        	e.container.find("input[name='searchStudyLinkedUsers']").keyup(function (a) {
        		viewModel.onSearchKeyUp(a);
        	});

        	e.container.find("button[name='searchStudyLinkedUsers']").click(function (a) {
        		var value = $("input[name=searchStudyLinkedUsers]").val();
        		viewModel.onSearchStudyLinkedUsers(a, value);
        	});


        	e.container.find("ul[name='availableusers_listview']").kendoListView({
        		dataSource: ADMINDAL.product_user_list_all,
        		dataBound: function (a) {
        			//a.sender.dataSource.read();
        			var usersDS = a.sender.dataSource;
        			var linkedUsersLv = e.container.find("ul[name='selectedusers_listview']").data('kendoListView');
        			if (!linkedUsersLv || !linkedUsersLv.dataSource) {
        				return;
        			} else {
        			}
        			var linkedUsersDS = linkedUsersLv.dataSource;
        			var linkedUsers = linkedUsersDS.data();
        			for (var i = 0; i < linkedUsers.length; i++) {
        				var dataItem = null;
        				dataItem = usersDS.get(linkedUsers[i].userRefId);
        				try {
        					usersDS.remove(dataItem);
        				} catch (err) { }
        			}
        		},
        		template: kendo.template($("#studyUserListTemplate").html())
        	});

        	var previousSelectedData = null;
        	e.container.find("ul[name='selectedusers_listview']").kendoListView({
        		dataSource: ADMINDAL.product_user_product_list_no_page({ productId: e.model.id }, function (r) {
        			if (r.error) {
        				viewModel.displayOkWindow(r.message);
        			} else {
        				previousSelectedData = r;
        			}
        		}),
        		dataBound: function (a) {
        			var usersLv = e.container.find("ul[name='availableusers_listview']").data('kendoListView');
        			if (!usersLv || !usersLv.dataSource) {
        				return;
        			}
        			var usersDS = usersLv.dataSource;
        			var linkedUsers = a.sender.dataSource.data();
        			for (var i = 0; i < linkedUsers.length; i++) {
        				var dataItem = null;
        				dataItem = usersDS.get(linkedUsers[i].userRefId);
        				try {
        					usersDS.remove(dataItem);
        				} catch (err) { }
        			}
        		},
        		template: kendo.template($("#studyLinkedUserTemplate").html())
        	});

        	e.container.find("ul[name='availableusers_listview']").data('kendoListView').dataSource.filter([]);
        	e.container.find("ul[name='selectedusers_listview']").data('kendoListView').dataSource.filter([]);
        	e.container.find("ul[name='availableusers_listview']").data('kendoListView').refresh();
        	e.container.find("ul[name='selectedusers_listview']").data('kendoListView').refresh();
        	e.container.find("ul[name='availableusers_listview']").data('kendoListView').dataSource.read();
        	e.container.find("ul[name='selectedusers_listview']").data('kendoListView').dataSource.read();

        	$(e.container).on('click', '.list-group .list-group-item', function () {
        		$(this).toggleClass('active');
        	});

        	//'X' button on the right side of the text box
        	$('.clearable-input-edit').each(function (i, el) {
        		var input = el.querySelector('input');
        		conditionallyHideClearIcon();
        		input.addEventListener('input', conditionallyHideClearIcon);
        		el.querySelector('[data-clear-input]').addEventListener('click', function (a) {
        			if ($(a.currentTarget).prev()[0].name === 'searchStudyInputUsers') {
        				e.container.find("input[name='searchStudyInputUsers']").val('');
        				e.container.find("ul[name='availableusers_listview']").data('kendoListView').dataSource.filter([]);
        			} else if ($(a.currentTarget).prev()[0].name === 'searchStudyLinkedUsers') {
        				e.container.find("input[name='searchStudyLinkedUsers']").val('');
        				e.container.find("ul[name='selectedusers_listview']").data('kendoListView').dataSource.filter([]);
        			}
        			conditionallyHideClearIcon();
        		});

        		function conditionallyHideClearIcon(a) {
        			var target = (a && a.target) || input;
        			target.nextElementSibling.style.display = target.value ? 'block' : 'none';
        		}
        	});

        	e.container.find('button[name="linkall"]').click(function (j) {
        	    j.preventDefault();

        	    viewModel.yesNoWindow.content(viewModel.yesNoH4WindowTemplate({ msg: 'Linking all users to this product may take a few seconds to process. Do you wish to proceed?' })); //send the row data object to the template and render it
        	    viewModel.yesNoWindow.center().open();
        	    $("#yesWindow").click(function () {
        	        viewModel.yesNoWindow.close();
        	        viewModel.displayWaitingWindow('Processing...');
        	        setTimeout(function () {
        	            viewModel.set('dirtyPage', true);
        	            var usersLv = e.container.find("ul[name='availableusers_listview']").data('kendoListView');
        	            var linkedUsersLv = e.container.find("ul[name='selectedusers_listview']").data('kendoListView');
        	            var items = usersLv.items();
        	            $.map(items, function (a, i) {
        	                var dataItem = usersLv.dataItem(a);
        	                dataItem.userRefId = dataItem.userRefId ? dataItem.userRefId : dataItem.id;
        	                dataItem.id = dataItem.userProductId ? dataItem.userProductId : 0;
        	                if (dataItem.deleteRequested) dataItem.dirty = true;
        	                dataItem.deleteRequested = false;
        	                dataItem.dilProductId = e.model.id;
        	                dataItem.access = COMM.PROPERTY.BLINDED;
        	                linkedUsersLv.dataSource.insert(0, dataItem);
        	                usersLv.dataSource.remove(usersLv.dataItem(a));
        	            });
        	            $('#waitingWindow').data('kendoWindow').close();
        	        }, 1000);
        	    });
        	    $("#noWindow").click(function () {
        	        viewModel.yesNoWindow.close();
        	    });
        	});
        	e.container.find('button[name="unlinkall"]').click(function (j) {
        	    j.preventDefault();

        	    viewModel.yesNoWindow.content(viewModel.yesNoH4WindowTemplate({ msg: 'Unlinking all users to this product may take a few seconds to process. Do you wish to proceed?' })); //send the row data object to the template and render it
        	    viewModel.yesNoWindow.center().open();
        	    $("#yesWindow").click(function () {
        	        viewModel.yesNoWindow.close();
        	        viewModel.displayWaitingWindow('Processing...');
        	        setTimeout(function () {
        	            viewModel.set('dirtyPage', true);
        	            var usersLv = e.container.find("ul[name='availableusers_listview']").data('kendoListView');
        	            var linkedUsersLv = e.container.find("ul[name='selectedusers_listview']").data('kendoListView');
        	            var items = linkedUsersLv.items();
        	            $.map(items, function (a, i) {
        	                var dataItem = linkedUsersLv.dataItem(a);
        	                dataItem.userRefId = dataItem.userRefId;
        	                dataItem.userProductId = dataItem.id;
        	                dataItem.deleteRequested = true;
        	                usersLv.dataSource.insert(i++, linkedUsersLv.dataItem(a));
        	                linkedUsersLv.dataSource.remove(linkedUsersLv.dataItem(a));
        	            });
        	            $('#waitingWindow').data('kendoWindow').close();
        	        }, 1000);
        	    });
        	    $("#noWindow").click(function () {
        	        viewModel.yesNoWindow.close();
        	    });
        	});
        	e.container.find('button[name="unlink"]').click(function (j) {
        		j.preventDefault();
        		viewModel.set('dirtyPage', true);
        		var usersLv = e.container.find("ul#availableusers_listview").data('kendoListView');
        		var linkedUsersLv = e.container.find("ul#selectedusers_listview").data('kendoListView');
        		var items = linkedUsersLv.items();
        		var i = 0;
        		$.map(items, function (a, i) {
        			if ($(a).hasClass('active')) {
        				var dataItem = linkedUsersLv.dataItem(a);
        				dataItem.userRefId = dataItem.userRefId;
        				dataItem.userProductId = dataItem.id;
        				dataItem.deleteRequested = true;
        				usersLv.dataSource.insert(i++, linkedUsersLv.dataItem(a));
        				linkedUsersLv.dataSource.remove(linkedUsersLv.dataItem(a));
        			}
        		});
        	});
        	e.container.find('button[name="link"]').click(function (j) {
        		j.preventDefault();
        		viewModel.set('dirtyPage', true);
        		var usersLv = e.container.find("ul#availableusers_listview").data('kendoListView');
        		var linkedUsersLv = e.container.find("ul#selectedusers_listview").data('kendoListView');
        		var items = usersLv.items();
        		$.map(items, function (a, i) {
        			if ($(a).hasClass('active')) {
        				var dataItem = usersLv.dataItem(a);
        				dataItem.userRefId = dataItem.userRefId ? dataItem.userRefId : dataItem.id;
        				dataItem.id = dataItem.userProductId ? dataItem.userProductId : 0;
        				if (dataItem.deleteRequested) dataItem.dirty = true;
        				dataItem.deleteRequested = false;
        				dataItem.dilProductId = e.model.id;
        				dataItem.access = COMM.PROPERTY.BLINDED;
        				linkedUsersLv.dataSource.insert(0, dataItem);
        				usersLv.dataSource.remove(usersLv.dataItem(a));
        			}
        		});
        	});

        	e.container.find('a[name="saveLinkUser"]').click(function (j) {
        		j.preventDefault();
        		var dataItem = e.container.find("ul[name='selectedusers_listview']").data('kendoListView').dataSource.data();
        		var eData = e;
        		var windowLinkUser = $("#confirmStudyLinkUsers").kendoWindow({
        			title: "GPE - DIL",
        			visible: false, //the window will not appear before its .open method is called
        			width: "360px",
        			height: "auto",
        			modal: true,
        			resizable: false,
        		}).data("kendoWindow");
        		var studyUserLinkTemplate = kendo.template($("#studyUserLinkTemplate").html());
        		windowLinkUser.content(studyUserLinkTemplate({ msg: 'On saving, please allow up to a minute for the system to propagate all changes. Would you like to proceed?' })); //send the row data object to the template and render it
        		windowLinkUser.center().open();

        		$("#StudyUserYES").click(function () {
        			ADMINDAL.study_createUserProductByProduct({
        				productId: eData.model.id,
        				users: dataItem,
        				susarGroupId: eData.model.susarGroupId,
        				susarOpenGroupId: eData.model.susarOpenGroupId,
        				previousSelectedData: previousSelectedData,
        			}, function (r) {
        				if (r.error) {
        					viewModel.set('study_error_message', r.message);
        					$("#createStudyError").data("kendoWindow").center().open();
        				} else {
        				    windowLinkUser.close();
        				    viewModel.delayedProcessing(function () {
        				        $('#createstudygrid').data('kendoGrid').refresh();
                            });
        					$("#studyProductLink").data("kendoWindow").close();
        					$("#studyProductLink").data("kendoWindow").open();
        					//$("#studyProductLink").data("kendoWindow").close();
        					$('#editstudygrid').data('kendoGrid').dataSource.cancelChanges();
        					viewModel.set('dirtyPage', false);
        				}
        			});
        		})
        		$("#StudyUserNO").click(function () {
        			viewModel.set('dirtyPage', false);
        			windowLinkUser.close();
        		})
        	});

        	e.container.find('a[name="cancelLinkUser"]').click(function (j) {
        		j.preventDefault();
        		//e.container.data("kendoWindow").close();
        		$('#editstudygrid').data('kendoGrid').dataSource.cancelChanges();
        		viewModel.set('dirtyPage', false);
        	});

        },        

        closeWindowStudy: function (e) {
            e.preventDefault();
            if (viewModel.study_associated_to_susar === true) {
                viewModel.delayedProcessing();
            }
            $("#studySuccessMessage").data("kendoWindow").close();
        },

	    //END OF FUNCTIONS FOR STUDY GRID CREATE 

	    //FUNCTIONS FOR STUDY GRID EDIT

        saveStudyChanges: function (e) {
            var grid = $('#studygrid').data('kendoGrid');
            var dataItem = grid.dataSource.get(viewModel.edit_study_id);
            dataItem.set("associatedToSusar", viewModel.study_associated_to_susar);           
            $('#studygrid').data('kendoGrid').dataSource.sync()
        		.done(function () {
        		    if (viewModel.study_associated_to_susar === true) {
        		        $('#studygrid').data('kendoGrid').dataSource.read();
        		        viewModel.updateGrids('studygrid');
        		        viewModel.set('primaryProduct', 0);
        		        viewModel.set('link_study_to_product_source', []);
        		        $('#linkproducttostudy').data('kendoDropDownList').dataSource.filter([]);
        		        viewModel.set('study_success_message', 'Study and its associated non-approved SUSAR is updated.');
        		        $("#studySuccessMessage").data("kendoWindow").center().open();
        		        $("#confirmStudyEdit").data("kendoWindow").center().close();

        		    } else {
        		        $('#studygrid').data('kendoGrid').dataSource.read();
        		        viewModel.updateGrids('studygrid');
        		        viewModel.set('primaryProduct', 0);
        		        viewModel.set('link_study_to_product_source', []);
        		        $('#linkproducttostudy').data('kendoDropDownList').dataSource.filter([]);
        		        viewModel.set('study_success_message', ' Study Updated.');
        		        $("#studySuccessMessage").data("kendoWindow").center().open();
        		        $("#confirmStudyEdit").data("kendoWindow").center().close();
        		    }
        		})
				.fail(function (err) {
				    console.error(err);
				    if (viewModel.parseError(err)) {
				        viewModel.displayOkWindow(viewModel.parseError(err));
				    } else {
				        viewModel.displayOkWindow('An error has occurred. Please refresh page.');
				    }
				});
        },

        cancelStudyChanges: function (e) {
        	$("#confirmStudyEdit").data("kendoWindow").center().close();
        },

        cancelStudyEdit: function (e) {
        	$("#editStudyForm").data("kendoWindow").center().close();
        	$("#cancelStudyEdit").data("kendoWindow").center().close();
        	$('#studygrid').data('kendoGrid').dataSource.cancelChanges();
        },

        cancelCancelStudyChanges: function (e) {
        	$("#cancelStudyEdit").data("kendoWindow").center().close();
        },

        onEditStudy: function (e) {
        	viewModel.set('checkIfAssociated', false);
        	viewModel.set('dirtyPage', false);

        	e.container.data("kendoWindow").title('Edit Study Information');
        	$(e.container).attr('name', 'editStudyForm');
        	$(e.container).attr('id', 'editStudyForm');
        	$($(e.container).children()[0]).css({ width: '800px', padding: '.58em', height: '500px' });
        	e.container.data("kendoWindow").center();

        	$(e.container).parent().find(".k-grid-update").addClass("save");
        	$(e.container).parent().find(".k-grid-cancel").addClass("cancel");
        	$(e.container).parent().find(".save").removeClass("k-grid-update");
        	$(e.container).parent().find(".cancel").removeClass("k-grid-cancel");

        	//remove close icon(x) from window
        	$(e.container).parent().find(".k-window-action").css("visibility", "hidden");

        	$(".save").attr("id", "save");
        	$(".cancel").attr("id", "cancel");

        	//Change Update text to Save 
        	var update = $(e.container).parent().find(".save");
        	var cancel = $(e.container).parent().find(".cancel");
        	$(update).html('<span class="k-icon k-i-save"></span> Save');
        	$(cancel).html('<span class="k-icon k-i-cancel"></span> Cancel');

         
        	var windowTemplate = kendo.template($("#removeStudyProduct").html());
        	var window = $("#confirmationWindow").kendoWindow({
        		title: "Confirm",
        		visible: false, //the window will not appear before its .open method is called
        		width: "360px",
        		height: "auto",
        		modal: true,
        	}).data("kendoWindow");    

        	e.container.find(".k-edit-buttons .save")
               .before('<div class="pull-left"><button class="k-button k-button-icontext k-show-study-audit"><span class="fa fa-file-text-o"></span> Show Audit Trail</button></div>');
        	e.container.find(".k-button.k-show-study-audit").on("click", function (b) {
        	    b.preventDefault();
        	    $("#viewAuditTrailStudy").data("kendoWindow").center().open();
        	    viewModel.displayLoading($('#auditTrailStudyGrid'), true);
        	    setTimeout(function () {
        	        viewModel.set('auditStudyName', e.model.studyId);
        	        viewModel.set('auditTrailStudy', ADMINDAL.audit_trail_study({
        	            id: e.model.id,
        	            listname: COMM.PROPERTY.STUDY.LIST
        	        }, function (loading) {
        	            viewModel.displayLoading($('.k-widget .k-window'), loading, true);
        	        }, function (r) {
        	            if (r && !r.error) {        	               
        	                viewModel.displayLoading($('#auditTrailStudyGrid'), false);
        	            }
        	        }));
        	        $('#auditTrailStudyGrid').data('kendoGrid').dataSource.read();
        	        $('#auditTrailStudyGrid').data('kendoGrid').refresh();
        	    }, 500);
        	});

        	//move edit buttons up on top
        	var form = e.container.find('form');
        	$('<div class="hr-line-solid clearfix"></div>').prependTo(form);
        	e.container.find(".k-edit-buttons.k-state-default").css('border-width', 0).prependTo(form);


        	e.container.find("input[name='studyId']").change(function (a) {
        		if (e.container.find("input[name='studyId']").val().trim() === '') {
        			e.container.find("input[name='studyId']").val('');
        		}
        		else {
        			e.container.find("input[name='studyId']").val(e.container.find("input[name='studyId']").val().trim());
        		}
        	});

        	e.container.find("input[name='studySponsorship']").kendoDropDownList({
        		dataTextField: "sponsor",
        		dataValueField: "sponsor",
        		valuePrimitive: true,
        		optionLabel: "Select Study Sponsorship",
        		dataSource: ADMINDAL.study_sponsorship_source(),
        	});

        	e.container.find("input[name='studyBlindedStatus']").kendoDropDownList({
        		dataTextField: "status",
        		dataValueField: "status",
        		valuePrimitive: true,
        		optionLabel: "Select Study Blinded Status",
        		dataSource: ADMINDAL.study_blinded_status_source(),
        	});

        	viewModel.set('primaryProduct', e.model.primaryInvProdDILProductID);

        	var createStudyGridDataSource = new kendo.data.DataSource({
        	    schema: {
        	        model: {
        	            id: "id",
        	            fields: {
        	                id: { type: "number" },        	                
        	                dilProduct: { type: "string" },
        	                susarOpenGroupId: { type: "number" },
        	                susarGroupId: { type: "number" }
        	            }
        	        }
        	    },
        	    pageSize: 10
        	});

        	for (var i = 0; i < e.model.investigationalDILProductID.length; i++) {
        		createStudyGridDataSource.pushCreate({
        			id: e.model.investigationalDILProductID[i],
        			dilProduct: e.model.investigationalDILProduct[i],
        			susarOpenGroupId: e.model.susarOpenGroupId[i],
        			susarGroupId: e.model.susarGroupId[i],
        		});
        	}

        	e.container.find("#save").on("click", function (b) {
        		b.preventDefault();

        		e.container.find("form[name='validator']").kendoValidator().data("kendoValidator").validate();

        		$("#edit-investigational-product-validation").addClass("hide");
        		$("#edit-primary-investigational-product-validation").addClass("hide");

        		if (e.container.find("form[name='validator']").kendoValidator().data("kendoValidator").validate() !== false) {
        			if (e.model.investigationalDILProduct.length === 0) {
        				$("#edit-investigational-product-validation").removeClass("hide");
        			}
        			else if (e.model.primaryInvProdDILProductID === 0) {
        				$("#edit-primary-investigational-product-validation").removeClass("hide");
        			}
        			else if (e.model.investigationalDILProduct.length !== 0 || e.model.primaryInvProdDILProductID !== 0) {
        				viewModel.set('edit_study_id', e.model.id);
        				$("#confirmStudyEdit").data("kendoWindow").center().open();
        			}
        		}
        		else {
        			if (e.model.investigationalDILProduct.length === 0) {
        				$("#edit-investigational-product-validation").removeClass("hide");
        			}
        			else if (e.model.primaryInvProdDILProductID === 0) {
        				$("#edit-primary-investigational-product-validation").removeClass("hide");
        			}
        			else if ((e.model.investigationalDILProduct.length !== 0 || e.model.primaryInvProdDILProductID !== 0) && e.container.find("form[name='validator']").kendoValidator().data("kendoValidator").validate() !== false) {
        				viewModel.set('edit_study_id', e.model.id);
        				$("#confirmStudyEdit").data("kendoWindow").center().open();
        			}
        		}
        	});

        	e.container.find("#cancel").on("click", function (b) {
        		b.preventDefault();
        		if ($('#studygrid').data('kendoGrid').dataSource.hasChanges()) {
        		$("#cancelStudyEdit").data("kendoWindow").center().open();
        		}
        		else {
        			$("#editStudyForm").data("kendoWindow").center().close();
        		    $('#studygrid').data('kendoGrid').dataSource.cancelChanges();
        		}
        	});

        	e.container.find("div.create-study-grid").kendoGrid({
        		dataSource: createStudyGridDataSource,

        		cancel: function (e) {
        			//unbind change events in checkbox
        			$('#blindedAccess').unbind('change');
        			$('#openAccess').unbind('change');
        		},
        		columns: [
                    { command: [{ text: 'Make Primary', click: confirmEditPrimaryProduct }], width: '50px' },
                    { 'field': 'dilProduct', title: 'DIL Product', width: '140px', filterable: false, encoded: false },
                    {
                    	'command': [
									{
										name: 'edit', text: '', imageClass: 'k-icon k-i-link-horizontal', className: 'command-btn-user',
									},
									{
										name: 'unlink', text: '', imageClass: 'k-icon k-i-hyperlink-remove', className: 'command-btn-user unlink-btn',
										click: function (e) {
											e.preventDefault(); //prevent page scroll reset
											var tr = $(e.target).closest("tr"); //get the row
											var data = this.dataItem(tr); //get the row data so it can be referred later
											var grid = this;
											window.content(windowTemplate(data)); //send the row data object to the template and render it
											window.center().open();

											$("#yesButton").click(function () {


												productDropdownFilter = $('#linkproducttocreatestudy').data('kendoDropDownList').dataSource.filter([]);

												if (data.id === viewModel.primaryProduct) {
													viewModel.set("primaryInvProdDILProduct", null);
													viewModel.set("primaryProduct", 0);
												}

												grid.dataSource.remove(data)  //prepare a "destroy" request
												grid.dataSource.sync();
												window.close();
											})
											$("#noButton").click(function () {
												window.close();
											})
										}
									}],
                    	'title': 'Action', 'width': '40px'
                    },
        		],
        		dataBound: function (k) {
        			if (viewModel.checkIfAssociated === false) { //this will run when the edit screen is opened
        				ADMINDAL.checkStudyIfAssociatedToSusar({
        					spid: e.model.id
        				}, function (r) {
        					if (r.associatedToSusar === true) {
        						viewModel.set('study_associated_to_susar', true);
        						e.container.find("span[name='associated-to-susar-message']").removeClass("hide");
        						e.container.find("input[name='retire']").prop('disabled', true);
        						e.container.find("input[name='studyId']").kendoComboBox({
        						    valuePrimitive: true,
        						    dataTextField: "studyInn",
        						    dataValueField: "studyInn",
        						    enable: false,
        						});
        					}
        					else {
        						viewModel.set('study_associated_to_susar', false);
        						e.container.find("span[name='associated-to-susar-message']").addClass("hide");
        						e.container.find("input[name='studyId']").kendoComboBox({
        						    filter: "contains",
        						    placeholder: "Study ID",
        						    valuePrimitive: true,
        						    dataTextField: "studyInn",
        						    dataValueField: "studyInn",
        						    popup: {
        						        appendTo: $("#studyContainer")
        						    },
        						    enable: true,
        						    dataSource: ADMINDAL.getStudy_AwareInn()
        						});
        					}

        					viewModel.set('checkIfAssociated', true);

							//will setup the investigational product grid
        					if (e.model.investigationalDILProduct.length > 0) {
        						var rows = k.sender.tbody.children();
        						for (var j = 0; j < rows.length; j++) {
        							var row = $(rows[j]);
        							var dataItemRow = k.sender.dataItem(row);
        							if (dataItemRow.id !== null && viewModel.primaryProduct !== null) {
        								if (dataItemRow.id === viewModel.primaryProduct) { 
        									row[0].childNodes[3].childNodes[1].id = "primaryUnlink";
        									row[0].childNodes[1].childNodes[0].childNodes[1].data = "Primary";
        									row[0].childNodes[1].childNodes[0].id = "primary-investigational-product";
        									row[0].childNodes[1].childNodes[0].className = "k-button k-button-icontext k-state-disabled";
        									$("#primary-investigational-product").removeAttr("href");
        									row.addClass("primaryInvestigationalProduct");
											//disable unlink button for primary
        									if (viewModel.study_associated_to_susar === true) {
        										row[0].childNodes[3].childNodes[1].className = "k-button k-button-icontext k-state-disabled";
        										$('#primaryUnlink').prop('disabled', true);
        										$('#primaryUnlink').removeAttr("href");
        									}
        								}
										//disable make primary buttons
        								else if (viewModel.study_associated_to_susar === true) {
        									if (dataItemRow.id !== viewModel.primaryProduct) {
        										row[0].childNodes[1].childNodes[0].className = "k-button k-button-icontext k-state-disabled";
        									}
        								}
        							}
        						}
        					}
        				});
        			}
        			else { //this will run when a new product is added to the grid
        				var dataBoundDataItem = k.sender.dataSource.data();
        				var investigationalProduct = [];
        				var investigationalProductID = [];
        				var investigationalProductString = [];
        				var productString = [];

        				for (var i = 0; i < dataBoundDataItem.length; i++) {
        					investigationalProduct[i] = dataBoundDataItem[i].dilProduct;
        					investigationalProductID[i] = dataBoundDataItem[i].id;
        					productString[i] = dataBoundDataItem[i].dilProduct;
        				}

        				investigationalProductString = productString.join(', ');

        				var grid = $("#studygrid").data("kendoGrid");
        				var dataItem = grid.dataSource.get(e.model.id);
        				dataItem.set("investigationalDILProduct", investigationalProduct);
        				dataItem.set("investigationalDILProductID", investigationalProductID);
        				dataItem.set("investigationalDILProductString", investigationalProductString);
        				dataItem.set("primaryInvProdDILProduct", viewModel.primaryDILProduct);
        				dataItem.set("primaryInvProdDILProductID", viewModel.primaryProduct);

        				var rows = k.sender.tbody.children();
        				for (var j = 0; j < rows.length; j++) {
        					var row = $(rows[j]);
        					var dataItemRow = k.sender.dataItem(row);
        					if (dataItemRow.id !== null && viewModel.primaryProduct !== 0) {
        						if (dataItemRow.id === viewModel.primaryProduct) {
        							row[0].childNodes[3].childNodes[1].id = "primaryUnlink";
        							row[0].childNodes[1].childNodes[0].childNodes[1].data = "Primary";
        							row[0].childNodes[1].childNodes[0].id = "primary-investigational-product";
        							row[0].childNodes[1].childNodes[0].className = "k-button k-button-icontext k-state-disabled";
        							$("#primary-investigational-product").removeAttr("href");
        							row.addClass("primaryInvestigationalProduct");
        							if (viewModel.study_associated_to_susar === true) {
        								row[0].childNodes[3].childNodes[1].className = "k-button k-button-icontext k-state-disabled";
        								$('#primaryUnlink').prop('disabled', true);
        								$('#primaryUnlink').removeAttr("href");
        							}
        						}
        						else if (viewModel.study_associated_to_susar === true) {
        							if (dataItemRow.id !== viewModel.primaryProduct) {
        								row[0].childNodes[1].childNodes[0].className = "k-button k-button-icontext k-state-disabled";
        							}
        						}
        					}
        				}
        			}

        			if (k.sender.dataSource.view().length === 0) {
        				var count = 0
        				$.map(k.sender.columns, function (val, i) { if (!val.hidden) { ++count; } }); //count visible columns of grid
        				k.sender.tbody.append($("<tr><td colspan='" + count + "'>No records</td></tr>"));
        			}
        			$('.k-grid span.k-icon.k-i-arrowhead-s').text('');
        			$('.k-grid span.k-icon.k-i-filter').text('');

        			COMM.tooltip(k);
        		},
        		editable: {
        			mode: "popup",
        			template: kendo.template($("#studyeditproduct").html())
        		},
        		edit: function (b) {
        			b.preventDefault();
        			viewModel.onStudyProductLink(b);
        		},
				sortable: true,
        		detailTemplate: kendo.template($("#studyProductDetailTemplate").html()),
        		detailInit: function (a) {
        			var dataItem = $("#editstudygrid").data("kendoGrid").dataItem(a.masterRow);

        			var windowTemplate = kendo.template($("#windowTemplate").html());

        			var window = $("#confirmationWindow").kendoWindow({
        				title: "Confirm",
        				visible: false, //the window will not appear before its .open method is called
        				width: "360px",
        				height: "auto",
        				modal: true,
        			}).data("kendoWindow");

        			a.detailRow.find('.study-product-grid-detail').attr('name', dataItem.id).kendoGrid({
        				dataSource: ADMINDAL.study_user_product_list({ productId: dataItem.id }, function (r) {
        					if (r.error) {
        						if (viewModel.parseError(r.message)) {
        							viewModel.displayOkWindow(viewModel.parseError(r.message));
        						}
        						else {
        							var a = setInterval(function () {
        								if ($('#loader').css('opacity') == 0) {
        									clearInterval(a);
        									viewModel.displayOkWindow('An error has occurred.');
        								}
        							}, 500);
        						}
        					} else {
        						a.detailRow.find('.study-product-grid-detail').data('kendoGrid').dataSource.read();
        					}
        				}, viewModel.delayedProcessing),
        				columns: [{
        					command: [{ name: 'edit', text: '', title: 'Edit', className: 'command-btn', }, {
        						name: 'delete', text: '', imageClass: ' k-icon k-i-hyperlink-remove', title: 'Unlink', className: 'command-btn unlink-btn', click: function (e) {
        							e.preventDefault();
        							var tr = $(e.target).closest("tr");
        							var data = this.dataItem(tr);
        							var grid = this;
        							window.content(windowTemplate(data));
        							window.center().open();

        							$("#yesButton").click(function () {
        								e.preventDefault();

        								grid.dataSource.remove(data);
        								grid.dataSource.sync();
        								window.close();
        							})
        							$("#noButton").click(function () {
        								grid.dataSource.cancelChanges();
        								window.close();
        							})


        						}
        					}], 'title': 'Action', 'width': '50px'
        				},
							{ field: 'userName', title: 'User', width: '160px' },
							{ field: 'access', title: 'Access', template: kendo.template($('#userProductStatusDetail').html()), width: '60px' },
        				],
        				dataBound: function (e) {
        					$('.k-grid span.k-icon.k-i-arrowhead-s').text('');
        					$('.k-grid span.k-icon.k-i-filter').text('');

        					if (e.sender.dataSource.view().length === 0) {
        						var count = 0
        						$.map(e.sender.columns, function (val, i) { if (!val.hidden) { ++count; } }); //count visible columns of grid
        						e.sender.tbody.append($("<tr><td colspan='" + count + "'>No records</td></tr>"));
        						COMM.tooltip(e);
        					}
        				},
        				edit: function (e) {
        					//bind change events for checkbox
        					$('#product_link_user_window_blinded_edit').change(function () {
        						$('#product_link_user_window_open_edit').prop('checked', (this.checked ? false : true));
        						e.model.access = "Blinded";
        					});
        					$('#product_link_user_window_open_edit').change(function () {
        						$('#product_link_user_window_blinded_edit').prop('checked', (this.checked ? false : true));
        						e.model.access = COMM.PROPERTY.OPEN;
        					});

        					//uncheck all checkboxes then assign checked for vale
        					$("input[name=product_access_create_product]").prop('checked', false);
        					$("input[name=product_access_create_product]").prop('checked', false);
        					if (e.model.access === COMM.PROPERTY.OPEN) {
        						$('#product_link_user_window_open_edit').prop('checked', true);
        					} else {
        						$('#product_link_user_window_blinded_edit').prop('checked', true);
        					}

        					$($(e.container).children()[0]).addClass('p-sm');

        				    //Change Update text to Save 
        					var update = $(e.container).parent().find(".k-grid-update");
        					var cancel = $(e.container).parent().find(".k-grid-cancel");
        					$(update).html('<span class="k-icon k-i-save"></span> Save');
        					$(cancel).html('<span class="k-icon k-i-cancel"></span> Cancel');

        				    //remove close icon(x) from window
        					$(e.container).parent().find(".k-window-action").css("visibility", "hidden");

        				},
        				editable: {
        					mode: "popup",
        					template: kendo.template($("#editlinkeduserproduct").html()),
        					confirmation: false,
        				},
        				pageable: {
        					pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items' }
        				},
        				remove: function (e) {
        					e.preventDefault();
        					return;
        				},
        				save: function (e) {
        				    e.preventDefault();
        				    var access = $('input[name="product_access_create_product"]:checked').val();
        				    if (typeof access === 'undefined') {
        				        e.preventDefault();
        				        return;
        				    }
        				    e.model.access = access;
        				    e.model.dirty = true;

        				    viewModel.yesNoWindow.content(viewModel.yesNoWindowTemplate({ msg: 'Please allow up to a minute for the system to propagate all changes. Do you wish to proceed?' })); //send the row data object to the template and render it
        				    viewModel.yesNoWindow.center().open();
        				    $("#yesWindow").click(function () {
        				        viewModel.yesNoWindow.close();
        				        e.sender.saveChanges();
        				    });
        				    $("#noWindow").click(function () {
        				        viewModel.yesNoWindow.close();
        				    });
        				},
        				scrollable: true,
                        sortable: true,
        			}).data("kendoGrid");
        		},
        		pageable: {
        			pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items' }
        		},
        		remove: function (e) {
        			e.preventDefault();
        			return;
        		},
        		scrollable: true,
        		toolbar: kendo.template($("#linktouserstudy").html()),
        	}).data("kendoGrid");

        	e.container.find('button[name="study_LinkProduct"]').click(function (j) {
        		j.preventDefault();
        		viewModel.study_LinkProducts(e);
        	});
        	e.container.find('button[name="study_LinkUser"]').click(function (j) {
        		j.preventDefault();
        		viewModel.study_onCreateUserOfCreateStudy(j);
        	});
        	e.container.find('button[name="study_CreateNewProduct"]').click(function (j) {
        		j.preventDefault();
        		viewModel.study_onCreateProductOfCreateStudy(j);
        	});
        },
		//END OF FUNCTIONS FOR STUDY GRID EDIT

		/************** END OF STUDY GRID FUNCTIONS ***************/
        /**  
			* @for - create study grid
			* @desc - open create product window.
			* @implementation - add button to grid toolbar.
			* @author -  cri2x
		*/
        study_onCreateProductOfCreateStudy: function (e) {
            this.set('listViewIsVisible', false);
            this.confirmCreatePrd(e);
        },
        /**  
			* @for - create study grid
			* @desc - open create product window.
			* @implementation - add button to grid toolbar.
			* @author -  cri2x
		*/
        study_onCreateUserOfCreateStudy: function (e) {
            this.set('if_study_create_user', true);
            this.set('listViewIsVisible', false);
            this.confirmCreateNewUser(e);
        },
        /**  
			* @for - study grid when saving data
			* @desc - calls function when a data is updated in the grid.
			* @implementation - create function for save events of kendo grid.
			* @author -  cri2x
		*/
        onSaveStudyData: function (e) {
            e.preventDefault();

            $('#studygrid').data('kendoGrid').dataSource.read();
            $('#studygrid').data('kendoGrid').refresh();
        },

        closeLinkProductToStudy: function () {
        	viewModel.set('investigational_product', 0);
            $("#linkProductToStudy").data("kendoWindow").close();
            
        },

		studyOpenEditWindow: function (e) {
			e.preventDefault();

			var selectedData = e.data;

			viewModel.set('study_original_investigational_product', e.data);

			$("#retire_form").removeClass("hide");
			viewModel.set('study_id', '');
			viewModel.set('study_sponsorship', 0);
			viewModel.set('study_blinded_status', 0);
			viewModel.set('study_susar_status', '');

			ADMINDAL.checkStudyIfAssociatedToSusar({
				spid: e.data.id
			}, function (r) {
				if (r.associatedToSusar === true) {
					$("#study_retire_warning").removeClass("hide");
					$('#study_retire_status').prop('disabled', true);
					viewModel.set('study_associated_to_susar', true);

					viewModel.fillupStudyDetails(selectedData);
				}
				else {
					viewModel.fillupStudyDetails(selectedData);
				}
			});
		},

		fillupStudyDetails: function (e) {
			$("#studysponsorship").kendoDropDownList({ optionLabel: "Select Study Sponsorship" });
			$("#studyblindedstatus").kendoDropDownList({ optionLabel: "Select Study Blinded Status" });
			$("#primaryinvproduct").kendoDropDownList({ optionLabel: "Primary Investigational Product" });

			//fillup the grid with investigational product data from the grid datasource
			for (var i = 0; i < e.investigationalDILProductID.length; i++) {
				viewModel.set('primaryProduct', e.primaryInvProdDILProductID);
				viewModel.set('originalPrimaryProduct', e.primaryInvProdDILProductID)
				$('#createstudygrid').data('kendoGrid').dataSource.pushCreate({
					id: e.investigationalDILProductID[i],
					dilProduct: e.investigationalDILProduct[i],
				});
			}

			//set the initial value of the retire depending grid data
			if (e.retire) {
				$('#study_retire_status').prop('checked', true);
			}
			else if (!e.retire) {
				$('#study_retire_status').prop('checked', false);
			}

			//set value of retire when the checkbox is ticked
			$('#study_retire_status').change(function () {
				if ($('#study_retire_status').is(":checked")) {
					viewModel.set('study_Retire', true);
				}
				else {
					viewModel.set('study_Retire', false);
				}
			});

			//fillup the fields with study data you picked
			viewModel.set('sid', e.id);
			viewModel.set('study_susar_status', e.susarStudySPId);
			viewModel.set('study_id', e.studyId);
			viewModel.set('study_sponsorship', e.studySponsorship);
			viewModel.set('study_blinded_status', e.studyBlindedStatus);
			viewModel.set('study_isImported', e.isImported);

			viewModel.set('isAuditStudyBtnVisible', true);

			$("#createStudy").data("kendoWindow").setOptions({ title: "Edit Study Information" });
			$("#createStudy").data("kendoWindow").center().open();


			//filtering out the selected investigational product of the datasource for investigational product dropdownlist
			var dataItem = $("#createstudygrid").data("kendoGrid").dataSource.data();
			var investigationalProduct = [];
			var productListDataSource = $("#linkproducttostudy").data("kendoDropDownList").dataSource;
			var filter = productListDataSource.filter() || { logic: "and", filters: [] };

			for (var i = 0; i < dataItem.length; i++) {
				filter.filters.push({ field: "id", operator: "neq", value: dataItem[i].id });
				productListDataSource.filter(filter);
			}

			$("#createStudy").data("kendoWindow").center().open();
		},
		
		auditLogStudyOpen: function (e) {
		    e.preventDefault();		   
		},

		onCancelEditStudy: function (e) {
			viewModel.set('checkIfAssociated', false);
		},
		
		updateStudy: function (e) {

			var dataItem = $("#createstudygrid").data("kendoGrid").dataSource.data();
			var investigationalProduct = [];

			for (var i = 0; i < dataItem.length; i++) {
			    investigationalProduct[i] = dataItem[i].id;
			}

			viewModel.set('study_investigational_product', investigationalProduct)

		    var obj = {
		        id: viewModel.sid,
		        studyId: viewModel.study_id,
		        investigationalProduct: viewModel.study_investigational_product,
		        primaryInvestigationalProduct: viewModel.primaryProduct,
		        studySponsorship: viewModel.study_sponsorship,
		        studyBlindedStatus: viewModel.study_blinded_status,
		        retire: viewModel.study_Retire,
		    };

			//check for null and empty value
		    if (obj.id == null || obj.id == 0 ||
                obj.studyId == null || obj.studyId.trim() == '' ||
                obj.investigationalProduct == null || obj.investigationalProduct.length == 0 ||
                obj.studySponsorship == null || obj.studySponsorship.trim() == '' ||
                obj.studyBlindedStatus == null || obj.studyBlindedStatus.trim() == '' ||
                obj.primaryInvestigationalProduct == null || obj.primaryInvestigationalProduct <= 0) {
		    	viewModel.set('study_error_text', 'An error has occured');
		    	$("#studyUpdateError").data("kendoWindow").center().open();
		    }

			ADMINDAL.updateStudy_StudyList(obj, function (r) {
				if (r.error === true) {
					$("#duplicateStudyId").data("kendoWindow").center().open();
				}
				else if (r.error === false) {
					//if study is associated to susar proceed to update susar associated to the edited study
					if (viewModel.study_associated_to_susar === true) {
						ADMINDAL.getAllSUSARAssociatedToStudy({
							studySPID: viewModel.sid,
							studyID: viewModel.study_id,
							primaryDILProduct: viewModel.primaryProduct,
							dilProduct: viewModel.study_investigational_product,
							studySponsorship: viewModel.study_sponsorship,
							studyBlindedStatus: viewModel.study_blinded_status,
						}, function (s) {
							if (s.error) {
								console.error(s.message);
								viewModel.displayOkWindow('An error has occurred in updating associated SUSAR.');
								$('#confirmEditStudy').data('kendoWindow').close();
							} else {
								//refresh grid and reset all parameters to zero and empty value
								$('#studygrid').data('kendoGrid').dataSource.read();
								$('#studygrid').data('kendoGrid').refresh();

								viewModel.set('study_id', '');
								viewModel.set('investigational_product', 0);
								viewModel.set('study_create_list', []);
								viewModel.set('study_sponsorship', '');
								viewModel.set('study_blinded_status', '');
								viewModel.set('primaryProduct', 0);
								viewModel.set('link_study_to_product_source', []);
								viewModel.set('study_Retire', false);

								$('#linkproducttostudy').data('kendoDropDownList').dataSource.filter([]);

								$("#createStudy").data("kendoWindow").center().close();
								$("#confirmEditStudy").data("kendoWindow").center().close();

								if (viewModel.checkIfAssociated === true) {
									viewModel.set('study_success_message', 'Study and its associated SUSAR is updated.');
								}
								else {
									viewModel.set('study_success_message', 'Study Updated.');
								}
								
								$("#studySuccessMessage").data("kendoWindow").center().open();
							}
						});
					}
					//if study is not associated to susar proceed to reload study grid
					else {
						$('#studygrid').data('kendoGrid').dataSource.read();
						$('#studygrid').data('kendoGrid').refresh();

						viewModel.set('study_id', '');
						viewModel.set('investigational_product', 0);
						viewModel.set('study_create_list', []);
						viewModel.set('study_sponsorship', '');
						viewModel.set('study_blinded_status', '');
						viewModel.set('primaryProduct', 0);
						viewModel.set('link_study_to_product_source', []);
						viewModel.set('study_Retire', false);

						$('#linkproducttostudy').data('kendoDropDownList').dataSource.filter([]);

						$("#createStudy").data("kendoWindow").center().close();
						$("#confirmEditStudy").data("kendoWindow").center().close();

						viewModel.set('study_success_message', 'Study Updated.');
						$("#studySuccessMessage").data("kendoWindow").center().open();
					}
				}
			});
		},

		onCreateOrEditStudyRemove: function (e) {
            //set the primaryproduct variable to zero when the primary product is removed from the createstudygrid
            if (viewModel.primaryProduct === e.model.id) {
                viewModel.set('primaryProduct', 0);
            }

            //empty the filter of the datasource
            productDropdownFilter = $('#linkproducttocreatestudy').data('kendoDropDownList').dataSource.filter([]);

		},

        /**  
            * @for - study create
            * @desc - this function is for heirarchy of grid for createstudygrid.
            * @implementation - add to create study window.
            * @author -  cri2x
        */

		onStudyProductDetailInit: function (a) {
			var dataItem = $("#createstudygrid").data("kendoGrid").dataItem(a.masterRow);

			var windowTemplate = kendo.template($("#windowTemplate").html());

			var window = $("#confirmationWindow").kendoWindow({
				title: "Confirm",
				visible: false, //the window will not appear before its .open method is called
				width: "360px",
				height: "auto",
				modal: true,
			}).data("kendoWindow");

			a.detailRow.find('.study-product-grid-detail').attr('name', dataItem.id).kendoGrid({
				dataSource: ADMINDAL.study_user_product_list({ productId: dataItem.id }, function (r) {
					if (r.error) {
					} else {
						a.detailRow.find('.study-product-grid-detail').data('kendoGrid').dataSource.read();
					}
				}, viewModel.delayedProcessing),
				columns: [{
				    command: [{ name: 'edit', text: '', title: 'Edit', className: 'command-btn', }, {
				        name: 'delete', text: '', imageClass: ' k-icon k-i-hyperlink-remove', title: 'Unlink', className: 'command-btn unlink-btn', click: function (e) {
								e.preventDefault(); 
								var tr = $(e.target).closest("tr"); 
								var data = this.dataItem(tr);
								var grid = this;
								window.content(windowTemplate(data)); 
								window.center().open();

								$("#yesButton").click(function () {
									e.preventDefault();

									grid.dataSource.remove(data);
									grid.dataSource.sync();
									window.close();
									//$('#createstudygrid').data('kendoGrid').refresh();
                            })
                            $("#noButton").click(function () {
                                grid.dataSource.cancelChanges();
                                window.close();
                            })

								
                        }
                    }], 'title': 'Action', 'width': '50px'
                },
                    { field: 'userName', title: 'User', width: '160px' },
					{ field: 'access', title: 'Access', template: kendo.template($('#userProductStatusDetail').html()), width: '60px' },
				],
				dataBound: function (e) {
					$('.k-grid span.k-icon.k-i-arrowhead-s').text('');
					$('.k-grid span.k-icon.k-i-filter').text('');

					if (e.sender.dataSource.view().length === 0) {
					    var count = 0
					    $.map(e.sender.columns, function (val, i) { if (!val.hidden) { ++count; } }); //count visible columns of grid
					    e.sender.tbody.append($("<tr><td colspan='" + count + "'>No records</td></tr>"));
						COMM.tooltip(e);
					}
				},
				edit: function (e) {
					//bind change events for checkbox
					$('#product_link_user_window_blinded_edit').change(function () {
						$('#product_link_user_window_open_edit').prop('checked', (this.checked ? false : true));
						e.model.access = "Blinded";
					});
					$('#product_link_user_window_open_edit').change(function () {
						$('#product_link_user_window_blinded_edit').prop('checked', (this.checked ? false : true));
						e.model.access = COMM.PROPERTY.OPEN;
					});

					//uncheck all checkboxes then assign checked for vale
					$("input[name=product_access_create_product]").prop('checked', false);
					$("input[name=product_access_create_product]").prop('checked', false);
					if (e.model.access === COMM.PROPERTY.OPEN) {
						$('#product_link_user_window_open_edit').prop('checked', true);
					} else {
						$('#product_link_user_window_blinded_edit').prop('checked', true);
					}

					$($(e.container).children()[0]).addClass('p-sm');


				    $(".k-grid-update").html('<span class="k-icon k-i-save"></span> Save');
                    $(".k-grid-cancel").html('<span class="k-icon k-i-cancel"></span> Cancel');

				},
				editable: {
					mode: "popup",
					template: kendo.template($("#editlinkeduserproduct").html()),
					confirmation: false,
				},
				pageable: {
					pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items' }
				},
				remove: function (e) {
					e.preventDefault();
					return;
				},
				save: function (e) {
				    e.preventDefault();
				    var access = $('input[name="product_access_create_product"]:checked').val();
				    if (typeof access === 'undefined') {
				        e.preventDefault();
				        return;
				    }
				    e.model.access = access;
				    e.model.dirty = true;

				    viewModel.yesNoWindow.content(viewModel.yesNoWindowTemplate({ msg: 'Please allow up to a minute for the system to propagate all changes. Do you wish to proceed?' })); //send the row data object to the template and render it
				    viewModel.yesNoWindow.center().open();
				    $("#yesWindow").click(function () {
				        viewModel.yesNoWindow.close();
				        e.sender.saveChanges();
				    });
				    $("#noWindow").click(function () {
				        viewModel.yesNoWindow.close();
				    });
				},
				scrollable: true,
                sortable: true,
			}).data("kendoGrid");
		},

		study_onSaveLinkProduct: function (e) {
			e.preventDefault();

			//create new data to createstudygrid locally
			$('#editstudygrid').data('kendoGrid').dataSource.pushCreate({
				id: this.investigational_product,
				dilProduct: $('#linkproducttostudy').data('kendoDropDownList').dataSource.get(this.investigational_product).dilProduct,
			});

			viewModel.set('investigational_product', 0);
			$("#linkProductToStudy").data("kendoWindow").close();
		},

		study_LinkProducts: function (e) {
			e.preventDefault();
			$("#product-validation-edit").addClass("hide");

			if ($("#editstudygrid").data("kendoGrid").dataSource.data().length > 0) {
				var len = $("#editstudygrid").data("kendoGrid").dataSource.data().length;
			var productListDataSource = $("#linkproducttostudy").data("kendoDropDownList").dataSource;
				var filter = { logic: "and", filters: [] }
				var filterValue = $("#editstudygrid").data("kendoGrid").dataSource.data()

				for (var i = 0; i < len; i++) {
					filter.filters.push({ field: "id", operator: "neq", value: filterValue[i].id });
					productListDataSource.filter(filter);
			    }

			}
			$("#linkproducttostudy").data("kendoDropDownList").refresh();
			$("#linkProductToStudy").data("kendoWindow").center().open();
		},		

		selectEditProduct: function (e) {
			$("#product-validation-edit").addClass("hide");
			viewModel.set('investigational_product', e.sender.value());
		},

		study_validateLinkProduct: function (e) {
			e.preventDefault();

			if (viewModel.investigational_product !== null) {
				var selectedDILProduct = $('#linkproducttostudy').data('kendoDropDownList').dataSource.get(this.investigational_product).dilProduct;
				$("#linkProductToStudy").data("kendoWindow").close();
				//create new data to createstudygrid locally
				$('#editstudygrid').data('kendoGrid').dataSource.pushCreate({
					id: viewModel.investigational_product,
					dilProduct: selectedDILProduct,
				});




				viewModel.set('investigational_product', 0);
			}
			else {
				$("#product-validation-edit").removeClass("hide");
			}
		},

        closeStudyProductError: function (e) {
            $("#studyLinkProductError").data("kendoWindow").close();
        },

        study_linkUserToProduct: function (e) {
            e.preventDefault();
            console.log(e);
        },

        study_onCancelLinkProduct: function (e) {
            $("#linkProductToStudy").data("kendoWindow").close();
        },

        makeEditPrimary: function (e) {
        	$("#confirm-edit-primary-product").data("kendoWindow").close();
        	var primaryProductData = getProductData();
        	viewModel.set('primaryProduct', primaryProductData.id);
        	viewModel.set('primaryDILProduct', primaryProductData.dilProduct);
        	$('#editstudygrid').data('kendoGrid').refresh();
        },

        editStudyProduct: function (e) {
            $("#linkProductToStudy").data("kendoWindow").center().open();
        },

        /************ END of STUDY tab ************/

		/************* Start of User Tab **********/

        detectUserDirty: function (e) {
        	e.preventDefault();
        	viewModel.set('dirtyPage', true);
        },

        user_onSaveLinkProduct: function (e) {
            e.preventDefault();            
            if (this.user_link_product === 0 || !this.user_link_product || $('input[name="user_status"]:checked').length !== 1) {
                if (this.user_link_product === 0 || !this.user_link_product) {
                    viewModel.set('user_error_text', 'Please select a product');
                } else if ($('input[name="user_status"]:checked').length !== 1) {
                    viewModel.set('user_error_text', 'Please select a status');
                }
                $("#generalErrorWin").data("kendoWindow").center().open();
                return;
            }

            var previousProductListValue = $('#selected_listview').data('kendoGrid').dataSource.data();
            
            ADMINDAL.user_productDuplicationChecker({
                newUserLinkProductID: this.user_link_product,
                previousProductListData: previousProductListValue
            }, function (r) {
                if (r.error) {
                    if (r.hasDuplicate) {
                        viewModel.set('user_error_text', 'This product is already linked to this user. Please try again');
                        $("#generalErrorWin").data("kendoWindow").center().open();
                    }
                    if (r.SPerror) {
                        console.error(r.message);
                        alert('A System Error has occured.')
                    }
                } else {
                    $('#selected_listview').data('kendoListView').dataSource.pushCreate({
                        id: viewModel.user_link_product,
                        productId: $('#user_link_product_window').data('kendoDropDownList').dataSource.get(viewModel.user_link_product).id,
                        dilProductName: $('#user_link_product_window').data('kendoDropDownList').dataSource.get(viewModel.user_link_product).dilproduct,
                        susarOpenGroupId: $('#user_link_product_window').data('kendoDropDownList').dataSource.get(viewModel.user_link_product).susarOpenGroupId,
                        susarGroupId: $('#user_link_product_window').data('kendoDropDownList').dataSource.get(viewModel.user_link_product).susarGroupId,
                        objVersion: $('#user_link_product_window').data('kendoDropDownList').dataSource.get(viewModel.user_link_product).objVersion,
                        access: $('input[name="user_status"]:checked', '#productLink').val()
                    });
                    viewModel.set('user_link_product', 0);
                    $("#user_link_product_window").data("kendoDropDownList").value(0);

                    $("#productLink").data("kendoWindow").close();
                }
            });

        },

        user_onCancelLinkProduct: function (e) {
            kendo.ui.progress($("#productLink").parent(), true);
            $("#productLink").parent().find('button').prop('disabled', true);
            $("#productLink").data("kendoWindow").close();
        },

        product_onLinkProductsAvailable: function (e) {
            e.preventDefault();
            kendo.ui.progress($("#productLink").parent(), false);
            $("#productLink").parent().find('button').prop('disabled', false);
            $("#user_link_product_window_blinded").prop("checked", true);
            $("#productLink").data("kendoWindow").center().open();
           
        },

        confirmCreateNewUser:function(e, defaultReadOnly){
        	e.preventDefault();
        	viewModel.set('dirtyPage', false);
        	viewModel.set('userProductInput', '');
        	viewModel.set('userLinkedProductInput', '');
            if (defaultReadOnly) {
                $("#userprofile").prop('disabled', false);
                var $userInput = $("input[name='user_userName']");
                $('div[class="pt-pickSPUser"]').remove();
                $userInput.pickSPUser("method", "destroy");
                $("input[name='user_userName']").pickSPUser({
                        allowMultiples: false,
                        onPickUser: function (personObj) {
                            //get department information using separate function call
                            var user = COMM.getUserProfileInfo(personObj.accountName, personObj.accountId);
                            $('#spEmail').val(personObj.email);
                            $('#spDepartment').val(user.department);
                        },
                        onRemoveUser: function ($input, $ui, personObj) {
                            //clears jquery when user is removed from sp picker
                            $('#spEmail').val('');
                            $('#spDepartment').val('');
                            viewModel.set('user_emailAddress', '');
                        },
                        filterSuggestions: function (suggestions) {
                            //this function filters user account that are system generated
                            var newSuggestions =[];
                            $.each(suggestions, function (i, userInfo) {
                                if (userInfo.accountId !== "-1") {
                                    if(userInfo.label === "System Account") { //filter system account profile
                                        return
                                    } else {
                                        userInfo.label = userInfo.label;
                                        newSuggestions.push(userInfo);
                                        }
                                        }
                                        });
                            return newSuggestions;
                        }
                });

                $("#username").kendoDropDownList({ optionLabel: "Select Username" });
                $("#userprofile").kendoDropDownList({ optionLabel: "Select User Profile" });
                $("#userentity").kendoDropDownList({ optionLabel: "Select User Entity" });
                $("#usercountry").kendoDropDownList({ optionLabel: "Select User Country" });
                $("#userstatus").kendoDropDownList({ optionLabel: "Select User Status" });
                $("#userprofile").data('kendoDropDownList').enable(true);

                $(".tt-delete-icon").show().click(true);
                //Hide validation messages
                $("span.k-tooltip-validation").hide();

                viewModel.set('user_editMode', false);
                viewModel.set('isAuditUserBtnVisible', false);
                viewModel.set('isUserNotifHistroyBtnVisible', false);
                viewModel.set('user_profileValue', '');
                viewModel.set('user_entityValue', '');
                viewModel.set('user_countryValue', '');
                viewModel.set('userNameEdit', null);
                viewModel.set('save_prompt', 'On saving new user, please allow up to a minute for the system to propagate all changes. Would you like to proceed?');
                viewModel.set('user_link_product', 0);
                viewModel.set('user_isAllOpenChecked', false);
                viewModel.set('isUserEditDisabled', false);
                viewModel.set('isUserStatusDisabled', true);
                viewModel.set('user_linkProductDisabled', false);

                if (e.currentTarget.name === 'product_createUser') {//trigger is from product tab
                    viewModel.set('listViewIsVisible', false);
                } else {
                    viewModel.set('listViewIsVisible', true);
                }
                $("#listA").kendoDraggable({ optionLabel: "Select User Status"
                });
                $("#user_link_product_window").data("kendoDropDownList").value(0);

                $("#userstatus").data("kendoDropDownList").value('Active'); //set user status default to Active
                viewModel.set('user_statusValue', 'Active');

                $('#selected_listview').data('kendoListView').dataSource.data([]);

                $("#createUser").data("kendoWindow").setOptions({ title: "New User Information" });
                $("#createUser").data("kendoWindow").center().open();

                //create read only user to link a product, trigger is from product tab              
                viewModel.set('user_profileValue', COMM.PROPERTY.USERPROFILE.READONLY);
                $("#userprofile").data('kendoDropDownList').enable(false);
                $("#allOpenCheckbox").attr("disabled", false);
                $("#allBlindedCheckbox").attr("disabled", false);
                
            } else {
                viewModel.set('available_Product', ADMINDAL.user_availableProduct(function (q,r) {
                    if (r.error) {
                        if (r.noData) {
                            console.log(r.message);
                        }
                    } else {
                        if (!viewModel.userUnlinkAllProductsOnClick) {
                            $("#userprofile").prop('disabled', false);
                            var $userInput = $("input[name='user_userName']");
                            $userInput.pickSPUser("method", "destroy");
                            $('div[class="pt-pickSPUser"]').remove();

                            $("input[name='user_userName']").pickSPUser({
                                allowMultiples: false,
                                onPickUser: function (personObj) {
                                    //get department information using separate function call
                                    var user = COMM.getUserProfileInfo(personObj.accountName, personObj.accountId);
                                    $('#spEmail').val(personObj.email);
                                    $('#spDepartment').val(user.department);
                                },
                                onRemoveUser: function ($input, $ui, personObj) {
                                    //clears jquery when user is removed from sp picker
                                    $('#spEmail').val('');
                                    $('#spDepartment').val('');
                                    viewModel.set('user_emailAddress', '');
                                },
                                filterSuggestions: function (suggestions) {
                                    //this function filters user account that are system generated
                                    var newSuggestions = [];
                                    $.each(suggestions, function (i, userInfo) {
                                        if (userInfo.accountId !== "-1") {
                                            if (userInfo.label === "System Account") { //filter system account profile
                                                return
                                            } else {
                                                userInfo.label = userInfo.label;
                                                newSuggestions.push(userInfo);
                                            }
                                        }
                                    });
                                    return newSuggestions;
                                }
                            });

                            $("#username").kendoDropDownList({ optionLabel: "Select Username" });
                            $("#userprofile").kendoDropDownList({ optionLabel: "Select User Profile" });
                            $("#userentity").kendoDropDownList({ optionLabel: "Select User Entity" });
                            $("#usercountry").kendoDropDownList({ optionLabel: "Select User Country" });
                            $("#userstatus").kendoDropDownList({ optionLabel: "Select User Status" });
                            $("#userprofile").data('kendoDropDownList').enable(true);

                            $(".tt-delete-icon").show().click(true);
                            //Hide validation messages
                            $("span.k-tooltip-validation").hide();

                            viewModel.set('user_editMode', false);
                            viewModel.set('isAuditUserBtnVisible', false);
                            viewModel.set('isUserNotifHistroyBtnVisible', false);
                            viewModel.set('user_profileValue', '');
                            viewModel.set('user_entityValue', '');
                            viewModel.set('user_countryValue', '');
                            viewModel.set('userNameEdit', null);
                            viewModel.set('save_prompt', 'On saving new user, please allow up to a minute for the system to propagate all changes. Would you like to proceed?');
                            viewModel.set('user_link_product', 0);
                            viewModel.set('user_isAllOpenChecked', false);
                            viewModel.set('isUserEditDisabled', false);
                            viewModel.set('isUserStatusDisabled', true);
                            viewModel.set('user_linkProductDisabled', true);

                            if (e.currentTarget.name === 'product_createUser') {//trigger is from product tab
                                viewModel.set('listViewIsVisible', false);
                            } else {
                                viewModel.set('listViewIsVisible', true);
                            }
                            $("#listA").kendoDraggable({ optionLabel: "Select User Status" });
                            $("#user_link_product_window").data("kendoDropDownList").value(0);

                            $("#userstatus").data("kendoDropDownList").value('Active'); //set user status default to Active
                            viewModel.set('user_statusValue', 'Active');

                            $('#selected_listview').data('kendoListView').dataSource.data([]);

                            $("#createUser").data("kendoWindow").setOptions({ title: "New User Information" });
                            $("#createUser").data("kendoWindow").center().open();                       

                        } else {
                            viewModel.set('userUnlinkAllProductsOnClick', false);
                        }
                    }
                }));                
            }
        },
               
        onSaveProduct: function (e) {
            e.preventDefault();
            $("#saveProduct").data("kendoWindow").center().open();
        },

        onSaveNewUser: function (e) {            
            e.preventDefault();
            var data = [];
            var data = $('#selected_listview').data('kendoListView').dataSource.data();
            
            if (this.user_statusValue !== "Inactive") {
                if (this.isUserReadOnly) {
            if (data.length !== 0) {
            $("#user-productlink-validation").addClass("hide");
            } else {
                $("#user-productlink-validation").removeClass("hide");
                    }
                } else {
                    $("#user-productlink-validation").addClass("hide");
                }
            } else {
                $("#user-productlink-validation").addClass("hide");
            }
            if ($("#createUser").kendoValidator().data("kendoValidator").validate()) {
                //Checking for product code, product nickname, product entity
                if (!this.listViewIsVisible || !this.isStatusActive || !this.isUserReadOnly) {
                    if (this.user_userNameValue.trim() === '' || this.user_countryValue.length === 0 || this.user_statusValue.trim() === '' || this.user_profileValue.trim() === '' || !this.user_entityValue.trim() === '') {
                        //return validation
                    } else {
                        viewModel.set('user_dataItems', data);
                        ADMINDAL.user_data_checker({
                            userName: this.user_userNameValue,
                            data: this.user_dataItems,
                            editMode: this.user_editMode,
                            listViewVisible: this.listViewIsVisible,
                        }, function (r) {
                            if (r && r.error) {
                                //trapping for duplicate username
                                if (r && r.hasDuplicate) {
                                    viewModel.set('user_error_text', 'User name already existing. Please try again.');
                                    $("#generalErrorWin").data("kendoWindow").center().open();
                                }
                            } else {
                                viewModel.set('user_dataItems', data);
                                viewModel.set('user_userNameValue', viewModel.user_userNameValue.trim());
                                viewModel.set('user_profileValue', viewModel.user_profileValue.trim());
                                viewModel.set('user_entityValue', viewModel.user_entityValue.trim());
                                viewModel.set('user_statusValue', viewModel.user_statusValue.trim());
                                $("#saveUser").data("kendoWindow").center().open();
                            }
                        });
                    }
                } else {
                    if (this.user_userNameValue.trim() === '' || this.user_countryValue.length === 0 || this.user_statusValue.trim() === '' || this.user_profileValue.trim() === '' || !this.user_entityValue.trim() === '' || data.length < 1) {
                        
                    } else {
                        viewModel.set('user_dataItems', data);
                        ADMINDAL.user_data_checker({
                            userName: this.user_userNameValue,
                            data: this.user_dataItems,
                            editMode: this.user_editMode,
                            listViewVisible: this.listViewIsVisible,
                        }, function (r) {
                            if (r && r.error) {
                                //trapping for duplicate username
                                if (r && r.hasDuplicate) {
                                    viewModel.set('user_error_text', 'User name already existing. Please try again.');
                                    $("#generalErrorWin").data("kendoWindow").center().open();
                                }
                            } else {
                                viewModel.set('user_dataItems', data);
                                viewModel.set('user_userNameValue', viewModel.user_userNameValue.trim());
                                viewModel.set('user_profileValue', viewModel.user_profileValue.trim());
                                viewModel.set('user_entityValue', viewModel.user_entityValue.trim());
                                viewModel.set('user_statusValue', viewModel.user_statusValue.trim());
                                $("#saveUser").data("kendoWindow").center().open();
                            }
                        });
                    }
                }
            }
        },
            
        saveUserData: function(e){
            //disable confirm button - duplicate prevention
            kendo.ui.progress($(e.currentTarget).parent(), true);
            $(e.currentTarget).parent().find('button').prop('disabled', true);
            e.preventDefault();
            //add trapping if username added is null
            if (viewModel.user_userNameValue !== null) {
                //create user mode
                if (!viewModel.user_editMode) {
                    ADMINDAL.createUser({
                        userName: viewModel.user_userNameValue,
                        userProfile: viewModel.user_profileValue,
                        userEntity: viewModel.user_entityValue,
                        usercountry: viewModel.user_countryValue,
                        userStatus: viewModel.user_statusValue,
                        userEmailAddress: viewModel.user_emailAddress,
                        userProductData: viewModel.user_dataItems,
                        userProductAllOpen: viewModel.user_isAllOpenChecked,
                        userProductAllBlinded: viewModel.user_isAllBlindedChecked
                    }, function (r) {
                        if (!r.error) {
                            //clear user picker  
                            var $userInput = $("input[name='user_userName']");
                            $userInput.pickSPUser("method", "clear");
                            $userInput.pickSPUser("method", "destroy");   
                            $('div[class="pt-pickSPUser-person"]').remove();
                            $('div[class="pt-pickSPUser"]').remove();

                            if (viewModel.if_study_create_user) {
                            	if (viewModel.user_dataItems.length > 0) {
                            		for (var i = 0; i < viewModel.user_dataItems.length; i++) {
                            			if ($("div[name = " + viewModel.user_dataItems[i].id + "]").data('kendoGrid') !== undefined) {
                            				$("div[name = " + viewModel.user_dataItems[i].id + "]").data('kendoGrid').dataSource.read();
                            				viewModel.set('if_study_create_user', false);
                            			}
                            		}
                            	}
                            }

                        	//clear variables after saving success
                            viewModel.set('dirtyPage', false);
                            viewModel.set('user_userNameValue', null);
                            viewModel.set('user_profileValue', '');
                            viewModel.set('user_entityValue', '');
                            viewModel.set('user_countryValue', '');
                            viewModel.set('user_statusValue', '');
                            viewModel.set('user_createError', '');
                            viewModel.set('user_dataItems', []);
                            viewModel.set('user_error_text', '');
                            viewModel.set('user_link_product', 0);
                            viewModel.set('user_emailAddress', '');
                            viewModel.set('isUserEditDisabled', false);
                            viewModel.set('isUserStatusDisabled', false);
                            viewModel.set('userWindowEditDisabled', false);
                            viewModel.displayLoading("#usergrid", false);
                            data = null;

                            viewModel.set('user_newCreatedId', (viewModel.tab == 1 || viewModel.tab == 2) ? r.newID : 0); //id of newly created user
                            $("#user_link_product_window").data("kendoDropDownList").value(0);
                            $('#spEmail').val('');
                            $('#spDepartment').val('');

                            //Set drop downs to dafault values
                            if (!$('#createProduct').data('kendoWindow').element.is(':hidden')) {//create product window is open
                                $("#saveUser").data("kendoWindow").close();
                                $("#createUser").data("kendoWindow").close();
                                viewModel.product_removeExistingUsers();
                            } else if ($('div[name="editProductForm"]:not(:hidden)').length > 0) {//edit product window is open
                                $("#saveUser").data("kendoWindow").close();
                                $("#createUser").data("kendoWindow").close();
                                viewModel.product_removeExistingUsers();
                            } else if ($('div[name="editCreateNewUser"]:not(:hidden)').length > 0) {
                                $("#saveUser").data("kendoWindow").close();
                                $("#createUser").data("kendoWindow").close();
                                //$("#userLink").data("kendoWindow").center().open();
                            } else {
                                $('#userprofile').data('kendoDropDownList').value(0);
                                $('#userentity').data('kendoDropDownList').value(0);
                                $('#userstatus').data('kendoDropDownList').value(0);

                                $("#saveUser").data("kendoWindow").close();
                                $("#createUser").data("kendoWindow").close();                               
                            }

                            //enable confirm save window button - duplicate prevention
                            kendo.ui.progress($('#saveUser').parent(), false);
                            $('#saveUser').parent().find('button').prop('disabled', false);

                            if (r.batchProcessError && r.batchProcessError.length) {
                                console.error(r.batchProcessError);
                                viewModel.set('user_error_text', 'Operation completed but an error has occured during the batching process. Please check if user has access to its assigned product.');
                                $("#generalErrorWin").data("kendoWindow").center().open();
                            }

                            viewModel.delayedProcessing(function () {
                                viewModel.updateGrids('usergrid');
                                $('#usergrid').data('kendoGrid').dataSource.read();
                            });
                        } else {
                            $("#saveUser").data("kendoWindow").close();
                            console.log(r.message);
                            console.error(r.message);
                            if (viewModel.parseError(r.message)) {
                                viewModel.displayOkWindow(viewModel.parseError(r.message));
                            } else {
                                viewModel.displayOkWindow('Error found on updating user information. Please see console for further details.');
                            }
                            //enable confirm save window button - duplicate prevention
                            kendo.ui.progress($('#saveUser').parent(), false);
                            $('#saveUser').parent().find('button').prop('disabled', false);                           
                        }
                        viewModel.set('user_editMode', false);
                    });
                } else {
                    //user edit mode enable
                    var data = [];
                    var data = $('#selected_listview').data('kendoListView').dataSource.data();
                    ADMINDAL.updateUserInfo({
                        userListId: viewModel.user_id,
                        userSPId: viewModel.user_spid,
                        userName: viewModel.user_userNameValue,
                        userProfile: viewModel.user_profileValue,
                        userEntity: viewModel.user_entityValue,
                        usercountry: viewModel.user_countryValue,
                        userStatus: viewModel.user_statusValue,
                        userEmailAddress: viewModel.user_emailAddress,
                        userName2: viewModel.user_userName,
                        accountName: viewModel.user_accountName,
                        userProductDataUpdate: data,
                        userProductAllOpen: viewModel.user_isAllOpenChecked,
                        userProductAllBlinded: viewModel.user_isAllBlindedChecked,
                        origData: viewModel.user_origDataFillEdit,
                        objVersion: viewModel.objVersion,
                    }, function (r) {
                        if (!r.error) {                           
                            //clear variables after success saving.
                            viewModel.set('dirtyPage', false);
                            viewModel.set('user_editMode', false);
                            viewModel.set('user_TextBtn', 'Save');
                            viewModel.set('isLogBtnVisible', false);
                            viewModel.set('user_error_text', '');
                            viewModel.set('user_link_product', 0);
                            viewModel.set('user_emailAddress', '');
                            viewModel.set('user_userName', '');
                            viewModel.set('isUserEditDisabled', false);
                            viewModel.set('isUserStatusDisabled', false);
                            viewModel.set('userWindowEditDisabled', false);
                            viewModel.displayLoading("#usergrid", false);
                            data = null;
                            $('#spEmail').val('');
                            $('#spDepartment').val('');

                            $("#user_link_product_window").data("kendoDropDownList").value(0);

                            //enable confirm save window button - duplicate prevention
                            kendo.ui.progress($('#saveUser').parent(), false);
                            $('#saveUser').parent().find('button').prop('disabled', false);
                            
                            $("#saveUser").data("kendoWindow").close();
                            $("#createUser").data("kendoWindow").close();
                           

                            var $userInput = $("input[name='user_userName']");
                            $userInput.pickSPUser("method", "clear");
                            $userInput.pickSPUser("method", "destroy");
                            $('div[class="pt-pickSPUser-person"]').remove();
                            $('div[class="pt-pickSPUser"]').remove();
                            if (r.batchProcessError && r.batchProcessError.length) {
                                console.error(r.batchProcessError);
                                viewModel.set('user_error_text', 'Operation completed but an error has occured during the batching process. Please check if user has access to its assigned product.');
                                $("#generalErrorWin").data("kendoWindow").center().open();
                            }

                            viewModel.delayedProcessing(function () {
                                $('#usergrid').data('kendoGrid').dataSource.read();
                                viewModel.updateGrids('usergrid');
                            });

                            //viewModel.set('study_success_message', ' User Updated.');
                            //$("#studySuccessMessage").data("kendoWindow").center().open();
                            
                        } else {
                            $("#saveUser").data("kendoWindow").close();
                            console.error(r.message);
                            if (viewModel.parseError(r.message)) {
                                viewModel.displayOkWindow(viewModel.parseError(r.message));
                            } else {
                                viewModel.displayOkWindow('Error found on updating user information. Please see console for further details.');
                            }
                            //enable confirm save window button - duplicate prevention
                            kendo.ui.progress($('#saveUser').parent(), false);
                            $('#saveUser').parent().find('button').prop('disabled', false);                           
                        }
                    });
                }
            }                 
        },

        saveWindow: function (e) {
            e.preventDefault();
            
            $("#saveUser").data("kendoWindow").close();
            $("#saveStudy").data("kendoWindow").close();
            $("#saveProduct").data("kendoWindow").close();
        },

        user_onEditOfUserInfo: function(e){
            //bind change events for checkbox
            $('#user_link_product_window_blinded_edit').change(function () {
                $('#user_link_product_window_open_edit').prop('checked', (this.checked ? false : true));
            });
            $('#user_link_product_window_open_edit').change(function () {
                $('#user_link_product_window_blinded_edit').prop('checked', (this.checked ? false : true));
            });

            //uncheck all checkboxes then assign checked for vale
            $('input[name="user_access_create_user"]').prop('checked', false);
            if (e.model.access === COMM.PROPERTY.OPEN) {
                $('#user_link_product_window_open_edit').prop('checked', true);
            } else {
                $('#user_link_product_window_blinded_edit').prop('checked', true);
            }
        },

        user_onCancelOfUserInfo: function(e){
            //unbind change events in checkbox
            $('#user_link_product_window_blinded_edit').unbind('change');
            $('#user_link_product_window_open_edit').unbind('change');
            e.sender.dataSource.read();
        },

        user_onSaveOfUserInfo: function(e){
            var access = $('input[name="user_access_create_user"]:checked').val();
            if (typeof access === 'undefined') {
                e.preventDefault();
                return;
            }
            var dataItem = $('#userProductCreate').data('kendoGrid').dataSource.getByUid(e.model.uid);
            dataItem.access = access;

            $('#userProductCreate').data('kendoGrid').refresh();
        },

        cancelUserWindow: function (e) {
        	e.preventDefault();
        	viewModel.set('dirtyPage', false);
        	$("#user-productlink-validation").addClass("hide");
            var $userInput = $("input[name='user_userName']");
            $userInput.pickSPUser("method", "destroy");
            $('div[class="pt-pickSPUser"]').remove();
            this.displayLoading("#usergrid", false);
            viewModel.set('user_profileValue', '');
            viewModel.set('user_entityValue', '');
            viewModel.set('user_countryValue', '');
            viewModel.set('user_statusValue', '');
            viewModel.set('user_error_text', '');
            viewModel.set('user_userNameValue', null);
            viewModel.set('userNameEdit', null);
            viewModel.set('user_emailAddress', '');
            viewModel.set('user_TextBtn', 'Save');            
            viewModel.set('isLogBtnVisible', false);
            viewModel.set('userWindowEditDisabled', false);
            viewModel.set('user_store_dataItems', []);
            $('#spEmail').val('');
            $('#spDepartment').val('');
            $('#selected_listview').data('kendoListView').dataSource.data([]);
            $("#user_link_product_window").data("kendoDropDownList").value(0);
            $("#cancelUser").data("kendoWindow").close();
            $("#createUser").data("kendoWindow").close();
        },

        cancelStudyWindow: function (e) {
        	e.preventDefault();
        	viewModel.set('study_id', '')
        	viewModel.set('study_sponsorship', null)
        	viewModel.set('study_blinded_status', null)
        	$('#linkproducttostudy').data('kendoDropDownList').dataSource.filter([]);
        	viewModel.set('createStudyDirty', false);
            $("#cancelStudy").data("kendoWindow").close();
            $("#createStudy").data("kendoWindow").close();

            $("#investigational-product-validation").addClass("hide");
            $("#primary-investigational-product-validation").addClass("hide");

            $('#linkproducttostudy').data('kendoDropDownList').dataSource.read();
        },

        cancelProductWindow: function (e) {
            e.preventDefault
            $("#cancelProduct").data("kendoWindow").close();
            $("#createProduct").data("kendoWindow").close();
        },

        onCancelUser: function (e) {
            e.preventDefault();                 
            if (e.data.dirtyPage) {               
            $("#cancelUser").data("kendoWindow").center().open();
            } else {
                viewModel.set('dirtyPage', false);
                $("#user-productlink-validation").addClass("hide");
                var $userInput = $("input[name='user_userName']");
                $userInput.pickSPUser("method", "destroy");
                $('div[class="pt-pickSPUser"]').remove();
                this.displayLoading("#usergrid", false);

                viewModel.set('user_profileValue', '');
                viewModel.set('user_entityValue', '');
                viewModel.set('user_countryValue', '');
                viewModel.set('user_statusValue', '');
                viewModel.set('user_error_text', '');
                viewModel.set('user_userNameValue', null);
                viewModel.set('userNameEdit', null);
                viewModel.set('user_emailAddress', '');
                viewModel.set('user_TextBtn', 'Save');
                viewModel.set('isLogBtnVisible', false);
                viewModel.set('userWindowEditDisabled', false);
                viewModel.set('user_store_dataItems', []);
                $('#spEmail').val('');
                $('#spDepartment').val('');
                $('#selected_listview').data('kendoListView').dataSource.data([]);
                $("#user_link_product_window").data("kendoDropDownList").value(0);
                $("#cancelUser").data("kendoWindow").close();
                $("#createUser").data("kendoWindow").close();
            }
        },

        onCancelProduct: function (e) {
            e.preventDefault();
            if ($('#productCode').val().length > 0 ||
                $('#productNickname').val().length > 0 ||
                $('#productFolder').val().length > 0 ||
                $('#productDropDownINN').val().length > 0 ||
                $('#productEntity').val().length > 0 ||
                $('#productLinkedUsersListview').data('kendoListView').dataSource.data().length > 0) {
                $("#cancelProduct").data("kendoWindow").center().open();
            } else {
                this.cancelProductWindow(e);
            }
        },
                     
        fillupUserDetails: function (e) {
            $("input[name='user_userName']").pickSPUser({allowMultiples: false});
            var $userInput = $("input[name='user_userName']");
            ADMINDAL.getUserForEdit({ id: e.id, userID: e.userId },
                function (r) {
                    if (!r.error) {    
                        ADMINDAL.getAssociatedProductInfo(r, function (r,y,z) { 
                            if (!z.error) {
                                var windowTemplate = kendo.template($("#userWindowTemp").html());
                                var unlinkprowindow = $("#unlinkProdConfirmationWindow").kendoWindow({
                                    title: "Confirm",
                                    visible: false,
                                    width: "360px",
                                    height: "auto",
                                    modal: true,
                                }).data("kendoWindow");
                                
                                //Hide validation messages
                                $("span.k-tooltip-validation").hide();

                                $("#userprofile").kendoDropDownList({ optionLabel: "Select User Profile" });
                                $("#userentity").kendoDropDownList({ optionLabel: "Select User Entity" });
                                $("#usercountry").kendoDropDownList({ optionLabel: "Select User Country" });
                                $("#userstatus").kendoDropDownList({ optionLabel: "Select User Status" });
                               
                                $userInput.pickSPUser("method", "add", r.userId + ";#" + r.userName);
                                viewModel.set('user_id', r.id);
                                viewModel.set('user_userNameValue', r.userId + ";#" + r.userName);
                                viewModel.set('user_spid', r.userId);
                                viewModel.set('user_profileValue', r.userProfile);
                                viewModel.set('user_accountName', r.accountName);
                                viewModel.set('objVersion', r.objVersion);

                                //Enable only allopen checkbox if profile is read only
                                if (r.userProfile === "Read-Only") {                                    
                                    $("#allOpenCheckbox").attr("disabled", false);
                                    $("#allBlindedCheckbox").attr("disabled", false);
                                    viewModel.set('user_linkProductDisabled', false);
                                    viewModel.set('isUserReadOnly', true);
                                } else {                                    
                                    $("#allOpenCheckbox").attr("disabled", true);
                                    $("#allBlindedCheckbox").attr("disabled", true);
                                    viewModel.set('user_linkProductDisabled', true);
                                    viewModel.set('isUserReadOnly', false);
                                }

                                viewModel.set('user_entityValue', r.userEntity);

                                //get countries associated
                                var countryObj = r.country.trim().split("; ");
                                viewModel.set('user_countryValue', countryObj);
                                r.countryObj = countryObj;

                                viewModel.set('user_statusValue', r.userStatus);
                                viewModel.set('user_userName', r.userName);
                                viewModel.set('user_createError', '');
                                viewModel.set('user_editMode', true);
                                viewModel.set('isAuditUserBtnVisible', true);
                                viewModel.set('isUserNotifHistroyBtnVisible', true);
                                viewModel.set('user_TextBtn', 'Save');
                                viewModel.set('isLogBtnVisible', true);
                                viewModel.set('listViewIsVisible', true);
                                viewModel.set('save_prompt', 'On updating user, please allow up to a minute for the system to propagate all changes. Would you like to proceed?');
                                viewModel.set('user_emailAddress', r.emailAddress);
                                $(".tt-delete-icon").hide().click(false);

                                //load all products with access to edit product grid
                                var hasAllOpenAccess = false;
                                var hasAllBlindedAccess = false;
                                var products = [];
                                if (y && y.length !== 0) {
                                    for (var i = 0; i < y.length; i++) {
                                        if (y[i].dilProductName) {
                                            $('#selected_listview').data('kendoListView').dataSource.insert(i, y[i]);
                                            products.push(y[i]);
                                        }
                                        if (y[i].access === "AllOpen") {
                                            hasAllOpenAccess = true;
                                        }
                                        if (y[i].access === "AllBlinded") {
                                            hasAllBlindedAccess = true;
                                        }
                                    }                                          
                                }                                           

                                r.products = products;
                                if(hasAllOpenAccess){
                                    viewModel.set('user_isAllOpenChecked', true);
                                    viewModel.set('user_isAllBlindedChecked', false);                                    
                                    r.userProductAllOpen = true;
                                    r.userProductAllBlinded = false;
                                } else if (hasAllBlindedAccess) {
                                    viewModel.set('user_isAllOpenChecked', false);
                                    viewModel.set('user_isAllBlindedChecked', true);
                                    r.userProductAllOpen = false;
                                    r.userProductAllBlinded = true;
                                } else {
                                    r.userProductAllOpen = false;
                                    r.userProductAllBlinded = false;
                                    viewModel.set('user_isAllOpenChecked', false);
                                    viewModel.set('user_isAllBlindedChecked', false);
                                }
                                     
                                viewModel.set('user_origDataFillEdit', r);

                                //Prevents user from self deletion/deactivation
                                if (viewModel.user.id === r.userId) {
                                    viewModel.set('isUserEditDisabled', true);
                                    viewModel.set('isUserStatusDisabled', true);
                                } else {
                                    viewModel.set('isUserEditDisabled', false);
                                    viewModel.set('isUserStatusDisabled', false);
                                }

                                //disable allopencheckbox if inactive
                                if (r.userStatus === "Inactive") {
                                    $("#allOpenCheckbox").attr("disabled", true);
                                    $("#allBlindedCheckbox").attr("disabled", true);
                                    viewModel.set('isUserEditDisabled', true);
                                    viewModel.set('user_linkProductDisabled', true);
                                }

                                $('#spEmail').val(r.emailAddress);
                                $('#spDepartment').val(r.department);

                                //remove item from available list 
                                viewModel.set('available_Product', ADMINDAL.user_availableProduct(function (q,r) {
                                        if (r.error) {
                                            if (r.noData) {
                                                console.log(r.message);
                                            }
                                        } else {
                                           var lvAva = $('#available_listview').data('kendoListView').dataSource;
                                           var lvSel = $('#selected_listview').data('kendoListView');
                                           if (!lvSel || !lvSel.dataSource) {
                                               return;
                                           } else {
                                                    }
                                           var lvSelDS = lvSel.dataSource;
                                           var SelProduct = lvSelDS.data();
                                           for (var i = 0; i < SelProduct.length; i++) {
                                               var dataItem = null;
                                               dataItem = lvAva.get(SelProduct[i].productId);
                                               try {
                                                   lvAva.remove(dataItem);
                                               } catch (err) { }
                                           }                                             
                                           $('#selected_listview').data('kendoListView').dataSource.filter([]);
                                           $("#createUser").data("kendoWindow").setOptions({ title: "Edit User Information" });
                                           $("#createUser").data("kendoWindow").center().open();
                                        }
                                    })
                                );
                                $('#available_listview').data('kendoListView').dataSource.read();
                                viewModel.set('dirtyPage', false);
                            } else {
                                console.error(z.message);
                                if (viewModel.parseError(r.message)) {
                                    viewModel.displayOkWindow(viewModel.parseError(r.message));                                    
                                } else {
                                    viewModel.displayOkWindow('Error found on getting user-product information. Please see console for further details.');
                                }                               
                            }
                        });
                    } else {
                        console.error(r.message);
                        if (viewModel.parseError(r.message)) {
                            viewModel.displayOkWindow(viewModel.parseError(r.message));                            
                        } else {
                            viewModel.displayOkWindow('Error found on getting user details. Please see console for further details.');
                        }                       
                    }

                }
            );

        },

        user_onProductGridRemove: function(a){
            a.preventDefault();
            alert("no");
        },

        onDetailInitUserGrid: function (a) {
            var dataItem = $("#usergrid").data("kendoGrid").dataItem(a.masterRow);
            var windowTemplate = kendo.template($("#userWindowTemp").html());           
            var unlinkprowindow = $("#unlinkProdConfirmationWindow").kendoWindow({
                title: "Confirm",
                visible: false, 
                width: "400px",
                height: "auto",
                modal: true,
            }).data("kendoWindow"); 

            a.detailRow.find('.user-grid-detail').kendoGrid({
                dataSource: ADMINDAL.user_user_product_list({
                    userId: dataItem.userId,
                    displayName: dataItem.userName,
                    userRowId: dataItem.id,
                    userProfile: dataItem.userProfile
                },                 
                function (r) {
                    if (r.error) {
                        viewModel.set('user_error_text', 'Error on updating this product. Please see console for further details.');
                        $("#generalErrorWin").data("kendoWindow").center().open();
                    } else {
                        $("#userYesButton").prop('disabled', false);
                        a.detailRow.find('.user-grid-detail').data('kendoGrid').dataSource.read();
                    }                    
                }, viewModel.delayedProcessing),
                sortable: true,
                columns: [
                    {
                        command: [{
                            name: 'edit', text: '', title: 'Edit', className: 'command-btn'                               
                        },
                        {
                            name: 'unlink', text: '', title: 'Unlink', imageClass: 'k-icon k-i-hyperlink-remove', className: 'command-btn unlink-btn', click: function (e) {
                                e.preventDefault();                            
                                var tr = $(e.target).closest("tr"); 
                                var data = this.dataItem(tr); 
                                var grid = this;
                                unlinkprowindow.content(windowTemplate(data));
                                unlinkprowindow.center().open();

                                $("#userYesButton").click(function () {
                                    $("#userYesButton").prop('disabled', true);
                                    grid.dataSource.remove(data)
                                    grid.dataSource.sync()  
                                    unlinkprowindow.close();
                                })
                                $("#userNoButton").click(function () {
                                    grid.dataSource.cancelChanges();
                                    unlinkprowindow.close();
                                })
                            }
                        }], 'title': 'Action', 'width': '40px', attributes: { 'class': 'text-center' }
                    },
                    { field: 'dilProductName', title: 'DIL Product', width: '350px', sortable: true },
                    { field: 'access', title: 'Status', template: kendo.template($('#userProductStatusDetail').html()), width: '80px', sortable: true },
                ],
                dataBound: function (e) {
                    if (e.sender.dataSource.view().length === 0) {
                        var count = 0
                        $.map(e.sender.columns, function (val, i) { if (!val.hidden) { ++count; } }); //count visible columns of grid
                        e.sender.tbody.append($("<tr><td colspan='" + count + "'>No records</td></tr>"));
                    }
                    //function to disable button if only one item left on linked products detail drop down
                    if (dataItem.userStatus === "Active" && e.sender.dataSource.view().length === 1) {                       
                        e.sender.tbody.find(".k-grid-delete").attr("disabled", "disabled").prop("disabled", true);
                    }                  

                    $('.k-grid span.k-icon.k-i-arrowhead-s').text('');
                    $('.k-grid span.k-icon.k-i-filter').text('');

                    COMM.tooltip(e);
                },                
                cancel: function (e) {
                    //unbind change events in checkbox
                    $('#user_link_product_window_blinded_edit').unbind('change');
                    $('#user_link_product_window_open_edit').unbind('change');
                    e.sender.dataSource.read();
                },               
                edit: function (e) {
                    var grid = this;

                    //bind change events for checkbox
                    $('#user_link_product_window_blinded_edit').change(function () {
                            $('#user_link_product_window_open_edit').prop('checked', (this.checked ? false: true));
                    });
                    $('#user_link_product_window_open_edit').change(function () {
                        $('#user_link_product_window_blinded_edit').prop('checked', (this.checked ? false : true));
                    });

                    //uncheck all checkboxes then assign checked for vale
                    $("input[name=product_status_access_blinded]").prop('checked', false);
                    $("input[name=product_status_access_open]").prop('checked', false);
                    if (e.model.access === COMM.PROPERTY.OPEN) {
                        $('#user_link_product_window_open_edit').prop('checked', true);
                    } else {
                        $('#user_link_product_window_blinded_edit').prop('checked', true);
                    }

                    $($(e.container).children()[0]).addClass('p-sm');

                    //Change Update text to Save 
                    var update = $(e.container).parent().find(".k-grid-update");
                    var cancel = $(e.container).parent().find(".k-grid-cancel");
                    $(update).html('<span class="k-icon k-i-save"></span> Save');
                    $(cancel).html('<span class="k-icon k-i-cancel"></span> Cancel');                    

                    //remove close icon(x) from window
                    $(e.container).parent().find(".k-window-action").css("visibility", "hidden");

                },
                editable: {
                    mode: "popup",
                    template: kendo.template($("#userEditUserProductTemplate").html()),
                    confirmation: false,
                },
                pageable: {
                    pageSizes: [10, 20, 50], messages: { itemsPerPage: 'Items per Page', display: '{0} - {1} of {2} Items' }
                },
                save: function (e) {
                    e.preventDefault();
                    //e.container.find('.k-button.k-grid-update').addClass('k-state-disabled').prop('disabled', true);
                    var access = $('input[name="user_access_create_user"]:checked').val();
                    if (typeof access === 'undefined') {
                        e.preventDefault();
                        return;
                    }
                    e.model.access = access;

                    viewModel.yesNoWindow.content(viewModel.yesNoWindowTemplate({ msg: 'Please allow up to a minute for the system to propagate all changes. Do you wish to proceed?' })); //send the row data object to the template and render it
                    viewModel.yesNoWindow.center().open();
                    $("#yesWindow").click(function () {
                        viewModel.yesNoWindow.close();
                        e.sender.saveChanges();     
                                                                
                    });
                    $("#noWindow").click(function () {
                        viewModel.yesNoWindow.close();
                    });
                },
                remove: function (e) {
                    e.preventDefault();
                    return;
                },
                scrollable: true,
            }).data("kendoGrid");
        },

        openUserWindowEdit: function(e){
        	e.preventDefault();
            var $userInput = $("input[name='user_userName']");
            $userInput.pickSPUser("method", "destroy");
            $('div[class="pt-pickSPUser"]').remove();
            this.displayLoading("#usergrid", true);
            viewModel.set('userWindowEditDisabled', true);            
            viewModel.set('user_profileValue', '');
            viewModel.set('user_entityValue', '');
            viewModel.set('user_countryValue', '');
            viewModel.set('user_statusValue', '');
            viewModel.set('userNameEdit', '');
            viewModel.set('userProductInput', '');
            viewModel.set('userLinkedProductInput', '');
            var userDataSelected = e.data;            
            $('#selected_listview').data('kendoListView').dataSource.data([]);           
            if (e.data.userStatus == COMM.PROPERTY.USER.ACTIVE) {
                this.set('user_linkProductDisabled', false);
            } else {
                this.set('user_linkProductDisabled', true);
            }
            this.fillupUserDetails(userDataSelected);          
        },

        auditLogUserOpen: function(e){
            e.preventDefault();           
            $("#viewAuditTrailUser").data("kendoWindow").center().open();
            viewModel.displayLoading($('#auditTrailUserGrid'), true);
            setTimeout(function () {
                viewModel.set('auditUserName', viewModel.user_userName);
                viewModel.set('auditTrailUser', ADMINDAL.audit_trail_user({
                    id: viewModel.user_id,
                    listname: "User"
                }, function (loading) {
                    viewModel.displayLoading($('.k-widget .k-window'), loading, true);
                }, function (r) {
                    if (r && !r.error) {
                        viewModel.set('userExportBtnDisabled', false);
                        viewModel.displayLoading($('#auditTrailUserGrid'), false);
                    }
                }));
                $('#auditTrailUserGrid').data('kendoGrid').dataSource.read();
                $('#auditTrailUserGrid').data('kendoGrid').refresh();
            }, 500);
        },

        userNotifHistoryOpen: function(e){
            e.preventDefault();
            $("#viewUserHistoryNotif").data("kendoWindow").center().open();
            viewModel.displayLoading($('#userNoficationHistoryGrid'), true);
            setTimeout(function () {
                viewModel.set('auditUserName', viewModel.user_userName);
                viewModel.set('userNotificationHistory', ADMINDAL.user_notification_hist({
                    id: viewModel.user_id,                    
                }, function (loading) {
                    viewModel.displayLoading($('.k-widget .k-window'), loading, true);
                }, function (r) {
                    if (r && !r.error) {
                        viewModel.set('userExportBtnDisabled', false);
                        viewModel.displayLoading($('#userNoficationHistoryGrid'), false);
                    }
                }));
                $('#userNoficationHistoryGrid').data('kendoGrid').dataSource.read();
                $('#userNoficationHistoryGrid').data('kendoGrid').refresh();
            }, 500);
        },

        userNotifHistoryOnEdit: function (e) {
            e.container.data("kendoWindow").title('View E-mail');
            $(e.container).attr('name', 'viewEmail');
            $(e.container).attr('id', 'viewEmail');
            $($(e.container).children()[0]).css({ width: '700px', padding: '.58em', height: 'auto' });
            e.container.data("kendoWindow").center();
            //Change Update text to Save
            $(e.container).parent().find(".k-grid-update").hide();
            var cancel = $(e.container).parent().find(".k-grid-cancel");
            $(cancel).html('<span class="k-icon k-i-cancel"></span> Close');

            //Insert print-friendly version button
            e.container.find(".k-edit-buttons.k-state-default")
                .prepend('<button class="k-button k-button-icontext k-print-friendly"><span class="k-icon k-i-print"></span> Print-Friendly Version</button>');
            e.container.find(".k-button.k-print-friendly").on("click", function (b) {
                b.preventDefault();
                var win = window.open('', '_blank');

                //Insert css scripts
                var data = e.model.metaData;
                var scriptIndex = data.indexOf('</head>');
                var cssScript = '';
                cssScript += ' <link rel="stylesheet" type="text/css" media="screen" href="media/css/kendo.common.min.css">';
                cssScript += ' <link rel="stylesheet" type="text/css" media="screen" href="media/css/kendo.blueopal.min.css">';
                cssScript += ' <link rel="stylesheet" type="text/css" media="screen" href="media/css/kendo.blueopal.mobile.min.css">';
                cssScript += ' <link rel="stylesheet" type="text/css" media="screen" href="media/css/style.css">';
                cssScript += ' <link rel="stylesheet" type="text/css" media="screen" href="media/css/custom.css">';
                var newData = data.slice(0, scriptIndex) + cssScript + data.slice(scriptIndex);

                //Insert print button
                var printIndex = newData.indexOf('<table class="body-wrap"');
                var printButton = '<div style="text-align: right; margin: 10px 500px 0 0; "><button id="printFriendly" class="k-button k-button-icontext k-print-friendly" onclick="onPrintButton()"><span class="k-icon k-i-print"></span> Print</button></div>';
                printButton += '<div class="hr-line-solid clearfix"></div>';
                var withPrintData = newData.slice(0, printIndex) + printButton + newData.slice(printIndex);

                //Insert event button
                var eventIndex = withPrintData.indexOf('</body>');
                var eventString = '';
                eventString += "<script>function onPrintButton(){ var printButton=document.getElementById('printFriendly');printButton.style.visibility='hidden'; window.focus(); window.print(); printButton.style.visibility='visible'; } </script>";
                var withEventString = withPrintData.slice(0, eventIndex) + eventString + withPrintData.slice(eventIndex);

                var finalData = withEventString;
                finalData = finalData.replace('<script src="media/js/jquery.SPServices-2014.02.js"></script>', '');
                finalData = finalData.replace('<html>', '<!DOCTYPE html><html>');
                win.document.write(finalData);
                win.document.title = 'GPE-DIL';
                win.document.close();
            });

            //move edit buttons up on top
            var form = e.container.find('form');
            $('<div class="hr-line-solid clearfix"></div>').prependTo(form);
            e.container.find(".k-edit-buttons.k-state-default").css('border-width', 0).prependTo(form);
            var metaDataViewModel = kendo.observable({
                metaData: e.model.metaData
            });
            kendo.bind($("#metaDataDiv"), metaDataViewModel);
        },

        userCreateOnOpen: function (e) {
            if (!viewModel.user_editMode) {
                if (viewModel.user_profileValue) {
                    if (viewModel.user_profileValue === "Read-Only") {
                        $("#allOpenCheckbox").attr("disabled", false);
                        $("#allBlindedCheckbox").attr("disabled", false);
                        $("#allOpenCheckbox").prop("checked", viewModel.user_isAllOpenChecked);
                        $("#allBlindedCheckbox").prop("checked", viewModel.user_isAllBlindedChecked);
                    } else {
                        $("#allOpenCheckbox").attr("disabled", true);
                        $("#allBlindedCheckbox").attr("disabled", true);
                        $("#allOpenCheckbox").prop("checked", viewModel.user_isAllOpenChecked);
                        $("#allBlindedCheckbox").prop("checked", viewModel.user_isAllBlindedChecked);
                    }
                } else {
                    $("#allOpenCheckbox").attr("disabled", true);
                    $("#allBlindedCheckbox").attr("disabled", true);
                    $("#allOpenCheckbox").prop("checked", false);
                    $("#allBlindedCheckbox").prop("checked", false);
                }
            } else {
                $("input[name=all_BO]").prop('checked', false);
                $("#allOpenCheckbox").prop("checked", viewModel.user_isAllOpenChecked);
                $("#allBlindedCheckbox").prop("checked", viewModel.user_isAllBlindedChecked);
            }
            //all blinded and all open            
            $('#allOpenCheckbox').change(function () {
                if (this.checked) {
                    $('#allBlindedCheckbox').prop('checked', false);
                    viewModel.set('user_isAllBlindedChecked', false);
                    viewModel.set('user_isAllOpenChecked', true);
                } else {                    
                    viewModel.set('user_isAllOpenChecked', false);
                }
            });
            $('#allBlindedCheckbox').change(function () {
                if (this.checked) {
                    $('#allOpenCheckbox').prop('checked', false);
                    viewModel.set('user_isAllBlindedChecked', true);
                    viewModel.set('user_isAllOpenChecked', false);
                } else {
                    viewModel.set('user_isAllBlindedChecked', false);
                }
            });

        },
        
        userAccessRightsData: function (e) {
            e.preventDefault();

            //set date ranges
            var today = new Date();
            today = kendo.toString(today, "u");
            var initialDate = kendo.toString(new Date(2000, 0, 1), "u");

            var isByProduct = false;
            if ($('div[name="editProductForm"]:not(:hidden)').length > 0) {
                isByProduct = true;
                product_id = $('div[name="editProductForm"]:not(:hidden)').attr('id');
            }
            try {
                if (isByProduct) {
                    if (!product_id) throw 'No data found';
                    this.user_rightAccessDataLog = { rowId: product_id };
                    $('#userRightsAccessGrid').data('kendoGrid').showColumn('userName');
                    $('#userRightsAccessGrid').data('kendoGrid').hideColumn('dilProductName');
                } else {
                    if (!e.data.user_id) throw 'No data found';
                    this.user_rightAccessDataLog = { rowId: e.data.user_id };
                    $('#userRightsAccessGrid').data('kendoGrid').showColumn('dilProductName');
                    $('#userRightsAccessGrid').data('kendoGrid').hideColumn('userName');
                }
                var ds = ADMINDAL.user_rights_access_log({ rowId: (isByProduct ? product_id : e.data.user_id), startDate: initialDate, endDate: today, isByProduct: isByProduct }, function (r) {
                    if (r.error) {
                        viewModel.set('user_error_text', 'Error: Unable to Query Records');
                        $("#generalErrorWin").data("kendoWindow").center().open();
                    } else {
                        if (!viewModel.user_resetLog) {
                            $("#userRightAccessInfo").data("kendoWindow").center().open();
                        } else {
                            viewModel.set('user_resetLog', false);
                        }
                    }
                });
                $('#userRightsAccessGrid').data('kendoGrid').setDataSource(ds);
            } catch (err) {
                $('#userRightsAccessGrid').data('kendoGrid').setDataSource([]);
            }           
        },       

        userAccessRightsOnClose: function (e) {
            e.preventDefault();
            viewModel.set('user_resetLog', false);
            $('#userRightsAccessGrid').data('kendoGrid').dataSource.data([]);            
        },

        viewLogOnOpen: function(e){
            //e.sender.wrapper.css({ top: 300 });
            kendo.bind($("#userRightsAccessGrid").find(".k-grid-toolbar"), viewModel);
            $("#userAccessDateFro").kendoDatePicker({               
                max: this.userAccessMaxDate,
                min: this.userAccessMinDate
            });
            $("#userAccessDateTo").kendoDatePicker({               
                max: this.userAccessMaxDate,
                min: this.userAccessMinDate
            });
            viewModel.set('isuserRightsAccessGridExportDisabled', (($('#userRightsAccessGrid').data('kendoGrid').dataSource.view().length > 0) ? false : true));

            if ($('div[name="editProductForm"]:not(:hidden)').length > 0) {
                $("#userRightAccessInfo").data("kendoWindow").title("PRODUCT ACCESS LOG");
            } else {
                $("#userRightAccessInfo").data("kendoWindow").title("USER ACCESS LOG");
            }
        },

        closeLogWindow: function (e) {
            e.preventDefault();
            viewModel.set('user_resetLog', false);
            $("#userRightAccessInfo").data("kendoWindow").close(); 
        },

        openUserAccessTimeRange: function (e) {
            //e.preventDefault();
            var today = new Date();            
            var initialDate = new Date(2010, 0, 1);
            viewModel.set('userAccessRangeTo', today);
            viewModel.set('userAccessRangeFrom', initialDate);
            $("#userAccessDateRange").data("kendoWindow").center().open();
        },

        queryDateRangeValues: function(e){
            var startDate = new Date(this.userAccessRangeFrom);
            var endDate = new Date(this.userAccessRangeTo);

            var dataSource = $('#userRightsAccessGrid').data('kendoGrid').dataSource;
            var filter = dataSource.filter();
            var fieldFilters = [];
            if (startDate) {
                fieldFilters.push({ field: 'created', operator: "gte", value: startDate });
            }
            if (endDate) {
                endDate.setHours(23, 59, 59, 59);
                fieldFilters.push({ field: 'created', operator: "lte", value: endDate });
            }
            dataSource.filter(fieldFilters);
        },

        resetUserAccessLog: function(e){
            e.preventDefault();
            viewModel.set('user_resetLog', true);
            this.userAccessRightsData(e);            
        },

        isProfileChange: function(e){
        	e.preventDefault();
        	viewModel.set('dirtyPage', true);
        	$("#user-productlink-validation").addClass("hide");
            var dataItems = $('#selected_listview').data('kendoListView').dataSource.data();
            if (e.data.user_profileValue === "Read-Only") {               
                viewModel.set('user_linkProductDisabled', false);
                viewModel.set('isUserEditDisabled', false);
                viewModel.set('isUserReadOnly', true);
                viewModel.set('user_isAllOpenChecked', false);
                viewModel.set('user_isAllBlindedChecked', false);
                $("#allOpenCheckbox").attr("disabled", false);
                $("#allBlindedCheckbox").attr("disabled", false);
            } else {
                if (dataItems.length > 0) {
                    $("#user_profileConfirm").data("kendoWindow").center().open();
                } else {                    
                    viewModel.set('user_linkProductDisabled', true);
                    viewModel.set('isUserEditDisabled', false);
                    viewModel.set('isUserReadOnly', false);
                    viewModel.set('user_isAllOpenChecked', true);
                    viewModel.set('user_isAllBlindedChecked', false);
                    $("#allOpenCheckbox").attr("disabled", true);
                    $("#allBlindedCheckbox").attr("disabled", true);
                }               
            }           
        },
        
        hasUserStatChanged: function (e) {
        	e.preventDefault();
        	viewModel.set('dirtyPage', false);
            if (e.data.user_editMode) {
                if (e.data.user_statusValue === "Inactive") {
                    var items = $("#selected_listview").data("kendoListView").dataSource.data();
                    if (!items.length) {
                        viewModel.set('isStatusActive', false);                        
                        viewModel.set('isUserEditDisabled', true);
                        viewModel.set('user_isAllOpenChecked', false);
                        viewModel.set('user_isAllBlindedChecked', false);
                        $("#allOpenCheckbox").attr("disabled", true);
                        $("#allBlindedCheckbox").attr("disabled", true);
                        viewModel.set('user_linkProductDisabled', true);
                    } else {
                        $("#user_statusActivity").data("kendoWindow").center().open();
                    }                   
                } else {
                    viewModel.set('isUserEditDisabled', false);
                    if (this.user_profileValue === "Read-Only") {
                        viewModel.set('user_linkProductDisabled', false);
                        viewModel.set('user_isAllOpenChecked', false);
                        viewModel.set('user_isAllBlindedChecked', false);
                        $("#allOpenCheckbox").attr("disabled", false);
                        $("#allBlindedCheckbox").attr("disabled", false);
                    } else {
                        viewModel.set('user_linkProductDisabled', true);
                        viewModel.set('user_isAllOpenChecked', true);
                        viewModel.set('user_isAllBlindedChecked', false);
                        $("#allOpenCheckbox").attr("disabled", true);
                        $("#allBlindedCheckbox").attr("disabled", true);
                    }
                    viewModel.set('isStatusActive', true);                   
                    
                }
            } 
        },

        user_selectInactive: function (e) {
            e.preventDefault();
            //remove item from available list 
            viewModel.set('available_Product', ADMINDAL.user_availableProduct(function (q, r) {
                    if (r.error) {
                        if (r.noData) {
                            console.log(r.message);
                        }
                    } else {
                        viewModel.set('isStatusActive', false);
                        viewModel.set('user_linkProductDisabled', true);
                        viewModel.set('isUserEditDisabled', true);
                        viewModel.set('user_isAllBlindedChecked', false);
                        viewModel.set('user_isAllOpenChecked', false);
                        $("#allOpenCheckbox").attr("disabled", true);
                        $("#allBlindedCheckbox").attr("disabled", true);
                        $("#selected_listview").data("kendoListView").dataSource.data([]);
                        $("#user_statusActivity").data("kendoWindow").close();
                    }
                })
            );
            $('#available_listview').data('kendoListView').dataSource.read();            
        },

        user_selectProfile: function(e){
            e.preventDefault();                 
            viewModel.set('user_linkProductDisabled', true);
            viewModel.set('isUserReadOnly', false);
            viewModel.set('isUserEditDisabled', false);
            viewModel.set('user_isAllOpenChecked', true);
            viewModel.set('user_isAllBlindedChecked', false);
            $("#allOpenCheckbox").attr("disabled", true);
            $("#allBlindedCheckbox").attr("disabled", true);
            $('#available_listview').data('kendoListView').dataSource.read();
            $("#selected_listview").data("kendoListView").dataSource.data([]);
            $("#user_profileConfirm").data("kendoWindow").close();
        },

        closeWindowActive: function (e){
            e.preventDefault();
            viewModel.set('user_statusValue', 'Active');
            viewModel.set('isStatusActive', true);
            viewModel.set('user_linkProductDisabled', false);
            viewModel.set('isUserEditDisabled', false);
            $("#user_statusActivity").data("kendoWindow").close();
        },

        closeWindowProfile: function (e) {
            e.preventDefault();
            viewModel.set('user_statusValue', 'Active');
            viewModel.set('isStatusActive', true);
            viewModel.set('user_linkProductDisabled', false);
            viewModel.set('isUserEditDisabled', false);
            viewModel.set('user_profileValue', 'Read-Only');
            $("#user_profileConfirm").data("kendoWindow").close();
        },
        
        user_sendEmailRequest: function(e){
            e.preventDefault();
            COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.EMAILREQUESTED, [
                  { data: e.data.id }
            ], function (r) {
                if (!r.error) {
                    viewModel.set('user_error_text', 'Email Request Sent');
                    $("#generalErrorWin").data("kendoWindow").center().open();
                } else {
                    console.log("Minor error on backend.")
                    viewModel.set('user_error_text', 'Email Request Sent');
                    $("#generalErrorWin").data("kendoWindow").center().open(); //silent fail
                }
            });            
        },       

        removeFromSelectedListView: function (e) { 
        	e.preventDefault();
        	viewModel.set('dirtyPage', true);
            var lv = $('#selected_listview').data('kendoListView');
            var items = lv.items();
            var i = 0;
            $.map(items, function (e, i) {
                if ($(e).hasClass('active')) {
                    var dataItem = lv.dataItem(e);
                    dataItem.refID = dataItem.id;
                    $('#available_listview').data('kendoListView').dataSource.insert(i++, dataItem);
                    $('#selected_listview').data('kendoListView').dataSource.remove(lv.dataItem(e));
                }
            });
        },

        addToSelectedListView: function (e) {
        	e.preventDefault();
        	viewModel.set('dirtyPage', true);
            var lv = $('#available_listview').data('kendoListView');
            var items = lv.items();

            $.map(items, function (e, i) {
                if ($(e).hasClass('active')) {
                    var dataItem = lv.dataItem(e);
                    dataItem.access = 'Blinded';
                    dataItem.refID = dataItem.refID + "a";
                    $('#selected_listview').data('kendoListView').dataSource.insert(i++, dataItem);
                    $('#available_listview').data('kendoListView').dataSource.remove(lv.dataItem(e));
                }
            });
        },

        addAllToSelectedListView: function (e) { //available to selected
        	e.preventDefault();
        	viewModel.set('dirtyPage', true);
            var items = $("#available_listview").data("kendoListView").dataSource.data();
            if (items.length > 0) {
                $("#linkAllProductsConfirm").data("kendoWindow").center().open();
            }
        },

        linkProductsOnClick: function(e){
            e.preventDefault();
            $("#linkAllProductsConfirm").data("kendoWindow").close();
            $("#generalPrompt").data("kendoWindow").center().open();
            setTimeout(function () {
                var prolv = $('#available_listview').data('kendoListView');
                var prolinkdLv = $('#selected_listview').data('kendoListView');
                var items = prolv.items();
                $.map(items, function (e, i) {
                    var dataItem = prolv.dataItem(e);
                    dataItem.access = COMM.PROPERTY.BLINDED;
                    dataItem.refID = dataItem.refID + "a";
                    $('#selected_listview').data('kendoListView').dataSource.insert(i++, dataItem);
                    $('#available_listview').data('kendoListView').dataSource.remove(prolv.dataItem(e));
                });
                $("#generalPrompt").data("kendoWindow").close();
            }, 1000);
        },

        removeAllFromSelectedListView: function (e) {
        	e.preventDefault();
        	viewModel.set('dirtyPage', true);
            var items = $("#selected_listview").data("kendoListView").dataSource.data();
            if (items.length > 0) {
                $("#unlinkAllProductsConfirm").data("kendoWindow").center().open();
            }
        },

        unlinkProductsOnClick: function (e) { //selected to available
            e.preventDefault();
            if (!viewModel.user_editMode) {
                viewModel.set('userUnlinkAllProductsOnClick', true);
            }
            $("#unlinkAllProductsConfirm").data("kendoWindow").close();
            $("#generalPrompt").data("kendoWindow").center().open();
            setTimeout(function () {
                $('#available_listview').data('kendoListView').dataSource.read();
                $('#selected_listview').data('kendoListView').dataSource.data([]);
                $("#generalPrompt").data("kendoWindow").close();
            }, 1000);
        },

		/************** COVER LETTER ***************/
        cover_letter_source: ADMINDAL.getCoverLetterDataSource(
        function (r) {
        	if (r.error) {
        		if (viewModel.parseError(r.message)) {
        			viewModel.displayOkWindow(viewModel.parseError(r.message));
        		}
        		else {
        			var a = setInterval(function () {
        				if ($('#loader').css('opacity') == 0) {
        					clearInterval(a);
        					viewModel.displayOkWindow('An error has occurred.');
        				}
        			}, 500);
        		}
        	}
        }),
        coverLetterEdit: function (e) {
        	e.container.data("kendoWindow").title('Edit Cover Letter');
        	$(e.container).attr('name', 'editCoverLetterForm');
        	$(e.container).attr('id', 'editCoverLetterForm');
        	$($(e.container).children()[0]).css({ width: '800px', padding: '.58em' });
        	e.container.data("kendoWindow").center();
        	$(e.container).parent().find(".k-grid-update").addClass("save");
        	$(e.container).parent().find(".k-grid-cancel").addClass("cancel");
        	$(e.container).parent().find(".save").removeClass("k-grid-update");
        	$(e.container).parent().find(".cancel").removeClass("k-grid-cancel");
        	//remove close icon(x) from window
        	$(e.container).parent().find(".k-window-action").css("visibility", "hidden");
        	$(".save").attr("id", "save");
        	$(".cancel").attr("id", "cancel");
        	//Change Update text to Save 
        	var update = $(e.container).parent().find(".save");
        	var cancel = $(e.container).parent().find(".cancel");
        	$(update).html('<span class="k-icon k-i-save"></span> Save');
        	$(cancel).html('<span class="k-icon k-i-cancel"></span> Cancel');
        	//move edit buttons up on top
        	var form = e.container.find('form');
        	$('<div class="hr-line-solid clearfix"></div>').prependTo(form);
        	e.container.find(".k-edit-buttons.k-state-default").css('border-width', 0).prependTo(form);
        	e.container.find("textarea[name='coverLetterValue']").kendoEditor({
        		resizable: false,
        		value: '',
        		tools: [
                    'fontName',
					'fontSize',
                    'bold',
					'italic',
					'underline',
					'strikethrough',
					'justifyLeft',
					'justifyCenter',
					'justifyRight',
					'justifyFull',
					'insertUnorderedList',
					'insertOrderedList',
					'indent',
					'outdent'
        		],
        		keydown: function (a) {
        			viewModel.set('dirtyPage', true);
        		}
        	});
        	e.container.find("#save").on("click", function (b) {
        		b.preventDefault();
        		if (e.container.find("form[name='validator']").kendoValidator().data("kendoValidator").validate()) {
        			$("#confirmCoverLetterEdit").data("kendoWindow").center().open();
        		}
        	});
        	e.container.find("#cancel").on("click", function (b) {
        		b.preventDefault();
        		$("#confirmCancelCoverLetterEdit").data("kendoWindow").center().open();
        	});
        },
        saveCoverLetterChanges: function (e) {
        	e.preventDefault();
        	$("#confirmCoverLetterEdit").data("kendoWindow").center().close();
        	$('#cover-letter-grid').data('kendoGrid').dataSource.sync();
        	viewModel.set('dirtyPage', false);
        },
        cancelCoverLetterChanges: function (e) {
        	e.preventDefault();
        	$("#confirmCoverLetterEdit").data("kendoWindow").center().close();
        },
        cancelCoverLetterEdit: function (e) {
        	e.preventDefault();
        	$("#confirmCancelCoverLetterEdit").data("kendoWindow").center().close();
        	$("#editCoverLetterForm").data("kendoWindow").center().close();
        	$('#cover-letter-grid').data('kendoGrid').dataSource.cancelChanges();
        },
        cancelCancelCoverLetterEdit: function (e) {
        	e.preventDefault();
        	viewModel.set('dirtyPage', false);
        	$("#confirmCancelCoverLetterEdit").data("kendoWindow").center().close();
        },
    	/************** METADATA ***************/
        product_entity_list: ADMINDAL.product_entity_list(
        function (r) {
        	if (r.error) {
        		if (viewModel.parseError(r.message)) {
        			viewModel.displayOkWindow(viewModel.parseError(r.message));
        		}
        		else {
        			var a = setInterval(function () {
        				if ($('#loader').css('opacity') == 0) {
        					clearInterval(a);
        					viewModel.displayOkWindow('An error has occurred.');
        				}
        			}, 500);
        		}
        	}
        	else if (r.update) {
        		viewModel.updateGrids('product-entity-grid');
        		$('#product-entity-grid').data('kendoGrid').dataSource.read();
        		viewModel.displaySuccessWindow('Product Entity Updated.');
        	}
        }),
        study_sponsorship_list: ADMINDAL.study_sponsorship_list(
        function (r) {
        	if (r.error) {
        		if (viewModel.parseError(r.message)) {
        			viewModel.displayOkWindow(viewModel.parseError(r.message));
        		}
        		else {
        			var a = setInterval(function () {
        				if ($('#loader').css('opacity') == 0) {
        					clearInterval(a);
        					viewModel.displayOkWindow('An error has occurred.');
        				}
        			}, 500);
        		}
        	}
        	else if (r.update) {
        		viewModel.updateGrids('study-sponsorship-grid');
        		$('#study-sponsorship-grid').data('kendoGrid').dataSource.read();
        	    viewModel.displaySuccessWindow('Study Sponsorship Updated.');
        	}
        }),
        user_entity_list: ADMINDAL.user_entity_list(
        function (r) {
        	if (r.error) {
        		if (viewModel.parseError(r.message)) {
        			viewModel.displayOkWindow(viewModel.parseError(r.message));
        		}
        		else {
        			var a = setInterval(function () {
        				if ($('#loader').css('opacity') == 0) {
        					clearInterval(a);
        					viewModel.displayOkWindow('An error has occurred.');
        				}
        			}, 500);
        		}
        	}
        	else if (r.update) {
        		viewModel.updateGrids('user-entity-grid');
        		$('#user-entity-grid').data('kendoGrid').dataSource.read();
        	    viewModel.displaySuccessWindow('User Entity Updated.');
        	}
        }),
        aware_study_inn_list: ADMINDAL.aware_study_inn_list(
        function (r) {
        	if (r.error) {
        		if (viewModel.parseError(r.message)) {
        			viewModel.displayOkWindow(viewModel.parseError(r.message));
        		}
        		else {
        			var a = setInterval(function () {
        				if ($('#loader').css('opacity') == 0) {
        					clearInterval(a);
        					viewModel.displayOkWindow('An error has occurred.');
        				}
        			}, 500);
        		}
        	}
        	else if (r.update) {
        		viewModel.updateGrids('study-aware-inn');
        		$('#study-aware-inn').data('kendoGrid').dataSource.read();
        		viewModel.displaySuccessWindow('AWARE Study updated.');
        	}
        }),
        aware_inn_list: ADMINDAL.aware_inn_list(
        function (r) {
        	if (r.error) {
        		if (viewModel.parseError(r.message)) {
        			viewModel.displayOkWindow(viewModel.parseError(r.message));
        		}
        		else {
        			var a = setInterval(function () {
        				if ($('#loader').css('opacity') == 0) {
        					clearInterval(a);
        					viewModel.displayOkWindow('An error has occurred.');
        				}
        			}, 500);
        		}
        	}
        	else if (r.update) {
        		viewModel.updateGrids('aware-inn-grid');
        		$('#aware-inn-grid').data('kendoGrid').dataSource.read();
        	    viewModel.displaySuccessWindow('PV Database INN Updated.');
        	}
        }),
        welcome_message_source: ADMINDAL.welcome_message(
        function (r) {
        	if (r.error) {
        		if (viewModel.parseError(r.message)) {
        			viewModel.displayOkWindow(viewModel.parseError(r.message));
        		}
        		else {
        			var a = setInterval(function () {
        				if ($('#loader').css('opacity') == 0) {
        					clearInterval(a);
        					viewModel.displayOkWindow('An error has occurred.');
        				}
        			}, 500);
        		}
        	}
        	else if (r.updated === true) {
        		viewModel.set('dirtyPage', false);
        		viewModel.set('welcome_success_message', 'Welcome Message Updated. Page will now refresh for the changes to take effect.');
        		$("#editWelcomeSuccessMessage").data("kendoWindow").center().open();
        	}
        }),

        onCancelEdit: function () {
        	viewModel.set('dirtyPage', false);
        },

        welcomeMessageEdit: function (e) {
        	e.container.data("kendoWindow").title('Edit Welcome Message');
        	$(e.container).attr('name', 'editWelcomeMessageForm');
        	$(e.container).attr('id', 'editWelcomeMessageForm');
        	$($(e.container).children()[0]).css({ width: '800px', padding: '.58em' });
        	e.container.data("kendoWindow").center();

        	$(e.container).parent().find(".k-grid-update").addClass("save");
        	$(e.container).parent().find(".k-grid-cancel").addClass("cancel");
        	$(e.container).parent().find(".save").removeClass("k-grid-update");
        	$(e.container).parent().find(".cancel").removeClass("k-grid-cancel");

        	//remove close icon(x) from window
        	$(e.container).parent().find(".k-window-action").css("visibility", "hidden");

        	$(".save").attr("id", "save");
        	$(".cancel").attr("id", "cancel");

        	//Change Update text to Save 
        	var update = $(e.container).parent().find(".save");
        	var cancel = $(e.container).parent().find(".cancel");
        	$(update).html('<span class="k-icon k-i-save"></span> Save');
        	$(cancel).html('<span class="k-icon k-i-cancel"></span> Cancel');

            //move edit buttons up on top
        	var form = e.container.find('form');
        	$('<div class="hr-line-solid clearfix"></div>').prependTo(form);
        	e.container.find(".k-edit-buttons.k-state-default").css('border-width', 0).prependTo(form);

        	e.container.find("textarea[name='message']").kendoEditor({
        		resizable: false,
        		value: '',
        		pasteCleanup: {
        		    all: false,
        		    css: true,
        		    custom: null,
        		    keepNewLines: false,
        		    msAllFormatting: false,
        		    msConvertLists: true,
        		    msTags: true,
        		    none: false,
        		    span: false
        		},
        		tools: [
                    "bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "unlink", "fontName", "fontSize",
        		],
        		immutables: true,
        		keydown: function (a) {
        			viewModel.set('dirtyPage', true);
        		}
        	});

        	e.container.find("#save").on("click", function (b) {
        		b.preventDefault();
        		if (e.container.find("form[name='validator']").kendoValidator().data("kendoValidator").validate()) {
        			$("#confirmMessageEdit").data("kendoWindow").center().open();
        		}
        	});

        	e.container.find("#cancel").on("click", function (b) {
        	    b.preventDefault();
        	    if ($('#welcome-message-grid').data('kendoGrid').dataSource.hasChanges()) {
        	        $("#confirmCancelMessageEdit").data("kendoWindow").center().open();
        	    } else {
        	        viewModel.cancelMessageEdit(b);
        	    }
        	});

        },

        saveMessageChanges: function (e) {
        	e.preventDefault();
        	$("#confirmMessageEdit").data("kendoWindow").center().close();
        	$('#welcome-message-grid').data('kendoGrid').dataSource.sync();
        	viewModel.set('dirtyPage', false);
        },

        cancelMessageChanges: function (e) {
        	e.preventDefault();
        	$("#confirmMessageEdit").data("kendoWindow").center().close();
        },

        cancelMessageEdit: function (e) {
        	e.preventDefault();
        	$("#confirmCancelMessageEdit").data("kendoWindow").center().close();
        	$("#editWelcomeMessageForm").data("kendoWindow").center().close();
        	$('#welcome-message-grid').data('kendoGrid').dataSource.cancelChanges();
        },

        cancelCancelMessageEdit: function (e) {
        	e.preventDefault();
        	viewModel.set('dirtyPage', false);
        	$("#confirmCancelMessageEdit").data("kendoWindow").center().close();
        },

        editMessage: function (e) {
        	viewModel.set('edit_message_id', e.data.id);
        	viewModel.set('message', e.data.message);
        	$("#editWelcomeMessage").data("kendoWindow").center().open();
        },

        closeEditWelcomeSuccess: function (e) {
        	location.reload();
        },

        awareINNEdit: function (e) {
            e.container.data("kendoWindow").title('Edit PV Database INN');
        	$(e.container).attr('name', 'editAWAREINNForm');
        	$(e.container).attr('id', 'editAWAREINNForm');
        	$($(e.container).children()[0]).css({ width: '400px', padding: '.58em' });
        	e.container.data("kendoWindow").center();


        	$(e.container).parent().find(".k-grid-update").addClass("save");
        	$(e.container).parent().find(".k-grid-cancel").addClass("cancel");
        	$(e.container).parent().find(".save").removeClass("k-grid-update");
        	$(e.container).parent().find(".cancel").removeClass("k-grid-cancel");

        	//remove close icon(x) from window
        	$(e.container).parent().find(".k-window-action").css("visibility", "hidden");

        	$(".save").attr("id", "save");
        	$(".cancel").attr("id", "cancel");

        	//Change Update text to Save 
        	var update = $(e.container).parent().find(".save");
        	var cancel = $(e.container).parent().find(".cancel");
        	$(update).html('<span class="k-icon k-i-save"></span> Save');
        	$(cancel).html('<span class="k-icon k-i-cancel"></span> Cancel');

            //move edit buttons up on top
        	var form = e.container.find('form');
        	$('<div class="hr-line-solid clearfix"></div>').prependTo(form);
        	e.container.find(".k-edit-buttons.k-state-default").css('border-width', 0).prependTo(form);

           
        	ADMINDAL.checkAwareINNIfAssociatedToProduct({
        		inn: e.model.awareInn,
        	}, function (r) {
        		if (r === false) {
        		    e.container.find("input[name='retired']").removeAttr('disabled'); 
        		}
        		else if (r === true) {        		   
        			e.container.find("span[name='associated-to-product-message']").removeClass("hide");
        		}

        	    //source drop down
        		e.container.find("input[name='sourceInn']").kendoDropDownList({
        		    dataTextField: "SourceInn",
        		    dataValueField: "SourceInn",
        		    optionLabel: "Select Source",
        		    dataSource: ADMINDAL.metaSourceINN()
        		});

        	});

        	e.container.find("#save").on("click", function (b) {
        		b.preventDefault();
        		if (e.container.find("form[name='validator']").kendoValidator().data("kendoValidator").validate()) {
        			$("#confirmINNEdit").data("kendoWindow").center().open();
        		}
        	});

        	e.container.find("#cancel").on("click", function (b) {
        	    b.preventDefault();
        	    if ($("#aware-inn-grid").data("kendoGrid").dataSource.hasChanges()) {
        	        $("#confirmCancelINNEdit").data("kendoWindow").center().open();
        	    } else {
        	        viewModel.cancelINNEdit(b);
        	    }
        	});

        },

        saveINNChanges: function (e) {
        	e.preventDefault();
        	$("#confirmINNEdit").data("kendoWindow").center().close();
        	$("#editAWAREINNForm").data("kendoWindow").center().close();
        	$("#aware-inn-grid").data("kendoGrid").dataSource.sync();
        },

        cancelINNChanges: function (e) {
        	e.preventDefault();
        	$("#confirmINNEdit").data("kendoWindow").center().close();
        },

        cancelINNEdit: function (e) {
        	e.preventDefault();
        	$("#confirmCancelINNEdit").data("kendoWindow").center().close();
        	$("#editAWAREINNForm").data("kendoWindow").center().close();
        	$('#aware-inn-grid').data('kendoGrid').dataSource.cancelChanges();
        },

        cancelCancelINNChanges: function (e) {
        	e.preventDefault();
        	$("#confirmCancelINNEdit").data("kendoWindow").center().close();
        },

        trimAWAREINN: function (e) {
            viewModel.set('aware_inn', viewModel.aware_inn.trim());
            viewModel.set('source_inn', viewModel.source_inn.trim());
        },

        addAwareINN: function (e) {
            e.preventDefault();
            $("#sourceInn").kendoDropDownList({ optionLabel: "Select Source" });
        	$("#addAwareINNWindow").data("kendoWindow").center().open();
        },

        editAWAREINN: function (e) {
        	e.preventDefault();
        	viewModel.set('edit_aware_inn_id', e.data.id);
        	viewModel.set('edit_aware_inn', e.data.awareInn);
        	viewModel.set('awareINNRetire', e.data.retired);

        	if (e.data.retired) {
        		$('#aware_inn_retire').prop('checked', true);
        	}
        	else if (!e.data.retired) {
        		$('#aware_inn_retire').prop('checked', false);
        	}

        	$('#aware_inn_retire').change(function () {
        		if ($('#aware_inn_retire').is(":checked")) {
        			viewModel.set('awareINNRetire', true);
        		}
        		else {
        			viewModel.set('awareINNRetire', false);
        		}
        	});

        	$("#editAwareINNWindow").data("kendoWindow").center().open();
        },

        confirmINNCancel: function (e) {
        	e.preventDefault();
        	viewModel.set('aware_inn', '');
        	viewModel.set('source_inn', '');
        	$('#sourceInn').data('kendoDropDownList').value(0);
        	var validator = $("#addAwareINNWindow").kendoValidator().data("kendoValidator");
        	validator.hideMessages();
        	$("#addAwareINNWindow").data("kendoWindow").center().close();
        	$("#confirmCancelINNCreate").data("kendoWindow").center().close();
        },

        confirmCancelINNStudy: function (e) {
        	e.preventDefault();
        	$("#confirmCancelINNCreate").data("kendoWindow").center().close();
        },

        cancelAddINN: function (e) {
            e.preventDefault();
            if ($('#aware_inn').val().length > 0 && $('#sourceInn').val().length > 0) {
                $("#confirmCancelINNCreate").data("kendoWindow").center().open();
            } else {
                viewModel.confirmINNCancel(e);
            }
        },

        validateCreateAwareINN: function (e) {
        	e.preventDefault();

            // attach a validator to the container and get a reference
        	var validatable = $("#addAwareINNWindow").kendoValidator().data("kendoValidator");
        	validatable.hideMessages();

            //validate the input elements and check if there are any errors
        	if (validatable.validate()) {
        	    if (viewModel.aware_inn.trim() === '' || viewModel.aware_inn.trim().length > 255) {
        	        var str = '';
        	        if (viewModel.aware_inn.trim().length > 255) {
        	            str = str + 'Length of PV DATABASE INN is more than 255 characters. ';
        	            viewModel.set('metadata_error_message', str);
        	        }
        	        if (viewModel.aware_inn.trim() === '') {
        	            str = str + 'Cannot contain whitespace.';
        	            viewModel.set('metadata_error_message', str);
        	        }
        	        if (viewModel.source_inn.trim() === '') {
        	            str = str + 'Source cannot contain whitespace. ';
        	            viewModel.set('metadata_error_message', str);
        	        }

        	        $("#metaErrorMessage").data("kendoWindow").center().open();
        	    } else {
        	    	$("#confirmINNCreate").data("kendoWindow").center().open();
        	    }
        	}

        },

        createINN: function (e) {
        	e.preventDefault();
        	ADMINDAL.addAWAREINN({
        	    awareINN: viewModel.aware_inn.trim(),
        	    sourceINN: viewModel.source_inn.trim(),
        		retired: 0
        	},
            function (r) {
				if (r.error === false) {
					$('#aware-inn-grid').data('kendoGrid').dataSource.read();
					viewModel.updateGrids('aware-inn-grid');
					$('#aware-inn-grid').data('kendoGrid').refresh();
					$("#confirmINNCreate").data("kendoWindow").center().close();
					$("#addAwareINNWindow").data("kendoWindow").center().close();
					viewModel.set('aware_inn', '');
					viewModel.set('source_inn', '');
					$('#sourceInn').data('kendoDropDownList').value(0);

					viewModel.set('meta_success_message', 'PV DATABASE INN successfully created.');
					$("#metaSuccessMessage").data("kendoWindow").center().open();
				}
				else if (r.duplicate === true) {
					viewModel.set('metadata_error_message', 'Unable to save because duplicate entry exists.');
					$("#metaErrorMessage").data("kendoWindow").center().open();
				}
				else if (r.error === true) {
					viewModel.set('metadata_error_message', 'An error has occured.');
					$("#metaErrorMessage").data("kendoWindow").center().open();
				}
            })
        },

        cancelINN: function (e) {
        	e.preventDefault();
        	$("#confirmINNCreate").data("kendoWindow").center().close();
        },

        awareStudyEdit: function (e) {
        	e.container.data("kendoWindow").title('Edit AWARE Study');
        	$(e.container).attr('name', 'editAWAREStudyForm');
        	$(e.container).attr('id', 'editAWAREStudyForm');
        	$($(e.container).children()[0]).css({ width: '400px', padding: '.58em' });
        	e.container.data("kendoWindow").center();

        	$(e.container).parent().find(".k-grid-update").addClass("save");
        	$(e.container).parent().find(".k-grid-cancel").addClass("cancel");
        	$(e.container).parent().find(".save").removeClass("k-grid-update");
        	$(e.container).parent().find(".cancel").removeClass("k-grid-cancel");

        	//remove close icon(x) from window
        	$(e.container).parent().find(".k-window-action").css("visibility", "hidden");

        	$(".save").attr("id", "save");
        	$(".cancel").attr("id", "cancel");

        	//Change Update text to Save 
        	var update = $(e.container).parent().find(".save");
        	var cancel = $(e.container).parent().find(".cancel");
        	$(update).html('<span class="k-icon k-i-save"></span> Save');
        	$(cancel).html('<span class="k-icon k-i-cancel"></span> Cancel');

            //move edit buttons up on top
        	var form = e.container.find('form');
        	$('<div class="hr-line-solid clearfix"></div>').prependTo(form);
        	e.container.find(".k-edit-buttons.k-state-default").css('border-width', 0).prependTo(form);

        	ADMINDAL.checkAwareStudyIfAssociatedToStudy({
        		inn: e.model.studyInn,
        	}, function (r) {
        		if (r === false) {
        			e.container.find("input[name='retired']").removeAttr('disabled');
        		}
        		else if (r === true) {
        			e.container.find("span[name='associated-to-study-message']").removeClass("hide");
        		}
        	});

        	e.container.find("#save").on("click", function (b) {
        		b.preventDefault();
        		if (e.container.find("form[name='validator']").kendoValidator().data("kendoValidator").validate()) {
        			$("#confirmStudiesEdit").data("kendoWindow").center().open();
        		}
        	});

        	e.container.find("#cancel").on("click", function (b) {
        	    b.preventDefault();
        	    if ($('#study-aware-inn').data('kendoGrid').dataSource.hasChanges()) {
        	        $("#confirmCancelStudiesEdit").data("kendoWindow").center().open();
        	    } else {
        	        viewModel.cancelStudiesEdit(b);
        	    }
        	});

        },

        saveStudiesChanges: function (e) {
        	e.preventDefault();
        	$("#confirmStudiesEdit").data("kendoWindow").center().close();
        	$("#editAWAREStudyForm").data("kendoWindow").center().close();
        	$('#study-aware-inn').data('kendoGrid').dataSource.sync();
        },

        cancelStudiesChanges: function (e) {
        	e.preventDefault();
        	$("#confirmStudiesEdit").data("kendoWindow").center().close();
        },

        cancelStudiesEdit: function (e) {
        	e.preventDefault();
        	$("#confirmCancelStudiesEdit").data("kendoWindow").center().close();
        	$("#editAWAREStudyForm").data("kendoWindow").center().close();
        	$('#study-aware-inn').data('kendoGrid').dataSource.cancelChanges();
        },

        cancelCancelStudiesChanges: function (e) {
        	e.preventDefault();
        	$("#confirmCancelStudiesEdit").data("kendoWindow").center().close();
        },

        trimStudyINN: function (e) {
        	viewModel.set('study_inn', viewModel.study_inn.trim());
        },

        trimDrugName: function (e) {
        	viewModel.set('drug_name', viewModel.drug_name.trim());
        },

        addAwareStudies: function (e) {
            e.preventDefault();
            var validator = $("#addAwareStudiesWindow").kendoValidator().data("kendoValidator");
            validator.hideMessages();
            $("#addAwareStudiesWindow").data("kendoWindow").center().open();
        },

        editStudyINN: function (e) {
        	e.preventDefault();
        	viewModel.set('edit_study_inn_id', e.data.id);
        	viewModel.set('edit_study_inn', e.data.studyInn);
        	viewModel.set('edit_drug_name', e.data.drugName);
        	viewModel.set('studyAwareRetire', e.data.retired);

        	if (e.data.retired) {
        		$('#study_inn_retire').prop('checked', true);
        	}
        	else if (!e.data.retired) {
        		$('#study_inn_retire').prop('checked', false);
        	}

        	$('#study_inn_retire').change(function () {
        		if ($('#study_inn_retire').is(":checked")) {
        			viewModel.set('studyAwareRetire', true);
        		}
        		else {
        			viewModel.set('studyAwareRetire', false);
        		}
        	});

        	$("#editStudyINNWindow").data("kendoWindow").center().open();
        },

        confirmAWARECancel: function (e) {
        	e.preventDefault();
        	viewModel.set('study_inn', '');
        	viewModel.set('drug_name', '');

        	$("#addAwareStudiesWindow").data("kendoWindow").center().close();
        	$("#confirmCancelAWARECreate").data("kendoWindow").center().close();
        },

        confirmCancelAWAREStudy: function (e) {
        	e.preventDefault();
        	$("#confirmCancelAWARECreate").data("kendoWindow").center().close();
        },

        cancelAddAWAREStudies: function (e) {
            e.preventDefault();
            if ($('#study_inn').val().length > 0 || $('#drug_name').val().length > 0) {
                $("#confirmCancelAWARECreate").data("kendoWindow").center().open();
            } else {
                viewModel.confirmAWARECancel(e);
            }
        },

        validateCreateAwareStudies: function (e) {
            e.preventDefault();

            // attach a validator to the container and get a reference
            var validatable = $("#addAwareStudiesWindow").kendoValidator().data("kendoValidator");
            validatable.hideMessages();

            if (validatable.validate()) {
                if (viewModel.study_inn.trim() === '' || viewModel.study_inn.trim().length > 255 || viewModel.drug_name.trim() === '' || viewModel.drug_name.trim().length > 255) {
                    var str = '';
                    if (viewModel.study_inn.trim().length > 255) {
                        str = str + 'Length of Study INN is more than 255 characters. ';
                        viewModel.set('metadata_error_message', str);
                    }
                    if (viewModel.drug_name.trim().length > 255) {
                        str = str + 'Length of drug name is more than 255 characters. ';
                        viewModel.set('metadata_error_message', str);
                    }
                    if (viewModel.study_inn.trim() === '' || viewModel.drug_name.trim() === '') {
                        str = str + 'Cannot contain whitespace.';
                        viewModel.set('metadata_error_message', str);
                    }

                    $("#metaErrorMessage").data("kendoWindow").center().open();
                } else {
                	$("#confirmAWARECreate").data("kendoWindow").center().open();
                }	

            }

        },

        createAWARE: function (e) {
        	e.preventDefault();
        	ADMINDAL.addAWAREStudies({
        		studyINN: viewModel.study_inn.trim(),
        		drugName: viewModel.drug_name.trim(),
        		retired: 0
        	},
            function (r) {
				if (r.error === false) {
					$('#study-aware-inn').data('kendoGrid').dataSource.read();
					viewModel.updateGrids('study-aware-inn');
					$('#study-aware-inn').data('kendoGrid').refresh();
					$("#addAwareStudiesWindow").data("kendoWindow").center().close();
					$("#confirmAWARECreate").data("kendoWindow").center().close();
					viewModel.set('study_inn', '');
					viewModel.set('drug_name', '');

					viewModel.set('meta_success_message', 'AWARE Study successfully created.');
					$("#metaSuccessMessage").data("kendoWindow").center().open();
				}
				else if (r.duplicate === true) {
					viewModel.set('metadata_error_message', 'Unable to save because duplicate entry exists.');
					$("#metaErrorMessage").data("kendoWindow").center().open();
				}
				else if (r.error === true) {
					viewModel.set('metadata_error_message', 'An error has occured.');
					$("#metaErrorMessage").data("kendoWindow").center().open();
				}
            })
        },

        cancelAWARE: function (e) {
        	e.preventDefault();
        	$("#confirmAWARECreate").data("kendoWindow").center().close();
        },

        userEntityEdit: function (e) {
        	e.container.data("kendoWindow").title('Edit User Entity');
        	$(e.container).attr('name', 'editUserEntityForm');
        	$(e.container).attr('id', 'editUserEntityForm');
        	$($(e.container).children()[0]).css({ width: '400px', padding: '.58em' });
        	e.container.data("kendoWindow").center();

        	$(e.container).parent().find(".k-grid-update").addClass("save");
        	$(e.container).parent().find(".k-grid-cancel").addClass("cancel");
        	$(e.container).parent().find(".save").removeClass("k-grid-update");
        	$(e.container).parent().find(".cancel").removeClass("k-grid-cancel");

        	//remove close icon(x) from window
        	$(e.container).parent().find(".k-window-action").css("visibility", "hidden");

        	$(".save").attr("id", "save");
        	$(".cancel").attr("id", "cancel");

        	//Change Update text to Save 
        	var update = $(e.container).parent().find(".save");
        	var cancel = $(e.container).parent().find(".cancel");
        	$(update).html('<span class="k-icon k-i-save"></span> Save');
        	$(cancel).html('<span class="k-icon k-i-cancel"></span> Cancel');

            //move edit buttons up on top
        	var form = e.container.find('form');
        	$('<div class="hr-line-solid clearfix"></div>').prependTo(form);
        	e.container.find(".k-edit-buttons.k-state-default").css('border-width', 0).prependTo(form);

        	ADMINDAL.checkUserEntityIfAssociatedToUser({
        		entity: e.model.userEntity,
        	}, function (r) {
        		if (r === false) {
        			e.container.find("input[name='retired']").removeAttr('disabled');
        		}
        		else if (r === true) {
        			e.container.find("span[name='associated-to-user-message']").removeClass("hide");
        		}
        	});

        	e.container.find("#save").on("click", function (b) {
        		b.preventDefault();
        		if (e.container.find("form[name='validator']").kendoValidator().data("kendoValidator").validate()) {
        			$("#confirmUserEdit").data("kendoWindow").center().open();
        		}
        	});

        	e.container.find("#cancel").on("click", function (b) {
        	    b.preventDefault();
        	    if ($('#user-entity-grid').data('kendoGrid').dataSource.hasChanges()) {
        	        $("#confirmCancelUserEdit").data("kendoWindow").center().open();
        	    } else {
        	        viewModel.cancelUserEdit(b);
        	    }
        	});

        },

        saveUserChanges: function (e) {
        	e.preventDefault();
        	$("#confirmUserEdit").data("kendoWindow").center().close();
        	$("#editUserEntityForm").data("kendoWindow").center().close();
        	$('#user-entity-grid').data('kendoGrid').dataSource.sync();
        },

        cancelUserChanges: function (e) {
        	e.preventDefault();
        	$("#confirmUserEdit").data("kendoWindow").center().close();
        },

        cancelUserEdit: function (e) {
        	e.preventDefault();
        	$("#confirmCancelUserEdit").data("kendoWindow").center().close();
        	$("#editUserEntityForm").data("kendoWindow").center().close();
        	$('#user-entity-grid').data('kendoGrid').dataSource.cancelChanges();
        },

        cancelCancelUserChanges: function (e) {
        	e.preventDefault();
        	$("#confirmCancelUserEdit").data("kendoWindow").center().close();
        },

        trimUserEntity: function (e) {
        	viewModel.set('user_entity_company_name', viewModel.user_entity_company_name.trim());
        },

        addUserEntity: function (e) {
        	e.preventDefault();
        	$("#addUserEntityWindow").data("kendoWindow").center().open();
        },

        editUserEntity: function (e) {
        	e.preventDefault();
        	viewModel.set('edit_user_entity_id', e.data.id);
        	viewModel.set('edit_user_company_name', e.data.userEntity);
        	viewModel.set('userEntityRetire', e.data.retired);

        	if (e.data.retired) {
        		$('#user_entity_retire').prop('checked', true);
        	}
        	else if (!e.data.retired) {
        		$('#user_entity_retire').prop('checked', false);
        	}

        	$('#user_entity_retire').change(function () {
        		if ($('#user_entity_retire').is(":checked")) {
        			viewModel.set('userEntityRetire', true);
        		}
        		else {
        			viewModel.set('userEntityRetire', false);
        		}
        	});

        	$("#editUserEntityWindow").data("kendoWindow").center().open();
        },

        confirmUserEntityCancel: function (e) {
        	e.preventDefault();
        	viewModel.set('user_entity_company_name', '');
        	var validator = $("#addUserEntityWindow").kendoValidator().data("kendoValidator");
        	validator.hideMessages();
        	$("#addUserEntityWindow").data("kendoWindow").center().close();
        	$("#confirmCancelUserCreate").data("kendoWindow").center().close();
        },

        confirmCancelUserEntity: function (e) {
        	e.preventDefault();
        	$("#confirmCancelUserCreate").data("kendoWindow").center().close();
        },

        cancelAddUserEntity: function (e) {
            e.preventDefault();
            if ($('#user_entity_company_name').val().length > 0) {
                $("#confirmCancelUserCreate").data("kendoWindow").center().open();
            } else {
                viewModel.confirmUserEntityCancel(e);
            }
        },

        validateCreateUserEntity: function (e) {
            e.preventDefault();

            // attach a validator to the container and get a reference
            var validatable = $("#addUserEntityWindow").kendoValidator().data("kendoValidator");
            validatable.hideMessages();

            //validate the input elements and check if there are any errors
            if (validatable.validate()) {

                if (viewModel.user_entity_company_name.trim() === '' || viewModel.user_entity_company_name.trim().length > 255) {
                    var str = '';
                    if (viewModel.user_entity_company_name.trim().length > 255) {
                        str = str + 'Length of company name is more than 255 characters. ';
                        viewModel.set('metadata_error_message', str);
                    }
                    if (viewModel.user_entity_company_name.trim() === '') {
                        str = str + 'Cannot contain whitespace. ';
                        viewModel.set('metadata_error_message', str);
                    }

                    $("#metaErrorMessage").data("kendoWindow").center().open();
                } else {
                	$("#confirmUserCreate").data("kendoWindow").center().open();
                }
            }
        },

        createUserEntity: function (e) {
        	e.preventDefault();
        	ADMINDAL.addUserEntity({
        		companyName: viewModel.user_entity_company_name.trim(),
        		retired: 0
        	},
            function (r) {
				if (r.error === false) {
					$('#user-entity-grid').data('kendoGrid').dataSource.read();
					$('#user-entity-grid').data('kendoGrid').refresh();
					$("#addUserEntityWindow").data("kendoWindow").center().close();
					viewModel.set('user_entity_company_name', '');

					viewModel.set('meta_success_message', 'User Entity successfully created.');
					$("#metaSuccessMessage").data("kendoWindow").center().open();
					$("#confirmUserCreate").data("kendoWindow").center().close();
				}
				else if (r.duplicate === true) {
					viewModel.set('metadata_error_message', 'Unable to save because duplicate entry exists.');
					$("#metaErrorMessage").data("kendoWindow").center().open();
				}
				else if (r.error === true) {
					viewModel.set('metadata_error_message', 'An error has occured.');
					$("#metaErrorMessage").data("kendoWindow").center().open();
				}
            })
        },

        cancelUserEntity: function (e) {
        	e.preventDefault();
        	$("#confirmUserCreate").data("kendoWindow").center().close();
        },

        studySponsorshipEdit: function (e) {
        	e.container.data("kendoWindow").title('Edit Study Sponsorship');
        	$(e.container).attr('name', 'editStudySponsorshipForm');
        	$(e.container).attr('id', 'editStudySponsorshipForm');
        	$($(e.container).children()[0]).css({ width: '400px', padding: '.58em' });
        	e.container.data("kendoWindow").center();

        	$(e.container).parent().find(".k-grid-update").addClass("save");
        	$(e.container).parent().find(".k-grid-cancel").addClass("cancel");
        	$(e.container).parent().find(".save").removeClass("k-grid-update");
        	$(e.container).parent().find(".cancel").removeClass("k-grid-cancel");

        	//remove close icon(x) from window
        	$(e.container).parent().find(".k-window-action").css("visibility", "hidden");

        	$(".save").attr("id", "save");
        	$(".cancel").attr("id", "cancel");

        	//Change Update text to Save 
        	var update = $(e.container).parent().find(".save");
        	var cancel = $(e.container).parent().find(".cancel");
        	$(update).html('<span class="k-icon k-i-save"></span> Save');
        	$(cancel).html('<span class="k-icon k-i-cancel"></span> Cancel');

            //move edit buttons up on top
        	var form = e.container.find('form');
        	$('<div class="hr-line-solid clearfix"></div>').prependTo(form);
        	e.container.find(".k-edit-buttons.k-state-default").css('border-width', 0).prependTo(form);

        	ADMINDAL.checkStudySponsorshipIfAssociatedToStudy({
        		studySponsorship: e.model.studySponsorship,
        	}, function (r) {
        		if (r === false) {
        			e.container.find("input[name='retired']").removeAttr('disabled');
        		}
        		else if (r === true) {
        			e.container.find("span[name='associated-to-study-message']").removeClass("hide");
        		}
        	});

        	e.container.find("#save").on("click", function (b) {
        		b.preventDefault();
        		if (e.container.find("form[name='validator']").kendoValidator().data("kendoValidator").validate()) {
        			$("#confirmSponsorshipEdit").data("kendoWindow").center().open();
        		}
        	});

        	e.container.find("#cancel").on("click", function (b) {
        	    b.preventDefault();
        	    if ($('#study-sponsorship-grid').data('kendoGrid').dataSource.hasChanges()) {
        	        $("#confirmCancelSponsorshipEdit").data("kendoWindow").center().open();
        	    } else {
        	        viewModel.cancelSponsorshipEdit(b);
        	    }
        	});

        },

        saveSponsorshipChanges: function (e) {
        	e.preventDefault();
        	$("#confirmSponsorshipEdit").data("kendoWindow").center().close();
        	$("#editStudySponsorshipForm").data("kendoWindow").center().close();
        	$('#study-sponsorship-grid').data('kendoGrid').dataSource.sync();
        },

        cancelSponsorshipChanges: function (e) {
        	e.preventDefault();
        	$("#confirmSponsorshipEdit").data("kendoWindow").center().close();
        },

        cancelSponsorshipEdit: function (e) {
        	e.preventDefault();
        	$("#confirmCancelSponsorshipEdit").data("kendoWindow").center().close();
        	$("#editStudySponsorshipForm").data("kendoWindow").center().close();
        	$('#study-sponsorship-grid').data('kendoGrid').dataSource.cancelChanges();
        },

        cancelCancelSponsorshipChanges: function (e) {
        	e.preventDefault();
        	$("#confirmCancelSponsorshipEdit").data("kendoWindow").center().close();
        },

        trimStudySponsorship: function (e) {
        	viewModel.set('sponsorship_company_name', viewModel.sponsorship_company_name.trim());
        },

        addStudySponsorship: function (e) {
        	e.preventDefault();
        	$("#addStudySponsorshipWindow").data("kendoWindow").center().open();
        },

        editStudySponsorship: function (e) {
        	e.preventDefault();
        	viewModel.set('edit_study_sponsorship_id', e.data.id);
        	viewModel.set('edit_study_company_name', e.data.studySponsorship);
        	viewModel.set('studySponsorshipRetire', e.data.retired);

        	if (e.data.retired) {
        		$('#study_sponsorship_retire').prop('checked', true);
        	}
        	else if (!e.data.retired) {
        		$('#study_sponsorship_retire').prop('checked', false);
        	}

        	$('#study_sponsorship_retire').change(function () {
        		if ($('#study_sponsorship_retire').is(":checked")) {
        			viewModel.set('studySponsorshipRetire', true);
        		}
        		else {
        			viewModel.set('studySponsorshipRetire', false);
        		}
        	});

        	$("#editStudySponsorshipWindow").data("kendoWindow").center().open();
        },

        confirmSponsorshipStudyCancel: function (e) {
        	e.preventDefault();
        	viewModel.set('sponsorship_company_name', '');
        	$("#addStudySponsorshipWindow").data("kendoWindow").center().close();
        	$("#confirmCancelStudiesCreate").data("kendoWindow").center().close();

        	var validator = $("#addStudySponsorshipWindow").kendoValidator().data("kendoValidator");
        	validator.hideMessages();
        },

        confirmCancelSponsorshipStudy: function (e) {
        	e.preventDefault();
        	$("#confirmCancelStudiesCreate").data("kendoWindow").center().close();
        },

        cancelAddStudySponsorship: function (e) {
            e.preventDefault();
            if ($('#sponsorship_company_name').val().length > 0) {
                $("#confirmCancelStudiesCreate").data("kendoWindow").center().open();
            } else {
                viewModel.confirmSponsorshipStudyCancel(e);
            }
        },

        validateCreateStudySponsorship: function (e) {
            e.preventDefault();

            // attach a validator to the container and get a reference
            var validatable = $("#addStudySponsorshipWindow").kendoValidator().data("kendoValidator");
            validatable.hideMessages();

            //validate the input elements and check if there are any errors
            if (validatable.validate()) {
                if (viewModel.sponsorship_company_name.trim() === '' || viewModel.sponsorship_company_name.trim().length > 255) {
                    var str = '';
                    if (viewModel.sponsorship_company_name.trim().length > 255) {
                        str = str + 'Length of company name is more than 255 characters. ';
                        viewModel.set('metadata_error_message', str);
                    }
                    if (viewModel.sponsorship_company_name.trim() === '') {
                        str = str + 'Cannot contain whitespace.';
                        viewModel.set('metadata_error_message', str);
                    }

                    $("#metaErrorMessage").data("kendoWindow").center().open();
                } else {
                	$("#confirmStudiesCreate").data("kendoWindow").center().open();
                }
            }
        },

        createStudySponsorship: function (e) {
        	e.preventDefault();
        	ADMINDAL.addStudySponsorship({
        		companyName: viewModel.sponsorship_company_name.trim(),
        		retired: 0
        	},
            function (r) {
				if (r.error === false) {
					$('#study-sponsorship-grid').data('kendoGrid').dataSource.read();
					viewModel.updateGrids('study-sponsorship-grid');
					$('#study-sponsorship-grid').data('kendoGrid').refresh();
					$("#addStudySponsorshipWindow").data("kendoWindow").center().close();
					$("#confirmStudiesCreate").data("kendoWindow").center().close();
					viewModel.set('sponsorship_company_name', '');

					viewModel.set('meta_success_message', 'Study Sponsorship successfully created.');
					$("#metaSuccessMessage").data("kendoWindow").center().open();
				}
				else if (r.duplicate === true) {
					viewModel.set('metadata_error_message', 'Unable to save because duplicate entry exists.');
					$("#metaErrorMessage").data("kendoWindow").center().open();
				}
				else if (r.error === true) {
					viewModel.set('metadata_error_message', 'An error has occured.');
					$("#metaErrorMessage").data("kendoWindow").center().open();
				}
            })
        },

        cancelSponsorshipStudy: function (e) {
        	e.preventDefault();
        	$("#confirmStudiesCreate").data("kendoWindow").center().close();
        },

        productEntityEdit: function (e) {
        	e.container.data("kendoWindow").title('Edit Product Entity');
        	$(e.container).attr('name', 'editProductEntityForm');
        	$(e.container).attr('id', 'editProductEntityForm');
        	$($(e.container).children()[0]).css({ width: '400px', padding: '.58em' });
        	e.container.data("kendoWindow").center();

        	$(e.container).parent().find(".k-grid-update").addClass("save");
        	$(e.container).parent().find(".k-grid-cancel").addClass("cancel");
        	$(e.container).parent().find(".save").removeClass("k-grid-update");
        	$(e.container).parent().find(".cancel").removeClass("k-grid-cancel");

        	//remove close icon(x) from window
        	$(e.container).parent().find(".k-window-action").css("visibility", "hidden");

        	$(".save").attr("id", "save");
        	$(".cancel").attr("id", "cancel");

        	//Change Update text to Save 
        	var update = $(e.container).parent().find(".save");
        	var cancel = $(e.container).parent().find(".cancel");
        	$(update).html('<span class="k-icon k-i-save"></span> Save');
        	$(cancel).html('<span class="k-icon k-i-cancel"></span> Cancel');

            //move edit buttons up on top
        	var form = e.container.find('form');
        	$('<div class="hr-line-solid clearfix"></div>').prependTo(form);
        	e.container.find(".k-edit-buttons.k-state-default").css('border-width', 0).prependTo(form);

        	ADMINDAL.checkProductEntityIfAssociatedToProduct({
        		entity: e.model.entity,
        	}, function (r) {
        		if (r === false) {
        			e.container.find("input[name='retired']").removeAttr('disabled');
        		}
        		else if (r === true){
        			e.container.find("span[name='associated-to-product-message']").removeClass("hide");
        		}
        	});

        	e.container.find("#save").on("click", function (b) {
        		b.preventDefault();
        		if (e.container.find("form[name='validator']").kendoValidator().data("kendoValidator").validate()) {
        			$("#confirmProductEdit").data("kendoWindow").center().open();
        		}
        	});

        	e.container.find("#cancel").on("click", function (b) {
        	    b.preventDefault();
        	    if ($('#product-entity-grid').data('kendoGrid').dataSource.hasChanges()) {
        	        $("#confirmCancelProductEdit").data("kendoWindow").center().open();
        	    } else {
        	        viewModel.cancelProductEdit(b);
        	    }
        	});

        },

        saveProductChanges: function (e) {
        	$("#confirmProductEdit").data("kendoWindow").center().close();
        	$("#editProductEntityForm").data("kendoWindow").center().close();
        	$('#product-entity-grid').data('kendoGrid').dataSource.sync();
        },

        cancelProductChanges: function (e) {
        	$("#confirmProductEdit").data("kendoWindow").center().close();
        },

        cancelProductEdit: function (e) {
        	$("#confirmCancelProductEdit").data("kendoWindow").center().close();
        	$("#editProductEntityForm").data("kendoWindow").center().close();
        	$('#product-entity-grid').data('kendoGrid').dataSource.cancelChanges();
        },

        cancelCancelProductEdit: function () {
        	$("#confirmCancelProductEdit").data("kendoWindow").center().close();
        },

        trimProductEntity: function (e) {
        	viewModel.set('company_name', viewModel.company_name.trim());
        },

        addProductEntity: function (e) {
        	e.preventDefault();
        	$("#addProductEntityWindow").data("kendoWindow").center().open();
        },

        editProductEntity: function (e) {
        	e.preventDefault();
        	viewModel.set('edit_product_entity_id', e.data.id);
        	viewModel.set('edit_company_name', e.data.entity);
        	viewModel.set('prodEntityRetire', e.data.retired);

        	if (e.data.retired) {
        		$('#product_entity_retire').prop('checked', true);
        	}
        	else if (!e.data.retired) {
        		$('#product_entity_retire').prop('checked', false);
        	}

        	$('#product_entity_retire').change(function () {
        		if ($('#product_entity_retire').is(":checked")) {
        			viewModel.set('prodEntityRetire', true);
        		}
        		else {
        			viewModel.set('prodEntityRetire', false);
        		}
        	});

        	$("#editProductEntityWindow").data("kendoWindow").center().open();
        },

        confirmProductEntityCancel: function (e) {
        	e.preventDefault();
        	viewModel.set('company_name', '');
        	var validator = $("#addProductEntityWindow").kendoValidator().data("kendoValidator");
        	validator.hideMessages();
        	$("#addProductEntityWindow").data("kendoWindow").center().close();
        	$("#confirmCancelProductCreate").data("kendoWindow").center().close();
        },

        confirmCancelProductEntity: function (e) {
        	e.preventDefault();
        	$("#confirmCancelProductCreate").data("kendoWindow").center().close();
        },

        cancelAddProductEntity: function (e) {
            e.preventDefault();
            if ($('#company_name').val().length > 0) {
                $("#confirmCancelProductCreate").data("kendoWindow").center().open();
            } else {
                viewModel.confirmProductEntityCancel(e);
            }
        },

        validateCreateProductEntity: function (e) {
        	e.preventDefault();

            // attach a validator to the container and get a reference
        	var validatable = $("#addProductEntityWindow").kendoValidator().data("kendoValidator");
        	validatable.hideMessages();

            //validate the input elements and check if there are any errors
        	if (validatable.validate()) {
        	    if (viewModel.company_name.trim() === '' || viewModel.company_name.trim().length > 255) {
        	        var str = '';
        	        if (viewModel.company_name.trim().length > 255) {
        	            str = str + 'Length of company name is more than 255 characters. ';
        	            viewModel.set('metadata_error_message', str);
        	        }
        	        if (viewModel.company_name.trim() === '') {
        	            str = str + 'Cannot contain whitespace. ';
        	            viewModel.set('metadata_error_message', str);
        	        }

        	        $("#metaErrorMessage").data("kendoWindow").center().open();
        	    } else {
        	    	$("#confirmProductCreate").data("kendoWindow").center().open();
        	    }
        	}
        },

        createProductEntity: function (e) {
        	e.preventDefault();
        	ADMINDAL.addProductEntity({
        		companyName: viewModel.company_name.trim(),
        		retired: 0
        	},
            function (r) {
				if (r.error === false) {
					$('#product-entity-grid').data('kendoGrid').dataSource.read();
					viewModel.updateGrids('product-entity-grid');
					$('#product-entity-grid').data('kendoGrid').refresh();
					$("#addProductEntityWindow").data("kendoWindow").center().close();
					$("#confirmProductCreate").data("kendoWindow").center().close();
					viewModel.set('company_name', '');

					viewModel.set('meta_success_message', 'Product Entity successfully created.');
					$("#metaSuccessMessage").data("kendoWindow").center().open();
				}
				else if (r.duplicate === true) {
					viewModel.set('metadata_error_message', 'Unable to save because duplicate entry exists.');
					$("#metaErrorMessage").data("kendoWindow").center().open();
				}
				else if (r.error === true) {
					viewModel.set('metadata_error_message', 'An error has occured.');
					$("#metaErrorMessage").data("kendoWindow").center().open();
				}
            })
        },

        cancelProductEntity: function (e) {
        	e.preventDefault();
        	$("#confirmProductCreate").data("kendoWindow").center().close();
        },
        
        sourceInn_drp: ADMINDAL.metaSourceINN(),

        /************* COMMON FUNCTIONS **********/

        closeWindow: function (e) {
            e.preventDefault();
            var userProductData = this.user_store_dataItems;
            $("#editStudyError").data("kendoWindow").close();
            $("#saveUser").data("kendoWindow").close();
            $("#saveStudy").data("kendoWindow").close();
            $("#saveProduct").data("kendoWindow").close();
            $("#cancelUser").data("kendoWindow").close();
            $("#cancelStudy").data("kendoWindow").close();
            $("#cancelProduct").data("kendoWindow").close();
            $("#exportExcel").data("kendoWindow").close();
            $("#exportPdf").data("kendoWindow").close();
            $("#createStudyError").data("kendoWindow").close();
            $("#confirmCreateStudy").data("kendoWindow").close();
            $("#generalErrorWin").data("kendoWindow").close();
            $("#editProductFolderText").data("kendoWindow").close();
            $("#createProductError").data("kendoWindow").close();
            $("#confirmCreateProduct").data("kendoWindow").close();
            $("#missingFieldsError").data("kendoWindow").close();
            $("#confirm-primary-product").data("kendoWindow").close();
            $("#confirmEditStudy").data("kendoWindow").close();
            $("#duplicateStudyId").data("kendoWindow").close();
            $("#confirmSaveUserEntity").data("kendoWindow").close();
            $("#confirmStudySponsorship").data("kendoWindow").close();
            $("#confirmProductEntity").data("kendoWindow").close();
            $("#confirmAwareStudyInn").data("kendoWindow").close();
            $("#confirmSaveAwareINN").data("kendoWindow").close();
            $("#studyUpdateError").data("kendoWindow").close();
            $("#metaErrorMessage").data("kendoWindow").close();           
            $("#metaSuccessMessage").data("kendoWindow").close();
            $("#confirm-edit-primary-product").data("kendoWindow").close();
            $("#linkAllProductsConfirm").data("kendoWindow").close();
            $("#unlinkAllProductsConfirm").data("kendoWindow").close();
            $("#confirmUserCreate").data("kendoWindow").close();
            $("#confirmProductCreate").data("kendoWindow").close();
            $("#confirmAWARECreate").data("kendoWindow").close();
            $("#confirmStudiesCreate").data("kendoWindow").close();
            $("#confirmINNCreate").data("kendoWindow").close();            
        },

        onExportExcelWindow: function (e) {
            e.preventDefault();
            $("#exportExcel").data("kendoWindow").center().open();                
        },

        onExportPdfWindow: function (e) {
            e.preventDefault();
            $("#exportPdf").data("kendoWindow").center().open();                
        },

        onGridDataBound: function (e) {
        	var remove = 'hoverRemoveYes';

        	if (e.sender.element[0].id === 'welcome-message-grid') {
        		if (e.sender.dataSource.data().length > 1) {
        			viewModel.set('message', e.sender.dataSource.data()[0].message);
        		}
        	}

        	if (e.sender.element[0].id === "createstudygrid") {
        		var rows = e.sender.tbody.children();
        		for (var j = 0; j < rows.length; j++) {
        			var row = $(rows[j]);
        			var dataItem = e.sender.dataItem(row);
        			if (dataItem.id !== null && viewModel.primaryProduct !== 0) {
        				if (dataItem.id === viewModel.primaryProduct) {
        					row[0].childNodes[3].childNodes[1].id = "primaryUnlink";
        					row[0].childNodes[1].childNodes[0].childNodes[1].data = "Primary";
        					row[0].childNodes[1].childNodes[0].id = "primary-investigational-product";
        					row[0].childNodes[1].childNodes[0].className = "k-button k-button-icontext k-state-disabled";
        					$("#primary-investigational-product").removeAttr("href");
        					row.addClass("primaryInvestigationalProduct");
        					if (viewModel.study_associated_to_susar === true) {
        						row[0].childNodes[3].childNodes[1].className = "k-button k-button-icontext k-state-disabled";
        						$('#primaryUnlink').prop('disabled', true);
        						$('#primaryUnlink').removeAttr("href");
        					}
        				}
        				else if (viewModel.study_associated_to_susar === true) {
        					if (dataItem.id !== viewModel.primaryProduct) {
        						row[0].childNodes[1].childNodes[0].className = "k-button k-button-icontext k-state-disabled";
        					}
        				}
        			}
        		}
        	}

            if (e.sender.dataSource.view().length === 0) {
                var count = 0
                $.map(e.sender.columns, function (val, i) { if (!val.hidden) { ++count; } }); //count visible columns of grid
                e.sender.tbody.append($("<tr><td colspan='" + count + "'>No records</td></tr>"));
            }

            if (e.sender.dataSource.data().length === 0) {
                if (e.sender.wrapper[0].id === 'usergrid' ||
                    e.sender.wrapper[0].id === 'studygrid' ||
                    e.sender.wrapper[0].id === 'productgrid' ||
                    e.sender.wrapper[0].id === 'userNoficationHistoryGrid' ||
                    e.sender.wrapper[0].id === 'productNoficationHistoryGrid' ||
                    e.sender.wrapper[0].id === 'auditTrailUserGrid' ||
                    e.sender.wrapper[0].id === 'auditTrailStudyGrid' ||
                    e.sender.wrapper[0].id === 'auditTrailProductGrid' ||
                    false) {
                    viewModel.set('is' + e.sender.wrapper[0].id + 'ExportDisabled', true);
                }
            } else {
                if (e.sender.wrapper[0].id === 'usergrid' ||
                    e.sender.wrapper[0].id === 'studygrid' ||
                    e.sender.wrapper[0].id === 'productgrid' ||
                    e.sender.wrapper[0].id === 'userNoficationHistoryGrid' ||
                    e.sender.wrapper[0].id === 'productNoficationHistoryGrid' ||
                    e.sender.wrapper[0].id === 'auditTrailUserGrid' ||
                    e.sender.wrapper[0].id === 'auditTrailStudyGrid' ||
                    e.sender.wrapper[0].id === 'auditTrailProductGrid' ||
                    false) {
                    viewModel.set('is' + e.sender.wrapper[0].id + 'ExportDisabled', false);
                }
            }
           
            $('.k-grid span.k-icon.k-i-arrowhead-s').text('');
            $('.k-grid span.k-icon.k-i-filter').text('');
            
            COMM.tooltip(e);
        },

        addremove: function(e) {
            //   $('.list-arrows button').click(function() {
            //    var $btn = $(this),
            //        active = '';
            //        if ($btn.hasClass('move-left')) {
            //            console.log("left");
            //            active = $('.list-right ul li.active');
            //            active.clone().appendTo('.list-left ul').removeClass( "cbox" );
            //            active.appendTo('.list-left ul :checkbox').remove();
            //            active.remove();
            //        } else if ($btn.hasClass('move-right')) {
            //            console.log("right");
            //            active = $('.list-left ul li.active')
            //            active.clone().appendTo('.list-right ul').addClass('cbox');
            //            $('ul li.cbox').append('<span> <input type="checkbox" value="1" /> <input type="checkbox" value="1" /></span>');
            //            active.remove();
            //        }
            //});
        },

        onAvailableChange: function (e) {
            console.log(e);
        },

	    /************ EXPORT methods ************/
        onUsersExportExcelBtn: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                viewModel.displayWaitingWindow('Processing...');
                viewModel.displayLoading('', true, true);

                ADMINDAL.user_list_all(
                    function (q) {
                        if (q.error) {
                            console.error(q.message);
                            viewModel.displayOkWindow('An error has occurred.');
                        } else {
                            ADMINDAL.user_product_list_all(
                                function (r) {
                                    if (r.error) {
                                        console.error(r.message);
                                        viewModel.displayOkWindow('An error has occurred.');
                                    } else {
                                        var data = q;
                                        var access = r;
                                        var excelData = [];

                                        var found = false;
                                        for (var i = 0; i < data.length; i++) {
                                            found = false;
                                            for (var j = 0; j < access.length; j++) {
                                                if (data[i].id === access[j].userRefId) {
                                                    excelData.push($.extend(($.extend({}, data[i])), { product: access[j].dilProductName, access: ((access[j].access === COMM.PROPERTY.OPEN) ? COMM.PROPERTY.UNBLINDED : access[j].access) }));
                                                    found = true;
                                                }
                                            }
                                            if (!found) {
                                                excelData.push(data[i]);
                                            }
                                        }

                                        var columns = [
                                            { field: 'userName', title: 'User name', width: 200 },
                                            { field: 'userProfile', title: 'User Profile', width: 90 },
                                            { field: 'userEntity', title: 'User Entity', width: 100 },
                                            { field: 'country', title: 'User Country', width: 200 },
                                            { field: 'userStatus', title: 'User Status', width: 80 },
                                            { field: 'modified', title: 'Last Update', width: 150 },
                                            { field: 'product', title: 'Product', width: 350 },
                                            { field: 'access', title: 'Access', width: 150 },
                                        ]

                                        var cols = [];
                                        for (var i = 0; i < columns.length; i++) {
                                            cols.push($.extend({ value: columns[i].title }, COMM.excelHeaderStyle));
                                        }

                                        var rows = [];
                                        rows.push({ cells: [{ value: COMM.PROPERTY.TIMEZONEMESSAGE, colSpan: cols.length, bold: true, textAlign: "left" }, ], type: 'data', index: 0 }); //add main header
                                        rows.push({ cells: cols, index: 1 });

                                        for (var i = 0; i < excelData.length; i++) {
                                            //push single row for every record
                                            var colsData = [];
                                            for (var j = 0; j < columns.length; j++) {
                                                if (columns[j].field === 'modified') {
                                                    colsData.push({ value: kendo.toString(kendo.parseDate(excelData[i][columns[j].field]), 'dd-MMM-yyyy HH:mm') });
                                                } else {
                                                    colsData.push({ value: excelData[i][columns[j].field], wrap: true });
                                                }
                                            }

                                            rows.push({
                                                cells: colsData,
                                                type: 'data',
                                            })
                                        }

                                        var colsWidth = [];
                                        for (var i = 0; i < columns.length; i++) {
                                            colsWidth.push({ width: columns[i].width });
                                        }

                                        var workbook = new kendo.ooxml.Workbook({
                                            creator: COMM.PROPERTY.EXCELAUTHOR,
                                            sheets: [
                                                {
                                                    frozenRows: 2,
                                                    columns: colsWidth,
                                                    filter: { from: 0, to: cols.length - 1 }, // 0 based index
                                                    rows: rows, //Rows of the sheet
                                                    title: 'Users', //Title of the sheet
                                                }
                                            ]
                                        });

                                        $('#waitingWindow').data('kendoWindow').close();
                                        viewModel.displayLoading('', false, true);

                                        //save the file as Excel file with extension xlsx
                                        kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Users.xlsx" });
                                    }
                                });
                        }
                    });

            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onUsersOnlyExportExcelBtn: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();

                ADMINDAL.user_list_all(
                    function (r) {
                        if (r.error) {
                            console.error(r.message);
                            viewModel.displayOkWindow('An error has occurred.');
                        } else {
                            var data = r;
                            var columns = [
                                { field: 'userName', title: 'User name', width: 200 },
                                { field: 'userProfile', title: 'User Profile', width: 90 },
                                { field: 'userEntity', title: 'User Entity', width: 100 },
                                { field: 'country', title: 'User Country', width: 100 },
                                { field: 'userStatus', title: 'User Status', width: 80 },
                                { field: 'created', title: 'Created', width: 150 },
                                { field: 'modified', title: 'Last Update', width: 150 },
                            ]

                            var cols = [];
                            for (var i = 0; i < columns.length; i++) {
                                cols.push($.extend({ value: columns[i].title }, COMM.excelHeaderStyle));
                            }

                            var rows = [];
                            rows.push({ cells: [{ value: COMM.PROPERTY.TIMEZONEMESSAGE, colSpan: cols.length, bold: true, textAlign: "left" }, ], type: 'data', index: 0 }); //add main header
                            rows.push({ cells: cols, index: 1 });

                            for (var i = 0; i < data.length; i++) {
                                //push single row for every record
                                var colsData = [];
                                for (var j = 0; j < columns.length; j++) {
                                    if (columns[j].field === 'created' || columns[j].field === 'modified') {
                                        colsData.push({ value: kendo.toString(kendo.parseDate(data[i][columns[j].field]), 'dd-MMM-yyyy HH:mm') });
                                    } else {
                                        colsData.push({ value: data[i][columns[j].field] });
                                    }
                                }

                                rows.push({
                                    cells: colsData,
                                    type: 'data',
                                })
                            }

                            var colsWidth = [];
                            for (var i = 0; i < columns.length; i++) {
                                colsWidth.push({ width: columns[i].width });
                            }

                            var workbook = new kendo.ooxml.Workbook({
                                creator: COMM.PROPERTY.EXCELAUTHOR,
                                sheets: [
                                    {
                                        frozenRows: 2,
                                        columns: colsWidth,
                                        filter: { from: 0, to: cols.length - 1 }, // 0 based index
                                        rows: rows, //Rows of the sheet
                                        title: 'Users', //Title of the sheet
                                    }
                                ]
                            });

                            //save the file as Excel file with extension xlsx
                            kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Users Only.xlsx" });
                        }
                    });
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onStudyExportExcelBtn: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();

                var data = $('#studygrid').data('kendoGrid').dataSource.data();

                var columns = [
                    { field: 'studyId', title: 'Study ID', width: 300 },
                    { field: 'investigationalDILProductString', title: 'Investigational Product(s)', width: 450 },
                    { field: 'primaryInvProdDILProduct', title: 'Primary Investigational Product', width: 450 },
                    { field: 'studySponsorship', title: 'Study Sponsorship', width: 135 },
                    { field: 'studyBlindedStatus', title: 'Study Blinded Status', width: 140 },
                    { field: 'retire', title: 'Retired', width: 95 },
                ]

                var cols = [];
                for (var i = 0; i < columns.length; i++) {
                    cols.push($.extend({ value: columns[i].title }, COMM.excelHeaderStyle));
                }

                var rows = [{
                    cells: cols,
                }];

                for (var i = 0; i < data.length; i++) {
                    //push single row for every record
                    var colsData = [];
                    var obj = { investigationalDILProductString: 0, primaryInvProdDILProduct: 0 };
                    for (var j = 0; j < columns.length; j++) {
                        if (columns[j].field === 'investigationalDILProductString' || columns[j].field === 'primaryInvProdDILProduct') {
                            var val = data[i][columns[j].field];
                            colsData.push({ value: val, wrap: true });
                            obj[columns[j].field] += val.length;
                        } else if (columns[j].field === 'retire') {
                            colsData.push({ value: (data[i][columns[j].field] ? 'YES' : 'NO') });
                        } else {
                            colsData.push({ value: data[i][columns[j].field] });
                        }
                    }
                    rows.push({
                        cells: colsData,
                        height: 20 + ((obj.investigationalDILProductString / 38) * 20),
                    })
                }

                var colsWidth = [];
                for (var i = 0; i < columns.length; i++) {
                    colsWidth.push({ width: columns[i].width });
                }

                var workbook = new kendo.ooxml.Workbook({
                    creator: COMM.PROPERTY.EXCELAUTHOR,
                    sheets: [
                        {
                            columns: colsWidth,
                            filter: { from: 0, to: cols.length - 1 }, // 0 based index
                            rows: rows, //Rows of the sheet
                            title: 'Studies', //Title of the sheet
                        }
                    ]
                });

                //save the file as Excel file with extension xlsx
                kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Studies.xlsx" });
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onProductExportExcelBtn: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();

                ADMINDAL.user_product_list_all(
                    function (r) {
                        if (r.error) {
                            console.error(r.message);
                            viewModel.displayOkWindow('An error has occurred.');
                        } else {
                            var products = $('#productgrid').data('kendoGrid').dataSource.data();
                            var studies = $('#studygrid').data('kendoGrid').dataSource.data();
                            var access = r;
                            var excelData = [];

                            //insert studies
                            for (var i = 0; i < studies.length; i++) {
                                if (studies[i].retire) {
                                    continue;
                                }
                                for (var j = 0; j < products.length; j++) {
                                    if (studies[i].primaryInvProdDILProductID === products[j].id) {
                                        if (products[j].studies && products[j].studies.length > 0) {
                                            products[j].studies.push(studies[i].studyId);
                                        } else {
                                            products[j].studies = [studies[i].studyId];
                                        }
                                        break;
                                    }
                                }
                            }

                            //insert users
                            for (var i = 0; i < products.length; i++) {
                                var accessFound = false;
                                for (var j = 0; j < access.length; j++) {
                                    if (products[i].id === access[j].dilProductId) {
                                        accessFound = true;
                                        var obj = $.extend({}, products[i]);
                                        obj.user = access[j].userName;
                                        obj.access = ((access[j].access === COMM.PROPERTY.OPEN) ? COMM.PROPERTY.UNBLINDED : access[j].access);
                                        excelData.push(obj);
                                    }
                                }
                                if (!accessFound) {
                                    excelData.push(products[i]);
                                }
                            }

                            var columns = [
                                { field: 'dilProduct', title: 'DIL Product', width: 310 },
                                { field: 'code', title: 'Product Code', width: 250 },
                                { field: 'nickname', title: 'Product Nick name', width: 220 },
                                { field: 'inn', title: 'PV Database INN', width: 370 },
                                { field: 'entity', title: 'Product Entity', width: 95 },
                                { field: 'studies', title: 'Studies', width: 276 },
                                { field: 'user', title: 'User', width: 300 },
                                { field: 'access', title: 'Access', width: 300 },
                                { field: 'retired', title: 'Retired', width: 95 },
                            ]

                            var cols = [];
                            for (var i = 0; i < columns.length; i++) {
                                cols.push($.extend({ value: columns[i].title }, COMM.excelHeaderStyle));
                            }

                            var rows = [{
                                cells: cols,
                                type: 'header',
                            }];

                            for (var i = 0; i < excelData.length; i++) {
                                //push single row for every record
                                var colsData = [];
                                var obj = { studies: 0 };
                                for (var j = 0; j < columns.length; j++) {
                                    if (columns[j].field === 'studies') {
                                        var val = ((excelData[i][columns[j].field] && excelData[i][columns[j].field].length > 0) ? excelData[i][columns[j].field].join(', ') : '');
                                        colsData.push({ value: val, wrap: true });
                                        obj[columns[j].field] += val.length;
                                    } else if (columns[j].field === 'retired') {
                                        colsData.push({ value: (excelData[i][columns[j].field] ? 'YES' : 'NO') });
                                    } else {
                                        colsData.push({ value: excelData[i][columns[j].field], wrap: true });
                                    }
                                }

                                //get size of biggest array
                                var max = obj.studies;

                                rows.push({
                                    cells: colsData,
                                    height: 20 + ((max / 30) * 20),
                                })
                            }

                            var colsWidth = [];
                            for (var i = 0; i < columns.length; i++) {
                                colsWidth.push({ width: columns[i].width });
                            }

                            var workbook = new kendo.ooxml.Workbook({
                                creator: COMM.PROPERTY.EXCELAUTHOR,
                                sheets: [
                                    {
                                        columns: colsWidth,
                                        filter: { from: 0, to: cols.length - 1 }, // 0 based index
                                        rows: rows, //Rows of the sheet
                                        title: 'Products', //Title of the sheet
                                    }
                                ]
                            });

                            //save the file as Excel file with extension xlsx
                            kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Products.xlsx" });
                        }
                    });
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onProductOnlyExportExcelBtn: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();

                var products = $('#productgrid').data('kendoGrid').dataSource.data();
                var columns = [
                    { field: 'dilProduct', title: 'DIL Product', width: 310 },
                    { field: 'code', title: 'Product Code', width: 250 },
                    { field: 'nickname', title: 'Product Nick name', width: 220 },
                    { field: 'inn', title: 'PV Database INN', width: 370 },
                    { field: 'entity', title: 'Product Entity', width: 95 },
                    { field: 'retired', title: 'Retired', width: 95 },
                    { field: 'created', title: 'Created', width: 150 },
                    { field: 'modified', title: 'Last Update', width: 150 },
                ]

                var cols = [];
                for (var i = 0; i < columns.length; i++) {
                    cols.push($.extend({ value: columns[i].title }, COMM.excelHeaderStyle));
                }

                var rows = [];
                rows.push({ cells: [{ value: COMM.PROPERTY.TIMEZONEMESSAGE, colSpan: cols.length, bold: true, textAlign: "left" }, ], type: 'data', index: 0 }); //add main header
                rows.push({ cells: cols, index: 1 });

                for (var i = 0; i < products.length; i++) {
                    //push single row for every record
                    var colsData = [];
                    for (var j = 0; j < columns.length; j++) {
                        if (columns[j].field === 'created' || columns[j].field === 'modified') {
                            colsData.push({ value: kendo.toString(kendo.parseDate(products[i][columns[j].field]), 'dd-MMM-yyyy HH:mm') });
                        } else if (columns[j].field === 'retired') {
                            colsData.push({ value: (products[i][columns[j].field] ? 'YES' : 'NO') });
                        } else {
                            colsData.push({ value: products[i][columns[j].field], wrap: true });
                        }
                    }

                    rows.push({
                        cells: colsData,
                        type: 'data',
                    })
                }

                var colsWidth = [];
                for (var i = 0; i < columns.length; i++) {
                    colsWidth.push({ width: columns[i].width });
                }

                var workbook = new kendo.ooxml.Workbook({
                    creator: COMM.PROPERTY.EXCELAUTHOR,
                    sheets: [
                        {
                            frozenRows: 2,
                            columns: colsWidth,
                            filter: { from: 0, to: cols.length - 1 }, // 0 based index
                            rows: rows, //Rows of the sheet
                            title: 'Products', //Title of the sheet
                        }
                    ]
                });

                //save the file as Excel file with extension xlsx
                kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Products Only.xlsx" });
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onDilProdPdfWindow: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to PDF?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                if (viewModel.meta_paging !== null) {
                    viewModel.meta_paging.removeClass('disablepaging');
                }
                $('#productgrid').data('kendoGrid').saveAsPDF();
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },      

        onStudyINNPdfWindow: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to PDF?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                if (viewModel.meta_paging !== null) {
                    viewModel.meta_paging.removeClass('disablepaging');
                }
                $('#awareInnGrid').data('kendoGrid').saveAsPDF();
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onUserEntityExcelWindow: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();

                var userentity = $('#user-entity-grid').data('kendoGrid').dataSource.data();
                var columns = [{
                    field: 'userEntity',
                    title: 'Company Name',
                    width: 310
                }, {
                    field: 'retired',
                    title: 'Retired',
                    width: 310
                }, ]

                var cols = [];
                for (var i = 0; i < columns.length; i++) {
                    cols.push($.extend({ value: columns[i].title }, COMM.excelHeaderStyle));
                }

                var rows = [{
                    cells: cols,
                }];

                for (var i = 0; i < userentity.length; i++) {
                    //push single row for every record
                    var colsData = [];
                    var obj = {
                        blindedUsers: 0,
                        openUsers: 0,
                        studies: 0
                    };
                    for (var j = 0; j < columns.length; j++) {
                        if (columns[j].field === 'retired') {
                            colsData.push({
                                value: userentity[i][columns[j].field] ? 'YES' : 'NO'
                            });
                        } else if (columns[j].field === 'blindedUsers' || columns[j].field === 'openUsers' || columns[j].field === 'studies') {
                            var val = ((userentity[i][columns[j].field] && userentity[i][columns[j].field].length > 0) ? userentity[i][columns[j].field].join(', ') : '');
                            colsData.push({
                                value: val,
                                wrap: true
                            });
                            obj[columns[j].field] += val.length;
                        } else {
                            colsData.push({
                                value: userentity[i][columns[j].field],
                                wrap: true
                            });
                        }
                    }

                    //get size of biggest array
                    var max = 1;
                    var a = obj.blindedUsers;
                    var b = obj.openUsers;
                    var c = obj.studies;
                    if (a > b && a > c) {
                        max = a;
                    } else if (b > a && b > c) {
                        max = b;
                    } else {
                        max = c;
                    }

                    rows.push({
                        cells: colsData,
                        height: 20 + ((max / 38) * 20),
                    })
                }

                var colsWidth = [];
                for (var i = 0; i < columns.length; i++) {
                    colsWidth.push({
                        width: columns[i].width
                    });
                }

                var workbook = new kendo.ooxml.Workbook({
                    creator: COMM.PROPERTY.EXCELAUTHOR,
                    sheets: [{
                        columns: colsWidth,
                        filter: { from: 0, to: cols.length - 1 }, // 0 based index
                        rows: rows, //Rows of the sheet
                        title: 'User Entity', //Title of the sheet
                    }]
                });

                //save the file as Excel file with extension xlsx
                kendo.saveAs({
                    dataURI: workbook.toDataURL(),
                    fileName: "UserEntity.xlsx"
                });
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onUserEntityPdfWindow: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to PDF?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                $("#user-entity-grid").data("kendoGrid").saveAsPDF();
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onUserEntityPdfExport: function (e) {
            e.preventDefault();
            var userentity = $("#user-entity-grid").data("kendoGrid");
            var ds = userentity.dataSource.data();

            //get visible columns
            var columns = [];
            var susarObj = {};
            var objArray = [];
            var colWidth = {};


            for (var i = 1; i < userentity.columns.length; i++) {
                if (!userentity.columns[i].hidden && userentity.columns[i].field !== 'attachmentBlindedCIOMSUrl' && userentity.columns[i].field !== 'attachmentOpenCIOMSUrl') {
                    columns.push({ title: userentity.columns[i].title.toUpperCase(), dataKey: userentity.columns[i].field });
                    susarObj[userentity.columns[i].field] = '';

                    //set width
                    var divisor = 1;
                    var unitIndex = (userentity.columns[i].width).indexOf('px');
                    var width = (unitIndex > -1) ? (userentity.columns[i].width).substring(0, unitIndex) : 100;
                    var pdfWidth = (width / divisor) ? width / divisor : divisor
                    colWidth[userentity.columns[i].field] = { columnWidth: pdfWidth };
                }
            }

            for (var i = 0; i < ds.length; i++) {
                var o = JSON.parse(JSON.stringify(susarObj));               
                for (var j = 0; j < columns.length; j++) {
                    if (columns[j].dataKey === 'retired') {
                        o[columns[j].dataKey] = ds[i][columns[j].dataKey] ? 'Yes' : 'No';
                    } else {
                        o[columns[j].dataKey] = ds[i][columns[j].dataKey] ? ds[i][columns[j].dataKey] : '';
                    }
                }
                objArray.push(o);
            }

            var doc = new jsPDF('l', 'mm', [300, 300]); //page size
            var totalPagesExp = "{total_pages_count_string}";
            doc.autoTable(columns, objArray, {
                addPageContent: function (data) {
                    doc.text('User Entity', data.settings.margin.left, 10);
                    doc.setFontSize(10);
                    var str = "Page " + data.pageCount;
                    doc.text(str + " of " + totalPagesExp, 350, 10);
                },
                columnStyles: colWidth,
                margin: {
                    top: 17, bottom: 20,
                },
                options: {
                    startY: false, // false (indicates margin top value) or a number
                },

                styles: {
                    overflow: 'linebreak',
                    fontSize: 7,
                    lineWidth: 0.3,
                },
            });

            if (typeof doc.putTotalPages === 'function') {
                doc.putTotalPages(totalPagesExp);
            }
            doc.save("UserEntity.pdf");
        },

        onProdEntityExcelWindow: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();

                var userentity = $('#product-entity-grid').data('kendoGrid').dataSource.data();
                var columns = [{
                    field: 'entity',
                    title: 'Company Name',
                    width: 310
                }, {
                    field: 'retired',
                    title: 'Retired',
                    width: 310
                }, ]

                var cols = [];
                for (var i = 0; i < columns.length; i++) {
                    cols.push($.extend({
                        value: columns[i].title
                    }, COMM.excelHeaderStyle));
                }

                var rows = [{
                    cells: cols,
                }];

                for (var i = 0; i < userentity.length; i++) {
                    //push single row for every record
                    var colsData = [];
                    var obj = {
                        blindedUsers: 0,
                        openUsers: 0,
                        studies: 0
                    };
                    for (var j = 0; j < columns.length; j++) {
                        if (columns[j].field === 'retired') {
                            colsData.push({
                                value: userentity[i][columns[j].field] ? 'YES' : 'NO'
                            });
                        } else if (columns[j].field === 'blindedUsers' || columns[j].field === 'openUsers' || columns[j].field === 'studies') {
                            var val = ((userentity[i][columns[j].field] && userentity[i][columns[j].field].length > 0) ? userentity[i][columns[j].field].join(', ') : '');
                            colsData.push({
                                value: val,
                                wrap: true
                            });
                            obj[columns[j].field] += val.length;
                        } else {
                            colsData.push({
                                value: userentity[i][columns[j].field],
                                wrap: true
                            });
                        }
                    }

                    //get size of biggest array
                    var max = 1;
                    var a = obj.blindedUsers;
                    var b = obj.openUsers;
                    var c = obj.studies;
                    if (a > b && a > c) {
                        max = a;
                    } else if (b > a && b > c) {
                        max = b;
                    } else {
                        max = c;
                    }

                    rows.push({
                        cells: colsData,
                        height: 20 + ((max / 38) * 20),
                    })
                }

                var colsWidth = [];
                for (var i = 0; i < columns.length; i++) {
                    colsWidth.push({
                        width: columns[i].width
                    });
                }

                var workbook = new kendo.ooxml.Workbook({
                    creator: COMM.PROPERTY.EXCELAUTHOR,
                    sheets: [{
                        columns: colsWidth,
                        filter: { from: 0, to: cols.length - 1 }, // 0 based index
                        rows: rows, //Rows of the sheet
                        title: 'Product Entity', //Title of the sheet
                    }]
                });

                //save the file as Excel file with extension xlsx
                kendo.saveAs({
                    dataURI: workbook.toDataURL(),
                    fileName: "ProductEntity.xlsx"
                });
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onProdEntityPdfWindow: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to PDF?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                $('#product-entity-grid').data('kendoGrid').saveAsPDF();
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onProdEntityPdfExport: function (e) {
            e.preventDefault();
            var userentity = $("#product-entity-grid").data("kendoGrid");
            var ds = userentity.dataSource.data();

            //get visible columns
            var columns = [];
            var susarObj = {};
            var objArray = [];
            var colWidth = {};


            for (var i = 1; i < userentity.columns.length; i++) {
                if (!userentity.columns[i].hidden && userentity.columns[i].field !== 'attachmentBlindedCIOMSUrl' && userentity.columns[i].field !== 'attachmentOpenCIOMSUrl') {
                    columns.push({ title: userentity.columns[i].title.toUpperCase(), dataKey: userentity.columns[i].field });
                    susarObj[userentity.columns[i].field] = '';

                    //set width
                    var divisor = 1;
                    var unitIndex = (userentity.columns[i].width).indexOf('px');
                    var width = (unitIndex > -1) ? (userentity.columns[i].width).substring(0, unitIndex) : 100;
                    var pdfWidth = (width / divisor) ? width / divisor : divisor
                    colWidth[userentity.columns[i].field] = { columnWidth: pdfWidth };
                }
            }

            for (var i = 0; i < ds.length; i++) {
                var o = JSON.parse(JSON.stringify(susarObj));
                for (var j = 0; j < columns.length; j++) {
                    if (columns[j].dataKey === 'retired') {
                        o[columns[j].dataKey] = ds[i][columns[j].dataKey] ? 'Yes' : 'No';
                    } else {
                        o[columns[j].dataKey] = ds[i][columns[j].dataKey] ? ds[i][columns[j].dataKey] : '';
                    }
                }
                objArray.push(o);
            }

            var doc = new jsPDF('l', 'mm', [300, 300]); //page size
            var totalPagesExp = "{total_pages_count_string}";
            doc.autoTable(columns, objArray, {
                addPageContent: function (data) {
                    doc.text('Product Entity', data.settings.margin.left, 10);
                    doc.setFontSize(10);
                    var str = "Page " + data.pageCount;
                    doc.text(str + " of " + totalPagesExp, 350, 10);
                },
                columnStyles: colWidth,
                margin: {
                    top: 17, bottom: 20,
                },
                options: {
                    startY: false, // false (indicates margin top value) or a number
                },

                styles: {
                    overflow: 'linebreak',
                    fontSize: 7,
                    lineWidth: 0.3,
                },
            });

            if (typeof doc.putTotalPages === 'function') {
                doc.putTotalPages(totalPagesExp);
            }
            doc.save("ProductEntity.pdf");
        },

        onStudyAwareINNExcelWindow: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();

                var userentity = $('#study-aware-inn').data('kendoGrid').dataSource.data();
                var columns = [{
                    field: 'studyInn',
                    title: 'Study INN',
                    width: 310
                }, {
                    field: 'drugName',
                    title: 'Drug Name',
                    width: 310
                }, {
                    field: 'retired',
                    title: 'Retired',
                    width: 310
                }, ]

                var cols = [];
                for (var i = 0; i < columns.length; i++) {
                    cols.push($.extend({
                        value: columns[i].title
                    }, COMM.excelHeaderStyle));
                }

                var rows = [{
                    cells: cols,
                }];

                for (var i = 0; i < userentity.length; i++) {
                    //push single row for every record
                    var colsData = [];
                    var obj = {
                        blindedUsers: 0,
                        openUsers: 0,
                        studies: 0
                    };
                    for (var j = 0; j < columns.length; j++) {
                        if (columns[j].field === 'retired') {
                            colsData.push({
                                value: userentity[i][columns[j].field] ? 'YES' : 'NO'
                            });
                        } else if (columns[j].field === 'blindedUsers' || columns[j].field === 'openUsers' || columns[j].field === 'studies') {
                            var val = ((userentity[i][columns[j].field] && userentity[i][columns[j].field].length > 0) ? userentity[i][columns[j].field].join(', ') : '');
                            colsData.push({
                                value: val,
                                wrap: true
                            });
                            obj[columns[j].field] += val.length;
                        } else {
                            colsData.push({
                                value: userentity[i][columns[j].field],
                                wrap: true
                            });
                        }
                    }

                    //get size of biggest array
                    var max = 1;
                    var a = obj.blindedUsers;
                    var b = obj.openUsers;
                    var c = obj.studies;
                    if (a > b && a > c) {
                        max = a;
                    } else if (b > a && b > c) {
                        max = b;
                    } else {
                        max = c;
                    }

                    rows.push({
                        cells: colsData,
                        height: 20 + ((max / 38) * 20),
                    })
                }

                var colsWidth = [];
                for (var i = 0; i < columns.length; i++) {
                    colsWidth.push({
                        width: columns[i].width
                    });
                }

                var workbook = new kendo.ooxml.Workbook({
                    creator: COMM.PROPERTY.EXCELAUTHOR,
                    sheets: [{
                        columns: colsWidth,
                        filter: { from: 0, to: cols.length - 1 }, // 0 based index
                        rows: rows, //Rows of the sheet
                        title: 'Aware Studies', //Title of the sheet
                    }]
                });

                //save the file as Excel file with extension xlsx
                kendo.saveAs({
                    dataURI: workbook.toDataURL(),
                    fileName: "AwareStudies.xlsx"
                });
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onStudyAwareINNPdfWindow: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to PDF?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                if (viewModel.meta_paging !== null) {
                    viewModel.meta_paging.removeClass('disablepaging');
                }
                $('#study-aware-inn').data('kendoGrid').saveAsPDF();
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onStudyAwareINNPdfExport: function (e) {
            e.preventDefault();
            var userentity = $("#study-aware-inn").data("kendoGrid");
            var ds = userentity.dataSource.data();

            //get visible columns
            var columns = [];
            var susarObj = {};
            var objArray = [];
            var colWidth = {};


            for (var i = 1; i < userentity.columns.length; i++) {
                if (!userentity.columns[i].hidden && userentity.columns[i].field !== 'attachmentBlindedCIOMSUrl' && userentity.columns[i].field !== 'attachmentOpenCIOMSUrl') {
                    columns.push({ title: userentity.columns[i].title.toUpperCase(), dataKey: userentity.columns[i].field });
                    susarObj[userentity.columns[i].field] = '';

                    //set width
                    var divisor = 1;
                    var unitIndex = (userentity.columns[i].width).indexOf('px');
                    var width = (unitIndex > -1) ? (userentity.columns[i].width).substring(0, unitIndex) : 50;
                    var pdfWidth = (width / divisor) ? width / divisor : divisor
                    colWidth[userentity.columns[i].field] = { columnWidth: pdfWidth };
                }
            }

            for (var i = 0; i < ds.length; i++) {
                var o = JSON.parse(JSON.stringify(susarObj));
                for (var j = 0; j < columns.length; j++) {
                    if (columns[j].dataKey === 'retired') {
                        o[columns[j].dataKey] = ds[i][columns[j].dataKey] ? 'Yes' : 'No';
                    } else {
                        o[columns[j].dataKey] = ds[i][columns[j].dataKey] ? ds[i][columns[j].dataKey] : '';
                    }
                }
                objArray.push(o);
            }

            var doc = new jsPDF('l', 'mm', [300, 300]); //page size
            var totalPagesExp = "{total_pages_count_string}";
            doc.autoTable(columns, objArray, {
                addPageContent: function (data) {
                    doc.text('AWARE Studies', data.settings.margin.left, 10);
                    doc.setFontSize(10);
                    var str = "Page " + data.pageCount;
                    doc.text(str + " of " + totalPagesExp, 350, 10);
                },
                columnStyles: colWidth,
                margin: {
                    top: 17, bottom: 20,
                },
                options: {
                    startY: false, // false (indicates margin top value) or a number
                },

                styles: {
                    overflow: 'linebreak',
                    fontSize: 7,
                    lineWidth: 0.3,
                },
            });

            if (typeof doc.putTotalPages === 'function') {
                doc.putTotalPages(totalPagesExp);
            }
            doc.save("AWAREStudies.pdf");
        },

        onAwareINNExcelWindow: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();

                var userentity = $('#aware-inn-grid').data('kendoGrid').dataSource.data();
                var columns = [{
                    field: 'awareInn',
                    title: 'INN',
                    width: 310
                }, {
                    field: 'sourceInn',
                    title: 'Source',
                    width: 310
                },
                {
                    field: 'retired',
                    title: 'Retired',
                    width: 310
                }, ]

                var cols = [];
                for (var i = 0; i < columns.length; i++) {
                    cols.push($.extend({
                        value: columns[i].title
                    }, COMM.excelHeaderStyle));
                }

                var rows = [{
                    cells: cols,
                }];

                for (var i = 0; i < userentity.length; i++) {
                    //push single row for every record
                    var colsData = [];
                    var obj = {
                        blindedUsers: 0,
                        openUsers: 0,
                        studies: 0
                    };
                    for (var j = 0; j < columns.length; j++) {
                        if (columns[j].field === 'retired') {
                            colsData.push({
                                value: userentity[i][columns[j].field] ? 'YES' : 'NO'
                            });
                        } else if (columns[j].field === 'blindedUsers' || columns[j].field === 'openUsers' || columns[j].field === 'studies') {
                            var val = ((userentity[i][columns[j].field] && userentity[i][columns[j].field].length > 0) ? userentity[i][columns[j].field].join(', ') : '');
                            colsData.push({
                                value: val,
                                wrap: true
                            });
                            obj[columns[j].field] += val.length;
                        } else {
                            colsData.push({
                                value: userentity[i][columns[j].field],
                                wrap: true
                            });
                        }
                    }

                    //get size of biggest array
                    var max = 1;
                    var a = obj.blindedUsers;
                    var b = obj.openUsers;
                    var c = obj.studies;
                    if (a > b && a > c) {
                        max = a;
                    } else if (b > a && b > c) {
                        max = b;
                    } else {
                        max = c;
                    }

                    rows.push({
                        cells: colsData,
                        height: 20 + ((max / 38) * 20),
                    })
                }

                var colsWidth = [];
                for (var i = 0; i < columns.length; i++) {
                    colsWidth.push({
                        width: columns[i].width
                    });
                }

                var workbook = new kendo.ooxml.Workbook({
                    creator: COMM.PROPERTY.EXCELAUTHOR,
                    sheets: [{
                        columns: colsWidth,
                        filter: { from: 0, to: cols.length - 1 }, // 0 based index
                        rows: rows, //Rows of the sheet
                        title: 'PV DATABASE INN', //Title of the sheet
                    }]
                });

                //save the file as Excel file with extension xlsx
                kendo.saveAs({
                    dataURI: workbook.toDataURL(),
                    fileName: "PVDATABASEINN.xlsx"
                });
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onAwareINNPdfWindow: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to PDF?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                $('#aware-inn-grid').data('kendoGrid').saveAsPDF();
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onAwareINNPdfExport: function (e) {
            e.preventDefault();
            var userentity = $("#aware-inn-grid").data("kendoGrid");
            var ds = userentity.dataSource.data();

            //get visible columns
            var columns = [];
            var susarObj = {};
            var objArray = [];
            var colWidth = {};


            for (var i = 1; i < userentity.columns.length; i++) {
                if (!userentity.columns[i].hidden && userentity.columns[i].field !== 'attachmentBlindedCIOMSUrl' && userentity.columns[i].field !== 'attachmentOpenCIOMSUrl') {
                    columns.push({ title: userentity.columns[i].title.toUpperCase(), dataKey: userentity.columns[i].field });
                    susarObj[userentity.columns[i].field] = '';

                    //set width
                    var divisor = 1;
                    var unitIndex = (userentity.columns[i].width).indexOf('px');
                    var width = (unitIndex > -1) ? (userentity.columns[i].width).substring(0, unitIndex) : 90;
                    var pdfWidth = (width / divisor) ? width / divisor : divisor
                    colWidth[userentity.columns[i].field] = { columnWidth: pdfWidth };
                }
            }

            for (var i = 0; i < ds.length; i++) {
                var o = JSON.parse(JSON.stringify(susarObj));
                for (var j = 0; j < columns.length; j++) {
                    if (columns[j].dataKey === 'retired') {
                        o[columns[j].dataKey] = ds[i][columns[j].dataKey] ? 'Yes' : 'No';
                    } else {
                        o[columns[j].dataKey] = ds[i][columns[j].dataKey] ? ds[i][columns[j].dataKey] : '';
                    }
                }
                objArray.push(o);
            }


            var doc = new jsPDF('l', 'mm', [300, 300]); //page size
            var totalPagesExp = "{total_pages_count_string}";
            doc.autoTable(columns, objArray, {
                addPageContent: function (data) {
                    doc.text('PV DATABASE INN', data.settings.margin.left, 10);
                    doc.setFontSize(10);
                    var str = "Page " + data.pageCount;
                    doc.text(str + " of " + totalPagesExp, 350, 10);
                },
                columnStyles: colWidth,
                margin: {
                    top: 17, bottom: 20,
                },
                options: {
                    startY: false, // false (indicates margin top value) or a number
                },

                styles: {
                    overflow: 'linebreak',
                    fontSize: 7,
                    lineWidth: 0.3,
                },
            });

            if (typeof doc.putTotalPages === 'function') {
                doc.putTotalPages(totalPagesExp);
            }
            doc.save("PVDATABASEINN.pdf");
        },

        onStudySponsorshipExcelWindow: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();

                var userentity = $('#study-sponsorship-grid').data('kendoGrid').dataSource.data();
                var columns = [{
                    field: 'studySponsorship',
                    title: 'Company Name',
                    width: 310
                }, {
                    field: 'retired',
                    title: 'Retired',
                    width: 310
                }, ]

                var cols = [];
                for (var i = 0; i < columns.length; i++) {
                    cols.push($.extend({
                        value: columns[i].title
                    }, COMM.excelHeaderStyle));
                }

                var rows = [{
                    cells: cols,
                }];

                for (var i = 0; i < userentity.length; i++) {
                    //push single row for every record
                    var colsData = [];
                    var obj = {
                        blindedUsers: 0,
                        openUsers: 0,
                        studies: 0
                    };
                    for (var j = 0; j < columns.length; j++) {
                        if (columns[j].field === 'retired') {
                            colsData.push({
                                value: userentity[i][columns[j].field] ? 'YES' : 'NO'
                            });
                        } else if (columns[j].field === 'blindedUsers' || columns[j].field === 'openUsers' || columns[j].field === 'studies') {
                            var val = ((userentity[i][columns[j].field] && userentity[i][columns[j].field].length > 0) ? userentity[i][columns[j].field].join(', ') : '');
                            colsData.push({
                                value: val,
                                wrap: true
                            });
                            obj[columns[j].field] += val.length;
                        } else {
                            colsData.push({
                                value: userentity[i][columns[j].field],
                                wrap: true
                            });
                        }
                    }

                    //get size of biggest array
                    var max = 1;
                    var a = obj.blindedUsers;
                    var b = obj.openUsers;
                    var c = obj.studies;
                    if (a > b && a > c) {
                        max = a;
                    } else if (b > a && b > c) {
                        max = b;
                    } else {
                        max = c;
                    }

                    rows.push({
                        cells: colsData,
                        height: 20 + ((max / 38) * 20),
                    })
                }

                var colsWidth = [];
                for (var i = 0; i < columns.length; i++) {
                    colsWidth.push({
                        width: columns[i].width
                    });
                }

                var workbook = new kendo.ooxml.Workbook({
                    creator: COMM.PROPERTY.EXCELAUTHOR,
                    sheets: [{
                        columns: colsWidth,
                        filter: { from: 0, to: cols.length - 1 }, // 0 based index
                        rows: rows, //Rows of the sheet
                        title: 'Study Sponsorship', //Title of the sheet
                    }]
                });

                //save the file as Excel file with extension xlsx
                kendo.saveAs({
                    dataURI: workbook.toDataURL(),
                    fileName: "StudySponsorship.xlsx"
                });
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onStudySponsorshipPdfWindow: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to PDF?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                if (viewModel.meta_paging !== null) {
                    viewModel.meta_paging.removeClass('disablepaging');
                }
                $('#study-sponsorship-grid').data('kendoGrid').saveAsPDF();
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onStudySponsorshipPdfExport: function (e) {
            e.preventDefault();
            var userentity = $("#study-sponsorship-grid").data("kendoGrid");
            var ds = userentity.dataSource.data();

            //get visible columns
            var columns = [];
            var susarObj = {};
            var objArray = [];
            var colWidth = {};


            for (var i = 1; i < userentity.columns.length; i++) {
                if (!userentity.columns[i].hidden && userentity.columns[i].field !== 'attachmentBlindedCIOMSUrl' && userentity.columns[i].field !== 'attachmentOpenCIOMSUrl') {
                    columns.push({ title: userentity.columns[i].title.toUpperCase(), dataKey: userentity.columns[i].field });
                    susarObj[userentity.columns[i].field] = '';

                    //set width
                    var divisor = 1;
                    var unitIndex = (userentity.columns[i].width).indexOf('px');
                    var width = (unitIndex > -1) ? (userentity.columns[i].width).substring(0, unitIndex) : 100;
                    var pdfWidth = (width / divisor) ? width / divisor : divisor
                    colWidth[userentity.columns[i].field] = { columnWidth: pdfWidth };
                }
            }

            for (var i = 0; i < ds.length; i++) {
                var o = JSON.parse(JSON.stringify(susarObj));
                for (var j = 0; j < columns.length; j++) {
                    if (columns[j].dataKey === 'retired') {
                        o[columns[j].dataKey] = ds[i][columns[j].dataKey] ? 'Yes' : 'No';
                    } else {
                        o[columns[j].dataKey] = ds[i][columns[j].dataKey] ? ds[i][columns[j].dataKey] : '';
                    }
                }
                objArray.push(o);
            }

            var doc = new jsPDF('l', 'mm', [300, 300]); //page size
            var totalPagesExp = "{total_pages_count_string}";
            doc.autoTable(columns, objArray, {
                addPageContent: function (data) {
                    doc.text('Study Sponsorship', data.settings.margin.left, 10);
                    doc.setFontSize(10);
                    var str = "Page " + data.pageCount;
                    doc.text(str + " of " + totalPagesExp, 350, 10);
                },
                columnStyles: colWidth,
                margin: {
                    top: 17, bottom: 20,
                },
                options: {
                    startY: false, // false (indicates margin top value) or a number
                },

                styles: {
                    overflow: 'linebreak',
                    fontSize: 7,
                    lineWidth: 0.3,
                },
            });

            if (typeof doc.putTotalPages === 'function') {
                doc.putTotalPages(totalPagesExp);
            }
            doc.save("StudySponsorship.pdf");
        },

        onAccessLogExportExcelBtn: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();

                var grid = $("#userRightsAccessGrid").data("kendoGrid");
                var data = grid.dataSource.data();
                //get visible columns
                var cols = [];
                for (var i = 0; i < grid.columns.length; i++) {
                    if (!grid.columns[i].hidden) {
                        cols.push($.extend({ value: grid.columns[i].title.toUpperCase(), dataKey: grid.columns[i].field }, COMM.excelHeaderStyle));
                    }
                }

                var rows = [];
                rows.push({ cells: [{ value: COMM.PROPERTY.TIMEZONEMESSAGE, colSpan: cols.length, bold: true, textAlign: "left" }, ], type: 'data', index: 0 }); //add main header
                rows.push({ cells: cols, index: 1 });

                //change format of date values, set null values to empty string
                for (var i = 0; i < data.length; i++) {
                    var colsData = [];
                    for (var j = 0; j < cols.length; j++) {
                        if (cols[j].dataKey === 'created') {
                            colsData.push({ value: data[i][cols[j].dataKey] ? data[i][cols[j].dataKey] : '', format: viewModel.dateTimeColumnFormat });
                        } else {
                            colsData.push({ value: data[i][cols[j].dataKey] ? data[i][cols[j].dataKey] : '' });
                        }
                    }
                    rows.push({
                        cells: colsData
                    })
                }

                var colsWidth = [];
                for (var i = 0; i < cols.length; i++) {
                    if (cols[i].dataKey === 'created') {
                        colsWidth.push({ width: viewModel.dateColumnWidth });
                    } else {
                        colsWidth.push({ autoWidth: true });
                    }
                }

                var workbook = new kendo.ooxml.Workbook({
                    creator: COMM.PROPERTY.EXCELAUTHOR,
                    sheets: [
                        {
                            frozenRows: 2,
                            columns: colsWidth,
                            filter: { from: 0, to: cols.length - 1 }, // 0 based index
                            rows: rows, //Rows of the sheet
                            title: 'Access Log', //Title of the sheet
                        }
                    ]
                });

                var grid = null;
                var title = '';
                //by product
                if ($('div[name="editProductForm"]:not(:hidden)').length > 0) {
                    grid = $("#productgrid").data("kendoGrid");
                    var dataItem = grid.dataSource.getByUid($('div[name="editProductForm"]:not(:hidden)').attr('data-uid'));
                    title = dataItem.dilProduct;
                } else {
                    title = $('.pt-pickSPUser .pt-person-name').html();
                }
                //save the file as Excel file with extension xlsx
                kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: title + " Access Log.xlsx" });
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        generateNotificationExcel: function (id, fileName, title) {

            var grid = $('#' + id).data('kendoGrid');
            var data = grid.dataSource.data();
            var columns = [
                { field: 'notificationType', title: 'Notification Type', width: 150 },
                { field: 'initiatorName', title: 'Initiator', width: 150 },
                { field: (id === 'userNoficationHistoryGrid' ? 'recipients' : 'recipientsString'), title: 'Recipients', width: 150 },
                { field: 'sentDate', title: 'Sent Date', width: 150, format: viewModel.dateTimeColumnFormat },
            ]

            var cols = [];
            for (var i = 0; i < columns.length; i++) {
                cols.push($.extend({ value: columns[i].title }, COMM.excelHeaderStyle));
            }

            var rows = [];
            rows.push({ cells: [{ value: COMM.PROPERTY.TIMEZONEMESSAGE, colSpan: cols.length, bold: true, textAlign: "left" }, ], type: 'data', index: 0 }); //add main header
            rows.push({ cells: cols, index: 1 });

            for (var i = 0; i < data.length; i++) {
                //push single row for every record
                var colsData = [];
                for (var j = 0; j < columns.length; j++) {
                    if (columns[j].field === 'sentDate') {
                        colsData.push({ value: data[i][columns[j].field] ? data[i][columns[j].field] : '', format: columns[j].format });
                    } else {
                        colsData.push({ value: data[i][columns[j].field], wrap: true });
                    }
                }

                rows.push({
                    cells: colsData,
                    type: 'data',
                })
            }

            var colsWidth = [];
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].field === 'sentDate') {
                    colsWidth.push({ width: viewModel.dateColumnWidth });
                } else {
                    colsWidth.push({ autoWidth: true });
                }
            }

            var workbook = new kendo.ooxml.Workbook({
                creator: COMM.PROPERTY.EXCELAUTHOR,
                sheets: [
                    {
                        frozenRows: 2,
                        columns: colsWidth,
                        filter: { from: 0, to: cols.length - 1 }, // 0 based index
                        rows: rows, //Rows of the sheet
                        title: fileName, //Title of the sheet
                    }
                ]
            });

            //save the file as Excel file with extension xlsx
            kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: (title ? (title + ' - ') : '') + fileName + '.xlsx' });
        },

        onuserNoficationHistoryGridExcelBtn: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                viewModel.generateNotificationExcel('userNoficationHistoryGrid', 'User Notification History', viewModel.auditUserName);
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onproductNoficationHistoryGridExcelBtn: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                viewModel.generateNotificationExcel('productNoficationHistoryGrid', 'Product Notification History', viewModel.auditProductName);
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        generateAuditTrailExcel: function (id, fileName) {
            var grid = $('#' + id).data('kendoGrid');
            var data = grid.dataSource.data();

            var columns = [];
            for (var i = 0; i < grid.columns.length; i++) { //get visible columns
                if (!grid.columns[i].hidden) {
                    columns.push({ field: grid.columns[i].field, title: grid.columns[i].title, });
                }
            }

            var cols = [];
            for (var i = 0; i < columns.length; i++) {
                cols.push($.extend({ value: columns[i].title }, COMM.excelHeaderStyle));
            }

            var rows = [];
            rows.push({ cells: [{ value: COMM.PROPERTY.TIMEZONEMESSAGE, colSpan: cols.length, bold: true, textAlign: "left" }, ], type: 'data', index: 0 }); //add main header
            rows.push({ cells: cols, index: 1 });

            for (var i = 0; i < data.length; i++) {
                //push single row for every record
                var colsData = [];
                for (var j = 0; j < columns.length; j++) {
                    if (columns[j].field === 'Modified' || columns[j].field === 'Created') {
                        colsData.push({ value: data[i][columns[j].field] ? data[i][columns[j].field] : '', format: viewModel.dateTimeColumnFormat });
                    } else if (columns[j].field === 'CountryName') {
                        var newField = columns[j].field.substring(0, columns[j].field.length - 4) + 'String';
                        colsData.push({ value: data[i][newField] ? data[i][newField] : '', });
                    } else {
                        colsData.push({ value: data[i][columns[j].field], wrap: true });
                    }
                }

                rows.push({
                    cells: colsData,
                    type: 'data',
                })
            }

            var colsWidth = [];
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].field === 'Modified' || columns[i].field === 'Created') {
                    colsWidth.push({ width: viewModel.dateColumnWidth });
                } else {
                    colsWidth.push({ autoWidth: true });
                }
            }

            var workbook = new kendo.ooxml.Workbook({
                creator: COMM.PROPERTY.EXCELAUTHOR,
                sheets: [
                    {
                        frozenRows: 2,
                        columns: colsWidth,
                        filter: { from: 0, to: cols.length - 1 }, // 0 based index
                        rows: rows, //Rows of the sheet
                        title: 'Audit Log', //Title of the sheet
                    }
                ]
            });

            //save the file as Excel file with extension xlsx
            kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: fileName + " Audit Log.xlsx" });
        },

        onauditTrailUserGridExcelBtn: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                viewModel.generateAuditTrailExcel('auditTrailUserGrid', e.data.auditUserName);
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onauditTrailStudyGridExcelBtn: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                viewModel.generateAuditTrailExcel('auditTrailStudyGrid', e.data.auditStudyName);
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

        onauditTrailProductGridExcelBtn: function (e) {
            e.preventDefault();

            //Confirmation window
            viewModel.yesNoWindow.content(viewModel.exportWindowTemplate({ msg: 'Do you want to export to Excel?', disclaimer: COMM.getExportMessage() })); //send the row data object to the template and render it
            viewModel.yesNoWindow.center().open();
            $("#yesWindow").click(function () {
                viewModel.yesNoWindow.close();
                viewModel.generateAuditTrailExcel('auditTrailProductGrid', e.data.auditProductName);
            });
            $("#noWindow").click(function () {
                viewModel.yesNoWindow.close();
            });
        },

	    /************ End of EXPORT methods ************/

        closeAuditTrailAdmin: function (e) {
            e.preventDefault();
            viewModel.set('auditTrailUser', []);
            viewModel.set('auditTrailProduct', []);
            viewModel.set('auditTrailStudy', []);
            viewModel.set('userNotificationHistory', []);
            viewModel.set('productNotificationHistory', []);
            viewModel.set('auditUserName', '');
            viewModel.set('auditProductName', '');
            viewModel.set('userExportBtnDisabled', true);
            $("#viewAuditTrailProduct").data("kendoWindow").close();
            $("#viewAuditTrailStudy").data("kendoWindow").close();
            $("#viewAuditTrailUser").data("kendoWindow").close();
            $("#viewUserHistoryNotif").data("kendoWindow").close();
            $("#viewProductHistoryNotif").data("kendoWindow").close();
        },

        /************ FILTER methods ************/
	    //user tab
        userInitFilter: function (e) {
            var dataSource = e.sender.dataSource;
            var container = e.container;
            var grid = e.sender;

            switch (e.field) {
                case 'userName':
                case 'userProfile':
                case 'userEntity':
                case 'userStatus':
                    //reset form data because grid can be changed
                    e.sender.thead.find("[data-field='" + e.field + "'] .k-grid-filter").click(function (a) {
                        setSingleValueForm();
                    });

                    function setSingleValueForm() {
                        //single value
                        var field = e.field;
                        var arrayChoice = [];
                        var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                        for (var i = 0; i < data.length; i++) {
                            if (arrayChoice.indexOf(data[i].toUpperCase()) === -1) {
                                arrayChoice.push(data[i].toUpperCase());
                            }
                        }
                        COMM.filterSingleValue(grid, arrayChoice, container, dataSource, field);
                    }

                    setSingleValueForm();
                    break;
                case 'countryString':
                    //reset form data because grid can be changed
                    e.sender.thead.find("[data-field='" + e.field + "'] .k-grid-filter").click(function (a) {
                        setMultiValueForm();
                    });

                    function setMultiValueForm() {
                        //multi value
                        var field = e.field.substring(0, e.field.length - 6) + 'Name';
                        var arrayChoice = [];
                        var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < data[i].length; j++) {
                                if (arrayChoice.indexOf(data[i][j].toUpperCase()) === -1) {
                                    arrayChoice.push(data[i][j].toUpperCase());
                                }
                            }
                        }
                        COMM.filterMultiValue(grid, arrayChoice, container, dataSource, e.field);
                    }

                    setMultiValueForm();
                    break;
            }
        },

		//for aware studies filter
        //awareStudyInitFilter: function (e) {
        //	var dataSource = e.sender.dataSource;
        //	var container = e.container;
        //	var grid = e.sender;

        //	switch (e.field) {
        //		case 'drugName':
        //			//reset form data because grid can be changed
        //			e.sender.thead.find("[data-field='" + e.field + "'] .k-grid-filter").click(function (a) {
        //				setSingleValueForm();
        //			});

        //			function setSingleValueForm() {
        //				//single value
        //				var field = e.field;
        //				var arrayChoice = [];
        //				var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : ''; });
        //				for (var i = 0; i < data.length; i++) {
        //					if (arrayChoice.indexOf(data[i].toUpperCase()) === -1) {
        //						arrayChoice.push(data[i].toUpperCase());
        //					}
        //				}
        //				COMM.filterSingleValue(grid, arrayChoice, container, dataSource, field);
        //			}

        //			setSingleValueForm();
        //			break;
        //	}
        //},

        //study tab
        studyInitFilter: function (e) {
            var dataSource = e.sender.dataSource;
            var container = e.container;
            var grid = e.sender;

            switch (e.field) {
                case 'studyId':
                case 'primaryInvProdDILProduct':
                case 'studySponsorship':
                case 'studyBlindedStatus':
                    //reset form data because grid can be changed
                    e.sender.thead.find("[data-field='" + e.field + "'] .k-grid-filter").click(function (a) {
                        setSingleValueForm();
                    });

                    function setSingleValueForm() {
                        //single value
                        var field = e.field;
                        var arrayChoice = [];
                        var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                        for (var i = 0; i < data.length; i++) {
                            if (arrayChoice.indexOf(data[i].toUpperCase()) === -1) {
                                arrayChoice.push(data[i].toUpperCase());
                            }
                        }

                    	//nullable values
                        switch (e.field) {
                        	case 'primaryInvProdDILProduct':
                        		arrayChoice.push('');
                        		break;
                        }
                        COMM.filterSingleValue(grid, arrayChoice, container, dataSource, field);
                    }

                    setSingleValueForm();
                    break;
                case 'investigationalDILProductString':
                    //reset form data because grid can be changed
                    e.sender.thead.find("[data-field='" + e.field + "'] .k-grid-filter").click(function (a) {
                        setMultiValueForm();
                    });

                    function setMultiValueForm() {
                        //multi value
                        var field = e.field.substring(0, e.field.length - 6);
                        var arrayChoice = [];
                        var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < data[i].length; j++) {
                                if (arrayChoice.indexOf(data[i][j].toUpperCase()) === -1) {
                                    arrayChoice.push(data[i][j].toUpperCase());
                                }
                            }
                        }

                    	//nullable values
                        switch (e.field) {
                        	case 'investigationalDILProductString':
                        		arrayChoice.push('');
                        		break;
                        }
                        COMM.filterMultiValue(grid, arrayChoice, container, dataSource, e.field);
                    }

                    setMultiValueForm();
                    break;
            }
        },

        //product tab
        productInitFilter: function (e) {
            var dataSource = e.sender.dataSource;
            var container = e.container;
            var grid = e.sender;

            switch (e.field) {
                case 'dilProduct':
                case 'code':
                case 'nickname':
                case 'inn':
                case 'entity':
                    //reset form data because grid can be changed
                    e.sender.thead.find("[data-field='" + e.field + "'] .k-grid-filter").click(function (a) {
                        setSingleValueForm();
                    });

                    function setSingleValueForm() {
                        //single value
                        var field = e.field;
                        var arrayChoice = [];
                        var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                        for (var i = 0; i < data.length; i++) {
                            if (arrayChoice.indexOf(data[i].toUpperCase()) === -1) {
                                arrayChoice.push(data[i].toUpperCase());
                            }
                        }

                        //nullable values
                        switch (e.field) {
                            case 'code':
                            case 'nickname':
                                arrayChoice.push('');
                                break;
                        }
                        COMM.filterSingleValue(grid, arrayChoice, container, dataSource, field);
                    }

                    setSingleValueForm();
                    break;
            }
        },

	    //metadata tab
        studyAwareINNInitFilter: function (e) {
        	var dataSource = e.sender.dataSource;
        	var container = e.container;
        	var grid = e.sender;

        	switch (e.field) {
        		case 'studyInn':
        	    case 'drugName':
        	        //reset form data because grid can be changed
        	        e.sender.thead.find("[data-field='" + e.field + "'] .k-grid-filter").click(function (a) {
        	            setSingleValueForm();
        	        });

        	        function setSingleValueForm() {
        	            //single value
        	            var field = e.field;
        	            var arrayChoice = [];
        	            var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
        	            for (var i = 0; i < data.length; i++) {
        	                if (arrayChoice.indexOf(data[i].toUpperCase()) === -1) {
        	                    arrayChoice.push(data[i].toUpperCase());
        	                }
        	            }

        	            COMM.filterSingleValue(grid, arrayChoice, container, dataSource, field);
        	        }

        	        setSingleValueForm();
        	        break;
        	}
        },

        awareINNInitFilter: function (e) {
        	var dataSource = e.sender.dataSource;
        	var container = e.container;
        	var grid = e.sender;

        	switch (e.field) {
        	    case 'awareInn':
        	        //reset form data because grid can be changed
        	        e.sender.thead.find("[data-field='" + e.field + "'] .k-grid-filter").click(function (a) {
        	            setSingleValueForm();
        	        });

        	        function setSingleValueForm() {
        	            //single value
        	            var field = e.field;
        	            var arrayChoice = [];
        	            var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
        	            for (var i = 0; i < data.length; i++) {
        	                if (arrayChoice.indexOf(data[i].toUpperCase()) === -1) {
        	                    arrayChoice.push(data[i].toUpperCase());
        	                }
        	            }

        	            COMM.filterSingleValue(grid, arrayChoice, container, dataSource, field);
        	        }

        	        setSingleValueForm();
        			break;
        	}
        },

        userAuditTrailInitFilter: function(e){
            var dataSource = e.sender.dataSource;
            var container = e.container;
            var grid = e.sender;

            switch (e.field) {
                case 'UserProfile':
                case 'UserEntity':
                case 'UserStatus':
                case 'Version':
                case 'ModifiedBy' :
                    //single value
                    var field = e.field;
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        if (arrayChoice.indexOf(data[i].toUpperCase()) === -1) {
                            arrayChoice.push(data[i].toUpperCase());
                        }
                    }
                    COMM.filterSingleValue(grid, arrayChoice, container, dataSource, field);
                    break;                
                case 'CountryString':
                    //multi value
                    var field = e.field.substring(0, e.field.length - 6) + 'Name';
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data[i].length; j++) {
                            if (arrayChoice.indexOf(data[i][j].toUpperCase()) === -1) {
                                arrayChoice.push(data[i][j].toUpperCase());
                            }
                        }
                    }
                    COMM.filterMultiValue(grid, arrayChoice, container, dataSource, e.field);
                    break;
                case 'Modified':
                    //date value
                    var field = e.field;
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        if (arrayChoice.indexOf(data[i]) === -1) {
                            arrayChoice.push(data[i]);
                        }
                    }
                    COMM.filterDateValue(grid, container, dataSource, field);
                    break;
            }
        },

        userAccessLogInitFilter: function(e){
            var dataSource = e.sender.dataSource;
            var container = e.container;
            var grid = e.sender;

            switch (e.field) {
                case 'userName':
                case 'dilProductName':
                case 'action':
                    //single value
                    var field = e.field;
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        if (arrayChoice.indexOf(data[i].toUpperCase()) === -1) {
                            arrayChoice.push(data[i].toUpperCase());
                        }
                    }
                    COMM.filterSingleValue(grid, arrayChoice, container, dataSource, field);
                    break;
                case 'access':
                    //single value
                    var field = e.field;
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? (item[field] === COMM.PROPERTY.OPEN ? COMM.PROPERTY.UNBLINDED : (item[field] === 'AllOpen' ? 'AllUnblinded' : item[field])) : null; });
                    for (var i = 0; i < data.length; i++) {
                        if (arrayChoice.indexOf(data[i].toUpperCase()) === -1) {
                            arrayChoice.push(data[i].toUpperCase());
                        }
                    }
                    COMM.filterSingleValue(grid, arrayChoice, container, dataSource, field);
                    break;
                case 'created':
                    //date value
                    var field = e.field;
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        if (arrayChoice.indexOf(data[i]) === -1) {
                            arrayChoice.push(data[i]);
                        }
                    }
                    COMM.filterDateValue(grid, container, dataSource, field);
                    break;
            }
        },

        studyAuditTrailInitFilter: function(e){
            var dataSource = e.sender.dataSource;
            var container = e.container;
            var grid = e.sender;

            switch (e.field) {
                case 'Version':
                case 'StudySponsorship':
                case 'PrimaryInvProdDILProduct':
                case 'StudyBlindedStatus':
                case 'Retired':
                case 'ModifiedBy':
                    //single value
                    var field = e.field;
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        if (arrayChoice.indexOf(data[i].toUpperCase()) === -1) {
                            arrayChoice.push(data[i].toUpperCase());
                        }
                    }
                    COMM.filterSingleValue(grid, arrayChoice, container, dataSource, field);
                    break;
                case 'InvestigationalDILProductsString':
                    //multi value
                    var field = e.field.substring(0, e.field.length - 6) + 'Name';
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data[i].length; j++) {
                            if (arrayChoice.indexOf(data[i][j].toUpperCase()) === -1) {
                                arrayChoice.push(data[i][j].toUpperCase());
                            }
                        }
                    }
                    COMM.filterMultiValue(grid, arrayChoice, container, dataSource, e.field);
                    break;
                case 'Modified':
                    //date value
                    var field = e.field;
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        if (arrayChoice.indexOf(data[i]) === -1) {
                            arrayChoice.push(data[i]);
                        }
                    }
                    COMM.filterDateValue(grid, container, dataSource, field);
                    break;
            }
        },

        productAuditTrailInitFilter: function(e){
            var dataSource = e.sender.dataSource;
            var container = e.container;
            var grid = e.sender;

            switch (e.field) {
                case 'Version':
                case 'ProductCode':
                case 'AWAREINN':
                case 'ProductEntity':
                case 'Retired':
                case 'ModifiedBy':
                case 'Status':
                case 'DILProduct':
                    //single value
                    var field = e.field;
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        if (arrayChoice.indexOf(data[i].toUpperCase()) === -1) {
                            arrayChoice.push(data[i].toUpperCase());
                        }
                    }
                    COMM.filterSingleValue(grid, arrayChoice, container, dataSource, field);
                    break;               
                case 'Modified':
                    //date value
                    var field = e.field;
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        if (arrayChoice.indexOf(data[i]) === -1) {
                            arrayChoice.push(data[i]);
                        }
                    }
                    COMM.filterDateValue(grid, container, dataSource, field);
                    break;
            }
        },

        userNotifHistInitFilter: function (e) {
            var dataSource = e.sender.dataSource;
            var container = e.container;
            var grid = e.sender;
            switch (e.field) {
                case 'notificationType':
                case 'initiatorName':
                case 'recipients':
                    //single value
                    var field = e.field;
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        if (arrayChoice.indexOf(data[i].toUpperCase()) === -1) {
                            arrayChoice.push(data[i].toUpperCase());
                        }
                    }
                    COMM.filterSingleValue(grid, arrayChoice, container, dataSource, field);
                    break;               
                case 'sentDate':
                    //date value
                    var field = e.field;
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        if (arrayChoice.indexOf(data[i]) === -1) {
                            arrayChoice.push(data[i]);
                        }
                    }
                    COMM.filterDateValue(grid, container, dataSource, field);
                    break;
            }
        },

        productNotifHistInitFilter: function(e){
            var dataSource = e.sender.dataSource;
            var container = e.container;
            var grid = e.sender;
            switch (e.field) {
                case 'notificationType':
                case 'initiatorName':                
                    //single value
                    var field = e.field;
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        if (arrayChoice.indexOf(data[i].toUpperCase()) === -1) {
                            arrayChoice.push(data[i].toUpperCase());
                        }
                    }
                    COMM.filterSingleValue(grid, arrayChoice, container, dataSource, field);
                    break;
                case 'recipientsString':
                    //multi value
                    var field = e.field.substring(0, e.field.length - 6) + 'Name';
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data[i].length; j++) {
                            if (arrayChoice.indexOf(data[i][j].toUpperCase()) === -1) {
                                arrayChoice.push(data[i][j].toUpperCase());
                            }
                        }
                    }
                    COMM.filterMultiValue(grid, arrayChoice, container, dataSource, e.field);
                    break;
                case 'sentDate':
                    //date value
                    var field = e.field;
                    var arrayChoice = [];
                    var data = $.map(e.sender.dataSource.data(), function (item) { return item[field] ? item[field] : null; });
                    for (var i = 0; i < data.length; i++) {
                        if (arrayChoice.indexOf(data[i]) === -1) {
                            arrayChoice.push(data[i]);
                        }
                    }
                    COMM.filterDateValue(grid, container, dataSource, field);
                    break;
            }
        },
	    /************ End of FILTER methods ************/

		/************ SEARCH methods ************/

        onSearchStudyUsers: function (e, value) {
        	if (!value || value == '') {
        		$('#availableusers_listview').data('kendoListView').dataSource.filter([]);
        	} else {
        		$('#availableusers_listview').data('kendoListView').dataSource.filter([]);
        		$('#availableusers_listview').data('kendoListView').dataSource.filter({
        			logic: "or",
        			filters: [
                        { field: "userName", operator: "contains", value: value },
        			]
        		});
        	}
        },

        onSearchStudyLinkedUsers: function (e, value) {
        	if (!value || value == '') {
        		$('#selectedusers_listview').data('kendoListView').dataSource.filter([]);
        	} else {
        		$('#selectedusers_listview').data('kendoListView').dataSource.filter([]);
        		$('#selectedusers_listview').data('kendoListView').dataSource.filter({
        			logic: "or",
        			filters: [
                        { field: "userName", operator: "contains", value: value },
        			]
        		});
        	}
        },

        onSearchProductUsers: function (e, value) {
        	if (!value || value == '') {
        		$('#availableUsers').data('kendoListView').dataSource.filter([]);
        	} else {
        		$('#availableUsers').data('kendoListView').dataSource.filter([]);
        		$('#availableUsers').data('kendoListView').dataSource.filter({
        			logic: "or",
        			filters: [
                        { field: "userName", operator: "contains", value: value },
        			]
        		});
        	}
        },

        onSearchProductLinkedUsers: function (e, value) {
        	if (!value || value == '') {
        		$('#LinkedUsers').data('kendoListView').dataSource.filter([]);
        	} else {
        		$('#LinkedUsers').data('kendoListView').dataSource.filter([]);
        		$('#LinkedUsers').data('kendoListView').dataSource.filter({
        			logic: "or",
        			filters: [
                        { field: "userName", operator: "contains", value: value },
        			]
        		});
        	}
        },

        onSearchUserProducts: function (e) {
        	if (!viewModel.userProductInput || viewModel.userProductInput == '') {
        		$('#available_listview').data('kendoListView').dataSource.filter([]);
        	} else {
        		$('#available_listview').data('kendoListView').dataSource.filter([]);
        		$('#available_listview').data('kendoListView').dataSource.filter({
        			logic: "or",
        			filters: [
                        { field: "dilProductName", operator: "contains", value: viewModel.userProductInput },
        			]
        		});
        	}
        },

        onSearchUserLinkedProducts: function (e) {
        	if (!viewModel.userLinkedProductInput || viewModel.userLinkedProductInput == '') {
        		$('#selected_listview').data('kendoListView').dataSource.filter([]);
        	} else {
        		$('#selected_listview').data('kendoListView').dataSource.filter([]);
        		$('#selected_listview').data('kendoListView').dataSource.filter({
        			logic: "or",
        			filters: [
                        { field: "dilProductName", operator: "contains", value: viewModel.userLinkedProductInput },
        			]
        		});
        	}
        },

        onSearchUsers: function (e) {
        	if (!viewModel.searchUserInput || viewModel.searchUserInput == '') {
        		$('#productUsersListview').data('kendoListView').dataSource.filter([]);
        	} else {
        		$('#productUsersListview').data('kendoListView').dataSource.filter([]);
        		$('#productUsersListview').data('kendoListView').dataSource.filter({
        			logic: "or",
        			filters: [
                        { field: "userName", operator: "contains", value: viewModel.searchUserInput },
        			]
        		});
        	}
        },

        onSearchLinkedUsers: function (e) {
        	if (!viewModel.searchLinkedUserInput || viewModel.searchLinkedUserInput == '') {
        		$('#productLinkedUsersListview').data('kendoListView').dataSource.filter([]);
        	} else {
        		$('#productLinkedUsersListview').data('kendoListView').dataSource.filter([]);
        		$('#productLinkedUsersListview').data('kendoListView').dataSource.filter({
        			logic: "or",
        			filters: [
                        { field: "userName", operator: "contains", value: viewModel.searchLinkedUserInput },
        			]
        		});
        	}
        },

        onSearchUserGrid: function (e) {
            if (!viewModel.userInput || viewModel.userInput == '') {
                $('#usergrid').data('kendoGrid').dataSource.filter([]);
            } else {
                var id = 'usergrid';
                $('input.' + id + '-filter-checkbox:checkbox').prop('checked', '');
                $('input.' + id + '-filter-date-picker').val('');
                $('#usergrid').data('kendoGrid').dataSource.filter([]);
                $('#usergrid').data('kendoGrid').dataSource.filter({
                    logic: "or",
                    filters: [
                        { field: "userName", operator: "contains", value: this.userInput },
                        { field: "userProfile", operator: "contains", value: this.userInput },
                        { field: "userEntity", operator: "contains", value: this.userInput },
                        { field: "countryString", operator: "contains", value: this.userInput },
                        { field: "userStatus", operator: "contains", value: this.userInput },
                    ]
                });
            }
        },

        onSearchStudyGrid: function (e) {
            if (!viewModel.studyInput || viewModel.studyInput == '') {
                $('#studygrid').data('kendoGrid').dataSource.filter([]);
            } else {
                var id = 'studygrid';
                $('input.' + id + '-filter-checkbox:checkbox').prop('checked', '');
                $('input.' + id + '-filter-date-picker').val('');
                $('#studygrid').data('kendoGrid').dataSource.filter([]);
                $('#studygrid').data('kendoGrid').dataSource.filter({
                    logic: "or",
                    filters: [
                        { field: "studyId", operator: "contains", value: this.studyInput },
                        { field: "primaryInvProdDILProduct", operator: "contains", value: this.studyInput },
                        { field: "studySponsorship", operator: "contains", value: this.studyInput },
                        { field: "studyBlindedStatus", operator: "contains", value: this.studyInput },
                        { field: "investigationalDILProductString", operator: "contains", value: this.studyInput },
                    ]
                });
            }
        },

        onSearchDilsProductGrid: function (e) {
            if (!viewModel.dilsProductInput || viewModel.dilsProductInput == '') {
                $('#productgrid').data('kendoGrid').dataSource.filter([]);
            } else {
                var id = 'productgrid';
                $('input.' + id + '-filter-checkbox:checkbox').prop('checked', '');
                $('input.' + id + '-filter-date-picker').val('');
                $('#productgrid').data('kendoGrid').dataSource.filter([]);
                $('#productgrid').data('kendoGrid').dataSource.filter({
                    logic: "or",
                    filters: [
                        { field: "dilProduct", operator: "contains", value: this.dilsProductInput },
                        { field: "code", operator: "contains", value: this.dilsProductInput },
                        { field: "nickname", operator: "contains", value: this.dilsProductInput },
                        { field: "inn", operator: "contains", value: this.dilsProductInput },
                        { field: "entity", operator: "contains", value: this.dilsProductInput },
                    ]
                });
            }
        },

        onSearchStudyProtocolProductStatus: function (e) {
            if (!viewModel.studyProtocolProductStatusInput || viewModel.studyProtocolProductStatusInput == '') {
                $('#userEntityGrid').data('kendoGrid').dataSource.filter([]);
            } else {
                $('#userEntityGrid').data('kendoGrid').dataSource.filter([]);
                $('#userEntityGrid').data('kendoGrid').dataSource.filter({
                    logic: "or",
                    filters: [
                        { field: "SuspectProductstatusName", operator: "contains", value: this.studyProtocolProductStatusInput },
                    ]
                });
            }
        },

        onSearchProductEntity: function (e) {
            if (!viewModel.productEntityInput || viewModel.productEntityInput == '') {
                $('#product-entity-grid').data('kendoGrid').dataSource.filter([]);
            } else {
                $('#product-entity-grid').data('kendoGrid').dataSource.filter([]);
                $('#product-entity-grid').data('kendoGrid').dataSource.filter({
                    logic: "or",
                    filters: [
                        { field: "entity", operator: "contains", value: this.productEntityInput },
                    ]
                });
            }
        },

        onSearchStudySponsorship: function (e) {
            if (!viewModel.studySponsorshipInput || viewModel.studySponsorshipInput == '') {
                $('#study-sponsorship-grid').data('kendoGrid').dataSource.filter([]);
            } else {
                $('#study-sponsorship-grid').data('kendoGrid').dataSource.filter([]);
                $('#study-sponsorship-grid').data('kendoGrid').dataSource.filter({
                    logic: "or",
                    filters: [
                        { field: "studySponsorship", operator: "contains", value: this.studySponsorshipInput },
                    ]
                });
            }
        },

        onSearchUserEntity: function (e) {
            if (!viewModel.userEntityInput || viewModel.userEntityInput == '') {
                $('#user-entity-grid').data('kendoGrid').dataSource.filter([]);
            } else {
                $('#user-entity-grid').data('kendoGrid').dataSource.filter([]);
                $('#user-entity-grid').data('kendoGrid').dataSource.filter({
                    logic: "or",
                    filters: [
                        { field: "userEntity", operator: "contains", value: this.userEntityInput },
                    ]
                });
            }
        },

        onSearchStudiesINN: function (e) {
            if (!viewModel.studyINNInput || viewModel.studyINNInput == '') {
                $('#study-aware-inn').data('kendoGrid').dataSource.filter([]);
            } else {
                $('#study-aware-inn').data('kendoGrid').dataSource.filter([]);
                $('#study-aware-inn').data('kendoGrid').dataSource.filter({
                    logic: "or",
                    filters: [
                        { field: "studyInn", operator: "contains", value: this.studyINNInput },
                        { field: "drugName", operator: "contains", value: this.studyINNInput },
                    ]
                });
            }
        },

        onSearchAWAREINN: function (e) {
            if (!viewModel.awareINNInput || viewModel.awareINNInput == '') {
                $('#aware-inn-grid').data('kendoGrid').dataSource.filter([]);
            } else {
                $('#aware-inn-grid').data('kendoGrid').dataSource.filter([]);
                $('#aware-inn-grid').data('kendoGrid').dataSource.filter({
                    logic: "or",
                    filters: [
                        { field: "awareInn", operator: "contains", value: this.awareINNInput },
                        { field: "sourceInn", operator: "contains", value: this.awareINNInput },
                    ]
                });
            }
        },

        onSearchKeyUp: function (e) {
            if (e.keyCode === 13) {
            	e.preventDefault();
                $(e.currentTarget).siblings('button.search-button').trigger('click');
            }
        },
        /************ End of SEARCH methods ************/

        onTabSelect: function (e) {
            if (e.contentElement.id === "tabstrip-1") {
                document.cookie = "tabIndex=" + 0 + '; path=/';
                this.set('tab', 0);
            }
            if (e.contentElement.id === "tabstrip-2") {
                document.cookie = "tabIndex=" + 1 + '; path=/';
                this.set('tab', 1);
            }
            if (e.contentElement.id === "tabstrip-3") {
                document.cookie = "tabIndex=" + 2 + '; path=/';
                this.set('tab', 2);
            }
            if (e.contentElement.id === "tabstrip-4") {
                document.cookie = "tabIndex=" + 3 + '; path=/';
                this.set('tab', 3);
            }	
            if (e.contentElement.id === "tabstrip-5") {
            	document.cookie = "tabIndex=" + 4 + '; path=/';
            	this.set('tab', 4);
            }
        },
        
    });
    
    COMM.getUser({ accessCode: COMM.ACCESS.ADMINISTRATION }, function (r) {
        if (r.error) {
            if (r.notRegistered) {
                window.location.href = "unauthorized.aspx";
            } else {
                alert('An error has occurred.');
            }
        } else if (!r.hasAccess) {
            //alert('User Unauthorized');
            window.location.href = "unauthorized.aspx";
        } else {
            viewModel.user = r.userInfo.user;

            //User and role header
            $('#user-header').html(r.userInfo.user.name);
            $('#role-header').html(r.userInfo.role.name.length > 0 ? '(' + r.userInfo.role.name[0] + ')' : '');

            $("input[name='user_userName']").pickSPUser({
                allowMultiples: false
            });

            //disable default behavior of 'Enter' key
            $(window).keydown(function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    return false;
                }
            });

            //Initialize OK window
            viewModel.okWindowTemplate = kendo.template($("#okWindowTemplate").html());
            viewModel.okWindow = $("#okWindow").kendoWindow({
                title: "<span class='k-icon k-i-warning'></span> Error",
                visible: false, //the window will not appear before its .open method is called
                width: "360px",
                height: "auto",
                resizable: false,
                modal: true,
            }).data("kendoWindow");

            //Initialize YES/NO window
            viewModel.yesNoH4WindowTemplate = kendo.template($("#yesNoH4WindowTemplate").html());
            viewModel.exportWindowTemplate = kendo.template($("#exportWindowTemplate").html());
            viewModel.yesNoWindowTemplate = kendo.template($("#yesNoWindowTemplate").html());
            viewModel.yesNoWindow = $("#yesNoWindow").kendoWindow({
                    title: "GPE - DIL",
                    visible: false, //the window will not appear before its .open method is called
                    width: "360px",
                    height: "auto",
                    resizable: false,
                    modal: true,
                    actions: {},
                }).data("kendoWindow");

            viewModel.successWindowTemplate = kendo.template($("#successWindowTemplate").html());
            viewModel.successWindow = $("#successWindow").kendoWindow({
            	title: "GPE - DIL",
            	visible: false, //the window will not appear before its .open method is called
            	width: "360px",
            	height: "auto",
            	resizable: false,
            	modal: true,
            }).data("kendoWindow");

            //Initialize Waiting window
            viewModel.waitingWindowTemplate = kendo.template($("#waitingWindowTemplate").html());
            viewModel.waitingWindow = $("#waitingWindow").kendoWindow({
                title: "<span class='k-icon k-i-info'></span>",
                visible: false, //the window will not appear before its .open method is called
                width: "360px",
                height: "auto",
                resizable: false,
                modal: true,
                actions: {},
            }).data("kendoWindow");

            kendo.bind($("#wrapper"), viewModel);
            kendo.bind($("#usergrid").find(".k-grid-toolbar"), viewModel);
            kendo.bind($("#productgrid").find(".k-grid-toolbar"), viewModel);
            kendo.bind($("#createProductgrid").find(".k-grid-toolbar"), viewModel);
            kendo.bind($("#createstudygrid").find(".k-grid-toolbar"), viewModel);
            kendo.bind($("#userProductCreate").find(".k-grid-toolbar"), viewModel);
            kendo.bind($("#studygrid").find(".k-grid-toolbar"), viewModel);
            kendo.bind($("#userEntityGrid").find(".k-grid-toolbar"), viewModel);
            kendo.bind($("#productSelectBlinded"), viewModel);
            kendo.bind($("#product-entity-grid").find(".k-grid-toolbar"), viewModel);
            kendo.bind($("#study-sponsorship-grid").find(".k-grid-toolbar"), viewModel);
            kendo.bind($("#user-entity-grid").find(".k-grid-toolbar"), viewModel);
            kendo.bind($("#study-aware-inn").find(".k-grid-toolbar"), viewModel);
            kendo.bind($("#aware-inn-grid").find(".k-grid-toolbar"), viewModel);

            //'X' button on the right side of the text box
            $('.clearable-input').each(function (i, el) {
                var input = el.querySelector('input');
                conditionallyHideClearIcon();
                input.addEventListener('input', conditionallyHideClearIcon);
                el.querySelector('[data-clear-input]').addEventListener('click', function (e) {
                    if ($(e.currentTarget).prev()[0].id === 'productCode') {
                        viewModel.set('product_code', '');
                        viewModel.product_onProductTextChange(e);
                    } else if ($(e.currentTarget).prev()[0].id === 'studyautocomplete') {
                    	viewModel.set('study_id', '');
                    } else if ($(e.currentTarget).prev()[0].name === 'searchUserInput') {
                    	viewModel.set('searchUserInput', '');
                    	$('#productUsersListview').data('kendoListView').dataSource.filter([]);
                    } else if ($(e.currentTarget).prev()[0].name === 'searchLinkedUserInput') {
                    	viewModel.set('searchLinkedUserInput', '');
                    	$('#productLinkedUsersListview').data('kendoListView').dataSource.filter([]);
                    } else if ($(e.currentTarget).prev()[0].name === 'searchUserInputProducts') {
                    	viewModel.set('userProductInput', '');
                    	$('#available_listview').data('kendoListView').dataSource.filter([]);
                    } else if ($(e.currentTarget).prev()[0].name === 'searchUserLinkedProducts') {
                    	viewModel.set('userLinkedProductInput', '');
                    	$('#selected_listview').data('kendoListView').dataSource.filter([]);
                    } else if ($(e.currentTarget).prev()[0].id === 'productNickname') {
                        viewModel.set('product_nickname', '');
                        viewModel.product_onProductTextChange(e);
                    } else if ($(e.currentTarget).prev()[0].id === 'searchInputUser') {
                        viewModel.set('userInput', '');
                        conditionallyHideClearIcon(null, true);
                        return;
                    } else if ($(e.currentTarget).prev()[0].id === 'searchInputStudy') {
                        viewModel.set('studyInput', '');
                        conditionallyHideClearIcon(null, true);
                        return;
                    } else if ($(e.currentTarget).prev()[0].id === 'searchInputProduct') {
                        viewModel.set('dilsProductInput', '');
                        conditionallyHideClearIcon(null, true);
                        return;
                    } else if ($(e.currentTarget).prev()[0].id === 'searchInputUserEntity') {
                        viewModel.set('userEntityInput', '');
                        conditionallyHideClearIcon(null, true);
                        return;
                    } else if ($(e.currentTarget).prev()[0].id === 'searchInputProductEntity') {
                        viewModel.set('productEntityInput', '');
                        conditionallyHideClearIcon(null, true);
                        return;
                    } else if ($(e.currentTarget).prev()[0].id === 'searchInputAwareInn') {
                        viewModel.set('awareINNInput', '');
                        conditionallyHideClearIcon(null, true);
                        return;
                    } else if ($(e.currentTarget).prev()[0].id === 'searchInputStudyInn') {
                        viewModel.set('studyINNInput', '');
                        conditionallyHideClearIcon(null, true);
                        return;
                    } else if ($(e.currentTarget).prev()[0].id === 'searchInputSponsorship') {
                        viewModel.set('studySponsorshipInput', '');
                        conditionallyHideClearIcon(null, true);
                        return;
                    }
                    conditionallyHideClearIcon(null);
                });

                function conditionallyHideClearIcon(e, searchGrid) {
                    var target = (e && e.target) || input;
                    target.nextElementSibling.style.display = target.value ? 'block' : 'none';
                    if (searchGrid && $(target).siblings('button.search-button').length > 0) {
                        $(target).siblings('button.search-button').trigger('click');
                    }
                }
            });

            var userProductRemoveWin = $("#userProductRemove").kendoWindow({
                title: "Are you sure you want to delete this record?",
                visible: false, //the window will not appear before its .open method is called
                width: "400px",
                height: "200px",
            }).data("kendoWindow");

            var tbs = $("#tabstrip").data("kendoTabStrip");
            tbs.select(viewModel.tabIndex);

            //Unsaved changes checkpoint
            window.onbeforeunload = function (e) {
                $(':focus').blur();
                var dirty = false;
                if ($('#productgrid').data('kendoGrid').dataSource.hasChanges()) {
                    dirty = true;
                } else if ($('#createProduct:not(:hidden)').length > 0) { //create product is open
                    if ($('#productCode').val().length > 0 ||
                        $('#productNickname').val().length > 0 ||
                        $('#productFolder').val().length > 0 ||
                        $('#productDropDownINN').val().length > 0 ||
                        $('#productEntity').val().length > 0 ||
                        $('#productLinkedUsersListview').data('kendoListView').dataSource.data().length > 0
                        ) {
                        dirty = true;
                    }
                } else if ($('div[name="editProductForm"]:not(:hidden)').length > 0) { //edit window is open
                    dirty = ($('.product-linked-users-listview').data('kendoListView') && $('.product-linked-users-listview').data('kendoListView').dataSource.hasChanges());
                    if (!dirty) {
                        dirty = viewModel.product_dirty;
                    }
                }

                if ($('#studygrid').data('kendoGrid').dataSource.hasChanges()) {
                	dirty = true;
                } else if ($('#createStudy:not(:hidden)').length > 0) {
                	if ($('#studyautocomplete').val().length > 0 ||
						$('#studysponsorship').val().length > 0 ||
						$('#studyblindedstatus').val().length > 0 ||
						$('#createstudygrid').data('kendoGrid').dataSource.data().length > 0) {
						dirty = true;
                	}
                }

                if ($('#welcome-message-grid').data('kendoGrid').dataSource.hasChanges()) {
                	dirty = true;
                }

                if ($('#product-entity-grid').data('kendoGrid').dataSource.hasChanges()) {
                	dirty = true;
                } else if ($('#addProductEntityWindow:not(:hidden)').length > 0) {
                	if (viewModel.company_name.length > 0) {
                		dirty = true;
                	}
                }

                if ($('#study-sponsorship-grid').data('kendoGrid').dataSource.hasChanges()) {
                	dirty = true;
                } else if ($('#addStudySponsorshipWindow:not(:hidden)').length > 0) {
                	if (viewModel.sponsorship_company_name.length > 0) {
                		dirty = true;
                	}
                }

                if ($('#user-entity-grid').data('kendoGrid').dataSource.hasChanges()) {
                	dirty = true;
                } else if ($('#addUserEntityWindow:not(:hidden)').length > 0) {
                	if (viewModel.user_entity_company_name.length > 0) {
                		dirty = true;
                	}
                }

                if ($('#study-aware-inn').data('kendoGrid').dataSource.hasChanges()) {
                	dirty = true;
                } else if ($('#addAwareStudiesWindow:not(:hidden)').length > 0) {
                	if (viewModel.study_inn.length > 0 ||
						viewModel.drug_name.length > 0) {
                		dirty = true;
                	}
                }

                if ($('#aware-inn-grid').data('kendoGrid').dataSource.hasChanges()) {
                	dirty = true;
                } else if ($('#addAwareINNWindow:not(:hidden)').length > 0) {
                	if (viewModel.aware_inn.length > 0) {
                		dirty = true;
                	}
                }

                if (viewModel.dirtyPage === true) {
                	dirty = true;
                }

                if (dirty) {
                    return "Changes you made may not be saved.";
                }
            };

            $('body').addClass('loaded'); //remove loading gif
        }
    });

    $("#productentitygrid").on("click", ".k-grid-cancel-changes", function (e) {        
        if (viewModel.meta_paging !== null) {
            viewModel.meta_paging.removeClass('disablepaging');            
        }
        $('#productentitygrid').data('kendoGrid').dataSource.read();       
    });

    $("#studysponsorshipgrid").on("click", ".k-grid-cancel-changes", function (e) {
        if (viewModel.meta_paging !== null) {
            viewModel.meta_paging.removeClass('disablepaging');
        }        
        $('#studysponsorshipgrid').data('kendoGrid').dataSource.read();        
    });

    $("#userEntityGrid").on("click", ".k-grid-cancel-changes", function (e) {
        if (viewModel.meta_paging !== null) {
            viewModel.meta_paging.removeClass('disablepaging');
        }       
        $('#userEntityGrid').data('kendoGrid').dataSource.read();      
    });

    $("#studyAwareInnGrid").on("click", ".k-grid-cancel-changes", function (e) {
        if (viewModel.meta_paging !== null) {
            viewModel.meta_paging.removeClass('disablepaging');
        }      
        $('#studyAwareInnGrid').data('kendoGrid').dataSource.read();
    });

    $("#productgrid").on("click", ".k-grid-eMailProduct", function (e) {
        var grid = $("#productgrid").getKendoGrid();
        var item = grid.dataItem($(e.target).closest("tr"));
        globalViewModel.product_emailInfo = item;
        $("#emailProductEditor").data("kendoWindow").center().open();
    })
    //unlink products button tooltip
    $("#userProductCreate").kendoTooltip({
        filter: ".k-selectable a.k-grid-delete",        
        content: function (a) {
            var msg = "Unlink";
            $('.k-tooltip')
                .css('background-color', '')
                .css('background-color', '#000');
            return '<div id="tooltip" style="width: 11em; max-width: 204px; word-wrap: break-word;">' + msg + '</div>';
        },
    });

    user_removeProd = $("#removeUserProductWin").kendoWindow({
        title: "GPE - DIL",
        modal: true,
        visible: false,
        resizable: false,
        width: 360
    }).data("kendoWindow");
 });

var dataItem = null;

var user_removeProd;

function confirmPrimaryProduct(e) {
	e.preventDefault();
	dataItem = this.dataItem($(e.currentTarget).closest("tr"));
	$("#confirm-primary-product").data("kendoWindow").center().open();
}

function confirmEditPrimaryProduct(e) {
	e.preventDefault();
	dataItem = this.dataItem($(e.currentTarget).closest("tr"));
	$("#confirm-edit-primary-product").data("kendoWindow").center().open();
}

function getProductData() {
	return dataItem;
}

 $('#createUser').on('click', '.list-group .list-group-item', function() {
    $(this).toggleClass('active');
 });

 $('#createProduct').on('click', '.list-group .list-group-item', function () {
     $(this).toggleClass('active');
 });

 $(".k-grid-edit").click(function (e) {
 	console.log(e);
 });

 function user_removeProduct(e) {
     e.preventDefault();

     var grid = this;
     var row = $(e.currentTarget).closest("tr");
     user_removeProd.center().open();

     $("#Uyes").click(function () {
         grid.removeRow(row);
         user_removeProd.close();
     });

     $("#Uno").click(function () {
         user_removeProd.close();
     });
 }

 function UserTab(e) {
 	document.cookie = "tabIndex=" + e + '; path=/';
 }

 function StudiesTab(e) {
 	document.cookie = "tabIndex=" + e + '; path=/';
 }

 function ProductTab(e) {
 	document.cookie = "tabIndex=" + e + '; path=/';
 }

 function MetadataTab(e) {
 	document.cookie = "tabIndex=" + e + '; path=/';
 }