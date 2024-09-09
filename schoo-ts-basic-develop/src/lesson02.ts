const main = () => {
  /***** START 配列の型定義 *****/
  // T[]
  const members: string[] = ["Ryoma", "Yuta"]
  members.push("Shunsuke")
  // members.push(123)
  console.log(members)

  // Array<T>
  const friends: Array<string> = ["Taro", "Jiro"]

  // Union Type との組み合わせ
  const answers: ("Yes" | "No")[] = ["Yes", "No", "Yes"]
  answers.push("Yes")
  // answers.push("Neither")
  console.log(answers)

  // アノテーションしなくても型推論される
  const fruits = ["Apple"]
  fruits.push("Orange")
  // fruits.push(undefined)
  /***** END 配列の型定義 *****/

  /***** START タプル = より厳格な配列 *****/
  // 配列の要素数, 順番, 型を定義するとタプルになる
  let response: [number, string, boolean];
  response = [200, "OK", true]
  // response = ["OK", 200, true]
  // response = ["404", "Not Found", false]

  // ラベルをつける
  const property: [id: number, name: string] = [1, "email"]

  // 可変長引数（レストパラメーター）も使える
  let cacheControl: [boolean, ...string[]]
  cacheControl = [false, "max-age=0"]
  cacheControl = [true, "max-age=86400", "must-revalidate"]
  /***** END タプル = より厳格な配列 *****/

  /***** START オブジェクトの型定義 *****/
  // object型は object であることを伝えるだけなので any と大差ない 🙅
  const obj: object = {
    companyName: "toraco株式会社",
    email: "corp@toraco.jp",
  }
  // console.log(obj.email)

  // オブジェクトリテラル表記で key と value を明確に定義しよう 👏
  const company: {
    companyName: string
    email: string
  } = {
    companyName: "toraco株式会社",
    email: "corp@toraco.jp",
  }
  console.log(company.email)

  // ? のついたプロパティはオプショナル（あってもなくてもOK）
  const user: {
    email?: string
    firstName: string
    lastName: string
  } = {
    firstName: "Takaaki",
    lastName: "Inagaki"
  }
  console.log(user.email) // undefined

  // readonly 修飾子のついたプロパティは上書きできない 🚫
  const post: {
    readonly id: number
    title: string
  } = {
    id: 1234,
    title: "TypeScript初級"
  }
  post.title = "TypeScript中級"
  // post.id = 5678
  /***** END オブジェクトの型定義 *****/

  /***** START インデックスシグネチャ *****/
  // [key: T]: U のような構造をインデックスシグネチャと呼ぶ
  const cells: {[key: string]: string} = {
    A1: "name",
    A2: "price",
  }
  cells.B1 = "キャンディ"
  cells.B2 = "150円"
  // cells.B3 = 150
  console.log(cells)

  // key に指定できる型は string か number のみ ⚠️
  const errorCode: {[key: number]: string} = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
  }
  // const flags: {[key: boolean]: string} = { true: "OK" }
  /***** END インデックスシグネチャ *****/

  /***** START 型エイリアスで型定義を使いまわそう *****/
  // 型エイリアス ( type alias ) で型に名前をつけて宣言できる
  type Country = {
    capital: string
    language: string
    currency: string
  }
  const Japan: Country = {
    capital: "Tokyo",
    language: "Japanese",
    currency: "Yen"
  }
  // 同じ型を何度も定義せず再利用できる ♻️
  const Korea: Country = {
    capital: "Seoul",
    language: "Korean",
    currency: "Won"
  }
  // 型に名前をつけることで変数の役割を明確にできる ✨
  // const Gunma: Country = {}
  /***** END 型エイリアスで型定義を使いまわそう *****/

  /***** START 合併型 ( union ) と交差型 ( intersection )  *****/
  // 合併型 : 型Aか型Bどちらかの型を持つ
  type Worrier = {
    attack: number
    hp: number
    mp: number
  }
  type Magician = {
    magic_attack: number
    hp: number
    mp: number
  }
  // Knight は 合併型なので Worrier と Magician のいずれかの型を持っていればOK
  type Knight = Worrier | Magician
  const knight: Knight = {
    attack: 20,
    hp: 100,
    mp: 0
  }
  const darkKnight: Knight = {
    attack: 20,
    magic_attack: 50,
    hp: 100,
    mp: 100
  }
  // Paladin は交差型なので Worrier と Magician のプロパティ全てを持たなくてはならない
  type Paladin = Worrier & Magician
  const paladin: Paladin = {
    attack: 10,
    magic_attack: 10,
    hp: 100,
    mp: 50
  }
  /***** END 合併型 ( union ) と交差型 ( intersection )  *****/

  /***** START 配列とループ処理 *****/
  type CartItem = {
    name: string
    price: number
    quantity: number
  }
  type Cart = CartItem[]
  const cart: Cart = [
    {
      name: "キャンディ",
      price: 150,
      quantity: 2
    },
    {
      name: "クッキー",
      price: 200,
      quantity: 1
    },
    {
      name: "チョコレート",
      price: 300,
      quantity: 1
    },
  ]
  // 配列をループしたい時は for-of 文を使おう
  for (const cartItem of cart) {
    console.log(cartItem.name)
  }

  // 名前から処理の目的が分かりやすい Array メソッドを使おう
  // forEach() はループ処理内で
  cart.forEach((cartItem: CartItem) => {
    console.log(cartItem.name)
  })
  // map() はループ処理でreturnした要素の配列を返す
  const snackNames = cart.map(cartItem => {
    return cartItem.name
  })
  console.log(snackNames)
  // filter() はループ処理内で条件にマッチした要素の配列を返す
  const luxurySnacks = cart.filter(cartItem => {
    return cartItem.price >= 200
  })
  console.log(luxurySnacks)
  // reduce() はループごとに前回の値を参照して次のループに渡すことができる
  const total = cart.reduce((prev: number, cartItem: CartItem) => {
    return prev + cartItem.price * cartItem.quantity
  }, 0)
  console.log(total)
  /***** END 配列とループ処理 *****/

  /***** START 関数でのみ用いる型 *****/
  // void : 特定の値を返さない関数の戻り値 ☁️
  const showLog = (message: string): void => {
    console.log(message)
  }
  showLog("This function returns void type!")

  // never : 決して戻ることのない関数の戻り値 🔄
  const alwaysThrowError = (message: string): never => {
    throw new Error(message)
  }
  // alwaysThrowError("This function never returns anything...")

  /***** END 関数でのみ用いる型 *****/

  /***** START オプションパラメーターとデフォルトパラメーター  *****/
  // パラメーターの最後にオプションパラメーター記述できる
  const registerAddress = (prefecture: string, city: string, street: string, building?: string): void => {
    let address = prefecture + city + street
    if (building) {
      address += building
    }
    console.log(address)
  }
  registerAddress("東京都", "千代田区", "千代田1-1")
  registerAddress("東京都", "千代田区", "千代田1-1", "皇居")

  // オプションパラメーターにデフォルト値を指定することができる
  const registerAddressWithDefault = (prefecture: string, city: string, street: string, building = ""): void => {
    const address = prefecture + city + street + building
    console.log(address)
  }
  registerAddressWithDefault("東京都", "千代田区", "千代田1-1")
  registerAddressWithDefault("東京都", "千代田区", "千代田1-1", "皇居")
  /***** END オプションパラメーターとデフォルトパラメーター  *****/

  /***** START レストパラメーター *****/
  const sumAllPrice = (...prices: number[]): number => {
    return prices.reduce((prev, price) => prev + price, 0)
  }
  console.log(sumAllPrice(100, 200, 50, 500))
  /***** END レストパラメーター *****/

  /***** START 呼び出しシグネチャ  *****/
  type User = {
    id: number
    age: number
    username: string
  }
  const users: User[] = [
    {
      id: 1,
      age: 30,
      username: "Takaaki"
    },
    {
      id: 2,
      age: 26,
      username: "Ryoma"
    },
    {
      id: 3,
      age: 29,
      username: "Yuta"
    },
    {
      id: 4,
      age: 29,
      username: "Shunsuke"
    },
  ]

  // 省略記法はアロー関数と似た形
  type GetUser = (id: number) => User | undefined
  const getUser: GetUser = (id) => {
    return users.find(user => user.id === id)
  }
  console.log(getUser(1))

  // 完全な記法はオブジェクトと似た形
  type FilterUsersByAge = {
    (minAge: number, maxAge: number): User[]
  }
  const filterUsersByAge: FilterUsersByAge = (minAge, maxAge) => {
    return users.filter(user => user.age >= minAge && user.age <= maxAge)
  }
  console.log(filterUsersByAge(27, 29))
  /***** END 呼び出しシグネチャ  *****/
}

main()
