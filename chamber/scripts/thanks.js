const myInfo = new URLSearchParams(window.location.search)
console.log(myInfo)

document.querySelector('#form-application').innerHTML = `
<h3>Welcome ${myInfo.get('first')} ${myInfo.get('last')}</h3>
<p>Your Phone:${myInfo.get('phone')}</p><p>Email:${myInfo.get('email')}
</p><p>Business Name: ${myInfo.get('bizname')}</p> <p>${myInfo.get('timestamp')}</p?`

