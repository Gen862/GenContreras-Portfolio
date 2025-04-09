
/**
 * Validate form
 */
function ValidateForm(){
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let subject = document.getElementById('subject').value;
  let message = document.getElementById('message').value;

  if(name == ""){
    alert("O nome é requerido");
    return false;
  }

  if(email == ""){
    alert("Seu email é requerido");
    return false;
  }else if (!email.includes("@")){
    alert("Email invalido.")
    return false;
  }

  if(subject == ""){
    alert("O assunto é requerido");
    return false;
  }
  if(message == ""){
    alert("A mensagem é requerida");
    return false;
  }

  return true;
}

/**
 * Show Data
 */
function ShowData(){
  let peopleList;

  if(localStorage.getItem("peopleList") == null){
    peopleList = [];
  }
  else{
    peopleList = JSON.parse(localStorage.getItem('peopleList'))
  }

  var html = "";
  
  peopleList.forEach(function(element,index){
  html += "<tr>";
  html += "<td>" + element.name + "</td>";
  html += "<td>" + element.email + "</td>";
  html += "<td>" + element.subject + "</td>";
  html += "<td>" + element.message + "</td>";
  html += '<td><button onclick= "deleteData('+index+')" class="btn btn-danger">Apagar</button><button onclick="updateData('+index+')" class="btn btn-light m-2">Editar</button></td>';
  html += "</tr>";
  });
  document.querySelector('#crudTable').innerHTML = html;
}

//Function to delete data
ShowData();

//Function to add data

function AddData(){
  //if form is validate
  if(ValidateForm() == true){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let subject = document.getElementById('subject').value;
    let message = document.getElementById('message').value;

    var peopleList;
    if(localStorage.getItem("peopleList") == null){
      peopleList = [];
    }else{
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.push({
      name : name,
      email : email,
      subject : subject,
      message : message,
    });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
      ShowData();
      document.getElementById('name').value = "";
      document.getElementById('email').value = "";
      document.getElementById('subject').value = "";
      document.getElementById('message').value = "";
  }
}
//Function to add delete data

function deleteData(index){
  let peopleList;

  if(localStorage.getItem("peopleList") == null){
    peopleList = [];
  }else{
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  ShowData();
}

//Function to update data
function updateData(index){
  document.getElementById('submit').style.display = "none";
  document.getElementById('update').style.display = "block";
  
  let peopleList;

  if(localStorage.getItem("peopleList") == null){
    peopleList = [];
  }else{
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  document.getElementById('name').value = peopleList[index].name;
  document.getElementById('email').value = peopleList[index].email;
  document.getElementById('subject').value = peopleList[index].subject;
  document.getElementById('message').value = peopleList[index].message;
  
  document.querySelector('#update').onclick = function(){
    if(ValidateForm() == true){
      peopleList[index].name = document.getElementById('name').value;
      peopleList[index].email = document.getElementById('email').value;
      peopleList[index].subject = document.getElementById('subject').value;
      peopleList[index].message = document.getElementById('message').value;

      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      ShowData();
      document.getElementById('name').value = "";
      document.getElementById('email').value = "";
      document.getElementById('subject').value = "";
      document.getElementById('message').value = "";

      document.getElementById('submit').style.display = "block";
      document.getElementById('update').style.display = "none";
    }
  };
}


/**
* PHP Email Form Validation - v3.9
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      if( response.ok ) {
        return response.text();
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.trim() == 'OK') {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
