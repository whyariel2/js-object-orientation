export default class User {
  #name
  #email
  #birth
  #role
  #active
  constructor(name, email, birth, role, active=true) {
    this.#name = name
    this.#email = email
    this.#birth = birth
    this.#role = role || 'Student'
    this.#active = active
  }

  get name(){
    return this.#name
  }

  showInfo() {
    return `Your name is: ${this.#name}, your e-mail is ${this.#email}`
  }
}