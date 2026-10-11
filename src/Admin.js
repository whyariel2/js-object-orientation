const Class = require('./Class')
const User = require('./User')

function Admin() {
  this.createUser = function(name, email, phone, address, role) {
    const user = new User(name, email, phone, address, role)

    console.log(`Usuário ${name} criado!`)

    return user 
  }
  this.createClass = function(class_name) {
    const class_info = new Class(class_name, [])

    console.log(`Classe ${class_name} criada!`)

    return class_info
  }

  this.addStudentToClass = function(student, classInfo) {
    classInfo.students.push(student)

    const class_students = classInfo.students.map(student => student.name)

    console.log(`A turma agora é composta por: ${class_students}`)

  }
}

module.exports= Admin
