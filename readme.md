# Programação Orientada a Objetos (POO | OOP)

A programação orientada a objetos é uma forma de organizar o código em torno de objetos, que podem representar entidades ou conceitos do domínio do programa.

## Objetos

Os objetos são unidades que reúnem dados (atributos) e comportamentos (métodos).

Vamos imaginar um usuário de um site. Ele tem um nome, um e-mail e geralmente uma senha. Também podemos definir comportamentos para esse usuário, como exibir algumas de suas informações.

O usuário é um objeto; seu nome, e-mail e senha são seus __atributos__, e exibir suas informações é um __comportamento__. Vamos estruturar isso no código.

```js
const user = {
  name: 'Ari',
  email: 'a@a.com',
  password: '123abc',
  verInfo: function() {
    console.log(`Your name is ${this.name} and your e-mail is ${this.email}`)
  }
}
```

## `this`

Usamos `this` para nos referirmos ao objeto associado à chamada do método. No exemplo abaixo, como `verInfo()` é chamado a partir de `user`, dentro do método `this` se refere a esse objeto.

```js
user.verInfo()
// Your name is Ari and your e-mail is a@a.com
```

## Protótipos

Protótipos são objetos base que possuem propriedades e métodos reutilizáveis. A herança de protótipo permite que um objeto herde funcionalidades de outro objeto, compartilhando comportamento sem duplicar código.

```js
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

// O objeto admin herda propriedades do objeto user.
Object.setPrototypeOf(admin, user);
```

Nesse exemplo, `admin` herda a propriedade `active = true` e o método `showInfo` do objeto `user`.

### `__proto__` vs. `prototype`

Em resumo:

`__proto__` é um acessor legado de um objeto, disponibilizado por `Object.prototype`, que permite consultar ou alterar o protótipo interno (`[[Prototype]]`) de um objeto.

`prototype` é uma propriedade de funções construtoras e classes. Quando usamos `new`, o valor dessa propriedade é definido como protótipo interno do novo objeto.

Exemplo:

![exemplo prototype](./docs/prototype.png)

Se tentarmos acessar as propriedades `prototype` e `__proto__` de estudante, obtemos os seguintes retornos:

![__proto__ vs prototype](./docs/__proto__-vs-prototype.png)

Você também pode ter notado que alguns objetos possuem uma propriedade chamada `[[Prototype]]`. Vamos abordar isso na próxima seção.

### Protótipo vs `prototype`

Praticamente todos os dados criados em JavaScript (objetos, arrays etc.) têm um protótipo (`[[Prototype]]`), mas apenas funções construtoras e classes têm a propriedade `prototype`.

Todos os objetos criados a partir de `Object`, `Array`, `String` etc. têm um protótipo que foi “herdado” destes, mas não necessariamente têm uma propriedade `prototype`.

Na imagem abaixo, podemos ver que `estudante` não tem a propriedade `prototype` porque é uma instância, não uma função construtora. Nesse exemplo, `User` tem essa propriedade, que é usada como protótipo interno das instâncias criadas com `new User()`. Tanto a função quanto a instância têm um `[[Prototype]]`, pois também são objetos.

![Prototype vs prototype](./docs/Prototype-vs-prototype.png)

### Cópia vs referência

Os métodos e as propriedades herdados não são copiados para cada objeto. Quando uma propriedade não é encontrada no próprio objeto, JavaScript percorre a cadeia de protótipos para encontrá-la. Ao chamar um método herdado, o `this` se refere ao objeto usado para fazer a chamada.

#### Considerações finais

- O uso de `__proto__` aqui serve para exemplificar o acesso à cadeia de protótipos. Como é um acessor legado, prefira métodos como `Object.getPrototypeOf()` para consultar o protótipo. ([Consulte a documentação](#deprecated))

- Evite alterar o protótipo de objetos já criados sem uma necessidade clara. Mudanças desse tipo podem tornar o código mais difícil de compreender e, dependendo do motor JavaScript, prejudicar otimizações.

- A busca por uma propriedade percorre a cadeia de protótipos até encontrá-la ou chegar ao fim da cadeia. Propriedades herdadas enumeráveis também podem aparecer em algumas iterações, como `for...in`. Em geral, mantenha cadeias de protótipos simples e evite alterá-las sem necessidade.

### Constructor

O exemplo anterior mostrou a criação e a configuração direta de objetos. Outra forma tradicional de criar objetos em JavaScript é usar funções construtoras e o operador `new`. Em uma função construtora, atribuímos ao `this` as propriedades da nova instância.

Vamos usar como exemplo a função construtora [User](./aula-prototype/src/Utils/User.js):

``` js
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
```

### Operador `new`

O operador `new` cria uma nova instância a partir de uma função construtora ou de uma classe.

``` js
const admin = new User('Ari', 'a@a.com', 12123456789, 'rua 123', 'Admin')
```

### `Object.create`

`Object.create()` cria um novo objeto usando o objeto informado como seu protótipo. Diferentemente de `new`, ele não chama um construtor; se necessário, podemos inicializar o novo objeto chamando um método, como `ari.init()`. Veja o exercício [object-create](./aula-prototype/object-create.js):

``` js
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
```

### Factory Function

Uma _factory function_ é uma função que cria e retorna um objeto. No exercício [factory-function](./aula-prototype/factory-function.js), `createUser` prepara um objeto base e retorna uma instância de `Admin` ou `Student`, conforme o papel informado:

``` js
function createUser(name, email, phone, address, role) {
  let user = new User(name, email, phone, address, role)

  Admin.prototype = Object.create(user)
  Student.prototype = Object.create(user)

  user = role === 'Admin' ? new Admin() : new Student()

  return user
}
```

## Classes

As classes são uma sintaxe baseada em protótipos, adicionada ao JavaScript no ECMAScript 2015 (ES6). Para criar uma classe, usamos a palavra-chave `class` seguida do nome. Por convenção, nomes de classes começam com letra maiúscula.

Dentro da nossa classe, precisamos declarar o construtor utilizando `constructor(){}`. Assim como nas nossas funções construtoras, precisamos declarar as propriedades, caso existam, utilizando o `this` e os parâmetros definidos entre parênteses. Vamos usar como exemplo a classe [User](./aula-class/src/Utils/User.js):

```js
class User {
  constructor(name, email, birth, role, active=true) {
    this.name = name
    this.email = email
    this.birth = birth
    this.role = role || 'Student'
    this.active = active
  }

  showInfo() {
    return `Your name is: ${this.name}, your e-mail is ${this.email}`
  }
}
```

### Adicionando Métodos

No exemplo acima, `showInfo()` é um método (comportamento) da classe. Para declarar um método, escrevemos seu nome seguido dos parênteses e do bloco de código.

### Instanciando uma Classe

Como mencionado acima, para instanciarmos uma classe basta utilizar o `new` seguido do nome da classe e dos seus parâmetros, se existirem.

```js
const admin = new User('Ari', 'a@a.com', '2003-01-25', 'Admin')
```

### Exportando e Importando Classes

As classes podem ser exportadas usando CommonJS ou ES Modules. Não vou abordar esses sistemas em detalhes neste documento, mas você pode entender mais [neste documento](https://github.com/whyariel2/node-dio#m%C3%B3dulos).

Neste exemplo, vou utilizar ES Modules e a classe [User](./aula-class/src/Utils/User.js).

__Exportar:__
```js
export default class User {
  ...
}
```

__Importar:__
```js
import User from './src/Utils/User.js'
```

### Herança de Classe

Para herdar de outra classe, primeiro importamos a classe que desejamos estender, caso ela esteja em outro módulo.

Depois, utilizamos a palavra-chave `extends` seguida do nome da classe importada, ao declarar a classe que estamos criando. Nesse caso, vamos utilizar o exemplo da classe [Admin](./aula-class/src/Utils/Admin.js).

```js
import User from './src/Utils/User.js'

class Admin extends User{
  ...
}
```

No caso da classe `User`, queremos que `Admin` aproveite a inicialização de `name`, `email`, `birth`, `role` e `active`. Para isso, recebemos esses valores no `constructor` da subclasse e chamamos `super()` com os argumentos esperados pelo construtor de `User`.

```js
class Admin extends User{
  constructor(name, email, birth, role = 'Admin', active = true) {
    super(name, email, birth, role, active)
  }
  ...
}
```

Utilizamos `role = 'Admin'` para que esse seja o valor padrão de `role` quando nenhum valor for informado.

Quando trabalhamos com orientação a objetos, muitas vezes utilizamos dois tipos de nomenclatura. Podemos falar tanto de classes __parent__ e __children__ (ou seja, classes pais e filhas), quanto de __superclasse__ e __subclasse__.

#### Observações
- O `constructor` e os métodos não são obrigatórios para termos uma classe, ou seja, podemos ter uma classe que tem um construtor, mas não tem métodos, ou vice-versa.
- As classes não são _hoisted_, ou seja, não conseguimos instanciar uma classe antes de declará-la.
- O código dos corpos de classes é executado em modo estrito (_strict mode_), mesmo sem a diretiva `"use strict"`. Esse modo transforma alguns erros que seriam silenciosos em exceções e evita certos comportamentos propensos a bugs. [Leia mais aqui](#strict-mode)

## Encapsulamento

Encapsulamento é uma forma de controlar o acesso ao estado e ao comportamento de um objeto. Atributos e métodos privados ajudam a impedir que sejam acessados diretamente de fora da classe.

No JavaScript, podemos usar atributos e métodos privados, além de métodos acessores (_getters_ e _setters_), para controlar o acesso às informações.

### Atributos Privados

Declaramos um atributo privado prefixando seu nome com `#`. O atributo também precisa ser declarado no corpo da classe, fora do `constructor`. Veja o exemplo baseado em [User](./aula-encapsulation/src/Utils/User.js):

```js
class User {
  #name
  #email
  #birth
  #role
  #active
  constructor(name, email, birth, role, active=true) {
    this.#name = name
    this.#email = email
    this.#birth = birth
    this.#role = role || 'Student'
    this.#active = active
  }

  showInfo() {
    return `Your name is: ${this.#name}, your e-mail is ${this.#email}`
  }
}
```

### Métodos Privados

Assim como no atributo, utilizamos `#` na frente do nome do método para defini-lo como privado. Vamos ver o exemplo da classe [Draw](./aula-encapsulation/src/Utils/Draw.js):

```js
class Draw {
  ...
  // private method
  #findDrawNumber(draw_number, students) {
    const find_number = students.find(student => student.draw_number == draw_number)

    if( find_number == undefined) {
      return false;
    } else {
      return true
    }

  }
  ...
}
```

#### Pontos Importantes
- O atributo privado `#name` não cria uma propriedade pública `name`. Se a classe não declarar uma propriedade pública nem um _getter_ com esse nome, `user.name` será `undefined`.
- Não é possível acessar `user.#name` fora da classe: essa tentativa gera um erro de sintaxe.
- O mesmo erro de sintaxe ocorre se tentarmos atribuir um valor a `user.#name` fora da classe.
- Atributos privados são suportados pelas versões atuais do Node.js e pelos navegadores modernos. Em ambientes antigos, verifique o suporte antes de usar essa sintaxe.

Atributos privados são tão restritivos que nem mesmo subclasses, que teoricamente poderiam acessá-los, conseguem fazê-lo. Para resolver esse problema, utilizamos algo chamado de __métodos acessores__ (_getters_ e _setters_).


### _Getters_

Usamos a palavra-chave `get` para declarar um método acessor que pode ser lido como uma propriedade. Dentro dele, podemos retornar o atributo privado usando `this`. Veja o exemplo adicionado à classe `User`:

```js
class User {
  ...
  get name(){
    return this.#name
  }
  ...
}
```

Agora vamos ver isso sendo executado:

```js
const user = new User('Ari', 'a@a.com','2003-01-25')

console.log(user.name)
// Ari
```

### _Setters_

Usamos a palavra-chave `set` para declarar um método acessor que permite atribuir um valor como se fosse uma propriedade. O _setter_ aceita um parâmetro: o novo valor. Veja o exemplo adicionado à classe [Student](./aula-encapsulation/src/Utils/Student.js):

```js
class Student {
  ...
  set draw_number(new_draw_number) {
    ...
    this.#draw_number = new_draw_number
  }
}
```

Beleza, mas se eu defini uma propriedade como privada, pra que eu vou querer modificar ela? 

No _setter_, podemos implementar lógica de validação, por exemplo, verificar se o valor é válido ou se a alteração é permitida. Veja o exemplo:

```js
class Student {
  ...
  set draw_number(new_draw_number) {
      if (new_draw_number === String(new_draw_number) || new_draw_number == undefined){
        throw new Error('Number format is not valid')
      }

      this.#draw_number = new_draw_number
  }
}
```

Os _setters_ são definidos como propriedades e utilizados com o operador `=`.

```js
const student = new Student('Ari', 'a@a.com','2003-01-25')

student.draw_number = 32
```

## Polimorfismo

O polimorfismo permite que objetos diferentes respondam à mesma chamada de método com comportamentos próprios.

Vamos imaginar um usuário no contexto que utilizamos ao longo do nosso estudo. Ele pode ser um administrador ou um estudante, e cada tipo de usuário pode ter comportamentos específicos.

Herança e polimorfismo estão relacionados, mas não são a mesma coisa. A herança permite que uma classe reutilize e especialize comportamentos e propriedades de outra. O polimorfismo aparece, por exemplo, quando chamamos o mesmo método em objetos diferentes e cada objeto executa a implementação adequada ao seu tipo.

Uma forma de demonstrar isso é sobrescrever (_override_) na subclasse um método herdado.

### _Override_

_Override_ é sobrescrever, na subclasse, um método que já existe na classe pai. Considere a classe [User](./aula-polymorphism/src/Utils/User.js) e a subclasse [Admin](./aula-polymorphism/src/Utils/Admin.js). `User` define `showInfo()`, e `Admin` sobrescreve esse método para acrescentar a data de nascimento às informações exibidas.

Para que o exemplo funcione, `User` precisa definir o método `showInfo()` e expor a data de nascimento por meio de um _getter_:

```js
get birth() {
  return this.#birth
}

showInfo() {
  return `Your name is: ${this.#name}, your e-mail is ${this.#email}`
}
```

Esses métodos são declarados dentro da classe `User`. A subclasse pode então chamar a implementação herdada e acrescentar a data:

```js
class Admin extends User{
  showInfo() {
    const infos = super.showInfo()

    return `${infos}, your birth is ${this.birth}`
  }
}
```
Quando criamos uma instância de `Admin` e outra de `User`, podemos observar que o retorno do método `showInfo()` é diferente, conforme configuramos:

```js
const user = new User('Ari', 'a@a.com', '2003-01-25')
const admin = new Admin('Leleco', 'l@l.com', '2001-05-10')

console.log(user.showInfo())
// Your name is: Ari, your e-mail is a@a.com
console.log(admin.showInfo())
// Your name is: Leleco, your e-mail is l@l.com, your birth is 2001-05-10
```

### Assinatura de Função

Em algumas linguagens, como Java, podemos declarar vários métodos com o mesmo nome, mas com parâmetros diferentes. Isso é chamado de __sobrecarga de métodos__ (_overloading_) e utiliza a __assinatura da função__ para identificar qual implementação deve ser executada.

No JavaScript, não existe essa seleção automática de métodos pela quantidade ou pelo tipo dos parâmetros. Se declararmos mais de um método normal com o mesmo nome dentro de uma classe, a última declaração prevalece. Para variar o comportamento conforme os argumentos, precisamos tratar os casos dentro de uma única implementação.

### Sobrecarga (_Overloading_)

Podemos simular o _overloading_ usando uma estrutura condicional dentro do método. Vamos utilizar a classe [User](./aula-polymorphism/src/Utils/User.js) como exemplo:

```js
class User {
  ...
  showInfo() {
    if (this.#role === 'Admin') {
      return `Your name is: ${this.#name}, your e-mail is ${this.#email}, your birth is ${this.#birth}`
    }

    return `Your name is: ${this.#name}, your e-mail is ${this.#email}`
  }
  ...
}
```

#### Pontos importantes

- Essa abordagem pode ser útil em casos simples, mas muitas condicionais podem deixar a classe muito acoplada, pois ela passa a concentrar regras de várias situações diferentes. Quando isso acontece, podemos avaliar se faz mais sentido usar _override_ em subclasses, como no exemplo anterior.

- O TypeScript oferece assinaturas de sobrecarga para verificar, durante a análise de tipos, as formas permitidas de chamar uma função. Porém, essas assinaturas não criam implementações diferentes em tempo de execução: o comportamento ainda precisa ser tratado por uma única implementação, por exemplo, com condicionais.

### Variação de Comportamento com Argumentos

Em funções tradicionais, existe o objeto `arguments`, que contém os argumentos passados à função no momento da execução. Ele é _array-like_: possui índices com o valor do argumento e uma propriedade `length`, mas não é um array. Arrow functions não possuem seu próprio objeto `arguments`.

Podemos variar o comportamento de um método conforme o argumento recebido. Isso não é sobrecarga nativa de métodos no JavaScript; é uma forma de simular esse comportamento. Veja um exemplo:

```js
class User {
  ...
  showInfo(info_type) {
    console.log(arguments)

    if (info_type === 'basic') {
      return `Your name is: ${this.#name}, your e-mail is ${this.#email}`
    } else if (info_type === 'complete') {
      return `Your name is: ${this.#name}, your e-mail is ${this.#email}, your birth is ${this.#birth}`
    }

    return 'Invalid information type'
  }
}
```

Agora vamos ver isso sendo executado:

```js
const user = new User('Ari', 'a@a.com', '2003-01-25')

console.log(user.showInfo('basic'))
// [Arguments] { '0': 'basic' }
// Your name is: Ari, your e-mail is a@a.com
console.log(user.showInfo('complete'))
// [Arguments] { '0': 'complete' }
// Your name is: Ari, your e-mail is a@a.com, your birth is 2003-01-25
```

Como `arguments` é indexado, poderíamos acessar o argumento usando `arguments[0]` para retornar a resposta esperada a partir do parâmetro passado.

```js
class User {
  ...
  showInfo() {
    const types = {
      basic: `Your name is: ${this.#name}, your e-mail is ${this.#email}`,
      complete: `Your name is: ${this.#name}, your e-mail is ${this.#email}, your birth is ${this.#birth}`
    }

    return types[arguments[0]]
  }
}
```

## Métodos e Atributos Estáticos

Os métodos e atributos estáticos podem ser acessados diretamente pela classe, sem criar uma instância. Eles não dependem dos dados de uma instância específica.

Por isso, também são chamados de métodos e atributos da classe: pertencem à própria classe, e não a uma instância específica.

Geralmente, são utilizados para representar valores ou comportamentos relacionados à própria classe. Vamos ver um exemplo implementado em `User`.

```js
class User {
  ...
  static role = 'Admin'
  ...
  static showGenericInfo(name, email) {
    return `Your name is: ${name}, your e-mail is ${email}, ${this.role}`
  }
}
```

O atributo e o método estáticos pertencem à classe `User`, não a uma instância específica. Por isso, acessamos seus valores e métodos usando o nome da classe:

```js
const generic_user = User.showGenericInfo('User', 'u@u.com')
console.log(generic_user)
// Your name is: User, your e-mail is u@u.com, Admin
console.log(User.role)
// Admin
```

## Documentações

- [POO: o que é programação orientada a objetos? | Alura Cursos Online](https://www.alura.com.br/artigos/poo-programacao-orientada-a-objetos)
- [Object - JavaScript | MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object)
- <a id='deprecated' >[Object.prototype.\_\_proto\_\_ - JavaScript | MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)</a>
- <a id='strict-mode' >[Strict mode - JavaScript | MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Strict_mode)</a>

## Material de Estudo

- [JavaScript: programação Orientada a Objetos | Alura](https://cursos.alura.com.br/course/javascript-programacao-orientada-objetos)
- [Prática Protótipos](./aula-prototype/)
- [Prática Classes](./aula-class/)
- [Prática Encapsulamento](./aula-encapsulation/)