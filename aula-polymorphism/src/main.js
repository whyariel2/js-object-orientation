import Admin from "./Utils/Admin.js";
import User from "./Utils/User.js";

const user = new User('Ari', 'a@a.com', '2003-01-25')
//const admin = new Admin('Leleco', 'l@l.com', '2001-05-10')

console.log(user.showInfo('basic'))
console.log(user.showInfo('complete'))
//console.log(admin.showInfo())

const generic_user = User.showGenericInfo('User', 'u@u.com')
console.log(generic_user)
console.log(User.role)
