# JENNIFER user authentication for integrated environment configuration

This is a Jennifer screen and dashboard Iframe interworking sample.
When trying to display the Jennifer dashboard as an Iframe using the sharing URL, the use of two or more Iframes and movement to other screens are restricted.

This sample covers the following topics:

  - Implementing SSO adapter that authenticates JENNIFER with URL query string
  - Open JENNIFER  using SSO adapter
  - Calling the Jennifer Dashboard Iframe using the SSO adapter

## Jennifer View Server Settings

  1. Due to Chrome's Iframe security policy, the JENNIFER view server must be run with HTTPS
  2. Add 'add_same_site_none_cookie = true' to server_view.conf
  3. Add 'url-sso_jennifer-1.0.0.jar' to Settings -> Adapters and Plugins


![download](https://user-images.githubusercontent.com/1277117/169983899-83c00ad9-da4e-4aff-bae1-d7c6d75df6e6.png)

## Running the sample dashboard

After checking out the project, you need to run the following command in the directory

```shell
npm install -g serve
serve -s build
```

![Download](https://user-images.githubusercontent.com/1277117/170180072-c22b87bb-7697-405a-b5d7-ba3e8069e329.png)

The sample screen is implemented by loading the following two custom dashboards into an Iframe.
 - https://support.jennifersoft.com:7979/userdefine/dashboard?key=ffca2b8b-4b35-4688-8282-c236e0d30b3c
 - https://support.jennifersoft.com:7979/userdefine/dashboard?key=0eae211c-d7b6-4696-8f1e-57c15b42f462
 
## SSOLoginAdapter Class

In this sample, the JENNIFER user ID and password are obtained through the URL query string. However, depending on the situation, HTTP request headers or adapter options could be used.

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

## Authenticate with Jennifer URL

If the SSO login adapter has been added to the JENNIFER settings, user authentication with the following can be attempted through calling URL.

> /login/sso (GET | POST) 

For reference, the URL below actually works, and the environment is configured in advance for testing. The user information below could be used in practice, and is created in advance for this sample.

```shell
https://support.jennifersoft.com:7979/login/sso?id=iframe&password=1234
```

When user authentication is completed, the user is redirected to the preset start screen, but simply specify the path of the JENNIFER screen to be redirected in the 'redirect' parameter as follows. However, it is safe to encode through the encodeURIComponent function, a JavaScript native function.

```shell
https://support.jennifersoft.com:7979/login/sso?id=iframe&password=1234&redirect=%2Fuserdefine%2Fdashboard%3Fkey%3Dffca2b8b-4b35-4688-8282-c236e0d30b3c%26layout%3Diframe
```

The actual URL of user authentication and redirect URL is as follows. To remove the left menu, the value of the 'layout' parameter is set to 'iframe'.

```shell
https://support.jennifersoft.com:7979/userdefine/dashboard?key=ffca2b8b-4b35-4688-8282-c236e0d30b3c&layout=iframe
```

## Utilizing XView transaction analysis popup

When linking JENNIFER with other solutions, the most used screen is the XView transaction analysis popup. A user open the XView transaction analysis popup through the URL querystring as follows.

```shell
https://support.jennifersoft.com:7979/popup/xviewAnalysis?domainId=3000&transactionId=-1523200512219595557&searchTime=1653453568146
```

if users use the 'redirect' parameter without an SSO login adapter, you will be redirected to the login page if you are not logged in, and redirected back to the corresponding screen after logging in.

```shell
https://support.jennifersoft.com:7979/popup/xviewAnalysis?domainId=3000&transactionId=-1523200512219595557&searchTime=1653453568146&redirect=%2Fpopup%2FxviewAnalysis%3FdomainId%3D3000%26transactionId%3D-1523200512219595557%26searchTime%3D1653453568146
```
If users are using the SSO login adapter, user can open the XView transaction analysis popup directly from the outside with the URL below.

```shell
https://support.jennifersoft.com:7979/login/sso?id=iframe&password=1234&redirect=%2Fpopup%2FxviewAnalysis%3FdomainId%3D3000%26transactionId%3D-1523200512219595557%26searchTime%3D1653453568146
```
