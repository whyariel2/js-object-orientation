const User = require('./src/User')
const Admin = require('./src/Admin')
const Student = require('./src/Student')

function createUser(name, email, phone, address, role) {
  let user = new User(name, email, phone, address, role)

  Admin.prototype = Object.create(user)
  Student.prototype = Object.create(user)

  user = role === 'Admin' ? new Admin() : new Student()

  return user
}

const admin = createUser('Ari', 'a@a.com', 12123456789, 'rua 123', 'Admin')

admin.showInfo()

const student1 = createUser('Pipo', 'p@p.com', 12123456789, 'rua 123', 'Student') 
const student2 = createUser('Leleco', 'l@l.com', 12123456789, 'rua 456', 'Student') 

const class_info = admin.createClass('Classe Top')

admin.addStudentToClass(student1, class_info)
admin.addStudentToClass(student2, class_info)
