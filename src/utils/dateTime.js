export const formatDateTime = (timestamp) => {
    var date = new Date(timestamp).toLocaleDateString();
    var time = new Date(timestamp).toLocaleTimeString();
    return date + " " + time;
};