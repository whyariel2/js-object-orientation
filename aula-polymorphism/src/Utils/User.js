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

  static role = 'Admin'

  get name(){
    return this.#name
  }

  // get birth(){
  //   return this.#birth
  // }

  // showInfo() {
  //   return `Your name is: ${this.#name}, your e-mail is ${this.#email}`
  // }

  showInfo() {
    if (this.role === 'Admin') {
      return `Your name is: ${this.#name}, your e-mail is ${this.#email}, your birth is ${this.birth}`
    }

    return `Your name is: ${this.#name}, your e-mail is ${this.#email}`
  }

  static showGenericInfo(name, email) {
    return `Your name is: ${name}, your e-mail is ${email}, ${this.role}`
  }
}