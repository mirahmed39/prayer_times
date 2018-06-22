const prayer_times_button = document.querySelector("#prayer_times_button");


prayer_times_button.addEventListener('click', function (event) {
    const date = new Date();
    console.log(date.getMonth(), date.getFullYear());
    const city = 'New+York+City';
    const country = 'US';
    const month = String(date.getMonth() + 1);
    const year = String(date.getFullYear());


    // making a background request through ajax
    const req = new XMLHttpRequest();
    let request_url = 'http://api.aladhan.com/v1/calendarByCity?'+'city='+city+'&country='+country+'&method=2&month='+month+'&year='+year;
    console.log(request_url);
    req.open('GET', request_url);

    req.addEventListener('load', function(event) {
        if (req.status >= 200 && req.status < 300) {
            response = JSON.parse(req.responseText);
            //console.log(response['data']);
            prayer_times = response['data'];
            //console.log('first item', prayer_times[0]);
            /*
            get only one week of prayer times.
            the current date can be used as an index for the
            prayer times array. Using that index, we can
            find a week of prayer times.
            */
            let times_for_week = [];
            let current_date_index = date.getDate() - 1; // starts at index 0
            //let current_date_index = 28;
            let stop_date_index = -1;
            if (current_date_index >= 24)
                stop_date_index = prayer_times.length;
            else
                stop_date_index = current_date_index + 7;

            while (current_date_index !== stop_date_index) {
                //console.log('current date index',current_date_index);
                //console.log(prayer_times[current_date_index]);
                times_for_week.push(prayer_times[current_date_index]);
                current_date_index++;
            }
            console.log('Times for a week',times_for_week);
            populatePrayerTimes(times_for_week);
        } else {
            console.log('something went wrong getting the data');
        }
        prayer_times_button.disabled = true;
    });
    req.send();

});

/*
times is an array containing 7 objects. Each object represents
data gathered from background request.
 */
function populatePrayerTimes(times) {
    const container = document.querySelector('#prayer_times_container');
    const table = container.appendChild(document.createElement('table'));
    table.classList.add('table', 'table-striped', 'table-bordered', 'table-hover');

    const table_head_tag = document.createElement('thead');
    table_head_tag.classList.add('thead-dark');

    const headrow_container = document.createElement('tr');
    const headrow_date = headrow_container.appendChild(document.createElement('th'));
    const headrow1 = headrow_container.appendChild(document.createElement('th'));
    const headrow2 = headrow_container.appendChild(document.createElement('th'));
    const headrow3 = headrow_container.appendChild(document.createElement('th'));
    const headrow4 = headrow_container.appendChild(document.createElement('th'));
    const headrow5 = headrow_container.appendChild(document.createElement('th'));
    const headrow6 = headrow_container.appendChild(document.createElement('th'));

    const headrow_date_text = headrow_date.appendChild(document.createTextNode('Date'));
    const headrow1_text = headrow1.appendChild(document.createTextNode('Fajr'));
    const headrow2_text = headrow2.appendChild(document.createTextNode('Sunrise'));
    const headrow3_text = headrow3.appendChild(document.createTextNode('Dhuhr'));
    const headrow4_text = headrow4.appendChild(document.createTextNode('Asr'));
    const headrow5_text = headrow5.appendChild(document.createTextNode('Maghrib'));
    const headrow6_text = headrow6.appendChild(document.createTextNode('Isha'));

    table_head_tag.appendChild(headrow_container);
    table.appendChild(table_head_tag);

    insertRows(times, table);

}

function insertRows(rowData, table) {
    table_body = document.createElement('tbody');
    for (let i = 0; i < rowData.length; i++) {
        const row = document.createElement('tr');

        const td_date = document.createElement('td');
        // we want to add additional styles to the first row which highlights "today's date".
        // i === 0 indicates that row.
        let data_date;
        if (i === 0) {
            data_date = td_date.appendChild(document.createTextNode(rowData[i]['date']['readable'] + " (Today)"));
            row.classList.add('first-row');
        }
        else
            data_date = td_date.appendChild(document.createTextNode(rowData[i]['date']['readable']));
        //console.log(data1);
        row.appendChild(td_date);

        const td1 = document.createElement('td');
        const data1 = td1.appendChild(document.createTextNode(rowData[i]['timings']['Fajr']));
        //console.log(data1);
        row.appendChild(td1);

        const td2 = document.createElement('td');
        const data2 = td2.appendChild(document.createTextNode(rowData[i]['timings']['Sunrise']));
        //console.log(data1);
        row.appendChild(td2);

        const td3 = document.createElement('td');
        const data3 = td3.appendChild(document.createTextNode(rowData[i]['timings']['Dhuhr']));
        //console.log(data1);
        row.appendChild(td3);

        const td4 = document.createElement('td');
        const data4 = td4.appendChild(document.createTextNode(rowData[i]['timings']['Asr']));
        //console.log(data1);
        row.appendChild(td4);

        const td5 = document.createElement('td');
        const data5 = td5.appendChild(document.createTextNode(rowData[i]['timings']['Maghrib']));
        //console.log(data1);
        row.appendChild(td5);

        const td6 = document.createElement('td');
        const data6 = td6.appendChild(document.createTextNode(rowData[i]['timings']['Isha']));
        //console.log(data1);
        row.appendChild(td6);

        table_body.appendChild(row);
    }
    table.appendChild(table_body);
}



