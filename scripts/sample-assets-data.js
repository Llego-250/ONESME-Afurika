// Sample Immovable Assets Data
const SampleAssetsData = {
    // Sample residential house
    residentialHouse: {
        owner: 'Onesme Afurika',
        location: {
            province: 'Kigali City',
            district: 'Gasabo',
            sector: 'Remera',
            cell: 'Gisozi',
            village: 'Ubumwe',
            plotNumber: 'RH-001-2024'
        },
        propertyDetails: {
            houseType: 'Villa',
            rooms: 4,
            bathrooms: 3,
            landSize: 800,
            builtArea: 350,
            yearBuilt: 2018,
            condition: 'Excellent'
        },
        ownership: {
            isJoint: false,
            jointOwners: [],
            acquisitionMethod: 'Bought',
            acquisitionDate: '2020-03-15',
            hasLoan: true,
            loanDetails: {
                bank: 'Bank of Kigali',
                amount: 25000000,
                monthlyPayment: 450000,
                remainingBalance: 18000000
            },
            isRented: false,
            rentalDetails: null
        },
        valuation: {
            currentValue: 45000000,
            acquisitionValue: 35000000,
            currency: 'RWF'
        }
    },

    // Sample commercial house
    commercialHouse: {
        owner: 'Onesme Afurika',
        location: {
            province: 'Kigali City',
            district: 'Nyarugenge',
            sector: 'Nyarugenge',
            cell: 'Rwampara',
            village: 'Biryogo',
            plotNumber: 'CH-002-2024'
        },
        propertyDetails: {
            buildingType: 'Office Building',
            floors: 3,
            totalArea: 600,
            rentableArea: 500,
            yearBuilt: 2015,
            condition: 'Good'
        },
        business: {
            currentTenant: 'Tech Solutions Ltd',
            businessType: 'IT Services',
            monthlyRent: 800000,
            leaseExpiry: '2025-12-31'
        },
        ownership: {
            isJoint: false,
            jointOwners: [],
            acquisitionMethod: 'Bought',
            acquisitionDate: '2019-08-20',
            hasLoan: false,
            loanDetails: null
        },
        valuation: {
            currentValue: 65000000,
            acquisitionValue: 50000000,
            monthlyIncome: 800000,
            currency: 'RWF'
        }
    },

    // Sample land
    land: {
        owner: 'Onesme Afurika',
        location: {
            province: 'Eastern Province',
            district: 'Rwamagana',
            sector: 'Muhazi',
            cell: 'Cyili',
            village: 'Karama',
            plotNumber: 'LD-003-2024'
        },
        landDetails: {
            landType: 'Agricultural',
            totalArea: 5.2,
            soilType: 'Clay loam',
            topography: 'Gently sloping',
            waterAccess: true,
            roadAccess: true
        },
        usage: {
            currentUse: 'Crop farming',
            crops: ['Maize', 'Beans', 'Irish Potatoes'],
            livestock: [],
            isLeased: false,
            leaseDetails: null
        },
        ownership: {
            isJoint: true,
            jointOwners: ['Spouse Name'],
            acquisitionMethod: 'Inherited',
            acquisitionDate: '2017-05-10',
            hasLoan: false,
            loanDetails: null
        },
        valuation: {
            currentValue: 15600000,
            acquisitionValue: 12000000,
            annualIncome: 2400000,
            currency: 'RWF'
        }
    },

    // Sample fish pond
    fishPond: {
        owner: 'Onesme Afurika',
        location: {
            province: 'Southern Province',
            district: 'Huye',
            sector: 'Tumba',
            cell: 'Cyarwa',
            village: 'Muganza',
            plotNumber: 'FP-004-2024'
        },
        pondDetails: {
            totalArea: 2000,
            numberOfPonds: 4,
            waterSource: 'Borehole',
            pondType: 'Earthen',
            depth: 2.5
        },
        fishFarming: {
            fishSpecies: ['Tilapia', 'Catfish'],
            stockingDensity: 5,
            feedingMethod: 'Commercial feed + organic',
            harvestCycle: 6,
            annualProduction: 1200
        },
        ownership: {
            isJoint: false,
            jointOwners: [],
            acquisitionMethod: 'Built',
            acquisitionDate: '2021-01-15',
            hasLoan: true,
            loanDetails: {
                bank: 'Urwego Bank',
                amount: 3000000,
                monthlyPayment: 85000,
                remainingBalance: 1800000
            }
        },
        valuation: {
            currentValue: 8500000,
            acquisitionValue: 6000000,
            annualRevenue: 3600000,
            currency: 'RWF'
        }
    },

    // Sample mine
    mine: {
        owner: 'Onesme Afurika',
        location: {
            province: 'Western Province',
            district: 'Rusizi',
            sector: 'Giheke',
            cell: 'Nyakabuye',
            village: 'Rwimbogo',
            coordinates: '-2.4833, 28.9167'
        },
        mineDetails: {
            mineType: 'Open pit',
            mineralType: 'Tin ore (Cassiterite)',
            totalArea: 12,
            depth: 15,
            estimatedReserves: '500 tons',
            extractionMethod: 'Manual extraction'
        },
        operations: {
            operationalStatus: 'Active',
            dailyProduction: 2.5,
            employees: 25,
            equipment: ['Excavators', 'Trucks', 'Processing equipment'],
            safetyMeasures: ['Safety helmets', 'First aid station', 'Emergency procedures']
        },
        ownership: {
            isJoint: true,
            jointOwners: ['Business Partner'],
            acquisitionMethod: 'Bought',
            acquisitionDate: '2019-11-30',
            hasLoan: false,
            loanDetails: null
        },
        valuation: {
            currentValue: 125000000,
            acquisitionValue: 80000000,
            annualRevenue: 45000000,
            currency: 'RWF'
        }
    }
};

// Function to get all sample assets as proper asset objects
function getAllSampleAssets() {
    const assets = [];
    
    // Create residential house asset
    assets.push(ImmovableAssets.createNewAsset(
        ImmovableAssets.categories.RESIDENTIAL_HOUSE, 
        SampleAssetsData.residentialHouse
    ));
    
    // Create commercial house asset
    assets.push(ImmovableAssets.createNewAsset(
        ImmovableAssets.categories.COMMERCIAL_HOUSE, 
        SampleAssetsData.commercialHouse
    ));
    
    // Create land asset
    assets.push(ImmovableAssets.createNewAsset(
        ImmovableAssets.categories.LANDS, 
        SampleAssetsData.land
    ));
    
    // Create fish pond asset
    assets.push(ImmovableAssets.createNewAsset(
        ImmovableAssets.categories.FISH_POND, 
        SampleAssetsData.fishPond
    ));
    
    // Create mine asset
    assets.push(ImmovableAssets.createNewAsset(
        ImmovableAssets.categories.MINES, 
        SampleAssetsData.mine
    ));
    
    return assets;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SampleAssetsData, getAllSampleAssets };
}