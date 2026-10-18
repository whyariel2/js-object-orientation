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
    // === Exemplo de polimorfismo sem argumentos ===
    // if (this.role === 'Admin') {
    //   return `Your name is: ${this.#name}, your e-mail is ${this.#email}, your birth is ${this.birth}`
    // }

    // return `Your name is: ${this.#name}, your e-mail is ${this.#email}`

    // === Exemplo de polimorfismo com argumentos ===
    const types = {
      basic: `Your name is: ${this.#name}, your e-mail is ${this.#email}`,
      complete: `Your name is: ${this.#name}, your e-mail is ${this.#email}, your birth is ${this.#birth}`
    }

    return types[arguments[0]]
  }

  static showGenericInfo(name, email) {
    return `Your name is: ${name}, your e-mail is ${email}, ${this.role}`
  }
}