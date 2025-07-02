self.addEventListener('push', event => {
    const data = event.data.json()
  
    const title = data.title || 'New Notification'
    const options = {
      body: data.body,
      icon: '/favicon-32x32.png'
    }
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    )
  })
  