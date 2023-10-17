
// module.exports = async function () {
// }
const axios = require("axios");
module.exports = async srv =>{
    srv.before('CREATE', 'Files', req => {
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/attachments/Files(${req.data.ID})/content`
    });
    srv.on("Submit", async function(req){

     let data =   JSON.parse(req.data.payload);

        let url = "https://5b6f963atrial.authentication.us10.hana.ondemand.com";
        let clientId = "sb-2180c155-67be-4621-8640-8aaf7fca2fc0!b188912|it-rt-5b6f963atrial!b26655";
        let clientSecret = "8aed4d3e-f380-46a5-98b9-fb256e8e308e$bLsSuVH1tLirAJghAmyxPfPwe6XJz_qX50XJBEtuBNY=";
        let token = await _fetchJwtToken(url, clientId, clientSecret);
        let iflow_url="https://5b6f963atrial.it-cpitrial05-rt.cfapps.us10-001.hana.ondemand.com/http/json";
        let iflowpayload=data;
        var headers = {

            headers: {

                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                'Accept': 'application/json',
                responseType: 'json'
            }
        };
        const resultSpa = await axios
            .post(iflow_url, iflowpayload, headers)
            .catch(function (error) {
                return req.error({ code: 417, message: error.message });
            });
        return "data";
    })
    const _fetchJwtToken = async function (oauthUrl, oauthClient, oauthSecret) {
        // This is to get the oauth token , which is used to create the folder ID
        return new Promise((resolve, reject) => {
            const tokenUrl =
                oauthUrl +
                "/oauth/token?grant_type=client_credentials&response_type=token";
            const config = {
                headers: {
                    Authorization:
                        "Basic " +
                        Buffer.from(oauthClient + ":" + oauthSecret).toString("base64"),
                },
            };
            axios
                .get(tokenUrl, config)
                .then((response) => {
                    resolve(response.data.access_token);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
}