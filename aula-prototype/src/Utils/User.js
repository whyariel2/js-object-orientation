function User(name, email, phone, address, role) {
  this.name = name
  this.email = email
  this.phone = phone
  this.address = address
  this.role = role

  this.showInfo = function() {
    console.log(`Your name is: ${this.name}, your e-mail is ${this.email}`)
  }
}

module.exports= User