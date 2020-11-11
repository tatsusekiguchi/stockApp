/* Javascript */

const requestConfig = {
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "accesstoken": (localStorage.getItem("accesstoken")) ? localStorage.getItem("accesstoken") : ""  }
}

async function post(axios, path, data) {
    return await axios.post(`${hostUrl}${path}`, data, requestConfig).catch(errorHref);
}

async function get(axios, path) {
    return await axios.get(`${hostUrl}${path}`, requestConfig).catch(errorHref);
}

async function put(axios, path, data) {
    return await axios.put(`${hostUrl}${path}`, data, requestConfig).catch(errorHref);
}

async function delete_(axios, path) {
    return await axios.delete(`${hostUrl}${path}`, requestConfig).catch(errorHref);
}

function errorHref(error) {
    console.log("error.", error);
    console.log(error.response);
    if (error.response.status === 404) {
        location.href = "/error/404.html";
    } else if (error.response.status >= 500) {
        location.href = "/error/500.html";
    }
    return error.response;
}

function createVideoPath(code, driveHistoryId, videoId) {
    //return `${imageUrl}` +"/"+ code +"/"+ driveHistoryId +"/"+ videoId +".mp4"
    return `${imageUrl}/appcodeXXX/${driveHistoryId}/${videoId}.mp4`
}