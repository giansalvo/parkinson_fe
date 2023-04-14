export function GetItem(param) {
    // getting stored value
    const saved = localStorage.getItem(param);
    const value = JSON.parse(saved);
    return value || "";
}