---
title: 透過 Web IntersectionObserver API 優化網站圖片
date: "2019-04-11T14:00:00.284Z"
description: "透過 Web IntersectionObserver API 優化網站圖片"
featuredImage: "./titleImage.jpg"
---

![Image](https://upload.cc/i1/2019/04/11/sBy4kD.jpg)

# 範例服用

免費圖片壓縮工具：[Imgr](https://imgr.yosgo.com)

範例：[Examples](https://imgr.yosgo.com/examples)

# 懶載入簡介

懶載入是個已經使用非常非常久的網站圖片優化手法，所謂的「懶」就是類似「延遲」的概念，
在網頁載入時，會將所有的 \<img> 標籤資源全部一次下載，假使一個網站使用過多的圖片時，
就會導致下載速度緩慢，也會使得網站效率載入降低，也會使流量使用比較大。

而懶載入能解決的問提就是讓使用者能慢慢的載入圖片，使得網站的瀏覽流暢度提高，進而使網站擁有更佳體驗。

# 運作原理

首先先了解懶載入手法的概念，懶載入最重要的就是只有在「使用者看得到」的情況下，才將圖片陸陸續續載入進來，
而「使用者看不到」的圖片最早期通常會先用一個空白圖片或是一致的圖片來解決。

程式碼一般會長這樣：

```html
<img src="/placeholder-path.png" src-data="/origin-path.png" />
```

在使用滾輪事件監聽的方式來獲取使用者是否已經在視窗中看見「圖片畫面」，再將 `src` 與 `src-data` 做替換。

也可以使用 content loader 來製作替代圖片區塊，例如 [react-content-loader](https://github.com/danilowoz/react-content-loader)，
這個 React 元件提供了網站載入時，可以用 \<svg> 來快速產生替代圖片區塊，

# 觀察元件

大致上知道了運作原理後，接下來要來了解如何觀察元件。

一個網頁觀察用的 API IntersectionObserver

以[支援度](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Browser_compatibility)來看，基本上大致的主流瀏覽器都有支援，當然 ~~IE~~ 還是不在範圍內，但現在也不再需要刻意探討 IE 了。

# 使用 IntersectionObserver API

範例：[Code Pen](https://codepen.io/Whien/pen/mgmrBz)

MDN: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Browser_compatibility)

## 完整程式碼

index.html

```html
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
<br /><br /><br /><br /><br /><br /><br /><br />
<br /><br /><br /><br /><br /><br /><br /><br />
<img
  src="https://i.imgur.com/BMvxsmD.jpg"
  class="box"
  data-src="https://i.imgur.com/wqcUtQc.jpg"
/>
```

style.css

```css
.box {
  width: 200px;
  height: 200px;
}
```

index.js

```javascript
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
}

function callback(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.src = entry.target.dataset.src
        observer.unobserve(entry.target)
      }, 1000)
    }
  })
}

const observer = new IntersectionObserver(callback, options)

const box = document.querySelector(".box")
observer.observe(box)
```

幾個關鍵方法

- IntersectionObserver(callback, options)
- observer.observe(targetElement)
- observer.unobserve(targetElement)

## IntersectionObserver(callback, options)

要開始建立觀察者時，需要透過 IntersectionObserver 來建立一個觀察者實體，而這實體可使用的參數有兩個

- 建立 IntersectionObserver

  IntersectionObserver 是一個需要實體化的對象，並且會帶入兩個參數 `callback` 與 `options`

```javascript
const observer = new IntersectionObserver(callback, options)
```

- callback

  當觀察者觀察到有「被觀察者」被觸發時，會執行並給予事件回饋來做後續的一系列動作。

  在此範例中，被觀察者只有一個 box 元件，而 callback 內有一個 `entries` 這個參數帶表「被觀察者」，
  每當有「被觀察者」被「看見」時，就會觸發這個 callback 讓開發者可以對「看見」的元件做事情。

```javascript
function callback(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 當「被觀察者」被「看見」時
      setTimeout(() => {
        entry.target.src = entry.target.dataset.src // target 是 <img> 將 src 更換為 data-src
        observer.unobserve(entry.target)
      }, 1000)
    }
  })
}
```

透過 `entry.isIntersecting` 來確定被「看見」，這會被 `options` 中的 `threshold` 所影響。

- options

  options 則是一個物件，可以在「初始化」時，給予觀察者一些細節設定，常用選項例如 `root`, `threshold`

  root 選項可以帶入一個觀察的範圍，如果為 null 或不指定，則預設以整個瀏覽器畫面為主。
  threshold 選項可以指定「被觀察者」在多少的指定可視範圍中才算「看見」，如果設定為 1 則需要整個元件都進入畫面時，才算「看見」。

```javascript
const options = {
  root: null, // 以畫面為主要觀察點
  threshold: 0.5, // 需要被觀察者超過一半範圍，才算「看見」
}
```

## observer.observe(targetElement)

observe 則為被觀察的目標元件，可以帶入一個參數，這個參數必須要是一個元件，可以透過 querySelector 取得或 getElementById... 等等取得元件的方法。

```javascript
const box = document.querySelector(".box")
observer.observe(box)
```

## observer.unobserve(targetElement)

unobserve 則為移除被觀察的目標元件，帶入一個參數，這個參數也必須要是一個元件，通常會用在當執行完 callback 以後呼叫，使得元件不再被觀察，以減省資源利用。

```javascript
function callback(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // ...do something
      observer.unobserve(entry.target)
    }
  })
}
```

# 總結 IntersectionObserver

簡單說這個 API 將以前需要使用很多手法監聽的麻煩解決了，IntersectionObserver API 使開發上對於畫面元件的觀察又更加快速且方便，這個 API 目前在手機瀏覽器上運行似乎還有些支援問題，如果有任何使用支援度問題可以用 [Polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) 來嘗試解決。

---

# 工商推廣

## Image Resizer - Imgr

連結：[Imgr](https://imgr.yosgo.com)

> 學會了 IntersectionObserver 以後，您會開始想，那我要如何像範例中壓縮我的圖片呢？ [Imgr](https://imgr.yosgo.com) 是一個輕便的圖片壓縮服務，如果想達到圖片懶載入效果，需要有兩張圖片，通常團隊會自行撰寫圖片壓縮的服務，如果您沒有找到適當的壓縮工具，也想快速的產生壓縮圖片，Imgr(Image Resizer) 會是您的好夥伴。
