const timeStampGenerator = () => {
    const dateOptions = { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' };
    const timeOptions = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    
    const date = new Date().toLocaleDateString('en-US', dateOptions);
    const time = new Date().toLocaleTimeString('en-US', timeOptions);
    const timeStamp = `${date} ${time}`;

    return timeStamp;
}

module.exports = {timeStampGenerator}