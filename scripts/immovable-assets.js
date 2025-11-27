// Immovable Assets Data Structure
const ImmovableAssets = {
    // Asset Categories
    categories: {
        RESIDENTIAL_HOUSE: 'residential_house',
        COMMERCIAL_HOUSE: 'commercial_house', 
        INDUSTRIAL_HOUSE: 'industrial_house',
        LANDS: 'lands',
        MINES: 'mines',
        QUARRY: 'quarry',
        BRICKYARD: 'brickyard',
        FISH_POND: 'fish_pond'
    },

    // Base asset structure
    createAsset: function(category, data) {
        return {
            id: this.generateId(),
            category: category,
            declarationPeriod: new Date().getFullYear(),
            dateCreated: new Date().toISOString(),
            ...data
        };
    },

    // Asset templates for each category
    templates: {
        residential_house: {
            owner: '',
            location: {
                province: '',
                district: '',
                sector: '',
                cell: '',
                village: '',
                plotNumber: ''
            },
            propertyDetails: {
                houseType: '', // villa, apartment, duplex, etc.
                rooms: 0,
                bathrooms: 0,
                landSize: 0, // in square meters
                builtArea: 0, // in square meters
                yearBuilt: null,
                condition: '' // excellent, good, fair, poor
            },
            ownership: {
                isJoint: false,
                jointOwners: [],
                acquisitionMethod: '', // bought, inherited, gift, built
                acquisitionDate: null,
                hasLoan: false,
                loanDetails: null,
                isRented: false,
                rentalDetails: null
            },
            valuation: {
                currentValue: 0,
                acquisitionValue: 0,
                currency: 'RWF'
            },
            documents: {
                titleDeed: null,
                valuationCertificate: null,
                photos: []
            }
        },

        commercial_house: {
            owner: '',
            location: {
                province: '',
                district: '',
                sector: '',
                cell: '',
                village: '',
                plotNumber: ''
            },
            propertyDetails: {
                buildingType: '', // office, shop, warehouse, etc.
                floors: 0,
                totalArea: 0,
                rentableArea: 0,
                yearBuilt: null,
                condition: ''
            },
            business: {
                currentTenant: '',
                businessType: '',
                monthlyRent: 0,
                leaseExpiry: null
            },
            ownership: {
                isJoint: false,
                jointOwners: [],
                acquisitionMethod: '',
                acquisitionDate: null,
                hasLoan: false,
                loanDetails: null
            },
            valuation: {
                currentValue: 0,
                acquisitionValue: 0,
                monthlyIncome: 0,
                currency: 'RWF'
            },
            documents: {
                titleDeed: null,
                businessLicense: null,
                valuationCertificate: null
            }
        },

        industrial_house: {
            owner: '',
            location: {
                province: '',
                district: '',
                sector: '',
                cell: '',
                village: '',
                plotNumber: ''
            },
            propertyDetails: {
                facilityType: '', // factory, processing plant, etc.
                totalArea: 0,
                productionArea: 0,
                yearBuilt: null,
                condition: '',
                machinery: []
            },
            operations: {
                industryType: '',
                productionCapacity: '',
                employees: 0,
                operationalStatus: '' // active, inactive, seasonal
            },
            ownership: {
                isJoint: false,
                jointOwners: [],
                acquisitionMethod: '',
                acquisitionDate: null,
                hasLoan: false,
                loanDetails: null
            },
            valuation: {
                currentValue: 0,
                acquisitionValue: 0,
                annualRevenue: 0,
                currency: 'RWF'
            },
            documents: {
                titleDeed: null,
                industrialLicense: null,
                environmentalClearance: null
            }
        },

        lands: {
            owner: '',
            location: {
                province: '',
                district: '',
                sector: '',
                cell: '',
                village: '',
                plotNumber: ''
            },
            landDetails: {
                landType: '', // agricultural, residential, commercial, forest
                totalArea: 0, // in hectares
                soilType: '',
                topography: '', // flat, hilly, mountainous
                waterAccess: false,
                roadAccess: false
            },
            usage: {
                currentUse: '', // farming, grazing, vacant, etc.
                crops: [],
                livestock: [],
                isLeased: false,
                leaseDetails: null
            },
            ownership: {
                isJoint: false,
                jointOwners: [],
                acquisitionMethod: '',
                acquisitionDate: null,
                hasLoan: false,
                loanDetails: null
            },
            valuation: {
                currentValue: 0,
                acquisitionValue: 0,
                annualIncome: 0,
                currency: 'RWF'
            },
            documents: {
                titleDeed: null,
                landCertificate: null,
                surveyReport: null
            }
        },

        mines: {
            owner: '',
            location: {
                province: '',
                district: '',
                sector: '',
                cell: '',
                village: '',
                coordinates: ''
            },
            mineDetails: {
                mineType: '', // open pit, underground, quarry
                mineralType: '', // gold, tin, tungsten, etc.
                totalArea: 0,
                depth: 0,
                estimatedReserves: '',
                extractionMethod: ''
            },
            operations: {
                operationalStatus: '', // active, inactive, exploration
                dailyProduction: 0,
                employees: 0,
                equipment: [],
                safetyMeasures: []
            },
            ownership: {
                isJoint: false,
                jointOwners: [],
                acquisitionMethod: '',
                acquisitionDate: null,
                hasLoan: false,
                loanDetails: null
            },
            valuation: {
                currentValue: 0,
                acquisitionValue: 0,
                annualRevenue: 0,
                currency: 'RWF'
            },
            documents: {
                miningLicense: null,
                environmentalImpactAssessment: null,
                geologicalSurvey: null
            }
        },

        quarry: {
            owner: '',
            location: {
                province: '',
                district: '',
                sector: '',
                cell: '',
                village: '',
                coordinates: ''
            },
            quarryDetails: {
                materialType: '', // stone, sand, gravel, clay
                totalArea: 0,
                depth: 0,
                estimatedReserves: '',
                extractionMethod: ''
            },
            operations: {
                operationalStatus: '',
                dailyProduction: 0,
                employees: 0,
                equipment: [],
                transportationMethod: ''
            },
            ownership: {
                isJoint: false,
                jointOwners: [],
                acquisitionMethod: '',
                acquisitionDate: null,
                hasLoan: false,
                loanDetails: null
            },
            valuation: {
                currentValue: 0,
                acquisitionValue: 0,
                annualRevenue: 0,
                currency: 'RWF'
            },
            documents: {
                quarryLicense: null,
                environmentalClearance: null,
                safetyPermit: null
            }
        },

        brickyard: {
            owner: '',
            location: {
                province: '',
                district: '',
                sector: '',
                cell: '',
                village: '',
                plotNumber: ''
            },
            facilityDetails: {
                totalArea: 0,
                productionCapacity: 0, // bricks per day
                kilnType: '', // traditional, modern, tunnel
                claySource: '',
                waterSource: ''
            },
            operations: {
                operationalStatus: '',
                dailyProduction: 0,
                employees: 0,
                equipment: [],
                marketArea: ''
            },
            ownership: {
                isJoint: false,
                jointOwners: [],
                acquisitionMethod: '',
                acquisitionDate: null,
                hasLoan: false,
                loanDetails: null
            },
            valuation: {
                currentValue: 0,
                acquisitionValue: 0,
                annualRevenue: 0,
                currency: 'RWF'
            },
            documents: {
                businessLicense: null,
                environmentalClearance: null,
                landTitle: null
            }
        },

        fish_pond: {
            owner: '',
            location: {
                province: '',
                district: '',
                sector: '',
                cell: '',
                village: '',
                plotNumber: ''
            },
            pondDetails: {
                totalArea: 0, // in square meters
                numberOfPonds: 0,
                waterSource: '', // river, borehole, rain
                pondType: '', // earthen, concrete, plastic
                depth: 0
            },
            fishFarming: {
                fishSpecies: [],
                stockingDensity: 0,
                feedingMethod: '',
                harvestCycle: 0, // months
                annualProduction: 0 // kg
            },
            ownership: {
                isJoint: false,
                jointOwners: [],
                acquisitionMethod: '',
                acquisitionDate: null,
                hasLoan: false,
                loanDetails: null
            },
            valuation: {
                currentValue: 0,
                acquisitionValue: 0,
                annualRevenue: 0,
                currency: 'RWF'
            },
            documents: {
                aquacultureLicense: null,
                waterPermit: null,
                landTitle: null
            }
        }
    },

    // Utility functions
    generateId: function() {
        return 'asset_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    // Create new asset instance
    createNewAsset: function(category, customData = {}) {
        const template = this.templates[category];
        if (!template) {
            throw new Error(`Invalid asset category: ${category}`);
        }
        
        const assetData = { ...template, ...customData };
        return this.createAsset(category, assetData);
    },

    // Validate asset data
    validateAsset: function(asset) {
        const required = ['owner', 'location', 'valuation'];
        return required.every(field => asset[field] && Object.keys(asset[field]).length > 0);
    },

    // Get asset summary
    getAssetSummary: function(asset) {
        return {
            id: asset.id,
            category: asset.category,
            owner: asset.owner,
            location: `${asset.location.district}, ${asset.location.province}`,
            value: asset.valuation.currentValue,
            currency: asset.valuation.currency,
            dateCreated: asset.dateCreated
        };
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImmovableAssets;
}