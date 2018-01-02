var DIL = (function(dil){
        
	dil.studyModel = getStudyModel();
	dil.getStudy_ProductModel = getStudy_ProductModel();
    dil.innModel = getInnModel();
    dil.countryModel = getCountryModel();
    dil.userModel = getUserModel();
    dil.productUserCreateModel = getProductUserCreateModel();
    dil.useruserProductListModel = useruserProductListModel();
    dil.userProductModel = getUserProductModel();
    dil.productModel = getProductModel();
    dil.getStudyCreateProductModel = getStudyCreateProductModel();
    dil.susarProductModel = getSusarProductModel();
    dil.susarModel = getSusarModel();
    dil.iniFupModel = iniFupModel();
    dil.productEntityModel = getProductEntityModel();
    dil.getStudySponsorshipModel = getStudySponsorshipModel();
    dil.userEntityModel = userEntityModel();
    dil.getStudyAwareInnModel = getStudyAwareInnModel();
    dil.getAwareInnModel = getAwareInnModel();
    dil.userAccessRights = userAccessRightsModel();
    dil.getUsefulLinksModel = getUsefulLinksModel();
    dil.getTrainingLinksModel = getTrainingLinksModel();
    dil.getDILsNewsModel = getDILsNewsModel();
    dil.getDilsTrackerAModel = getDilsTrackerAModel();
    dil.getAuditTrailSusarModel = getAuditTrailSusarModel();
    dil.getAuditTrailProductModel = getAuditTrailProductModel();
    dil.getAuditTrailStudyModel = getAuditTrailStudyModel();
    dil.getAuditTrailUserModel = getAuditTrailUserModel();
    dil.workflowHistoryModel = workflowHistoryModel();
    dil.getWelcomeMessageModel = getWelcomeMessageModel();
    dil.getSUSARNotificationHistoryModel = getSUSARNotificationHistoryModel();
    dil.notificationHistoryModel = notificationHistoryModel();
    dil.coverLetterModel = coverLetterModel();

    return dil;
    function coverLetterModel() {
    	return kendo.data.Model.define({
    		id: "id",
    		fields: {
    			id: { type: "number" },
    			coverLetterValue: { type: "string" },
    			objVersion: { type: "number" },
    		}
    	});
    }
    function notificationHistoryModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                sentDate: { type: "date" },
                initiator: { type: "string" },
                recipients: { type: "string" },
                recipientsString: { type: "string" },
                recipientsName: { type: "object" },
                notificationType: { type: "string" },
                userId: { type: "number" },
                productId: { type: "number" },
                metaData: { type: "string" },
            }
        });
    }

    function getSUSARNotificationHistoryModel() {
    	return kendo.data.Model.define({
    		id: "id",
    		fields: {
    			id: { type: "number" },
    			sentDate: { type: "date" },
    			initiator: { type: "string" },
    			recipients: { type: "string" },
    			recipientsString: { type: "string" },
    			recipientsName: { type: "object" },
    			notificationType: { type: "string" },
    			susarId: { type: "number" },
    			metaData: { type: "string" },
    		}
    	});
    }

    function getWelcomeMessageModel() {
    	return kendo.data.Model.define({
    		id: "id",
    		fields: {
    			id: { type: "number" },
    			message: { type: "string" },
    			objVersion: { type: "number" },
    		}
    	});
    }

    function getUsefulLinksModel() {
    	return kendo.data.Model.define({
    		id: "id",
    		fields: {
    			id: { type: "number" },
    			notes: { type: "string" },
    			url: { type: "string" },
    			urlDescription: { type: "string" },
    			objVersion: { type: "number" },
    		}
    	});
    }

    function getTrainingLinksModel() {
    	return kendo.data.Model.define({
    		id: "id",
    		fields: {
    			id: { type: "number" },
    			notes: { type: "string" },
    			url: { type: "string" },
    			urlDescription: { type: "string" },
    			objVersion: { type: "number" },
    		}
    	});
    }

    function getDILsNewsModel() {
    	return kendo.data.Model.define({
    		id: "id",
    		fields: {
    			id: { type: "number" },
    			attachment: { type: "string" },
    			description: { type: "object" },
    			releaseDate: { type: "date" },
    			dilsNewsObjVersion: { type: "number" },
    			objVersion: { type: "number" },
    		}
    	});
    }
    
    function getInnModel(){
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                inn: { type: "string" },
            }
        });
    }

    function getCountryModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                country: { type: "string" },
            }
        });
    }

    function useruserProductListModel(){
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                userSPId: { type: "number" },
                productId: { type: "string"},                     
                dilProductName: { type: "string", editable: false },
                access: { type: "string", editable: false },
                susarOpenGroupId: { type: "number" },
                susarGroupId: { type: "number" },
                objVersion: { type: "number" },
            }
        });
    }

    function getProductUserCreateModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                refID: { type: "number" },
                access: { type: "string" },
                dilProductName: { type: "string" },
                susarOpenGroupId: { type: "number" },
                susarGroupId: { type: "number" },
                objVersion: { type: "number" },
            }
        });
    }

    function getStudyAwareInnModel() {
    	return kendo.data.Model.define({
    		id: "id",
    		fields: {
    			id: { type: "number" },
    			studyInn: { type: "string" },
    			drugName: { type: "string" },
    			isImported: { type: "boolean" },
    			retired: { type: "boolean" },
    			objVersion: { type: "number" },
    		}
    	});
    }

    function getAwareInnModel() {
    	return kendo.data.Model.define({
    		id: "id",
    		fields: {
    			id: { type: "number" },
    			awareInn: { type: "string" },
    			sourceInn: { type: "string" },
    			isImported: { type: "bool" },
    			retired: { type: "boolean" },
    		}
    	});
    }

    function getStudyModel() {
    	return kendo.data.Model.define({
    		id: "id",
    		fields: {
    			id: { type: "number" },
    			studyId: { type: "string" },
    			studySponsorship: { type: "string" },
    			investigationalDILProductID: { type: "object" },
    			investigationalDILProduct: { type: "object" },
    			primaryInvProdDILProductID: { type: "number" },
    			primaryInvProdDILProduct: { type: "string" },
    			studyBlindedStatus: { type: "string" },
    			susarOpenGroupId: { type: "object" },
    			susarGroupId: { type: "object"},
    			retire: { type: "boolean" },
    			isImported: { type: "boolean" },
    			objVersion: { type: "number" },
    		}
    	});
    }

    function getStudyCreateProductModel() {
    	return kendo.data.Model.define({
    		id: "id",
    		fields: {
    			id: { type: "number" },
    			dilProduct: { type: "string" },
    			userCount: { type: "number" },
    		}
    	});
    }

    function getStudy_ProductModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                dilProduct: { type: "string" },
                susarOpenGroupId: { type: "number" },
                susarGroupId: { type: "number" }
            }
        });
    }

    function getUserModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                userId: { type: "number" },
                userName: { type: "string" },
                userProfile: { type: "string" },
                userEntity: { type: "string" },
                country: { type: "string" },
                emailAddress: { type: "string" },
                userStatus: { type: "string" },
                modified: { type: "date" },
                created: { type: "date" },
                dilProductId: { type: "object" },
                countryName: { type: "object" },
                countryString: { type: "string" },
                objVersion: { type: "number" },
            }
        });
    }

    function getUserProductModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                userRefId: { type: "number" },
                userId: { type: "number" },
                userName: { type: "string" },
                productID: { type: "string" },
                productName: { type: "number" },
                access: { type: "string" },
                dilProductId: { type: "number" },
                dilProductName: { type: "string" },
                susarOpenGroupId: { type: "number" },
                susarGroupId: { type: "number" },
                objVersion: { type: "number" },
            }
        });
    }

    function getProductModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                code: { type: "string" },
                nickname: { type: "string" },
                inn: { type: "string" },
                entity: { type: "string" },
                dilProduct: { type: "string" },
                status: { type: "string" },
                retired: { type: "boolean" },
                canRetire: { type: "boolean" },
                objVersion: { type: "number" },
                modified: { type: "date" },
                created: { type: "date" },
            }
        });
    }

    function getSusarProductModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                code: { type: "string" },
                nickname: { type: "string" },
                inn: { type: "string" },
                entity: { type: "string" },
                dilProduct: { type: "string" },
                susarCount: { type: "number" },
            }
        });
    }

    function getSusarModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                susarId: { type: "number" },
                studySpid: { type: "number" },
                studyId: { type: "string" },
                primaryInvProdDilProductId: { type: "number" },
                primaryInvProdDilProductName: { type: "string" },
                dilProductId: { type: "object" },
                dilProductName: { type: "object" },
                dilProductString: { type: "string" },
                studyBlindedStatus: { type: "string" },
                studySponsorship: { type: "string" },
                caseId: { type: "string" },
                country: { type: "string" },
                centerId: { type: "string" },
                patientId: { type: "string" },
                suspectProductId: { type: "object" },
                suspectProductName: { type: "object" },
                suspectProductString: { type: "string" },
                primarySuspectProductRole: { type: "string" },
                preferredTerm: { type: "string" },
                benefitOrRiskModification: { type: "string" },
                downgradedToNonSusar: { type: "string" },
                downgradedSusarCaseDetails: { type: "string" },                
                dilSequence: { type: "string" },
                clockStartDate: { type: "date" },
                iniOrFup: { type: "string" },
                gpeDilDistributionDate: { type: "date" },
                gpeDilDistributionOnDay: { type: "number" },
                susarComment: { type: "string" },
                retired: { type: "boolean" },
                status: { type: "string" },
                submittedDate: { type: "date" },
                submittedBy: { type: "string" },
                isMajorCorrection: { type: "boolean" },
                hasMajorCorrection: { type: "boolean" },
                hasMinorCorrection: { type: "boolean" },
                reasonOfCorrection: { type: "string" },
                reasonForUnretire: { type: "string" },
                reasonForRetire: { type: "string" },
                oldStatus: { type: "string" },
                openId: { type: "number" },
                approvalId: { type: "number" },
                originalApprovalDate: { type: "date" },
                lastSusarApprovalDate: { type: "date" },
                lastSusarDispprovalDate: { type: "date" },
                isApproved: { type: "boolean" },
                attachmentBlindedCIOMSUrl: { type: "object" },
                attachmentOpenCIOMSUrl: { type: "object" },
                coverLetterUrl: { type: "object" },
                attachmentCoverLetter: { type: "object"},
                importedId: { type: "number" },
                importedOpenId: { type: "number" },
                isImported: { type: "boolean" },
                susarIdStr: { type: "string" },
                created: { type: "date" },
                author: { type: "string" },
                lastSavedDate: { type: "date" },
                susarObjVersion: { type: "number" },
                openObjVersion: { type: "number" },
                approvalVersion: { type: "number" },
            }
        });
    }

    function iniFupModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                DILsequenceID: { type: "number" },
                DILsequenceName: { type: "string" }
            }
        });
    }

    function getProductEntityModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                entity: { type: "string" },
                retired: { type: "boolean" },
                objVersion: { type: "number" },
            }
        });
    }

    function getStudySponsorshipModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                studySponsorship: { type: "string" },
                retired: { type: "boolean" },
                objVersion: { type: "number" },
            }
        });
    }

    function userEntityModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                userEntity: { type: "string" },
                retired: { type: "boolean" },
                objVersion: { type: "number" },
            }
        });
    }

    function userAccessRightsModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: "number" },
                userName: { type: "string" },
                dilProductName: { type: "string" },
                access: { type: "string" },
                action: { type: "string" },
                created: { type: "date" },
            }
        });
    }

    function getDilsTrackerAModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: 'number', editable: false },
                ProjectName: { type: "string", editable: false },
                BlindOrOpen: { type: "string", editable: false },
                StudyId: { type: "string", editable: false },
                CaseId: { type: "string", editable: false },
                CenterID: { type: "string", editable: false },
                patientId: { type: "string", editable: false },
                Country: { type: "string", editable: false },
                dilsequence: { type: "string", editable: false },
                studyProtocolProducts: { type: "string", editable: false },
                studyProtocolProductsStat: { type: "string", editable: false },
                preferredTermSusar: { type: "string", editable: false },
                DowngradedToNonSusarCase: { type: "string", editable: false },
                DowngradedSusarCaseDetail: { type: "string", editable: false },
                clockStartDate: { type: "date", editable: false },
                gpedildistributiondate: { type: "date", editable: false },
                gpedildistributiononday: { type: "number", editable: false },
                Comments: { type: "string", editable: false },
                ifu: { type: "string", editable: false },
                studySponsorship: { type: "string", editable: false },
                readyfordisplay: { type: "string", editable: false },
                editCheck: { type: "string", editable: false },
                Created: { type: "date", editable: false },
                Author: { type: "string", editable: false },
                Modified: { type: "date", editable: false },
                ModifiedBy: { type: "string", editable: false },
                version: { type: "string", editable: false }
            }
        });
    }

    function getAuditTrailSusarModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: 'number', editable: false },
                Status: { type: "string", editable: false },
                SusarID: { type: "string", editable: false },
                StudyID: { type: "string", editable: false },
                DILProductsName: { type: "object", editable: false },
                DILProductsString: { type: "string", editable: false },
                StudyBlindedStatus: { type: "string", editable: false },
                StudySponsorship: { type: "string", editable: false },
                CaseID: { type: "string", editable: false },
                CountryOfOccurrence: { type: "string", editable: false },
                CenterID: { type: "string", editable: false },
                PatientID: { type: "string", editable: false },
                SuspectProductsName: { type: "object", editable: false },
                SuspectProductsString: { type: "string", editable: false },
                PrimarySuspectProductRole: { type: "string", editable: false },
                PreferredTerm: { type: "string", editable: false },
                BenefitRiskModification: { type: "string", editable: false },
                DowngradedToNonSUSAR: { type: "string", editable: false },
                DowngradedSUSARCaseDetails: { type: "string", editable: false },
                DILSequence: { type: "string", editable: false },
                ClockStartDate: { type: "date", editable: false },
                IniFup: { type: "string", editable: false },
                GPEDILDistributionDate: { type: "date", editable: false },
                GPEDILDistributionOnDay: { type: "string" },
                SUSARComments: { type: "string", editable: false },
                Submitted: { type: "date", editable: false },
                SubmittedBy: { type: "string", editable: false },
                IsMajorCorrection: { type: "string", editable: false },
                ReasonOfCorrection: { type: "string", editable: false },    
                OriginalApprovalDate: { type: "date", editable: false },
                LastSUSARApprovalDate: { type: "date", editable: false },
                LastSUSARDisapprovalDate: { type: "date", editable: false },
                Retired: { type: "string", editable: false },
                Created: { type: "date", editable: false },
                Author: { type: "string", editable: false },
                Modified: { type: "date", editable: false },
                ModifiedBy: { type: "string", editable: false },
                Version: { type: "number", editable: false }
            }
        });
    }

    function getAuditTrailProductModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: 'number', editable: false },
                ProductCode: { type: "string", editable: false },               
                AWAREINN: { type: "string", editable: false },
                ProductEntity: { type: "string", editable: false },
                DILProduct: { type: "string", editable: false },
                susarOpenGroupId: { type: "string", editable: false },
                susarGroupId: { type: "string", editable: false },
                Status: { type: "string", editable: false },
                Created: { type: "date", editable: false },
                Author: { type: "string", editable: false },
                Modified: { type: "date", editable: false },
                ModifiedBy: { type: "string", editable: false },
                Version: { type: "string", editable: false }               
            }
        });
    }

    function getAuditTrailStudyModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: 'number', editable: false },
                StudyID: { type: "string", editable: false },
                StudySponsorship: { type: "string", editable: false },
                InvestigationalDILProducts: { type: "string", editable: false },
                InvestigationalDILProductsName: { type: "object" },
                InvestigationalDILProductsString: { type: "string" },
                PrimaryInvProdDILProduct: { type: "string", editable: false },
                StudyBlindedStatus: { type: "string", editable: false },
                Retired: { type: "string", editable: false },
                isImported: { type: "string", editable: false },              
                Created: { type: "date", editable: false },
                Author: { type: "string", editable: false },
                Modified: { type: "date", editable: false },
                ModifiedBy: { type: "string", editable: false },
                Version: { type: "string", editable: false }
            }
        });
    }

    function getAuditTrailUserModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: 'number', editable: false },
                Country: { type: "string"},
                CountryName: { type: "object" },
                CountryString: { type: "string" },
                Name: { type: "string", editable: false },
                UserProfile: { type: "string", editable: false },
                UserEntity: { type: "string", editable: false },
                UserStatus: { type: "string", editable: false },
                OpenAccess: { type: "string", editable: false },
                AllOpen: { type: "string", editable: false },
                Created: { type: "date", editable: false },
                Author: { type: "string", editable: false },
                Modified: { type: "date", editable: false },
                ModifiedBy: { type: "string", editable: false },
                Version: { type: "string", editable: false }
            }
        });
    }

    function workflowHistoryModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: 'number', editable: false },
                SUSARID: { type: "string", editable: false },
                Status: { type: "string", editable: false },   
                DisapprovalComment: { type: "string", editable: false },
                ReasonOfCorrection: { type: "string", editable: false },
                ReasonForDeactivation: { type: "string", editable: false },
                ReasonForReactivation: { type: "string", editable: false },
                ModifiedOn: { type: "date", editable: false },              
                ModifiedBy: { type: "string", editable: false },
            }
        });
    }

    function dashboardModel() {
        return kendo.data.Model.define({
            id: "id",
            fields: {
                id: { type: 'number' },
                ini: { type: 'number' },
                fup: { type: 'number' },
                dils: { type: 'number' },
                total: { type: 'number' },
                monthInt: { type: 'number' },
                sponsorship: { type: 'string' },
                productEntity: { type: 'string' },
                project: { type: 'string' },
                percentageStr: { type: 'string' },
                iniFupStr: { type: 'string' },
                dateStr: { type: 'string' },
                month: { type: 'string' },
                year: { type: 'string' },
                dateStr: { type: 'string' },
                date: { type: 'date' },
            }
        });
    }

}(DIL || {}));