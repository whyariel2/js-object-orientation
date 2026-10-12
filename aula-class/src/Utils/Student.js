import User from "./User.js";

export default class Student extends User {
  constructor(name, email, phone, address, role = 'Student', draw_number) {
    super(name, email, phone, address, role)

    this.draw_number = draw_number || Number()
  }

}