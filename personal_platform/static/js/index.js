const blog_posts = () => {
    $.get('add_post_blogs', function(res) {
        var ele = '';
        var resData = res
        count = 0;

        for (i = 0; i < resData.length; i++) {
            if (i % 3 === 0) {
                ele += `<div class="row mt-4 d-flex justify-content-around">`;
            }

            var link = `id=${resData[i].pk}&`

            ele += `<div class="col-4 card" style="width: 22rem;">
            <img src=${resData[i].image} class="card-img-top" alt="..." height="220" width="347">
            <div class="card-body">
            <h3 class="card-title">
            <div class="post_content">
            <h3><a href="blog_view?${link}">${resData[i].title}</a>
            </h3>
            </div>
            </h3>
            <p class="card-text mt-2">${resData[i].content} </p>
            </div>
            <div class="mt-2 author">
            <small> <span class="mdi mdi-account" style="cursor:pointer;font-size:20px;margin-top:3px"></span>
            <span style="margin-left:2px"> ${resData[i].author} </span> </small> 

            <small> <span class="mdi mdi-timer" style="cursor:pointer;font-size:20px;margin-top:3px"></span>
            <span style="margin-left:2px"> ${timeAgo(resData[i].time)} </span> </small> 

            </div>
            </div>`;

            if ((i + 1) % 3 === 0 || i === resData.length - 1) {
                ele += `</div>`;
            }
        }

        if (res.length == 0) {
            $('#home_id').html(`
                            No Blogs Found `)
        }

        $('#home_page').html(ele)
    });
}
blog_posts();