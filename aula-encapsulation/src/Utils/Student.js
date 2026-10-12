import User from "./User.js";

export default class Student extends User {
  #draw_number
  constructor(name, email, birth, role = 'Student', active = true, draw_number) {
    super(name, email, birth, role, active)

    this.#draw_number = draw_number || Number()
  }

  get draw_number() {
    return this.#draw_number
  }

  set draw_number(new_draw_number) {
    if (new_draw_number === String(new_draw_number) || new_draw_number == undefined){
      throw new Error('Number format is not valid')
    }

    this.#draw_number = new_draw_number
  }
}