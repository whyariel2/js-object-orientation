function Class(class_name, students) {
  this.class_name = class_name
  this.students = students

  this.listClassStudents = function() {
    return this.students
  }
}

module.exports= Class