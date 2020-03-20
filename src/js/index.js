function chat(ID){
  let user = firebase.auth().currentUser;
  if (user) {
    createChatroom(user.uid, ID);
  }else{
    alert("You need to login first");
  }
}
function createChatroom(id1, id2){
  if (id2.localeCompare(id1) < 0){
    let chatId = id2 + id1;
     let mesRef = firebase.database().ref('Messages/' + chatId);
     mesRef.update({
       user1: id1,
       user2: id2
     });
    createPanel(chatId);
  } else {
    let chatId = id1 + id2;
     let mesRef = firebase.database().ref('Messages/' + chatId);
     mesRef.update({
      user1: id1,
      user2: id2
     });
    createPanel(chatId);
  }
}
function createPanel(chatId){
  let content = document.getElementById('content');
  let mes = document.getElementById('mes');
  let input = createInput(chatId);
  mes.innerHTML = "";
  content.appendChild(input);
  let mesRef = firebase.database().ref('Messages/' + chatId + '/mes');
  mesRef.off();
  mesRef.on('child_added', function(snapshot){
    loadHistory(snapshot.val());
    mes.scrollTop = mes.scrollHeight;
  })
}
function loadHistory(json){
  let user = firebase.auth().currentUser;
  let container = document.getElementById('mes');
  let message = document.createElement('div');
  let sender = document.createElement('div');
  sender.style.fontSize = '10px';
  let content = document.createElement('div');
  content.innerText = json.content;
  if (user.email == json.sender) {
    message.classList = "sender";
    sender.innerText = json.sender + ' / ' + moment(json.timestamp).format('HH:mm');
  }else{
    message.classList = "receiver";
    sender.innerText = json.sender + ' / ' + moment(json.timestamp).format('HH:mm');
  }
  message.appendChild(sender);
  message.appendChild(content);
  container.appendChild(message);
}
function createInput(chatId){
  let oldBar = document.getElementById('inputBar');
  let bar = document.createElement('div');
  bar.id = "inputBar";
  let input = document.createElement('input');
  input.type = "text";
  input.id = "inputText";
  input.placeholder = "Message";
  let btn = document.createElement('input');
  btn.type = "image";
  btn.src = "./src/assets/send.svg";
  btn.id = "sendBtn";
  btn.onclick = () => {
    send(chatId);
  };
  if (oldBar == null) {
    bar.appendChild(input);
    bar.appendChild(btn);
    return bar;
  } else {
    let sendBtn = document.getElementById('sendBtn');
    let inputText = document.getElementById('inputText');
    oldBar.removeChild(inputText);
    oldBar.removeChild(sendBtn);
    oldBar.appendChild(input);
    oldBar.appendChild(btn);
    return oldBar;
  }
}
function send(chatId){
  let mesRef = firebase.database().ref('Messages/' + chatId + '/mes');
  let user = firebase.auth().currentUser;
  let input = document.getElementById("inputText");
  let container = document.getElementById('mes');
  if (input.value != "") {
    mesRef.push().set({
      sender: user.email,
      content: input.value
    }).then(function () {
      input.value = '';
      container.scrollTop = container.scrollHeight;
    }).catch(function (error) {
      console.log(error);
    })
  }
}
function searchId(){
  let user = firebase.auth().currentUser;
  let id = document.getElementById('search');
  let userRef = firebase.database().ref('Users');
  let receiverID = null;
  if(user){
    if (id.value == "lobby") {
      createPanel(id.value);
    } else {
      userRef.once('value').then(function (snapshot) {
        let list = snapshot.val();
        for (const key in list) {
          if (id.value === list[key].email) receiverID = key;
        }
        if (receiverID == null) {
          alert('User not found');
        } else {
          chat(receiverID);
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }else{
    alert('You need to sign in first');
  }
  return false;
}
function init() {
  firebase.auth().onAuthStateChanged(function (user) {
    // Check user login
    let account = document.getElementsByClassName("nav-link")[0];
    let logBtn = document.getElementsByClassName("nav-link")[1];
    if (user) {
      listner();
      account.innerHTML = user.email;
      logBtn.innerHTML = 'Logout';
      logBtn.addEventListener('click', function () {
        firebase.auth().signOut().then(function (res) {
          document.location.href = "./index.html";
          console.log(res);
        }).catch(function (error) {
          console.log(error);
        })
      })
    } else {
      account.innerHTML = 'Account';
      account.addEventListener('click', function () {
        document.location.href = './signIn.html';
      })
      logBtn.innerHTML = 'Login';
      logBtn.addEventListener('click', function(){
        document.location.href = './signIn.html';
      })
    }
  });
}
function listner(){
  let user = firebase.auth().currentUser;
  let chatId = ["lobby"];
  if(window.Notification){
    let userRef = firebase.database().ref('/Users');
    userRef.once('value').then(function(snapshot){
      let list = snapshot.val();
      for (const key in list) {
        if(key !== user.uid){
          if (key.localeCompare(user.uid) < 0) chatId.push(key + user.uid);
          else chatId.push(user.uid + key);
        }
      }
      chatId.forEach(element => {
        let mesRef = firebase.database().ref('Messages/' + element + '/mes');
        mesRef.off();
        mesRef.orderByKey().limitToLast(1).on('child_added', function (data) {
          if(data.val().sender != user.email) notify(data.val());
        })
      });
    })  
  }
}
function notify(json){
  let notification = new Notification(json.sender, {
    body: json.content
  });
  notification.onclick = () => notification.close();
}
window.onload = function () {
  init();
  Notification.requestPermission()
};