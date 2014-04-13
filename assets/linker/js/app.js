/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */


(function (io) {

  // as soon as this file is loaded, connect automatically,
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    // Listen for Comet messages from Sails
    socket.on('message', cometMessageReceivedFromServer);

    // Subscribe to the user model class room and instance room
    socket.get('/user/subscribe');

    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' +
        'e.g. to send a GET request to Sails, try \n' +
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////


  });


  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }


})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);


function cometMessageReceivedFromServer(message){

  console.log("Here's the message: ", message);

  // If it's a user model message
  if (message.model === 'user'){
    var userId = message.id;
    updateUserInDom(userId, message);

    if (message.verb !== "destroy"){
      displayFlashActivity(message);
    }
  }
}

function displayFlashActivity(message){
  $('#chatAudio')[0].play();
  $('.navbar').after("<div class='alert alert-success'>"
                      + message.data.name + " " + message.data.action
                    + "</div>");
  $('.alert').fadeOut(5000);
}

function updateUserInDom(userId, message){

  // What page am I on?
  var page = document.location.pathname;

  // strip trailing slash if we've got one
  page = page.replace(/(\/)$/, '');

  // Route to the appropriate user update handler based on which page you're on
  switch (page){
    // user admin page
    case '/user':

      if (message.verb === 'update'){
        UserIndexPage.updateUser(userId, message);
      }

      if (message.verb === 'create'){
        UserIndexPage.addUser(message);
      }

      if (message.verb === 'destroy'){
        UserIndexPage.destroyUser(userId);
      }
      break;
    default:
      break;
  }
}

var UserIndexPage = {

  updateUser: function(id, message){
    var $userRow = $('tr[data-id="' + id + '"] td img').first();
    if (message.data.loggedIn){
      $userRow.attr('src', "/images/icon-online.png");
    } else {
      $userRow.attr('src', "/images/icon-offline.png");
    }
  },

  addUser: function(user){

    var obj = {
      user: user.data,
      _csrf: window.baremarket.csrf || ''
    };

    $('tr:last').after(

      // This is the path to the templates file
      JST['assets/linker/templates/addUser.ejs']( obj )
    );
  },

  destroyUser: function(id){
    $('tr[data-id="' + id + '"]').remove();
  }
}
