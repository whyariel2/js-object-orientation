const User = require('./src/User')
const Admin = require('./src/Admin')

const admin_functions = new Admin()

const admin = new User('Ari', 'a@a.com', 12123456789, 'rua 123', 'Admin')

if (admin.role === 'Admin') {
   Object.setPrototypeOf(admin, admin_functions)
}

const student1 = admin.createUser('Pipo', 'p@p.com', 12123456789, 'rua 123', 'Student') 
const student2 = admin.createUser('Leleco', 'l@l.com', 12123456789, 'rua 456', 'Student') 

const class_info = admin.createClass('Classe Top')

admin.addStudentToClass(student1, class_info)
admin.addStudentToClass(student2, class_info)
