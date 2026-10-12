import User from "./User.js";
import Student from "./Student.js";
import Class from "./Class.js";

export default class Admin extends User{
  constructor(name, email, birth, role = 'Admin', active = true) {
    super(name, email, birth, role, active)
  }

  createUser(name, email, birth, role) {
    const user = role === 'Admin' ? new Admin(name, email, birth) : new Student(name, email, birth)

    return user 
  }

  createClass(class_name, students) {
    const class_info = new Class(class_name, students || Array())

    return class_info
  }

  addStudentToClass(student, classInfo) {
    classInfo.students.push(student)
  }
}