var CSOM = (function (csom) {
    csom = CSOM || {};
    csom.user_getUserList = user_getUserList;
    csom.user_getUserProfile = user_getUserProfile;
    csom.user_getUserEntity = user_getUserEntity;
    csom.user_getUserCountry = user_getUserCountry;
    csom.user_getUserStatus = user_getUserStatus;
    csom.user_getProductUserCreate = user_getProductUserCreate;
    csom.user_createEntry = user_createEntry;
    csom.user_getUserProduct = user_getUserProduct;
    csom.user_updateUserProduct = user_updateUserProduct;
    csom.user_deleteUserProduct = user_deleteUserProduct;
    csom.userDataChecker = user_userDataChecker;
    csom.productDuplicateChecker = user_productDuplicateChecker;
    csom.getUserForEdit = user_getUserForEdit;    
    csom.getAssociatedProductInfo = user_getAssociatedProductInfo;
    csom.updateUserInfo = user_updateUserInfo;
    csom.getUserRightsAccessLog = getUserRightsAccessLog;
    csom.sendEmailRequest = user_sendEmailRequest;
   
    csom.getStudy_StudyList = getStudy_StudyList;
    csom.study_updateStudy = study_updateStudy;
    csom.study_checkChanges = study_checkChanges;
    csom.createStudy_StudyList = createStudy_StudyList;
    csom.updateStudy_StudyList = updateStudy_StudyList;
    csom.getStudy_StudySponsorship = getStudy_StudySponsorship;
    csom.getStudy_StudyProduct = getStudy_StudyProduct;
    csom.getStudy_StudyBlindedStatus = getStudy_StudyBlindedStatus; 
    csom.study_createUserProductByProduct = study_createUserProductByProduct;
    csom.study_getUserProduct = study_getUserProduct;
    csom.study_updateUserProduct = study_updateUserProduct;
    csom.study_deleteUserProduct = study_deleteUserProduct;
    csom.getStudy_studyAwareINN = getStudy_studyAwareINN,
    csom.product_getProductList = product_getProductList;
    csom.product_getProductEntity = product_getProductEntity;
    csom.product_getAwareInn = product_getAwareInn;
    csom.product_getUser = product_getUser;
    csom.product_getUserProduct = product_getUserProduct;
    csom.product_createProduct = product_createProduct;
    csom.product_updateProduct = product_updateProduct;
    csom.product_createUserProduct = product_createUserProduct;
    csom.product_updateUserProduct = product_updateUserProduct;
    csom.product_deleteUserProduct = product_deleteUserProduct;

    csom.getProductEntityList = getProductEntityList;
    csom.getStudySponsorshipList = getStudySponsorshipList;
    csom.getUserEntityList = getUserEntityList;
    csom.awareStudyInnList = awareStudyInnList;
    csom.awareInnList = awareInnList;

    csom.checkStudyIfAssociatedToSusar = checkStudyIfAssociatedToSusar;
    csom.checkStudyIfAssociatedToSusarMigrated = checkStudyIfAssociatedToSusarMigrated;
    //csom.getAllSUSARMigratedAssociatedToStudy = getAllSUSARMigratedAssociatedToStudy;
    //csom.getAllSUSARAssociatedToStudy = getAllSUSARAssociatedToStudy;

    csom.checkProductEntityIfAssociatedToProduct = checkProductEntityIfAssociatedToProduct;
    csom.checkStudySponsorshipIfAssociatedToStudy = checkStudySponsorshipIfAssociatedToStudy;
    csom.checkUserEntityIfAssociatedToUser = checkUserEntityIfAssociatedToUser;
    csom.checkAwareStudyIfAssociatedToStudy = checkAwareStudyIfAssociatedToStudy;
    csom.checkAwareINNIfAssociatedToProduct = checkAwareINNIfAssociatedToProduct;

    csom.getAllUserProductList = getAllUserProductList;
    csom.getAllUserList = getAllUserList;

    csom.getAuditTrailProduct = getAuditTrailProduct;
    csom.getAuditTrailStudy = getAuditTrailStudy;
    csom.getAuditTrailUser = getAuditTrailUser;
    csom.getUserNotificationHistoryList = getUserNotificationHistoryList;
    csom.getProductNotificationHistoryList = getProductNotificationHistoryList;

    csom.addProductEntity = addProductEntity;
    csom.updateProductEntity = updateProductEntity;
    csom.addStudySponsorship = addStudySponsorship;
    csom.updateStudySponsorship = updateStudySponsorship;
    csom.addUserEntity = addUserEntity;
    csom.updateUserEntity = updateUserEntity;
    csom.addAWAREStudies = addAWAREStudies;
    csom.updateAwareStudy = updateAwareStudy;
    csom.addAWAREINN = addAWAREINN;
    csom.updateAWAREINN = updateAWAREINN;
    csom.getSourceInn = metaGetSourceINN;

    csom.getWelcomeMessage = getWelcomeMessage;
    csom.updateWelcomeMessage = updateWelcomeMessage;

    csom.getCoverLetterValue = getCoverLetterValue;
    csom.updateCoverLetter = updateCoverLetter;
    return csom;

    /************ COMMON ************/
    function getContext() {
        return SP.ClientContext.get_current();
    }
	/************ COVER LETTER tab ************/
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
    function updateCoverLetter(info, callback) {
    	var ctx = getContext();
    	var list = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.CONFIGLIST.LIST);
    	items = list.getItemById(info.data.id);
    	ctx.load(items);
    	items.set_item(COMM.PROPERTY.CONFIGLIST.VALUE, info.data.coverLetterValue);
    	items.set_item(COMM.PROPERTY.OWSHIDDENVERSION, info.data.objVersion);
    	items.update();
    	ctx.load(items)
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    	function onQuerySucceeded() {
    		callback({ error: false, updated: true });
    	}
    	function onQueryFailed(sender, args) {
    		console.error({ message: 'updateCoverLetter: ' + args.get_message(), error: true });
    		callback({ message: 'updateCoverLetter: ' + args.get_message(), error: true });
    	}
    }

    /************ USER tab ************/
    function user_getUserCountry(callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.COUNTRY.LIST);

        var camlQuery = new SP.CamlQuery();
        var query = '<View>' +
						'<Query>' +							
							'<OrderBy>' +
								'<FieldRef Name="ID" Ascending="TRUE"/>' +
							'</OrderBy>' +
						'</Query>' +
                        '<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.TITLE + '/>' +
                        '</ViewFields>' +
					'</View>';
        camlQuery.set_viewXml(query);
        var items = list.getItems(camlQuery);
        var row_info = ctx.loadQuery(items);
        ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

        function onQuerySucceeded() {
            var objArray = [];
            try {
                if (!row_info) throw 'No country data found';
                for (var i = 0; i < row_info.length; i++) {
                    objArray.push({
                        id: row_info[i].get_item(COMM.PROPERTY.ID),
                        country: row_info[i].get_item(COMM.PROPERTY.TITLE),
                    });
                }
            } catch (err) {
                callback(objArray, { message: err, error: false, noData: true });
                return;
            }
            callback(objArray, { error: false });           
        }

        function onQueryFailed(sender, args) {
            callback(objArray, { message: args.get_message(), error: true });
        }
    }

    function user_getUserStatus(callback) {
        var UserStatus = [
            { "UserStatusID": 1, "UserStatusName": "Active" },
            { "UserStatusID": 2, "UserStatusName": "Inactive" },
        ]
        callback(UserStatus);
    }

    function user_getUserProfile(callback) {
        var UserProfile = [
            { "UserProfileID": 1, "UserProfileName": "IS Admin" },
            { "UserProfileID": 2, "UserProfileName": "Bus Admin" },
            { "UserProfileID": 3, "UserProfileName": "Approver" },
            { "UserProfileID": 4, "UserProfileName": "CDSA" },
            { "UserProfileID": 5, "UserProfileName": "Read-Only" },
        ]
        callback(UserProfile);
    }
    
    function user_getUserEntity(callback) {   
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.USERENTITY.LIST);

        var camlQuery = new SP.CamlQuery();
        var query = '<View>' +
                         '<Query>' +
							'<Where>' +
								'<Eq>' +
                                    '<FieldRef Name="' + COMM.PROPERTY.USERENTITY.RETIRED + '"/>' +
                                    '<Value Type="Integer">' + 0 + '</Value>' +
                                '</Eq>' +
							'</Where>' +
                            '<OrderBy>' +
								'<FieldRef Name="ID" Ascending="FALSE"/>' +
                            '</OrderBy>' +
                         '</Query>' +
                         '<ViewFields>' +
                             '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                             '<FieldRef Name=' + COMM.PROPERTY.TITLE + '/>' +
                         '</ViewFields>' +
                '</View>';
        camlQuery.set_viewXml(query);
        var items = list.getItems(camlQuery);
        var row_info = ctx.loadQuery(items);
        ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

        function onQuerySucceeded() {
            var objArray = [];
            try {
                if (!row_info) throw 'No user entity found';
                for (var i = 0; i < row_info.length; i++) {
                    objArray.push({
                        UserEntityID: row_info[i].get_item(COMM.PROPERTY.ID),
                        UserEntityName: row_info[i].get_item(COMM.PROPERTY.TITLE)
                    });
                }                
            } catch (err) {
                callback(objArray, { message: 'User Entity: ' + err, error: false, noData: true });
                return;
            }
            callback(objArray, { error: false });
        }

        function onQueryFailed(sender, args) {
            callback(objArray, { message: args.get_message(), error: true });
        }
    }

    function user_getProductUserCreate(callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.PRODUCT.LIST);

        var camlQuery = new SP.CamlQuery();
        var query = '';
        query = '<View>' +
                       '<Query>' +
                           '<Where>' +
                               '<And>' +
                                    COMM.generateSpecialProductsQuery('And', 'Neq') +
                                    '<Neq>' +
                                        '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.STATUS + '/>' +
                                        '<Value Type="Text">' + COMM.PROPERTY.PRODUCT.RETIRED + '</Value>' +
                                    '</Neq>' +
                               '</And>' +
                           '</Where>' +
                           '<OrderBy>' +
                               '<FieldRef Name="Title" Ascending="TRUE"/>' +
                           '</OrderBy>' +
                       '</Query>' +
                       '<ViewFields>' +
                             '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +                           
                             '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.DILPRODUCT + '/>' +
                             '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.SUSAROPENGROUPID + '/>' +
                             '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.SUSARGROUPID + '/>' +
                        '</ViewFields>' +
                   '</View>';

        camlQuery.set_viewXml(query);
        var items = list.getItems(camlQuery);
        var row_info = ctx.loadQuery(items);
        ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

        function onQuerySucceeded() {
            var objArray = [];
            try {
                if (!row_info) throw 'No product data found';
                for (var i = 0; i < row_info.length; i++) {
                    objArray.push({
                        id: row_info[i].get_item(COMM.PROPERTY.ID),
                        refID: row_info[i].get_item(COMM.PROPERTY.ID),
                        productId: row_info[i].get_item(COMM.PROPERTY.ID),
                        dilProductName: row_info[i].get_item(COMM.PROPERTY.PRODUCT.DILPRODUCT),
                        susarOpenGroupId: row_info[i].get_item(COMM.PROPERTY.PRODUCT.SUSAROPENGROUPID),
                        susarGroupId: row_info[i].get_item(COMM.PROPERTY.PRODUCT.SUSARGROUPID),
                        objVersion: row_info[0].get_objectVersion(),
                    });
                }
            } catch (err) {
                callback(objArray, { message: err, error: false, noData: true });
                return;
            }           
            callback(objArray, { error: false });           
        }

        function onQueryFailed(sender, args) {
            callback(objArray, { message: args.get_message(), error: true });
        }
    }

    function user_getUserList(callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.USER.LIST);

        var camlQuery = new SP.CamlQuery();
        var query = '<View>' +
						'<Query>' +							
                            '<Where>' +
                                '<Neq>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.USER.STATUS + '/>' +
                                    '<Value Type="Text">Pending</Value>' +
                                '</Neq>' +
                            '</Where>' +
                                '<OrderBy>' +
								    '<FieldRef Name="ID" Ascending="FALSE"/>' +
							    '</OrderBy>' +
						'</Query>' +
                        '<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USER.COUNTRY + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USER.NAME + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USER.PROFILE + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USER.ENTITY + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USER.STATUS + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.MODIFIED + '/>' +
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
                    var obj = {
                        id: row_info[i].get_item(COMM.PROPERTY.ID),
                        country: (function () {
                            var str = "";
                            str = row_info[i].get_item(COMM.PROPERTY.USER.COUNTRY);
                            str = str.replace(/;/g, ",");
                            return str;
                        }()),
                        countryName: (function () {
                            var arr = [];
                            var a = row_info[i].get_item(COMM.PROPERTY.USER.COUNTRY) ? row_info[i].get_item(COMM.PROPERTY.USER.COUNTRY) : '';
                            arr = a.split('; ');
                            return arr;
                        }()),
                        userId: (row_info[i].get_item(COMM.PROPERTY.USER.NAME)) ? row_info[i].get_item(COMM.PROPERTY.USER.NAME).get_lookupId() : 0,
                        userName: (row_info[i].get_item(COMM.PROPERTY.USER.NAME)) ? row_info[i].get_item(COMM.PROPERTY.USER.NAME).get_lookupValue() : '',
                        userProfile: row_info[i].get_item(COMM.PROPERTY.USER.PROFILE),
                        userEntity: row_info[i].get_item(COMM.PROPERTY.USER.ENTITY),
                        userStatus: row_info[i].get_item(COMM.PROPERTY.USER.STATUS),
                        modified: row_info[i].get_item(COMM.PROPERTY.MODIFIED),
                        objVersion: row_info[i].get_objectVersion(),
                    };
                    obj.countryString = obj.countryName.join(', ');
                    objArray.push(obj);
                }                
            } catch (err) {
                callback(objArray, { message: err, error: false, noData: true });
                return;
            }
            callback(objArray);            
        }

        function onQueryFailed(sender, args) {
            callback({ message: args.get_message(), error: true });
        }
    }
    
    function user_userDataChecker(info, callback) {        
        var duplicate = null;
        var userObj = [];        
        //split sp picker generated user info to object array understandble
        var userObjTrim = info.userName.split(';#');
        for (var j = 0; j < userObjTrim.length ; j++) {
            if (j % 2 !== 0) {
                userObj = {
                    userId: userObjTrim[j - 1],
                    userName: userObjTrim[j],
                };
            }
        }
        //sets if product grid on create/edit user is visible
        //if visible if creator access the Users Tab, Products Tab if none        
        if (info.editMode) {
            callback({ error: false });
        } else {
            userNameDuplicateChecker(userObj, info, callback);
        }  
        //Function to check for duplicate
        function userNameDuplicateChecker(userObj, info, callback) {
            var ctx = getContext();
            var web = ctx.get_web(),
                list = web.get_lists().getByTitle(COMM.PROPERTY.USER.LIST);
            var camlQuery = new SP.CamlQuery();
            query = '<View>' +
                        '<Query>' +
                            '<Where>' +
                                '<Eq>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.USER.NAME + ' LookupId="TRUE"/>' +
                                    '<Value Type="Lookup">' + userObj.userId + '</Value>' +
                                '</Eq>' +
                            '</Where>' +
                        '</Query>' +
                        '<ViewFields>' +
                        '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +                        
                        '</ViewFields>' +
                      '</View>';
            camlQuery.set_viewXml(query);
            var items = list.getItems(camlQuery);
            var row_info = ctx.loadQuery(items);
            ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

            function onQuerySucceeded() {
                if (row_info.length !== 0) {
                    callback({ hasDuplicate: true, error: true }); //return duplicate if existing
                } else {
                    callback({ error: false }); 
                }
            }
        }      

        function onQueryFailed(sender, args) {
            callback({ message: args.get_message(), error: true, SPError: true });
        }
    }
    
    function user_productDuplicateChecker(info, callback) {
        var product = [];
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.PRODUCT.LIST);
        //query for product list
        var camlQuery = new SP.CamlQuery();
        var query = '<View>' +
                       '<Query>' +
                           '<Where>' +
                               '<Eq>' +
                                   '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                                   '<Value Type="Integer">' + info.newUserLinkProductID + '</Value>' +
                               '</Eq>' +
                           '</Where>' +
                       '</Query>' +
                        '<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.DILPRODUCT + '/>' +
                        '</ViewFields>' +
                   '</Vie>';
        camlQuery.set_viewXml(query);
        var items = list.getItems(camlQuery);
        var row_info = ctx.loadQuery(items);
        ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

        function onQuerySucceeded() {
            //get returned product information
            try {
                if (!row_info) throw 'No Data Found';
                product = {
                    id: row_info[0].get_item(COMM.PROPERTY.ID),
                    dilproduct: row_info[0].get_item(COMM.PROPERTY.PRODUCT.DILPRODUCT)
                };
            } catch (err) {
                callback({ error: true, message: "No Data Found" });
                return;
            }
            productDuplicateCheck(product, info);           
        }

        function productDuplicateCheck(product, info) {
            var hasMatch = false;
            //compare value from display to sharepoint data
            for (var i = 0; i < info.previousProductListData.length; i++) {
                if (info.previousProductListData[i].dilProductName === product.dilproduct) {
                    hasMatch = true;
                }
            }
            if (hasMatch) {
                callback({ error: true, hasDuplicate: true})
            } else {
                callback({ error: false });
            }
        }

        function onQueryFailed(sender, args) {
            callback({ message: args.get_message(), error: true });
        }
    }

    function user_createEntry(info, callback) {
        var countryCollection = '';
        var ctx = getContext();
        var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.USER.LIST);
        var itemCreateInfo = new SP.ListItemCreationInformation();
        //activate add item feature
        var oListItem = oList.addItem(itemCreateInfo);

        //loop through multiple country values
        for (var i = 0; i < info.usercountry.length; i++) {
            if (i !== info.usercountry.length-1) {
                countryCollection += info.usercountry[i] + '; ';
            } else {
                countryCollection += info.usercountry[i];
            }
        }

        //add item 
        oListItem.set_item(COMM.PROPERTY.USER.NAME, info.userName);
        oListItem.set_item(COMM.PROPERTY.USER.PROFILE, info.userProfile);
        oListItem.set_item(COMM.PROPERTY.USER.ENTITY, info.userEntity);
        oListItem.set_item(COMM.PROPERTY.USER.COUNTRY, countryCollection.trim());

        (info.userStatus.toUpperCase() === "INACTIVE") ?
                oListItem.set_item(COMM.PROPERTY.USER.STATUS, "Pending") :
                oListItem.set_item(COMM.PROPERTY.USER.STATUS, info.userStatus);

        oListItem.update();
        ctx.load(oListItem);
        ctx.executeQueryAsync(saveUserSucceeded, onQueryFailed);

        function saveUserSucceeded() {
            //get newly created row SP id
            var id = oListItem.get_id();

            //commented code and moved to next queue
            //COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.CREATEUSER, [{ data: id }], function (r) {
            //    if (r.error) {
            //        console.error(r.message);
            //    }
                //get complete user name, this will be used in saving access log
                var userObj = info.userName.split(";#");
                info.userName2 = userObj[1];
                info.userListId = id;
                COMM.getUserProperties(userObj[0], function (r) {
                    if (!r.error) {                       
                        info.accountName = r.loginName;  
                        user_saveToUserProductList(info, callback);
                    } else {
                        console.error(r.message);
                user_saveToUserProductList(info, callback);
                    }
                });
                //pass to save user product list 
            //});
        }        

        function onQueryFailed(sender, args) {
            callback({ message: 'user_createEntry: ' + args.get_message(), error: true });
        }
    }

    function user_saveToUserProductList(info, callback) {       
        info.errorArray = [];
        //Additional row if user has all open product access
        if (info.userProductAllOpen) {
            info.userProductData.push({
                id: 0,
                refID: 0,
                dilProductName: 0,
                access: "AllOpen"
            });
        }

        if (info.userProductAllBlinded) {
            info.userProductData.push({
                id: 0,
                refID: 0,
                dilProductName: 0,
                access: "AllBlinded"
            });
        }

        if (info.userProductData.length > 0) {                        
            var errorArray = [];
            var userProductQueue = info.userListId + ";";           
            
            for (var i = 0; i < info.userProductData.length; i++){
                //write to user product list
                //SERVICE is responsible for writing security permissions and user access log
                if (i < info.userProductData.length-1) {
                    userProductQueue += info.userProductData[i].id + ":" + info.userProductData[i].access + ",";
                } else {
                    userProductQueue += info.userProductData[i].id + ":" + info.userProductData[i].access;
                }
            }
            COMM.user_addToUserProduct(COMM.PROPERTY.QUEUELIST.CREATEUSER, userProductQueue, function (r) {
                if (r.error) {
                    errorArray.push({ error: true, message: r.message })
                }                
                info.errorArray.concat(errorArray);
                user_assignUserToPermissionGroups(info, callback);
                
            });
            
        } else {
            user_assignUserToPermissionGroups(info, callback);
        }  
    }
    
    function user_assignUserToPermissionGroups(info, callback) {        
        assignGroup(info, callback);
        //Assign to individual groups
        function assignGroup(info, callback) {
            var ctx = new SP.ClientContext();
            var web = ctx.get_web();
            var user = web.ensureUser(info.accountName ? info.accountName : info.userName2); // user name
            ctx.load(user);

            //add to read only group
            if (info.userProfile) {
                var siteGroupsREAD = web.get_siteGroups();
                var spGroupREAD = siteGroupsREAD.getById(COMM.getStaticGroups[7].securityGroupId);  //Read Only group ID                 
                var userCollectionREAD = spGroupREAD.get_users();
                userCollectionREAD.addUser(user);
                ctx.load(spGroupREAD);
            }

            //check if user has all open access
            if (info.userProductAllOpen) {
                var siteGroupsALLOPEN = web.get_siteGroups();
                var spGroupALLOPEN = siteGroupsALLOPEN.getById(COMM.getStaticGroups[6].securityGroupId);  //All Open group ID                 
                var userCollectionALLOPEN = spGroupALLOPEN.get_users();
                userCollectionALLOPEN.addUser(user);
                ctx.load(spGroupALLOPEN);
            }

            //check if user has all blinded access
            if (info.userProductAllBlinded) {
                var siteGroupsALLBLD = web.get_siteGroups();
                var spGroupALLBLD = siteGroupsALLBLD.getById(COMM.getStaticGroups[8].securityGroupId);  //All Blinded group ID                 
                var userCollectionALLBLD = spGroupALLBLD.get_users();
                userCollectionALLBLD.addUser(user);
                ctx.load(spGroupALLBLD);
            }

            //Assign user to groups according to profile
            if (info.userProfile === "IS Admin") { 
                var siteGroups = web.get_siteGroups();                
                var spGroup = siteGroups.getById(COMM.getStaticGroups[1].securityGroupId);  //static is admin group id                
                var userCollection = spGroup.get_users();
                userCollection.addUser(user);                
                ctx.load(spGroup);

                //All Admin group
                var siteGroupsA = web.get_siteGroups();
                var spGroupA = siteGroupsA.getById(COMM.getStaticGroups[5].securityGroupId)
                var userCollectionA = spGroupA.get_users();
                userCollectionA.addUser(user);
                ctx.load(spGroupA);

                ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
                function onQuerySucceeded() {
                    user_setSecurityPermToSpecialGrps(info, callback);
                }
            } else if (info.userProfile === "Approver") {

                var siteGroups = web.get_siteGroups();
                var spGroup = siteGroups.getById(COMM.getStaticGroups[2].securityGroupId);  //static approver group id               
                var userCollection = spGroup.get_users();
                userCollection.addUser(user);
                ctx.load(spGroup);

                ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
                function onQuerySucceeded() {
                    user_setSecurityPermToSpecialGrps(info, callback);
                }
            } else if (info.userProfile === "Bus Admin") {
                var siteGroups = web.get_siteGroups();               
                var spGroup = siteGroups.getById(COMM.getStaticGroups[3].securityGroupId); //static bus admin group id
                var userCollection = spGroup.get_users();
                userCollection.addUser(user);               
                ctx.load(spGroup);

                //All Admin group
                var siteGroupsA = web.get_siteGroups();
                var spGroupA = siteGroupsA.getById(COMM.getStaticGroups[5].securityGroupId)
                var userCollectionA = spGroupA.get_users();
                userCollectionA.addUser(user);
                ctx.load(spGroupA);

                ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
                function onQuerySucceeded() {                   
                     user_setSecurityPermToSpecialGrps(info, callback);
                }
            }  else if (info.userProfile === "CDSA") {                
                var siteGroups = web.get_siteGroups();              
                var spGroup = siteGroups.getById(COMM.getStaticGroups[4].securityGroupId);  // static cdsa group id    
                var userCollection = spGroup.get_users();
                userCollection.addUser(user);

                ctx.load(spGroup);
                ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
                function onQuerySucceeded() {
                    user_setSecurityPermToSpecialGrps(info, callback);
                }
            } else {
                ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
                function onQuerySucceeded() {
                    user_setSecurityPermToSpecialGrps(info, callback);
                }
            }
            function onQueryFailed(sender, args) {
                callback({ message: "getStaticGroups: " + args.get_message(), error: true });
            }
        }
    }
    
    function user_setSecurityPermToSpecialGrps(info, callback) {
        "use strict";
        try {
            if (!info.userProductData) throw "No Product Data Found"
            callback({ error: false, newID: info.userListId, batchProcessError: info.errorArray });
            //setReadSecurity(info, callback);
            //set read recurity has been modified, batched through the user_saveToUserProductList function
        } catch (err) {
            callback({ message: "User setSecurityPermToSpecialGrps: " + err, error: true });
        }
    }
       
    function user_getUserForEdit(info, callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.USER.LIST);

        var userInfoList = web.get_siteUserInfoList();

        //get information of user for update
        var camlQuery = new SP.CamlQuery();
        var query = '<View>' +
                        '<Query>' +
                            '<Where>' +
                                '<And>' +                                    
                                    '<Eq>' +
                                        '<FieldRef Name="ID"/>' +
                                        '<Value Type="Text">' + info.id + '</Value>' +
                                    '</Eq>' +
                                    '<Eq>' +
                                        '<FieldRef Name="Name" LookupId="TRUE"/>' +
                                        '<Value Type="Lookup">' + info.userID + '</Value>' +
                                    '</Eq>' +                                                                     
                                '</And>' +
                            '</Where>' +                            
                         '</Query>' +
                         '<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USER.COUNTRY + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USER.NAME + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USER.PROFILE + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USER.ENTITY + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USER.STATUS + '/>' +                            
                         '</ViewFields>' +
                    '</View>';
        camlQuery.set_viewXml(query);
        var items = list.getItems(camlQuery);
        var row_info = ctx.loadQuery(items);
        ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

        function onQuerySucceeded() {
            //returns specific info of the user, stored to an object
            if (row_info.length === 1) {
                var obj = {
                    id: row_info[0].get_item(COMM.PROPERTY.ID),
                    country: row_info[0].get_item(COMM.PROPERTY.USER.COUNTRY),
                    userId: (row_info[0].get_item(COMM.PROPERTY.USER.NAME)) ? row_info[0].get_item(COMM.PROPERTY.USER.NAME).get_lookupId() : 0,
                    userName: (row_info[0].get_item(COMM.PROPERTY.USER.NAME)) ? row_info[0].get_item(COMM.PROPERTY.USER.NAME).get_lookupValue() : '',
                    userProfile: row_info[0].get_item(COMM.PROPERTY.USER.PROFILE),
                    userEntity: row_info[0].get_item(COMM.PROPERTY.USER.ENTITY), 
                    userStatus: (function () {
                        if (row_info[0].get_item(COMM.PROPERTY.USER.STATUS)) {
                            var status = row_info[0].get_item(COMM.PROPERTY.USER.STATUS);
                            if(status.toUpperCase() === "REQUESTED"){
                                return "Inactive";
                            }else{
                                return status;    
                            }                              
                        } else {
                            return "";
                        }    
                    }()),
                    objVersion: row_info[0].get_objectVersion(),
                };  
                getUserSPDetails(obj, callback);
            } else if(row_info.length > 1){
                //if multiple info is returned
                callback({ message: "Two are more user information under the same name returned, please check data.", error: true });
            }  else {
                //if no data available
                callback({ message: "No Data Found", error: true });
            }
        }

        //SP services function to get user's email address
        function getUserSPDetails(obj, callback) {           
            COMM.getUserProperties(obj.userId, function (r){
                if (!r.error) {
                    obj.emailAddress = r.email;
                    obj.department = r.department;
                    obj.accountName = r.loginName;
            callback(obj);
                } else {
                    console.error(r.message);
                    callback(obj);                    
                }            
            });
        }

        function onQueryFailed(sender, args) {
            callback({ message: args.get_message(), error: true });
        }              
    }

    function user_getAssociatedProductInfo(info, callback) {
        var tempArr = [];
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.USERPRODUCT.LIST);
        //query user products that are related to the user for update
        var camlQuery = new SP.CamlQuery();
        query = '<View>' +
                        '<Query>' +
                            '<Where>' +
                                '<Eq>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.USER + ' LookupId="TRUE"/>' +
                                    '<Value Type="Lookup">' + info.userId + '</Value>' +
                                '</Eq>' +
                            '</Where>' +
                        '</Query>' +
                        '<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +                           
                            '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.DILPRODUCT + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.SUSARGROUPID + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.SUSAROPENGROUPID + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.ACCESS + '/>' +                            
                         '</ViewFields>' +
                    '</View>';
        camlQuery.set_viewXml(query);
        var items = list.getItems(camlQuery);
        var row_info = ctx.loadQuery(items);
        ctx.executeQueryAsync(UserProductSuccess, onQueryFailed);

        function UserProductSuccess() {
            var selectedProdArr = [];
            //if has user product info, store to an array, these are information thats already existing
            if (row_info.length !== 0) {                
                for (var i = 0; i < row_info.length; i++) {
                    selectedProdArr.push({
                        id: row_info[i].get_item(COMM.PROPERTY.ID),
                        refID: row_info[i].get_item(COMM.PROPERTY.ID),
                        dilProductName: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT).get_lookupValue() : '',
                        productId: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT).get_lookupId().toString() : '',
                        access: row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.ACCESS),
                        susarOpenGroupId: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.SUSAROPENGROUPID)) ? Math.floor(row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.SUSAROPENGROUPID).get_lookupValue()) : 0,
                        susarGroupId: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.SUSARGROUPID)) ? Math.floor(row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.SUSARGROUPID).get_lookupValue()) : 0,
                        objVersion: row_info[0].get_objectVersion(),
                    });                    
                }
                //proceed to function that going to filter this data to all available products
                callback(info, selectedProdArr, { error: false });
            } else {
                //return blank if no available products linke to user
                callback(info, selectedProdArr, { error: false });
            }
        }        
        function onQueryFailed(sender, args) {
            callback({error: true}, {error: true}, { message: "user_getAssociatedProductInfo: " + args.get_message(), error: true });
        }
    }

    function user_updateUserInfo(info, callback) {
        info.errorArray = [];
        checkChanges(info, callback);
        //This function checks if changes are made on user profile
        //Exits the process if no changes are made
        //To prevent audit log recording if no changes are made on user profile.
        function checkChanges(info, callback) {
            var countryChange = false,
                productChange = false;

            var tempProdUpdate = [];
            for (var y = 0; y < info.origData.products.length; y++) {
                tempProdUpdate.push(info.origData.products[y].dilProductName)               
            }
            for (var x = 0; x < info.userProductDataUpdate.length; x++) {                
                if (!Array.contains(tempProdUpdate, info.userProductDataUpdate[x].dilProductName)) {
                    productChange = true;                    
                }

                for (var v = 0; v < info.origData.products.length; v++) {
                    if(info.userProductDataUpdate[x].dilProductName === info.origData.products[v].dilProductName &&
                       info.userProductDataUpdate[x].access !== info.origData.products[v].access) {
                        productChange = true;                        
                    }
                }                               
            }

            //if product link is cleared
            if (info.origData.products.length !== info.userProductDataUpdate.length) {
                productChange = true;
            }
            
            //check if user infomation has changed
            if (info.usercountry.length !== info.origData.countryObj.length) {
                info.hasCountryChange = true;
                if (productChange) {
                    info.hasUserProductChange = true;                  
                    updateUserInfo(info, callback);
                } else {
                    updateUserInfo(info, callback);
                }                
            } else {
                var tempCountryUpt = [];
                for (var y = 0; y < info.usercountry.length; y++) {
                    tempCountryUpt.push(info.usercountry[y]);
                }
                for (var x = 0; x < info.origData.countryObj.length; x++) {
                    if (!Array.contains(tempCountryUpt, info.origData.countryObj[x])) {
                        countryChange = true;
                    }
                }
                if (countryChange) {
                    info.hasCountryChange = true;
                    if (info.userProductAllOpen === info.origData.userProductAllOpen &&
                        info.userProductAllBlinded === info.origData.userProductAllBlinded) {                       
                        if (productChange) {
                            info.hasUserProductChange = true;                           
                            updateUserInfo(info, callback);
                        } else {
                            updateUserInfo(info, callback);
                        }
                    } else {
                        info.hasUserProductChange = true;
                        updateUserInfo(info, callback);
                    }                        
                } else {
                    if (info.userEntity === info.origData.userEntity &&
                        info.userProfile === info.origData.userProfile &&
                        info.userStatus === info.origData.userStatus)
                    {
                        if (info.userProductAllOpen === info.origData.userProductAllOpen &&
                        info.userProductAllBlinded === info.origData.userProductAllBlinded)
                        {
                            if (productChange) {
                                info.hasUserProductChange = true;
                                info.hasNoChangeInUserInfo = true;
                                updateUserInfo(info, callback);
                            } else {
                                callback({ error: false });
                            }                            
                        } else {                            
                            info.hasUserProductChange = true;
                            updateUserInfo(info, callback);
                        }                       
                    } else {
                        if (info.userProductAllOpen === info.origData.userProductAllOpen &&
                        info.userProductAllBlinded === info.origData.userProductAllBlinded) {
                            if (productChange) {
                                info.hasUserProductChange = true;                                
                                updateUserInfo(info, callback);
                            } else {
                                updateUserInfo(info, callback);
                            }
                            
                        } else {
                            info.hasUserProductChange = true;
                            updateUserInfo(info, callback);
                        }
                    }
                }
            }            
        }

        function updateUserInfo(info, callback){
            //Takes values for user update
            if (info.hasNoChangeInUserInfo) {
                var queueData = {
                    "UserRowID": info.userListId,
                    "UserEntity": "",
                    "UserProfile": "",
                    "Country": ""
                };               
                updateAddGrid(info, queueData, callback);
            } else {
                var countryCollection = '';
                var ctx = getContext();
                var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.USER.LIST);

                var oListItem = oList.getItemById(info.userListId);
                ctx.load(oListItem);
                ctx.executeQueryAsync(function () {
                    //loop through multiple country values
                    for (var i = 0; i < info.usercountry.length; i++) {
                        if (i !== info.usercountry.length - 1) {
                            countryCollection += info.usercountry[i] + '; ';
                        } else {
                            countryCollection += info.usercountry[i];
                        }
                    }
                    //Update User Values
                    oListItem.set_item(COMM.PROPERTY.USER.NAME, info.userName);
                    oListItem.set_item(COMM.PROPERTY.USER.PROFILE, info.userProfile);
                    oListItem.set_item(COMM.PROPERTY.USER.ENTITY, info.userEntity);
                    oListItem.set_item(COMM.PROPERTY.USER.COUNTRY, countryCollection);
                    oListItem.set_item(COMM.PROPERTY.OWSHIDDENVERSION, info.objVersion);
                    (info.userStatus.toUpperCase() === "INACTIVE") ?
                        oListItem.set_item(COMM.PROPERTY.USER.STATUS, "Pending") :
                        oListItem.set_item(COMM.PROPERTY.USER.STATUS, info.userStatus);

                    oListItem.update();
                    ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
                }, onQueryFailed);

                function onQuerySucceeded() {
                    if (info.userStatus.toUpperCase() === "INACTIVE") {
                        COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.DISABLEUSER, [{ data: info.userListId }], function (r) {
                            if (r.error) {
                                callback({ error: false });//silent error
                            } else {
                                callback({ error: false });
                            }
                        });
                    } else {                        
                        if (info.origData.userStatus.toUpperCase() === "INACTIVE") {
                            //JSON Data Builder
                            var queueData = { "UserRowID": info.userListId };
                            var str = "";
                            queueData["UserEntity"] = info.userEntity;
                            queueData["UserProfile"] = info.userProfile;
                            for (var x = 0; x < info.usercountry.length; x++) {
                                if (x === info.usercountry.length - 1) {
                                    str += info.usercountry[x];
                                } else {
                                    str += info.usercountry[x] + ",";
                                }
                            }
                            queueData["Country"] = str;
                            //var userInfoQueue = JSON.stringify(data);

                            //COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.MODIFYUSER, [{ data: userInfoQueue }], function (r) {
                            //    if (r.error) {
                            //        console.error(r.message);
                            //        info.errorArray = [{ error: true, message: r.message }];
                            //    }
                            //    updateAddGrid(info, callback);
                            //});
                            updateAddGrid(info, queueData, callback);
                        } else {
                            //JSON Data Builder
                            var queueData = { "UserRowID": info.userListId };
                            (info.userEntity !== info.origData.userEntity) ? queueData["UserEntity"] = info.userEntity : queueData["UserEntity"] = "";
                            (info.userProfile !== info.origData.userProfile) ? queueData["UserProfile"] = info.userProfile : queueData["UserProfile"] = "";
                            if (info.hasCountryChange) {
                                var str = "";
                                for (var x = 0; x < info.usercountry.length; x++) {
                                    if (x === info.usercountry.length - 1) {
                                        str += info.usercountry[x];
                                    } else {
                                        str += info.usercountry[x] + ",";
                                    }
                                }
                                queueData["Country"] = str;
                            } else {
                                queueData["Country"] = "";
                            }

                            //var userInfoQueue = JSON.stringify(data);
                            //COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.MODIFYUSER, [{ data: userInfoQueue }], function (r) {
                            //    if (r.error) {
                            //        console.error(r.message);
                            //        info.errorArray = [{ error: true, message: r.message }];
                            //    }
                            //    updateAddGrid(info, callback);
                            //});
                            updateAddGrid(info, queueData, callback);
                       }
                    }
                }
            }
        }

        //Update - Add - Place Group Permission 
        function updateAddGrid(info, queueData, callback) {

            if (info.hasUserProductChange) {
                if (info.userProductAllOpen) {
                    info.userProductDataUpdate.push({
                        id: 0,
                        refID: 0,
                        productId: 0,
                        access: "AllOpen",
                        dilProductName: 0
                    });
                }
                if (info.userProductAllBlinded) {
                    info.userProductDataUpdate.push({
                        id: 0,
                        refID: 0,
                        productId: 0,
                        access: "AllBlinded",
                        dilProductName: 0
                    });
                }               
                if (info.userProductDataUpdate.length !== 0) {                   
                    var errorArray = [];
                    var userProductQueue = "";
                    var userInfoQueue = "";

                    //write to user product list
                    //SERVICE is responsible for writing security permissions and user access log
                    for(var i = 0; i<info.userProductDataUpdate.length; i++) {                        
                        if (i < info.userProductDataUpdate.length - 1) {
                            userProductQueue += info.userProductDataUpdate[i].productId + ":" + info.userProductDataUpdate[i].access + ",";
                        } else {
                            userProductQueue += info.userProductDataUpdate[i].productId + ":" + info.userProductDataUpdate[i].access;
                        }
                    }

                    //merge with user modified data
                    queueData["Products"] = userProductQueue;
                    userInfoQueue = JSON.stringify(queueData);
                    writeToQueue(info, userInfoQueue, callback);
                } else {
                    //if no product changes, write user changes to queue
                    queueData["Products"] = "";
                    userInfoQueue = JSON.stringify(queueData);
                    writeToQueue(info, userInfoQueue, callback);
                }
            } else {
                //if no product changes, write user changes to queue
                queueData["Products"] = "";
                userInfoQueue = JSON.stringify(queueData);
                writeToQueue(info, userInfoQueue, callback);
            }

            function writeToQueue(info, userInfoQueue, callback) {
                //send request to service
                COMM.user_addToUserProduct(COMM.PROPERTY.QUEUELIST.USERPRODUCTS, userInfoQueue, function (r) {
                    if (r.error) {
                        errorArray.push({ error: true, message: r.message })
                    }
                    info.errorArray.concat(errorArray);
                    addUserToStaticGroups(info, callback);
                });                
            }

        }
        
        function addUserToStaticGroups(info, callback) {
            var ctx = getContext();
            var web = ctx.get_web();
            var user = web.ensureUser(info.accountName ? info.accountName : info.userName2);
            ctx.load(user);

            //conditions for other user profiles
            if (info.userProfile === "IS Admin") {
                var siteGroups = web.get_siteGroups();
                var spGroup = siteGroups.getById(COMM.getStaticGroups[1].securityGroupId);
                var userCollection = spGroup.get_users();
                userCollection.addUser(user);
                ctx.load(spGroup);
            } else if (info.userProfile === "Approver") {
                var siteGroups = web.get_siteGroups();
                var spGroup = siteGroups.getById(COMM.getStaticGroups[2].securityGroupId);
                var userCollection = spGroup.get_users();
                userCollection.addUser(user);
                ctx.load(spGroup);
            } else if (info.userProfile === "Bus Admin") {
                var siteGroups = web.get_siteGroups();
                var spGroup = siteGroups.getById(COMM.getStaticGroups[3].securityGroupId);
                var userCollection = spGroup.get_users();
                userCollection.addUser(user);
                ctx.load(spGroup);
            } else if (info.userProfile === "CDSA") {
                var siteGroups = web.get_siteGroups();
                var spGroup = siteGroups.getById(COMM.getStaticGroups[4].securityGroupId);
                var userCollection = spGroup.get_users();
                userCollection.addUser(user);
                ctx.load(spGroup);
            }
            //execute, add batched items and assign to other groups depending to profile at the same time 
            ctx.executeQueryAsync(function () {
                var ctxA = new SP.ClientContext();
                var webA = ctxA.get_web();
                var user2 = webA.ensureUser(info.accountName ? info.accountName : info.userName2);
                ctxA.load(user2);

                //add to read only group
                if (info.userProfile) {
                    var siteGroupsREAD = web.get_siteGroups();
                    var spGroupREAD = siteGroupsREAD.getById(COMM.getStaticGroups[7].securityGroupId);  //Read Only group ID                 
                    var userCollectionREAD = spGroupREAD.get_users();
                    userCollectionREAD.addUser(user);
                    ctxA.load(spGroupREAD);
                }

                if (info.userProfile === "Bus Admin" || info.userProfile === "IS Admin") {
                    //All Admin group
                    var siteGroupsA = webA.get_siteGroups();
                    var spGroupA = siteGroupsA.getById(COMM.getStaticGroups[5].securityGroupId)
                    var userCollectionA = spGroupA.get_users();
                    userCollectionA.addUser(user2);
                    ctxA.load(spGroupA);
                    ctxA.executeQueryAsync(onSuccess, onQueryFailed);
                } else {
                    removeUserToStaticGroups(info, 1);
                }
            }, onQueryFailed);

            function onSuccess() {
                removeUserToStaticGroups(info, 1);
            }
        }
       
        //To remove users from static lists, the each susar/open group associate to the folder should be processed by recursive method
        //this is because if in bulk some of the groups will not get updated.
        //when removing users, error might occur if the user is not existing on the group
        function removeUserToStaticGroups(info, i) {
            var ctx = getContext();
            var web = ctx.get_web();
            if (COMM.getStaticGroups[i].groupName !== info.userProfile &&
                COMM.getStaticGroups[i].groupName !== "Dev" &&
                COMM.getStaticGroups[i].groupName !== "SQA" &&
                COMM.getStaticGroups[i].groupName !== "ReadOnly" &&
                COMM.getStaticGroups[i].groupName !== "AllOpen" &&
                COMM.getStaticGroups[i].groupName !== "AllBlinded") { //delete dev and sqa when in prod

                //Execeptions for All Admin
                if (info.userProfile === "Bus Admin" && COMM.getStaticGroups[i].groupName === "AllAdmin") {
                    if (i < COMM.getStaticGroups.length - 1) {
                        removeUserToStaticGroups(info, i + 1);
                    } else {
                        callback({ error: false, batchProcessError: info.errorArray });
                    }
                } else if (info.userProfile === "IS Admin" && COMM.getStaticGroups[i].groupName === "AllAdmin") {
                    if (i < COMM.getStaticGroups.length - 1) {
                        removeUserToStaticGroups(info, i + 1);
                    } else {
                        callback({ error: false, batchProcessError: info.errorArray });
                    }
                } else {
                    var siteGroups1 = web.get_siteGroups();
                    var spGroup1 = siteGroups1.getById(COMM.getStaticGroups[i].securityGroupId)
                    var userCollection1 = spGroup1.get_users();
                    var user1 = userCollection1.getById(info.userSPId);
                    userCollection1.remove(user1);
                    ctx.load(spGroup1);
                    ctx.executeQueryAsync(function () {
                        //on success
                        if (i < COMM.getStaticGroups.length - 1) {
                            removeUserToStaticGroups(info, i + 1);
                        } else {
                            callback({ error: false, batchProcessError: info.errorArray });
                        }
                    }, function (sender, args) {
                        //on fail
                        if (args.get_message().indexOf('User cannot be found') !== -1) {
                            if (i < COMM.getStaticGroups.length - 1) {
                                removeUserToStaticGroups(info, i + 1);
                            } else {
                                callback({ error: false, batchProcessError: info.errorArray });
                            }
                        } else {
                            callback({ message: args.get_message(), error: true });
                        }
                    });
                }
            } else {
                if (i < COMM.getStaticGroups.length - 1) {
                    removeUserToStaticGroups(info, i + 1);
                } else {
                    callback({ error: false, batchProcessError: info.errorArray });
                }
            }
        }
        
        function onQueryFailed(sender, args) {
            callback({ message: 'user_updateUserInfo: ' + args.get_message(), error: true });
        }
    }
    
    function user_getUserProduct(queryString, callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.USERPRODUCT.LIST);
        var selectedProdArr = [];
        getList(0);

        function getList(min) {
            var camlQuery = new SP.CamlQuery();
            query = '<View>' +
                            '<Query>' +
                                '<Where>' +
                                    '<And>' +
                                        '<Geq>' +
									        '<FieldRef Name=' + COMM.PROPERTY.ID + ' />' +
									        '<Value Type="Integer">' + min + '</Value>' +
								        '</Geq>' +
                                        '<Eq>' +
                                            '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.USER + ' LookupId="TRUE"/>' +
                                            '<Value Type="Lookup">' + queryString.userId + '</Value>' +
                                        '</Eq>' +
                                    '</And>' + 
                                '</Where>' +
                            '</Query>' +
                            '<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
                            '<ViewFields>' +
                                '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.USER + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.DILPRODUCT + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.ACCESS + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.SUSARGROUPID + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.SUSAROPENGROUPID + '/>' +
                            '</ViewFields>' +
                        '</View>';
            camlQuery.set_viewXml(query);
            var items = list.getItems(camlQuery);
            var row_info = ctx.loadQuery(items);
            ctx.executeQueryAsync(UserProductSuccess, onQueryFailed);

            function UserProductSuccess() {
                try {
                    if (!row_info) throw 'Row info is null';
                    for (var i = 0; i < row_info.length; i++) {
                        var product = (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT).get_lookupId() : 0;
                        if (product) {
                            selectedProdArr.push({
                                id: row_info[i].get_item(COMM.PROPERTY.ID),
                                userSPId: row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.USER).get_lookupId(),
                                productId: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT).get_lookupId() : 0,
                                dilProductName: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT).get_lookupValue() : '',
                                access: row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.ACCESS),
                                susarOpenGroupId: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.SUSAROPENGROUPID)) ? Math.floor(row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.SUSAROPENGROUPID).get_lookupValue()) : 0,
                                susarGroupId: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.SUSARGROUPID)) ? Math.floor(row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.SUSARGROUPID).get_lookupValue()) : 0,
                            });
                        }
                    }
                } catch (err) {
                    if (callback) callback({ message: 'user_getUserProduct: ' + err, error: true });
                    return;
                }

                if (row_info.length > 0 && row_info.length === COMM.PROPERTY.ROWLIMIT) {
                    getList(row_info[row_info.length - 1].get_item(COMM.PROPERTY.ID) + 1);
                } else {
                    if (callback) callback(selectedProdArr);;
                }
            }
        }

        function onQueryFailed(sender, args) {
            callback({ message: 'user_getUserProduct: ' + args.get_message(), error: true });
        }
    }
    
    function user_updateUserProduct(info, callback) {
        COMM.user_addToUserProduct(COMM.PROPERTY.QUEUELIST.EDITUSERPRODUCT, info.data.id, function (r) {
            if (!r.error) {
                callback({ error: false });
            } else {
                error.log("user_updateUserProduct: " + r.message);
                callback({ error: true, message: "user_updateUserProduct: " + r.message }); //silent fail
            }
        });
    }

    function user_deleteUserProduct(info, callback) {  
        COMM.user_addToUserProduct(COMM.PROPERTY.QUEUELIST.REMOVEUSERPRODUCT, info.data.id, function (r) {
            if (!r.error) {
                callback({ error: false });
            } else {
                error.log("user_deleteUserProduct: " + r.message);
                callback({ error: true, message: "user_deleteUserProduct: " + r.message }); //silent fail
            }
        }); 
    }
    
    function user_sendEmailRequest(info, callback) {
        var ctx = getContext();
        var web = ctx.get_web();
        var user = web.ensureUser(info.displayName);
        ctx.load(user);

        //update list
        var oList = web.get_lists().getByTitle(COMM.PROPERTY.USER.LIST);
        var oListItem = oList.getItemById(info.id);
        oListItem.set_item(COMM.PROPERTY.USER.EMAILREQUESTED, info.sendEmailRequest);
        oListItem.update();

        ctx.executeQueryAsync(Success, onQueryFailed);

        function Success() {
            COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.EMAILREQUESTED, [{ data: info.id }], function (r) {
                if (r.error) {
                    console.error(r.message);
                }
                callback({ error: false });
            });
        }

        function onQueryFailed(sender, args) {   
            callback({ message: 'user_sendEmailRequest: ' + args.get_message(), error: true });
        }

    }
    
	/************ STUDY tab ************/
    	/**  
        * @for - study id
        * @desc - source for dropdown list for study id.
        * @implementation - get list of study PV Database INN from PV Database INN list in sharepoint.
        * @author -  cri2x
    */
    function getStudy_studyAwareINN(callback) {
	
    	getStudyAwareINN(callback);

    	function getStudyAwareINN() {
    		var ctx = getContext();
    		var web = ctx.get_web(),
				list = web.get_lists().getByTitle(COMM.PROPERTY.AWARESTUDYINN.LIST);
    		var objArray = [];

    		getList(null);

    		function getList(itemPosition) {

    			//Set page position
    			var position = typeof itemPosition === 'undefined' ? null : itemPosition;
    			if (itemPosition !== null) {
    				position = new SP.ListItemCollectionPosition();
    				position.set_pagingInfo(itemPosition);
    			}

    			var camlQuery = new SP.CamlQuery();
    			camlQuery.set_listItemCollectionPosition(position);
    			var query = '';
    			query = '<View>' +
							'<Query>' +
								'<OrderBy>' +
									'<FieldRef Name="ID" Ascending="TRUE"/>' +
								'</OrderBy>' +
							'</Query>' +
							'<ViewFields>' +
								'<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
								'<FieldRef Name=' + COMM.PROPERTY.TITLE + '/>' +
								'<FieldRef Name=' + COMM.PROPERTY.AWARESTUDYINN.RETIRED + '/>' +
							'</ViewFields>' +
							'<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
						'</View>';
    			camlQuery.set_viewXml(query);
    			var items = list.getItems(camlQuery);
    			row_info = ctx.loadQuery(items);

    			ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    		}

    		function onQuerySucceeded() {
    			try {
    				for (var i = 0; i < row_info.length; i++) {
    					objArray.push({
    						id: row_info[i].get_item(COMM.PROPERTY.ID),
    						studyInn: row_info[i].get_item(COMM.PROPERTY.TITLE),
    						retired: row_info[i].get_item(COMM.PROPERTY.AWARESTUDYINN.RETIRED),
    					});
    				}
    			}
    			catch (error) {
    				console.log(error);
    			}

    			if (row_info.length > 0 && row_info.length === COMM.PROPERTY.ROWLIMIT) {
    				getList(COMM.PROPERTY.PAGINGINFOPREFIX + row_info[row_info.length - 1].get_item(COMM.PROPERTY.ID));
    			} else {
					//filter out retired aware study inn
    				var awareArray = [];
    				var j = 0;
    				for (var i = 0; i < objArray.length; i++) {
    					if (objArray[i].retired !== true) {
    						awareArray[j] = objArray[i];
							j++
    					}
    				}
    				callback(awareArray);
    			}

    		}

    		function onQueryFailed(sender, args) {
    			console.error({ message: 'studyGetAwareInn: ' + args.get_message(), error: true });
    			callback({ message: 'studyGetAwareInn: ' + args.get_message(), error: true });
    		}
    	}

    }
    
    function study_getUserProduct(queryString, callback) {

    	getList(null);

    	function getList(itemPosition) {
    		var ctx = getContext();
    		var web = ctx.get_web(),
				list = web.get_lists().getByTitle(COMM.PROPERTY.USERPRODUCT.LIST);

    		var position = typeof itemPosition === 'undefined' ? null : itemPosition;
    		if (itemPosition !== null) {
    			position = new SP.ListItemCollectionPosition();
    			position.set_pagingInfo(itemPosition);
    		}

    		var camlQuery = new SP.CamlQuery();
    		camlQuery.set_listItemCollectionPosition(position);
    		var query = '';
    		query = '<View>' +
					   '<Query>' +
							'<Where>' +
								'<Eq>' +
									'<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.PRODUCTID + ' LookupId="TRUE"/>' +
									'<Value Type="Lookup">' + queryString.productId + '</Value>' +
								'</Eq>' +
							'</Where>' +
					   '</Query>' +
				   '</View>';
    		camlQuery.set_viewXml(query);
    		var items = list.getItems(camlQuery);
    		var row_info = ctx.loadQuery(items);
    		ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    		function onQuerySucceeded() {
    			var objArray = [];
    			for (var i = 0; i < row_info.length; i++) {
    				objArray.push({
    					id: row_info[i].get_item(COMM.PROPERTY.ID),
    					userRefId: row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.USERID).get_lookupId(),
    					userId: row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.USER).get_lookupId(),
    					userName: row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.USER).get_lookupValue(),
    					productID: row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.PRODUCTID).get_lookupId(),
    					productName: row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.PRODUCTID).get_lookupValue(),
    					access: row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.ACCESS),
    					dilProductId: row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT).get_lookupId(),
    					dilProductName: row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT).get_lookupValue(),
    					objVersion: row_info[i].get_objectVersion(),
    				});
    			}

    			if (row_info.length > 0 && row_info.length === COMM.PROPERTY.ROWLIMIT) {
    				getList(COMM.PROPERTY.PAGINGINFOPREFIX + row_info[row_info.length - 1].get_item(COMM.PROPERTY.ID));
    			} else {
    				callback(objArray);
    			}
    		}

    		function onQueryFailed(sender, args) {
    			console.error({ message: 'studyGetProduct: ' + args.get_message(), error: true });
    			callback({ message: 'studyGetProduct: ' + args.get_message(), error: true });
    		}
    	}
    }

    //function study_updateUserProduct(info, callback) {
    //	updateUserProductItem(info, callback);


    //	function updateUserProductItem(info, callback) {
    //		var ctx = getContext();
    //		var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.USERPRODUCT.LIST);
    //		var oListItem = oList.getItemById(info.data.id);

    //		oListItem.set_item(COMM.PROPERTY.USERPRODUCT.ACCESS, info.data.access);
    //		oListItem.set_item(COMM.PROPERTY.OWSHIDDENVERSION, info.data.objVersion);

    //		oListItem.update();
    //		ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    //		function onQuerySucceeded() {
    //		    if (callback) callback({ data: info, error: false });
    //		}

    //		function onQueryFailed(sender, args) {
    //			console.error({ message: 'studyUpdateUserProduct: ' + args.get_message(), error: true });
    //			callback({ message: 'studyUpdateUserProduct: ' + args.get_message(), error: true });
    //		}
    //	}

    //}

    function study_updateUserProduct(info, callback) {
    	COMM.user_addToUserProduct(COMM.PROPERTY.QUEUELIST.EDITUSERPRODUCT, info.data.id, function (r) {
    		if (!r.error) {
    			callback({ error: false });
    		} else {
    			error.log("studyUpdateUserProduct: " + r.message);
    			callback({ error: true, message: "studyUpdateUserProduct: " + r.message }); //silent fail
    		}
    	});
    }

    function study_deleteUserProduct(info, callback) {
    	COMM.user_addToUserProduct(COMM.PROPERTY.QUEUELIST.REMOVEUSERPRODUCT, info.data.id, function (r) {
    		if (!r.error) {

    			callback({ error: false });
    		} else {
    			error.log("studyRemoveUserProduct: " + r.message);
    			callback({ error: true, message: "studyRemoveUserProduct: " + r.message }); //silent fail
    		}
    	});
    }

    function study_createUserProductByProduct(info, callback) {
        info.errorArray = [];
        checkValues(info, callback);

        function checkValues(info, callback) {
            var forUpdate = [];
            var forCreate = [];
            var forRemove = [];

            if (info.previousSelectedData.length > 0) {
                if (info.users.length > 0) {
                    //for create and update
                    for (var i = 0; i < info.users.length; i++) {
                        var rounds = 0;
                        for (var j = 0; j < info.previousSelectedData.length; j++) {
                            if (info.previousSelectedData[j].userId === info.users[i].userId) {
                                if (info.previousSelectedData[j].access !== info.users[i].access) {
                                    forUpdate.push(info.users[i]);
                                    rounds++;
                                    continue;
                                } else {
                                    rounds++;
                                    continue;
                                }
                            }
                        }
                        if (rounds === 0) {
                            forCreate.push(info.users[i]);
                        }
                    }

                    //for remove
                    for (var i = 0; i < info.previousSelectedData.length; i++) {
                        var rounds = 0;
                        for (var j = 0; j < info.users.length; j++) {
                            if (info.previousSelectedData[i].userId === info.users[j].userId) {
                                rounds++;
                            }
                        }
                        if (rounds === 0) {
                            forRemove.push(info.previousSelectedData[i])
                        }
                    }
                } else {                    
                    forRemove = info.previousSelectedData;
                }
            } else {
                if (info.users.length > 0) {
                    forCreate = info.users;
                } else {
                    callback({ error: false }); // no changes occur
                }
            }

            if (forUpdate.length === 0 && forCreate.length === 0 && forRemove.length === 0) {
                callback({ error: false });
            } else {
                info.hasUserChanges = true;
                createUserProduct(info, callback, 0);
            }                   
        }
        
        function createUserProduct(info, callback, loop) {
            var queueArray = [];
            if (info.hasUserChanges) {
                if (info.users.length !== 0) {
                    var errorArray = [];
                    var productUserQueue = info.productId + ";";

                    for (var i = 0; i < info.users.length; i++) {
                        //write to user product list
                        //SERVICE is responsible for writing security permissions and user access log
                        if (i < info.users.length - 1) {
                            productUserQueue += info.users[i].userRefId + ":" + info.users[i].access + ",";
                        } else {
                            productUserQueue += info.users[i].userRefId + ":" + info.users[i].access;
                        }
                    }
                    COMM.user_addToUserProduct(COMM.PROPERTY.QUEUELIST.PRODUCTUSERS, productUserQueue, function (r) {
                        if (r.error) {
                            errorArray.push({ error: true, message: r.message })
                        }
                        info.errorArray.concat(errorArray);
                        callback({ error: false });
                    });
                } else {
                    //if unlink all users
                    COMM.user_addToUserProduct(COMM.PROPERTY.QUEUELIST.PRODUCTUSERS, info.productId, function (r) {
                        if (r.error) {
                            errorArray.push({ error: true, message: r.message })
                        }
                        info.errorArray.concat(errorArray);
                        callback({ error: false });
                    });
                }
            } else {
                callback({ error: false });
            }
        }

    	function onQueryFailed(sender, args) {
    		console.error({ message: 'createUserProductByProductItem: ' + args.get_message(), error: true });
    		if (callback) callback({ message: 'createUserProductByProductItem: ' + args.get_message(), error: true });
    	}
    }
        	/**  
        * @for - studygrid
        * @desc - retrieve data from sharepoint list 'Study'.
        * @implementation - datasource for studygrid.
        * @author -  cri2x
    */
    function getStudy_StudyList(callback) {

    	getStudies(callback);

    	function getStudies(callback) {
    		var ctx = getContext();
    		var web = ctx.get_web(),
				list = web.get_lists().getByTitle(COMM.PROPERTY.STUDY.LIST);
    		var objArray = [];

    		getList(null);

    		function getList(itemPosition) {
    			//Set page position
    			var position = typeof itemPosition === 'undefined' ? null : itemPosition;
    			if (itemPosition !== null) {
    				position = new SP.ListItemCollectionPosition();
    				position.set_pagingInfo(itemPosition);
    			}

    			var camlQuery = new SP.CamlQuery();
    			camlQuery.set_listItemCollectionPosition(position);
    			var query = '';
    			query = '<View>' +
							'<Query>' +
								'<OrderBy>' +
									'<FieldRef Name="ID" Ascending="FALSE"/>' +
								'</OrderBy>' +
							'</Query>' +
							'<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
						'</View>';
    			camlQuery.set_viewXml(query);
    			var items = list.getItems(camlQuery);
    			var row_info = ctx.loadQuery(items);
    			ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    			function onQuerySucceeded() {
    				for (var i = 0; i < row_info.length; i++) {
    					var obj = {
    						id: row_info[i].get_item(COMM.PROPERTY.ID),
    						studyId: row_info[i].get_item(COMM.PROPERTY.STUDY.STUDYID),
    						studySponsorship: row_info[i].get_item(COMM.PROPERTY.STUDY.STUDYSPONSORSHIP),
    						investigationalDILProductID: (function () {
    							var arr = [];
    							for (var j = 0; j < row_info[i].get_item(COMM.PROPERTY.STUDY.INVESTIGATIONALDILPRODUCT).length; j++) {
    								arr.push(row_info[i].get_item(COMM.PROPERTY.STUDY.INVESTIGATIONALDILPRODUCT)[j].get_lookupId());
    							}
    							return arr;
    						}()),
    						investigationalDILProduct: (function () {
    							var arr = [];
    							for (var j = 0; j < row_info[i].get_item(COMM.PROPERTY.STUDY.INVESTIGATIONALDILPRODUCT).length; j++) {
    								arr.push(row_info[i].get_item(COMM.PROPERTY.STUDY.INVESTIGATIONALDILPRODUCT)[j].get_lookupValue());
    							}
    							return arr;
    						}()),
    						susarOpenGroupId: (function () {
    						    var arr = [];
    						    for (var j = 0; j < row_info[i].get_item(COMM.PROPERTY.STUDY.SUSAROPENGROUPID).length; j++) {
    						        arr.push(Math.floor(row_info[i].get_item(COMM.PROPERTY.STUDY.SUSAROPENGROUPID)[j].get_lookupValue()));
    						    }
    						    return arr;
    						}()),
    						susarGroupId: (function () {
    						    var arr = [];
    						    for (var j = 0; j < row_info[i].get_item(COMM.PROPERTY.STUDY.SUSARGROUPID).length; j++) {
    						        arr.push(Math.floor(row_info[i].get_item(COMM.PROPERTY.STUDY.SUSARGROUPID)[j].get_lookupValue()));
    						    }
    						    return arr;
    						}()),
    						primaryInvProdDILProductID: (row_info[i].get_item(COMM.PROPERTY.STUDY.PRIMARYINVESTIGATIONALPRODUCT)) ? row_info[i].get_item(COMM.PROPERTY.STUDY.PRIMARYINVESTIGATIONALPRODUCT).get_lookupId() : 0,
    						primaryInvProdDILProduct: (row_info[i].get_item(COMM.PROPERTY.STUDY.PRIMARYINVESTIGATIONALPRODUCT)) ? row_info[i].get_item(COMM.PROPERTY.STUDY.PRIMARYINVESTIGATIONALPRODUCT).get_lookupValue() : '',
    						studyBlindedStatus: row_info[i].get_item(COMM.PROPERTY.STUDY.STUDYBLINDEDSTATUS),
    						retire: row_info[i].get_item(COMM.PROPERTY.STUDY.RETIRE),
    						isImported: row_info[i].get_item(COMM.PROPERTY.STUDY.ISIMPORTED),
    						objVersion: row_info[i].get_objectVersion(),
    					};
    					obj.investigationalDILProductString = obj.investigationalDILProduct.join(', ');
    					objArray.push(obj);
    				}

    				if (row_info.length > 0 && row_info.length === COMM.PROPERTY.ROWLIMIT) {
    					getList(COMM.PROPERTY.PAGINGINFOPREFIX + row_info[row_info.length - 1].get_item(COMM.PROPERTY.ID));
    				} else {
    					callback(objArray);
    				}

    			}

    			function onQueryFailed(sender, args) {
    				console.error({ message: 'Get List of Study: ' + args.get_message(), error: true });
    				callback({ message: 'Get List of Study: ' + args.get_message(), error: true });
    			}

    		}
    	}
    }

	//check study if associated to susar
    function checkStudyIfAssociatedToSusar(info, callback) {
    	var associatedToSusar = null;

    	var ctx = getContext();
    	var web = ctx.get_web(),
			list = web.get_lists().getByTitle(COMM.PROPERTY.SUSAR.LIST);

    	getList(null);

    	function getList(itemPosition) {

    		//Set page position
    		var position = typeof itemPosition === 'undefined' ? null : itemPosition;
    		if (itemPosition !== null) {
    			position = new SP.ListItemCollectionPosition();
    			position.set_pagingInfo(itemPosition);
    		}

    		var camlQuery = new SP.CamlQuery();
    		camlQuery.set_listItemCollectionPosition(position);
    		var query = '';
    		query = '<View Scope="Recursive">' +
						'<Query>' +
							'<Where>' +
                                '<Eq>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.SUSAR.STUDYSPID + '/>' +
                                    '<Value Type="Number">' + info.spid + '</Value>' +
								'</Eq>' +
							'</Where>' +
						'</Query>' +
						'<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '</ViewFields>' +
						'<RowLimit>1</RowLimit>' +
					'</View>';
    		camlQuery.set_viewXml(query);
    		var items = list.getItems(camlQuery);
    		var row_info = ctx.loadQuery(items);
    		ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    		function onQuerySucceeded() {

    			if (row_info.length !== 0) {
    				associatedToSusar = true;
    			}
    			else {
    				associatedToSusar = false;
    			}

    			if (row_info.length > 0 && row_info.length === COMM.PROPERTY.ROWLIMIT) {
    				getList(COMM.PROPERTY.PAGINGINFOPREFIX + row_info[row_info.length - 1].get_item(COMM.PROPERTY.ID));
    			}
    			else {
    				if (associatedToSusar) {
    					callback({ associatedToSusar: associatedToSusar });
    				}
    				else {
    					checkStudyIfAssociatedToSusarMigrated(info, callback);
    				}
    			}
    		}

    		function onQueryFailed(sender, args) {
    			console.error({ message: 'Check Study if Associated to SUSAR: ' + args.get_message(), error: true });
    			callback({ message: 'Check Study if Associated to SUSAR: ' + args.get_message(), error: true });
    		}
    	}
    }

	//check study if associated to susar migrated
    function checkStudyIfAssociatedToSusarMigrated(info, callback) {
    	var associatedToSusar = null;

    	var ctx = getContext();
    	var web = ctx.get_web(),
			list = web.get_lists().getByTitle(COMM.PROPERTY.SUSAR.LISTMIGRATED);

    	getList(null);

    	function getList(itemPosition) {

    		//Set page position
    		var position = typeof itemPosition === 'undefined' ? null : itemPosition;
    		if (itemPosition !== null) {
    			position = new SP.ListItemCollectionPosition();
    			position.set_pagingInfo(itemPosition);
    		}

    		var camlQuery = new SP.CamlQuery();
    		camlQuery.set_listItemCollectionPosition(position);
    		var query = '';
    		query = '<View Scope="Recursive">' +
						'<Query>' +
							'<Where>' +
                                '<Eq>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.SUSAR.STUDYSPID + '/>' +
                                    '<Value Type="Number">' + info.spid + '</Value>' +
								'</Eq>' +
							'</Where>' +
						'</Query>' +
						'<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '</ViewFields>' +
						'<RowLimit>1</RowLimit>' +
					'</View>';
    		camlQuery.set_viewXml(query);
    		var items = list.getItems(camlQuery);
    		var row_info = ctx.loadQuery(items);
    		ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    		function onQuerySucceeded() {

    			if (row_info.length !== 0) {
    				associatedToSusar = true;
    			}
    			else {
    				associatedToSusar = false;
    			}

    			if (row_info.length > 0 && row_info.length === COMM.PROPERTY.ROWLIMIT) {
    				getList(COMM.PROPERTY.PAGINGINFOPREFIX + row_info[row_info.length - 1].get_item(COMM.PROPERTY.ID));
    			}
    			else {
    				callback({ associatedToSusar: associatedToSusar });
    			}

    		}

    		function onQueryFailed(sender, args) {
    			console.error({ message: 'Check Study if Associated to SUSAR Migrated: ' + args.get_message(), error: true });
    			callback({ message: 'Check Study if Associated to SUSAR Migrated: ' + args.get_message(), error: true });
    		}
    	}
    }

    function study_checkChanges(info, callback) {
    	var status = "";
    	var sponsorship = "";
    	var products = "";
    	getStudy(info, callback);
    	function getStudy(info, callback) {
    		var ctx = getContext();
    		var web = ctx.get_web(),
				list = web.get_lists().getByTitle(COMM.PROPERTY.STUDY.LIST);
    		var objArray = [];
    		getList();
    		function getList() {
    			var camlQuery = new SP.CamlQuery();
    			var query = '';
    			query = '<View>' +
							'<Query>' +
								'<Where>' +
									'<Eq>' +
										'<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
										'<Value Type="Number">' + info.data.models[0].id + '</Value>' +
									'</Eq>' +
								'</Where>' +
								'<OrderBy>' +
									'<FieldRef Name="ID" Ascending="FALSE"/>' +
								'</OrderBy>' +
							'</Query>' +
							'<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
						'</View>';
    			camlQuery.set_viewXml(query);
    			var items = list.getItems(camlQuery);
    			var row_info = ctx.loadQuery(items);
    			ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    			function onQuerySucceeded() {
    				for (var i = 0; i < row_info.length; i++) {
    					var obj = {
    						id: row_info[i].get_item(COMM.PROPERTY.ID),
    						studyId: row_info[i].get_item(COMM.PROPERTY.STUDY.STUDYID),
    						studySponsorship: row_info[i].get_item(COMM.PROPERTY.STUDY.STUDYSPONSORSHIP),
    						investigationalDILProductID: (function () {
    							var arr = [];
    							for (var j = 0; j < row_info[i].get_item(COMM.PROPERTY.STUDY.INVESTIGATIONALDILPRODUCT).length; j++) {
    								arr.push(row_info[i].get_item(COMM.PROPERTY.STUDY.INVESTIGATIONALDILPRODUCT)[j].get_lookupId());
    							}
    							return arr;
    						}()),
    						investigationalDILProduct: (function () {
    							var arr = [];
    							for (var j = 0; j < row_info[i].get_item(COMM.PROPERTY.STUDY.INVESTIGATIONALDILPRODUCT).length; j++) {
    								arr.push(row_info[i].get_item(COMM.PROPERTY.STUDY.INVESTIGATIONALDILPRODUCT)[j].get_lookupValue());
    							}
    							return arr;
    						}()),
    						susarOpenGroupId: (function () {
    							var arr = [];
    							for (var j = 0; j < row_info[i].get_item(COMM.PROPERTY.STUDY.SUSAROPENGROUPID).length; j++) {
    								arr.push(Math.floor(row_info[i].get_item(COMM.PROPERTY.STUDY.SUSAROPENGROUPID)[j].get_lookupValue()));
    							}
    							return arr;
    						}()),
    						susarGroupId: (function () {
    							var arr = [];
    							for (var j = 0; j < row_info[i].get_item(COMM.PROPERTY.STUDY.SUSARGROUPID).length; j++) {
    								arr.push(Math.floor(row_info[i].get_item(COMM.PROPERTY.STUDY.SUSARGROUPID)[j].get_lookupValue()));
    							}
    							return arr;
    						}()),
    						primaryInvProdDILProductID: (row_info[i].get_item(COMM.PROPERTY.STUDY.PRIMARYINVESTIGATIONALPRODUCT)) ? row_info[i].get_item(COMM.PROPERTY.STUDY.PRIMARYINVESTIGATIONALPRODUCT).get_lookupId() : 0,
    						primaryInvProdDILProduct: (row_info[i].get_item(COMM.PROPERTY.STUDY.PRIMARYINVESTIGATIONALPRODUCT)) ? row_info[i].get_item(COMM.PROPERTY.STUDY.PRIMARYINVESTIGATIONALPRODUCT).get_lookupValue() : '',
    						studyBlindedStatus: row_info[i].get_item(COMM.PROPERTY.STUDY.STUDYBLINDEDSTATUS),
    						retire: row_info[i].get_item(COMM.PROPERTY.STUDY.RETIRE),
    						isImported: row_info[i].get_item(COMM.PROPERTY.STUDY.ISIMPORTED),
    						objVersion: row_info[i].get_objectVersion(),
    					};
    					obj.investigationalDILProductString = obj.investigationalDILProduct.join(', ');
    					objArray.push(obj);
    				}
    				if (info.data.models[0].studyBlindedStatus !== objArray[0].studyBlindedStatus) {
    					status = info.data.models[0].studyBlindedStatus;
    				}
    				if (info.data.models[0].studySponsorship !== objArray[0].studySponsorship) {
    					sponsorship = info.data.models[0].studySponsorship;
    				}
    				if (info.data.models[0].investigationalDILProductString !== objArray[0].investigationalDILProductString) {
    					products = info.data.models["0"].investigationalDILProductID.join(',');
    				}
    				var data = {
    					"ID": info.data.models[0].id,
    					"Status": status,
    					"Sponsorship": sponsorship,
    					"Products": products
    				};
    				if (status === "" && sponsorship === "" && products === "") {
    					study_updateStudy(info, callback);
    				}
    				else {
    					COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.UPDATESTUDY, [
                                 { data: JSON.stringify(data) }
    					], function (r) {
    						if (r.error) {
    							console.log("Minor error on backend.") //silent fail
    						}
    					});
    					study_updateStudy(info, callback);
    				}
    			}
    			function onQueryFailed(sender, args) {
    				console.error({ message: 'Get Study for Checking: ' + args.get_message(), error: true });
    				callback({ message: 'Get Study for Checking: ' + args.get_message(), error: true });
    			}
    		}
    	}
    }
    function study_updateStudy(info, callback) {
    	updateStudyItem(info, callback);

    	function updateStudyItem(info, callback) {
    		var ctx = getContext();
    		var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.STUDY.LIST);

    		var oListItem = oList.getItemById(info.data.models[0].id);

    		var studyID = info.data.models[0].studyId.toUpperCase();
    		var investigationalProduct = info.data.models[0].investigationalDILProductID;

    		var invesProduct = [];
    		for (var i = 0; i < investigationalProduct.length; i++) {
    			var investigationalProductValue = new SP.FieldLookupValue();
    			investigationalProductValue.set_lookupId(investigationalProduct[i]);
    			invesProduct.push(investigationalProductValue);
    		}

    		oListItem.set_item(COMM.PROPERTY.STUDY.STUDYID, studyID);
    		oListItem.set_item(COMM.PROPERTY.STUDY.INVESTIGATIONALDILPRODUCT, invesProduct);
    		oListItem.set_item(COMM.PROPERTY.STUDY.PRIMARYINVESTIGATIONALPRODUCT, info.data.models[0].primaryInvProdDILProductID);
    		oListItem.set_item(COMM.PROPERTY.STUDY.STUDYSPONSORSHIP, info.data.models[0].studySponsorship);
    		oListItem.set_item(COMM.PROPERTY.STUDY.STUDYBLINDEDSTATUS, info.data.models[0].studyBlindedStatus);
    		oListItem.set_item(COMM.PROPERTY.STUDY.RETIRE, info.data.models[0].retire);
    		oListItem.set_item(COMM.PROPERTY.OWSHIDDENVERSION, info.data.models[0].objVersion);

    		oListItem.update();
    		ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    		function onQuerySucceeded() {
    			callback({ error: false });
    			//getAllSUSARAssociatedToStudy(info, callback);
    		}

    		function onQueryFailed(sender, args) {
    			console.error({ message: 'updateStudyItem: ' + args.get_message(), error: true });
    			if (args.get_message().indexOf('The list item could not be added or updated because duplicate values') !== -1) {
    				if (callback) callback({ message: 'updateStudyItem: ' + args.get_message(), error: true, duplicate: true });
    			} else {
    				if (callback) callback({ message: 'updateStudyItem: ' + args.get_message(), error: true });
    			}
    		}
    	}
    }

    //function getAllSUSARAssociatedToStudy(info, callback) {
    //	var objArray = [];

    //	getList();

    //	function getList() {

    //		var ctx = getContext();
    //		var web = ctx.get_web(),
	//			list = web.get_lists().getByTitle(COMM.PROPERTY.SUSAR.LIST);

    //		var camlQuery = new SP.CamlQuery();
    //		var query = '';
    //		query = '<View Scope="Recursive">' +
	//					'<Query>' +
	//						'<Where>' +
	//							'<And>' +
	//								'<Eq>' +
	//									'<FieldRef Name=' + COMM.PROPERTY.SUSAR.STUDYSPID + '/>' +
	//									'<Value Type="Number">' + info.data.models[0].id + '</Value>' +
	//								'</Eq>' +
	//								'<Neq>' +
	//									'<FieldRef Name=' + COMM.PROPERTY.SUSAR.STATUS + '/>' +
	//									'<Value Type="Text">Approved</Value>' +
	//								'</Neq>' +
	//							'</And>' +
	//						'</Where>' +
	//					'</Query>' +
	//					'<ViewFields>' +
    //                        '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
    //                    '</ViewFields>' +
	//					'<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
	//				'</View>';
    //		camlQuery.set_viewXml(query);
    //		var items = list.getItems(camlQuery);
    //		var row_info = ctx.loadQuery(items);
    //		ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    //		function onQuerySucceeded() {
	//			//if there are susar associated to study
    //			if (row_info.length !== 0) {
    //				for (var i = 0; i < row_info.length; i++) {
    //					objArray.push({
    //						id: row_info[i].get_item(COMM.PROPERTY.ID),
    //					});
    //				}

    //				updateAllSUSARAssociatedToStudy(info, objArray, callback);
    //			}
	//			//proceed here and check susarmigrated if there are no susar associated to study
    //			else {
    //				getAllSUSARMigratedAssociatedToStudy(info, callback);
    //			}
    //		}

    //		function onQueryFailed(sender, args) {
    //			console.error({ message: 'Get all studies associated to SUSARMigrated: ' + args.get_message(), error: true });
    //			callback({ message: 'Get all studies associated to SUSARMigrated: ' + args.get_message(), error: true });
    //		}
    //	}
    //}

    //function updateAllSUSARAssociatedToStudy(info, objArray, callback) {

    //	var ctx = getContext();
    //	var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.SUSAR.LIST);

    //	for (var i = 0; i < objArray.length; i++) {

    //		var oListItem = oList.getItemById(objArray[i].id);
    //		var studyID = info.data.models[0].studyId.toUpperCase();

    //		var dilProducts = [];
    //		for (var j = 0; j < info.data.models[0].investigationalDILProductID.length; j++) {
    //			var productValue = new SP.FieldLookupValue();
    //			productValue.set_lookupId(info.data.models[0].investigationalDILProductID[j]);
    //			dilProducts.push(productValue);
    //		}

    //		oListItem.set_item(COMM.PROPERTY.SUSAR.STUDYID, studyID);
    //		oListItem.set_item(COMM.PROPERTY.SUSAR.PRIMARYINVESTIGATIONALPRODUCT, info.data.models[0].primaryInvProdDILProductID);
    //		oListItem.set_item(COMM.PROPERTY.SUSAR.DILPRODUCT, dilProducts);
    //		oListItem.set_item(COMM.PROPERTY.SUSAR.STUDYBLINDEDSTATUS, info.data.models[0].studyBlindedStatus);
    //		oListItem.set_item(COMM.PROPERTY.SUSAR.STUDYSPONSORSHIP, info.data.models[0].studySponsorship);

    //		oListItem.update();

    //	}
    //	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

	//	//proceed to get susaropen of susar
    //	function onQuerySucceeded() {
    //		getSUSAROpenForUpdate(info, objArray, callback);
    //	}

    //	function onQueryFailed(sender, args) {
    //		console.error({ message: 'updateSUSARMigratedItem: ' + args.get_message(), error: true });
    //		callback({ message: 'updateSUSARMigratedItem: ' + args.get_message(), error: true });
    //	}

    //}

    //function getSUSAROpenForUpdate(info, objArray, callback) {
    //	var susarOpenArray = [];
    //	getList(0);
    //	function getList(x) {
    //	var ctx = getContext();
    //	var web = ctx.get_web(),
	//		list = web.get_lists().getByTitle(COMM.PROPERTY.SUSAR.LISTOPEN);
    //	var camlQuery = new SP.CamlQuery();
    //	var query = '<View Scope="Recursive">' +
	//					'<Query>' +
	//						'<Where>' +
	//								'<Eq>' +
	//									'<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
	//									'<Value Type="Integer">' + objArray[x].id + '</Value>' +
	//								'</Eq>' +
	//						'</Where>' +
	//					'</Query>' +
	//					'<ViewFields>' +
    //                        '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
	//						'<FieldRef Name=' + COMM.PROPERTY.SUSAR.SUSPECTPRODUCT + '/>' +
    //                    '</ViewFields>' +
	//					'<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
	//				'</View>';

    //	camlQuery.set_viewXml(query);
    //	var items = list.getItems(camlQuery);
    //	var row_info = ctx.loadQuery(items);
    //	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    //	function onQuerySucceeded() {

    //		for (var i = 0; i < row_info.length; i++) {
    //			susarOpenArray.push({
    //				id: row_info[i].get_item(COMM.PROPERTY.ID),
    //				suspectProductsID: (function () {
    //					var arr = [];
    //					for (var j = 0; j < row_info[i].get_item(COMM.PROPERTY.SUSAR.SUSPECTPRODUCT).length; j++) {
    //						arr.push(row_info[i].get_item(COMM.PROPERTY.SUSAR.SUSPECTPRODUCT)[j].get_lookupId());
    //					}
    //					return arr;
    //				}()),
    //				suspectProducts: (function () {
    //					var str = "";
    //					for (var j = 0; j < row_info[i].get_item(COMM.PROPERTY.SUSAR.SUSPECTPRODUCT).length; j++) {
    //						str += row_info[i].get_item(COMM.PROPERTY.SUSAR.SUSPECTPRODUCT)[j].get_lookupValue() + ",";
    //					}
    //					return str.substr(0, str.length - 1);
    //				}()),
    //			});
    //		}
    //			if (x < objArray.length - 1) {
    //				getList(x + 1);
    //			}
    //			else if (x === objArray.length - 1) {
    			//updateSUSAROpen(info, susarOpenArray, callback);
    //			}
	//		//proceed to update the susaropen that was retrieved
    //			//updateSUSAROpen(info, susarOpenArray, callback);
    //	}

    //	function onQueryFailed(sender, args) {
    //		console.error({ message: 'getSUSARMigratedOpenItem: ' + args.get_message(), error: true });
    //		callback({ message: 'getSUSARMigratedOpenItem: ' + args.get_message(), error: true });

    //		}
    //	}
    //}

    //function updateSUSAROpen(info, susarOpenArray, callback) {

    //	for (var i = 0; i < susarOpenArray.length; i++) {

    //		var ctx = getContext();
    //		var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.SUSAR.LISTOPEN);
    //		var oListItem = oList.getItemById(susarOpenArray[i].id);

    //		var a = 0;
    //		var suspectProducts = [];
    //		for (var q = 0; q < susarOpenArray[i].suspectProductsID.length; q++) {
    //			for (var w = 0; w < info.data.models[0].investigationalDILProductID.length; w++) {
    //				if (susarOpenArray[i].suspectProductsID[q] === info.data.models[0].investigationalDILProductID[w]) {
    //					suspectProducts[a] = susarOpenArray[i].suspectProductsID[q];
    //					a++;
    //				}
    //				else if (susarOpenArray[i].suspectProductsID[q] === 1 || susarOpenArray[i].suspectProductsID[q] === 2 || susarOpenArray[i].suspectProductsID[q] === 3) {
    //					suspectProducts[a] = susarOpenArray[i].suspectProductsID[q];
    //					a++;
    //				}
    //			}
    //		}

    //		var suspectSharepointId = [];
    //		for (var e = 0; e < suspectProducts.length; e++) {
    //			var suspectProductValue = new SP.FieldLookupValue();
    //			suspectProductValue.set_lookupId(suspectProducts[e]);
    //			suspectSharepointId.push(suspectProductValue);
    //		}

    //		oListItem.set_item(COMM.PROPERTY.SUSAROPEN.SUSPECTPRODUCTS, suspectSharepointId);

    //		oListItem.update();

    //	}

    //	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    //	function onQuerySucceeded() {
	//		//proceed to get susarmigrated associated to study
    //		getAllSUSARMigratedAssociatedToStudy(info, callback);
    //	}

    //	function onQueryFailed(sender, args) {
    //		console.error({ message: 'updateSUSARMigratedOpenItem: ' + args.get_message(), error: true });
    //		callback({ message: 'updateSUSARMigratedOpenItem: ' + args.get_message(), error: true });
    //	}
    //}

    //function getAllSUSARMigratedAssociatedToStudy(info, callback) {
    //	var ctx = getContext();
    //	var web = ctx.get_web(),
	//		list = web.get_lists().getByTitle(COMM.PROPERTY.SUSAR.LISTMIGRATED);

    //	var objArray = [];

    //	getList();

    //	function getList() {

    //		var camlQuery = new SP.CamlQuery();
    //		var query = '';
    //		query = '<View Scope="Recursive">' +
	//					'<Query>' +
	//						'<Where>' +
	//							'<And>' +
	//								'<Eq>' +
	//									'<FieldRef Name=' + COMM.PROPERTY.SUSAR.STUDYSPID + '/>' +
	//									'<Value Type="Number">' + info.data.models[0].id + '</Value>' +
	//								'</Eq>' +
	//								'<Neq>' +
	//									'<FieldRef Name=' + COMM.PROPERTY.SUSAR.STATUS + '/>' +
	//									'<Value Type="Text">Approved</Value>' +
	//								'</Neq>' +
	//							'</And>' +
	//						'</Where>' +
	//					'</Query>' +
	//					'<ViewFields>' +
    //                        '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
    //                    '</ViewFields>' +
	//					'<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
	//				'</View>';
    //		camlQuery.set_viewXml(query);
    //		var items = list.getItems(camlQuery);
    //		var row_info = ctx.loadQuery(items);
    //		ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    //		function onQuerySucceeded() {
	//			//proceed to update the retrieved susarmigrated
    //			if (row_info.length !== 0) {
    //				for (var i = 0; i < row_info.length; i++) {
    //					objArray.push({
    //						id: row_info[i].get_item(COMM.PROPERTY.ID),
    //					});
    //				}

    //				updateAllSUSARMigratedAssociatedToStudy(info, objArray, callback);
    //			}
	//			//end of updating susarmigration if there are no susarmigrated associated to study
    //			else {
    //				callback({ error: false });
    //			}
    			
    //		}

    //		function onQueryFailed(sender, args) {
    //			console.error({ message: 'Get all studies associated to SUSARMigrated: ' + args.get_message(), error: true });
    //			callback({ message: 'Get all studies associated to SUSARMigrated: ' + args.get_message(), error: true });
    //		}
    //	}
    //}

    //function updateAllSUSARMigratedAssociatedToStudy(info, objArray, callback) {

	//	var ctx = getContext();
	//	var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.SUSAR.LISTMIGRATED);
		
	//	for (var i = 0; i < objArray.length; i++) {

	//		var oListItem = oList.getItemById(objArray[i].id);
	//		var studyID = info.data.models[0].studyId.toUpperCase();

    //		var dilProducts = [];
    //		for (var j = 0; j < info.data.models[0].investigationalDILProductID.length; j++) {
    //			var productValue = new SP.FieldLookupValue();
    //			productValue.set_lookupId(info.data.models[0].investigationalDILProductID[j]);
    //			dilProducts.push(productValue);
    //		}

    //		oListItem.set_item(COMM.PROPERTY.SUSAR.STUDYID, studyID);
    //		oListItem.set_item(COMM.PROPERTY.SUSAR.PRIMARYINVESTIGATIONALPRODUCT, info.data.models[0].primaryInvProdDILProductID);
	//		oListItem.set_item(COMM.PROPERTY.SUSAR.DILPRODUCT, dilProducts);
	//		oListItem.set_item(COMM.PROPERTY.SUSAR.STUDYBLINDEDSTATUS, info.data.models[0].studyBlindedStatus);
	//		oListItem.set_item(COMM.PROPERTY.SUSAR.STUDYSPONSORSHIP, info.data.models[0].studySponsorship);

    //		oListItem.update();

	//	}
	//	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

	//	function onQuerySucceeded() {
	//		//proceed to get susarmigrated
	//		getSUSARMigratedOpenForUpdate(info, objArray, callback);
	//	}

	//	function onQueryFailed(sender, args) {
    //		console.error({ message: 'updateSUSARMigratedItem: ' + args.get_message(), error: true });
    //		callback({ message: 'updateSUSARMigratedItem: ' + args.get_message(), error: true });
	//	}

    //}

    //function getSUSARMigratedOpenForUpdate(info, objArray, callback) {
    //	var susarOpenArray = [];
    //	getList(0);
    //	function getList(x) {
    //	var ctx = getContext();
    //	var web = ctx.get_web(),
	//		list = web.get_lists().getByTitle(COMM.PROPERTY.SUSAR.LISTOPENMIGRATED);
    //	var camlQuery = new SP.CamlQuery();
    //	var query = '<View Scope="Recursive">' +
	//					'<Query>' +
	//						'<Where>' +
	//								'<Eq>' +
	//									'<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
	//									'<Value Type="Integer">' + objArray[x].id + '</Value>' +
	//								'</Eq>' +
	//						'</Where>' +
	//					'</Query>' +
	//					'<ViewFields>' +
    //                        '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
	//						'<FieldRef Name=' + COMM.PROPERTY.SUSAR.SUSPECTPRODUCT + '/>' +
    //                    '</ViewFields>' +
	//					'<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
	//				'</View>';

    //	camlQuery.set_viewXml(query);
    //	var items = list.getItems(camlQuery);
    //	var row_info = ctx.loadQuery(items);
    //	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    //	function onQuerySucceeded() {

    //		for (var i = 0; i < row_info.length; i++) {
    //			susarOpenArray.push({
    //				id: row_info[i].get_item(COMM.PROPERTY.ID),
    //				suspectProductsID: (function () {
    //					var arr = [];
    //					for (var j = 0; j < row_info[i].get_item(COMM.PROPERTY.SUSAR.SUSPECTPRODUCT).length; j++) {
    //						arr.push(row_info[i].get_item(COMM.PROPERTY.SUSAR.SUSPECTPRODUCT)[j].get_lookupId());
    //					}
    //					return arr;
    //				}()),
    //				suspectProducts: (function () {
    //					var str = "";
    //					for (var j = 0; j < row_info[i].get_item(COMM.PROPERTY.SUSAR.SUSPECTPRODUCT).length; j++) {
    //						str += row_info[i].get_item(COMM.PROPERTY.SUSAR.SUSPECTPRODUCT)[j].get_lookupValue() + ",";
    //					}
    //					return str.substr(0, str.length - 1);
    //				}()),
    //			});
    //		}
    //			if (x < objArray.length - 1) {
    //				getList(x + 1);
    //			}
    //			else if (x === objArray.length - 1) {
    //				updateSUSARMigratedOpen(info, susarOpenArray, callback);
    //			}
	//		//proceed to update susaropen migrated
    //			//updateSUSARMigratedOpen(info, susarOpenArray, callback);
    //	}

    //	function onQueryFailed(sender, args) {
    //		console.error({ message: 'getSUSARMigratedOpenItem: ' + args.get_message(), error: true });
    //		callback({ message: 'getSUSARMigratedOpenItem: ' + args.get_message(), error: true });

    //		}
    //	}
    //}

    //function updateSUSARMigratedOpen(info, susarOpenArray, callback) {

    //	for (var i = 0; i < susarOpenArray.length; i++) {

    //		var ctx = getContext();
    //		var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.SUSAR.LISTOPENMIGRATED);
    //		var oListItem = oList.getItemById(susarOpenArray[i].id);

    //		var a = 0;
    //		var suspectProducts = [];
    //		for (var q = 0; q < susarOpenArray[i].suspectProductsID.length; q++) {
    //			for (var w = 0; w < info.data.models[0].investigationalDILProductID.length; w++) {
    //				if (susarOpenArray[i].suspectProductsID[q] === info.data.models[0].investigationalDILProductID[w]) {
    //					suspectProducts[a] = susarOpenArray[i].suspectProductsID[q];
    //					a++;
    //				}
    //				else if (susarOpenArray[i].suspectProductsID[q] === 1 || susarOpenArray[i].suspectProductsID[q] === 2 || susarOpenArray[i].suspectProductsID[q] === 3) {
    //					suspectProducts[a] = susarOpenArray[i].suspectProductsID[q];
    //					a++;
    //				}
    //			}
    //		}

    //		var suspectSharepointId = [];
    //		for (var e = 0; e < suspectProducts.length; e++) {
    //			var suspectProductValue = new SP.FieldLookupValue();
    //			suspectProductValue.set_lookupId(suspectProducts[e]);
    //			suspectSharepointId.push(suspectProductValue);
    //		}

    //		oListItem.set_item(COMM.PROPERTY.SUSAROPEN.SUSPECTPRODUCTS, suspectSharepointId);

    //		oListItem.update();

    //	}

    //	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    //	function onQuerySucceeded() {
    //		callback({ error: false });
    //	}

    //	function onQueryFailed(sender, args) {
    //		console.error({ message: 'updateSUSARMigratedOpenItem: ' + args.get_message(), error: true });
    //		callback({ message: 'updateSUSARMigratedOpenItem: ' + args.get_message(), error: true });
    //	}
    //}

    /**  
    * @for - create Study
    * @desc - create new study data to sharepoint server.
    * @implementation - receive data from create study popup then save data to sharepoint.
    * @author -  cri2x
    */
    function createStudy_StudyList(info, callback) {

    	var ctx = getContext();
    	var list = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.STUDY.LIST);

    	var itemCreateInfo = new SP.ListItemCreationInformation();
    	var items = list.addItem(itemCreateInfo);

    	var investigationalProduct = [];
    	for (var i = 0; i < info.investigationalProduct.length; i++) {
    		var investigationalProductValue = new SP.FieldLookupValue();
    		investigationalProductValue.set_lookupId(info.investigationalProduct[i]);
    		investigationalProduct.push(investigationalProductValue);
    	}

    	var studyID = info.studyId.toUpperCase();

    	items.set_item(COMM.PROPERTY.STUDY.STUDYID, studyID);
    	items.set_item(COMM.PROPERTY.STUDY.INVESTIGATIONALDILPRODUCT, investigationalProduct);
    	items.set_item(COMM.PROPERTY.STUDY.PRIMARYINVESTIGATIONALPRODUCT, info.primaryInvestigationalProduct);
    	items.set_item(COMM.PROPERTY.STUDY.STUDYSPONSORSHIP, info.studySponsorship);
    	items.set_item(COMM.PROPERTY.STUDY.STUDYBLINDEDSTATUS, info.studyBlindedStatus);

    	items.update();
    	ctx.load(items);
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    	function onQuerySucceeded() {
    		callback({ data: info, error: false });
    	}

    	function onQueryFailed(sender, args) {
    		console.error({ message: 'studyCreate: ' + args.get_message(), error: true });
    		callback({ message: 'studyCreate: ' + args.get_message(), error: true });
    	}
    }
    	/**  
        * @for - update Study
        * @desc - update data.
        * @implementation - receive data from kendo grid popup edit save updated data to sharepoint.
        * @author -  cri2x
    */
    function updateStudy_StudyList(info, callback) {
        if (info.primaryInvestigationalProduct !== null ||
            info.studyBlindedStatus !== null ||
            info.studyId !== null ||
            info.studySponsorship !== null ||
            info.investigationalProduct.length !== 0) {
    		var ctx = getContext();
			var list = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.STUDY.LIST);
    	
			items = list.getItemById(info.id);
			ctx.load(items);
			var studyID = info.studyId.toUpperCase();
			var investigationalProduct = info.investigationalProduct;

			var invesProduct = [];
			for (var i = 0; i < investigationalProduct.length; i++) {
				var investigationalProductValue = new SP.FieldLookupValue();
				investigationalProductValue.set_lookupId(investigationalProduct[i]);
				invesProduct.push(investigationalProductValue);
			}

			items.set_item(COMM.PROPERTY.STUDY.STUDYID, studyID);
			items.set_item(COMM.PROPERTY.STUDY.INVESTIGATIONALDILPRODUCT, invesProduct);
			items.set_item(COMM.PROPERTY.STUDY.PRIMARYINVESTIGATIONALPRODUCT, info.primaryInvestigationalProduct);
			items.set_item(COMM.PROPERTY.STUDY.STUDYSPONSORSHIP, info.studySponsorship);
			items.set_item(COMM.PROPERTY.STUDY.STUDYBLINDEDSTATUS, info.studyBlindedStatus);
			items.set_item(COMM.PROPERTY.STUDY.RETIRE, info.retire);

			items.update();
			ctx.load(items)
			ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

			function onQuerySucceeded() {
				callback({ error: false });
			}

			function onQueryFailed(sender, args) {
				console.error({ message: 'studyUpdate: ' + args.get_message(), error: true });
				callback({ message: 'studyUpdate: ' + args.get_message(), error: true });
			}
    	}
    }
    	/**  
        * @for - create Study
        * @desc - source for dropdown list for study sponsorship.
        * @implementation - hard coded source for study sponsorship dropdown list.
        * @author -  cri2x
    */
    function getStudy_StudySponsorship(callback) {

    	var ctx = getContext();
    	var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.STUDYSPONSORSHIP.LIST);

    	var camlQuery = new SP.CamlQuery();
    	var query = '';
    	query = '<View>' +
					'<Query>' +
						'<Where>' +
							'<Eq>' +
                                '<FieldRef Name="' + COMM.PROPERTY.STUDYSPONSORSHIP.RETIRED + '"/>' +
                                '<Value Type="Integer">' + 0 + '</Value>' +
                            '</Eq>' +
						'</Where>' +
						'<OrderBy>' +
							'<FieldRef Name="ID" Ascending="FALSE"/>' +
						'</OrderBy>' +
					'</Query>' +
				'</View>';
    	camlQuery.set_viewXml(query);
    	var items = list.getItems(camlQuery);
    	var row_info = ctx.loadQuery(items);
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    	function onQuerySucceeded() {
    		var objArray = [];
    		for (var i = 0; i < row_info.length; i++) {
    			objArray.push({
    				id: row_info[i].get_item(COMM.PROPERTY.ID),
    				sponsor: row_info[i].get_item(COMM.PROPERTY.TITLE),
    			});
    		}
    		callback(objArray);
    	}
    	function onQueryFailed(sender, args) {
    		console.error({ message: 'studyGetSponsorship: ' + args.get_message(), error: true });
    		callback({ message: 'studyGetSponsorship: ' + args.get_message(), error: true });
    	}
    }
    	/**  
        * @for - create Study
        * @desc - source for dropdown list for DILS Product, Investigational Product and Study Protocol Product Status.
        * @implementation - retrieve data from sharepoint list 'Product'.
        * @author -  cri2x
    */
    function getStudy_StudyProduct(callback) {

    	var ctx = getContext();
    	var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.PRODUCT.LIST);

    	var camlQuery = new SP.CamlQuery();
    	var query = '';
    	query = '<View>' +
				'<Query>' +
					'<Where>' +
						'<And>' +
                            COMM.generateSpecialProductsQuery('And', 'Neq') +
                            '<Neq>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.STATUS + '/>' +
                                    '<Value Type="Text">' + COMM.PROPERTY.PRODUCT.RETIRED + '</Value>' +
                                '</Neq>' +
						'</And>' +
					'</Where>' +
					'<ViewFields>' +
                        '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.DILPRODUCT + '/>' +
                        '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.SUSAROPENGROUPID + '/>' +
                        '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.SUSARGROUPID + '/>' +
                    '</ViewFields>' +
					'<OrderBy>' +
						'<FieldRef Name="ID" Ascending="FALSE"/>' +
					'</OrderBy>' +
				'</Query>' +
			'</View>';
    	camlQuery.set_viewXml(query);
    	var items = list.getItems(camlQuery);
    	var row_info = ctx.loadQuery(items);
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    	function onQuerySucceeded() {
    		var objArray = [];
    		for (var i = 0; i < row_info.length; i++) {
    			objArray.push({
    				id: row_info[i].get_item(COMM.PROPERTY.ID),
    				dilProduct: row_info[i].get_item(COMM.PROPERTY.PRODUCT.DILPRODUCT),
    				susarOpenGroupId: row_info[i].get_item(COMM.PROPERTY.PRODUCT.SUSAROPENGROUPID),
    				susarGroupId: row_info[i].get_item(COMM.PROPERTY.PRODUCT.SUSARGROUPID)
    			});
    		}
    		callback(objArray);
    	}
    	function onQueryFailed(sender, args) {
    		console.error({ message: 'studyGetStudyProduct: ' + args.get_message(), error: true });
    		callback({ message: 'studyGetStudyProduct: ' + args.get_message(), error: true });
    	}
    }
    	/**  
        * @for - create Study
        * @desc - dropdown list source for study blinded status.
        * @implementation - hard coded source for study blinded statusp dropdown list.
        * @author -  cri2x
    */
    function getStudy_StudyBlindedStatus(callback) {
    	var studyBlindedStatus = [
            { "id": 0, "status": "Blinded" },
            { "id": 1, "status": "Open" },
    	]
    	callback(studyBlindedStatus);
    }
       
    /************ PRODUCT tab ************/
    function product_getProductList(queryString, callback) {

        getProducts(queryString, callback);

        function getProducts(info, callback) {
            var ctx = getContext();
            var web = ctx.get_web(),
                list = web.get_lists().getByTitle(COMM.PROPERTY.PRODUCT.LIST);
            
            var objArray = [];
            getList(null);
            function getList(itemPosition) {

                //Set page position
                var position = typeof itemPosition === 'undefined' ? null : itemPosition;
                if (itemPosition !== null) {
                    position = new SP.ListItemCollectionPosition();
                    position.set_pagingInfo(itemPosition);
                }

                var camlQuery = new SP.CamlQuery();
                camlQuery.set_listItemCollectionPosition(position);
                var query = '';
                if (queryString.getAll) {
                    query = '<View>' +
                                '<Query>' +
                                    '<OrderBy>' +
                                        '<FieldRef Name=' + COMM.PROPERTY.ID + ' Ascending="FALSE"/>' +
                                    '</OrderBy>' +
                                '</Query>' +
                                '<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
                                '<ViewFields>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.CODE + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.NICKNAME + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.INN + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.ENTITY + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.DILPRODUCT + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.STATUS + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.SUSARGROUPID + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.SUSAROPENGROUPID + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.CREATED + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.MODIFIED + '/>' +
                                '</ViewFields>' +
                            '</View>';
                } else {
                    query = '<View>' +
                                '<Query>' +
                                    '<Where>' +
                                        COMM.generateSpecialProductsQuery('And', 'Neq') +
                                    '</Where>' +
                                    '<OrderBy>' +
                                        '<FieldRef Name=' + COMM.PROPERTY.CREATED + ' Ascending="FALSE"/>' +
                                    '</OrderBy>' +
                                '</Query>' +
                                '<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
                                '<ViewFields>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.CODE + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.NICKNAME + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.INN + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.ENTITY + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.DILPRODUCT + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.STATUS + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.SUSARGROUPID + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.SUSAROPENGROUPID + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.CREATED + '/>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.MODIFIED + '/>' +
                                '</ViewFields>' +
                            '</View>';
                }
                camlQuery.set_viewXml(query);
                var items = list.getItems(camlQuery);
                var row_info = ctx.loadQuery(items);
                ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

                function onQuerySucceeded() {
                    //loop through results and save to object
                    try {
                        if (!row_info) throw 'Row info is null';
                        for (var i = 0; i < row_info.length; i++) {
                            objArray.push({
                                id: row_info[i].get_item(COMM.PROPERTY.ID),
                                code: row_info[i].get_item(COMM.PROPERTY.PRODUCT.CODE),
                                nickname: row_info[i].get_item(COMM.PROPERTY.PRODUCT.NICKNAME),
                                inn: row_info[i].get_item(COMM.PROPERTY.PRODUCT.INN),
                                entity: row_info[i].get_item(COMM.PROPERTY.PRODUCT.ENTITY),
                                dilProduct: row_info[i].get_item(COMM.PROPERTY.PRODUCT.DILPRODUCT),
                                retired: (row_info[i].get_item(COMM.PROPERTY.PRODUCT.STATUS) != COMM.PROPERTY.RETIRED) ? false : true,
                                status: row_info[i].get_item(COMM.PROPERTY.PRODUCT.STATUS),
                                susarGroupId: row_info[i].get_item(COMM.PROPERTY.PRODUCT.SUSARGROUPID),
                                susarGroupOpenId: row_info[i].get_item(COMM.PROPERTY.PRODUCT.SUSAROPENGROUPID),
                                objVersion: row_info[i].get_objectVersion(),
                                canRetire: false,
                                created: row_info[i].get_item(COMM.PROPERTY.CREATED),
                                modified: row_info[i].get_item(COMM.PROPERTY.MODIFIED),
                            });
                        }
                    } catch (err) {
                        if (callback) callback({ method: 'getProducts', message: err, error: true });
                        return;
                    }

                    if (row_info.length > 0 && row_info.length === COMM.PROPERTY.ROWLIMIT) {
                        getList(COMM.PROPERTY.PAGINGINFOPREFIX + row_info[row_info.length - 1].get_item(COMM.PROPERTY.ID));
                    } else {
                        if (callback) callback(objArray);
                    }
                }
            }

            function onQueryFailed(sender, args) {
                if (callback) callback({ method: 'getProducts', message: args.get_message(), error: true });
            }
        }
    }

    function product_getProductEntity(callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.PRODUCTENTITY.LIST);

        var camlQuery = new SP.CamlQuery();
        var query = '';
        query = '<View>' +
                   '<Query>' +
						'<Where>' +
							'<Eq>' +
                                '<FieldRef Name="' + COMM.PROPERTY.PRODUCTENTITY.RETIRED + '"/>' +
                                '<Value Type="Integer">' + 0 + '</Value>' +
                            '</Eq>' +
						'</Where>' +
                       '<OrderBy>' +
                           '<FieldRef Name=' + COMM.PROPERTY.TITLE + ' Ascending="FALSE"/>' +
                       '</OrderBy>' +
                   '</Query>' +
                    '<ViewFields>' +
                        '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '<FieldRef Name=' + COMM.PROPERTY.TITLE + '/>' +
                    '</ViewFields>' +
               '</View>';
        camlQuery.set_viewXml(query);
        var items = list.getItems(camlQuery);
        var row_info = ctx.loadQuery(items);
        ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

        function onQuerySucceeded() {
            var objArray = [];
            //loop through results and save to object
            try {
                if (!row_info) throw 'Row info is null';
                for (var i = 0; i < row_info.length; i++) {
                    objArray.push({
                        id: row_info[i].get_item(COMM.PROPERTY.ID),
                        entity: row_info[i].get_item(COMM.PROPERTY.TITLE),
                    });
                }
            } catch (err) {
                if (callback) callback({ method: 'product_getProductEntity', message: err, error: true });
                return;
            }
            if (callback) callback(objArray);
        }

        function onQueryFailed(sender, args) {
            if (callback) callback({ method: 'product_getProductEntity', message: args.get_message(), error: true });
        }
    }

    function product_getAwareInn(callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.INN.LIST);

        var objArray = [];
        getList(null);
        function getList(itemPosition) {

            //Set page position
            var position = typeof itemPosition === 'undefined' ? null : itemPosition;
            if (itemPosition !== null) {
                position = new SP.ListItemCollectionPosition();
                position.set_pagingInfo(itemPosition);
            }

            var camlQuery = new SP.CamlQuery();
            camlQuery.set_listItemCollectionPosition(position);
            var query = '';
            query = '<View>' +
                        '<Query>' +
							'<Where>' +
								'<Eq>' +
									'<FieldRef Name="' + COMM.PROPERTY.INN.RETIRED + '"/>' +
									'<Value Type="Integer">' + 0 + '</Value>' +
								'</Eq>' +
							'</Where>' +
                            '<OrderBy>' +
                                '<FieldRef Name=' + COMM.PROPERTY.ID+ ' Ascending="FALSE"/>' +
                            '</OrderBy>' +
                        '</Query>' +
                        '<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
                        '<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.INN.INN + '/>' +
                        '</ViewFields>' +
                   '</View>';
            camlQuery.set_viewXml(query);
            var items = list.getItems(camlQuery);
            var row_info = ctx.loadQuery(items);
            ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

            function onQuerySucceeded() {
                //loop through results and save to object
                try {
                    if (!row_info) throw 'Row info is null';
                    for (var i = 0; i < row_info.length; i++) {
                        objArray.push({
                            id: row_info[i].get_item(COMM.PROPERTY.ID),
                            inn: row_info[i].get_item(COMM.PROPERTY.INN.INN),
                        });
                    }
                } catch (err) {
                    if (callback) callback({ method: 'product_getAwareInn', message: err, error: true });
                    return;
                }

                if (row_info.length > 0 && row_info.length === COMM.PROPERTY.ROWLIMIT) {
                    getList(COMM.PROPERTY.PAGINGINFOPREFIX + row_info[row_info.length - 1].get_item(COMM.PROPERTY.ID));
                } else {
                    if (callback) callback(objArray);
                }
            }
        }

        function onQueryFailed(sender, args) {
            if (callback) callback({ method: 'product_getAwareInn', message: args.get_message(), error: true });
        }
    }

    function product_getUser(callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.USER.LIST);

        var camlQuery = new SP.CamlQuery();
        var query = '';
        query = '<View>' +
                   '<Query>' +
						'<Where>' +
							'<And>' +
							    '<Eq>' +
								    '<FieldRef Name="' + COMM.PROPERTY.USER.STATUS + '"/>' +
								    '<Value Type="Text">' + COMM.PROPERTY.USER.ACTIVE + '</Value>' +
							    '</Eq>' +
							    '<Eq>' +
								    '<FieldRef Name="' + COMM.PROPERTY.USER.PROFILE + '"/>' +
								    '<Value Type="Text">' + COMM.PROPERTY.USERPROFILE.READONLY + '</Value>' +
							    '</Eq>' +
							'</And>' +
						'</Where>' +
                        '<OrderBy>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USER.NAME + ' Ascending="TRUE"/>' +
                        '</OrderBy>' +
                   '</Query>' +
                    '<ViewFields>' +
                        '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '<FieldRef Name=' + COMM.PROPERTY.USER.NAME + '/>' +
                        '<FieldRef Name=' + COMM.PROPERTY.USER.PROFILE + '/>' +
                    '</ViewFields>' +
               '</View>';
        camlQuery.set_viewXml(query);
        var items = list.getItems(camlQuery);
        var row_info = ctx.loadQuery(items);
        ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

        function onQuerySucceeded() {
            var objArray = [];
            //loop through results and save to object
            try {
                if (!row_info) throw 'Row info is null';
                for (var i = 0; i < row_info.length; i++) {
                    objArray.push({
                        id: row_info[i].get_item(COMM.PROPERTY.ID),
                        userId: (row_info[i].get_item(COMM.PROPERTY.USER.NAME)) ? row_info[i].get_item(COMM.PROPERTY.USER.NAME).get_lookupId() : 0,
                        userName: (row_info[i].get_item(COMM.PROPERTY.USER.NAME)) ? row_info[i].get_item(COMM.PROPERTY.USER.NAME).get_lookupValue() : '',
                        userProfile: row_info[i].get_item(COMM.PROPERTY.USER.PROFILE)
                    });
                }
            } catch (err) {
                if (callback) callback({ method: 'product_getUser', message: err, error: true });
                return;
            }
            if (callback) callback(objArray);
        }

        function onQueryFailed(sender, args) {
            if (callback) callback({ method: 'product_getUser', message: args.get_message(), error: true });
        }
    }

    function product_getUserProduct(queryString, callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.USERPRODUCT.LIST);
        
        var objArray = [];
        getList(null);
        function getList(itemPosition) {

            //Set page position
            var position = typeof itemPosition === 'undefined' ? null : itemPosition;
            if (itemPosition !== null) {
                position = new SP.ListItemCollectionPosition();
                position.set_pagingInfo(itemPosition);
            }

            var camlQuery = new SP.CamlQuery();
            camlQuery.set_listItemCollectionPosition(position);
            var query = '';
            query = '<View>' +
                        '<Query>' +
                            '<Where>' +
                                '<Eq>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.PRODUCTID + ' LookupId="TRUE"/>' +
                                    '<Value Type="Lookup">' + queryString.productId + '</Value>' +
                                '</Eq>' +
                            '</Where>' +
                        '</Query>' +
                        '<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
                        '<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.USERID + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.USER + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.PRODUCTID + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.ACCESS + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.DILPRODUCT + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.SUSAROPENGROUPID + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.SUSARGROUPID + '/>' +
                        '</ViewFields>' +
                   '</View>';
            camlQuery.set_viewXml(query);
            var items = list.getItems(camlQuery);
            var row_info = ctx.loadQuery(items);
            ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

            function onQuerySucceeded() {
                //loop through results and save to object
                try {
                    if (!row_info) throw 'Row info is null';
                    for (var i = 0; i < row_info.length; i++) {
                        objArray.push({
                            id: row_info[i].get_item(COMM.PROPERTY.ID),
                            userRefId: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.USERID)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.USERID).get_lookupId() : 0,
                            userId: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.USER)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.USER).get_lookupId() : 0,
                            userName: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.USER)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.USER).get_lookupValue() : '',
                            productID: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.PRODUCTID)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.PRODUCTID).get_lookupId() : 0,
                            productName: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.PRODUCTID)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.PRODUCTID).get_lookupValue() : '',
                            access: row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.ACCESS),
                            dilProductId: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT).get_lookupId() : 0,
                            dilProductName: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT).get_lookupValue() : '',
                            susarOpenGroupId: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.SUSAROPENGROUPID)) ? Math.floor(row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.SUSAROPENGROUPID).get_lookupValue()) : 0,
                            susarGroupId: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.SUSARGROUPID)) ? Math.floor(row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.SUSARGROUPID).get_lookupValue()) : 0,
                            objVersion: row_info[i].get_objectVersion(),
                        });
                    }
                } catch (err) {
                    if (callback) callback({ method: 'product_getUserProduct', message: err, error: true });
                    return;
                }

                if (row_info.length > 0 && row_info.length === COMM.PROPERTY.ROWLIMIT) {
                    getList(COMM.PROPERTY.PAGINGINFOPREFIX + row_info[row_info.length - 1].get_item(COMM.PROPERTY.ID));
                } else {
                    if (callback) callback(objArray);
                }
            }
        }

        function onQueryFailed(sender, args) {
            if (callback) callback({ method: 'product_getUserProduct', message: args.get_message(), error: true });
        }
    }
   
    function product_createProduct(info, callback) {

        createProductItem(info, callback);

        function createProductItem(info, callback) {
            var ctx = getContext();
            var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.PRODUCT.LIST);
            var itemCreateInfo = new SP.ListItemCreationInformation();
            var oListItem = oList.addItem(itemCreateInfo);

            oListItem.set_item(COMM.PROPERTY.PRODUCT.CODE, info.code);
            oListItem.set_item(COMM.PROPERTY.PRODUCT.NICKNAME, info.nickname);
            oListItem.set_item(COMM.PROPERTY.PRODUCT.INN, info.inn);
            oListItem.set_item(COMM.PROPERTY.PRODUCT.ENTITY, info.entity);
            oListItem.set_item(COMM.PROPERTY.PRODUCT.DILPRODUCT, info.folder);
            oListItem.set_item(COMM.PROPERTY.PRODUCT.STATUS, COMM.PROPERTY.PRODUCT.PENDING);

            oListItem.update();
            ctx.load(oListItem);
            ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

            function onQuerySucceeded() {
                info.id = oListItem.get_id();
                COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.CREATEPRODUCT, [{ data: info.id }], function (r) {
                    if (r.error) {
                        console.error({ method: 'createProductItem', message: r.message, error: true });
                        if (callback) callback({ method: 'createProductItem', message: r.message, error: true });
                    } else {
                        createUserProductByProduct(info, callback);
                    }
                });
            }

            function onQueryFailed(sender, args) {
                console.error({ method: 'createProductItem', message: args.get_message(), error: true });
                if (args.get_message().indexOf('The list item could not be added or updated because duplicate values') !== -1) {
                    if (callback) callback({ method: 'createProductItem', message: args.get_message(), error: true, duplicate: true });
                } else {
                    if (callback) callback({ method: 'createProductItem', message: args.get_message(), error: true });
                }
            }
        }

        function createUserProductByProduct(info, callback) {

            if (info.queueData && info.queueData.length > 0) {
                queueUserProduct(info, callback);
            } else {
                if (callback) callback({ error: false });                
            }

            function queueUserProduct(info, callback) {
                COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.PRODUCTUSERS, [{ data: (info.id + '' + info.queueData) }], function (r) {
                    if (r.error) {
                        console.error(r.message);
                        if (callback) callback({ method: 'createUserProductByProduct', message: r.message, error: true });
                    } else {
                        if (callback) callback({ data: info, error: false });
                    }
                });
            }

            //unused
            function createUserProductByProductItem(info, callback, loop) {
                var queueArray = [];
                for (var i = (loop * COMM.PROPERTY.BATCHCOUNT), j = 0 ; (i < info.users.length && j < COMM.PROPERTY.BATCHCOUNT) ; i++, j++) {
                    var ctx = getContext();
                    var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.USERPRODUCT.LIST);
                    var itemCreateInfo = new SP.ListItemCreationInformation();
                    var oListItem = oList.addItem(itemCreateInfo);

                    queueArray.push({ data: info.users[i].access + ';' + info.users[i].id + ';' + info.id });

                    var userValue = new SP.FieldLookupValue();
                    var personValue = new SP.FieldLookupValue();
                    var productValue = new SP.FieldLookupValue();
                    userValue.set_lookupId(info.users[i].id);
                    personValue.set_lookupId(info.users[i].userId);
                    productValue.set_lookupId(info.id);

                    oListItem.set_item(COMM.PROPERTY.USERPRODUCT.USERID, userValue);
                    oListItem.set_item(COMM.PROPERTY.USERPRODUCT.USER, personValue);
                    oListItem.set_item(COMM.PROPERTY.USERPRODUCT.PRODUCTID, productValue);
                    oListItem.set_item(COMM.PROPERTY.USERPRODUCT.ACCESS, info.users[i].access);
                    oListItem.set_item(COMM.PROPERTY.USERPRODUCT.UPID, info.users[i].id + "_" + info.id);

                    oListItem.update();
                    ctx.load(oListItem);
                }
                ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

                function onQuerySucceeded() {
                    //Create folder, associate to static groups, create special group,
                    //associate special group to folder, associate user to group, write special group ids to product
                    //and write to user log access is now done be service 
                    //return values after create product, user-product row is done
                    COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.CREATEUSERPRODUCT, queueArray, function (r) {
                        if (r.error) {
                            console.error(r.message);
                            if (callback) callback({ method: 'createUserProductByProductItem', message: r.message, error: true });
                        } else {
                            if (loop < (Math.ceil(info.users.length / COMM.PROPERTY.BATCHCOUNT) - 1)) {
                                createUserProductByProductItem(info, callback, loop + 1);
                            } else {
                                if (callback) callback({ data: info, error: false });
                            }
                        }
                    });
                }

                function onQueryFailed(sender, args) {
                    console.error({ method: 'createUserProductByProductItem', message: args.get_message(), error: true });
                    if (callback) callback({ method: 'createUserProductByProductItem', message: args.get_message(), error: true });
                }
            }
        }
    }  

    function product_updateProduct(info, callback) {

        updateProductItem(info, callback);

        function updateProductItem(info, callback) {
            var ctx = getContext();
            var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.PRODUCT.LIST);

            var oListItem = oList.getItemById(info.data.id);

            oListItem.set_item(COMM.PROPERTY.PRODUCT.CODE, info.data.code);
            oListItem.set_item(COMM.PROPERTY.PRODUCT.NICKNAME, info.data.nickname);
            oListItem.set_item(COMM.PROPERTY.PRODUCT.INN, info.data.inn);
            oListItem.set_item(COMM.PROPERTY.PRODUCT.ENTITY, info.data.entity);
            oListItem.set_item(COMM.PROPERTY.PRODUCT.DILPRODUCT, info.data.folder);
            oListItem.set_item(COMM.PROPERTY.OWSHIDDENVERSION, info.data.objVersion);
            if (info.data.retired) {
                oListItem.set_item(COMM.PROPERTY.PRODUCT.STATUS, COMM.PROPERTY.PRODUCT.RETIRED);
            } else {
                oListItem.set_item(COMM.PROPERTY.PRODUCT.STATUS, COMM.PROPERTY.PRODUCT.ACTIVE);
            }

            oListItem.update();
            ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

            function onQuerySucceeded() {
                updateUserProduct(info, callback);
            }

            function onQueryFailed(sender, args) {
                console.error({ method: 'updateProductItem', message: args.get_message(), error: true });
                if (args.get_message().indexOf('The list item could not be added or updated because duplicate values') !== -1) {
                    if (callback) callback({ method: 'updateProductItem', message: args.get_message(), error: true, duplicate: true });
                } else {
                    if (callback) callback({ method: 'updateProductItem', message: args.get_message(), error: true });
                }
            }
        }

        function updateUserProduct(info, callback) {

            if (info.data.queueData && info.data.queueData.length > 0) {
                queueUserProduct(info, callback);
            } else {
                if (callback) callback({ error: false });
            }

            function queueUserProduct(info, callback) {
                COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.PRODUCTUSERS, [{ data: info.data.queueData }], function (r) {
                    if (r.error) {
                        console.error(r.message);
                        if (callback) callback({ method: 'updateUserProduct', message: r.message, error: true });
                    } else {
                        if (callback) callback({ error: false });
                    }
                });
            }
        }
    }

    function product_createUserProduct(info, callback) {
        var ctx = getContext();
        var web = ctx.get_web();
        var arr = [];
        createUserProductItem(info, callback, 0);

        function createUserProductItem(info, callback, loop) {
            var queueArray = [];
            for (var i = (loop * COMM.PROPERTY.BATCHCOUNT), j = 0 ; (i < info.data.models.length && j < COMM.PROPERTY.BATCHCOUNT) ; i++, j++) {
                var oList = web.get_lists().getByTitle(COMM.PROPERTY.USERPRODUCT.LIST);
                var itemCreateInfo = new SP.ListItemCreationInformation();
                var oListItem = oList.addItem(itemCreateInfo);

                queueArray.push({ data: info.data.models[i].access + ';' + info.data.models[i].userRefId + ';' + info.data.models[i].dilProductId });

                var userValue = new SP.FieldLookupValue();
                var personValue = new SP.FieldLookupValue();
                var productValue = new SP.FieldLookupValue();
                userValue.set_lookupId(info.data.models[i].userRefId);
                personValue.set_lookupId(info.data.models[i].userId);
                productValue.set_lookupId(info.data.models[i].dilProductId);

                oListItem.set_item(COMM.PROPERTY.USERPRODUCT.USERID, userValue);
                oListItem.set_item(COMM.PROPERTY.USERPRODUCT.USER, personValue);
                oListItem.set_item(COMM.PROPERTY.USERPRODUCT.PRODUCTID, productValue);
                oListItem.set_item(COMM.PROPERTY.USERPRODUCT.ACCESS, info.data.models[i].access);
                oListItem.set_item(COMM.PROPERTY.USERPRODUCT.UPID, info.data.models[i].userRefId + "_" + info.data.models[i].dilProductId);

                oListItem.update();
                ctx.load(oListItem);
                arr.push(oListItem);
            }
            ctx.executeQueryAsync(function () {
                COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.CREATEUSERPRODUCT, queueArray, function (r) {
                    if (r.error) {
                        console.error(r.message);
                        if (callback) callback({ method: 'createUserProductItem', message: r.message, error: true });
                    } else {
                        if (loop < (Math.ceil(info.data.models.length / COMM.PROPERTY.BATCHCOUNT) - 1)) {
                            createUserProductItem(info, callback, loop + 1);
                        } else {
                            for (var i = 0; i < info.data.models.length; i++) {
                                info.data.models[i].id = arr[i].get_item('ID');
                            }
                            addUserGroupPermission(0);

                            function addUserGroupPermission(i) {
                                var user = web.ensureUser(info.data.models[i].userName);
                                ctx.load(user);
                                var siteGroupsOpen = web.get_siteGroups();
                                var spGroupOpen = siteGroupsOpen.getById(info.susarGroupOpenId);
                                var userCollectionOpen = spGroupOpen.get_users();
                                if (info.data.models[i].access === "Blinded") {
                                    //Susar Group Save
                                    var siteGroups = web.get_siteGroups();
                                    var spGroup = siteGroups.getById(info.susarGroupId)
                                    var userCollection = spGroup.get_users();
                                    userCollection.addUser(user);
                                    ctx.load(spGroup);
                                } else if (info.data.models[i].access === "Open") {
                                    //Open Susar Group Save
                                    var siteGroupsOpen = web.get_siteGroups();
                                    var spGroupOpen = siteGroupsOpen.getById(info.susarGroupOpenId)
                                    var userCollectionOpen = spGroupOpen.get_users();
                                    userCollectionOpen.addUser(user);
                                    ctx.load(spGroupOpen);
                                    //Susar Group Save
                                    var siteGroups = web.get_siteGroups();
                                    var spGroup = siteGroups.getById(info.susarGroupId)
                                    var userCollection = spGroup.get_users();
                                    userCollection.addUser(user);
                                    ctx.load(spGroup);
                                }
                                ctx.executeQueryAsync(function () {
                                    (i < info.data.models.length - 1) ? addUserGroupPermission(i + 1) : callback({ data: info, error: false });
                                }, function (sender, args) {
                                    callback({ message: args.get_message(), error: true });
                                });
                            }
                        }
                    }
                });
            }, onQueryFailed);

            function onQueryFailed(sender, args) {
                console.error({ method: 'createUserProductItem', message: args.get_message(), error: true });
                if (args.get_message().indexOf('The list item could not be added or updated because duplicate values') !== -1) {
                    if (callback) callback({ method: 'createUserProductItem', message: args.get_message(), error: true, duplicate: true });
                } else {
                    if (callback) callback({ method: 'createUserProductItem', message: args.get_message(), error: true });
                }
            }
        }
    }

    function product_updateUserProduct(info, callback) {
        queueUserProduct(info, callback);

        function queueUserProduct(info, callback) {
            COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.EDITUSERPRODUCT, [{ data: info.data.models[0].id }], function (r) {
                if (r.error) {
                    console.error(r.message);
                    if (callback) callback({ method: 'product_updateUserProduct', message: r.message, error: true });
                } else {
                    if (callback) callback({ error: false });
                }
            });
        }

        //unused
        function updateUserProductItem(info, callback, loop) {
            var queueArray = [];
            var ctx = getContext();
            var web = ctx.get_web();
            var oList = web.get_lists().getByTitle(COMM.PROPERTY.USERPRODUCT.LIST);

            //save to user product list
            for (var i = (loop * COMM.PROPERTY.BATCHCOUNT), j = 0 ; (i < info.data.models.length && j < COMM.PROPERTY.BATCHCOUNT) ; i++, j++) {
                var oListItem = oList.getItemById(info.data.models[i].id);
                queueArray.push({ data: info.data.models[i].access + ';' + info.data.models[i].userRefId + ';' + info.data.models[i].dilProductId });
                oListItem.set_item(COMM.PROPERTY.USERPRODUCT.ACCESS, info.data.models[i].access);
                oListItem.set_item(COMM.PROPERTY.OWSHIDDENVERSION, info.data.models[i].objVersion);
                oListItem.update();
                ctx.load(oListItem);
            }
            ctx.executeQueryAsync(function () {
                COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.EDITUSERPRODUCT, queueArray, function (r) {
                    if (r.error) {
                        console.error(r.message);
                        if (callback) callback({ method: 'updateUserProductItem', message: r.message, error: true });
                    } else {
                        if (loop < (Math.ceil(info.data.models.length / COMM.PROPERTY.BATCHCOUNT) - 1)) {
                            updateUserProductItem(info, callback, loop + 1);
                        } else {
                            //update group permission  
                            updateUserGroupPermission(0);
                        }
                    }
                });

                function updateUserGroupPermission(i) {
                    var user = web.ensureUser(info.data.models[i].userName);
                    ctx.load(user);                              
                    var siteGroupsOpen = web.get_siteGroups();
                    var siteGroups = web.get_siteGroups();

                    var spGroupOpen = siteGroupsOpen.getById(info.data.models[i].susarOpenGroupId);
                    var spGroup = siteGroups.getById(info.data.models[i].susarGroupId);

                    var userCollection = spGroup.get_users();
                    var userCollectionOpen = spGroupOpen.get_users();

                    if (info.data.models[i].access === "Blinded") {
                        var userOpen = userCollectionOpen.getById(info.data.models[i].userId);
                        userCollectionOpen.remove(userOpen);
                        ctx.load(spGroupOpen);
                    } else if (info.data.models[i].access === "Open") {
                        userCollectionOpen.addUser(user);
                        ctx.load(spGroupOpen);
                        userCollection.addUser(user);
                        ctx.load(spGroup);
                    }
                    ctx.executeQueryAsync(function () {
                        (i < info.data.models.length - 1) ? updateUserGroupPermission(i + 1) : callback({ data: info, error: false });
                    }, function (sender, args) {
                        if (args.get_message().indexOf('User cannot be found') !== -1) {
                            (i < info.data.models.length - 1) ? updateUserGroupPermission(i + 1) : callback({ data: info, error: false });
                        } else {
                            callback({ message: args.get_message(), error: true });
                        }
                    });
                }

            }, onQueryFailed);

            function onQueryFailed(sender, args) {
                console.error({ method: 'updateUserProductItem', message: args.get_message(), error: true });
                if (callback) callback({ method: 'updateUserProductItem', message: args.get_message(), error: true });
            }
        }
    }

    function product_deleteUserProduct(info, callback) {
        queueUserProduct(info, callback);

        function queueUserProduct(info, callback) {
            COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.REMOVEUSERPRODUCT, [{ data: info.data.models[0].id }], function (r) {
                if (r.error) {
                    console.error(r.message);
                    if (callback) callback({ method: 'product_deleteUserProduct', message: r.message, error: true });
                } else {
                    if (callback) callback({ error: false });
                }
            });
        }
        function deleteUserProductItem(info, callback, loop) {
            var ctx = getContext();
            var web = ctx.get_web();
            var arr = [];
            deleteUserProductItem(info, callback, 0);
            var queueArray = [];
            //remove items from user product list
            var oList = web.get_lists().getByTitle(COMM.PROPERTY.USERPRODUCT.LIST);
            for (var i = (loop * COMM.PROPERTY.BATCHCOUNT), j = 0 ; (i < info.data.models.length && j < COMM.PROPERTY.BATCHCOUNT) ; i++, j++) {
                if (info.data.models[i].deleteRequested || typeof info.data.models[i].deleteRequested === 'undefined') {
                    if (arr.indexOf(info.data.models[i].id) !== -1) continue;
                    arr.push(info.data.models[i].id);
                    var oListItem = oList.getItemById(info.data.models[i].userProductId ? info.data.models[i].userProductId : info.data.models[i].id);
                    queueArray.push({ data: info.data.models[i].access + ';' + info.data.models[i].userRefId + ';' + info.data.models[i].dilProductId });
                    oListItem.deleteObject();
                }
            }

            ctx.executeQueryAsync(function () {
                COMM.addToQueueList(COMM.PROPERTY.QUEUELIST.REMOVEUSERPRODUCT, queueArray, function (r) {
                    if (r.error) {
                        console.error(r.message);
                        if (callback) callback({ method: 'deleteUserProductItem', message: r.message, error: true });
                    } else {
                        if (loop < (Math.ceil(info.data.models.length / COMM.PROPERTY.BATCHCOUNT) - 1)) {
                            deleteUserProductItem(info, callback, loop + 1);
                        } else {
                            if (callback) callback({ data: info, error: false });
                        }
                    }
                });                
            }, onQueryFailed);            

            function onQueryFailed(sender, args) {
                console.error({ method: 'deleteUserProductItem', message: args.get_message(), error: true });
                if (callback) callback({ method: 'deleteUserProductItem', message: args.get_message(), error: true });
            }
        }
    }

	/************ METADATA tab ************/

    function updateWelcomeMessage(info, callback) {
    	var ctx = getContext();
    	var list = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.WELCOMEMESSAGE.LIST);

    	items = list.getItemById(info.data.id);
    	ctx.load(items);

    	items.set_item(COMM.PROPERTY.WELCOMEMESSAGE.MESSAGE, info.data.message);
    	items.set_item(COMM.PROPERTY.OWSHIDDENVERSION, info.data.objVersion);

    	items.update();
    	ctx.load(items)
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    	function onQuerySucceeded() {
    		callback({ error: false, updated: true });
    	}

    	function onQueryFailed(sender, args) {
    		console.error({ message: 'updateWelcomeMessage: ' + args.get_message(), error: true });
    		callback({ message: 'updateWelcomeMessage: ' + args.get_message(), error: true });
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

    function checkAwareINNIfAssociatedToProduct(info, callback) {
    	var associatedToProduct = null;

    	var ctx = getContext();
    	var web = ctx.get_web(),
			list = web.get_lists().getByTitle(COMM.PROPERTY.PRODUCT.LIST);

    	getList();

    	function getList() {

    		var camlQuery = new SP.CamlQuery();
    		var query = '';
    		query = '<View>' +
						'<Query>' +
							'<Where>' +
                                '<And>' +
                                    '<Eq>' +
                                        '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.INN + '/>' +
                                        '<Value Type="Text">' + info.inn + '</Value>' +
								    '</Eq>' +
                                    '<Neq>' +
                                        '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.STATUS + '/>' +
                                        '<Value Type="Text">' + COMM.PROPERTY.PRODUCT.RETIRED + '</Value>' +
                                    '</Neq>' +
                                '</And>' +
							'</Where>' +
						'</Query>' +
						'<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '</ViewFields>' +
						'<RowLimit>1</RowLimit>' +
					'</View>';
    		camlQuery.set_viewXml(query);
    		var items = list.getItems(camlQuery);
    		var row_info = ctx.loadQuery(items);
    		ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    		function onQuerySucceeded() {

    			if (row_info.length !== 0) {
    				associatedToProduct = true;
    			}
    			else {
    				associatedToProduct = false;
    			}

    			callback(associatedToProduct);
    		}

    		function onQueryFailed(sender, args) {
    		    console.error({ message: 'Check PV Database INN if Associated to Product: ' + args.get_message(), error: true });
    		    callback({ message: 'Check PV Database INN if Associated to Product: ' + args.get_message(), error: true });
    		}
    	}
    }

    function addAWAREINN(info, callback) {
    	var ctx = getContext();
    	var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.INN.LIST);
    	var itemCreateInfo = new SP.ListItemCreationInformation();
    	var oListItem = oList.addItem(itemCreateInfo);

    	oListItem.set_item(COMM.PROPERTY.TITLE, info.awareINN);
    	oListItem.set_item(COMM.PROPERTY.INN.SOURCE, info.sourceINN);
    	oListItem.set_item(COMM.PROPERTY.INN.RETIRED, info.retired);

    	oListItem.update();
    	ctx.load(oListItem);
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    	function onQuerySucceeded() {
    		var id = oListItem.get_id();
    		callback({ id: oListItem.get_id(), error: false });
    	}
    	function onQueryFailed(sender, args) {
    		console.error({ message: args.get_message(), error: true });
    		if (args.get_message().indexOf('The list item could not be added or updated because duplicate values') !== -1) {
    			callback({ duplicate: true, error: true });
    		} else {
    			callback({ error: true });
    		}
    	}
    }

    function updateAWAREINN(info, callback) {
    	var ctx = getContext();
    	var list = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.INN.LIST);

    	items = list.getItemById(info.data.models[0].id);
    	ctx.load(items);

    	items.set_item(COMM.PROPERTY.INN.RETIRED, info.data.models[0].retired);
    	items.set_item(COMM.PROPERTY.INN.SOURCE, info.data.models[0].sourceInn);
    	items.set_item(COMM.PROPERTY.OWSHIDDENVERSION, info.data.models[0].objVersion);

    	items.update();
    	ctx.load(items)
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    	function onQuerySucceeded() {
    		callback({ error: false });
    	}

    	function onQueryFailed(sender, args) {
    		console.error({ message: 'updateAWAREINN: ' + args.get_message(), error: true });
    		callback({ message: 'updateAWAREINN: ' + args.get_message(), error: true });
    	}
    }

    function checkAwareStudyIfAssociatedToStudy(info, callback) {
    	var associatedToStudy = null;

    	var ctx = getContext();
    	var web = ctx.get_web(),
			list = web.get_lists().getByTitle(COMM.PROPERTY.STUDY.LIST);

    	getList();

    	function getList() {

    		var camlQuery = new SP.CamlQuery();
    		var query = '';
    		query = '<View>' +
						'<Query>' +
							'<Where>' +
                                '<Eq>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.STUDY.STUDYID + '/>' +
                                    '<Value Type="Text">' + info.inn + '</Value>' +
								'</Eq>' +
							'</Where>' +
						'</Query>' +
						'<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '</ViewFields>' +
						'<RowLimit>1</RowLimit>' +
					'</View>';
    		camlQuery.set_viewXml(query);
    		var items = list.getItems(camlQuery);
    		var row_info = ctx.loadQuery(items);
    		ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    		function onQuerySucceeded() {

    			if (row_info.length !== 0) {
    				associatedToStudy = true;
    			}
    			else {
    				associatedToStudy = false;
    			}

    			callback(associatedToStudy);
    		}

    		function onQueryFailed(sender, args) {
    			console.error({ message: 'Check Aware Study if Associated to Study: ' + args.get_message(), error: true });
    			callback({ message: 'Check Aware Study if Associated to Study: ' + args.get_message(), error: true });
    		}
    	}
    }

    function addAWAREStudies(info, callback) {
    	var ctx = getContext();
    	var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.AWARESTUDYINN.LIST);
    	var itemCreateInfo = new SP.ListItemCreationInformation();
    	var oListItem = oList.addItem(itemCreateInfo);

    	oListItem.set_item(COMM.PROPERTY.TITLE, info.studyINN);
    	oListItem.set_item(COMM.PROPERTY.AWARESTUDYINN.DRUGNAME, info.drugName);
    	oListItem.set_item(COMM.PROPERTY.AWARESTUDYINN.RETIRED, info.retired);

    	oListItem.update();
    	ctx.load(oListItem);
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    	function onQuerySucceeded() {
    		var id = oListItem.get_id();
    		callback({ id: oListItem.get_id(), error: false });
    	}
    	function onQueryFailed(sender, args) {
    		console.error({ message: args.get_message(), error: true });
    		if (args.get_message().indexOf('The list item could not be added or updated because duplicate values') !== -1) {
    			callback({ duplicate: true, error: true });
    		} else {
    			callback({ error: true });
    		}
    	}
    }

    function updateAwareStudy(info, callback) {
    	var ctx = getContext();
    	var list = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.AWARESTUDYINN.LIST);

    	items = list.getItemById(info.data.models[0].id);
    	ctx.load(items);

    	items.set_item(COMM.PROPERTY.AWARESTUDYINN.DRUGNAME, info.data.models[0].drugName);
    	items.set_item(COMM.PROPERTY.AWARESTUDYINN.RETIRED, info.data.models[0].retired);
    	items.set_item(COMM.PROPERTY.OWSHIDDENVERSION, info.data.models[0].objVersion);

    	items.update();
    	ctx.load(items)
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    	function onQuerySucceeded() {
    		callback({ error: false });
    	}

    	function onQueryFailed(sender, args) {
    		console.error({ message: 'updateAWAREStudy: ' + args.get_message(), error: true });
    		callback({ message: 'updateAWAREStudy: ' + args.get_message(), error: true });
    	}
    }

    function checkUserEntityIfAssociatedToUser(info, callback) {
    	var associatedToUser = null;

    	var ctx = getContext();
    	var web = ctx.get_web(),
			list = web.get_lists().getByTitle(COMM.PROPERTY.USER.LIST);

    	getList();

    	function getList() {

    		var camlQuery = new SP.CamlQuery();
    		var query = '';
    		query = '<View>' +
						'<Query>' +
							'<Where>' +
                                '<And>' +
                                    '<Eq>' +
                                        '<FieldRef Name=' + COMM.PROPERTY.USER.ENTITY + '/>' +
                                        '<Value Type="Text">' + info.entity + '</Value>' +
								    '</Eq>' +
							        '<Eq>' +
								        '<FieldRef Name="' + COMM.PROPERTY.USER.STATUS + '"/>' +
								        '<Value Type="Text">' + COMM.PROPERTY.USER.ACTIVE + '</Value>' +
							        '</Eq>' +
                                '</And>' +
							'</Where>' +
						'</Query>' +
						'<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '</ViewFields>' +
						'<RowLimit>1</RowLimit>' +
					'</View>';
    		camlQuery.set_viewXml(query);
    		var items = list.getItems(camlQuery);
    		var row_info = ctx.loadQuery(items);
    		ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    		function onQuerySucceeded() {

    			if (row_info.length !== 0) {
    				associatedToUser = true;
    			}
    			else {
    				associatedToUser = false;
    			}

    			callback(associatedToUser);
    		}

    		function onQueryFailed(sender, args) {
    			console.error({ message: 'Check User Entity if Associated to User: ' + args.get_message(), error: true });
    			callback({ message: 'Check User Entity if Associated to User: ' + args.get_message(), error: true });
    		}
    	}
    }

    function addUserEntity(info, callback) {
    	var ctx = getContext();
    	var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.USERENTITY.LIST);
    	var itemCreateInfo = new SP.ListItemCreationInformation();
    	var oListItem = oList.addItem(itemCreateInfo);

    	oListItem.set_item(COMM.PROPERTY.TITLE, info.companyName);
    	oListItem.set_item(COMM.PROPERTY.USERENTITY.RETIRED, info.retired);

    	oListItem.update();
    	ctx.load(oListItem);
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    	function onQuerySucceeded() {
    		var id = oListItem.get_id();
    		callback({ id: oListItem.get_id(), error: false });
    	}
    	function onQueryFailed(sender, args) {
    		if (args.get_message().indexOf('The list item could not be added or updated because duplicate values') !== -1) {
    			callback({ duplicate: true, error: true });
    		} else {
    			callback({ error: true });
    		}
    	}
    }

    function updateUserEntity(info, callback) {
    	var ctx = getContext();
    	var list = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.USERENTITY.LIST);

    	items = list.getItemById(info.data.models[0].id);
    	ctx.load(items);

    	items.set_item(COMM.PROPERTY.USERENTITY.RETIRED, info.data.models[0].retired);
    	items.set_item(COMM.PROPERTY.OWSHIDDENVERSION, info.data.models[0].objVersion);

    	items.update();
    	ctx.load(items)
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    	function onQuerySucceeded() {
    		callback({ error: false });
    	}

    	function onQueryFailed(sender, args) {
    		console.error({ message: 'updateUserEntity: ' + args.get_message(), error: true });
    		callback({ message: 'updateUserEntity: ' + args.get_message(), error: true });
    	}
    }

    function checkStudySponsorshipIfAssociatedToStudy(info, callback) {
    	var associatedToStudy = null;

    	var ctx = getContext();
    	var web = ctx.get_web(),
			list = web.get_lists().getByTitle(COMM.PROPERTY.STUDY.LIST);

    	getList();

    	function getList() {

    		var camlQuery = new SP.CamlQuery();
    		var query = '';
    		query = '<View>' +
						'<Query>' +
							'<Where>' +
                                '<Eq>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.STUDY.STUDYSPONSORSHIP + '/>' +
                                    '<Value Type="Text">' + info.studySponsorship + '</Value>' +
								'</Eq>' +
							'</Where>' +
						'</Query>' +
						'<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '</ViewFields>' +
						'<RowLimit>1</RowLimit>' +
					'</View>';
    		camlQuery.set_viewXml(query);
    		var items = list.getItems(camlQuery);
    		var row_info = ctx.loadQuery(items);
    		ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    		function onQuerySucceeded() {

    			if (row_info.length !== 0) {
    				associatedToStudy = true;
    			}
    			else {
    				associatedToStudy = false;
    			}

    			callback(associatedToStudy);
    		}

    		function onQueryFailed(sender, args) {
    			console.error({ message: 'Check Study Sponsorship if Associated to Study: ' + args.get_message(), error: true });
    			callback({ message: 'Check Study Sponsorship if Associated to Study: ' + args.get_message(), error: true });
    		}
    	}
    }

    function addStudySponsorship(info, callback) {
    	var ctx = getContext();
    	var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.STUDYSPONSORSHIP.LIST);
    	var itemCreateInfo = new SP.ListItemCreationInformation();
    	var oListItem = oList.addItem(itemCreateInfo);

    	oListItem.set_item(COMM.PROPERTY.TITLE, info.companyName);
    	oListItem.set_item(COMM.PROPERTY.STUDYSPONSORSHIP.RETIRED, info.retired);

    	oListItem.update();
    	ctx.load(oListItem);
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    	function onQuerySucceeded() {
    		var id = oListItem.get_id();
    		callback({ id: oListItem.get_id(), error: false });
    	}
    	function onQueryFailed(sender, args) {
    		console.error({ message: args.get_message(), error: true });
    		if (args.get_message().indexOf('The list item could not be added or updated because duplicate values') !== -1) {
    			callback({ duplicate: true, error: true });
    		} else {
    			callback({ error: true });
    		}
    	}
    }

    function updateStudySponsorship(info, callback) {
    	var ctx = getContext();
    	var list = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.STUDYSPONSORSHIP.LIST);

    	items = list.getItemById(info.data.models[0].id);
    	ctx.load(items);

    	items.set_item(COMM.PROPERTY.STUDYSPONSORSHIP.RETIRED, info.data.models[0].retired);
    	items.set_item(COMM.PROPERTY.OWSHIDDENVERSION, info.data.models[0].objVersion);

    	items.update();
    	ctx.load(items)
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    	function onQuerySucceeded() {
    		callback({ error: false });
    	}

    	function onQueryFailed(sender, args) {
    		console.error({ message: 'updateStudySponsorship: ' + args.get_message(), error: true });
    		callback({ message: 'updateStudySponsorship: ' + args.get_message(), error: true });
    	}
    }

    function checkProductEntityIfAssociatedToProduct(info, callback) {
    	var associatedToProduct = null;

    	var ctx = getContext();
    	var web = ctx.get_web(),
			list = web.get_lists().getByTitle(COMM.PROPERTY.PRODUCT.LIST);

    	getList();

    	function getList() {

    		var camlQuery = new SP.CamlQuery();
    		var query = '';
    		query = '<View>' +
						'<Query>' +
							'<Where>' +
                                '<And>' +
                                    '<Eq>' +
                                        '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.ENTITY + '/>' +
                                        '<Value Type="Text">' + info.entity + '</Value>' +
								    '</Eq>' +
                                    '<Neq>' +
                                        '<FieldRef Name=' + COMM.PROPERTY.PRODUCT.STATUS + '/>' +
                                        '<Value Type="Text">' + COMM.PROPERTY.PRODUCT.RETIRED + '</Value>' +
                                    '</Neq>' +
                                '</And>' +
							'</Where>' +
						'</Query>' +
						'<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '</ViewFields>' +
						'<RowLimit>1</RowLimit>' +
					'</View>';
    		camlQuery.set_viewXml(query);
    		var items = list.getItems(camlQuery);
    		var row_info = ctx.loadQuery(items);
    		ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    		function onQuerySucceeded() {

    			if (row_info.length !== 0) {
    				associatedToProduct = true;
    			}
    			else {
    				associatedToProduct = false;
    			}

    			callback(associatedToProduct);
    		}

    		function onQueryFailed(sender, args) {
    			console.error({ message: 'Check Product Entity if Associated to Product: ' + args.get_message(), error: true });
    			callback({ message: 'Check Product Entity if Associated to Product: ' + args.get_message(), error: true });
    		}
    	}
    }

    function addProductEntity(info, callback) {
    	var ctx = getContext();
    	var oList = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.PRODUCTENTITY.LIST);
    	var itemCreateInfo = new SP.ListItemCreationInformation();
    	var oListItem = oList.addItem(itemCreateInfo);

    	oListItem.set_item(COMM.PROPERTY.TITLE, info.companyName);
    	oListItem.set_item(COMM.PROPERTY.PRODUCTENTITY.RETIRED, info.retired);

    	oListItem.update();
    	ctx.load(oListItem);
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    	function onQuerySucceeded() {
    		var id = oListItem.get_id();
    		callback({ id: oListItem.get_id(), error: false });
    	}
    	function onQueryFailed(sender, args) {
    		if (args.get_message().indexOf('The list item could not be added or updated because duplicate values') !== -1) {
    			callback({ duplicate: true, error: true });
    		} else {
    			callback({ error: true });
    		}
    	}
    }

    function updateProductEntity(info, callback) {
    	var ctx = getContext();
    	var list = ctx.get_web().get_lists().getByTitle(COMM.PROPERTY.PRODUCTENTITY.LIST);

    	items = list.getItemById(info.data.models[0].id);
    	ctx.load(items);

    	items.set_item(COMM.PROPERTY.PRODUCTENTITY.RETIRED, info.data.models[0].retired);
    	items.set_item(COMM.PROPERTY.OWSHIDDENVERSION, info.data.models[0].objVersion);

    	items.update();
    	ctx.load(items)
    	ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

    	function onQuerySucceeded() {
    		callback({ error: false });
    	}

    	function onQueryFailed(sender, args) {
    		console.error({ message: 'updateProductEntity: ' + args.get_message(), error: true });
    		callback({ message: 'updateProductEntity: ' + args.get_message(), error: true });
    	}
    }

    function getProductEntityList(callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.PRODUCTENTITY.LIST);

        var camlQuery = new SP.CamlQuery();
        var query = '';
        query = '<View>' +
                   '<Query>' +
                       '<OrderBy>' +
                           '<FieldRef Name=' + COMM.PROPERTY.ID + ' Ascending="FALSE"/>' +
                       '</OrderBy>' +
                   '</Query>' +
                    '<ViewFields>' +
                        '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '<FieldRef Name=' + COMM.PROPERTY.TITLE + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.PRODUCTENTITY.RETIRED + '/>' +
                    '</ViewFields>' +
               '</View>';
        camlQuery.set_viewXml(query);
        var items = list.getItems(camlQuery);
        var row_info = ctx.loadQuery(items);
        ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

        function onQuerySucceeded() {
            var objArray = [];
            for (var i = 0; i < row_info.length; i++) {
                objArray.push({
                    id: row_info[i].get_item(COMM.PROPERTY.ID),
                    entity: row_info[i].get_item(COMM.PROPERTY.TITLE),
                    retired: row_info[i].get_item(COMM.PROPERTY.PRODUCTENTITY.RETIRED),
                    objVersion: row_info[i].get_objectVersion(),
                });
            }
            callback(objArray);
        }

        function onQueryFailed(sender, args) {
            callback({ message: "Get User Entity: " + args.get_message(), error: true });
        }
    }
    
    function getStudySponsorshipList(callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.STUDYSPONSORSHIP.LIST);

        var camlQuery = new SP.CamlQuery();
        var query = '';
        query = '<View>' +
                   '<Query>' +
                       '<OrderBy>' +
                           '<FieldRef Name=' + COMM.PROPERTY.ID + ' Ascending="FALSE"/>' +
                       '</OrderBy>' +
                   '</Query>' +
                   '<ViewFields>' +
                        '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '<FieldRef Name=' + COMM.PROPERTY.TITLE + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.STUDYSPONSORSHIP.RETIRED + '/>' +
                   '</ViewFields>' +
               '</View>';
        camlQuery.set_viewXml(query);
        var items = list.getItems(camlQuery);
        var row_info = ctx.loadQuery(items);
        ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

        function onQuerySucceeded() {
            var objArray = [];
            for (var i = 0; i < row_info.length; i++) {
                objArray.push({
                    id: row_info[i].get_item(COMM.PROPERTY.ID),
                    studySponsorship: row_info[i].get_item(COMM.PROPERTY.TITLE),
                    retired: row_info[i].get_item(COMM.PROPERTY.STUDYSPONSORSHIP.RETIRED),
                    objVersion: row_info[i].get_objectVersion(),
                });
            }
            callback(objArray);
        }

        function onQueryFailed(sender, args) {
            callback({ message: "Get Study Sponsorship: " + args.get_message(), error: true });
        }
    }
    
    function getUserEntityList(callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.USERENTITY.LIST);

        var camlQuery = new SP.CamlQuery();
        var query = '';
        query = '<View>' +
                   '<Query>' +
                       '<OrderBy>' +
                           '<FieldRef Name=' + COMM.PROPERTY.ID + ' Ascending="FALSE"/>' +
                       '</OrderBy>' +
                   '</Query>' +
                   '<ViewFields>' +
                        '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '<FieldRef Name=' + COMM.PROPERTY.TITLE + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.USERENTITY.RETIRED + '/>' +
                   '</ViewFields>' +
               '</View>';
        camlQuery.set_viewXml(query);
        var items = list.getItems(camlQuery);
        var row_info = ctx.loadQuery(items);
        ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

        function onQuerySucceeded() {
            var objArray = [];
            for (var i = 0; i < row_info.length; i++) {
                objArray.push({
                    id: row_info[i].get_item(COMM.PROPERTY.ID),
                    userEntity: row_info[i].get_item(COMM.PROPERTY.TITLE),
                    retired: row_info[i].get_item(COMM.PROPERTY.USERENTITY.RETIRED),
                    objVersion: row_info[i].get_objectVersion(),
                });
            }
            callback(objArray);
        }

        function onQueryFailed(sender, args) {
            callback({ message: "Get User Entity: " + args.get_message(), error: true });
        }
    }

    function awareStudyInnList(callback) {

        var ctx = getContext();
        var web = ctx.get_web(),
			list = web.get_lists().getByTitle(COMM.PROPERTY.AWARESTUDYINN.LIST);

        var row_info = [];
        var objArray = [];

        getList(null);

        function getList(itemPosition) {

        	//Set page position
        	var position = typeof itemPosition === 'undefined' ? null : itemPosition;
        	if (itemPosition !== null) {
        		position = new SP.ListItemCollectionPosition();
        		position.set_pagingInfo(itemPosition);
        	}

        	var camlQuery = new SP.CamlQuery();
        	camlQuery.set_listItemCollectionPosition(position);
            var query = '';
            query = '<View>' +
						'<Query>' +
							'<OrderBy>' +
								'<FieldRef Name="ID" Ascending="FALSE"/>' +
							'</OrderBy>' +
						'</Query>' +
                        '<ViewFields>' +
                            '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.TITLE + '/>' +
                            '<FieldRef Name=' + COMM.PROPERTY.AWARESTUDYINN.DRUGNAME + '/>' +
							'<FieldRef Name=' + COMM.PROPERTY.AWARESTUDYINN.RETIRED + '/>' +
                        '</ViewFields>' +
						'<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
					'</View>';
            camlQuery.set_viewXml(query);
            var items = list.getItems(camlQuery);
            row_info = ctx.loadQuery(items);

            ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
        }

        function onQuerySucceeded() {
        	try {
        		for (var i = 0; i < row_info.length; i++) {
        			objArray.push({
        				id: row_info[i].get_item(COMM.PROPERTY.ID),
        				studyInn: row_info[i].get_item(COMM.PROPERTY.TITLE),
        				drugName: row_info[i].get_item(COMM.PROPERTY.AWARESTUDYINN.DRUGNAME),
        				retired: row_info[i].get_item(COMM.PROPERTY.AWARESTUDYINN.RETIRED),
        				objVersion: row_info[i].get_objectVersion(),
        			});
        		}
        	}
        	catch (error) {
        		console.log(error);
        	}

        	if (row_info.length > 0 && row_info.length === COMM.PROPERTY.ROWLIMIT) {
        		getList(COMM.PROPERTY.PAGINGINFOPREFIX + row_info[row_info.length - 1].get_item(COMM.PROPERTY.ID));
        	} else {
        		callback(objArray);
        	}

        }

        function onQueryFailed(sender, args) {            
            callback({ message: 'Get Study PV Database INN: ' + args.get_message(), error: true });
        }
    }

    function awareInnList(callback) {

    		var ctx = getContext();
    		var web = ctx.get_web(),
				list = web.get_lists().getByTitle(COMM.PROPERTY.INN.LIST);
    		var objArray = [];
    		var row_info = [];

    		getList(null);

    		function getList(itemPosition) {

    			//Set page position
    			var position = typeof itemPosition === 'undefined' ? null : itemPosition;
    			if (itemPosition !== null) {
    				position = new SP.ListItemCollectionPosition();
    				position.set_pagingInfo(itemPosition);
    			}

    			var camlQuery = new SP.CamlQuery();
    			camlQuery.set_listItemCollectionPosition(position);
    			var query = '';
    			query = '<View>' +
							'<Query>' +
								'<OrderBy>' +
									'<FieldRef Name="ID" Ascending="FALSE"/>' +
								'</OrderBy>' +
							'</Query>' +
							'<ViewFields>' +
								'<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
								'<FieldRef Name=' + COMM.PROPERTY.TITLE + '/>' +
								'<FieldRef Name=' + COMM.PROPERTY.INN.RETIRED + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.INN.SOURCE + '/>' +
							'</ViewFields>' +
							'<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
						'</View>';
    			camlQuery.set_viewXml(query);
    			var items = list.getItems(camlQuery);
    			row_info = ctx.loadQuery(items);

    			ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    		}

    		function onQuerySucceeded() {
    			try {
    				for (var i = 0; i < row_info.length; i++) {
    					objArray.push({
    						id: row_info[i].get_item(COMM.PROPERTY.ID),
    						awareInn: row_info[i].get_item(COMM.PROPERTY.TITLE),
    						sourceInn: row_info[i].get_item(COMM.PROPERTY.INN.SOURCE),
    						retired: row_info[i].get_item(COMM.PROPERTY.INN.RETIRED),
    						objVersion: row_info[i].get_objectVersion(),
    					});
    				}
    			}
    			catch (error) {
    				console.log(error);
    			}

    			if (row_info.length > 0 && row_info.length === COMM.PROPERTY.ROWLIMIT) {
    				getList(COMM.PROPERTY.PAGINGINFOPREFIX + row_info[row_info.length - 1].get_item(COMM.PROPERTY.ID));
    			} else {
    				callback(objArray);
    			}

    		}

    		function onQueryFailed(sender, args) {
    		    callback({ message: 'Get Study PV Database INN: ' + args.get_message(), error: true });
    		}
    }

    function getUserRightsAccessLog(info, callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
            list = web.get_lists().getByTitle(COMM.PROPERTY.USERACCESSLOGVIEW.LIST);

        var camlQuery = new SP.CamlQuery();
        var query = '';
        var idQuery = '';
        var viewFieldQuery = '';
        if (info.isByProduct) {
            viewFieldQuery = '<FieldRef Name=' + COMM.PROPERTY.USERACCESSLOGVIEW.DISPLAYNAME + '/>';
            idQuery = '<Eq>' +
                        '<FieldRef Name=' + COMM.PROPERTY.USERACCESSLOGVIEW.DILPRODUCT + ' LookupId="TRUE"/>' +
                        '<Value Type="Integer">' + info.rowId + '</Value>' +
                    '</Eq>';
        } else {
            viewFieldQuery = '<FieldRef Name=' + COMM.PROPERTY.USERACCESSLOGVIEW.DILPRODUCT + '/>';
            idQuery = '<Eq>' +
                        '<FieldRef Name=' + COMM.PROPERTY.USERACCESSLOGVIEW.USERID + '/>' +
                        '<Value Type="Number">' + info.rowId + '</Value>' +
                    '</Eq>';
        }
        query = '<View>' +
                    '<Query>' +
                        '<Where>' +
                            '<And>' +
                                '<And>' +
                                    idQuery +
                                    '<And>' +
                                        '<Geq>' +
                                            '<FieldRef Name=' + COMM.PROPERTY.CREATED + ' />' +
                                            '<Value IncludeTimeValue="FALSE" StorageTZ="TRUE" Type="DateTime">' + info.startDate + '</Value>' +
                                        '</Geq>' +
                                        '<Leq>' +
                                            '<FieldRef Name=' + COMM.PROPERTY.CREATED + ' />' +
                                            '<Value IncludeTimeValue="FALSE" StorageTZ="TRUE" Type="DateTime">' + info.endDate + '</Value>' +
                                        '</Leq>' +
                                    '</And>' +
                                '</And>' +                               
                                '<IsNotNull>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.USERACCESSLOGVIEW.USERID + ' />' +
                                '</IsNotNull>' +
                            '</And>' +
                        '</Where>' +
                    '</Query>' +
                    '<ViewFields>' +
                        '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                        '<FieldRef Name=' + COMM.PROPERTY.USERACCESSLOGVIEW.ACCESS + '/>' +
                        '<FieldRef Name=' + COMM.PROPERTY.USERACCESSLOGVIEW.ACTION + '/>' +
                        viewFieldQuery + 
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
                    var user = '', product = '';
                    if (info.isByProduct) {
                        user = row_info[i].get_item(COMM.PROPERTY.USERACCESSLOGVIEW.DISPLAYNAME);
                    } else {
                        product = (row_info[i].get_item(COMM.PROPERTY.USERACCESSLOGVIEW.DILPRODUCT)) ? row_info[i].get_item(COMM.PROPERTY.USERACCESSLOGVIEW.DILPRODUCT).get_lookupValue() : '';
                    }

                    var obj = {
                        id: row_info[i].get_item(COMM.PROPERTY.ID),
                        userName: user,
                        dilProductName: product,
                        access: row_info[i].get_item(COMM.PROPERTY.USERACCESSLOGVIEW.ACCESS),
                        action: row_info[i].get_item(COMM.PROPERTY.USERACCESSLOGVIEW.ACTION),
                        created: row_info[i].get_item(COMM.PROPERTY.CREATED)
                    };
                    objArray.push(obj);
                }
            } catch (err) {
                callback({ message: err, error: false, noData: true });
                return;
            }
            callback(objArray.reverse());
        }

        function onQueryFailed(sender, args) {
            callback({ message: args.get_message(), error: true });
        }
    }

    function metaGetSourceINN(callback) {
        var SourceInn = [
            { "SourceInnID": 1, "SourceInn": "AWARE" },
            { "SourceInnID": 2, "SourceInn": "Not in AWARE" }           
        ]
        callback(SourceInn);
    }

    //==================== AUDIT TRAIL ====================================

    function getAuditTrailProduct(queryString, callback) {
        var outputArray = [];
        getProductAudTrail(queryString, callback);

        function getProductAudTrail(queryString, callback) {
            var outputLog = [];
            var fieldNames = COMM.auditTrailProductsFieldNames;
            //Get susar data
            if (queryString.id) {
                for (var h = 0; h < fieldNames.length; h++) {
                    if (h === 0) { //First array is modified, should have a "utc" added to string
                        $().SPServices({
                            operation: "GetVersionCollection",
                            async: false,
                            strlistID: queryString.listname,
                            strlistItemID: queryString.id,
                            strFieldName: fieldNames[h].fieldName,
                            completefunc: function (xData, Status) {
                                $(xData.responseText).find("Version").each(function (i) {
                                    var field = fieldNames[h].name, obj = {};
                                    obj[field] = $(this).attr(fieldNames[h].fieldName) + " UTC";
                                    outputLog.push(obj);
                                });
                            }
                        });
                    } else {
                        $().SPServices({
                            operation: "GetVersionCollection",
                            async: false,
                            strlistID: queryString.listname,
                            strlistItemID: queryString.id,
                            strFieldName: fieldNames[h].fieldName,
                            completefunc: function (xData, Status) {
                                $(xData.responseText).find("Version").each(function (i) {
                                    if (fieldNames[h].name === "Version") {
                                    var field = fieldNames[h].name;
                                    outputLog[i][field] = $(this).attr(fieldNames[h].fieldName);
                                    } else {
                                        var field = fieldNames[h].name;
                                        var metaModified = $(this).attr("Modified");
                                        var metaModified = kendo.toString(new Date(metaModified), "MM/dd/yyyy HH:mm:ss");
                                        for (var j = 0; j < outputLog.length; j++) {
                                            var dateComp = kendo.toString(new Date(outputLog[j].Modified), "MM/dd/yyyy HH:mm:ss");
                                            if (dateComp === metaModified) {
                                                outputLog[j][field] = $(this).attr(fieldNames[h].fieldName);
                                            }
                                        }
                                    }
                                });
                            }
                        });
                    }
                }                
                auditManageValues(outputLog, callback);
            } else {
                callback(outputArray);
            }
        }

        function auditManageValues(outputLog, callback) {           
            //Filtration
            if (outputLog.length !== 0) {
                for (var i = 0; i < outputLog.length; i++) {
                    outputArray.push({
                        id: outputLog[i].id,
                        Version: outputLog[i].Version,                       
                        ProductCode: (outputLog[i].ProductCode) ? outputLog[i].ProductCode : "",                       
                        AWAREINN: (outputLog[i].AWAREINN) ? outputLog[i].AWAREINN : "",
                        ProductEntity: (outputLog[i].ProductEntity) ? outputLog[i].ProductEntity : "",
                        DILProduct: (outputLog[i].DILProduct) ? outputLog[i].DILProduct : "",
                        susarOpenGroupId: (outputLog[i].susarOpenGroupId) ? outputLog[i].susarOpenGroupId : "",
                        susarGroupId: (outputLog[i].susarGroupId) ? outputLog[i].susarGroupId : "",
                        Status: (outputLog[i].Status) ? outputLog[i].Status : "",
                        isImported: (function () {
                            var str = "";
                            if (outputLog[i].isImported) {
                                str = (outputLog[i].isImported.toUpperCase() === "TRUE") ? "Yes" : "No";
                            }
                            return str;
                        }()),
                        Author: (function () {
                            var str = "", splitStr = [];
                            var splitStr = outputLog[i].Author.split('#');
                            str = splitStr[splitStr.length - 1];
                            str = str.replace(/,,/g, ',');
                            return str;
                        }()),
                        Created: (function () {
                            var dateN = null, splitStr = [];
                            var splitStr = outputLog[i].Created.split(';#');
                            dateN = new Date(splitStr[splitStr.length - 1] + ' UTC');
                            return dateN.toString();
                        }()),
                        Modified: (function () {
                            var dateN = new Date(outputLog[i].Modified);
                            return dateN.toString();
                        }()),
                        ModifiedBy: (function () {
                            var userName = "", splitStr = [];
                            var splitStr = outputLog[i].Editor.split(',#');
                            userName = splitStr[splitStr.length - 1];
                            userName = userName.replace(/,,/g, ',');
                            return userName;
                        }()),
                    });
                }
                callback(outputArray);
            }

        }
    }

    function getAuditTrailStudy(queryString, callback) {
        var outputArray = [];
        getStudyAudTrail(queryString, callback);

        function getStudyAudTrail(queryString, callback) {
            var outputLog = [];
            var fieldNames = COMM.auditTrailStudyFieldNames;
            //Get susar data
            if (queryString.id) {
                for (var h = 0; h < fieldNames.length; h++) {
                    if (h === 0) { //First array is modified, should have a "utc" added to string
                        $().SPServices({
                            operation: "GetVersionCollection",
                            async: false,
                            strlistID: queryString.listname,
                            strlistItemID: queryString.id,
                            strFieldName: fieldNames[h].fieldName,
                            completefunc: function (xData, Status) {
                                $(xData.responseText).find("Version").each(function (i) {
                                    var field = fieldNames[h].name, obj = {};
                                    obj[field] = $(this).attr(fieldNames[h].fieldName) + " UTC";
                                    outputLog.push(obj);
                                });
                            }
                        });
                    } else {
                        $().SPServices({
                            operation: "GetVersionCollection",
                            async: false,
                            strlistID: queryString.listname,
                            strlistItemID: queryString.id,
                            strFieldName: fieldNames[h].fieldName,
                            completefunc: function (xData, Status) {
                                $(xData.responseText).find("Version").each(function (i) {
                                    if (fieldNames[h].name === "Version") {
                                    var field = fieldNames[h].name;
                                    outputLog[i][field] = $(this).attr(fieldNames[h].fieldName);
                                    } else {
                                        var field = fieldNames[h].name;
                                        var metaModified = $(this).attr("Modified");
                                        var metaModified = kendo.toString(new Date(metaModified), "MM/dd/yyyy HH:mm:ss");
                                        for (var j = 0; j < outputLog.length; j++) {
                                            var dateComp = kendo.toString(new Date(outputLog[j].Modified), "MM/dd/yyyy HH:mm:ss");
                                            if (dateComp === metaModified) {
                                                outputLog[j][field] = $(this).attr(fieldNames[h].fieldName);
                                            }
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
                auditManageValues(outputLog, callback);
            } else {
                callback(outputArray);
            }
        }

        function auditManageValues(outputLog, callback) {
            //Filtration
            if (outputLog.length !== 0) {
                for (var i = 0; i < outputLog.length; i++) {                    
                    var obj = {
                        id: outputLog[i].id,
                        Version: outputLog[i].Version,
                        StudyID: (outputLog[i].StudyID) ? outputLog[i].StudyID : "",
                        StudySponsorship: (outputLog[i].StudySponsorship) ? outputLog[i].StudySponsorship : "",                       
                        InvestigationalDILProductsName: (function () {
                            var str = [];
                            if (outputLog[i].InvestigationalDILProducts) {
                                var v = 0;
                                var splitStr = outputLog[i].InvestigationalDILProducts.split(';#');
                                for (var x = 0; x < splitStr.length; x++) {
                                    if (x % 2) {
                                       str.push(splitStr[x]);
                                    }
                                }
                            }
                            return str;
                        }()),
                        PrimaryInvProdDILProduct: (function () {
                            var str = "";
                            if (outputLog[i].PrimaryInvProdDILProduct) {
                                var splitStr = outputLog[i].PrimaryInvProdDILProduct.split(';#');
                                str = splitStr[splitStr.length - 1];
                            }
                            return str;
                        }()),                           
                        StudyBlindedStatus: (outputLog[i].StudyBlindedStatus) ? outputLog[i].StudyBlindedStatus : "",                       
                        Retired:  (function () {
                            var str = "";
                            if (outputLog[i].Retired) {
                                str = (outputLog[i].Retired.toUpperCase() === "TRUE") ? "Yes" : "No";
                            }
                            return str;
                        }()),                           
                        isImported: (function () {
                            var str = "";
                            if (outputLog[i].isImported) {
                                str = (outputLog[i].isImported.toUpperCase() === "TRUE") ? "Yes" : "No";
                            }
                            return str;
                        }()),
                        Author: (function () {
                            var str = "", splitStr = [];
                            var splitStr = outputLog[i].Author.split('#');
                            str = splitStr[splitStr.length - 1];
                            str = str.replace(/,,/g, ',');
                            return str;
                        }()),
                        Created: (function () {
                            var dateN = null, splitStr = [];
                            var splitStr = outputLog[i].Created.split(';#');
                            dateN = new Date(splitStr[splitStr.length - 1] + ' UTC');
                            return dateN.toString();
                        }()),
                        Modified: (function () {
                            var dateN = new Date(outputLog[i].Modified);
                            return dateN.toString();
                        }()),
                        ModifiedBy: (function () {
                            var userName = "", splitStr = [];
                            var splitStr = outputLog[i].Editor.split(',#');
                            userName = splitStr[splitStr.length - 1];
                            userName = userName.replace(/,,/g, ',');
                            return userName;
                        }()),
                    };
                    obj.InvestigationalDILProductsString = obj.InvestigationalDILProductsName.join(', ');
                    outputArray.push(obj);
                }
                callback(outputArray);
            }
        }
    }

    function getAuditTrailUser(queryString, callback) {
        var outputArray = [], zone = null;

        getUserAudTrail(queryString, callback);      

        function getUserAudTrail(queryString, callback) {
            var outputLog = [];
            var fieldNames = COMM.auditTrailUserFieldNames;
            //Get susar data
            if (queryString.id) {
                for (var h = 0; h < fieldNames.length; h++) {
                    if (h === 0) { //First array is modified, should have a "utc" added to string
                        $().SPServices({
                            operation: "GetVersionCollection",
                            async: false,
                            strlistID: queryString.listname,
                            strlistItemID: queryString.id,
                            strFieldName: fieldNames[h].fieldName,
                            completefunc: function (xData, Status) {
                                $(xData.responseText).find("Version").each(function (i) {
                                    var field = fieldNames[h].name, obj = {};
                                    obj[field] = $(this).attr(fieldNames[h].fieldName) + " UTC";
                                    outputLog.push(obj);
                                });
                            }
                        });
                    } else {
                        $().SPServices({
                            operation: "GetVersionCollection",
                            async: false,
                            strlistID: queryString.listname,
                            strlistItemID: queryString.id,
                            strFieldName: fieldNames[h].fieldName,
                            completefunc: function (xData, Status) {
                                $(xData.responseText).find("Version").each(function (i) {
                                    if (fieldNames[h].name === "Version") {
                                    var field = fieldNames[h].name;
                                    outputLog[i][field] = $(this).attr(fieldNames[h].fieldName);
                                    } else {
                                        var field = fieldNames[h].name;
                                        var metaModified = $(this).attr("Modified");
                                        var metaModified = kendo.toString(new Date(metaModified), "MM/dd/yyyy HH:mm:ss");
                                        for (var j = 0; j < outputLog.length; j++) {
                                            var dateComp = kendo.toString(new Date(outputLog[j].Modified), "MM/dd/yyyy HH:mm:ss");
                                            if (dateComp === metaModified) {
                                                outputLog[j][field] = $(this).attr(fieldNames[h].fieldName);
                                            }
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
                auditManageValues(outputLog, callback);
            } else {
                callback(outputArray);
            }
        }

        function auditManageValues(outputLog, callback) {
            //Filtration
            if (outputLog.length !== 0) {
                for (var i = 0; i < outputLog.length; i++) {
                    var kbj = {
                        id: outputLog[i].id,
                        Version: outputLog[i].Version,
                        Name: (function () {
                            var str = "";
                            if (outputLog[i].Name) {
                                var splitStr = outputLog[i].Name.split(',#');
                                str = splitStr[splitStr.length - 1];
                                str = str.replace(/,,/g, ',');
                            }
                            return str;
                        }()),                       
                        CountryName: (function () {
                            var arr = [];
                            var a = outputLog[i].Country ? outputLog[i].Country : '';
                            return a.split('; ');
                            return arr;
                        }()),
                        UserProfile: (outputLog[i].UserProfile) ? outputLog[i].UserProfile : "",
                        UserEntity: (outputLog[i].UserEntity) ? outputLog[i].UserEntity : "",
                        UserStatus: (outputLog[i].UserStatus) ? outputLog[i].UserStatus : "",
                        EmailRequested: (function () {
                            var str = "";
                            if (outputLog[i].EmailRequested) {
                                str = (outputLog[i].EmailRequested.toUpperCase() === "TRUE") ? "Yes" : "No";
                            }
                            return str;
                        }()),
                        isImported: (function () {
                            var str = "";
                            if (outputLog[i].isImported) {
                                str = (outputLog[i].isImported.toUpperCase() === "TRUE") ? "Yes" : "No";
                            }
                            return str;
                        }()),
                        Author: (function () {
                            var str = "", splitStr = [];
                            var splitStr = outputLog[i].Author.split('#');
                            str = splitStr[splitStr.length - 1];
                            str = str.replace(/,,/g, ',');
                            return str;
                        }()),
                        Created: (function () {
                            var splitStr = [];
                            var ctx = getContext();
                            var splitStr = outputLog[i].Created.split(';#');
                            var dateN = new Date(splitStr[splitStr.length - 1] + ' UTC');
                            return dateN.toString();
                        }()),
                        Modified: (function () {
                            var dateN = new Date(outputLog[i].Modified);
                            return dateN.toString();
                        }()),
                        //Modified: outputLog[i].Modified,
                        ModifiedBy: (function () {
                            var str = null, splitStr = [];
                            var splitStr = outputLog[i].Editor.split(',#');
                            str = splitStr[splitStr.length - 1];
                            str = str.replace(/,,/g, ',');
                            return str;
                        }()),
                    }                   
                    kbj.CountryString = kbj.CountryName.join(', ');                    
                    outputArray.push(kbj);
                }
                callback(outputArray);
            }
        }
    }

    /************ EXPORT methods ************/
    function getAllUserProductList(callback) {
        getAllUserProduct(callback);

        function getAllUserProduct(callback) {
            var ctx = getContext();
            var web = ctx.get_web(),
                list = web.get_lists().getByTitle(COMM.PROPERTY.USERPRODUCT.LIST);

            var objArray = [];
            getList(null);
            function getList(itemPosition) {

                //Set page position
                var position = typeof itemPosition === 'undefined' ? null : itemPosition;
                if (itemPosition !== null) {
                    position = new SP.ListItemCollectionPosition();
                    position.set_pagingInfo(itemPosition);
                }

                var camlQuery = new SP.CamlQuery();
                camlQuery.set_listItemCollectionPosition(position);
                var query = '';
                query = '<View>' +
                            '<Query>' +
                                '<Where>' +
                                    '<IsNotNull>' +
                                        '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.PRODUCTID + '/>' +
                                    '</IsNotNull>' +
                                '</Where>' +
                                '<OrderBy>' +
                                    '<FieldRef Name=' + COMM.PROPERTY.ID + ' Ascending="TRUE"/>' +
                                '</OrderBy>' +
                            '</Query>' +
                            '<RowLimit>' + COMM.PROPERTY.ROWLIMIT + '</RowLimit>' +
                            '<ViewFields>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.USERID + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.USER + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.ACCESS + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.PRODUCTID + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USERPRODUCT.DILPRODUCT + '/>' +
                            '</ViewFields>' +
                       '</View>';
                camlQuery.set_viewXml(query);
                var items = list.getItems(camlQuery);
                var row_info = ctx.loadQuery(items);
                ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);

                function onQuerySucceeded() {
                    //loop through results and save to object
                    try {
                        if (!row_info) throw 'Row info is null';
                        for (var i = 0; i < row_info.length; i++) {
                            objArray.push({
                                userRefId: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.USERID)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.USERID).get_lookupId() : 0,
                                userName: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.USER)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.USER).get_lookupValue() : '',
                                access: row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.ACCESS),
                                dilProductId: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT).get_lookupId() : 0,
                                dilProductName: (row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT)) ? row_info[i].get_item(COMM.PROPERTY.USERPRODUCT.DILPRODUCT).get_lookupValue() : '',
                            });
                        }
                    } catch (err) {
                        if (callback) callback({ message: 'getAllUserProduct: ' + err, error: true });
                        return;
                    }

                    if (row_info.length > 0 && row_info.length === COMM.PROPERTY.ROWLIMIT) {
                        getList(COMM.PROPERTY.PAGINGINFOPREFIX + row_info[row_info.length - 1].get_item(COMM.PROPERTY.ID));
                    } else {
                        if (callback) callback(objArray);
                    }
                }
            }

            function onQueryFailed(sender, args) {
                if (callback) callback({ message: 'getAllUserProduct: ' + args.get_message(), error: true });
            }
        }
    }

    function getAllUserList(callback) {
        getAllUserProduct(callback);

        function getAllUserProduct(callback) {
            var ctx = getContext();
            var web = ctx.get_web(),
                list = web.get_lists().getByTitle(COMM.PROPERTY.USER.LIST);

            var camlQuery = new SP.CamlQuery();
            var query = '<View>' +
                            '<Query>' +
                                '<OrderBy>' +
                                    '<FieldRef Name="ID" Ascending="FALSE"/>' +
                                '</OrderBy>' +
                            '</Query>' +
                            '<ViewFields>' +
                                '<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USER.COUNTRY + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USER.NAME + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USER.PROFILE + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USER.ENTITY + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.USER.STATUS + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.CREATED + '/>' +
                                '<FieldRef Name=' + COMM.PROPERTY.MODIFIED + '/>' +
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
                        var obj = {
                            id: row_info[i].get_item(COMM.PROPERTY.ID),
                            country: (function () {
                                var str = "";
                                str = row_info[i].get_item(COMM.PROPERTY.USER.COUNTRY);
                                str = str.replace(/;/g, ",");
                                return str;
                            }()),
                            countryName: (function () {
                                var arr = [];
                                var a = row_info[i].get_item(COMM.PROPERTY.USER.COUNTRY) ? row_info[i].get_item(COMM.PROPERTY.USER.COUNTRY) : '';
                                arr = a.split('; ');
                                return arr;
                            }()),
                            userId: (row_info[i].get_item(COMM.PROPERTY.USER.NAME)) ? row_info[i].get_item(COMM.PROPERTY.USER.NAME).get_lookupId() : 0,
                            userName: (row_info[i].get_item(COMM.PROPERTY.USER.NAME)) ? row_info[i].get_item(COMM.PROPERTY.USER.NAME).get_lookupValue() : '',
                            userProfile: row_info[i].get_item(COMM.PROPERTY.USER.PROFILE),
                            userEntity: row_info[i].get_item(COMM.PROPERTY.USER.ENTITY),
                            userStatus: ((row_info[i].get_item(COMM.PROPERTY.USER.STATUS) === COMM.PROPERTY.USER.ACTIVE) ? COMM.PROPERTY.USER.ACTIVE : COMM.PROPERTY.USER.INACTIVE),
                            created: row_info[i].get_item(COMM.PROPERTY.CREATED),
                            modified: row_info[i].get_item(COMM.PROPERTY.MODIFIED),
                            objVersion: row_info[i].get_objectVersion(),
                        };
                        obj.countryString = obj.countryName.join(', ');
                        objArray.push(obj);
                    }
                } catch (err) {
                    callback({ message: err, error: true });
                    return;
                }
                callback(objArray);
            }

            function onQueryFailed(sender, args) {
                callback({ message: args.get_message(), error: true });
            }
        }
    }

    function getUserNotificationHistoryList(queryString, callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
			list = web.get_lists().getByTitle(COMM.PROPERTY.NOTIFICATIONHISTORY.USERLIST);
        var camlQuery = new SP.CamlQuery();
        var query = '';
        query = '<View>' +
				   '<Query>' +
						'<Where>' +
                            '<Eq>' +
                                '<FieldRef Name=' + COMM.PROPERTY.NOTIFICATIONHISTORY.USERID + '/>' +
                                '<Value Type="Number">' + queryString.id + '</Value>' +
                            '</Eq>' +
                        '</Where>' +
					   '<OrderBy>' +
						   '<FieldRef Name=' + COMM.PROPERTY.ID + ' Ascending="FALSE"/>' +
					   '</OrderBy>' +
				   '</Query>' +
					'<ViewFields>' +
						'<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.NOTIFICATIONHISTORY.SENTDATE + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.NOTIFICATIONHISTORY.INITIATOR + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.NOTIFICATIONHISTORY.RECIPIENTS + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.NOTIFICATIONHISTORY.NOTIFICATIONTYPE + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.NOTIFICATIONHISTORY.USERID + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.NOTIFICATIONHISTORY.METADATA + '/>' +
					'</ViewFields>' +
			   '</View>';
        camlQuery.set_viewXml(query);
        var items = list.getItems(camlQuery);
        var row_info = ctx.loadQuery(items);
        ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
        function onQuerySucceeded() {
            var objArray = [];
            try{
                if (!row_info) throw 'No data found';
            for (var i = 0; i < row_info.length; i++) {
                    var obj = {
                        id: row_info[i].get_item(COMM.PROPERTY.ID),
                        sentDate: row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.SENTDATE),
                        initiatorId: (row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.INITIATOR)) ? row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.INITIATOR).get_lookupId() : 0,
                        initiatorName: (row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.INITIATOR)) ? row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.INITIATOR).get_lookupValue() : '',
                        recipients: row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.RECIPIENTS),
                        notificationType: row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.NOTIFICATIONTYPE),
                        userId: row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.USERID),
                        metaData: row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.METADATA),
                    };

                    try {
                        var body = obj.metaData;
                        body = body.replace(/<<SanofiLogo>>/g, COMM.PROPERTY.SANOFILOGO);
                        body = body.replace(/<<EarthLogo>>/g, COMM.PROPERTY.EARTHLOGO);
                        obj.metaData = body;
                    } catch (e) {
                        console.error('Error in parsing image: ' + e);
                    }

                    objArray.push(obj);
                }
            } catch (err) {
                callback({ message: err, error: false, noData: true });
                return;
            }
            callback(objArray);
        }
        function onQueryFailed(sender, args) {
            callback({ message: "Get User Notification History: " + args.get_message(), error: true });
        }
    }

    function getProductNotificationHistoryList(queryString, callback) {
        var ctx = getContext();
        var web = ctx.get_web(),
			list = web.get_lists().getByTitle(COMM.PROPERTY.NOTIFICATIONHISTORY.PRODUCTLIST);
        var camlQuery = new SP.CamlQuery();
        var query = '';
        query = '<View>' +
				   '<Query>' +
						'<Where>' +
                            '<Eq>' +
                                '<FieldRef Name=' + COMM.PROPERTY.NOTIFICATIONHISTORY.PRODUCTID + '/>' +
                                '<Value Type="Number">' + queryString.id + '</Value>' +
                            '</Eq>' +
                        '</Where>' +
					   '<OrderBy>' +
						   '<FieldRef Name=' + COMM.PROPERTY.ID + ' Ascending="FALSE"/>' +
					   '</OrderBy>' +
				   '</Query>' +
					'<ViewFields>' +
						'<FieldRef Name=' + COMM.PROPERTY.ID + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.NOTIFICATIONHISTORY.SENTDATE + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.NOTIFICATIONHISTORY.INITIATOR + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.NOTIFICATIONHISTORY.RECIPIENTS + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.NOTIFICATIONHISTORY.NOTIFICATIONTYPE + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.NOTIFICATIONHISTORY.PRODUCTID + '/>' +
						'<FieldRef Name=' + COMM.PROPERTY.NOTIFICATIONHISTORY.METADATA + '/>' +
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
                    var obj = {
                        id: row_info[i].get_item(COMM.PROPERTY.ID),
                        sentDate: row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.SENTDATE),
                        initiatorId: (row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.INITIATOR)) ? row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.INITIATOR).get_lookupId() : 0,
                        initiatorName: (row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.INITIATOR)) ? row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.INITIATOR).get_lookupValue() : '',
                        recipientsName: (function () {
                            var arr = [];
                            var a = row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.RECIPIENTS) ? row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.RECIPIENTS) : '';
                            arr = a.split(',');
                            return arr;
                        }()),
                        notificationType: row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.NOTIFICATIONTYPE),
                        productID: row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.PRODUCTID),
                        metaData: row_info[i].get_item(COMM.PROPERTY.NOTIFICATIONHISTORY.METADATA),
                    };
                    obj.recipientsString = obj.recipientsName.join(',');
                    objArray.push(obj);
                }
            } catch (err) {
                callback({ message: err, error: false, noData: true });
                return;
            }
            callback(objArray);
        }
        function onQueryFailed(sender, args) {
            callback({ message: "Get Product Notification History: " + args.get_message(), error: true });
        }
    }
    /************ End of EXPORT methods ************/
})(CSOM);