const fs = require('fs');

// Read your k6 script
// TODO : Make scriptFileName read all scripts automatically, 
// TODO : currently give any script
const scriptFileName = './backend-tests/admin-registration/admin-reg-copy-plan-to-admin.js';
const commonFileName = 'common.js';

const scriptContent = fs.readFileSync(scriptFileName, 'utf-8');

// Define the getCredit function
const getCreditFunction = `
function getCredit(
    principalId,
    testingWithOauth,
    hostUrl,
    creditOptionId,
    params,
    vuIdx,
    testScriptName,
    requestCount,
    preferredCredits
) {
    const urlParams =  buildQuery({
        "principalId": principalId,
    }, testingWithOauth);

    const url = http.url\`\${hostUrl}/lrcservice/resultvaluesgroups/\${creditOptionId}?\${urlParams}\`;
    params.tags = {'name':  getTagForUrl(url.name)};
    let response = http.request("GET", url, {}, params);

    try {
        preferredCredits.push(JSON.parse(response.body).rank);
    } catch (e) {
        // in case of error continue to next request
    }

     logCommonMetrics({
        response: response,
        expectedStatus: 200,
        failOnError: true,
        printOnError: true,
        requestCount: requestCount,
        virtualUser: vuIdx,
        testScriptName: testScriptName,
        reqDurationMetric: http_req_duration_admin_reg_copy_plan_to_admin
    });
}
`;

// Replace the original getCredit function in the script
const originalGetCreditFunction = scriptContent.match(/function getCredit\s*\(.*?\)\s*{([\s\S]*?)}/)[0];
console.log("originalGetCreditFunction === ",originalGetCreditFunction);
if (originalGetCreditFunction) {
  const modifiedScript = scriptContent.replace(originalGetCreditFunction, getCreditFunction);
  fs.writeFileSync(scriptFileName, modifiedScript);
  console.log("===== script run successful===== , Enjoy Buddy.");
} else {
  console.log("Original getCredit function not found in the script.");
}

// Append the getCredit function to the common.js file
fs.appendFileSync(commonFileName, getCreditFunction);

