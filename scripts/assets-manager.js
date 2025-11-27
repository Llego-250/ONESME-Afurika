// Assets Manager - Handle CRUD operations for immovable assets
class AssetsManager {
    constructor() {
        this.storageKey = 'immovable_assets';
        this.assets = this.loadAssets();
    }

    // Load assets from localStorage
    loadAssets() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading assets:', error);
            return [];
        }
    }

    // Save assets to localStorage
    saveAssets() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.assets));
            return true;
        } catch (error) {
            console.error('Error saving assets:', error);
            return false;
        }
    }

    // Add new asset
    addAsset(category, assetData) {
        try {
            const newAsset = ImmovableAssets.createNewAsset(category, assetData);
            this.assets.push(newAsset);
            this.saveAssets();
            return newAsset;
        } catch (error) {
            console.error('Error adding asset:', error);
            return null;
        }
    }

    // Get all assets
    getAllAssets() {
        return this.assets;
    }

    // Get assets by category
    getAssetsByCategory(category) {
        return this.assets.filter(asset => asset.category === category);
    }

    // Get asset by ID
    getAssetById(id) {
        return this.assets.find(asset => asset.id === id);
    }

    // Update asset
    updateAsset(id, updatedData) {
        const index = this.assets.findIndex(asset => asset.id === id);
        if (index !== -1) {
            this.assets[index] = { ...this.assets[index], ...updatedData };
            this.saveAssets();
            return this.assets[index];
        }
        return null;
    }

    // Delete asset
    deleteAsset(id) {
        const index = this.assets.findIndex(asset => asset.id === id);
        if (index !== -1) {
            const deleted = this.assets.splice(index, 1)[0];
            this.saveAssets();
            return deleted;
        }
        return null;
    }

    // Get assets summary
    getAssetsSummary() {
        const summary = {
            total: this.assets.length,
            totalValue: 0,
            byCategory: {}
        };

        this.assets.forEach(asset => {
            // Add to total value
            summary.totalValue += asset.valuation.currentValue || 0;

            // Count by category
            if (!summary.byCategory[asset.category]) {
                summary.byCategory[asset.category] = {
                    count: 0,
                    totalValue: 0
                };
            }
            summary.byCategory[asset.category].count++;
            summary.byCategory[asset.category].totalValue += asset.valuation.currentValue || 0;
        });

        return summary;
    }

    // Search assets
    searchAssets(query) {
        const searchTerm = query.toLowerCase();
        return this.assets.filter(asset => {
            return (
                asset.owner.toLowerCase().includes(searchTerm) ||
                asset.location.district.toLowerCase().includes(searchTerm) ||
                asset.location.province.toLowerCase().includes(searchTerm) ||
                asset.category.toLowerCase().includes(searchTerm)
            );
        });
    }

    // Filter assets by criteria
    filterAssets(criteria) {
        return this.assets.filter(asset => {
            let matches = true;

            if (criteria.category && asset.category !== criteria.category) {
                matches = false;
            }

            if (criteria.province && asset.location.province !== criteria.province) {
                matches = false;
            }

            if (criteria.district && asset.location.district !== criteria.district) {
                matches = false;
            }

            if (criteria.minValue && asset.valuation.currentValue < criteria.minValue) {
                matches = false;
            }

            if (criteria.maxValue && asset.valuation.currentValue > criteria.maxValue) {
                matches = false;
            }

            if (criteria.year && new Date(asset.dateCreated).getFullYear() !== criteria.year) {
                matches = false;
            }

            return matches;
        });
    }

    // Load sample data (for demonstration)
    loadSampleData() {
        if (typeof getAllSampleAssets === 'function') {
            const sampleAssets = getAllSampleAssets();
            this.assets = [...this.assets, ...sampleAssets];
            this.saveAssets();
            return sampleAssets.length;
        }
        return 0;
    }

    // Clear all assets
    clearAllAssets() {
        this.assets = [];
        this.saveAssets();
    }

    // Export assets to JSON
    exportAssets() {
        return JSON.stringify(this.assets, null, 2);
    }

    // Import assets from JSON
    importAssets(jsonData) {
        try {
            const importedAssets = JSON.parse(jsonData);
            if (Array.isArray(importedAssets)) {
                this.assets = importedAssets;
                this.saveAssets();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing assets:', error);
            return false;
        }
    }

    // Get category display name
    getCategoryDisplayName(category) {
        const displayNames = {
            'residential_house': 'Residential House',
            'commercial_house': 'Commercial House',
            'industrial_house': 'Industrial House',
            'lands': 'Lands',
            'mines': 'Mines',
            'quarry': 'Quarry',
            'brickyard': 'Brickyard',
            'fish_pond': 'Fish Pond'
        };
        return displayNames[category] || category;
    }

    // Format currency
    formatCurrency(amount, currency = 'RWF') {
        return new Intl.NumberFormat('en-RW', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0
        }).format(amount);
    }
}

// Create global instance
const assetsManager = new AssetsManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AssetsManager;
}