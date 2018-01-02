var ADMINDAL = (function(adminDal, csom){
    
    adminDal.user_availableProduct = user_availableProduct;
    adminDal.user_getUserList = user_getUserList;
    adminDal.user_entity = getUserEntity;
    adminDal.user_status = getUserStatus;
    adminDal.user_profile = getUserProfile;
    adminDal.user_country = getUserCountry;
    adminDal.user_data_checker = userDataChecker;
    adminDal.user_productDuplicationChecker = productDuplicateChecker;
    adminDal.user_send_email_request = sendEmailRequest;
    adminDal.createUser = createUser;
    adminDal.getUserForEdit = getUserForEdit;
    adminDal.updateStudy_StudyList = updateStudy_StudyList;   
    adminDal.updateUserInfo = updateUserInfo;
    adminDal.getAssociatedProductInfo = getAssociatedProductInfo;
    adminDal.user_user_product_list = user_user_product_list;
    adminDal.user_rights_access_log = userRightsAccessLog;
    adminDal.study_source = getStudy_StudyList;
    adminDal.study_sponsorship_source = getStudy_StudySponsorship;
    adminDal.getStudy_AwareInn = getStudy_AwareInn;
    
    adminDal.study_product_source = getStudy_StudyProduct;
    adminDal.study_blinded_status_source = getStudy_StudyBlindedStatus;
    adminDal.createStudy_StudyList = createStudy_StudyList;
    adminDal.product_list = product_ProductList;
    adminDal.product_entity = product_ProductEntity();
    adminDal.product_inn_list = product_AwareInn();
    adminDal.product_user_list_all = product_User_All();
    adminDal.product_userProduct_empty = product_UserProduct_Empty;
    adminDal.product_user_list = product_User;
    adminDal.product_user_product_list = product_UserProduct;
    adminDal.product_user_product_list_no_page = product_UserProductNoPage;
    adminDal.study_user_product_list = study_UserProduct;
    adminDal.product_createProduct = product_createProduct;
    adminDal.study_createUserProductByProduct = study_createUserProductByProduct;   
    adminDal.suspect_product_status = getSuspectProductstatus;
    adminDal.downgraded_non_susar = getDowngradednonSUSAR;
    adminDal.DIL_sequence = getDILsequence;
    adminDal.benefit_risk_modification = getBenefitriskModification;

    adminDal.study_sponsorship_list = studySponsorshipList;
    adminDal.product_entity_list = productEntityList;
    adminDal.user_entity_list = userEntityList;
    adminDal.aware_study_inn_list = awareStudyInnList;
    adminDal.aware_inn_list = awareInnSource;

    adminDal.checkStudyIfAssociatedToSusar = checkStudyIfAssociatedToSusar;
    adminDal.checkStudyIfAssociatedToSusarMigrated = checkStudyIfAssociatedToSusarMigrated;
    adminDal.getAllSUSARMigratedAssociatedToStudy = getAllSUSARMigratedAssociatedToStudy;
    adminDal.getAllSUSARAssociatedToStudy = getAllSUSARAssociatedToStudy;

    adminDal.user_product_list_all = getAllUserProductList;
    adminDal.user_list_all = getAllUserList;

    adminDal.audit_trail_product = auditTrailProduct;
    adminDal.audit_trail_study = auditTrailStudy;
    adminDal.audit_trail_user = auditTrailUser;
    adminDal.user_notification_hist = notification_history;
    adminDal.product_notification_hist = product_notification_history;

    adminDal.addProductEntity = addProductEntity;
    adminDal.updateProductEntity = updateProductEntity;
    adminDal.addStudySponsorship = addStudySponsorship;
    adminDal.updateStudySponsorship = updateStudySponsorship;
    adminDal.addUserEntity = addUserEntity;
    adminDal.updateUserEntity = updateUserEntity;
    adminDal.addAWAREStudies = addAWAREStudies;
    adminDal.updateAwareStudy = updateAwareStudy;
    adminDal.addAWAREINN = addAWAREINN;
    adminDal.updateAWAREINN = updateAWAREINN;
    adminDal.metaSourceINN = metaSourceINN;

    adminDal.checkProductEntityIfAssociatedToProduct = checkProductEntityIfAssociatedToProduct;
    adminDal.checkStudySponsorshipIfAssociatedToStudy = checkStudySponsorshipIfAssociatedToStudy;
    adminDal.checkUserEntityIfAssociatedToUser = checkUserEntityIfAssociatedToUser;
    adminDal.checkAwareStudyIfAssociatedToStudy = checkAwareStudyIfAssociatedToStudy;
    adminDal.checkAwareINNIfAssociatedToProduct = checkAwareINNIfAssociatedToProduct;

    adminDal.welcome_message = getWelcomeMessageDataSource;
    adminDal.updateWelcomeMessage = updateWelcomeMessage;
    adminDal.getCoverLetterDataSource = getCoverLetterDataSource;

    return adminDal;

    /************ COMMON ************/

	/************ USER tab ************/
    
    function user_availableProduct(callback) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.user_getProductUserCreate(function (q, r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            e.success(q)
                            callback(q,r);
                        }
                    });
                }
            },
            schema: {
                model: DIL.productUserCreateModel,
            },           
        });
    }

    function user_getUserList() {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.user_getUserList(function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                        } else {
                            e.success(r);
                        }
                    });
                }
            },
            schema: {
                model: DIL.userModel,
            },
            pageSize: 10,
        });
    }

    function getUserEntity(callback) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.user_getUserEntity(function (q, r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            e.success(q);
                            callback(r);
                        }
                    });
                }
            }            
        });
    }

    function getUserStatus() {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.user_getUserStatus(function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                        } else {
                            e.success(r);
                        }
                    });
                }
            },
            pageSize: 10,
        });
    }

    function getUserProfile() {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.user_getUserProfile(function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                        } else {
                            e.success(r);
                        }
                    });
                }
            },           
        });
    }

    function getUserCountry(callback){
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.user_getUserCountry(function (q, r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            e.success(q);
                            callback(r);
                        }
                    });
                }
            },
            schema: {
                model: DIL.countryModel,
            },
        });
    }

    function user_user_product_list(queryString, callback, delayedProcessing) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.user_getUserProduct(queryString, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            e.success(r);                            
                        }
                    });
                },
                update: function (e) {
                    e.displayName = queryString.displayName;
                    e.userRowId = queryString.userRowId;
                    e.userProfile = queryString.userProfile;
                    CSOM.user_updateUserProduct(e, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            if (delayedProcessing) {
                                //display processing window timeout
                                delayedProcessing(function () {
                                    r.updateSuccess = true;
                                    callback(r);
                                    e.success();
                                });
                            } else {
                                r.updateSuccess = true;
                                callback(r);
                                e.success();
                            }
                        }
                    });
                },
                destroy: function (e) {
                    e.displayName = queryString.displayName;
                    e.userRowId = queryString.userRowId;
                    e.userProfile = queryString.userProfile;
                    CSOM.user_deleteUserProduct(e, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            if (delayedProcessing) {
                                //display processing window timeout
                                delayedProcessing(function () {
                                    e.success();
                                });
                            } else {
                                e.success();
                            }
                        }
                    });
                }
            },
            schema: {
                model: DIL.useruserProductListModel,
            },
            pageSize: 10
        });

    }

    function userDataChecker(info, callback) {
        CSOM.userDataChecker(info, callback);
    }

    function productDuplicateChecker(info, callback) {
        CSOM.productDuplicateChecker(info, callback);
    }
    
    function createUser(info, callback) {
        CSOM.user_createEntry(info, callback);
    }

    function getUserForEdit(info, callback) {
        CSOM.getUserForEdit(info, callback);
    }
    
    function userRightsAccessLog(info, callback) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.getUserRightsAccessLog(info, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback({ error: r.error });
                        } else {
                            e.success(r);
                            callback({ error: false });
                        }
                    });
                }
            },
            schema: {
                model: DIL.userAccessRights,
            },
            pageSize: 10,
        });
    }
    
    function sendEmailRequest(info, callback) {
        CSOM.sendEmailRequest(info, callback);
    }

	/************ STUDY tab ************/

    function updateStudy_StudyList(info, callback) {
    	CSOM.updateStudy_StudyList(info, callback);
    }

    function updateUserInfo(info, callback) {
    	CSOM.updateUserInfo(info, callback);
    }

    function getAssociatedProductInfo(info, callback) {
    	CSOM.getAssociatedProductInfo(info, callback);
    }

    //function studyUpdateSusar(info, callback) {
    //	CSOM.studyUpdateSusar(info, callback);
    //}

    //function checkSusarStudy(info, callback) {
    //	CSOM.checkSusarStudy(info, callback);
    //}

    function study_UserProduct(queryString, callback, delayedProcessing) {
    	return new kendo.data.DataSource({
    		offlineStorage: "products-offline",
    		transport: {
    			read: function (e) {
    				CSOM.study_getUserProduct(queryString, function (r) {
    					if (r.error) {
    						e.error(r.message, "error", r.message);
    						console.error(r.message);
    					} else {
    						e.success(r);
    					}
    				});
    			},
    			update: function (e) {
    				CSOM.study_updateUserProduct(e, function (r) {
    					if (r.error) {
    						e.error(r.message, "error", r.message);
    						console.error(r.message);
    					} else {
    					    if (delayedProcessing) {
    					        //display processing window timeout
    					        delayedProcessing(function () {
    					            e.success();
    					        });
    					    } else {
    					        e.success();
    					    }
    					}
    				});
    			},
    			destroy: function (e) {
    				CSOM.study_deleteUserProduct(e, function (r) {
    					if (r.error) {
    						e.error(r.message, "error", r.message);
    						console.error(r.message);
    					} else {
    					    if (delayedProcessing) {
    					        //display processing window timeout
    					        delayedProcessing(function () {
    					            e.success();
    					        });
    					    } else {
    					        e.success();
    					    }
    					}
    				});
    			}
    		},
    		schema: {
    			model: DIL.userProductModel,
    		},
    		pageSize: 10
    	});
    }

	/**  
        * @for - create study study id
        * @desc - get data from csom.
        * @implementation - datasource for study id.
        * @author -  cri2x
    */
    function getStudy_AwareInn(callback) {
    	return new kendo.data.DataSource({
    		transport: {
    			read: function (e) {
    				CSOM.getStudy_studyAwareINN(function (r) {
    					if (r.error) {
    						e.error(r.message, "error", r.message);
    					} else {
    						e.success(r);
    					}
    				});
    			}
    		},
    		schema: {
    			model: DIL.getStudyAwareInnModel,
    		},
    		batch: true,
    	});
    }

	/**  
        * @for - studygrid
        * @desc - get data from csom.
        * @implementation - datasource for studygrid.
        * @author -  cri2x
    */
    function getStudy_StudyList(callback) {
    	return new kendo.data.DataSource({
    		transport: {
    			read: function (e) {
    				CSOM.getStudy_StudyList(function (r) {
    					if (r.error) {
    						e.error(r.message, "error", r.message);
    					} else {
    						e.success(r);
    					}
    				});
    			},
    			update: function (e) {
    				if (e.data.models[0].primaryInvProdDILProductID === 0 && e.data.models[0].investigationalDILProduct.length !== 0) {
    					callback({ error: true, primary: true });
    				}
    				else if (e.data.models[0].investigationalDILProduct.length === 0) {
    					callback({ error: true, product: true });
    				}
    				else {
    					if (e.data.models[0].associatedToSusar === true) {
    						CSOM.study_checkChanges(e, function (r) {
    							if (r.error) {
    								callback(r);
    								e.error(r.message, "error", r.message);
    								console.error(r.message);
    							} else {
    								e.success();
    								callback($.extend(r, { update: true }));
    							}
    						});
    					}
    					else {
    					CSOM.study_updateStudy(e, function (r) {
    						if (r.error) {
    							callback(r);
    							e.error(r.message, "error", r.message);
    							console.error(r.message);
    						} else {
    							e.success();
    							callback($.extend(r, { update: true }));
    						}
    					});
    					}
    				}
    				
    			},
    		},
    		schema: {
    			model: DIL.studyModel,
    		},
    		batch: true,
    		pageSize: 10
    	});
    }

    //function study_User_All() {
    //	return new kendo.data.DataSource({
    //		transport: {
    //			read: function (e) {
    //				CSOM.study_getUser(function (r) {
    //					if (r.error) {
    //						e.error(r.message, "error", r.message);
    //						console.error(r.message);
    //					} else {
    //						e.success(r);
    //					}
    //				});
    //			}
    //		},
    //		schema: {
    //			model: DIL.userModel,
    //		},
    //	});
    //}

	/**  
        * @for - create study
        * @desc - get data from csom.
        * @implementation - dropdownlist source for study sponsorship.
        * @author -  cri2x
    */
    function getStudy_StudySponsorship() {
    	return new kendo.data.DataSource({
    		transport: {
    			read: function (e) {
    				CSOM.getStudy_StudySponsorship(function (r) {
    					if (r.error) {
    						e.error(r.message, "error", r.message);
    					} else {
    						e.success(r);
    					}
    				});
    			},
    		},
    		batch: true,
    	});
    }

	/**  
        * @for - create study
        * @desc - get data from csom.
        * @implementation - dropdownlist source for dils product and investigational product in create study.
        * @author -  cri2x
    */
    function getStudy_StudyProduct() {
    	return new kendo.data.DataSource({
    		transport: {
    			read: function (e) {
    				CSOM.getStudy_StudyProduct(function (r) {
    					if (r.error) {
    						e.error(r.message, "error", r.message);
    					} else {
    						e.success(r);
    					}
    				});
    			},
    		},
    		filter: {
    			logic: "and",
				filters: [],
    		},
    		schema: {
    			model: DIL.getStudy_ProductModel,
    		},
    		batch: true,
    	});
    }

	/**  
        * @for - create study
        * @desc - get data from csom.
        * @implementation - dropdownlist source for study sponsorship.
        * @author -  cri2x
    */
    function getStudy_StudyBlindedStatus(callback) {
    	return new kendo.data.DataSource({
    		transport: {
    			read: function (e) {
    				CSOM.getStudy_StudyBlindedStatus(function (r) {
    					if (r.error) {
    						e.error(r.message, "error", r.message);
    					} else {
    						e.success(r);
    					}
    				});
    			},
    		},
    		batch: true,
    	});
    }

    function createStudy_StudyList(info, callback) {
    	CSOM.createStudy_StudyList(info, callback);
    }
       
    /************ PRODUCT tab ************/
    function product_UserProduct_Empty() {
        return new kendo.data.DataSource({
            data: [],
            schema: {
                model: DIL.userProductModel
            },           
        });
    }

    function product_ProductList(queryString, callback) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.product_getProductList(queryString, function (r) {
                        if (r.error) {
                            callback(r);
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                        } else {
                            e.success(r);
                        }
                    });
                },
                update: function (e) {
                    CSOM.product_updateProduct(e, function (r) {
                        if (r.error) {
                            callback(r);
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                        } else {
                            e.success();
                            callback($.extend(r, { update: true }));
                        }
                    });
                },
            },
            schema: {
                model: DIL.productModel,
            },
            pageSize: 10
        });
    }

    function product_ProductEntity() {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.product_getProductEntity(function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                        } else {
                            e.success(r);
                        }
                    });
                }
            },
            schema: {
                model: DIL.productEntityModel,
            },
        });
    }
    
    function product_AwareInn() {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.product_getAwareInn(function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                        } else {
                            e.success(r);
                        }
                    });
                }
            },
            schema: {
                model: DIL.innModel,
            },
            sort: { field: "inn", dir: "asc" },
        });
    }

    var readOnlyUsers = [];
    function product_User_All() {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    if (!e.data.readAgain && (readOnlyUsers && readOnlyUsers.length > 0)) {
                        e.success(readOnlyUsers);
                        return;
                    }
                    CSOM.product_getUser(function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                        } else {
                            readOnlyUsers = r;
                            e.success(r);
                        }
                    });
                }
            },
            schema: {
                model: DIL.userModel,
            },
        });
    }

    function product_User() {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.product_getUser(function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                        } else {
                            e.success(r);
                        }
                    });
                }
            },
            schema: {
                model: DIL.userModel,
            },
            pageSize: 10
        });
    }

    function product_UserProductNoPage(queryString, callback) {
        return new kendo.data.DataSource({
            offlineStorage: "products-offline",
            transport: {
                create: function (e) {
                    e.susarGroupId = queryString.susarGroupId;
                    e.susarGroupOpenId = queryString.susarGroupOpenId;
                    CSOM.product_createUserProduct(e, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            if (r.duplicate) {
                                r.message = "Error in saving linked users.";
                                if (callback) callback(r);
                            } else {
                                if (callback) callback(r);
                            }
                        } else {
                            e.success(r.data.data);
                        }
                    });
                },
                read: function (e) {
                    CSOM.product_getUserProduct(queryString, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            e.success(r);
                            if (callback) callback(r);
                        }
                    });
                },
                update: function (e) {
                    CSOM.product_updateUserProduct(e, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            e.success();
                        }
                    });
                },
                destroy: function (e) {
                    e.susarGroupId = queryString.susarGroupId;
                    e.susarGroupOpenId = queryString.susarGroupOpenId;
                    CSOM.product_deleteUserProduct(e, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            e.success();
                        }
                    });
                }
            },
            batch: true,
            schema: {
                model: DIL.userProductModel,
            },
        });
    }

    function product_UserProduct(queryString, callback, delayedProcessing) {
        return new kendo.data.DataSource({
            offlineStorage: "products-offline",
            transport: {
                create: function (e) {
                    e.susarGroupId = queryString.susarGroupId;
                    e.susarGroupOpenId = queryString.susarGroupOpenId;
                    CSOM.product_createUserProduct(e, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            if (r.duplicate) {
                                r.message = "Error in saving linked users.";
                                if (callback) callback(r);
                            } else {
                                if (callback) callback(r);
                            }
                        } else {
                            e.success(r.data.data);
                        }
                    });
                },
                read: function (e) {
                    CSOM.product_getUserProduct(queryString, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            e.success(r);
                            if (callback) callback(r);
                        }
                    });
                },
                update: function (e) {
                    CSOM.product_updateUserProduct(e, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            if (delayedProcessing) {
                                //display processing window timeout
                                delayedProcessing(function () {
                                    e.success();
                                });
                            } else {
                                e.success();
                            }
                        }
                    });
                },
                destroy: function (e) {
                    e.susarGroupId = queryString.susarGroupId;
                    e.susarGroupOpenId = queryString.susarGroupOpenId;
                    CSOM.product_deleteUserProduct(e, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            if (delayedProcessing) {
                                //display processing window timeout
                                delayedProcessing(function () {
                                    e.success();
                                });
                            } else {
                                e.success();
                            }
                        }
                    });
                }
            },
            batch: true,
            schema: {
                model: DIL.userProductModel,
            },
            pageSize: 10,
        });
    }

    function product_createProduct(info, callback) {
        CSOM.product_createProduct(info, callback);
    }

    function study_createUserProductByProduct(info, callback) {
    	CSOM.study_createUserProductByProduct(info, callback);
    }

	/************ COVER LETTER tab ************/
    function getCoverLetterDataSource(callback) {
    	return new kendo.data.DataSource({
    		transport: {
    			read: function (e) {
    				CSOM.getCoverLetterValue(function (r) {
    					if (r.error) {
    						e.error(r.message, "error", r.message);
    						console.error(r.message);
    						if (callback) callback(r);
    					} else {
    						e.success(r);
    					}
    				});
    			},
    			update: function (e) {
    				CSOM.updateCoverLetter(e, function (r) {
    					if (r.error) {
    						callback(r);
    						e.error(r.message, "error", r.message);
    						console.error(r.message);
    					} else {
    						e.success();
    						callback($.extend(r, { update: true }));
    					}
    				});
    			},
    		},
    		schema: {
    			model: DIL.coverLetterModel,
    		},
    		pageSize: false
    	});
    }
	/************ METADATA tab ************/

    function updateWelcomeMessage(info, callback) {
    	CSOM.updateWelcomeMessage(info, callback);
    }

    function getWelcomeMessageDataSource(callback) {
    	return new kendo.data.DataSource({
    		transport: {
    			read: function (e) {
    				CSOM.getWelcomeMessage(function (r) {
    					if (r.error) {
    						e.error(r.message, "error", r.message);
    						console.error(r.message);
    						if (callback) callback(r);
    					} else {
    						e.success(r);
    					}
    				});
    			},
    			update: function (e) {
    				CSOM.updateWelcomeMessage(e, function (r) {
    					if (r.error) {
    						callback(r);
    						e.error(r.message, "error", r.message);
    						console.error(r.message);
    					} else {
    						e.success();
    						callback($.extend(r, { update: true }));
    					}
    				});
    			},
    		},
    		schema: {
    			model: DIL.getWelcomeMessageModel,
    		},
    		pageSize: false
    	});
    }

    function updateAWAREINN(info, callback) {
    	CSOM.updateAWAREINN(info, callback);
    }

    function addAWAREINN(info, callback) {
    	CSOM.addAWAREINN(info, callback);
    }

    function updateAwareStudy(info, callback) {
    	CSOM.updateAwareStudy(info, callback);
    }

    function addAWAREStudies(info, callback) {
    	CSOM.addAWAREStudies(info, callback);
    }

    function updateUserEntity(info, callback) {
    	CSOM.updateUserEntity(info, callback);
    }

    function addUserEntity(info, callback) {
    	CSOM.addUserEntity(info, callback);
    }

    function updateStudySponsorship(info, callback) {
    	CSOM.updateStudySponsorship(info, callback);
    }

    function addStudySponsorship(info, callback) {
    	CSOM.addStudySponsorship(info, callback);
    }

    function updateProductEntity(info, callback) {
    	CSOM.updateProductEntity(info, callback);
    }

    function addProductEntity(info, callback) {
    	CSOM.addProductEntity(info, callback);
    }

    function checkProductEntityIfAssociatedToProduct(info, callback) {
    	CSOM.checkProductEntityIfAssociatedToProduct(info, callback);
    }

    function checkStudySponsorshipIfAssociatedToStudy(info, callback) {
    	CSOM.checkStudySponsorshipIfAssociatedToStudy(info, callback);
    }

    function checkUserEntityIfAssociatedToUser(info, callback) {
    	CSOM.checkUserEntityIfAssociatedToUser(info, callback);
    }

    function checkAwareStudyIfAssociatedToStudy(info, callback) {
    	CSOM.checkAwareStudyIfAssociatedToStudy(info, callback);
    }

    function checkAwareINNIfAssociatedToProduct(info, callback) {
    	CSOM.checkAwareINNIfAssociatedToProduct(info, callback);
    }
   
    function getSuspectProductstatus() {

        var SuspectProductstatus = [
            { "SuspectProductstatusID": 1, "SuspectProductstatusName": "Verum" },
            { "SuspectProductstatusID": 2, "SuspectProductstatusName": "Comparator" },
            { "SuspectProductstatusID": 3, "SuspectProductstatusName": "NIP" },
            { "SuspectProductstatusID": 4, "SuspectProductstatusName": "Other" },
        ]

        return new kendo.data.DataSource({
            data: SuspectProductstatus,
            pageSize: 10,
        });
    }

    function getDowngradednonSUSAR() {

        var DowngradednonSUSAR = [
            { "DowngradednonSUSARID": 1, "DowngradednonSUSARName": "Yes" },
            { "DowngradednonSUSARID": 2, "DowngradednonSUSARName": "No" },
            { "DowngradednonSUSARID": 3, "DowngradednonSUSARName": "Not Applicable" },
        ]

        return new kendo.data.DataSource({
            data: DowngradednonSUSAR,
            pageSize: 10,
        });
    }

    function getDILsequence() {

        var DILsequence = [
            { "DILsequenceID": 1, "DILsequenceName": "Ini" },
            { "DILsequenceID": 2, "DILsequenceName": "Fup1" },
            { "DILsequenceID": 3, "DILsequenceName": "Fup2" },
        ]

        return new kendo.data.DataSource({
            data: DILsequence,
            pageSize: 10,
        });
    }

    function getBenefitriskModification() {

        var BenefitriskModification = [
            { "BenefitriskModificationID": 1, "BenefitriskModificationName": "Yes" },
            { "BenefitriskModificationID": 2, "BenefitriskModificationName": "No" },
        ]

        return new kendo.data.DataSource({
            data: BenefitriskModification,
            pageSize: 10,
        });
    }

    function productEntityList(callback) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.getProductEntityList(function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback({ error: true, servError: true });
                        } else {
                            e.success(r);
                        }
                    });
                },
                update: function (e) {
                	CSOM.updateProductEntity(e, function (r) {
                		if (r.error) {
                			callback(r);
                			e.error(r.message, "error", r.message);
                			console.error(r.message);
                		} else {
                			e.success();
                			callback($.extend(r, { update: true }));
                		}
                	});
                }
            },
            schema: {
                model: DIL.productEntityModel,
            },
            pageSize: 10,
            batch: true
        });
    }

    function studySponsorshipList(callback) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.getStudySponsorshipList(function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            callback({ error: true, servError: true });
                        } else {
                            e.success(r);
                        }
                    });
                },
                update: function (e) {
                	CSOM.updateStudySponsorship(e, function (r) {
                		if (r.error) {
                			callback(r);
                			e.error(r.message, "error", r.message);
                			console.error(r.message);
                		} else {
                			e.success();
                			callback($.extend(r, { update: true }));
                		}
                	});
                },
            },
            schema: {
                model: DIL.getStudySponsorshipModel
            },
            pageSize: 10,
            batch: true
        });
    }
    
    function userEntityList(callback) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.getUserEntityList(function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            callback({ error: true, servError: true });
                        } else {
                            e.success(r);
                        }
                    });
                },
                update: function (e) {
                	CSOM.updateUserEntity(e, function (r) {
                		if (r.error) {
                			callback(r);
                			e.error(r.message, "error", r.message);
                			console.error(r.message);
                		} else {
                			e.success();
                			callback($.extend(r, { update: true }));
                		}
                	});
                }
            },
            schema: {
                model: DIL.userEntityModel
            },
            pageSize: 10,
            batch: true
        });
    }

    function awareStudyInnList(callback) {
        return new kendo.data.DataSource({
            transport: {       
                read: function (e) {
                    CSOM.awareStudyInnList(function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            callback({ error: true, servError: true });
                        } else {
                            e.success(r);
                        }
                    });
                },
                update: function (e) {
                	CSOM.updateAwareStudy(e, function (r) {
                		if (r.error) {
                			callback(r);
                			e.error(r.message, "error", r.message);
                			console.error(r.message);
                		} else {
                			e.success();
                			callback($.extend(r, { update: true }));
                		}
                	});
                },
            },
            schema: {
                model: DIL.getStudyAwareInnModel
            },
            pageSize: 10,
            batch: true
        });
    }

    function awareInnSource(callback) {
    	return new kendo.data.DataSource({
    		transport: {
    			read: function (e) {
    				CSOM.awareInnList(function (r) {
    					if (r.error) {
    						e.error(r.message, "error", r.message);
    						callback({ error: true, servError: true });
    					} else {
    						e.success(r);
    					}
    				});
    			},
    			update: function (e) {
    				CSOM.updateAWAREINN(e, function (r) {
    					if (r.error) {
    						callback(r);
    						e.error(r.message, "error", r.message);
    						console.error(r.message);
    					} else {
    						e.success();
    						callback($.extend(r, { update: true }));
    					}
    				});
    			},
    		},
    		schema: {
    			model: DIL.getAwareInnModel
    		},
    		pageSize: 10,
    		batch: true
    	});
    }

    function checkStudyIfAssociatedToSusar(info, callback) {
    	CSOM.checkStudyIfAssociatedToSusar(info, callback);
    }

    function checkStudyIfAssociatedToSusarMigrated(info, callback) {
    	CSOM.checkStudyIfAssociatedToSusarMigrated(info, callback);
    }

    function getAllSUSARMigratedAssociatedToStudy(info, callback) {
    	CSOM.getAllSUSARMigratedAssociatedToStudy(info, callback);
    }

    function getAllSUSARAssociatedToStudy(info, callback) {
    	CSOM.getAllSUSARAssociatedToStudy(info, callback);
    }

    function metaSourceINN() {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.getSourceInn(function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                        } else {
                            e.success(r);
                        }
                    });
                }
            },
        });
    }

    /************ EXPORT methods ************/
    function getAllUserProductList(callback) {
        CSOM.getAllUserProductList(callback);
    }

    function getAllUserList(callback) {
        CSOM.getAllUserList(callback);
    }
    /************ End of EXPORT methods ************/
   
    /******* Audit Trail *******/
    function auditTrailProduct(queryString, loading, callback) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.getAuditTrailProduct(queryString, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            e.success(r);
                            callback({ error: false });
                        }
                    });
                }
            },
            schema: {
                model: DIL.getAuditTrailProductModel,
            },
            requestStart: function (e) {
                loading(true);
            },
            requestEnd: function (e) {
                loading(false);
            },
            pageSize: 10
        });
    }

    function auditTrailStudy(queryString, loading, callback) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.getAuditTrailStudy(queryString, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            e.success(r);
                            callback({ error: false });
                        }
                    });
                }
            },
            schema: {
                model: DIL.getAuditTrailStudyModel,
            },
            requestStart: function (e) {
                loading(true);
            },
            requestEnd: function (e) {
                loading(false);
            },
            pageSize: 10
        });
    }

    function auditTrailUser(queryString, loading, callback) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.getAuditTrailUser(queryString, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            e.success(r);
                            callback({ error: false });
                        }
                    });
                }
            },
            schema: {
                model: DIL.getAuditTrailUserModel,
            },
            requestStart: function (e) {
                loading(true);
            },
            requestEnd: function (e) {
                loading(false);
            },
            pageSize: 10
        });
    }

    function notification_history(queryString, loading, callback) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.getUserNotificationHistoryList(queryString, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            e.success(r);
                            callback({ error: false });
                        }
                    });
                }
            },
            schema: {
                model: DIL.notificationHistoryModel,
            },
            requestStart: function (e) {
                loading(true);
            },
            requestEnd: function (e) {
                loading(false);
            },
            pageSize: 10
        });
    }
    function product_notification_history(queryString, loading, callback) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    CSOM.getProductNotificationHistoryList(queryString, function (r) {
                        if (r.error) {
                            e.error(r.message, "error", r.message);
                            console.error(r.message);
                            callback(r);
                        } else {
                            e.success(r);
                            callback({ error: false });
                        }
                    });
                }
            },
            schema: {
                model: DIL.notificationHistoryModel,
            },
            requestStart: function (e) {
                loading(true);
            },
            requestEnd: function (e) {
                loading(false);
            },
            pageSize: 10
        });
    }
}(ADMINDAL || {}, CSOM));