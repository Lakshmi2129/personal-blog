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

        $('#home_page').html(ele)
    });
}
blog_posts();