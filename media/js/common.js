var COMM = (function(comm){

    comm.getSubSiteUrl = getSubSiteUrl;
    comm.getFullSiteUrl = getFullSiteUrl;
    comm.tooltip = bindTooltip;
    comm.getCookie = getCookie;
    comm.getMonths = getMonths;
    comm.getMonthEquivalent = getMonthEquivalent;
    comm.getYearEquivalent = getYearEquivalent;
    comm.getMonthValue = getMonthValue;
    comm.getUser = getUser;
    comm.getUserProperties = getUserProperties;
    comm.getWelcomeMessage = getWelcomeMessage;
    comm.ACCESS = getAccessEnum();
    comm.PROPERTY = getProperty();
    comm.disableHeaderLinks = disableHeaderLinks;
    comm.getTabIndexCookie = getTabIndexCookie;
    comm.filterSingleValue = filterSingleValue;
    comm.filterNumberValue = filterNumberValue;
    comm.filterMultiValue = filterMultiValue;
    comm.filterDateValue = filterDateValue;
    comm.getUserProfileInfo = getUserProfileInfo;
    comm.ieVersion = getIEVersion();
    comm.parseUrlQueryString = parseUrlQueryString;
    comm.excelHeaderStyle = getExcelHeaderStyle();
    comm.getConfigList = getConfigList;
    comm.getExportMessage = getExportMessage;
    comm.getStaticGroups = getGroups();
    comm.getMigrationDay = getDay();
    comm.generateSpecialProductsQuery = generateSpecialProductsQuery;
    comm.dilTrackerAFieldNames = dilTrackerAFieldNames();
    comm.auditTrailSusarFieldNames = auditTrailSusarFieldNames();
    comm.auditTrailSusarOpenFieldNames = auditTrailSusarOpenFieldNames();
    comm.auditTrailProductsFieldNames = auditTrailProductsFieldNames();
    comm.auditTrailStudyFieldNames = auditTrailStudyFieldNames();
    comm.auditTrailUserFieldNames = auditTrailUserFieldNames();
    comm.SUSARWorkflowHistoryFields = SUSARWorkflowHistoryFields();
    comm.addToQueueList = addToQueueList;
    comm.user_addToUserProduct = user_addToUserProduct;
    comm.addMultiActionQueue = addMultiActionQueue;
    comm.getSiteLocation = getSiteLocation();
    comm.getMainPathWebUrl = getMainPathWebUrl();
    comm.getCoverLetterValue = getCoverLetterValue;

    return comm;

    var global = null;

    function getAccessEnum() {
        return {
            COMMON_PAGE: 0,
            ADMINISTRATION: 1,
            CUMULATIVE_LISTINGS: 2,
            DAILY_TRACKER: 3,
            DASHBOARD: 4,
            DILS_PRODUCT: 5,
            DILS_TRACKER: 6,
            PRODUCTS_PAGE: 7,
        };
    }

    function getContext() {
        return SP.ClientContext.get_current();
    }

    function getSubSiteUrl() {
        var ctx = getContext();
        try {
            return ((ctx.get_url() === '/') ? '' : ctx.get_url());
        } catch (e) { console.error(e); }
        return '';
    }

    function getFullSiteUrl() {
        return window.location.protocol + "//" + window.location.host + getSubSiteUrl();
    }

    function getSiteLocation() {
    	var location = getFullSiteUrl() + "/TrainingAndUseful/Forms/AllItems.aspx";
    	return location;
    }

    function getMainPathWebUrl() {
        var urlPath = window.location.pathname;
        var arr = urlPath.split("/");
        return "/" + arr[1] + "/" + arr[2];
       // return "/" + arr[1];
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function getGroups() {
    	var groups = [];
    	try {
    		groups = getStaticGroups();
    	} catch (e) {
    	} finally {
    		return groups;
    	}
    }

    function getDay() {
    	var day = [{ "migrationDay": "" }];
        try {
        	day = getMigrationDay();
            day[0].migrationDay = kendo.toString(kendo.parseDate(new Date(day[0].migrationDay)), 'u');
        } catch (e) {
        } finally {
        	return day;
        }
    }

    function generateSpecialProductsQuery(logic, comparator) {
        return '<' + logic + '>' +
                    '<' + logic + '>' +
                        '<' + logic + '>' +
                            '<' + logic + '>' +
                                '<' + comparator + '>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                                    '<Value Type="Text">' + 1 + '</Value>' +
                                '</' + comparator + '>' +
                                '<' + comparator + '>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                                    '<Value Type="Text">' + 2 + '</Value>' +
                                '</' + comparator + '>' +
                            '</' + logic + '>' +
                            '<' + comparator + '>' +
                                '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                                '<Value Type="Text">' + 3 + '</Value>' +
                            '</' + comparator + '>' +
                        '</' + logic + '>' +
                        '<' + comparator + '>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                            '<Value Type="Text">' + 4 + '</Value>' +
                        '</' + comparator + '>' +
                    '</' + logic + '>' +
                    '<' + comparator + '>' +
                        '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '<Value Type="Text">' + 5 + '</Value>' +
                    '</' + comparator + '>' +
                '</' + logic + '>';
    }

    function getTabIndexCookie(cname) {
    	var name = cname + "=";
    	var ca = document.cookie.split(';');
    	for (var i = 0; i < ca.length; i++) {
    		var c = ca[i];
    		while (c.charAt(0) == ' ') {
    			c = c.substring(1);
    		}
    		if (c.indexOf(name) == 0) {
    			return c.substring(name.length, c.length);
    		}
    	}
    	return "";
    }
    
    function getProperty() {
        return {
            ID: 'ID',
            CREATED: 'Created',
            CREATEDBY: 'Author',
            MODIFIED: 'Modified',
            MODIFIEDBY: 'Editor',
            TITLE: 'Title',
            ISIMPORTED: 'isImported',
            OWSHIDDENVERSION: 'owshiddenversion',
            FOLDERPREFIX: 'P',
            DILSEQUENCEPREFIX: 'FUP',
            PAGINGINFOPREFIX: 'Paged=TRUE&p_ID=',
            RETIRED: 'Retired',
            BLINDED: 'Blinded',
            OPEN: 'Open',
            UNBLINDED: 'Unblinded',
            ALLOPEN: 'AllOpen',
            ALLBLINDED: 'AllBlinded',
            EXCELAUTHOR: 'Sanofi',
            CONFLICTMESSAGE: 'Conflict error. \n\nYour changes conflict with those made concurrently by another user. Please refresh page.',
            USERACCESSERROR: 'Access denied. You do not have permission to perform this action or access this resource. Please contact your administrator',
            DUPLICATEERROR: 'Unable to save because duplicate entry exists.',
            TIMEZONEMESSAGE: (typeof kendo !== 'undefined' ? ('Time zone used for data is ' + kendo.toString(new Date(), 'zzz')) : ''),
            EXPORTDISCLAIMER: 'By generating this report, you understand that the data are critical and confidential for the company, and their diffusion should be subject to the highest level of cautiousness.',
            SANOFILOGO: "data:image/jpeg;base64,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",
            EARTHLOGO: "data:image/png;base64,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",
            ROWLIMIT: 5000,
            INITIALYEAR: 2005,
            MIGRATEDSUSARCOUNT: 20000,
            BATCHCOUNT: 25,
            APPROVAL: {
                LIST: 'SUSARExtension',
                LISTMIGRATED: 'SUSARExtensionMigrated',
                ORIGINALAPPROVALDATE: 'OriginalApprovalDate',
                LASTSUSARAPPROVALDATE: 'LastSUSARApprovalDate',
                LASTSUSARDISPPROVALDATE: 'LastSUSARDisapprovalDate',
                APPROVED: 'Approved',
                DISAPPROVALCOMMENT: 'DisapprovalComment',
                LASTDISAPPROVEDBY: 'LastDisapprovedBy',
            },
            APPROVALHISTORY: {
                LIST: 'Approval',
                LISTMIGRATED: 'ApprovalMigrated',
                APPROVALID: 'SUSARExtensionID',
                SUSARID: 'SUSARID',
                PRODUCTID: 'ProductID',
                REASONOFCORRECTION: 'ReasonForCorrection',
            },
            APPROVEREMAILNOTIF: {
                LIST: 'ApproverEmailNotification',
                USER: 'User',
                DILPRODUCT: 'DILProduct',
                LOOPCOUNT: 'LoopCount',
                USERLISTINDEX: 'UserListIDIndex'
            },
            AWARESTUDYINN: {
                LIST: 'AWAREStudy',
                DRUGNAME: 'DrugName',
                ISIMPORTED: 'isImported',
                RETIRED: 'Retired'
            },
            BLANK: {
                LIST: 'Blank'
            },
            COUNTRY: {
                LIST: 'Country'
            },
            DASHBOARD: {
                INIFUP: 'IniFup',
                PRODUCT: {
                    LIST: 'DashboardProduct',
                    ID: 'ProductSPID',
                },
                PRODUCTENTITY: {
                    LIST: 'DashboardProductEntity',
                    ID: 'ProductEntitySPID',
                },
                STUDY: {
                    LIST: 'DashboardStudy',
                    ID: 'StudySPID',
                },
                STUDYSPONSORSHIP: {
                    LIST: 'DashboardStudySponsorship',
                    ID: 'StudySponsorshipSPID',
                    DIL: 'DIL',
                },
            },
            DILSNEWS: {
                LIST: 'DILsNews',
                ATTACHMENT: 'Attachment',
                DESCRIPTION: 'Description',
                RELEASEDATE: 'ReleaseDate',
                URL: 'urlDisplayName',
                RETIRED: 'Retired',
                CONTENT: 'Content',
                ATTACHEDLINK: 'AttachedLink',
            },
            DILSSEQUENCE: {
                LIST: 'DILSequence',
                SEQUENCE: 'DILSequence',
            },
            DILSTRACKERA: {
                LIST: 'DILs Tracker A',
                STUDYID: 'Study_x0020_ID',
            },
            INN: {
                LIST: 'AWAREINN',
                SOURCE: 'Source',
                INN: 'Title',
                RETIRED: 'Retired'
            },
            CONFIGLIST: {
                LIST: 'ConfigList',
                NAME: 'Name',
                VALUE: 'Value',
                EXPORTMESSAGE: 'Export_Message',
            },
            NOTIFICATIONHISTORY: {
                USERLIST: 'UserNotificationHistory',
                PRODUCTLIST: 'ProductNotificationHistory',  
                SENTDATE: 'SentDate',
                INITIATOR: 'Initiator',
                RECIPIENTS: 'Recipients',
                NOTIFICATIONTYPE: 'NotificationType',
                USERID: 'UserID',
                PRODUCTID: 'ProductID',  
                METADATA: 'MetaData',
            },
            PRODUCT: {
                LIST: 'Product',
                CODE: 'ProductCode',
                NICKNAME: 'ProductNickname',
                INN: 'AWAREINN',
                ENTITY: 'ProductEntity',
                DILPRODUCT: 'DILProduct',
                SUSAROPENGROUPID: 'susarOpenGroupId',
                SUSARGROUPID: 'susarGroupId',
                STATUS: 'Status',
                RETIRED: 'Retired',
                ACTIVE: 'Active',
                PENDING: 'Pending',
            },
            PRODUCTENTITY: {
            	LIST: 'ProductEntity',
            	RETIRED: 'Retired'
            },
            QUEUELIST: {
                LIST: 'QueueList',
                ACTION: 'Action',
                DATA: 'Data',
                DISABLEUSER: 'Disable_User',
                CREATEPRODUCT: 'Create_Product',
                CREATEUSERPRODUCT: 'Create_UserProduct',
                EDITUSERPRODUCT: 'Edit_UserProduct',
                REMOVEUSERPRODUCT: 'Remove_UserProduct',
                SUSARAPPROVAL: 'SUSAR_Approval',
                SUSARDISAPPROVAL: 'SUSAR_Disapproval',
                SUSARSUBMISSION: 'SUSAR_Submission',
                CREATEUSER: 'Create_User',
                MODIFYUSER: 'Modify_User',
                EMAILREQUESTED: 'Email_Requested',
                PRODUCTEMAIL: 'Product_Email',
                WORKFLOWHISTORY: 'Workflow_History',
                SUSARMOVE: 'SUSAR_Move',
                USERPRODUCTS: 'User_Products',
                PRODUCTUSERS: 'Product_Users',
                RETIREDSUSAR: 'Retire_SUSAR',
                UNRETIREDSUSAR: 'Unretire_SUSAR',
                REACTIVATED: 'Reactivated-',
                UPDATESTUDY: 'Update_Study',
            },
            STUDY: {
                LIST: 'Study',
                STUDYID: 'StudyID',
                STUDYSPONSORSHIP: 'StudySponsorship',
                INVESTIGATIONALDILPRODUCT: 'InvestigationalDILProducts',
                PRIMARYINVESTIGATIONALPRODUCT: 'PrimaryInvProdDILProduct',
                STUDYBLINDEDSTATUS: 'StudyBlindedStatus',
                RETIRE: 'Retired',
                ISIMPORTED: 'isImported',
                SUSARGROUPID: 'SUSARGroupID',
                SUSAROPENGROUPID: 'SUSAROpenGroupID',
            },           
            STUDYSPONSORSHIP: {
            	LIST: 'StudySponsorship',
            	RETIRED: 'Retired'
            },
            SUSAR: {
                LIST: 'SUSAR',
                LISTOPEN: 'SUSAROpen',
                LISTMIGRATED: 'SUSARMigrated',
                LISTOPENMIGRATED: 'SUSAROpenMigrated',                
                ITEMCHILDCOUNT: 'ItemChildCount',
                SUSARID: 'SUSARID',
                STUDYSPID: 'StudySPID',
                STUDYID: 'StudyID',
                PRIMARYINVESTIGATIONALPRODUCT: 'PrimaryInvProdDILProduct',
                DILPRODUCT: 'DILProducts',
                STUDYBLINDEDSTATUS: 'StudyBlindedStatus',
                STUDYSPONSORSHIP: 'StudySponsorship',
                CASEID: 'CaseID',
                COUNTRY: 'CountryOfOccurrence',
                CENTERID: 'CenterID',
                PATIENTID: 'PatientID',
                SUSPECTPRODUCT: 'SuspectProducts',
                PRIMARYSUSPECTPRODUCTROLE: 'PrimarySuspectProductRole',
                PREFERREDTERM: 'PreferredTerm',
                BENEFITORRISKMODIFICATION: 'BenefitRiskModification',
                DOWNGRADEDTONONSUSAR: 'DowngradedToNonSUSAR',
                DOWNGRADEDSUSARCASEDETAILS: 'DowngradedSUSARCaseDetails',
                DILSEQUENCE: 'DILSequence',
                CLOCKSTARTDATE: 'ClockStartDate',
                INIORFUP: 'IniFup',
                GPEDILDISTRIBUTIONDATE: 'GPEDILDistributionDate',
                GPEDILDISTRIBUTIONONDAY: 'GPEDILDistributionOnDay',
                SUSARCOMMENT: 'SUSARComments',
                RETIRED: 'Retired',
                SUBMITTED: 'Submitted',
                SUBMITTEDBY: 'SubmittedBy',
                ISMAJORCORRECTION: 'IsMajorCorrection',
                HASMAJORCORRECTION: 'HasMajorCorrection',
                HASMINORCORRECTION: 'HasMinorCorrection',
                REASONOFCORRECTION: 'ReasonOfCorrection',
                REASONFORUNRETIRE: 'ReasonForReactivation',
                REASONFORRETIRE: 'ReasonForDeactivation',
                LASTSAVEDDATE: 'LastSavedDate',
                APPROVALID: 'SUSARExtensionID',
                APPROVALVERSION: 'SUSARExtensionVersion',
                ORIGINALAPPROVALDATE: 'OriginalApprovalDate',
                LASTSUSARAPPROVALDATE: 'LastSUSARApprovalDate',
                LASTSUSARDISPPROVALDATE: 'LastSUSARDisapprovalDate',
                STATUS: 'Status',
                OLDSTATUS: 'OldStatus',
                BLINDEDDATA: 'BLINDED DATA',
                MODIFIED: 'Modified',
                BLINDEDCIOMS: 'BlindedCIOMS',
                COVERLETTER: 'CoverLetter',
                OPENCIOMS: 'OpenCIOMS',
                BLINDEDCIOMSMD: 'BlindedCIOMSMD',
                COVERLETTERMD: 'CoverLetterMD',
                OPENCIOMSMD: 'OpenCIOMSMD',
                AUDITTRAILVERSION: 'AuditTrailVersion',
            },
            SUSARNOTIFICATIONHISTORY: {
            	LIST: 'SUSARNotificationHistory',
                SENTDATE: 'SentDate',
                INITIATOR: 'Initiator',
                RECIPIENTS: 'Recipients',
                NOTIFICATIONTYPE: 'NotificationType',
                SUSARID: 'SUSARID',
                METADATA: 'MetaData',
                ISIMPORTED: 'isImported',
            },
            SUSAROPEN: {
            	LIST: 'SUSAROpen',
            	SUSPECTPRODUCTS: 'SuspectProducts',
            },
            SUSARSTATUS: {
                SAVED: 'Saved',
                PENDING: 'Pending',
                PENDINGDISPLAY: 'Pending for Approval',
                APPROVED: 'Approved',
                DISAPPROVED: 'Disapproved',
                REVISED: 'Revised',
                RETIRED: 'Inactive',
                WITHMAJOR: 'with Major Correction',
                WITHMINOR: 'with Minor Correction',
                WITHMAJORMINOR: 'with Major & Minor Correction',
            },
            TRAININGLINKS: {
                LIST: 'TrainingLinks',
                NOTES: 'Notes',
                URLDESCRIPTION: 'urlDescription',
                URL: 'url',
                RETIRED: 'Retired',
            },
            USER: {
                LIST: 'User',
                COUNTRY: 'Country',
                NAME: 'Name',
                PROFILE: 'UserProfile',
                ENTITY: 'UserEntity',               
                STATUS: 'UserStatus',
                OPENACCESS: 'OpenAccess',
                ALLOPEN: 'AllOpen',
                ACTIVE: 'Active',
                INACTIVE: 'Inactive',
                REQUESTED: 'Requested',
                EMAILREQUESTED: 'EmailRequested',
            },
            USERACCESSLOGVIEW: {
                LIST: 'UserAccessLog',
                USERID: 'UserID',
                DISPLAYNAME: 'Name',
                DILPRODUCT: 'DILProduct',
                ACCESS: 'Access',
                ACTION: 'Action'
            },
            USERENTITY: {
            	LIST: 'UserEntity',
            	RETIRED: 'Retired'
            },
            USERPRODUCT: {
                LIST: 'User-Product',
                USERID: 'UserID',
                USER: 'User',
                PRODUCTID: 'ProductID',
                PRODUCTCODE: 'ProductCode',
                PRODUCTNICKNAME: 'ProductNickname',
                PRODUCTSTATUS: 'ProductStatus',
                ACCESS: 'Access',
                DILPRODUCT: 'DILProduct',
                UPID: 'UPID',
                SUSARGROUPID: 'susarGroupId',
                SUSAROPENGROUPID: 'susarOpenGroupId',
            },
            USERPROFILE: {
                ISADMIN: 'IS Admin',
                BUSADMIN: 'Bus Admin',
                APPROVER: 'Approver',
                CDSA: 'CDSA',
                READONLY: 'Read-Only',
            },
            USEFULLINKS: {
            	LIST: 'UsefulLinks',
            	NOTES: 'Notes',
            	URLDESCRIPTION: 'urlDescription',
            	URL: 'url',
            	RETIRED: 'Retired',
            },
            WELCOMEMESSAGE: {
            	LIST: 'WelcomeMessage',
            	MESSAGE: 'WelcomeMessage',
            },
            WORKFLOWHISTORY: {
                LIST: 'WorkflowHistory',
                SUSARID: 'SUSARID',
                STATUS: 'Status',
                MODIFIEDON: 'When',
                MODIFIEDBY: 'Who',
                REASONFORCORRECTION: 'ReasonForCorrection',
                DISAPPROVALCOMMENT: 'DisapprovalComment',
                REASONFORDEACTIVATION: 'ReasonForDeactivation',
                REASONFORREACTIVATION: 'ReasonForReactivation',
                ISIMPORTED: 'isImported',
            },
        }
    }

    function disableHeaderLinks() {
        var links = $('#nav').find('a');
        for (var i = 0; i < links.length; i++) {
            $(links[i]).attr("href", "#")
        }
    }

    function getUser(param, callback) {
        var ctx = getContext();
        var currentUser = ctx.get_web().get_currentUser();

        ctx.load(currentUser);
        ctx.executeQueryAsync(onSuccessGetUser, onQueryFailed);

        function onSuccessGetUser() {
            getJobTitle(param, {
                userInfo: {
                    user: { id: currentUser.get_id(), name: currentUser.get_title(), jobTitle: '' },
                    cans: {},
                    role: { name: [] },
                }
            }, callback);
        }

        function onQueryFailed(sender, args) {
            console.error({ message: "getUser: " + args.get_message(), stackTrace: args.get_stackTrace, error: true });
        }
    }

    function getJobTitle(param, currentUser, callback) {
        var ctx = getContext();
        var web = ctx.get_web();
        var userInfoList = web.get_siteUserInfoList();
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'ID\'/>' + '<Value Type=\'Number\'>' + currentUser.userInfo.user.id + '</Value></Eq>' + '</Where></Query><RowLimit>1</RowLimit></View>');
        var row_info = userInfoList.getItems(camlQuery);
        ctx.load(row_info, 'Include(ID, JobTitle)');
        ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

        function onQuerySucceeded() {
            if (row_info.get_count() === 1) {
                currentUser.userInfo.user.jobTitle = row_info.itemAt(0).get_item("JobTitle") ? row_info.itemAt(0).get_item("JobTitle") : '';
            }
            getUserInfo(param, currentUser, callback);
        }
        function onQueryFailed(sender, args) {
            console.error({ message: "getJobTitle: " + args.get_message(), error: true });
        }
    }

    function getUserProperties(userSpid, callback) {
        var ctx = getContext();
        var web = ctx.get_web();
        var userInfoList = web.get_siteUserInfoList();
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'ID\'/>' + '<Value Type=\'Number\'>' + userSpid + '</Value></Eq>' + '</Where></Query><RowLimit>1</RowLimit></View>');
        var row_info = userInfoList.getItems(camlQuery);
        ctx.load(row_info, 'Include(ID, Name, EMail, Department)');
        ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

        function onQuerySucceeded() {
            if (row_info.get_count() > 0) {
                if (callback) callback({
                    loginName: (row_info.itemAt(0).get_item("Name") ? row_info.itemAt(0).get_item("Name") : ''),
                    email: (row_info.itemAt(0).get_item("EMail") ? row_info.itemAt(0).get_item("EMail") : ''),
                    department: (row_info.itemAt(0).get_item("Department") ? row_info.itemAt(0).get_item("Department") : ''),
                });
            } else{
            if (callback) callback({ message: "User not found", error: true });
            }
        }
        function onQueryFailed(sender, args) {
            console.error({ message: "getUserProperties: " + args.get_message(), error: true });
            if (callback) callback({ message: args.get_message(), error: true });
        }
    }

    function getCoverLetterValue(callback) {
    	var ctx = getContext();
    	this.web = ctx.get_web(),
            list = this.web.get_lists().getByTitle(COMM.PROPERTY.CONFIGLIST.LIST);
    	var camlQuery = new SP.CamlQuery();
    	var query = '<View>' +
						'<Query>' +
							'<Where>' +
								'<Eq>' +
									'<FieldRef Name="' + COMM.PROPERTY.CONFIGLIST.NAME + '"/>' +
									'<Value Type="Text">CoverLetter</Value>' +
								'</Eq>' +
							'</Where>' +
						'</Query>' +
						'<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
							'<FieldRef Name=' + COMM.PROPERTY.CONFIGLIST.VALUE + '/>' +
                        '</ViewFields>' +
					'</View>';
    	camlQuery.set_viewXml(query);
    	var items = list.getItems(camlQuery);
    	var row_info = ctx.loadQuery(items);
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    	function onQuerySucceeded() {
    		var objArray = [];
    		try {
    			if (!row_info) throw 'No data found';
    			for (var i = 0; i < row_info.length; i++) {
    				objArray.push({
    					id: row_info[i].get_item(COMM.PROPERTY.ID),
    					coverLetterValue: row_info[i].get_item(COMM.PROPERTY.CONFIGLIST.VALUE),
    					objVersion: row_info[i].get_objectVersion(),
    				});
    			}
    		} catch (err) {
    			callback(objArray, { message: err, error: true, noData: true });
    			return;
    		}
    		callback(objArray);
    	}
    	function onQueryFailed(sender, args) {
    		callback({ message: args.get_message(), error: true });
        }
    }

    function getWelcomeMessage(callback) {
    	var ctx = getContext();
    	this.web = ctx.get_web(),
            list = this.web.get_lists().getByTitle(COMM.PROPERTY.WELCOMEMESSAGE.LIST);

    	var camlQuery = new SP.CamlQuery();
    	var query = '<View>' +
						'<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
							'<FieldRef Name=' + COMM.PROPERTY.WELCOMEMESSAGE.MESSAGE + '/>' +
                        '</ViewFields>' +
					'</View>';

    	camlQuery.set_viewXml(query);
    	var items = list.getItems(camlQuery);
    	var row_info = ctx.loadQuery(items);
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    	function onQuerySucceeded() {
    		var objArray = [];
    		try {
    			if (!row_info) throw 'No data found';
    			for (var i = 0; i < row_info.length; i++) {
    				objArray.push({
    					id: row_info[i].get_item(COMM.PROPERTY.ID),
    					message: row_info[i].get_item(COMM.PROPERTY.WELCOMEMESSAGE.MESSAGE),
    				});
    			}
    		} catch (err) {
    			callback(objArray, { message: err, error: true, noData: true });
    			return;
    		}
    		callback(objArray);
    	}

    	function onQueryFailed(sender, args) {
    	    callback({ message: args.get_message(), error: true });
    	}
    }

    //Get user role/s
    function getUserInfo(param, currentUser, callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle('User');

        try {
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml(
                '<View>' +
                    '<Query>' +
                        '<Where>' +
                            '<And>' +
                                '<Eq>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.USER.NAME + ' LookupId="TRUE"/>' +
                                    '<Value Type="Lookup">' + currentUser.userInfo.user.id + '</Value>' +
                                '</Eq>' +
                                '<Eq>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.USER.STATUS + '/>' +
                                    '<Value Type="Text">' + COMM.PROPERTY.USER.ACTIVE + '</Value>' +
                                '</Eq>' +
                            '</And>' +
                        '</Where>' +
                    '</Query>' +
                '</View>');
            var items = list.getItems(camlQuery);
            var row_info = ctx.loadQuery(items);
            ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
        } catch (e) {
            console.error({ message: "getUserInfo: " + e, error: true });
            if (callback) callback({ message: "getUserInfo: " + e, error: true });
            return;
        }

        function onQuerySucceeded() {
            var objArray = {};

            if (row_info.length === 0) { //no entry in user list
                if (param.accessCode === getAccessEnum().PRODUCTS_PAGE) {
                    currentUser.hasAccess = true;
                    currentUser.notRegistered = true;
                    console.error({ message: "getUserInfo: User is accessing products page", notRegistered: true, error: false });
                    if (callback) callback(currentUser);
                    return;
                }
                if (callback) callback({ message: "getUserInfo: User is not registered", notRegistered: true, error: true });
            } else {
                currentUser.userInfo.hasAccess = true;
                for (var i = 0; i < row_info.length; i++) {
                    var role = row_info[i].get_item("UserProfile") ? row_info[i].get_item("UserProfile") : '';
                    currentUser.userInfo.role.name.push(role);

                    if (role === COMM.PROPERTY.USERPROFILE.ISADMIN) {
                        currentUser.userInfo.role.isAdmin = true; //set role

                        //set cans
                        currentUser.userInfo.cans.createSusar = true;
                        currentUser.userInfo.cans.correctSusar = true;
                        currentUser.userInfo.cans.approveSusar = true;
                        currentUser.userInfo.cans.requestApproval = true;
                        currentUser.userInfo.cans.retireSusar = true;
                        currentUser.userInfo.cans.sendAdHoc = true;
                    } else if (role === COMM.PROPERTY.USERPROFILE.BUSADMIN) {
                        currentUser.userInfo.role.busAdmin = true; //set role

                        //set cans
                        currentUser.userInfo.cans.createSusar = true;
                        currentUser.userInfo.cans.correctSusar = true;
                        currentUser.userInfo.cans.approveSusar = true;
                        currentUser.userInfo.cans.requestApproval = true;
                        currentUser.userInfo.cans.retireSusar = true;
                        currentUser.userInfo.cans.sendAdHoc = true;
                    } else if (role === COMM.PROPERTY.USERPROFILE.APPROVER) {
                        currentUser.userInfo.role.approver = true; //set role

                        //set cans
                        currentUser.userInfo.cans.createSusar = true;
                        currentUser.userInfo.cans.correctSusar = true;
                        currentUser.userInfo.cans.approveSusar = true;
                        currentUser.userInfo.cans.requestApproval = true;
                        currentUser.userInfo.cans.retireSusar = true;
                    } else if (role === COMM.PROPERTY.USERPROFILE.CDSA) {
                        currentUser.userInfo.role.cdsa = true; //set role

                        //set cans
                        currentUser.userInfo.cans.createSusar = true;
                        currentUser.userInfo.cans.correctSusar = true;
                        currentUser.userInfo.cans.requestApproval = true;
                        currentUser.userInfo.cans.sendAdHoc = true;
                    } else if (role === COMM.PROPERTY.USERPROFILE.READONLY) {
                        currentUser.userInfo.role.readOnly = true; //set role

                        //set cans

                    } else {
                        console.error('DANGER! Unknown role: ' + role);
                    }
                }
                currentUser.hasAccess = accessRights(param.accessCode, currentUser.userInfo.role);
                showPages(currentUser.userInfo.role);

                getConfigList(COMM.PROPERTY.CONFIGLIST.EXPORTMESSAGE, function (r) { //get export message
                    if (r.error) {
                        console.error(r.message);
                        if (callback) callback({ message: "An error has occurred.", error: true });
                    } else {
                        if (global) {
                            $.extend(global, { exportMessage: r.value });
                        }else{
                            global = { exportMessage: r.value };
                        }
                        if (callback) callback(currentUser);
                    }
                });
            }
        }

        function onQueryFailed(sender, args) {
            if (args.get_message().indexOf('does not exist at site') !== -1) {
                currentUser.hasAccess = (param.accessCode === getAccessEnum().PRODUCTS_PAGE);
                currentUser.notRegistered = true;
                if (currentUser.hasAccess) {
                    if (callback) callback(currentUser);
                    return;
                }
                console.error({ message: "getUserInfo: " + args.get_message(), notRegistered: true, error: true });
                if (callback) callback({ message: "getUserInfo: " + args.get_message(), notRegistered: true, error: true });
            } else {
                console.error({ message: "getUserInfo: " + args.get_message(), error: true });
                if (callback) callback({ message: "getUserInfo: " + args.get_message(), error: true });
            }
        }
    }

    function accessRights(accessCode, role) {
        var accessEnum = getAccessEnum();

        if (accessCode === accessEnum.COMMON_PAGE) return true;

        if (role.isAdmin && 
            (accessCode === accessEnum.ADMINISTRATION ||
            accessCode === accessEnum.DAILY_TRACKER ||
            accessCode === accessEnum.DASHBOARD ||
            accessCode === accessEnum.DILS_PRODUCT ||
            accessCode === accessEnum.DILS_TRACKER ||
            accessCode === accessEnum.PRODUCTS_PAGE
            )) {
                return true;
        } else if (role.busAdmin &&
            (accessCode === accessEnum.ADMINISTRATION ||
            accessCode === accessEnum.DAILY_TRACKER ||
            accessCode === accessEnum.DASHBOARD ||
            accessCode === accessEnum.DILS_PRODUCT ||
            accessCode === accessEnum.DILS_TRACKER ||
            accessCode === accessEnum.PRODUCTS_PAGE
            )) {
                return true;
        } else if (role.approver && 
            (accessCode === accessEnum.DAILY_TRACKER ||
            accessCode === accessEnum.DASHBOARD ||
            accessCode === accessEnum.DILS_PRODUCT ||
            accessCode === accessEnum.DILS_TRACKER ||
            accessCode === accessEnum.PRODUCTS_PAGE
            )) {
                    return true;
        } else if (role.cdsa && 
            (accessCode === accessEnum.DAILY_TRACKER ||
            accessCode === accessEnum.DASHBOARD ||
            accessCode === accessEnum.DILS_PRODUCT ||
            accessCode === accessEnum.DILS_TRACKER ||
            accessCode === accessEnum.PRODUCTS_PAGE
            )) {
                return true;
        } else if (role.readOnly &&
            (accessCode === accessEnum.DILS_PRODUCT ||
            accessCode === accessEnum.DILS_TRACKER ||
            accessCode === accessEnum.PRODUCTS_PAGE
            )) {
            return true;
        }
        return false;
    }

    function showPages(role) {
        //wait for nav pages to be loaded
        var a = setInterval(function () {
            if ($('#dashboards-page').length > 0) {
                clearInterval(a);
                if (role.cdsa || role.approver || role.busAdmin || role.isAdmin) {
                    $('#dashboards-page').show();
                    $('#dailytracker-page').show();
                }
                if (role.busAdmin || role.isAdmin) {
                    $('#administration-page').show();
                }
            }
        }, 500);
    }
    
    function bindTooltip(e) {
        var tool = [];
        var tooltip = [];

        tool.push(e.sender.wrapper[0].id);
        var t = $('#' + e.sender.wrapper[0].id).kendoTooltip({
            filter: "th:not(.k-hierarchy-cell),td:not(:empty):not(:has(a.k-button)):not(:has(a.k-icon)):not(:has(a .k-icon)):not(:has(a.k-plus)):not(:has(a.k-minus)):not(:has(span.k-input)):not(:has(input))",
            position: "right",
            content: function (a) {
                var msg = "";
                $('.k-tooltip')
                    .css('background-color', '#000');
                if ($(a.target).has('span.k-dropdown').length > 0) {
                    msg = $(a.target[0].innerHTML).find('.k-input').text();
                }
                else if ($(a.target).has('input.k-textbox').length > 0) {
                    msg = $(a.target)[0].children[0].value;
                }
                else if (a.target[0].innerText.trim() === '') {
                    $('.k-tooltip')
                        .css('background-color', 'transparent');
                }
                else if (a.target[0].tagName === 'TH' && a.target[0].innerText === 'BC') {
                    msg = 'Blinded CIOMS';
                }
                else if (a.target[0].tagName === 'TH' && a.target[0].innerText === 'UC') {
                    msg = 'Unblinded CIOMS';
                }
                else if (a.target[0].tagName === 'TH' && a.target[0].innerText === 'CL') {
                    msg = 'Cover Letter';
                }
                else if ($(a.target).hasClass('susar-status-column')) {
                    try {
                        if (a.target[0].innerText === COMM.PROPERTY.SUSARSTATUS.RETIRED.toUpperCase()) {
                            msg = $(a.target).parent().parent().parent().parent().parent().data('kendoGrid').dataItem($(a.target).parent()).reasonForRetire;
                        }
                    } catch (err) {
                        console.error(err);
                        msg = a.target[0].innerText;
                    } finally {
                        if (!msg || msg === '') {
                            msg = a.target[0].innerText;
                        }
                    }
                }
                else if (a.target[0].innerText !== '\u00a0') { // fallback
                    msg = a.target[0].innerText;
                }
                else {
                    $('.k-tooltip')
                        .css('background-color', 'transparent');
                }
                return '<div id="tooltip" style="width: ' + (msg.length - 0.8) + 'em; width: 150px; word-wrap:normal;" >' + msg + '</div>';

            },
            showAfter: 300,
        });
        
        if (e.sender.wrapper[0].id === 'daily-tracker-grid' || e.sender.wrapper[0].id === 'product-entity-grid' || e.sender.wrapper[0].id === 'aware-inn-grid' || e.sender.wrapper[0].id === 'study-aware-inn' || e.sender.wrapper[0].id === 'study-sponsorship-grid' || e.sender.wrapper[0].id === 'welcome-message-grid' || e.sender.wrapper[0].id === 'user-entity-grid' || e.sender.wrapper[0].id === 'createstudygrid' || e.sender.wrapper[0].id === 'userProductCreate' || e.sender.wrapper[0].id === 'createProductgrid' || e.sender.wrapper[0].id === 'productgrid' || e.sender.wrapper[0].id === 'usergrid' || e.sender.wrapper[0].id === 'studygrid') {
            var t = $('#' + e.sender.wrapper[0].id).kendoTooltip({
                filter: "a.k-button.command-btn",
                position: "right",
                content: function (a) {
                    var msg = "";
                    if ($(a.target).hasClass('unlink-btn')) {
                        msg = 'Unlink';
                    } else if ($(a.target).hasClass('k-grid-correction')) {
                        msg = 'Correction';
                    } else {
                        msg = 'Edit';
                    }
                    $('.k-tooltip').css('background-color', '#000');
                    return '<div id="tooltip" style="width: ' + (msg.length - 0.8) + 'em; max-width: 204px; word-wrap: break-word;">' + msg + '</div>';

                },
                showAfter: 300, 
            });
        }

        if (e.sender.wrapper[0].id === 'usergrid') {
            var t = $('#' + e.sender.wrapper[0].id).kendoTooltip({
                filter: "a.k-button.command-btn-email",
                position: "right",
                content: function (a) {
                    var msg = "";
                    msg = $(a.target).hasClass('unlink-btn') ? 'Unlink' : 'Send full config email';
                    $('.k-tooltip').css('background-color', '#000');
                    return '<div id="tooltip" style="width: ' + (msg.length - 0.8) + 'em; max-width: 113px; word-wrap: break-word;">' + msg + '</div>';2

                },
                showAfter: 300,
            });
        }

        if (e.sender.wrapper[0].id === 'createstudygrid' || e.sender.wrapper[0].id === 'editstudygrid') {
            var t = $('#' + e.sender.wrapper[0].id).kendoTooltip({
                filter: "a.k-button.command-btn-user",
                position: "right",
                content: function (a) {
                    var msg = "";
                    msg = $(a.target).hasClass('unlink-btn') ? 'Unlink Product' : 'Link User';
                    $('.k-tooltip').css('background-color', '#000');
                    return '<div id="tooltip" style="width: ' + (msg.length - 0.8) + 'em; max-width: 80px; word-wrap: break-word;">' + msg + '</div>';

                },
                showAfter: 300,
            });
        }

        if (e.sender.wrapper[0].id === 'useful-links-grid' || e.sender.wrapper[0].id === 'dils-news-grid' || e.sender.wrapper[0].id === 'training-links-grid') {
            var t = $('#' + e.sender.wrapper[0].id).kendoTooltip({
                filter: "a.k-button.command-btn",
                position: "right",
                content: function (a) {
                    var msg = "";
                    msg = $(a.target).hasClass('unlink-btn') ? 'Remove' : 'Edit';
                    $('.k-tooltip').css('background-color', '#000');
                    return '<div id="tooltip" style="width: ' + (msg.length - 0.8) + 'em; max-width: 40px; word-wrap: break-word;">' + msg + '</div>';

                },
                showAfter: 300,
            });
        }

        if (e.sender.wrapper[0].id === 'cover-notification-grid') {
            var t = $('#' + e.sender.wrapper[0].id).kendoTooltip({
                filter: "a.k-button.command-btn-viewEmail",
                position: "right",
                content: function (a) {
                    var msg = "";
                    msg = $(a.target).hasClass('unlink-btn') ? 'Remove' : 'View E-mail';
                    $('.k-tooltip').css('background-color', '#000');
                    return '<div id="tooltip" style="width: ' + (msg.length - 0.8) + 'em; max-width: 60px; word-wrap: break-word;">' + msg + '</div>';
                },
                showAfter: 300,
            });
        }
        if (e.sender.wrapper[0].id === 'daily-release-grid') {
            var t = $('#' + e.sender.wrapper[0].id).kendoTooltip({
                filter: "a.k-button.command-btn-view",
                position: "right",
                content: function (a) {
                    var msg = "";
                    msg = $(a.target).hasClass('unlink-btn') ? 'Unlink' : 'View';
                    $('.k-tooltip').css('background-color', '#000');
                    return '<div id="tooltip" style="width: ' + (msg.length - 0.8) + 'em; max-width: 50px; word-wrap: break-word;">' + msg + '</div>';

                },
                showAfter: 300,
            });
        } else if ($(e.sender.wrapper[0]).hasClass('product-grid-detail') || $(e.sender.wrapper[0]).hasClass('create-product-grid') || $(e.sender.wrapper[0]).hasClass('user-grid-detail') || $(e.sender.wrapper[0]).hasClass('study-product-grid-detail')) {
            var className = null;
            if ($(e.sender.wrapper[0]).hasClass('create-product-grid')){
                className = 'create-product-grid';
            } else if ($(e.sender.wrapper[0]).hasClass('product-grid-detail')) {
                className = 'product-grid-detail';
            } else if ($(e.sender.wrapper[0]).hasClass('user-grid-detail')) {
                className = 'user-grid-detail';
            } else if ($(e.sender.wrapper[0]).hasClass('study-product-grid-detail')) {
                className = 'study-product-grid-detail';
            }
            else {
                return;
            }
            var t = $('.' + className).kendoTooltip({
                filter: "a.k-button.command-btn",
                position: "right",
                content: function (a) {
                    var msg = "";
                    msg = $(a.target).hasClass('unlink-btn') ? 'Unlink' : 'Edit';
                    $('.k-tooltip').css('background-color', '#000');
                    return '<div id="tooltip" style="width: ' + (msg.length - 0.8) + 'em; max-width: 60px; word-wrap: break-word;">' + msg + '</div>';
                },
                showAfter: 300,
            });
        }
        tooltip.push(t);
    }

    function getMonths() {
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    };

    function getMonthEquivalent(num) {
        var months = getMonths();
        if (num < 0) return 0;
        return (months[num % months.length]);
    }

    function getYearEquivalent(num) {
        var months = getMonths();
        if (num < 0) return 0;
        return (getProperty().INITIALYEAR + ((num - (num % months.length)) / months.length));
    }

    function getMonthValue(month, year) {
        if (month === null || year === null || year < getProperty().INITIALYEAR) return 0;
        var months = getMonths();
        return (month + ((year - getProperty().INITIALYEAR)) * months.length);
    }

    function getIEVersion() {
        var agent = window.navigator.userAgent;
        var index = agent.indexOf("MSIE");

        // If IE, return version number.
        if (index > 0)
            return parseInt(agent.substring(index + 5, agent.indexOf(".", index)));

            // If IE 11 then look for Updated user agent string.
        else if (!!navigator.userAgent.match(/Trident\/7\./))
            return 11;

        else
            return 0;
    }

    function getUserProfileInfo(username, spid) {
        var obj = {};
        $().SPServices({
            operation: "SearchPrincipals",
            searchText: username,
            async: false,
            completefunc: function (xData, status) {
                $(xData.responseXML).find("PrincipalInfo")
                    .each(function () {
                        var thisUser = $(this);
                        if ($.trim(thisUser.find("UserInfoID").text()) == spid) {
                            obj.emailAdd = $.trim(thisUser.find("Email").text());
                            obj.department = $.trim(thisUser.find("Department").text());
                            obj.accountName = $.trim(thisUser.find("AccountName").text());
                            obj.title = $.trim(thisUser.find("Title").text());
                        }
                    });
            }
        });
        return obj;
    }

    function parseUrlQueryString(queryString) {
        if (!queryString) return {};
        if (queryString[0] === "?")
            queryString = queryString.substring(1);

        var params = {}, queries, temp;
        queries = queryString.split("&");

        for (var i = 0, l = queries.length; i < l; i++) {
            temp = queries[i].split('=');
            if (temp.length > 1) {
                params[temp[0].toLowerCase()] = decodeURIComponent(temp[1]);
            }
        }

        return params;
    }

    function getExcelHeaderStyle() {
        return { background: '#2980BA', color: '#fff' };
    }

    function getConfigList(name, callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.CONFIGLIST.LIST);

        if (!name) {
            console.error({ message: 'Empty name parameter', error: true });
            if (callback) callback({ message: 'Empty name parameter', error: true });
            return;
        }

        try {
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml(
                '<View>' +
                    '<Query>' +
                        '<Where>' +
                            '<Eq>' +
                                '<FieldRef Name=' + COMM.PROPERTY.CONFIGLIST.NAME + ' LookupId="TRUE"/>' +
                                '<Value Type="Text">' + name + '</Value>' +
                            '</Eq>' +
                        '</Where>' +
                    '</Query>' +
                '</View>');
            var items = list.getItems(camlQuery);
            var row_info = ctx.loadQuery(items);
            ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
        } catch (e) {
            console.error({ message: "getConfigList: " + e, error: true });
            if (callback) callback({ message: "getConfigList: " + e, error: true });
            return;
        }

        function onQuerySucceeded() {
            if (row_info.length === 0) { //no entry
                if (callback) callback({ value: '' });
            } else {
                if (callback) callback({ value: (row_info[0].get_item(COMM.PROPERTY.CONFIGLIST.VALUE) ? row_info[0].get_item(COMM.PROPERTY.CONFIGLIST.VALUE) : '') });
            }
        }

        function onQueryFailed(sender, args) {
            console.error({ message: "getConfigList: " + args.get_message(), error: true });
            if (callback) callback({ message: "getConfigList: " + args.get_message(), error: true });
        }
    }

    function getExportMessage() {
        return (global ? (global.exportMessage ? global.exportMessage : '') : '');
    }

    /************ FILTER methods ************/
    function getIndex(grid, field){
        var columns = grid.columns;
        for (var i = 0; i < columns.length; i++){
            if (columns[i].field === field){
                return i;
            }
        }
        return -1;
    }

    function compareNumber(a, b) {
        return a - b;
    }

    function removeFiltersForField(filter, expression, field) {
        var arr = [];
        for (var i = 0; i < filter.filters.length; i++) {
            if (!filter.filters[i].field) {
                if (filter.filters[i].filters[0].field !== field) {
                    arr.push(filter.filters[i]);
                }
            } else {
                if (filter.filters[i].field !== field) {
                    arr.push(filter.filters[i]);
                }
            }
        }
        arr = arr.concat(expression);
        return arr;
    }

    function filterNumberValue(grid, arrayChoice, container, dataSource, field) {
        var field = field;
        var dataSource = dataSource;
        var container = container;
        var lastItem = arrayChoice.pop();
        if (lastItem !== '') arrayChoice.push(lastItem);
        var source = arrayChoice.sort(compareNumber);
        if (lastItem === '') arrayChoice.unshift(lastItem);
        var grid = grid;
        var checkbox;
        var checkedItems = $.map(container.find('[name=' + field + ']:checkbox:checked'), function (input) { return input.id });
        var filterMenu = grid.thead.find("th:not(.k-hierarchy-cell,.k-group-cell):eq(" + getIndex(grid, field) + ")").data("kendoFilterMenu");
        if (filterMenu.form != undefined) {
            filterMenu.form.find("div.k-filter-help-text").text("");
            filterMenu.form.prop('title', '');
            filterMenu.form.find("span.k-dropdown:last").css("display", "none");
            filterMenu.form.find("div").addClass("filterData");
            filterMenu.form.find(".k-filter-help-text").removeClass("k-filter-help-text filterData").addClass("k-filter-help-text");
            filterMenu.form.find(".k-textbox").remove();
            for (var i = 0; i < source.length; i++) {
                checkbox = "<p>" +
                                "<input type='checkbox' id='" + (field + '-' + i) + "' class='" + (grid.wrapper[0].id + "-filter-checkbox") + "' name='" + field + "' " + (checkedItems.indexOf(field + '-' + i) !== -1 ? ' checked' : '') + " value='" + source[i] + "'>" +
                                "<label for='" + (field + '-' + i) + "'>" +
                                    source[i] +
                                "</label>" +
                            "</p>";
                filterMenu.form.find("div.k-filter-help-text").append(checkbox);
            }
            filterMenu.form.find(".k-numerictextbox").hide();

            container.find("[type='submit']").click(function () {
                var filter = dataSource.filter() || { logic: "and", filters: [] };
                var fieldFilters = $.map(filterMenu.form.find(":checkbox:checked"), function (input) {
                    if (input.value === '') {
                        return {
                            field: field,
                            operator: "isnull",
                            value: ''
                        };
                    }
                    return {
                        field: field,
                        operator: "eq",
                        value: parseInt(input.value)
                    };
                });
                if (!fieldFilters.length) {
                    container.find("[type='reset']").trigger("click");
                }
                if (fieldFilters.length) {
                    filter.filters = removeFiltersForField(filter, { logic: "or", filters: fieldFilters }, field);
                    dataSource.filter(filter);
                }
            });

            container.find("[type='reset']").click(function () {
                container.find('[name=' + field + ']:checked').removeAttr('checked');
            });
        }
    }

    function filterSingleValue(grid, arrayChoice, container, dataSource, field, checkedItems) {
        var field = field;
        var dataSource = dataSource;
        var container = container;
        var source = arrayChoice.sort();
        var grid = grid;
        var checkbox;
        var checkedItems = checkedItems ? checkedItems : $.map(container.find('[name=' + field + ']:checkbox:checked'), function (input) { return input.id });

        var filterMenu = grid.thead.find("th:not(.k-hierarchy-cell,.k-group-cell):eq(" + getIndex(grid, field) + ")").data("kendoFilterMenu");
        if (filterMenu.form != undefined) {
            filterMenu.form.find("div.k-filter-help-text").text("");
            filterMenu.form.prop('title', '');
            filterMenu.form.find("span.k-dropdown:last").css("display", "none");
            filterMenu.form.find("div").addClass("filterData");
            filterMenu.form.find(".k-filter-help-text").removeClass("k-filter-help-text filterData").addClass("k-filter-help-text");
            filterMenu.form.find(".k-textbox").remove();
            for (var i = 0; i < source.length; i++) {
                checkbox = "<p>" +
                                "<input type='checkbox' id='" + (field + '-' + i) + "' class='" + (grid.wrapper[0].id + '-' + field) + " " + (grid.wrapper[0].id + "-filter-checkbox") + "' name='" + field + "' " + (checkedItems.indexOf(field + '-' + i) !== -1 ? ' checked' : '') + " value='" + source[i] + "'>" +
                                "<label for='" + (field + '-' + i) + "'>" +
                                    source[i] +
                                "</label>" +
                            "</p>";
                filterMenu.form.find("div.k-filter-help-text").append(checkbox);
            }

            container.find("[type='submit']").click(function () {
                var filter = dataSource.filter() || { logic: "and", filters: [] };
                var fieldFilters = $.map(filterMenu.form.find(":checkbox:checked"), function (input) {
                	if (input.value === '' && field !== 'primaryInvProdDILProduct') {
                        return {
                            field: field,
                            operator: "isnull",
                            value: ''
                        };
                    }
                	else if (input.value === '' && field === 'primaryInvProdDILProduct') {
                    	return {
                    		field: field,
                    		operator: "isempty",
                    		value: ''
                    	};
                	}
                	else if (input.value.toUpperCase() === 'UNBLINDED' && field === 'access') {
                	    return {
                	        field: field,
                	        operator: "eq",
                	        value: 'Open'
                	    };
                	}
                	else if (input.value.toUpperCase() === 'ALLUNBLINDED' && field === 'access') {
                	    return {
                	        field: field,
                	        operator: "eq",
                	        value: 'AllOpen'
                	    };
                	}
                    return {
                        field: field,
                        operator: "eq",
                        value: input.value
                    };
                });
                if (!fieldFilters.length) {
                    container.find("[type='reset']").trigger("click");
                }
                if (fieldFilters.length) {
                    filter.filters = removeFiltersForField(filter, { logic: "or", filters: fieldFilters }, field);
                    dataSource.filter(filter);
                }
            });

            container.find("[type='reset']").click(function () {
                container.find('[name=' + field + ']:checked').removeAttr('checked');
            });
        }
    }

    function filterMultiValue(grid, arrayChoice, container, dataSource, field) {
        var field = field;
        var dataSource = dataSource;
        var container = container;
        var source = arrayChoice.sort();
        var grid = grid;
        var checkbox;
        var checkedItems = $.map(container.find('[name=' + field + ']:checkbox:checked'), function (input) { return input.id });

        var filterMenu = grid.thead.find("th:not(.k-hierarchy-cell,.k-group-cell):eq(" + getIndex(grid, field) + ")").data("kendoFilterMenu");
        if (filterMenu.form != undefined) {
            filterMenu.form.find("div.k-filter-help-text").text("");
            filterMenu.form.prop('title', '');
            filterMenu.form.find("span.k-dropdown:last").css("display", "none");
            filterMenu.form.find("div").addClass("filterData");
            filterMenu.form.find(".k-filter-help-text").removeClass("k-filter-help-text filterData").addClass("k-filter-help-text");
            filterMenu.form.find(".k-textbox").remove();
            for (var i = 0; i < source.length; i++) {
                checkbox = "<p>" +
                                "<input type='checkbox' id='" + (field + '-' + i) + "' class='" + (grid.wrapper[0].id + "-filter-checkbox") + "' name='" + field + "' " + (checkedItems.indexOf(field + '-' + i) !== -1 ? ' checked' : '') + " value='" + source[i] + "'>" +
                                "<label for='" + (field + '-' + i) + "'>" +
                                    source[i] +
                                "</label>" +
                            "</p>";
                filterMenu.form.find("div.k-filter-help-text").append(checkbox);
            }

            container.find("[type='submit']").click(function () {
                var filter = dataSource.filter() || { logic: "and", filters: [] };
                var fieldFilters = $.map(filterMenu.form.find(":checkbox:checked"), function (input) {
                	if (input.value === '' && field !== 'investigationalDILProductString') {
                        return {
                            field: field,
                            operator: "isnull",
                            value: ''
                        };
                    }
                    else if (input.value === '' && field === 'investigationalDILProductString') {
                    	return {
                    		field: field,
                    		operator: "isempty",
                    		value: ''
                    	};
                    }
                    return {
                        field: field,
                        operator: "contains",
                        value: input.value
                    };
                });
                if (!fieldFilters.length) {
                    container.find("[type='reset']").trigger("click");
                }
                if (fieldFilters.length) {
                    filter.filters = removeFiltersForField(filter, { logic: "or", filters: fieldFilters }, field);
                    dataSource.filter(filter);
                }
            });

            container.find("[type='reset']").click(function () {
                container.find('[name=' + field + ']:checked').removeAttr('checked');
            });
        }
    }

    //Date Filter Header
    function filterDateValue(grid, container, dataSource, field) {
        var field = field;
        var dataSource = dataSource;
        var container = container;
        var grid = grid;
        var filterMenu = grid.thead.find("th:not(.k-hierarchy-cell,.k-group-cell):eq(" + getIndex(grid, field) + ")").data("kendoFilterMenu");
        if (filterMenu.form != undefined) {
            filterMenu.form.find("div.k-filter-help-text").text("From");
            filterMenu.form.prop('title', '');
            filterMenu.form.find("span.k-dropdown:last").css("display", "none");
            filterMenu.form.find(".k-datepicker:first").remove();
            filterMenu.form.find(".k-textbox").remove();
            var calendar = "<input class='" + (grid.wrapper[0].id + "-filter-date-picker") + "' name='" + field + "-date-start' onkeydown='return false;'></input> To" +
                       "<input class='" + (grid.wrapper[0].id + "-filter-date-picker") + "' name='" + field + "-date-end' onkeydown='return false;'></input>";

            filterMenu.form.find("div.k-filter-help-text").append(calendar);

            container.find("[name=" + field + "-date-start]").kendoDatePicker({
                change: function (e) {
                    var value = this.value();
                },
                open: function (e) {
                    this.max(container.find("[name=" + field + "-date-end]").val());
                },
                format: '{0:dd-MMM-yyyy}'
            });

            container.find("[name=" + field + "-date-end]").kendoDatePicker({
                change: function (e) {
                    var value = this.value();
                },
                open: function (e) {
                    this.min(container.find("[name=" + field + "-date-start]").val());
                },
                format: '{0:dd-MMM-yyyy}'
            });
            container.find("[type='submit']").click(function () {
                var startDate = container.find("[name=" + field + "-date-start]").data('kendoDatePicker').value();
                var endDate = container.find("[name=" + field + "-date-end]").data('kendoDatePicker').value();
                var filter = dataSource.filter() || { logic: "and", filters: [] };
                var fieldFilters = [];
                if (startDate) {
                    fieldFilters.push({ field: field, operator: "gte", value: startDate });
                }
                if (endDate) {
                    endDate.setHours(23, 59, 59, 59);
                    fieldFilters.push({ field: field, operator: "lte", value: endDate });
                }
                filter.filters = removeFiltersForField(filter, fieldFilters, field);
                dataSource.filter(filter);
            });
            container.find("[type='reset']").click(function () {
                container.find("[name=" + field + "-date-start]").data('kendoDatePicker').value(null);
                container.find("[name=" + field + "-date-end]").data('kendoDatePicker').value(null);
            });
        }
    }
    /************ End of FILTER methods ************/

    /************  Add queue list  ******************/

    function addToQueueList(action, data, callback) {
        var ctx = getContext();
        var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.QUEUELIST.LIST);
        var itemCreateInfo = new SP.ListItemCreationInformation();
       
        for (var x = 0; x < data.length; x++) {
            var oListItem = oList.addItem(itemCreateInfo);
            oListItem.set_item(COMM.PROPERTY.QUEUELIST.ACTION, action);
            oListItem.set_item(COMM.PROPERTY.QUEUELIST.DATA, data[x].data);
            oListItem.update();
            ctx.load(oListItem);
        }             
        ctx.executeQueryAsync(succeeded, onQueryFailed);

        function succeeded() {
            callback({ error: false }); 
        }        

        function onQueryFailed(sender, args) {
            callback({ message: "addToQueueList: " + args.get_message(), error: true });
        }
    }

    //[ action: '', data: [ { data: {} }] ]
    function addMultiActionQueue(queue, callback) {
        var ctx = getContext();
        var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.QUEUELIST.LIST);
        var itemCreateInfo = new SP.ListItemCreationInformation();

        for (var i = 0; i < queue.length; i++) {
            for (var x = 0; x < queue[i].data.length; x++) {
                var oListItem = oList.addItem(itemCreateInfo);
                oListItem.set_item(COMM.PROPERTY.QUEUELIST.ACTION, queue[i].action);
                oListItem.set_item(COMM.PROPERTY.QUEUELIST.DATA, queue[i].data[x].data);
                oListItem.update();
                ctx.load(oListItem);
            }
        }
        ctx.executeQueryAsync(succeeded, onQueryFailed);

        function succeeded() {
            callback({ error: false });
        }

        function onQueryFailed(sender, args) {
            callback({ message: "addMultiActionQueue: " + args.get_message(), error: true });
        }
    }

    function user_addToUserProduct(action, queueString, callback) {
        var ctx = getContext();
        var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.QUEUELIST.LIST);
        var itemCreateInfo = new SP.ListItemCreationInformation();

        var oListItem = oList.addItem(itemCreateInfo);
        oListItem.set_item(COMM.PROPERTY.QUEUELIST.ACTION, action);
        oListItem.set_item(COMM.PROPERTY.QUEUELIST.DATA, queueString);
        oListItem.update();
        ctx.load(oListItem);

        ctx.executeQueryAsync(succeeded, onQueryFailed);

        function succeeded() {
            callback({ error: false });
        }

        function onQueryFailed(sender, args) {
            callback({ message: "user_addToUserProduct: " + args.get_message(), error: true });
        }
    }

    /****************** FOR AUDIT TRAIL *******************/

    function dilTrackerAFieldNames() {
        var fieldNames = [
                      { fieldName: "Modified", name: "Modified", lastStr: "Modified" }, //lastStr is used to query Xdata
					  { fieldName: "ID", name: "id", lastStr: "id" }, 
                      { fieldName: "Version", name: "Version", lastStr: "Version" },
                      { fieldName: "Study ID", name: "StudyID", lastStr: "id" },
                      { fieldName: "Study ID:Project Name", name: "PrimaryInvProdDILProduct", lastStr: "Name" },
                      { fieldName: "Study ID:Blind or Open", name: "StudyBlindedStatus", lastStr: "open" },
                      { fieldName: "Study ID:Sponsorship", name: "StudySponsorship", lastStr: "ID:Sponsorship" },
                      { fieldName: "Case ID", name: "CaseID", lastStr: "id" },
                      { fieldName: "Country", name: "CountryOfOccurrence", lastStr: "Country" },
                      { fieldName: "Center ID", name: "CenterID", lastStr: "id" },
                      { fieldName: "Patient ID", name: "PatientID", lastStr: "id" },
                      { fieldName: "Study Protocol Product(s)", name: "SuspectProducts", lastStr: "Product(s)" },
                      { fieldName: "Study Protocol Product(s) Status", name: "PrimarySuspectProductRole", lastStr: "Status" },
					  { fieldName: "Preferred term(s) for SUSAR(s)", name: "PreferredTerm", lastStr: "SUSAR(s)" },
                      { fieldName: "Downgraded to non SUSAR(s) case(s)", name: "DowngradedToNonSUSAR", lastStr: "case(s)" },
					  { fieldName: "Downgraded SUSAR(s) case(s) detail", name: "DowngradedSUSARCaseDetails", lastStr: "detail" },
                      { fieldName: "DIL Sequence", name: "DILSequence", lastStr: "Sequence" },
                      { fieldName: "Clock Start Date", name: "ClockStartDate", lastStr: "Date" },
                      { fieldName: "I/FU", name: "IniFup", lastStr: "FU" },
					  { fieldName: "GPE DIL Distribution Date", name: "GPEDILDistributionDate", lastStr: "Date" },
					  { fieldName: "GPE DIL distribution on Day", name: "GPEDILDistributionOnDay", lastStr: "Day" },
					  { fieldName: "Comments", name: "SUSARComments", lastStr: "Comments" },
                      { fieldName: "Ready For Display", name: "readyfordisplay", lastStr: "Display" },
					  { fieldName: "Edit Check", name: "editCheck", lastStr: "Check" },
					  { fieldName: "Created", name: "Created", lastStr: "Created" },
					  { fieldName: "Author", name: "Author", lastStr: "Author" },
					  { fieldName: "Editor", name: "Editor", lastStr: "Editor" },
        ];
        return fieldNames;
    }

    function auditTrailSusarFieldNames() {
        var fieldNames = [
            { fieldName: "Modified", name: "Modified" },
            { fieldName: "ID", name: "id" },
            { fieldName: "Version", name: "Version" },
            { fieldName: "Status", name: "Status" },
            { fieldName: "OriginalApprovalDate", name: "OriginalApprovalDate" },
            { fieldName: "LastSUSARApprovalDate", name: "LastSUSARApprovalDate" },
            { fieldName: "LastSUSARDisapprovalDate", name: "LastSUSARDisapprovalDate" },
            { fieldName: "SUSARID", name: "SusarID" },
            { fieldName: "StudyID", name: "StudyID" },
            { fieldName: "DILProducts", name: "DILProducts" },
            { fieldName: "PrimaryInvProdDILProduct", name: "PrimaryInvProdDILProduct" },
            { fieldName: "StudyBlindedStatus", name: "StudyBlindedStatus" },
            { fieldName: "StudySponsorship", name: "StudySponsorship" },
            { fieldName: "CaseID", name: "CaseID"},
            { fieldName: "CountryOfOccurrence", name: "CountryOfOccurrence"},
            { fieldName: "CenterID", name: "CenterID" },
            { fieldName: "PatientID", name: "PatientID" },
            { fieldName: "SuspectProducts", name: "SuspectProducts" },
            { fieldName: "PrimarySuspectProductRole", name: "PrimarySuspectProductRole" },
            { fieldName: "PreferredTerm", name: "PreferredTerm" },
            { fieldName: "BenefitRiskModification", name: "BenefitRiskModification" },
            { fieldName: "DowngradedToNonSUSAR", name: "DowngradedToNonSUSAR" },
            { fieldName: "DowngradedSUSARCaseDetails", name: "DowngradedSUSARCaseDetails" },
            { fieldName: "DILSequence", name: "DILSequence" },
            { fieldName: "ClockStartDate", name: "ClockStartDate" },
            { fieldName: "IniFup", name: "IniFup" },
            { fieldName: "GPEDILDistributionDate", name: "GPEDILDistributionDate" },
            { fieldName: "GPEDILDistributionOnDay", name: "GPEDILDistributionOnDay" },
            { fieldName: "SUSARComments", name: "SUSARComments" },
            { fieldName: "Submitted", name: "Submitted" },
            { fieldName: "SubmittedBy", name: "SubmittedBy" },
            { fieldName: "IsMajorCorrection", name: "IsMajorCorrection" },
            { fieldName: "ReasonOfCorrection", name: "ReasonOfCorrection" }, 
            { fieldName: "AuditTrailVersion", name: "AuditTrailVersion" },
            { fieldName: "Retired", name: "Retired" },    
            { fieldName: "Created", name: "Created" },
			{ fieldName: "Author", name: "Author" },
			{ fieldName: "Editor", name: "Editor" },
        ];
        return fieldNames;
    }

    function auditTrailSusarOpenFieldNames() {
        var fieldNames = [           
            { fieldName: "Modified", name: "Modified" },
            { fieldName: "ID", name: "id" },
            { fieldName: "SuspectProducts", name: "SuspectProducts" },
            { fieldName: "SUSARComments", name: "SUSARComments" },
            { fieldName: "Version", name: "Version" },
        ];
        return fieldNames;
    }

    function auditTrailProductsFieldNames() {
        var fieldNames = [
           { fieldName: "Modified", name: "Modified" },           

          { fieldName: "ID", name: "id" },
          { fieldName: "Version", name: "Version" },
          { fieldName: "ProductCode", name: "ProductCode" },       
          { fieldName: "AWAREINN", name: "AWAREINN" },
          { fieldName: "ProductEntity", name: "ProductEntity" },
          { fieldName: "DILProduct", name: "DILProduct" },
          { fieldName: "Retired", name: "Retired" },
          { fieldName: "Status", name: "Status" },
          { fieldName: "Created", name: "Created" },
		  { fieldName: "Author", name: "Author" },
		  { fieldName: "Editor", name: "Editor" },
        ];
        return fieldNames;
    }

    function auditTrailStudyFieldNames() {
        var fieldNames = [
          { fieldName: "Modified", name: "Modified" },
          { fieldName: "ID", name: "id" },
          { fieldName: "Version", name: "Version" },
          { fieldName: "Modified", name: "Modified" },
          { fieldName: "StudyID", name: "StudyID" },
          { fieldName: "StudySponsorship", name: "StudySponsorship" },
          { fieldName: "InvestigationalDILProducts", name: "InvestigationalDILProducts" },
          { fieldName: "PrimaryInvProdDILProduct", name: "PrimaryInvProdDILProduct" },
          { fieldName: "StudyBlindedStatus", name: "StudyBlindedStatus" },
          { fieldName: "Retired", name: "Retired" },
          { fieldName: "isImported", name: "isImported" },
          { fieldName: "Created", name: "Created" },
		  { fieldName: "Author", name: "Author" },
		  { fieldName: "Editor", name: "Editor" },
        ];
        return fieldNames;
    }

    function auditTrailUserFieldNames() {
        var fieldNames = [
          { fieldName: "Modified", name: "Modified" },
          { fieldName: "ID", name: "id" },
          { fieldName: "Version", name: "Version" },
          { fieldName: "Country", name: "Country" },
          { fieldName: "Name", name: "Name" },
          { fieldName: "UserProfile", name: "UserProfile" },
          { fieldName: "UserEntity", name: "UserEntity" },
          { fieldName: "UserStatus", name: "UserStatus" },
          { fieldName: "OpenAccess", name: "OpenAccess" },
          { fieldName: "AllOpen", name: "AllOpen" },
          { fieldName: "Created", name: "Created" },
		  { fieldName: "Author", name: "Author" },
		  { fieldName: "Editor", name: "Editor" },
        ];
        return fieldNames;
    }

    function SUSARWorkflowHistoryFields() {
        var fieldNames = [
            { fieldName: "Modified", name: "Modified" },
            { fieldName: "ID", name: "id" },
            { fieldName: "Version", name: "Version" },
            { fieldName: "Status", name: "Status" },   
            { fieldName: "GPEDILDistributionDate", name: "GPEDILDistributionDate" },
            { fieldName: "Submitted", name: "Submitted" },
            { fieldName: "SubmittedBy", name: "SubmittedBy" },           
            { fieldName: "OriginalApprovalDate", name: "OriginalApprovalDate" },
            { fieldName: "LastSUSARApprovalDate", name: "LastSUSARApprovalDate" },
            { fieldName: "LastSUSARDisapprovalDate", name: "LastSUSARDisapprovalDate" },
            { fieldName: "IsMajorCorrection", name: "IsMajorCorrection" },
            { fieldName: "ReasonOfCorrection", name: "ReasonOfCorrection" },
            { fieldName: "Created", name: "Created" },
            { fieldName: "Author", name: "Author" },
		    { fieldName: "Editor", name: "Editor" }			
        ];
        return fieldNames;
    }

}(COMM || {}));