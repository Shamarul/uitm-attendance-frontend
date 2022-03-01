import Api from '../../config/Api';

/*----- Login -----
    action: POST
    params: uid [String], key [String]
*/
export async function _login(body) {
    let request = await fetch([Api.API_URL, 'login'].join('/'), body);
    let getBody = await request.json();
    let responseJSON = {httpstatus: request.status, ...getBody};
    return responseJSON;
}

/*----- Get Participant -----
    action: GET
    params: name [String]
*/
export async function _getParticipant(body, props) {
    let request = await fetch(Api.API_URL+'/search?name='+props.name, body);
    let getBody = await request.json();
    let responseJSON = {httpstatus: request.status, ...getBody};
    return responseJSON;
}

/*----- Get Info -----
    action: GET
*/
export async function _getInfo(body, props) {
    let request = await fetch([Api.API_URL, 'info'].join('/'), body);
    let getBody = await request.json();
    let responseJSON = {httpstatus: request.status, ...getBody};
    return responseJSON;
}

/*----- Checkout -----
    action: POST
*/
export async function _checkout(body) {
    let request = await fetch([Api.API_URL, 'check_out'].join('/'), body);
    let getBody = await request.json();
    let responseJSON = {httpstatus: request.status, ...getBody};
    return responseJSON;
}