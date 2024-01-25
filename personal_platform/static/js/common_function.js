function timeAgo(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date(timestamp);

    const timeDifference = currentDate - targetDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return seconds + ' seconds ago';
    } else if (minutes < 60) {
        return minutes + ' minutes ago';
    } else if (hours < 24) {
        return hours + ' hours ago';
    } else {
        return days + ' days ago';
    }
}


function hideModal(id) {
    $(`#${id}`).removeClass("in");
    $(".modal-backdrop").remove();
    $('body').removeClass('modal-open');
    $('body').css('padding-right', '');
    $(`#${id}`).hide();
}