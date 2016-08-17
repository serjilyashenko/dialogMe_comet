function formSend(form, url) {
    form.onsubmit = function () {
        var message = form.message.value;

        if (message) {
            publish(message);
            form.message.value = '';
        }
        return false;
    };

    function publish(message) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.send(message);
    }
}

function subscribePane(pane, url) {
    subscribe();

    function subscribe() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) {
                return;
            }

            if (this.status === 200) {
                addMessage(this.responseText);
                subscribe();
                return;
            }

            if (this.status === 404) {
                addMessage(this.statusText);
            }

            setTimeout(subscribe, 1500);
        };
        xhr.send();
    }

    function addMessage(message) {
        var messageElement = document.createElement('div');
        messageElement.appendChild(document.createTextNode(message));
        pane.appendChild(messageElement);
    }
}
