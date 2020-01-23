document
  .getElementById('preventSubmit')
  .addEventListener('click', async function(event) {
    event.preventDefault();
    var arr = [];
    let x = document.getElementById('signIn');
    console.log(x.elements);
    for (i = 0; i < x.length - 1; i++) {
      arr.push(x.elements[i].value);
    }
    const data = {
      aadhar: `${arr[0]}`,
    };
    console.log(data);
    // const token = fetch('/login', {
    //   method: 'POST',
    //   header: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    //   referrerPolicy: 'no-referrer',
    //   body: JSON.stringify(data),
    // });
    // await console.log(token);

    const createUser = await axios.post('/login', data);
    if (createUser) {
      localStorage.setItem('token', createUser.headers['x-auth-token']);
    }
  });
