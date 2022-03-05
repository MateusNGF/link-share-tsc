export default {
  user: {
    text: {
      name: { min: 10, max: 50 },
      nickname: { min: 10, max: 40, prefix: "@", regex: /^@[a-z0-9]$/ },
      description: { min: 30, max: 500 },
      password: { min: 5, max: 350, regex: /^[a-z]{5,10}\[0-9]{4,7}$/ }
    },
  },
  link: {
    text: {
      url: { regex: /^(?:https?:\/\/)?(w{3}\.)?[\w_-]+((\.\w{2,}){1,2})(\/([\w\._-]+\/?)*(\?[\w_-]+=[^\?\/&]*(\&[\w_-]+=[^\?\/&]*)*)?)?$/ }
    }
  }
}