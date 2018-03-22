export default {
  data () {
    return {
      notification: {
        type: '',
        message: ''
      }
    }
  },
  methods: {
    showNotification (type, message) {
      this.notification.type = type
      this.notification.message = message
      setTimeout(() => {
        this.hideNotifications()
      }, 3000)
    },
    hideNotifications () {
      this.notification.type = ''
      this.notification.message = ''
    }
  }
}
