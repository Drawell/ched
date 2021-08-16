let tokenizedMethodGet = (args) => {
  console.log('UnInited')
}

let tokenizedBlobMethodGet = (args) => {
  console.log('UnInited')
}

let tokenizedMethodPost = (args) => {
  console.log('UnInited')
}

let tokenizedMultipartMethodPost = (args) => {
  console.log('UnInited')
}

function initToken(token, onUnauthorized) {
  tokenizedMethodGet = (url, callback) => {
    fetch(url, {
      method: 'GET',
      headers: { 'x-access-token': token },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.statusText === 'UNAUTHORIZED') {
            onUnauthorized('Время сеанса истекло')
            //return response.json()
          }
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((data) => {
        callback(data)
      })
      .catch((e) => {
        console.log('No server response. ' + e)
      })
  }

  tokenizedBlobMethodGet = (url, callback) => {
    fetch(url, {
      method: 'GET',
      headers: { 'x-access-token': token },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.statusText === 'UNAUTHORIZED') {
            onUnauthorized('Время сеанса истекло')
            //return response.json()
          }
          throw Error(response.statusText)
        }
        return response.blob()
      })
      .then((blob) => {
        callback(blob)
      })
      .catch((e) => {
        console.log('No server response. ' + e)
      })
  }

  tokenizedMethodPost = (url, data, callback) => {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-token': token },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.statusText === 'UNAUTHORIZED') {
            onUnauthorized('Время сеанса истекло')
            //return response.json()
          }
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((data) => {
        callback(data)
      })
      .catch((e) => {
        console.log('No server response. ' + e)
      })
  }

  tokenizedMultipartMethodPost = (url, data, callback) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          if (response.statusText === 'UNAUTHORIZED') {
            onUnauthorized('Время сеанса истекло')
            //return response.json()
          }
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((data) => {
        callback(data)
      })
      .catch((e) => {
        console.log('No server response. ' + e)
      })
  }
}

export {
  initToken,
  tokenizedMethodGet,
  tokenizedMethodPost,
  tokenizedBlobMethodGet,
  tokenizedMultipartMethodPost,
}
