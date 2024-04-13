document.addEventListener('DOMContentLoaded', () => {

    // Function to fetch and display dogs
    function getDogs() {
        fetch('http://localhost:3000/dogs')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response not ok');
            }
            return res.json();
        })
        .then(data => displayDogs(data))
        .catch(err => console.error('Error fetching', err));
    }

    // Function to display dogs in the table
    function displayDogs(data) {
        const tableBody = document.getElementById('table-body');
        data.forEach((dog, index) => {
            const row = document.createElement('tr');
            row.dataset.index = index;

            ['name', 'breed', 'sex'].forEach(field => {
                const cell = document.createElement('td');
                cell.textContent = dog[field];
                row.appendChild(cell);
            });

            const editCell = document.createElement('td');
            editCell.textContent = 'Edit';
            row.appendChild(editCell);
            editCell.addEventListener('click', () => {
                ['name', 'breed', 'sex'].forEach(field => {
                    document.querySelector(`input[name="${field}"]`).value = dog[field];
                });
                document.querySelector('input[name="dogId"]').value = dog.id;
            });

            tableBody.appendChild(row);
        });
    }

    // Function to handle dog form submission
    function handleDogFormSubmit(e) {
        e.preventDefault();

        const dogId = document.querySelector('input[name="dogId"]').value;
        const dogDetails = {
            name: document.querySelector('input[name="name"]').value,
            breed: document.querySelector('input[name="breed"]').value,
            sex: document.querySelector('input[name="sex"]').value
        };

        fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dogDetails)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response not ok');
            }
            return res.json();
        })
        .then(data => {
            alert('Dog details updated successfully', data);
            window.location.reload();
        })
        .catch(error => {
            console.error('Error updating dog details:', error);
        });
    }

    // Initialization
    getDogs();
    const dogForm = document.getElementById('dog-form');
    dogForm.addEventListener('submit', handleDogFormSubmit);
});
