function methodGet(url, callback) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
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

function methodPost(url, data, callback) {
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
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

function methodPut(url, data, callback) {
  fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        callback()
      }
    })
    .catch((e) => {
      console.log('No server response. ' + e)
    })
}

function methodDelete(url, callback) {
  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        callback()
      }
    })
    .catch((e) => {
      console.log('No server response. ' + e)
    })
}

export { methodGet, methodPost, methodPut, methodDelete }
