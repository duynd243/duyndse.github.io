function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function showToast(type, title, message) {
    var successSound = new Audio("sounds/iphone-notification-fx.wav");
    var errorSound = new Audio("sounds/Error.mp3");
    const icons = {
        success: 'checkmark-circle',
        error: 'alert-circle'
    };

    const currenTime = pad(new Date().getHours()) + ':' + pad(new Date().getMinutes());

    const toast_container = document.getElementById("toast__container");
    const toast = document.createElement("div");
    toast.classList.add("toast", `toast--${type}`);

    toast.innerHTML = `
    <div class="toast__icon">
        <ion-icon name="${icons[type]}"></ion-icon>
    </div>
    <div class="toast__content">
        <div class="toast__title_time">
            <div class="toast__title">${title}</div>
            <div class="toast__time">${currenTime}</div>
        </div>
        <div class="toast__message">${message}</div>
    </div>
    <div class="toast__close">
        <ion-icon name="close-outline"></ion-icon>
    </div>
`;
    toast_container.appendChild(toast);
    if (type === "success")
        successSound.play();
    else if (type === "error")
        errorSound.play();
    const removeTimeOutId = setTimeout(function () {
        toast_container.removeChild(toast);
    }, 4700)


    toast.onclick = function (e) {
        if (e.target.closest('.toast__close')) {
            toast_container.removeChild(toast);
            clearTimeout(removeTimeOutId);
        }
    }
}