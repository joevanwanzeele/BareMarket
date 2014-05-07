$(document).ready(function(){

  $.validator.setDefaults({
    highlight: function(element){
      $(element).closest('.form-group').addClass('has-error').removeClass('has-success');
    },
    unhighlight: function(element){
      $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element){
      if (element.parent('.input-group').length){
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    }
  });


  $('#sign-up-form').validate({

    rules: {

      firstName: {
        required: true
      },

      lastName: {
        required: true
      },

      email: {
        required: true,
        email: true
      },

      address: {
        required: true
      },
      city: {
        required: true
      },
      state: {
        required: true
      },
      zip: {
        required: true
      },
      country: {
        required: true
      },

      userName: {
        required: true
      },

      password: {
        minlength: 6,
        required: true
      },

      confirmation: {
        minlength: 6,
        equalTo: "#password"
      }
    },

    success: function(element){
      //element.append("<span class='input-group-addon glyphicon glyphicon-ok'></span>");
    }
  });

  $('#add-item-form').validate({
      files:{
        accept: "image/*"
      }
  });

});
