document.addEventListener("DOMContentLoaded", function () {
  app
    .initialized()
    .then(function (_client) {
      window.client = _client;
      // window.app1_id = "C0fhc6g922";
      // window.app2_id = "C0fhc6g922"; // dynamic365-BMKr3a4T8GP
      window.user = {
        "access_token": _client.iparams?.access_token || "",
        "id": _client.iparams?.id || "",
        "tenant_id": _client.iparams?.tenant_id || "",
        "app1_connection_id": _client.iparams?.app1_connection_id || "",
        "app2_connection_id": _client.iparams?.app1_connection_id || "",
      };
    })
    .catch(function (err) {
      console.error("error in app initialization", err);
    });
});
function getAppsName(){
  // sending this to post config
  return {
    "app1_name":app1_name,
    "app2_name":app2_name
  } 
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// console.log("iparams", client.iparams)
// varibales declaration
const app1_id="";
const app2_id="";
let is_login_successful = false;
let tab2_field_container = document.getElementById("tab2-fields-container"); // the product we are integrating
let tab3_field_container = document.getElementById("tab3-fields-container");
// const service_provider = "freshservice.com";
const login_email = document.getElementById("login-email");
const login_password = document.getElementById("login-password");
const login_btn = document.getElementById("login-btn");
const signup_company = document.getElementById("signup-company");
const signup_phone = document.getElementById("signup-phone");
const signup_btn = document.getElementById("signup-btn");
const show_signup_page = document.getElementById("show-signup-page");
const signup_username = document.getElementById("signup-username");
const signup_password = document.getElementById("signup-password");
const signup_email = document.getElementById("signup-email");
const signup_page = document.getElementById("signup-page");
const settings_page = document.getElementById("settings-page");
// const goto_signup = document.getElementById("show-signup-page");
const go_back_btn = document.getElementById("back-btn");
const toast = document.getElementById("toast-msg");
const tab2 = document.getElementById("tab-2");
const tab3 = document.getElementById("tab-3");
const tab2_validation_btn = document.getElementById("tab2-validate-btn");
const tab3_validation_btn = document.getElementById("tab3-validate-btn");
const login_password_icon = document.getElementById("login-password-icon");
const signup_password_icon = document.getElementById("signup-password-icon");
const settings_tab = document.getElementById("settings-tab");
// let user = {
//   "access_token": client.iparams.access_token || "",
//   "id": client.iparams.id || "",
//   "tenant_id": client.iparams.tenant_id || ""
// };
const base_url = "";
console.log("__base url__", base_url)
// let tab2_connector_type_id = "app-freshservice";
// let tab3_connector_type_id = "app-ukg";
let app1_connector_type_id;
let app2_connector_type_id;
// const app1_id = "C0fhc6g922";
// const app2_id = "C0fhc6g922"; // dynamic365-BMKr3a4T8GP
const app1_name = "";
const app2_name = "";
const tab2_container = document.getElementById("tab2-container");
const tab3_container = document.getElementById("tab3-container");
const tab2_spinner = document.getElementById("tab2-spinner");
const tab3_spinner = document.getElementById("tab3-spinner");
const controlFieldGeneration = false;
// const isCalledFromEditConfig = false;
const validation = {
  "login": false,
  "app1": false,
  "app2": false
};
let user_fullname = "";
console.log("sign up", show_signup_page);

// adding event listeners
login_btn.addEventListener("click", login);
login_email.addEventListener("fwInput", () => (login_email.state = "normal"));
login_password.addEventListener(
  "fwInput",
  () => (login_password.state = "normal")
);
// signup_phone.addEventListener("fwInput", () => {
//   signup_phone.errorText = "";
//   signup_phone.state = "normal";
// });
// signup_username.addEventListener(
//   "fwInput",
//   () => (signup_username.state = "normal")
// );
signup_password.addEventListener(
  "fwInput",
  () => (signup_password.state = "normal")
);
signup_company.addEventListener(
  "fwInput",
  () => (signup_company.state = "normal")
);
signup_phone.addEventListener("fwInput", () => (signup_phone.state = "normal"));
signup_email.addEventListener("fwInput", () => (signup_email.state = "normal"));
signup_btn.addEventListener("click", signup);
show_signup_page.addEventListener("click", () => (togglePage(true)));
go_back_btn.addEventListener("click", () => togglePage(false));
tab2_validation_btn.addEventListener("click", () =>
  validateCredentials(app1_name)
);
tab3_validation_btn.addEventListener("click", () => validateCredentials(app2_name));
login_password_icon.addEventListener("click", () =>
  tooglePasswordVisiblity(login_password, login_password_icon)
);
signup_password_icon.addEventListener("click", () =>
  tooglePasswordVisiblity(signup_password, signup_password_icon)
);

function getUserName(){
  return user_fullname
}

function tooglePasswordVisiblity(inputElement, icon) {
  const input_type = inputElement.type;
  console.log("input type", input_type);
  if (input_type === "password") {
    inputElement.type = "text";
    icon.name = "visible";
  } else {
    inputElement.type = "password";
    icon.name = "hidden";
  }
}

// to toggle between login and signup page
function togglePage(showLogin) {
  console.log("show login page", showLogin);
  settings_page.style.display = showLogin ? "none" : "block";
  signup_page.style.display = showLogin ? "block" : "none";
}

// to validate login credentials
async function login() {
  const editConfigFromIparams = "isEditConfigOpened";

  try {
    console.log("login init");
    const signup_page_link = document.getElementById("signup-link-container");
  // if email field is empty
  if(!login_email.value){
    login_email.state = "warning";
    login_email.setFocus();
    return
  }
  
  // if password field is empty
    if(!login_password.value){
      login_password.state = "warning";
      login_password.setFocus();
      return
    }
    login_btn.loading = true;
    const body = {
      email: trimTheString(login_email),
      password: trimTheString(login_password)
    };
    const login = await client.request.invokeTemplate(
        "login",
        {
          context: {
            base_url: base_url,
          },
          body: JSON.stringify(body)
        });
        const isEditConfigurationOpened = await getValueFromIparams(editConfigFromIparams);
        if(!isEditConfigurationOpened && login.status === 200){
          login_btn.disabled = true;
        } 
        console.log("//////////////////////////", login);
        if(login.status === 200) {
            const login_response = JSON.parse(login.response);
            user.access_token = login_response.access_token;
            user.tenant_id = login_response.tenantId;
            user.id = login_response.id;
            toast.trigger({type:'success', content: "Login Successful"});
            login_btn.loading = false;
            login_btn.innerText = "Logged In";
            tab2.disabled = false;
            tab2_field_container.innerHTML = '';
            validation.login = true;
            signup_page_link.style.display = "none"; // to hide the signup-page link
            user_fullname = login_response.name.toUpperCase() + " " + login_response.lastName.toUpperCase();
            console.log("response &&&& user ",user)
            await generateFields(app1_name); // todo: get app schema + dynamic field creation
            settings_tab.activeTabIndex = 1; // switching to next tab
        } 

/* 
  toast.trigger({ type: "success", content: "Login Successful" });
  login_btn.loading = false;
  // tab2.disabled = false;
  tab2_field_container.innerHTML = "";
  generateFields("base url", app1_name); // todo: get app schema + dynamic field creation
  settings_tab.activeTabIndex = 1; // switching to next tab
  // todo: store connector id
*/ 
  return true
  } catch (error) {
    toast.trigger({type:'error', content: "Invalid Credentials"}) 
    console.error("api error", error);
    login_btn.loading = false;
    login_btn.disabled = false;
  } 
}


function sendUserDataToPostConfig(){
  return user
}

function validate() {
  let is_valid = true;
  for(let key in validation){
    console.log("validation check", validation, key, validation[key]);
    if(!validation[key]){
      is_valid = false;
    }
  }
  return is_valid;
}

async function signup() {
  try {
    console.log("signup function called");
    const phone = trimTheString(signup_phone);
    const company = trimTheString(signup_company);
    const username = trimTheString(signup_username);
    const password = trimTheString(signup_password);
    const email = trimTheString(signup_email);
    const is_valid_email = isValidEmail(email);
    let is_valid = true;
    const signup_fields = [
      signup_username,
      signup_email,
      signup_password,
      signup_company,
      signup_phone,
    ];

    for (let i = 0; i < signup_fields.length; i++) {
      if (!signup_fields[i].value && signup_fields[i].label !== "Username" && signup_fields[i].label !== "Phone") { // neglecting the username field (non mandotary)
        signup_fields[i].state = "warning";
        signup_fields[i].setFocus();
        is_valid = false;
        return;
      }
    }

    // validate email
    if (!is_valid_email) {
      signup_email.state = "error";
      signup_email.setFocus();
      return;
    }

    const payload = {
      name:username,
      email,
      password,
      phoneNumber:phone,
      organisation:company,
    };
    // proceed further if all the fields contains value
    if (is_valid) {
      console.log("look for url", base_url,payload)
      const signup_request = await client.request.invokeTemplate("signup", {
        context: {
          host: "jailer.konnectify.io",
        },
        body: JSON.stringify(payload),
      });
      console.log("q",signup_request)
      const signup_response = JSON.parse(signup_request.response).data;
      console.log("a", signup_response)
      // console.log("signup", JSON.parse(signup_request.response).data);
      // look for token. If token is avilable then store the token in iparam
      if (signup_response.access_token) {
        const user_email = signup_response.email;
        access_token = signup_response.access_token;
        // after successful registeration auto login the user
        togglePage(false);
        login_email.value = email;
        login_password.value = password;
        login_btn.click();
      } else {
        toast.trigger({ type: "error", content: "Token is missing" });
        return;
      }
    }
  } catch (error) {
    console.log("error in signup", error);
    toast.trigger({ type: "error", content: "sorry, signup failed!" });
  }
}

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

function trimTheString(element) {
  return element?.value?.trim();
}

async function generateFields(appName) { // appId, appName
  // params - base_url, app-name(service/ukg)
  const tab2_error_container = document.getElementById("tab2-error-container");
  const tab3_error_container = document.getElementById("tab3-error-container");

  try {
    const appId = appName === app1_name ? app1_id : app2_id;
    console.log("generate fields triggered", base_url,"/","app_id = ",appId);
    console.log("token", user.access_token)
    let parent_container =
      appName === app1_name ? tab2_field_container : tab3_field_container;
    // making request call to get app schema 
    console.log('url',`https://${base_url}/api/internal/apps/${appId}`)
    const get_app_schema = await client.request.invokeTemplate("getAppSchema", {
        context: {
          "host": base_url,
          "app_id": appId,
          "token": user.access_token
        }
      });
    const fields =  JSON.parse(get_app_schema.response).data.connectionConfig.fields;
    // console.log("get a**", response.response.json())
    const connector_type_id = JSON.parse(get_app_schema.response).data.connectionConfig.connectorTypeId;
    console.log("get schema response",JSON.parse(get_app_schema.response), fields);
    appName === app1_name ? app1_connector_type_id = connector_type_id : app2_connector_type_id = connector_type_id;
    const tab_index = appName === app1_name ? 2 : 3;
    
    let fields_to_add = "";
    for (let i = 0; i < fields.length; i++) {
      const new_Element = createAppFields(fields[i], tab_index);
      // if no field is returned from createAppFields
      console.log("new element", new_Element);
      if (!new_Element) {
        toast.trigger({
          type: "error",
          content: "Error in creating app field*",
        });
        return;
      }
      fields_to_add = fields_to_add + new_Element;
    }
    console.log("created fields", fields_to_add);

    const connection_name = `
            <fw-input label="Connection Name" icon-left="link" hint-text="Enter your connection name"
            warning-text="Connection name field should not be empty" 
            placeholder="eg: connect-1" required clear-input id="tab${tab_index}-connection-name"> 
             </fw-input>
         <br>`;
    parent_container.innerHTML = fields_to_add + connection_name;
    console.log("*********", parent_container);
    // add event listener to toggle password visibility
    const api_password_icon = document.getElementById(`tab${tab_index}-password-icon`);
    api_password_icon.addEventListener("click", () =>{
        const tab_api_field = document.getElementById(`tab${tab_index}-api`);
        tooglePasswordVisiblity(tab_api_field, api_password_icon)
    });
    appName === app1_name ? tab2_spinner.classList.add('hide') : tab3_spinner.classList.add('hide');
    appName === app1_name ? tab2_container.classList.remove('hide') : tab3_container.classList.remove('hide');
    console.log("sweet end")
    return true
  } catch (error) {
    if(appName === app1_name){
      tab2_error_container.classList.remove("hide");
      tab2_spinner.classList.add("hide")
    } else if(appName === app2_name){
      tab3_error_container.classList.remove("hide");
      tab3_spinner.classList.add("hide")
    }
    console.log("error in creating app fields", error);
    toast.trigger({ type: "error", content: "Fetching app schema failed" });
  }
    
}

function  createAppFields(fieldData, tabIndex) {
  console.log("create field function", fieldData);
  let element = "";
  const field_type = fieldData.type.includes("|")
    ? fieldData.type.split("|")
    : fieldData.type;
  if (field_type[0].includes("textbox") || field_type[1].includes("textarea")) {
    element = `<fw-input label="${fieldData.name}" hint-text="${fieldData.required.message}" warn-text="${fieldData.pattern.message}"
        required="${fieldData.required.value}" clear-input  placeholder="${fieldData.placeholder}" type="text" id="tab${tabIndex}-url" > 
        </fw-input> <br>`; // id- fieldData.connectorTypeId/fieldData.name
    return element;
  } else if (field_type === "Password") {
    element = `<fw-input label="${fieldData.name}" hint-text="${fieldData.required.message}" 
        required="${fieldData.required.value}" clear-input  type="password" id="tab${tabIndex}-api" > 
          <fw-icon name="hidden" slot="input-suffix" id="tab${tabIndex}-password-icon" class="password-icon"></fw-icon>
        </fw-input> <br>`;
    return element;
  } else {
    return element;
  }
}

async function getValueFromIparams(key) {
  try {
    console.log('ip-',client.iparams,"__key__",key);
    if(!client)
    console.log("fetching data from iparam", await client.iparams.get(key))
    const value = await client.iparams.get(key);
    return value;
  } catch (error) {
    console.log("error in fetching iparams values", error);
  }
}

// to validate the service credentials
async function validateCredentials(app) {
  const validate_btn = app === app1_name ? tab2_validation_btn : tab3_validation_btn;
  const editConfigFromIparams = "isEditConfigOpened";
  try {
    console.log("*****app****",app)
    const isEditConfigurationOpened = await getValueFromIparams(editConfigFromIparams);
    console.log("tab-", settings_tab.activeTabIndex, " validation triggered");
    const app_id = app === app1_name ? app1_id : app2_id; // app_id is hard coded
    validate_btn.loading = true;
    const connector_type =
      app === app1_name ? app1_connector_type_id : app2_connector_type_id; // connectort_type is hard coded
    const container =
      app === app1_name ? tab2_field_container : tab3_field_container; // selecting tab
    const input_fields = container.querySelectorAll("fw-input");
    let field_values = []; // [url, api, connection-name]
    for (let i = 0; i < input_fields.length; i++) { // check for empty field submission
      input_fields[i].addEventListener(
        "fwInput",
        () => (input_fields[i].state = "normal")
      );
      if (input_fields[i].value) {
        field_values.push(input_fields[i].value);
      } else {
        input_fields[i].state = "warning";
        input_fields[i].setFocus();
        field_values = [];
        return;
      }
    }
    
    console.log("field", field_values);
    const isApp1 = app === app1_name ? true : false;
    const options = {
        appId: app_id,
      connectorTypeId: connector_type,
      connectionName: field_values[2],
      fields: [
        {
          name: "Base URL",
          value: field_values[0],
        },
        {
          name: "API Key",
          value: field_values[1],
        },
      ],
      token: user.access_token,
      isApp1: isApp1
    };
    console.log("option", options);
    console.log("app name", app);
    /*
    const operation_todo = await isFieldValueChanged(
      app,
      field_values[0],
      field_values[1],
      field_values[2]
    );
    console.log("opertion todo", operation_todo)
    if (operation_todo === "skip") {
      // field values are not changed so skip validation
      settings_tab.activeTabIndex = 2;
      toast.trigger({ type: "success", content: `${settings_tab.activeTabIndex === 1 ? app1_name : app2_name} connection saved` });
      return;
    } */
    // auth connection
    const auth_connection = await client.request.invoke("authConnection", options);
    // console.log("auth success",auth_connection)
    if(auth_connection.response.data.data){
      // after auth gets success. create/edit connection
      let create_or_edit;
      if(isEditConfigurationOpened?.isEditConfigOpened){
        create_or_edit = "editConnection";
      } else {
        create_or_edit = "createConnection";
      }
      const connect_app = await client.request.invoke(create_or_edit, options);
      console.log("conn*", connect_app);
      app === app1_name ? user.app1_connection_id = connect_app.response.id : user.app2_connection_id = connect_app.response.id;
      if(!connect_app.response.isConnectionCreated){
        toast.trigger({ type: "error", content: "Failed to save connection" });
        return
      }
    } else {
      validate_btn.loading = false;
      toast.trigger({ type: "error", content: "Authentication failed" });
      return
    }
    console.log("authConnection", auth_connection);
    /*
    // save connection
    const save_connection = await client.request.invoke(
      "saveConnection",
      options
    );
    const save_connection_response = await save_connection;
    console.log("response from save connection", save_connection_response);
    if (save_connection_response.status === 200) {
      toast.trigger({ type: "success", content: "Connection saved" });
    }
  */ 
    // create fields in tab3 for the very first time and during get config
    if (settings_tab.activeTabIndex === 1) {
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
      await generateFields(app2_name);
      toast.trigger({ type: "success", content: `${app1_name} connection saved`});
      tab3.disabled = false;
      settings_tab.activeTabIndex = 2;
    } else if(settings_tab.activeTabIndex === 2){
      toast.trigger({ type: "success", content: ` ${app2_name} connection save` });
    }
    if(app === app1_name){ // for post config
      validation.app1 = true;
    } else if(app === app2_name){
      validation.app2 = true;
    }
    // enable validate button during edit config
    if(!isEditConfigurationOpened){
      validate_btn.loading = false;
      validate_btn.disabled = true;
      validate_btn.innerText = "validated";
    } else {
      validate_btn.loading = false;
      validate_btn.innerText = "validated";
    }
    return true
  } catch (error) {
    validate_btn.loading = false;
    toast.trigger({
      type: "error",
      content: "Connection creation/saving failed",
    });
    console.log("client - error in connection creation/saving", error);
  }
}

// prev is non empty + prev vs current => edit
// prev is empty => create
// prev is non empty + prev=currrent => skip
async function isFieldValueChanged(appName, domain, apikey, connectionName) {
  // current value from parameter
  // previously configured values
  const previous_tab2_domain = await getValueFromIparams("tab2_domain");
  const previous_tab2_apikey = await getValueFromIparams("tab2_apikey");
  const previous_tab2_connection_name = await getValueFromIparams(
    "tab2_connection_name"
  );
  const previous_tab3_domain = await getValueFromIparams("tab3_domain");
  const previous_tab3_apikey = await getValueFromIparams("tab3_apikey");
  const previous_tab3_connection_name = await getValueFromIparams(
    "tab3_connection_name"
  );
  const tab2_field_values = [
    previous_tab2_domain,
    previous_tab2_apikey,
    previous_tab2_connection_name,
  ];
  const tab3_field_values = [
    previous_tab3_domain,
    previous_tab3_apikey,
    previous_tab3_connection_name,
  ];
  const fields =
    appName === app1_name ? tab2_field_values : tab3_field_values;
  console.log("val",fields)
  if (!fields[0] && !fields[1] && !fields[2]) {
    return "create";
  } else if (
    domain !== fields[0] ||
    apikey !== fields[1] ||
    connectionName !== fields[2]
  ) {
    return "edit";
  } else {
    return "skip";
  }
}

