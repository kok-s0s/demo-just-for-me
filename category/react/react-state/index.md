# How to Manage State in a React App – With Hooks, Redux, and More

> https://www.freecodecamp.org/news/how-to-manage-state-in-a-react-app/

## React 中的状态是什么

use `函数组件` to make 应用程序

组件 === JavaScript 函数 === 独立且可复用的代码

> 状态（state）是一个保存有组件信息的对象

> 无状态组件，只需呈现其内容而无需存储任何信息

**状态变化**是使 React 组件重新渲染的两个原因之一（另一个是 props 的变化）

因此，状态存储了组件的信息同时也控制了它的行为。

---

## 如何使用 useState hook

```jsx
// App.js
import { useState } from 'react'

function App() {

  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <p>Count is: {count}</p>

      <div>
        <button onClick={() => setCount(count+1)}>Add 1</button>
        <button onClick={() => setCount(count-1)}>Decrease 1</button>

        <button onClick={() => setCount(count+10)}>Add 10</button>
        <button onClick={() => setCount(count-10)}>Decrease 10</button>

        <button onClick={() => setCount(0)}>Reset count</button>
      </div>
    </div>
  )
}

export default App
```

### 如何使用 useEffect 读取状态更新

> `setState` 函数是异步的

如果尝试在更新状态后立即读取它，例如：

```jsx
<button onClick={() => {
          setCount(count+1)
          console.log(count)
}}>Add 1</button>
```

会得到之前的状态值，并没有得到更新。

在更新状态后读取状态的正确方法是使用 `useEffect` hook。它允许我们在每个组件重新渲染后（默认情况下）或在我们声明更改的任何特定变量之后执行一个函数。

就像这样：

```jsx
useEffect(() => console.log(value), [value])
```

### 如何传递一个回调给状态更新函数

推荐做法，确保要更新的值是最新的。

```jsx
setCount(prevCount => prevCount+1)
```

## 管理规模和复杂性

### React context

### 如何使用 useReducer hook

```jsx
// App.js
import { useReducer } from 'react'
import './App.scss'

function App() {

  function reducer(state, action) {
    switch (action.type) {
      case 'ADD': return { count: state.count + 1 }
      case 'SUB': return { count: state.count - 1 }
      case 'ADD10': return { count: state.count + 10 }
      case 'SUB10': return { count: state.count - 10 }
      case 'RESET': return { count: 0 }
      default: return state
    }
  }

  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div className="App">
      <p>Count is: {state.count}</p>

      <div>
        <button onClick={() => dispatch({type: 'ADD'})}>Add 1</button>
        <button onClick={() => dispatch({type: 'SUB'})}>Decrease 1</button>

        <button onClick={() => dispatch({type: 'ADD10'})}>Add 10</button>
        <button onClick={() => dispatch({type: 'SUB10'})}>Decrease 10</button>

        <button onClick={() => dispatch({type: 'RESET'})}>Reset count</button>
      </div>
    </div>
  )
}

export default App
```

总结一下，只需要：

* 一个 reducer，合并所有可能的状态变化的函数
* 一个 dispatch 函数，将修改动作传递给 reducer

UI 元素将不能像以前那样通过用一个值调用 setState 去直接更新状态。现在它们需要调用一个动作类型（action type）并通过 reducer，这使得状态管理更加模块化和可预测。

### Redux

Redux 中有三个主要的构建块：

- store — 一个保存应用状态数据的对象
- reducer — 一个由动作类型（action type）触发，并返回一些状态数据的函数
- action — 一个告诉 reducer 如何改变状态的对象，它必须包含一个 type 属性，并且它还可以包含一个可选的 payload 属性

实现 Redux，示例应用程序如下所示：

```jsx
// App.js
import './App.scss'

import { Provider, useSelector, useDispatch } from 'react-redux'
import { addOne, subOne, addSome, subSome, reset } from './store/actions/count.actions'

import store from './store'

function App() {
  const dispatch = useDispatch()
  const count = useSelector(state => state.count)

  return (
    <Provider store={store}>
      <div className="App">
        <p>Count is: {count}</p>

        <div>
          <button onClick={() => dispatch(addOne())}>Add 1</button>
          <button onClick={() => dispatch(subOne())}>Decrease 1</button>

          <button onClick={() => dispatch(addSome(10))}>Add 10</button>
          <button onClick={() => dispatch(subSome(10))}>Decrease 10</button>

          <button onClick={() => dispatch(reset())}>Reset count</button>
        </div>
      </div>
    </Provider>
  )
}

export default App
```

需要一个新的 store 文件夹，包含相应的 store、reducer 和 actions 文件。

```js
// index.js (STORE)
import { createStore } from 'redux'
import CountReducer from './reducers/count.reducer'

export default createStore(CountReducer)
```

```js
// count.reducer.js
import { ADD, SUB, ADDSOME, SUBSOME, RESET } from '../actions/count.actions'

const CountReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
      case ADD: return { count: state.count + 1 }
      case SUB: return { count: state.count - 1 }
      case ADDSOME: return { count: state.count + action.payload }
      case SUBSOME: return { count: state.count - action.payload }
      case RESET: return { count: 0 }
      default: return state
    }
}

export default CountReducer
```

```js
// count.actions.js
export const ADD = 'ADD'
export const addOne = () => ({ type: ADD })

export const SUB = 'SUB'
export const subOne = () => ({ type: SUB })

export const ADDSOME = 'ADDSOME'
export const addSome = (value) => ({
    type: ADDSOME,
    payload: value
})

export const SUBSOME = 'SUBSOME'
export const subSome = (value) => ({
    type: SUBSOME,
    payload: value
})

export const RESET = 'RESET'
export const reset = () => ({ type: RESET })
```
