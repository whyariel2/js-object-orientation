## Protótipos

### \_\_proto\_\_ Vs prototype

Em resumo:

`__proto__` é uma propriedade que todos os objetos têm e que aponta para o protótipo que foi definido para aquele objeto

`prototype` é uma propriedade da função que é definida como protótipo quando usamos new para criar novos objetos.

Exemplo:

![exemplo prototype](./docs/prototype.png)

Se tentarmos acessar as propriedades `prototype` e `__proto__` de estudante, obtemos os seguintes retornos:

![__proto__ vs prototype](./docs/__proto__-vs-prototype.png)

Você também pode ter notado que alguns objetos também possuem uma propriedade chamada `[[Prototype]]`. Vamos abordar sobre isso na próxima sessão.

### Protótipo vs `prototype`

Praticamente todos os dados criados em JavaScript (objetos, arrays etc.) têm um protótipo (`[[Prototype]]`), porém apenas alguns deles têm a propriedade `prototype`. 

Todos os objetos criados a partir de `Object`, `Array`, `String` etc. têm um protótipo que foi “herdado” destes, mas não necessariamente têm uma propriedade `prototype`.

Na imagem abaixo podemos ver que estudante não tem a propriedade `prototype` porque ele não é a função que foi chamada com o `new`. Nesse caso que tem a propriedade `prototype` é o User, pois ele é a função que foi definida como protótipo nos nossos testes anteriores. Mas ambos tem um `[[Prototype]]` pois eles são criados a partir de um objeto.

![Prototype vs prototype](./docs/Prototype-vs-prototype.png)

### Cópia vs referência

Os métodos e propriedades não são copiados de um objeto para outro na cadeia de protótipos. Eles são acessados pelo interpretador ao percorrer a cadeia (herança) e os métodos executados de acordo com o this, ou seja, o contexto em que o método foi executado.

#### Considerações finais

- O uso do `__proto__` é apenas para exemplificar e acessar cadeias de protótipos. Ela foi descontinuada e pode ser removida dos padrões web e navegadores. ([Consulte a documentação](#deprecated))

- Não é recomendável alterar diretamente o prototype, pois alterar diretamente as regras de herança de qualquer objeto afeta a performance do código em qualquer interpretador, tanto no Node.js quanto em navegadores.

- Todas as propriedades de uma cadeia de protótipos são enumeradas, e o tempo que o interpretador leva para pesquisar uma propriedade, desde o nível mais alto na cadeia, pode ser longo e impactar o desempenho. Além disso, se o código tentar acessar uma propriedade não existente, vai percorrer toda a cadeia durante a busca. Assim, não é uma boa prática criar longas cadeias de protótipos.

### Constructor

A forma que aprendemos anteriormente de herança de protótipo não é a forma usual de criar objetos em JS quando não temos classe. Normalmente utilizamos usando funções construtoras (`constructor`) e o operador `new`.

Para construimos um constructor definimos uma função que pode ou não ter parâmetros. Agora precisamos definir como construir nosso objeto, ou seja, tudo o que for propriedade dele, utilizando o `this`. Vamos usar como exemplo o objeto [User](./src/User.js).

``` js
function User(name, email, phone, address, role) {
  this.name = name
  this.email = email
  this.phone = phone
  this.address = address
  this.role = role

  this.showInfo = function() {
    console.log(`Your name is :${this.name}, your e-mail is ${this.email}`)
  }
}
```

### Operador `new`

O `new` serve para criamos uma nova instância do nosso objeto, ou seja, sempre que precisarmos criar um novo objeto de um construtor ou classe.

``` js
const admin = new User('Ari', 'a@a.com', 12123456789, 'rua 123', 'Admin')
```

### `Object.create`

Assim como o `new` o `Object.create` serve para criar uma instância a partir de um construtor. Mas diferete do `new`, precisamos primeiro criar um objeto (`Object.create()`) e depois atribuir um valor (`variavel.init()`). Veja o exemplo a partir do exercício [object-create](./object-create.js):

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

Ela é nada mais nada mesmo do que uma função que retorna um objeto. Vamos usar como exemplo a função [createUser](./factory-function.js)

``` js
function createUser(name, email, phone, address, role) {
  let user = new User(name, email, phone, address, role)

  Admin.prototype = Object.create(user)
  Student.prototype = Object.create(user)

  user = role === 'Admin' ? new Admin() : new Student()

  return user
}
```

## Documentações

- [Object - JavaScript | MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object)
- <a id='deprecated' >[Object.prototype.\_\_proto\_\_ - JavaScript | MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)</a>

## Material de Estudo

- [JavaScript: programação Orientada a Objetos | Alura](https://cursos.alura.com.br/course/javascript-programacao-orientada-objetos)