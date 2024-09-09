const main = () => {
  /***** START 型を抽象化する "ジェネリック"  *****/
  // 似ている構造の型を何度も定義していたら…共通化できそう💡
  type User = {
    id: number
    email: string
    name: string
  }
  type GetUserId = (user: User) => number
  type GetUserName = (user: User) => string
  const getUserId: GetUserId = (user) => {
    return user.id
  }
  const getUserName: GetUserName = (user) => {
    return user.name
  }

  // ジェネリック型パラメーターを使おう
  type GetUserProperty<T> = (user: User) => T
  // GetUserProperty を使う
  const getUserIdWithGeneric: GetUserProperty<number> = (user) => {
    return user.id
  }
  const getUserNameWithGeneric: GetUserProperty<string> = (user) => {
    return user.name
  }

  // T, U, V, Wなどがよく使われる
  type Omelette = {
    egg: number
  }
  type Yakisoba = {
    noodles: number
    pork: number
  }
  type Omusoba = Omelette & Yakisoba
  type MergeObject<T, U, V> = (objT: T, objU: U) => V
  const mergeObject: MergeObject<Omelette, Yakisoba, Omusoba> = (omelette, yakisoba) => {
    return { ...omelette, ...yakisoba}
  }
  const omelette: Omelette = { egg: 3 }
  const yakisoba: Yakisoba = { noodles: 100, pork: 300 }
  const omusoba = mergeObject(omelette, yakisoba)
  console.log(omusoba)
  /***** END 型を抽象化する "ジェネリック"  *****/

  /***** START ジェネリックの宣言方法とバインド *****/
  // ジェネリックの宣言方法1（完全な記法・スコープは個々のシグネチャ）
  type FindItem1 = {
    <T>(arr: T[], predicate: (item: T) => boolean): T | undefined;
    // (arr: T[], predicate: (item: T) => boolean): T | undefined;
  }
  // ジェネリックの宣言方法2（完全な記法・スコープはシグネチャ全体）
  type FindItem2<T> = {
    (arr: T[], predicate: (item: T) => boolean): T | undefined;
    // (arr: T[], predicate: (item: T) => boolean): T | undefined;
  }
  // ジェネリックの宣言方法3（省略記法・スコープは個々のシグネチャ）
  type FindItem3 = <T>(arr: T[], predicate: (item: T) => boolean) => T | undefined
  // ジェネリックの宣言方法4（省略記法・スコープはシグネチャ全体）
  type FindItem4<T> = (arr: T[], predicate: (item: T) => boolean) => T | undefined

  const fruits = ["Apple", "Orange", "Banana"]

  // 関数の宣言時にはまだ型をバインドしない
  const findItem1: FindItem1 = (arr, predicate) => {
    for (const item of arr) {
      if (predicate(item)) {
        return item;
      }
    }
    return undefined;
  }
  // 関数の呼び出し時に型をバインドする
  findItem1<string>(fruits, (fruit) => fruit === "Apple")

  // 関数の宣言時に型をバインドする
  const findItem2: FindItem2<string> = (arr, predicate) => {
    for (const item of arr) {
      if (predicate(item)) {
        return item;
      }
    }
    return undefined;
  }
  // 関数の呼び出し時には型をバインドしない
  findItem2(fruits, (fruit) => fruit === "Apple")
  /***** END ジェネリックの宣言方法とバインド *****/

  /***** START 型の拡大と const アサーション *****/
  // TypeScript の型推論は “緩い” ので型の拡大を許してしまう 😨
  const myFirstName = "Takaaki" // myFirstName: "Takaaki"
  // "Takaaki" のリテラル型である myFirstName を代入
  let maybeMyFirstName = myFirstName
  // string 型に拡大されてしまう
  maybeMyFirstName = "Goro"

  // const アサーションは宣言と同時に型の拡大を抑えられる 🪢
  const myLastName = "Inagaki" as const // myLastName: "Inagaki"
  let maybeMyLastName = myLastName
  // maybeMyLastName = "Ishibashi"

  // ネストされたデータも再帰的に readonly とする
  const company = {
    name: "toraco株式会社",
    address: {
      prefecture: "東京都",
      city: "千代田区"
    }
  } as const
  // 上書きできない
  // company.name = "株式会社toraco"
  // company.address.prefecture = "埼玉県"

  // 定数（変わってほしくない変数）を宣言する際に用いる 👍
  const APP_CONFIG = {
    app_id: 12345,
    api_key: "xxx",
  } as const
  /***** END 型の拡大と const アサーション *****/

  /***** START オブジェクト型に対して使える便利な型演算子 *****/
  // keyof 型演算子 : 全ての key をリテラル型の合併として取得
  type UserKeys = keyof User // "id" | "email" | "name"

  // typeof 型演算子 : 変数から型を抽出する
  type AppConfig = typeof APP_CONFIG // { app_id: number, api_key: string }
  /***** END オブジェクト型に対して使える便利な型演算子 *****/

  /***** START 型Aを型Bに変換するユーティリティ型 *****/
  // Mapped Types : 厳格なインデックスシグネチャ
  type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
  type BusinessHours = {
    [Key in DayOfWeek]: string | null
  }
  const businessHours: BusinessHours = {
    "Mon": "12:00-17:00",
    "Tue": "09:00-17:00",
    "Wed": null,
    "Thu": "09:00-17:00",
    "Fri": "09:00-16:00",
    "Sat": "10:00-18:00",
    "Sun": "10:00-18:00",
  }

  // Partial<T> : オブジェクト型 T の全てのプロパティをオプショナルに
  const someOfBusinessHours: Partial<BusinessHours> = {
    "Mon": "12:00-17:00",
    "Thu": "09:00-17:00",
  }

  // Pick<T, Keys> :  オブジェクト型 T の指定したプロパティだけを残す
  const weekendBusinessHours: Pick<BusinessHours, "Sat" | "Sun"> = {
    "Sat": "10:00-18:00",
    "Sun": "10:00-18:00",
  }

  // Omit<T, Keys> : オブジェクト型 T の指定したプロパティを取り除く
  const weekdayBusinessHours: Omit<BusinessHours, "Sat" | "Sun"> = {
    "Mon": "12:00-17:00",
    "Tue": "09:00-17:00",
    "Wed": null,
    "Thu": "09:00-17:00",
    "Fri": "09:00-16:00",
  }

  // Extract<T, U> : ユニオン型 T から U で指定した型だけを残す
  type Weekend = Extract<DayOfWeek, "Sat" | "Sun"> // "Sat" | "Sun"

  // Exclude<T, U> : ユニオン型 T から U で指定した型を取り除く
  type Weekday = Exclude<DayOfWeek, Weekend> // "Mon" | "Tue" | "Wed" | "Thu" | "Fri"
  /***** END 型Aを型Bに変換するユーティリティ型 *****/

  /***** START 型ガードを使って型を絞り込もう *****/
  // 合併型で渡ってきた値を特定の型として扱うために絞り込みたい
  // 組み込みの型ガードとして typeof や instanceof の演算子が使える
  const showStrDate = (date: Date | string): void => {
    if (typeof date === "string") {
      console.log(date)
    }
  }
  showStrDate(new Date())
  showStrDate("2023-03-31")

  // const badGetWeekendBusinessHour = (dayOfWeek: DayOfWeek): string | null => {
  //   return weekendBusinessHours[dayOfWeek]
  // }

  // is 演算子を用いると独自の型ガード = ユーザー定義型ガードを作れる
  const isWeekend = (dayOfWeek: DayOfWeek): dayOfWeek is Weekend => {
    switch (dayOfWeek) {
      case "Sat":
        return true
      case "Sun":
        return true
      default:
        return false
    }
  }

  const getWeekendBusinessHour = (dayOfWeek: DayOfWeek): string | null => {
    if (isWeekend(dayOfWeek)) {
      return weekendBusinessHours[dayOfWeek]
    }
    return null
  }

  console.log(getWeekendBusinessHour("Mon")) // null
  console.log(getWeekendBusinessHour("Sat")) // 10:00-18:00
  /***** END 型ガードを使って型を絞り込もう *****/
}

main()
