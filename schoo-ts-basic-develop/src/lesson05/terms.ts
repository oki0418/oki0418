class Person {
  // プロパティ
  name: string
  age: number

  // コンストラクタ
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // メソッド
  introduceMyself(): void {
    console.log(`My name is ${this.name}. I am ${this.age} years old`)
  }
}

// インスタンス
const me = new Person("Takaaki", 30)
me.introduceMyself()
