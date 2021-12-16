function showToast(type, title, message) {
    const icons = {
        success: 'checkmark-circle',
        error: 'alert-circle'
    };

    var toast_container = document.getElementById("toast__container");
    const toast = document.createElement("div");
    toast.classList.add("toast", `toast--${type}`);

    toast.innerHTML = `
    <div class="toast__icon">
        <ion-icon name="${icons[type]}"></ion-icon>
    </div>
    <div class="toast__content">
        <div class="toast__title">${title}</div>
        <div class="toast__message">${message}</div>
    </div>
    <div class="toast__close">
        <ion-icon name="close-outline"></ion-icon>
    </div>
`;
    toast_container.appendChild(toast);
    const removeTimeOutId = setTimeout(function () {
        toast_container.removeChild(toast);
    }, 5000)


    toast.onclick = function (e) {
        if (e.target.closest('.toast__close')) {
            toast_container.removeChild(toast);
            clearTimeout(removeTimeOutId);
        }
    }
}