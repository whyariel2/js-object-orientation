export default class Class {
  constructor(class_name, students) {
    this.class_name = class_name
    this.students = students
  }
  
  listClassStudents() {
    return this.students
  }
}