export default class Draw {
  constructor(draw_number = 0){
    this.draw_number = draw_number
  }

  // private method
  #findDrawNumber(draw_number, students) {
    const find_number = students.find(student => student.draw_number == draw_number)

    if( find_number == undefined) {
      return false;
    } else {
      return true
    }

  }

  // private method
  #validateDrawNumber(draw_number, students) {
    const draw_number_exist = this.#findDrawNumber(draw_number, students)

    return !draw_number_exist
  }


  generateDrawNumber(min, max, students) {
    let draw_number = 0
    let valid_draw_number = false

    while (!valid_draw_number) {
      draw_number = Math.floor(Math.random() * (max - min + 1)) + min
      valid_draw_number = this.#validateDrawNumber(draw_number, students)
    }

    return draw_number
  }

  addDrawNumberToStudent(draw_number, student) {
    student.draw_number = draw_number
  }

  showDrawnStudent(students) {
    const sorted_students = students.toSorted((a, b) =>  a.draw_number - b.draw_number)
    return sorted_students.findLast(student => student.draw_number)
  }
}