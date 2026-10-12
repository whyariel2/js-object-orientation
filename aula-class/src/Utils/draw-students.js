// Uma sala contem 5 alunos e para cada aluno foi sorteado um número de 1 - 100.
// Faca um programa que receba os 5 numeros sorteados para os alunos e mostre o maior número sorteado.
// UML: /docs/uml-draw-students.png

import Admin from "./Admin.js";
import Draw from "./Draw.js";
import showDivisor from "./divisor.js";

const draw = new Draw()
const admin = new Admin('Ari', 'a@a.com','2003-01-25', 'Admin')

const class_A = admin.createClass('Class A')

showDivisor()
console.log(`Class ${class_A.class_name} created with ${class_A.students.length} student`)

const student_1 = admin.createUser('Leleco', 'l@l.com', '2002-03-12')
const student_2 = admin.createUser('Haru', 'h@h.com', '2006-06-20')
const student_3 = admin.createUser('Bartolomeu', 'b@b.com', '2004-03-13')
const student_4 = admin.createUser('Helena', 'he@he.com', '2003-09-12')
const student_5 = admin.createUser('Juliana', 'j@j.com', '2005-10-09')


admin.addStudentToClass(student_1, class_A)
admin.addStudentToClass(student_2, class_A)
admin.addStudentToClass(student_3, class_A)
admin.addStudentToClass(student_4, class_A)
admin.addStudentToClass(student_5, class_A)

console.log(class_A.showClassInfo())


for (let i = 0; i < class_A.students.length; i++) {
  const student = class_A.students[i];
  let draw_number = draw.generateDrawNumber(0, 100, class_A.students)

  draw.addDrawNumberToStudent(draw_number, student)
}

const drawn_student = draw.showDrawnStudent(class_A.students)

//console.log(class_A.listClassStudents())
console.log(`The drawn student is ${drawn_student.name} with the number ${drawn_student.draw_number}`)