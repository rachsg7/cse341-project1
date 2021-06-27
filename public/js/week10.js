const populateList = () => {
    const nameList = document.getElementById('nameList')

    fetch('/fetchAll')
        .then(res => res.json())
        .then(data => {
            // Clear the list first
            while (nameList.firstChild) nameList.firstChild.remove()

            // Repopulate the list
            for (const avenger of data.avengers) {
                const li = document.createElement('li')
                li.appendChild(document.createTextNode(avenger.name))
                nameList.appendChild(li)
            }
        })
        .catch(err => {
            console.error(err)
        })
}

const submitName = () => {
    const newName = document.getElementById('newName').value;
    var formData = new FormData();
    formData.append("newName", newName);

    fetch('/insertName', {
            method: 'POST', // Send a POST request
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ newName })
        })
        .then(res => {
            document.getElementById('newName').value = ''

            // Repopulate the list with our new name added
            populateList()
        })
        .catch(err => {
            document.getElementById('newName').value = ''
            console.error(err)
        })
}

// Initialize the list
populateList()