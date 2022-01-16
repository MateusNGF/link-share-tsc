export default {
  user: {
    text: {
      name: { min: 20, max: 50 },
      nickname: { min: 10, max: 40, prefix: "@", regex: /^@[a-z0-9]$/ },
      description: { min: 30, max: 500 },
      password: { min: 10, max: 350, regex: /^[a-z]{5,10}\[0-9]{4,7}$/ }
    },
  },
  link: {
    text: {
      url: { regex: /^((http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/ }
    }
  }
}