let tokenizedMethodGet = (args) => {}

function initToken(token, onUnauthorized) {
  tokenizedMethodGet = (url, callback) => {
    fetch(url, {
      method: 'GET',
      headers: { 'x-access-token': token },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.statusText === 'UNAUTHORIZED')
            onUnauthorized('Время сеанса истекло')
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

export { initToken, tokenizedMethodGet }
