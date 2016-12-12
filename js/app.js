$(document).ready(function() {
  // Validate form and handle "submit"
  $('#register-form').validate({
    errorLabelContainer: '.error-msg',
    wrapper: "li",
    groups: {
      names: "name email"
    },
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      phone: {
        require_from_group: [1, '.required-group'],
        phone: true
      },
      email: {
        require_from_group: [1, '.required-group']
      }
    },
    submitHandler: function(form) {
      var dataString = $(form).serialize();
      var output = urlParamToObject(dataString);
        $('#register-form').fadeOut(300, function () {
        $('#success').fadeIn(300)
      });
    },
  });
});

// Custom phone validator
$.validator.addMethod( "phone", function( phone_number, element ) {
  phone_number = phone_number.replace( /\(|\)|\s+|-/g, "" );
  return this.optional( element ) || phone_number.length > 9 && phone_number.match( /^\d{5,13}$/ );
}, "Please specify a valid phone number" );

//Convert urlParam to JSON
function urlParamToObject(string) {
  var obj = string.split("&").reduce(function(prev, curr, i, arr) {
    var p = curr.split("=");
    prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
    return prev;
  }, {});
  return obj;
};