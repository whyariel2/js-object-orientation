import Admin from "./Utils/Admin.js";
import showDivisor from "./Utils/divisor.js";

const admin = new Admin('Ari', 'a@a.com','2003-01-25', 'Admin')

console.log(admin) // não retorna mais nenhuma informação pois os atributos são privados
console.log(admin.showInfo())

const class_A = admin.createClass('Class A')

showDivisor()
console.log(`Class ${class_A.class_name} created with ${class_A.students.length} student`)

const student_1 = admin.createUser('Leleco', 'l@l.com', '2002-03-12')
const student_2 = admin.createUser('Haru', 'h@h.com', '2006-06-20')

showDivisor()
console.log(student_1)// não retorna mais nenhuma informação pois os atributos são privados

// console.log(student_1.name) // retorna undefined pois não existe a propriedade name, e sim #name

// console.log(student_1.#name) // retorna erro pois #name é privado
console.log(student_1.showInfo())

showDivisor()
console.log(student_2.showInfo())

admin.addStudentToClass(student_1, class_A)
admin.addStudentToClass(student_2, class_A)

console.log(class_A.showClassInfo()) // O nome dos alunos da classe passam a não aparecer