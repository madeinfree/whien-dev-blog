---
title: 修改 AWS Elastic Beanstalk Nginx Proxy Config
date: "2019-04-12T11:11:00.284Z"
description: "AWS Elastic Beanstalk enviroment 建立時會有預設 client_max_body_size 1MB 的大小限制，找了好多網路答案，最後還是在 AWS 的文件中翻到解答"
featuredImage: "./titleImage.jpg"
---

![Photo by Todd Quackenbush on Unsplash](https://i.imgur.com/AyNenTs.jpg)

# Elastic Beanstalk 簡介

Elastic Beanstalk 簡稱 EB，是由 AWS 提供的快速建置並部署環境服務，只要簡單的幾個設定檔，就能輕輕鬆鬆建立好伺服器環境。

# Nginx

Nginx 是個強大的負載平衡代理伺服器，會負責管理與分配我們的請求與回應，在建立 EB 伺服器時，可以預設是否使用 Nginx 當代理伺服器。

# Client Max Body Size

client-max-body-size 是 Nginx 中一個設定，能夠指定當有資料進來時，能夠接收的大小有多少，而 EB 在 Nginx 中預設似乎為 1MB，因此導致某個服務在上傳檔案時，發生「413 Request Entity Too Large」，請求資料大小過載的問題，因此開始了尋找解答之旅。

# 網路上找解答

找了非常多網路上的資源，都看到類似以下片段

```config
files:
  "/etc/nginx/conf.d/proxy.conf":
    mode: "000644"
    owner: root
    group: root
    content: |
      client_max_body_size 10M;

container_commands:
  01_reload_nginx:
    command: "service nginx reload"
```

但怎麼試就是不行，一直沒有產生效果。

# 建立 .ebextensions 目錄

後來看討論後發現原來是要先在專案的目錄底下建立 `.ebextensions` 資料夾

# 增加 proxy.config 檔案

建立好 .ebextensions 目錄後，接著再增加一個 proxy.config 檔案，並將檔案內容改為

```config
files:
  /etc/nginx/conf.d/proxy.conf:
    mode: "000644"
    owner: root
    group: root
    content: |
      client_max_body_size 100M;

  /opt/elasticbeanstalk/hooks/configdeploy/post/99_kill_default_nginx.sh:
    mode: "000755"
    owner: root
    group: root
    content: |
      #!/bin/bash -xe
      service nginx stop
      service nginx start
```

從檔案內容中可以看出 client_max_body_size 更改後要再 `service nginx stop` 與 `service nginx start` 才能正常運行。

# 總結

看了網路上百百種解答，調整了老半天，還掛掉導致停機了一段時間，最後內容還是在 AWS Documentation 找到，但至少解決了！

---

# 工商推廣

## Image Resizer - Imgr

連結：[Imgr](https://imgr.yosgo.com)

> [Imgr](https://imgr.yosgo.com) 是一個輕便的圖片壓縮服務，如果想達到圖片懶載入效果，需要有兩張圖片，通常團隊會自行撰寫圖片壓縮的服務，如果您沒有找到適當的壓縮工具，也想快速的產生壓縮圖片，Imgr(Image Resizer) 會是您的好夥伴。
