class StorageService {
    saveState(state) {
        console.log("Saving state", state);
        localStorage.setItem("state", JSON.stringify(state));
    }
    getState() {
        const item = localStorage.getItem("state");
        if (item === null) {
            return null;
        }
        return JSON.parse(item);
    }
}
export const AppStorageService = new StorageService();
