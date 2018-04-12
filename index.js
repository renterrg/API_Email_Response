(function(){
  'use strict';
  var applicantID = "9ccadaee-8932-4e9e-932c-ea733787a98b";
  var applicationAPI = 'https://apply.bucketthechange.com/api/';
  
  function onFormSubmit(e) {
    e.preventDefault();

    var jsonData = $(e.target).serializeObject();
    console.info('onFormSubmit() | json:', jsonData);
    
    var jsonString = JSON.stringify(jsonData, null, ' ');
    console.info('onFormSubmit() | json string:', jsonString);

    jsonString = textToHTML(jsonString);
    console.info('onFormSubmit() | formatted json string:', jsonString);

    sendPostRequest(jsonString);
    sendGetRequest(jsonString);
  }

  function textToHTML(string) {
    // Convert special text characters to html entities.
    // This is done because the data will be used to populate 
    // and send an html email.
    string = string.replace(/\\r\\n/g, "<br/>");
    string = string.replace(/&/g, "&amp;");
    string = string.replace(/\\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");

    return string;
  }

  function sendPostRequest(jsonString) {
    // Send a POSt request with the submitted json data.
    $.ajax({
      type: "POST",
      url: applicationAPI + 'application/' + applicantID,
      dataType: 'json',
      data: jsonString,
      contentType : 'application/json',
      success: function(response) { 
        console.log(response)
      },
      error: (error) => {
        console.error(JSON.stringify(error));
      }
    });
  }

  function sendGetRequest(jsonString) {
    // Send a GET request with the submitted json data.
    $.ajax({
      type: "GET",
      url: applicationAPI + 'submitApplication/' + applicantID,
      success: function(response) { 
        console.log(response);
      },
      error: (error) => {
        console.error(JSON.stringify(error));
      }
    });
  }

  // Wait for jquery to initialize
  $(document).ready(function() {
    // Add listener for form submission.
    $('#myForm').on('submit', onFormSubmit);
  });
  
})();
