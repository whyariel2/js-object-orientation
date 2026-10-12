import User from "./User.js";

export default class Student extends User {
  constructor(name, email, birth, role = 'Student', active = true, draw_number) {
    super(name, email, birth, role, active)

    this.draw_number = draw_number || Number()
  }

}