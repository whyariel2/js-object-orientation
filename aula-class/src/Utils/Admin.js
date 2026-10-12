import User from "./User.js";
import Student from "./Student.js";
import Class from "./Class.js";

export default class Admin extends User{
  constructor(name, email, phone, address, role = 'Admin') {
    super(name, email, phone, address, role)
  }

  createUser(name, email, phone, address, role) {
    const user = role === 'Admin' ? new Admin(name, email, phone, address, role) : new Student(name, email, phone, address)

    return user 
  }

  createClass(class_name) {
    const class_info = new Class(class_name, [])

    return class_info
  }

  addStudentToClass(student, classInfo) {
    classInfo.students.push(student)

    const class_students = classInfo.students.map(student => student.name)

    return `The class ${classInfo.class_name} is composed by: ${class_students}`
  }
}