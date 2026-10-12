export default class User {
  constructor(name, email, phone, address, role) {
    this.name = name
    this.email = email
    this.phone = phone
    this.address = address
    this.role = role || 'Student'
  }

  showInfo() {
    return `Your name is: ${this.name}, your e-mail is ${this.email}`
  }
}