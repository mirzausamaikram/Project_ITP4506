// Shared quotation storage using IndexedDB
class QuotationStore {
    constructor() {
        this.dbName = 'SmileAndSunshine';
        this.storeName = 'quotations';
        this.db = null;
        this.init();
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);
            
            request.onerror = () => reject('IndexedDB open failed');
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                }
            };
        });
    }

    async save(quotation) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.add(quotation);
            
            request.onsuccess = () => {
                resolve();
            };
            request.onerror = () => reject('Failed to save quotation');
        });
    }

    async getAll() {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();
            
            request.onsuccess = () => {
                resolve(request.result || []);
            };
            request.onerror = () => reject('Failed to fetch quotations');
        });
    }
}

// Global instance
const quotationStore = new QuotationStore();
