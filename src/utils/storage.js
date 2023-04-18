export function GetItem(key) {
    // getting stored value
    const saved = localStorage.getItem(key);
    const value = JSON.parse(saved);
    return value || "";
}
