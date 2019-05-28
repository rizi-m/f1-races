export function getRequest(url, onload) {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.onload = () => onload(request.response);
    request.send();
};


