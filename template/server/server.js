const axios = require("axios");
const base_url="";
const list = {
  "data": {
    "items": [
      {
        "tenantId": "116868507383358899857",
        "version": "v1",
        "createdBy": "santhosh D",
        "updatedBy": "santhosh D",
        "subTenantId": false,
        "dtCreated": "2025-02-28T07:09:31.381Z",
        "connectedApps": [
          "k0nwbhook",
          "Sheets2000"
        ],
        "connections": [
          "RyeMSZEKqF"
        ],
        "formId": "",
        "taskExecutedCount": 0,
        "lastExecutedAt": "2025-02-28T07:02:39.456Z",
        "id": "Nc0kWO3gRY",
        "draft": {
          "nodes": [
            {
              "hasConfigured": true,
              "fieldsConfigured": true,
              "mapping_meta": {},
              "dynamicMapping_meta": {},
              "s_id": "aIfmF0NZRz",
              "type": "trigger",
              "canDraft": false,
              "dynamicMapping": {},
              "stepName": "Catch hook",
              "mapping": {},
              "parentNode": "0",
              "throwConfigError": false,
              "currentTab": "mapping",
              "rule": {},
              "parse": {},
              "code": {},
              "repeater": {},
              "position": 1,
              "appId": "k0nwbhook",
              "appType": [
                "konnectify-app"
              ],
              "appName": "Konnectify Webhook",
              "iconUrl": "https://storage.googleapis.com/konnectify-form-files/logo/konnectify-webhook.svg",
              "description": "Webhook by Konnectify",
              "isBeta": true,
              "eventId": "catch-hook",
              "eventName": "Catch hook",
              "isSearchAction": false,
              "account": {
                "accountId": "",
                "accountName": ""
              },
              "skipOnFailure": false,
              "testEvent": {
                "outputSchema": [],
                "status": "idle"
              },
              "id": "1",
              "webhookId": "ZaWKHI8Nme"
            },
            {
              "hasConfigured": true,
              "fieldsConfigured": true,
              "mapping_meta": {},
              "dynamicMapping_meta": {
                "spreadsheetId": "eventLog migration",
                "worksheetName": "prod dec 19 - dec28"
              },
              "s_id": "G5ux7hokQn",
              "type": "action",
              "dynamicMapping": {
                "spreadsheetId": "1haWhtvMKMX0KUnZyYBmUmh55JL2egZANT9aFOp2mtPA",
                "worksheetName": "prod dec 19 - dec28"
              },
              "mapping": {
                "no": "*{aIfmF0NZRz__no%no}*",
                "total": "*{aIfmF0NZRz__total%total}*",
                "batchsize": "*{aIfmF0NZRz__batch%batch}*",
                "time": "*{aIfmF0NZRz__time%time}*"
              },
              "canDraft": true,
              "stepName": "Create Spreadsheet Row",
              "parentNode": "0",
              "throwConfigError": false,
              "currentTab": "mapping",
              "rule": {},
              "parse": {},
              "position": 2,
              "code": {},
              "repeater": {},
              "id": "3",
              "appId": "Sheets2000",
              "appType": [
                "communication",
                "marketing"
              ],
              "appName": "Google Sheet (New)",
              "iconUrl": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Google_Sheets_2020_Logo.svg",
              "description": "Spreadsheet platform for data storage and analysis",
              "isBeta": false,
              "eventId": "create-spreadsheet-row",
              "eventName": "Create Spreadsheet Row",
              "isSearchAction": false,
              "account": {
                "accountId": "RyeMSZEKqF",
                "accountName": "sandy"
              },
              "skipOnFailure": false,
              "testEvent": {
                "outputSchema": [],
                "status": "idle"
              }
            }
          ]
        },
        "name": "Freshservice user create sync",
        "configuration": {
          "nodes": [
            {
              "hasConfigured": true,
              "fieldsConfigured": true,
              "mapping_meta": {},
              "dynamicMapping_meta": {},
              "s_id": "aIfmF0NZRz",
              "type": "trigger",
              "canDraft": false,
              "dynamicMapping": {},
              "stepName": "Catch hook",
              "mapping": {},
              "parentNode": "0",
              "throwConfigError": false,
              "currentTab": "mapping",
              "rule": {},
              "parse": {},
              "code": {},
              "repeater": {},
              "position": 1,
              "appId": "k0nwbhook",
              "appType": [
                "konnectify-app"
              ],
              "appName": "Konnectify Webhook",
              "iconUrl": "https://storage.googleapis.com/konnectify-form-files/logo/konnectify-webhook.svg",
              "description": "Webhook by Konnectify",
              "isBeta": true,
              "eventId": "catch-hook",
              "eventName": "Catch hook",
              "isSearchAction": false,
              "account": {
                "accountId": "",
                "accountName": ""
              },
              "skipOnFailure": false,
              "testEvent": {
                "outputSchema": [],
                "status": "idle"
              },
              "id": "1",
              "webhookId": "ZaWKHI8Nme"
            },
            {
              "hasConfigured": true,
              "fieldsConfigured": true,
              "mapping_meta": {},
              "dynamicMapping_meta": {
                "spreadsheetId": "eventLog migration",
                "worksheetName": "prod dec 19 - dec28"
              },
              "s_id": "G5ux7hokQn",
              "type": "action",
              "dynamicMapping": {
                "spreadsheetId": "1haWhtvMKMX0KUnZyYBmUmh55JL2egZANT9aFOp2mtPA",
                "worksheetName": "prod dec 19 - dec28"
              },
              "mapping": {
                "no": "*{aIfmF0NZRz__no%no}*",
                "total": "*{aIfmF0NZRz__total%total}*",
                "batchsize": "*{aIfmF0NZRz__batch%batch}*",
                "time": "*{aIfmF0NZRz__time%time}*"
              },
              "canDraft": true,
              "stepName": "Create Spreadsheet Row",
              "parentNode": "0",
              "throwConfigError": false,
              "currentTab": "mapping",
              "rule": {},
              "parse": {},
              "position": 2,
              "code": {},
              "repeater": {},
              "id": "3",
              "appId": "Sheets2000",
              "appType": [
                "communication",
                "marketing"
              ],
              "appName": "Google Sheet (New)",
              "iconUrl": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Google_Sheets_2020_Logo.svg",
              "description": "Spreadsheet platform for data storage and analysis",
              "isBeta": false,
              "eventId": "create-spreadsheet-row",
              "eventName": "Create Spreadsheet Row",
              "isSearchAction": false,
              "account": {
                "accountId": "RyeMSZEKqF",
                "accountName": "sandy"
              },
              "skipOnFailure": false,
              "testEvent": {
                "outputSchema": [],
                "status": "idle"
              }
            }
          ]
        },
        "config_status": "Saved",
        "folderId": "qKSumCTZkH",
        "dtUpdated": "2025-03-03T15:00:36.434Z",
        "status": "active"
      },
      {
        "config_status": "in_draft",
        "configuration": {
          "nodes": []
        },
        "draft": {
          "nodes": [
            {
              "s_id": "WXPVGy8v95",
              "type": "trigger",
              "hasConfigured": true,
              "canDraft": true,
              "dynamicMapping": {},
              "stepName": "New Contact Added",
              "mapping": {},
              "mapping_meta": {},
              "dynamicMapping_meta": {},
              "parentNode": "0",
              "throwConfigError": false,
              "currentTab": "mapping",
              "rule": {},
              "parse": {},
              "code": {},
              "repeater": {},
              "position": 1,
              "appId": "AMVr3a4T9G",
              "appType": [
                "crm"
              ],
              "appName": "Freshsales Suite",
              "iconUrl": "https://d1myhw8pp24x4f.cloudfront.net/software_logo/1628326810_Logo_mid.png",
              "description": "Freshsales App to manage Leads",
              "isBeta": false,
              "eventId": "new-contact-trigger",
              "eventName": "New Contact Added",
              "eventSource": "schedule",
              "isSearchAction": false,
              "account": {
                "accountId": "g2fW95fSVx",
                "accountName": "sandy"
              },
              "fieldsConfigured": false,
              "skipOnFailure": false,
              "testEvent": {
                "outputSchema": [],
                "status": "idle"
              },
              "id": "1"
            },
            {
              "s_id": "pMazKO1AzY",
              "type": "action",
              "hasConfigured": false,
              "dynamicMapping": {},
              "mapping": {},
              "mapping_meta": {},
              "dynamicMapping_meta": {},
              "canDraft": false,
              "stepName": "",
              "parentNode": "0",
              "throwConfigError": false,
              "currentTab": "configure",
              "rule": {},
              "parse": {},
              "position": 2,
              "code": {},
              "repeater": {},
              "id": "3"
            }
          ]
        },
        "name": "Freshservice user update sync",
        "status": "inactive",
        "tenantId": "116868507383358899857",
        "version": "v1",
        "createdBy": "santhosh D",
        "updatedBy": "santhosh D",
        "folderId": "qKSumCTZkH",
        "subTenantId": false,
        "connections": [
          "g2fW95fSVx"
        ],
        "connectedApps": [
          "AMVr3a4T9G"
        ],
        "id": "NjSt9wBY3I",
        "dtCreated": "2025-03-03T15:04:29.358Z",
        "dtUpdated": "2025-03-03T15:04:29.358Z"
      }
    ],
    "totalItems": 0,
    "pageNumber": 1
   },
  "status": 200
}

function extractOption(options){
  return {
    appId: options.appId,
    connectorTypeId: options.connectorTypeId,
    connectionName: options.connectionName,
    fields: options.fields
  }
}

function setHeader(options){
  const headers = {
    "Authorization": `Bearer ${options.token}`,
    "Content-Type": "application/json"
  }
  return headers
}

exports = {

  authConnection: async function(options){
    try {
      const url = `${base_url}/api/internal/connections/${options.appId}/authenticate`;
      // console.log("url",url)
      const body = extractOption(options);
      const response = await axios.post(url, body, {
        headers: setHeader(options)
      });
      // console.log("options", setHeader(options));
      // console.log("auth response => ", response.data.data);
      console.log("------------------------------------------")
      if(response.data){
        renderData(null, {data:response.data});
      }
    } catch (error) {
      console.log("failed to authenticate connection", error);
      renderData("Authentication failed");
    }
  },

  createConnection: async function(options){ // // options
    try {
      console.log("options from create conn");
      const url = `${base_url}/api/internal/connections`;
      const body = extractOption(options);
      const response = await axios.post(url, {...body, status:"success"},  {
        headers: setHeader(options)
      });
      if(response.data.status === 200){
        console.log("res__", response.data)
        renderData(null, {isConnectionCreated:true,id:response.data.data.id});
      }
    } catch (error) {
      console.log("failed to create connection", error);
      renderData("failed to create connection");
    }
  },

  saveConnection: async function(){ // options
    try {
      // const url = `${base_url}/connections`;
      // const response = await axios.post(url, options);
      // const result = response;
      // renderData(null, {data:result.data});
      renderData(null, {data:true});
    } catch (error) {
      console.log("failed to save connection", error);
      renderData(error.data);
    }
  },

  editConnection: async function(options){ // options
    try {
      console.log("options", options);
      const connection_id = options.isApp1 ? options.iparams.app1_connection_id : options.iparams.app2_connection_id;
      const url = `${base_url}/api/internal/connections/${connection_id}`
      const body = extractOption(options);
      const response = await axios.put(url, {...body, status:"success"},  {
        headers: setHeader(options)
      });
      if(response.data){
        renderData(null, {isConnectionCreated:true});
      }
    } catch (error) {
      console.log("failed to save connection", error);
      renderData(error.data);
    }
  },

  onAppInstallCallback: async function(payload){
    // todo: onAppInstall get the iparams from payload and store the token and tenant in db
    try {
      console.log("on app install payload", payload);
      // const db_key = "iparams";
      // const data = JSON.stringify({
      //   email: payload.iparams.email,
      //   password: payload.iparams.password,
      //   id: payload.iparams.id,
      //   tenant_id: payload.iparams.tenant_id,
      //   app1_name: payload.iparams.app1_name,
      //   app2_name: payload.iparams.app2_name,
      //   access_token: payload.iparams.access_token,
      //   app1_domain: payload.iparams.app1_domain,
      //   app1_apikey: payload.iparams.app1_apikey,
      //   app1_connection_name: payload.iparams.app1_connection_name,
      //   app2_domain: payload.iparams.app2_domain,
      //   app2_apikey: payload.iparams.app2_apikey,
      //   app2_connection_name: payload.iparams.app2_connection_name,
      // });
      // storeInDb(db_key,data);
      // const url = `${base_url}/folders`;
      // const request_body = {"name": folder_name};
      // const response = await axios.post(url, request_body);
      // console.log('response from folder creation', response.data);
      // const token = payload.iparams.access_token;
      // const tenant_id = payload.iparams.tenant_id
      // const user = {
      //   token,
      //   tenant_id
      // }
      // $db.set( "user", { "id": JSON.stringify(user) })
      // .then((data) => {
      //   console.log("user data saved to db", data)
      // }, (error) => {
      //   console.log("error occured while saving user data to db", error)
      // })
      renderData(null, {data:true});
    } catch (error) {
      console.log("failed to create a folder", error);
    }
  },

  sampleSmi: async function(){ // options
    try {
      // const payload = JSON.stringify({...options,isSuccess:true});
      // console.log('options from smi', payload);
      // throw new Error(":)")
      // renderData(null, payload);
      // console.log("data sent to fe")
      renderData(null, {data:true});
    } catch (error) {
      renderData({status:400, message:"error in smi test function"});
      console.error("error in smi test function", error);
    }
  },

  listKonnectors: async function(options){ // options
    try {
      console.log("list connectors called",options)
      // const url = `${base_url}/konnectors?pageNumber=1&pageSize=10`;
      // const response = await axios.get(url, options);
      // const result = response;
      // console.log('response for list konnectors', result);
      renderData(null, {data:list.data.items});
      // renderData(null, {data:true});
    } catch (error) {
      console.error("error in list Konnector function", error);
      renderData({status:400, message:"error in list Konnector function"});
    }
  },

  activateKonnector: async function(options){ // options
    try {
      console.log("activate kon", options)
      // const konnector_id = options.konnector_id;
      // const url = `${base_url}/konnectors/${konnector_id}/activate`;
      // const response = await axios.post(url, options);
      // console.log('response for activating konnector', response);
      // renderData(null, {data:result.data});
      renderData(null, {data:true, message:"konnector activated"});
    } catch (error) {
      renderData({status:400, message:"error in activating konnector"});
      console.error("error in activating konnector", error);
    }
  },

  deactivateKonnector: async function(options){ // options
    try {
      console.log("deactivate kon", options)
      // const konnector_id = options.konnector_id;
      // const url = `${base_url}/konnectors/${konnector_id}/deactivate`;
      // const response = await axios.post(url, options);
      // console.log('response for deactivating konnector', response);
      // renderData(null, {data:result.data});
      renderData(null, {data:true, message:"konnector deactivated"});
    } catch (error) {
      renderData({status:400, message:"error in deactivating konnector"});
      console.error("error in deactivating konnector", error);
    }
  },

  connectFreshservice: async function(options){
    try {
      const response = await axios.get(options.url, options.headers);
      console.log('response for freshservice', response);
    
    } catch (error) {
      renderData({status:400, message:"error in connecting freshservice"});
      console.error("error in connecting freshservice", error);
    }
  },

  connectFreshdesk: async function(){ // options
    try {
      console.log("error in connecting freshservice", error);
    } catch (error) {
      renderData({status:400, message:"error in connecting freshdesk"});
      console.error("error in connecting freshdesk", error);
    }
  },

  getMyBillings: async function(options){
    try {
      console.log("billings",options);
      const headers = {
        Authorization: `Bearer ${options.iparams.access_token}`
      }
      const bill = await axios.get(`${base_url}/api/internal/user/billing`, {headers});
      const data = {
        billings:bill.data.data.billing,
        usage:bill.data.data.usage,
        userId:bill.data.data.userId,
        name:options.iparams.name
      }
      console.log("data", data)
      renderData(null, {data:data});
    } catch (error) {
      renderData({status:400, message:"error in fetching billings data"});
      console.error("error in fetching billings data", error);
    }
  }

};

function storeInDb(key,value){
  console.log("value for db", value);
  $db.set(key,value).then (
    function(data) {
      console.log("iparams stored in db",data);
    },
    function(error) {
      console.log("error in storing data", error);
  });
}
