package com.aries.urlsso;

import com.aries.extension.data.UserData;
import com.aries.extension.handler.SSOLoginHandler;
import com.aries.extension.util.LogUtil;
import com.aries.extension.util.PropertyUtil;

import javax.servlet.http.HttpServletRequest;

public class SSOLoginAdapter implements SSOLoginHandler {
    public UserData preHandle(HttpServletRequest request) {
        String id = request.getParameter("id");
        String password = request.getParameter("password");

        if (id != null && password != null) {
            LogUtil.info("Logging in with querystring : " + id + "," + password);
            return new UserData(id, password);
        } else {
            String defaultId = PropertyUtil.getValue("url-sso", "DEFAULT_ID", "guest");
            String defaultPassword = PropertyUtil.getValue("url-sso", "DEFAULT_PASSWORD", "guest");

            LogUtil.info("Logging in with properties : " + id + "," + password);
            return new UserData(defaultId, defaultPassword);
        }
    }
}