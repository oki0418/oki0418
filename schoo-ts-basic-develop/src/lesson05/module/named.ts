/***** named export ( 名前付き export ) *****/
// 1ファイルから複数モジュールを export できる
export const function3 = (): void => {
  console.log("This is named exported function 3")
}

export function function4(): void {
  console.log("This is named exported function 4")
}
