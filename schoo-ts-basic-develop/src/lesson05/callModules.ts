// エントリポイントから module を import する
import { function1, function2, function3, function4 } from './module'

function1()
function2()
function3()
function4()

// default export された module を直接 import することもできる
// import 時に名前を変えることができる
import defaultFunction1 from './module/default1'
import defaultFunction2 from './module/default2'

defaultFunction1()
defaultFunction2()
