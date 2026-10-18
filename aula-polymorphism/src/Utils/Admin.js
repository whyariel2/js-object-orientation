import User from "./User.js";

export default class Admin extends User{
  constructor(name, email, birth, role = 'Admin', active = true) {
    super(name, email, birth, role, active)
  }

  // showInfo() {
  //   const infos = super.showInfo()

  //   return `${infos}, your birth is ${this.birth}`
  // }

  createUser(name, email, birth, role) {
    const user = role === 'Admin' ? new Admin(name, email, birth) : new User(name, email, birth)

    return user 
  }

}
