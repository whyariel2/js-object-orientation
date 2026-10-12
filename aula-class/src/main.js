import Admin from "./Utils/Admin.js";

const admin = new Admin('Ari', 'a@a.com', 12123456789, 'rua 123', 'Admin')

const student = admin.createUser('Leleco', 'l@l.com', 12123456789, 'rua 456')

const admin2 = admin.createUser('Pipo', 'p@p.com', 12123456789, 'rua 123', 'Admin')


console.log(admin)
console.log(admin.showInfo())

console.log(student)
console.log(student.showInfo())

console.log(admin2)
console.log(admin2.showInfo())