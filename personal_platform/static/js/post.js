// Add post start //

$(document).ready(function() {
    CKEDITOR.replace('id_summary');
    $("#post_form").on('submit', function(e) {
        e.preventDefault();

        var form_data = {
            'title': $('#title').val(),
            'content': $('#content').val(),
            'image': $('#image').val(),
            'summary': CKEDITOR.instances.id_summary.getData(),
        };

        $.post("add_post_blogs", form_data, function(res) {
            if (res["res"] == "success") {
                $("#post_form").trigger("reset");
                hideModal('add_blog_post_modal');
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: res['msg'],
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: res['msg'],
                    showConfirmButton: false,
                    timer: 1500
                });
            }

            setTimeout(function() {
                location.reload(true);
            }, 1800);

            blog_posts();
        });

        return false;
    });
});



const blog_posts = () => {
    $.get('add_post_blogs', function(res) {
        var ele = '';
        var resData = res;
        count = 0;

        for (i = 0; i < resData.length; i++) {
            if (i % 3 === 0) {
                ele += '<div class="row mt-4 d-flex justify-content-around">';
            }

            ele += '<div class="col-4 card" style="width: 22rem;">' +
                '<img src="' + resData[i].image + '" class="card-img-top" alt="..." height="220">' +
                '<div class="post_icons d-flex float-right">' +
                '<a edit_pk="' + resData[i].pk + '" edit_title="' + resData[i].title + '" edit_content="' + resData[i].content + '" edit_image="' + resData[i].image + '" edit_summary="' + resData[i].sumary + '" type="button" id="goal_edit' + resData[i].i + '" data-bs-toggle="modal" onclick="editpost(this)" href="javascript:void(0);" data-bs-target="#edit_blog_post_modal"><i class="mdi mdi-border-color mt-2 text-primary" style="cursor:pointer;font-size:40px;"></i></a>' +
                '<i onclick="blog_delete(this)" delid="' + res[i].pk + '" class="mdi mdi-delete text-danger text-danger" style="cursor:pointer;font-size:40px;"></i>' +
                '</div>' +
                '<div class="card-body">' +
                '<h3 class="card-title">' +
                '<div class="post_content">' +
                '<h3><a href="css_frameworks?' + resData[i].pk + '">' + resData[i].title + '</a>' +
                '</h3>' +
                '</div>' +
                '</h3>' +
                '<p class="card-text mt-2">' + resData[i].content + '</p>' +
                '</div>' +
                '<div class="mt-2 author">' +
                '<small>' + '<span class="mdi mdi-account" style="cursor:pointer;font-size:20px;margin-top:3px"></span>' +
                '<span style="margin-left:2px">' + resData[i].author + '</span>' + '</small > ' +

                '<small>' + '<span class="mdi mdi-timer" style="cursor:pointer;font-size:20px;margin-top:3px"></span>' +
                '<span style="margin-left:2px">' + timeAgo(resData[i].time) + '</span>' + '</small > ' +

                '</div>' +
                '</div>';

            if ((i + 1) % 3 === 0 || i === resData.length - 1) {
                ele += '</div>';
            }
        }

        $('#blogs_id').html(ele);
    });
}

blog_posts();


const editpost = (tis) => {
    $('.edit_pk').val($(tis).attr('edit_pk'));
    $('#edit_title').val($(tis).attr('edit_title'))
    $('#edit_content').val($(tis).attr('edit_content'));
    $('#edit_image').val($(tis).attr('edit_image'));
    // $('#edit_summary').val($(tis).attr('edit_summary'));

}


// Edit Blog
$("#edit_post_form").on('submit', function(e) {
    e.preventDefault()

    var form_data = {
        'title': $('#edit_title').val(),
        'content': $('#edit_content').val(),
        'image': $('#edit_image').val(),
        'summary': "Summary",
    };

    // var form_data = $(this).serialize()
    $.ajax({
        url: 'add_post_blogs',
        type: 'PUT',
        data: form_data,
        success: function(res) {
            $("#edit_post_form").trigger("reset")
            hideModal('edit_grocery_modal')
            if (res.res == 'success') {
                blog_posts();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
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
            }, "1500");
        },

    });

})


// Delete blog
const blog_delete = (camId) => {
    Swal.fire({
        title: 'Are you sure ? ',
        text: "Do you want to delete this Blog",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#191C5B',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            delId = {
                'pk': $(camId).attr('delId')
            }
            $.ajax({
                url: 'add_post_blogs',
                type: 'DELETE',
                data: delId,
                success: function(res) {
                    if (res['res'] == "success") {
                        blog_posts();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Deleted Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })

                    }

                },


            });
        }

    })
}