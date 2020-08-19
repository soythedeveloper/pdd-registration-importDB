

$('#inputPassword').on('input', function(){
  if ($(this).val().length >= 6){
    $('#pwd-has-error').remove();
  }
});

$('#inputPasswordConfirm').on('input', function(){
  if ($('#inputPassword').val() == $(this).val()) {
    $('#pwd-must-match').remove();
  }

});

$('#inputPassword').on('focusin', function(){
  $(this).addClass('has-focus');
  if($(this).val().length<5)
    $(this).after('<span class="text-danger font-weight-light" id="pwd-has-error">Password must be at least 6 characters long</span>');

});
$('#inputPasswordConfirm').on('focusin', function(){
  $(this).addClass('has-focus');
  if ($('#inputPassword').val() != $(this).val()) {
    $(this).after('<span class="text-danger font-weight-light" id="pwd-must-match">Your passwords must match</span>');
  }

});
