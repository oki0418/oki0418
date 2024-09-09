// interface 宣言子で定義する
// Type Alias と違って “=“ は不要
interface Book {
  title: string
}

// 同名の interface を宣言すると型が追加（マージ）される 🍙
interface Book {
  currentPage: number
}

type Cycle = 'daily' | 'weekly' | 'monthly' | 'yearly'

// extends を使うことで "拡張” できる 👪
interface Magazine extends Book {
  cycle: Cycle
  open: (page: number) => void
}

// implements を使い interface で宣言した型を class に “実装” できる
class magazine implements Magazine {
  // Magazine の型を満たす class となる
  cycle: Cycle
  currentPage = 0
  title: string

  constructor(cycle: Cycle, title: string) {
    this.cycle = cycle
    this.title = title
  }

  // Magazine に定義されていないメソッドを定義することも可能
  open(page: number) {
    this.currentPage = page
  }
  close() {
    this.currentPage = 0
  }
}

const magazine1 = new magazine("weekly", "週刊少年xxx")
magazine1.open(100)
console.log(magazine1.currentPage)
magazine1.close()
console.log(magazine1.currentPage)
