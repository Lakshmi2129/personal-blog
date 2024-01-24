// Add post start //
$("#post_form").on('submit', function(e) {
    e.preventDefault()
        // var form_data = $(this).serialize()
    var form_data = {
        'title': $('#title').val(),
        'content': $('#content').val(),
        'image': $('#image').val(),
        'summary': $('#summary').val(),
    }
    $.post("add_post_blogs", form_data, function(res) {
        if (res["res"] == "success") {
            $("#post_form").trigger("reset")
            hideModal('add_blog_post_modal')
            Swal.fire({
                position: "center",
                icon: "success",
                title: res['msg'],
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: res['msg'],
                showConfirmButton: false,
                timer: 1500
            })
        }
        setTimeout(() => {
            location.reload(true);
        }, "1800");

        blog_posts();
    })
    return false
})


const blog_posts = () => {
    $.get('add_post_blogs', function(res) {
        var ele = '';
        var resData = res
        count = 0;
        for (i = 0; i < resData.length; i++) {
            console.log(resData[i], ">>>>>>>>>>>>>")

            ele += `<div class="card" style="width: 22rem;">
            <img src="${(resData[i].image)}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title">
                    <div class="post_content">
                        <h3><a href="css_frameworks?${(resData[i].pk)}?">${(resData[i].title)}</a>
                        </h3>
                    </div>

                </h3>
                <div class="mt-2 d-flex justify-content-between author">
                    <small>${(resData[i].author)}</small>
                    <small>3 mins ago</small>
                    <small>2 likes</small>

                </div>
                <p class="card-text mt-2">${(resData[i].content)}</p>
            </div>

        </div>`

        }

        $('#blogs_id').html(ele);
    });
}
blog_posts();



function hideModal(id) {
    $(`#${id}`).removeClass("in");
    $(".modal-backdrop").remove();
    $('body').removeClass('modal-open');
    $('body').css('padding-right', '');
    $(`#${id}`).hide();
}