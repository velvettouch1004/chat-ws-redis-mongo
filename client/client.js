const connection = new WebSocket('ws://localhost:3000/chat', 'tokenuser1'),
    box = document.getElementById('box'),
    msg = document.getElementById('msg');

connection.addEventListener('open', () => {
    console.log('connected');
});

connection.addEventListener('message', e => {
    let p = document.createElement('p');
    p.textContent = e.data;
    box.appendChild(p);
});

function send (data) {
    if (connection.readyState === WebSocket.OPEN) {
        console.log(data);
        const info = {
            user: '2',
            meet: 'meet-4',
            data
        }
        console.log(info);
        connection.send(JSON.stringify(info));
    } else {
        throw 'Not connected';
    }
}

msg.addEventListener('keydown', e => {
    let kc = e.which || e.keyCode;

    if (kc === 13) {
        send(msg.value);
        msg.value = '';
    }
});
