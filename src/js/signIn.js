
function forgetPassword(){ 
  let email = document.getElementById('email');
  firebase.auth().sendPasswordResetEmail(email.value).then(function () {
    console.log("email sent");
    email.value = "";
  }).catch(function (error) {
    console.log(error);
  });
}

function initApp() {
  // Login with Email/Password
  var txtEmail = document.getElementById('UserEmail');
  var txtPassword = document.getElementById('UserPassword');
  var btnLogin = document.getElementById('btnLogin');
  var btnGoogle = document.getElementById('btngoogle');
  var btnSignUp = document.getElementById('btnSignUp');
  var provider = new firebase.auth.GoogleAuthProvider();
  
  btnLogin.addEventListener('click', function () {
    firebase.auth().signInWithEmailAndPassword(txtEmail.value, txtPassword.value).then(function (res) {
      let userList = firebase.database().ref('Users/' + res.user.uid);
      userList.set({
        email : res.user.email
      }).then(function(){
        window.location.href = "./index.html"
        create_alert('success', res.operationType);
        txtEmail.value = '';
        txtPassword.value = '';
      }).catch(function(err){
        console.log(err);
      });
    }).catch(function (error) {
      console.log(error);
      create_alert('error', error.message);
    })
  });

  btnGoogle.addEventListener('click', function () {
    firebase.auth().signInWithPopup(provider).then(function (res) {
      console.log(res);
      let userList = firebase.database().ref('Users/' + res.user.uid);
      userList.set({
        email: res.user.email
      }).then(function(){
        document.location.href = "./index.html";
        create_alert('success', '');
      }).catch(function(err){
        console.log(err);
      });
    }).catch(function (error) {
      console.log(error);
      create_alert('error', error.message)
    });
  });

  btnSignUp.addEventListener('click', function () {
    firebase.auth().createUserWithEmailAndPassword(txtEmail.value, txtPassword.value).then(function (res) {
      console.log(res);
      create_alert('success', '');
    }).catch(function (error) {
      console.log(error);
      create_alert('error', error.message);
    });

  });
}

// Custom alert
function create_alert(type, message) {
  var alertarea = document.getElementById('custom-alert');
  if (type == "success") {
    str_html = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Success! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
    alertarea.innerHTML = str_html;
  } else if (type == "error") {
    str_html = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Error! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
    alertarea.innerHTML = str_html;
  }
}

window.onload = function () {
  initApp();
};