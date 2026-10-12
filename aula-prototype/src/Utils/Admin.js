const Class = require('./Class')
const User = require('./User')

function Admin() {
  this.createUser = function(name, email, phone, address, role) {
    const user = new User(name, email, phone, address, role)

    console.log(`User ${name} created!`)

    return user 
  }
  this.createClass = function(class_name) {
    const class_info = new Class(class_name, [])

    console.log(`Class ${class_name} created!`)

    return class_info
  }

  this.addStudentToClass = function(student, classInfo) {
    classInfo.students.push(student)

    const class_students = classInfo.students.map(student => student.name).join(", ")

    console.log(`The class ${classInfo.class_name} is composed by: ${class_students}`)

  }
}

module.exports= Admin
