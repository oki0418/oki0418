const main = async () => {
  /***** START Promise 型で実行完了後の値を定義しよう   *****/
  // JSONPlaceholder ( https://jsonplaceholder.typicode.com/ ) で返却される User の型を定義する
  type Address = {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: { lat: string, lng: string }
  }
  type Company = {
    name: string
    catchPhrase: string
    bs: string
  }
  type User = {
    id: number
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: Company
  }

  // JSONPlaceholder の users リソースに対する URL
  const url = "https://jsonplaceholder.typicode.com/users/"

  // メソッドチェーンを用いた例
  const fetchUser = (id: number): Promise<User | undefined> => {
    return fetch(url + id)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        return data
      })
      .catch(error => {
        console.error(error)
        return undefined
      })
  }
  await fetchUser(1)

  // async/await を用いた例
  const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch(url)
    const users = await res.json()
    console.log(users)
    return users
  }
  await fetchUsers()
  /***** END Promise 型で実行完了後の値を定義しよう   *****/

  /***** START 例外として null を返してみよう  *****/
  // 例外が発生したら null を返す
  const selectRoulette = (index: number): boolean | null => {
    if (index < 0 || index > 37) {
      return null
    }
    // 0~36のランダムな数字を取得する
    const winNumber = Math.floor(Math.random() * 37);
    return winNumber === index
  }
  console.log(selectRoulette(1))
  // なぜ null が返ってくるのか関数の呼び出し元では分からない 🤔
  console.log(selectRoulette(500))
  /***** END 例外として null を返してみよう  *****/

  /***** START 例外を throw してみよう  *****/
  // 特定のエラーであることを示すために例外を throw できる
  const selectRouletteWithThrowingError = (index: number): boolean => {
    if (index < 0 || index > 37) {
      // RangeError を throw する
      throw new RangeError(`Invalid index: ${index}. Roulette allows betting on numbers from 0 to 36`);
    }
    // 0~36のランダムな数字を取得する
    const winNumber = Math.floor(Math.random() * 37);
    return winNumber === index
  }

  // throw された例外は try/catch で処理しよう
  try {
    const ret = selectRouletteWithThrowingError(2)
    console.log(ret)
  } catch (e) {
    // instanceof 演算子を用いることでエラーの型を判定できる
    if (e instanceof RangeError) {
      console.error(e.message)
    }
  }
  /***** END 例外を throw してみよう  *****/

  /***** START 例外 ( Error ) を返してみよう *****/
  // ルーレットの結果を受け取ってメッセージを出力する関数
  const getResultMessage = (ret: boolean): void => {
    if (ret) {
      console.log("Congratulation!")
    } else {
      console.log("Tough luck...")
    }
  }
  // try/catch を使って throw されたエラーを処理するかは開発者次第…💭
  // try/catch を使っていないので RangeError が発生してもプログラムは例外を処理できず次の処理に進んでしまってクラッシュする
  // getResultMessage(selectRouletteWithThrowingError(500))

  // ならば Error 型の戻り値を返してあげよう
  const selectRouletteReturnError = (index: number): boolean | RangeError => {
    if (index < 0 || index > 37) {
      // RangeError を throw する
      return new RangeError(`Invalid index: ${index}. Roulette allows betting on numbers from 0 to 36`);
    }
    // 0~36のランダムな数字を取得する
    const winNumber = Math.floor(Math.random() * 37);
    return winNumber === index
  }

  // 関数の実行結果を受け取った先で Error でないかチェックが必要 🪖
  const ret = selectRouletteReturnError(500)
  // ret は boolean | RangeError なので、RangeErrorではないことを検証しないと getResultMessage の引数として渡せない
  // getResultMessage(ret)

  if (ret instanceof RangeError) {
    console.error(ret.message)
  } else {
    getResultMessage(ret)
  }
  /***** END 例外 ( Error ) を返してみよう *****/
}

main()
