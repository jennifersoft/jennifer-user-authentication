# 統合環境構成のためのJENNIFERユーザ認証

これはJENNIFER画面とダッシュボードをiframeで利用するためのサンプルです。

このサンプルでは次の項目について説明します：
  - URLクエリ文字列を利用してJENNIFERを認証するSSOアダプタの実装
  - SSOアダプタを使用してJENNIFER画面表示
  - SSOアダプタを使用してJENNIFERダッシュボードをiframeで表示
  
## JENNIFERビューサーバの設定

  1. Chromeのポリシー上、JENNIFERビューサーバはHTTPSで実行しなければなりません。
  2. server_view.confに'add_same_site_none_cookie = true'を追記します。
  3. 「管理＞アダプタ及びプラグイン」で'url-sso_jennifer-1.0.0.jar'を追加します。


![download](https://user-images.githubusercontent.com/1277117/174537222-45085953-7250-4106-ab44-97ea5c1a6bee.png)

## サンプルダッシュボードの実行

プロジェクトのチェックアウト後、次のコマンドを実行します。

```shell
npm install -g serve
serve -s build
```

![Download](https://user-images.githubusercontent.com/1277117/174537241-e7c504a4-1690-40fd-a78b-413f4ef8c93e.png)

サンプル画面は次の２つのユーザ定義ダッシュボードをiframeで構成します。
 - https://support.jennifersoft.com:7979/userdefine/dashboard?key=ffca2b8b-4b35-4688-8282-c236e0d30b3c
 - https://support.jennifersoft.com:7979/userdefine/dashboard?key=0eae211c-d7b6-4696-8f1e-57c15b42f462
 
## SSOLoginAdapterクラス

この例では、JENNIFERユーザIDとパスワードはURLクエリ文字列から取得します。ただし、状況によってはHTTPヘッダーまたはアダプタのオプションを使用することも可能です。

```java
public class SSOLoginAdapter implements SSOLoginHandler {

    public UserData preHandle(HttpServletRequest request) {
        String id = request.getParameter("id");
        String password = request.getParameter("password");
        
        if (id != null && password != null) {
            LogUtil.info("Logging in with querystring : " + id + "," + password);
            return new UserData(id, password);
        }
        
        return null;
    }
}
```

## URL認証

SSOログインアダプタをJENNIFERサーバに登録すると、次のURLを使用してユーザ認証を行えます。

> /login/sso (GET | POST) 

次のURLは、サンプルとして構築した環境で実際使用できるURLです。

```shell
https://support.jennifersoft.com:7979/login/sso?id=iframe&password=1234
```

ユーザ認証を通ったら、事前定義された画面に移動します。もし、特定画面に移動させる場合は次のように'redirect'パラメータを使用して移動させる画面のURLを指定します。パラメータで使用するURLはエンコードした文字列を使用します。

```shell
https://support.jennifersoft.com:7979/login/sso?id=iframe&password=1234&redirect=%2Fuserdefine%2Fdashboard%3Fkey%3Dffca2b8b-4b35-4688-8282-c236e0d30b3c%26layout%3Diframe
```

上記の例での実際移動されるURLは次のようです。'layout'パラメータを'iframe'にすると、画面左側のメニューを表示しません。

```shell
https://support.jennifersoft.com:7979/userdefine/dashboard?key=ffca2b8b-4b35-4688-8282-c236e0d30b3c&layout=iframe
```

## X-Viewトランザクション分析ポップアップ画面

X-Viewトランザクション分析ポップアップ画面を外部で使用する時は、次のようにURLパラメータを使用します。

```shell
https://support.jennifersoft.com:7900/popup/xviewAnalysis?domainId=3000&transactionId=-3150495411826095874&searchTime=1655600449475
```
### SSOログインアダプタを使用しない場合
ブラウザにログインセッションが残ってない場合は、まずログインページへ移動し、認証を行います。ログインができましたら'redirect'パラメータのURLへ移動します。

```shell
https://support.jennifersoft.com:7979/popup/xviewAnalysis?domainId=3000&transactionId=-3150495411826095874&searchTime=1655600449475&redirect=%2Fpopup%2FxviewAnalysis%3FdomainId%3D3000%26transactionId%3D-3150495411826095874%26searchTime%3D1655600449475
```

### SSOログインアダプタを使用する場合
ログインページへ移動せず、すぐX-Viewトランザクション分析ポップアップが表示されます。

```shell
https://support.jennifersoft.com:7979/login/sso?id=iframe&password=1234&redirect=%2Fpopup%2FxviewAnalysis%3FdomainId%3D3000%26transactionId%3D-3150495411826095874%26searchTime%3D1655600449475
```
