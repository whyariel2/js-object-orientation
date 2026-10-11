const user = {
 init: function(nome, email) {
   this.nome = nome
   this.email = email
 },
 exibirInfos: function() {
   return `${this.nome}, ${this.email}`
 }
}

const ari = Object.create(user)
ari.init('Ari', 'a@a.com')

console.log(ari.exibirInfos())


// ======== Herdando de outro protótipo ========

function User(nome, email) {
 this.nome = nome
 this.email = email

 this.exibirInfos = function() {
   return `${this.nome}, ${this.email}`
 }
}

function Admin(role) {
 User.call(this, 'Ari', 'a@a.com')
 this.role = role || 'estudante'
}

Admin.prototype = Object.create(User.prototype)
const admin = new Admin('admin')
console.log(admin.exibirInfos())
console.log(admin.role)