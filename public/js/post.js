document
  .getElementById('jsonWebToken')
  .addEventListener('click', async function(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    console.log(token);
    var arr = [];
    let x = document.getElementById('signIn');
    console.log(x.elements);
    for (i = 0; i < x.length - 1; i++) {
      arr.push(x.elements[i].value);
    }
    const data = {
      cropname: arr[0],
      quantity: arr[1],
      price: arr[2],
    };
    console.log(arr);
    const content = await axios({
      method: 'post',
      url: '/update',
      headers: { 'x-auth-token': token },
      data: data,
    });
    console.log(content);
    const dataRecieved = JSON.stringify(content.data);
    window.location = `/details/+${dataRecieved}`;
  });
