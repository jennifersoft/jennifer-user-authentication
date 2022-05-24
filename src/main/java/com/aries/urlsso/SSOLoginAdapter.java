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

        // URL 쿼리스트링으로 제니퍼 사용자 아이디와 비밀번호를 받아올 수 있음
        if (id != null && password != null) {
            LogUtil.info("Logging in with querystring : " + id + "," + password);
            return new UserData(id, password);
        // 제니퍼 사용자 정보를 URL 쿼리스트링으로 노출하기 싫으면 어댑터 옵션에 하드코딩해서 숨길 수 있음
        } else {
            String defaultId = PropertyUtil.getValue("url-sso", "DEFAULT_ID", "guest");
            String defaultPassword = PropertyUtil.getValue("url-sso", "DEFAULT_PASSWORD", "guest");

            LogUtil.info("Logging in with properties : " + id + "," + password);
            return new UserData(defaultId, defaultPassword);
        }
    }
}
