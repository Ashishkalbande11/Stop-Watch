document.getElementById('set-timer').addEventListener('click', function() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
        addTimer(totalSeconds);
    } else {
        alert('Please set a valid time!');
    }
});

function addTimer(totalSeconds) {
    const timerList = document.getElementById('timers-list');
    
    // Clear the "no timers" message if it exists
    const noTimersMessage = document.getElementById('no-timers-message');
    if (noTimersMessage) {
        noTimersMessage.remove();
    }

    const timerElement = document.createElement('div');
    timerElement.className = 'timer';

    const timerLabel = document.createElement('span');
    updateTimerLabel(timerLabel, totalSeconds);
    timerElement.appendChild(timerLabel);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function() {
        clearInterval(interval);
        timerElement.remove();
        checkForTimers();
    });
    timerElement.appendChild(deleteButton);

    timerList.appendChild(timerElement);

    const interval = setInterval(function() {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimerLabel(timerLabel, totalSeconds);
        } else {
            clearInterval(interval);
            alert('Timer finished!');
            timerElement.remove();
            checkForTimers();
        }
    }, 1000);
}

function updateTimerLabel(label, totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    label.textContent = `Time Left : ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function checkForTimers() {
    const timerList = document.getElementById('timers-list');
    if (timerList.children.length === 0) {
        const message = document.createElement('p');
        message.id = 'no-timers-message';
        message.textContent = 'You have no timers currently!';
        timerList.appendChild(message);
    }
}
