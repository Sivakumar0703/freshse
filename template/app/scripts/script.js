const toast = document.getElementById("toaster");

  document.addEventListener("DOMContentLoaded", async function () {
    app
      .initialized()
      .then(function (_client) {
        console.log("_client",_client)
        window.client = _client;
        window.client.events.on('app.activated', onAppActivated);
      })
      .catch(function (err) {
        console.error("error in app initialization", err);
      });
  });

  // render table and get iparams value
  async function onAppActivated(){
    try {
      const tabs = document.getElementById("tabs-container");
      console.log("tabs", tabs);
      tabs.addEventListener("fwChange", (event) => {
        console.log("tab switched",event)
        if(event.detail.tabIndex === 0){
          bindEvents();
          return
        } else if(event.detail.tabIndex === 2){
          showBillings();
          return
        }
      })
      // appIparams = await client.iparams.get("app1_name");
      bindEvents();
    } catch (error) {
      toast.trigger({type:"error", content:"cannot get iparams"});
      console.log("error in on app activated");
    }
  }
  
  
  // for error handling + toast notification
  function handleErr(err = 'None') {
    console.log(`Error occured. Details:`, err);
    let message;
    try {
      message = err.message ? JSON.parse(err.message).error : JSON.parse(err.response).message;
      if (!message) throw err;
    } catch (error) {
      console.error(error);
      message = 'Something went wrong. Please try again.';
    }
    document.querySelector('#toaster').trigger({
      type: 'error',
      content: message,
      position: 'top-center'
    });
  }
  
  
  function bindEvents() {
    console.log("turning off the spinner")
  
        const $tableContainer = jQuery('#list-table-container');
        if ($tableContainer.hasClass('visited')) return; // adding visited class to table container
        $tableContainer.addClass('visited');
        jQuery('#spinner-loader').removeClass('hide'); // removing spinner
        console.log('before invoke');
        client.request.invoke("listKonnectors", {method:"listKonnectors"}).then(
          function (data) {
            
            let recipeList = [];
            console.log("data from smi",data)
            recipeList = data.response.data;
            if (recipeList && recipeList.length) {
              const recipeIds = recipeList.map(function (recipe) { return recipe.id });// get receipe id
  
              // save recipe to stop while app uninstall
              client.db.set('recipeIds', { 'recipe_ids': recipeIds });
              jQuery('#tenant-list-body').empty(); // table body emptied
              recipeList.forEach(function (konnector, i) { // adding draft konnectors to table body
                jQuery('#tenant-list-body').append(`<tr>
                    <td>${konnector.name}</td>
                    <td>${konnector.description !== undefined ? konnector.description : "  -"}</td>
                    <td class="action-btns">
                      <fw-button color="secondary" class="preview-recipe show-iframe" data-type="view" data-id="${konnector.id}" data-name="${konnector.name}"> Preview </fw-button>
                      <fw-button color="primary" class="start-recipe" data-id="${konnector.id}" data-name="${konnector.name}" data-index="${i}" data-key="start"> Start </fw-button>
                      <fw-button color="primary" class="stop-recipe hide" data-id="${konnector.id}" data-name="${konnector.name}" data-index="${i}" data-key="stop"> Stop </fw-button>
                      <fw-kebab-menu id="standard-kebab-menu-${i}"></fw-kebab-menu>
                    </td>
                  </tr>`);
                setKebabMenu(i, konnector);
              });
              jQuery('#list-table-container, #konnector-table-info').removeClass('hide');
              jQuery('#spinner-loader').addClass('hide');
            } else {
              jQuery('#no-workflows').removeClass('hide').siblings('.sibling-container').addClass('hide');
            }
  
          },
          function (error) {
            console.log("------------------2")
            handleErr(error);
            if ([401, 403].includes(error.status)) {
              jQuery('#no-permission').removeClass('hide').siblings().addClass('hide');
            }
        })
        
        // onclick event added to start/stop button
        jQuery(document).on('click.Dayforce', '.start-recipe, .stop-recipe', function (e) {
      const btnData = e.target.dataset;
      console.log("event", e.target);
      console.log("__button", btnData);
      const showStartOrStop = btnData.key === 'start' ? 'stop' : 'start';
      // const requestData = jQuery.extend({}, appIparams, { id: btnData.id }); // creating new obj contain all the appIparams (key,value) + id:btnData.id => similar to formdata
      const $targerBtn = jQuery(e.target); // e.target => contain clicked button html
      $targerBtn.attr('disabled', 'disabled');
      const activateOrDeactivate = btnData.key === 'start' ? "activateKonnector" : "deactivateKonnector" ;
      const options = {operation:activateOrDeactivate, konnector_id:btnData.id}; // todo: add iparams 
      client.request.invoke(activateOrDeactivate, options).then(
        function () {
          handleRecipesStateChange($targerBtn, showStartOrStop, btnData);
        },
        function (error) {
          // Workato takes more than 8s, but freshworks marketplace app timeout in 5s. so, validating the state after freshworks marketplace app timeout.
          if ([408, 502, 504].includes(error.status)) {
            setTimeout(handleTimoutCase($targerBtn, showStartOrStop, btnData), 5000);
          } else {
            $targerBtn.removeAttr('disabled');
            handleErr(error);
          }
        }
      );
    });

    // to show preview iframe - button click on preview button
    jQuery(document).on('click.Dayforce', '.show-iframe', function (e) {
      handleTenantCrud(jQuery(e.target).data());
    });
  }
  
  function setKebabMenu(i, recipe) {
    const standardDataSource = [
      {
        value: {
          type: 'edit',
          id: recipe.id,
          name: recipe.name
        },
        text: 'Edit',
      }
    ];
    const standardVariant = jQuery('#standard-kebab-menu-' + i);
    standardVariant[0].options = standardDataSource;
    standardVariant.off('fwSelect.Dayforce').on('fwSelect.Dayforce', function (e) {
      handleTenantCrud(e.detail.value);
    });
  }
  
  function handleTenantCrud(data) { // on click of edit option in kebab this fn triggered
    const $tenant = jQuery('#tenant-' + data.type);  // data.type = edit
    $tenant.find('.recipe-name').text(data.name); // konnector title
    switch (data.type) {
      case 'view':
        // <button id="edit-tenant-btn" data-id="42" data-type="edit"></button>
        $tenant.removeClass('hide').find('#edit-tenant-btn').data({ id: data.id, type: 'edit' });
        jQuery('#list-table-container, #konnector-table-info').addClass('hide');
        break;
      case 'edit':
        jQuery('#tenant-view, #list-table-container, #konnector-table-info').addClass('hide');
        $tenant.removeClass('hide');
        break;
    }
    fetchToken(data);
  }
  
  // when edit option clicked then edit iframe is opened
  // here we set src to the iframe
  function fetchToken(data) { 
    const $appIframe = jQuery('#' + data.type + '-iframe');
    $appIframe.attr('src', '');
     /* 
    client.request.invoke('getJwtToken', appIparams).then(
      function (resData) {
        const response = JSON.parse(resData.response.response);
        switch (data.type) {
          case 'view':
            $appIframe.attr('src', `${appIparams.base_url}direct_link?workato_dl_path=%2Frecipes%2F${data.id}%23recipe&workato_dl_token=${response.token}`);
            break;
          case 'edit':
            $appIframe.attr('src', `${appIparams.base_url}direct_link?workato_dl_path=%2Frecipes%2F${data.id}%2Fedit&workato_dl_token=${response.token}`);
            break;
          case 'log':
            $appIframe.attr('src', `${appIparams.base_url}direct_link?workato_dl_path=%2Frecipes%2F${data.id}%23jobs&workato_dl_token=${response.token}`);
            break;
          case 'dashboard':
            $appIframe.attr('src', `${appIparams.base_url}direct_link?workato_dl_path=%2Fdashboard%2Fmain&workato_dl_token=${response.token}&folder_id=${appIparams.folder_id}`);
            jQuery('#dashboard-loader').addClass('hide');
            break;
        }
      },
      function (error) {
        console.log("__need token - freshToken")
        handleErr(error);
      }
  
    ); 
     */
    console.log("fetch token success")
  }
  
  
  // back button
  function backToTable(type) {
    jQuery('#tenant-' + type + ', #list-table-container, #konnector-table-info').toggleClass('hide');
  }
  
  function handleRecipesStateChange($targerBtn, showStartOrStop, btnData) {
    $targerBtn
      .addClass('hide')
      .siblings('.' + showStartOrStop + '-recipe')
      .removeClass('hide')
      .removeAttr('disabled');
      setKebabMenu(btnData.index, btnData, btnData.key === 'start');
    document.querySelector('#toaster').trigger({
      type: 'success',
      content: 'Konnector updated successfully.',
      position: 'top-center'
    });
  }
  
  function handleTimoutCase($targerBtn, showStartOrStop, btnData) {
    let recipeList = list.data.items;
    recipeList = JSON.parse(data.response.response);
    // const recipeData = 
    recipeList.find(function (recipe) { return btnData.id === recipe.id; });
    if ((showStartOrStop === 'start') || (showStartOrStop === 'stop')) {
      handleRecipesStateChange($targerBtn, showStartOrStop, btnData);
    } else {
      $targerBtn.removeAttr('disabled');
      handleErr();
    }
  }

  function calculatePercentage(used, total) {
    if (total === 0) {
      return 0; 
    }
    const percentage = (used / total) * 100;
    return percentage.toFixed(1); 
  }
  
  function showBillings(){
    const div = document.getElementsByClassName("semi-donut")[0];
    const task_consumed = document.getElementById("task-consumed");
    const task_remaining = document.getElementById("task-remaining");
    const subscription_id = document.getElementById("subscription-id");
    const plan_name = document.getElementById("plan-name");
    const bill_cycle = document.getElementById("bill-cycle-timeperiod");
    const username = document.getElementById("user-name");

    client.request.invoke("getMyBillings", {}).then(
      function(data){
        console.log("gauge meter", div, data)
        const response = data.response;
        const billing = response.data.billings
        const usage_detail = response.data.usage
        console.log("data from get billing smi", billing,usage_detail);
        const percentage = calculatePercentage(usage_detail.taskExecutedCount, usage_detail.tasksLimit)
        div.innerText = `${usage_detail.taskExecutedCount}/${usage_detail.tasksLimit}`
        div.style.setProperty("--percentage",percentage);
        task_consumed.innerText = `Total Consumed ${percentage}%`
        task_remaining.innerText = `Total Remaining ${(100 - percentage).toFixed(1)}%`;
        subscription_id.innerText = billing.subscriptionId;
        plan_name.innerText = billing.plan;
        bill_cycle.innerText = billing.cycle;
        username.innerText = data.response.data.name;
      }, function(error){
        console.log("error in getting billings", error);
      }
    )
  }
  
  
  
  
  
  
  
  
  
  