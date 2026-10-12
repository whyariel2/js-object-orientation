const user = {
  name: 'Ari',
  age: 23,
  email: 'a@a.com',
  role: 'user',
  active: true,
  showInfo: function() {
    console.log(`Hi ${this.name}! your email is: ${this.email}. Your account is ${this.active ? 'active' : 'not active'}`)
  }
}

const admin = {
  name: 'Naná',
  age: 21,
  email: 'n@n.com',
  role: 'admin',
  createCourse: function() {
    console.log('Course created! =)')
  }
}

// variável admin herda propriedades da variável user
Object.setPrototypeOf(admin, user);

user.showInfo();
admin.showInfo();
admin.createCourse();