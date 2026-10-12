export default class Class {
  constructor(class_name, students) {
    this.class_name = class_name
    this.students = students
  }
  
  showClassInfo() {
    const class_students = this.students.map(student => student.name).join(", ")

    return `The class ${this.class_name} is composed by: ${class_students}`
  }

  listClassStudents() {
    return this.students
  }
}