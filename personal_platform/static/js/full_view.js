const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
var data = {
    'id': params.get('id')
}
$.post('get_data', data, function(res) {
    var ele = ''
    var resdata = res['id'][0]
    ele += `<div class="container"><h1 class="header">${resdata['6']}</h1>
    <img class="full_img" src=${resdata['2']} />
    <p class="full_content">${resdata['1']}</p>
    <h6 class="full_summary">${resdata['3']}</h6>
</div>`

    $('#fullview_id').html(ele)
})