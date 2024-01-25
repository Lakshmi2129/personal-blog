$("#login_form").on('submit', function(e) {
    e.preventDefault()
    var form_data = $(this).serialize()
    $.post("signin", form_data, function(res) {
        if (res["res"] == "success") {
            location.href = '/';
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: res['msg'],
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
    return false
})





// Add goal start //
$("#register_form").on('submit', function(e) {
    e.preventDefault()
    var form_data = $(this).serialize()
    $.post("signup", form_data, function(res) {
        if (res["res"] == "success") {
            $("#register_form").trigger("reset")
            Swal.fire({
                position: "center",
                icon: "success",
                title: res['msg'],
                showConfirmButton: false,
                timer: 1500
            })
            location.href = 'Login';

        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: res['msg'],
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
    return false
})



$(document).ready(function() {
    $('.toggle-password').on('click', function() {
        var passwordField = $('.password-field');
        var passwordFieldType = passwordField.attr('type');

        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            $('.toggle-password').removeClass('mdi-eye').addClass('mdi-eye-off');
        } else {
            passwordField.attr('type', 'password');
            $('.toggle-password').removeClass('mdi-eye-off').addClass('mdi-eye');
        }
    });
});