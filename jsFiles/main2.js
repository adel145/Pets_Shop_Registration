document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // מניעת שליחה של הטופס עד לאימות

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };

    if (formData.password !== formData.confirmPassword) {
        alert("הסיסמאות אינן תואמות");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
        } else {
            alert(result.message || 'Registration failed.');
        }
    } catch (error) {
        console.log(error);
        alert('Registration failed.');
    }
});

document.getElementById('deleteForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        email: document.getElementById('unsubscribeEmail').value,
        password: document.getElementById('unsubscribePassword').value
    };

    try {
        const response = await fetch('http://localhost:3000/Unsubscribe', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
        } else {
            alert(result.message || 'Unsubscription failed.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Unsubscription failed.');
    }
});





    // let email = document.getElementById('email').value;
    // let password = document.getElementById('password').value;
    // let confirmPassword = document.getElementById('confirmPassword').value;

    // if (password !== confirmPassword) {
    //     alert("הסיסמאות אינן תואמות");
    //     return;
    // }

//     // שליחת הנתונים לשרת
//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', '/register', true);
//     xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             let response = JSON.parse(xhr.responseText);
//             if (response.success) {
//                 alert('הרשמה בוצעה בהצלחה');
//             } else {
//                 alert(response.message);
//             }
//         }
//     };
//     xhr.send(JSON.stringify({
//         email: email,
//         password: password,
//         firstName: document.getElementById('firstName').value,
//         lastName: document.getElementById('lastName').value
//     }));


// document.getElementById('deleteForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // מניעת שליחה של הטופס עד לאימות

//     let email = document.getElementById('deleteEmail').value;
//     let password = document.getElementById('deletePassword').value;

//     // שליחת הנתונים לשרת
//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', '/delete', true);
//     xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             let response = JSON.parse(xhr.responseText);
//             if (response.success) {
//                 alert('המשתמש נמחק בהצלחה');
//             } else {
//                 alert(response.message);
//             }
//         }
//     };
//     xhr.send(JSON.stringify({
//         email: email,
//         password: password
//     }));
// });
