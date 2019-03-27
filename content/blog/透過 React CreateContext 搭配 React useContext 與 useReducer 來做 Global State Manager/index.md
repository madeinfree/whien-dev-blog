---
title: 透過 React CreateContext 搭配 React useContext 與 useReducer 來做 Global State Manager
date: "2019-03-27T21:10:30.284Z"
description: "透過 React Context API 與 hooks 來做 state manger"
---

# 服用 CodeSandbox 範例

範例: [Code Sandbox](https://codesandbox.io/s/0o10kq73zv)

# 碎碎念

Hooss 改善以往依賴 Class Instance 的問題，再來就是透過 Hooks 解決問題。

老規局，先來一首 Owl City 的歌

<iframe width="560" height="315" src="https://www.youtube.com/embed/K7KMRBoqQUg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# 為什麼需要 Global State？解決什麼問題？

已經有 state 的元件為什麼需要 Global State 呢？Global State 的出現是因為當有階層較多的元件時，可能一個狀態需要透過 3–5 層不等的資料流才能獲取，也因此 Global State 可以直接透過 Context 來獲取及給予狀態，Global State 顧名思義，說穿了就是一個產生在最上層的全域變數。

# 事前預備知識

- React Redux
- React Context API
- React useContext
- React useReducer

# 大綱

- React Redux 快速簡介
- 使用 React Context API
- 使用 React useContext
- 使用 React useReducer
- 組合並完成 Global State Manager

# React Redux  快速簡介

在 React 尚未納入 useReducer 之前，必須依賴的是 redux 與 react-redux 的搭配來將 Global State 導入 React 中，在以往都必須要使用 Higher Order Component 的技巧來使用。

簡單範例

```javascript
import { createStore } from "redux"
import { Provider, connect } from "react-redux"
//...reducers
import reducers from "./reducers"
const store = createStore(reducers)
function Application() {
  return (
    <Provider store={store}>
      <Todos />
    </Provider>
  )
}
function Todos() {
  return <div>My todo list</div>
}
const mapStateToProps = state => ({})
const mapDispatchToProps = {}
const ConnectTodos = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos)
```

大致上，這樣就可以將 Todos 透過 connect 接到 Provider 的 context 來獲取狀態。

不過不過，這是必須透過 redux 與 react-redux 這兩項套件來達成，而 Hooks 的出現可以完全讓這兩個套件消失無影蹤，接下來就一起來探索如何透過 Hooks 來達到此效果。

# 使用 React Context API

稍微了解一下 React Context API 的運作

首先要先知道幾個東西

- React.createContext
- Context.Provider
- Context.Consumer

```javascript
// 建立一個 Context
const ContextStore = React.createContext({
  todos: [],
})
// 使用 ContextStore
function Application() {
  return (
    <ContextStore.Provider value={{ todos: ["run"] }}>
      <Todos />
    </ContextStore.Provider>
  )
}
// Todos
function Todos() {
  return (
    <ContextStore.Consumer>
      {value => value.todos.map(todo => <div key={todo}>todo</div>)}
    </ContextStore.Consumer>
  )
}
```

透過以上範例，我們可以知道 Context Provider 負責透過 value 來改變狀態，而 Context Consumer 來負責傳入 value 狀態。

# 使用 React useContext

規格：useContext(context: React.createContext)

每次都要使用 Context Consumer 來獲取 value 狀態實在很綁手綁腳，於是 hooks 中 useContext 的出現幫助了開發上的便利，只要將範例的內容稍微更改一下，就能得到相同結果了。

```javascript
// 建立一個 Context
const ContextStore = React.createContext({
  todos: [],
})
// 使用 ContextStore
function Application() {
  return (
    <ContextStore.Provider value={{ todos: ["run"] }}>
      <Todos />
    </ContextStore.Provider>
  )
}
// Todos
function Todos() {
  const value = React.useContext(ContextStore)

  return (
    <React.Fragment>
      {value.todos.map(todo => (
        <div key={todo}>{todo}</div>
      ))}
    </React.Fragment>
  )
}
```

有沒有發現 useContext 的好處，再也不用透過 render props 來得到 value 內容了，程式內容看起來也更直觀了。

# 使用 React useReducer

規格：useReducer(reducer, initialState)

- reducer 自訂 reducer action 內容
- initialState 自訂 state 初始內容

接下來 useReducer 我想是因為 redux 的出現後，大家已經開始能習慣使用 action, reduce 的方式來改變狀態，於是 React 就將此方式直接納入了 React Core 中使用，是一個很棒的加入，使用方式就跟以往在建立 redux reducer 一樣。

```javascript
// 建立 todos initial state
const todosInitialState = {
  todos: [],
}
// 建立 reducer
function todosReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return Object.assign({}, state, {
        todos: state.todos.concat("eat"),
      })
    default:
      return state
  }
}
// 使用 reducer hook
function Todos() {
  const [state, dispatch] = React.useReducer(todosReducer, todosInitialState)
  function handleClick() {
    dispatch({ type: "ADD_TODO" })
  }
  return (
    <React.Fragment>
      {state.todos.map((todo, index) => (
        <div key={index}>{todo}</div>
      ))}
      <button onClick={handleClick}>ADD TODO</button>
    </React.Fragment>
  )
}
```

以上範例即可完成透過 dispatch 來改變狀態的 redux 行為，就此我們已經可以將 redux 移除了。

# 組合並完成 Global State Manager

規格：createContext + useContext + useReducer

大致上了解三種各自的作用以後，就可以來嘗試組合這些內容，然後做一個 Global State Manager
達成目標：

- products store
- orders store

為了方便我們要完成幾個目標

- reducer 的 state 要綁在一起
- dispatch 能夠隨時被呼叫

# reducer 的 state  要綁在一起

首先為了將 state 綁在一起，需要先建立一個 Global State Context

```javascript
const productsInitState = { products: [] }
const ordersInitState = { orders: [] }
const ContextStore = React.createContext({
  products: [],
  orders: [],
})
```

# 建立 Products reducer

```js
function productsReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return Object.assign({}, state, {
        products: state.products.concat({ id: state.products.length }),
      })
    default:
      return state
  }
}
```

# 建立 Orders reducer

```js
function ordersReducer(state, action) {
  switch (action.type) {
    case "ADD_ORDER":
      return Object.assign({}, state, {
        orders: state.orders.concat({ id: state.orders.length }),
      })
    default:
      return state
  }
}
```

# 將 Reducer 傳入 Context 中

從範例中可以發現，Context 不僅僅可以傳入 State，就連 Function 都可以傳入，思考不要被綁住了

```js
function Application() {
  const [pState, pDispatch] = React.useReducer(
    productsReducer,
    productsInitState
  )
  const [oState, oDispatch] = React.useReducer(ordersReducer, ordersInitState)

  return (
    <ContextStore.Provider
      value={{
        orders: oState.orders,
        products: pState.products,
        pDispatch,
        oDispatch,
      }}
    >
      <MyApp />
    </ContextStore.Provider>
  )
}
function MyApp() {
  return (
    <React.Fragment>
      <Products />
      <Orders />
    </React.Fragment>
  )
}
```

# 建立 Products Component 並取用 ContextStore

```js
function Products() {
  const { products, pDispatch } = React.useContext(ContextStore)
  return (
    <div>
      {products.map(product => (
        <div>PRODUCT - {product.id}</div>
      ))}
      <button onClick={() => pDispatch({ type: "ADD_PRODUCT" })}>
        ADD PRODUCT
      </button>
    </div>
  )
}
```

# 建立 Orders Component 並取用 ContextStore

```js
function Orders() {
  const { orders, oDispatch } = React.useContext(ContextStore)
  return (
    <div>
      {orders.map(order => (
        <div>PRODUCT - {order.id}</div>
      ))}
      <button onClick={() => oDispatch({ type: "ADD_ORDER" })}>
        ADD ORDER
      </button>
    </div>
  )
}
```

如此就能開始不斷增加 reducer 來達到 Global State 的管理。

# 奇怪技巧

假如有個奇怪的需求需要把 dispatch 綁在一起可以這麼做，建立一個 combineDispatch 方法

```js
function combineDispatchs(dispatchs) {
  return function(obj) {
    for (let i = 0; i < dispatchs.length; i++) {
      dispatchs[i](obj)
    }
  }
}
```

# 完成方法後傳入 Dispatchs 並改變 Context value 內容

```js
<ContextStore.Provider
  value={{
    orders: oState.orders,
    products: pState.products,
    dispatch: combineDispatchs([pDispatch, oDispatch]),
  }}
>
  <MyApp />
</ContextStore.Provider>
```

# 如此一來假如要改變 Orders 就可以直接使用 dispatch 就好了。

```js
function Orders() {
  const { orders, diaptch } = React.useContext(ContextStore)
  return (
    <div>
      {orders.map(order => (
        <div>PRODUCT - {order.id}</div>
      ))}
      <button onClick={() => diaptch({ type: "ADD_ORDER" })}>ADD ORDER</button>
    </div>
  )
}
```

# 講在結尾

最近自己使用 Hooks 的心得就是，有些操作上還是無法完全透過 Hooks 來完成，Class Instance 的配合其實還是必須的，Hooks 只是一個替代方案，有需要時還是會一起使用，達到需求。
