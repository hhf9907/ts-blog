import postService from '../service/post.service'
import { generatePostId } from '../utils/password-handle'
const content = "在日常的开发中，我们会经常使用JavaScript中的一个关键字：this，在常见的编程语言中，几乎都有this这个关键字，但是JavaScript中的this和常见的变成语言中的this不太一样，\n在常见的变成语言（java，c++等）中，this通常只会出现在类的方法中，而this指向它当前调用的对象，但是在JavaScript中，this是更加灵活的，无论是它出现的位置还是它代表的含义。', '## JavaScript中的this绑定\n\n在日常的开发中，我们会经常使用JavaScript中的一个关键字：this，在常见的编程语言中，几乎都有this这个关键字，但是JavaScript中的this和常见的变成语言中的this不太一样，\n在常见的变成语言（java，c++等）中，this通常只会出现在类的方法中，而this指向它当前调用的对象，但是在JavaScript中，this是更加灵活的，无论是它出现的位置还是它代表的含义。\n\n### this全局作用下的指向\n\n这个问题非常容易回答，在浏览器中，this的指向为全局对象window\n\n```js\nconsole.log(this) // window 对象\n\nvar name = \"hhf\"\n\nconsole.log(this.name) // hhf\nconsole.log(window.name) // hhf\n```\n\n但是，开发中很少直接在全局作用于下去使用this，通常都是在函数中使用的\n\n### this到底指向什么呢？\n\n下面我们通过一段代码，代码中，我们定义一个函数，对他进行三种不同的方式进行调用，它产生了不同的结果\n\n```js\nfunction foo() {\n  console.log(this)\n}\n\nfoo() // window对象\n\nconst obj = {\n  name: \"hhf\",\n  foo: foo\n}\n\nobj.foo() // obj1\n\nconst obj2 = {}\n\nfoo.call(obj2) // obj2\n```\n\n从上面代码运行的结果我们得出：\n\n1.函数在调用时，JavaScript会默认给this绑定一个值；\n2.this的绑定和定义的位置（编写的位置）没有关系；\n3.this的绑定和调用方式以及调用的位置有关系；\n4.this是在运行时被绑定的\n\n在JavaScript中，this有四种绑定规则，分别是：\n1.默认绑定\n2.隐式绑定\n3.显式绑定\n4.new绑定\n\n下面我们分别对这四种绑定规则进行学习\n\n### 默认绑定\n\n默认绑定通常是在独立函数进行调用时进行绑定，独立函数调用我们可以理解成没有被绑定到某个对象进行调用,默认绑定在浏览器中指向的是window，当为[ 严格模式](https://www.runoob.com/js/js-strict.html)（use strict）的时候指向的是undefined\n\n```js\n// 案例一\nfunction foo() {\n  console.log(this)\n}\n\nfoo() // window对象\n\n// 案例二\nfunction foo(fn) {\n  fn()\n}\n\nconst obj = {\n  name: \"hhf\",\n  bar: function() {\n    console.log(this)\n  }\n}\n\n\nfoo(obj.bar) // window\n```\n\n### 显示绑定\n\n显示绑定通常是某个对象对它进行调用，通俗来讲：谁调用就指向谁\n\n```js\nfunction foo() {\n  console.log(this.name);\n}\n\nconst obj = {\n  name: \"hhf\",\n  bar: foo\n}\n\n\nobj.bar() // hhf\n```\n\n隐示绑定的另一种情况：\n\n当有多层对象嵌套调用某个函数的时候，如 `对象.对象.函数` ,this 指向的是最后一层对象。\n\n```js\nfunction foo() {\n  console.log(this.name);\n}\n\nconst person = {\n  name: \"person\"\n}\n\nperson.foo = foo\n\nconst obj = {\n  name: \"hhf\",\n  bar: foo,\n  person: person\n}\n\nobj.person.foo() // person\n```\n\n### 显式绑定\n\n在JavaScript中，所有的函数都可以使用call、apply、bind三个方法对函数的this进行绑定\n使用方式的不同：call、apply在函数调用时对它进行调用，bind会返回一个新的函数\n\n显示绑定的用途： 防抖、节流等\n\n#### call函数的使用\n\ncall() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。\n它接收的参数为：第一个为绑定的this，后面接上的为所调用的函数的参数\n具体使用方法如下\n\n```js\n// 基本使用\nfunction foo() {\n  console.log(this.name);\n}\n\nconst obj = {\n  name: \"hhf\"\n}\n\n\nfoo.call(obj) // hhf\n\n// 传入参数\nfunction foo(n, m) {\n  console.log(this.name);\n  console.log(n, m)\n}\n\nconst obj = {\n  name: \"hhf\"\n}\n\n\nfoo.call(obj, \"n\", \"m\") // hhf n m\n```\n\n#### apply函数的使用\n\napply方法的语法和作用与 call() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。\n具体使用方法如下\n\n```js\nfunction foo(n, m) {\n  console.log(this.name);\n  console.log(n, m)\n}\n\nconst obj = {\n  name: \"hhf\"\n}\n\n\nfoo.call(obj, [\"n\", \"m\"]) // hhf, n m\n```\n\n#### bind函数的使用\n\nbind函数它所接收的参数和call函数一样，但是它会返回一个新的函数，新的函数的this会指向传入的对象\n\n```js\nfunction foo(n, m) {\n  console.log(this.name);\n  console.log(n, m)\n}\n\nconst obj = {\n  name: \"hhf\"\n}\n\n\nconst newFoo = foo.bind(obj, \"n\", \"m\")\n\nnewFoo() // hhf n m\n```\n\n### new 绑定\n\nnew是JavaScript中的一个关键字，当进行new操作调用函数时，会执行如下的操作\n1.函数内部会创建一个新的对象\n2.创建的对象的原型（__proto__）会指向函数的prototype\n3.所创建的对象会绑定到该函数的this上\n4.如果函数没有其他返回值，会默认返回该对象\n\n```js\nfunction Persion() {\n  console.log(this)\n}\n\nnew Persion(); // Persion {}\n```\n\n### 规则优先级\n\n上面我们学习了四种绑定规则，那么我们可能会思考，如果一个函数在调用的时候使用了多种绑定规则，谁的优先级最高呢？\n结果如下\n1.默认规则的优先级最低毫无疑问，默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定this\n2.显示绑定优先级高于隐式绑定\n\n```js\nfunction foo() {\n  console.log(this.name)\n}\n\nconst obj1 = {\n  name: \'obj1\',\n  foo: foo\n}\n\nconst obj2 = {\n  name: \'obj2\',\n}\n\nobj1.foo.call(obj2) // obj2\n```\n\n3.new绑定优先级高于隐式绑定\n\n```js\nfunction foo() {\n  console.log(this)\n}\n\nconst obj1 = {\n  name: \'obj1\',\n  foo: foo\n}\n\nconst obj2 = {\n  name: \'obj2\',\n}\n\nnew obj1.foo() // foo {}\n```\n\n4.new绑定优先级高于bind\n new绑定和call、apply是不允许同时使用的，所以不存在谁的优先级更高\n new绑定可以和bind一起使用，new绑定优先级更高p代码测试\n\n```js\nfunction foo() {\n  console.log(this)\n}\n\nconst obj1 = {\n  name: \'obj1\',\n  foo: foo\n}\n\nconst newFoo = foo.bind(obj1)\nnew newFoo() // foo {}\n```\n\n### 箭头函数的this\n\n箭头函数是ES6中新增的一种函数的写法，但是箭头函数是不绑定this的，当在箭头函数中使用this时，它会随着它的作用域网上找，使用最近的作用域的this来使用\n\n```js\n// 使用普通函数\n\nconst obj1 = {\n  name: \'obj1\',\n  foo: function() {\n    console.log(this)\n  }\n}\n\nobj1.foo() // obj1\n\n// 使用箭头函数\nconst obj1 = {\n  name: \'obj1\',\n  foo: ()=> {\n    console.log(this)\n  }\n}\n\nobj1.foo() // window foo的上层作用域为window\n\n// setTimeout所传入的函数如果是普通函数，那么它绑定的是全局对象window，如果传入的\n//是一个箭头函数，那么它的this执行是它的上层作用域的this指向\nconst obj1 = {\n  name: \'obj1\',\n  bar: function() {\n    setTimeout(()=> {\n      console.log(this)\n    })\n  }\n}\n\nobj1.bar() // obj1\n```\n\n下面我们通过一道题，对刚刚所学的进行一个小练习\n\n```js\nvar name = \"window\"\n\nfunction Person(name) {\n  this.name = name\n  this.obj = {\n    name: \"obj\",\n    foo1: function() { \n      return function() {\n        console.log(this.name)\n      }\n    },\n    foo2: function() {\n      return ()=>{\n        console.log(this.name)\n      }\n    }\n  }\n}\n\nvar person1 = new Person(\"person1\")\nvar person2 = new Person(\"person2\")\n\nperson1.obj.foo1()()\nperson1.obj.foo1.call(person2)()\nperson1.obj.foo1().call(person2)\n\nperson1.obj.foo2()()\nperson1.obj.foo2.call(person2)()\nperson1.obj.foo2().call(person2)\n```\n\n输出结果为\n\n```js\n/*\nwindow\nwindow\nperson2\nobj\nperson2\nobj\n*/\n```"

const userId = "e431cd38a0876f8e83fd3e4700adf0f5"

const postName = "JavaScript中的this绑定"

const postIntro = "JavaScript中的this绑定"

const name = "admin"

const categoryIds = "1,2"

const editorType = 1


async function insert() {
  for(let i = 0; i < 2000; i++) {
    const postId = generatePostId()
    await postService.create(
      postId,
      postName+i,
      postIntro,
      content,
      userId,
      name,
      categoryIds,
      editorType
    )
    console.log(postId, '新建成功',i)
  }
}
insert()
export {}