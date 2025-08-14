const datalist = document.getElementById('date-list');
const today = new Date();
const sundays = [];
let date = new Date(today);
date.setDate(date.getDate() + ((7 - date.getDay()) % 7 || 7));

for (let i = 0; i < 4; i++) {
    sundays.push(new Date(date));
    date.setDate(date.getDate() + 7);
}

sundays.forEach(sunday => {
    const option = document.createElement('option');
    option.value = sunday.toISOString().slice(0, 10);
    datalist.appendChild(option);
});