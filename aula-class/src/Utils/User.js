export default class User {
  constructor(name, email, birth, role, active=true) {
    this.name = name
    this.email = email
    this.birth = birth
    this.role = role || 'Student'
    this.active = active
  }

  showInfo() {
    return `Your name is: ${this.name}, your e-mail is ${this.email}`
  }
}