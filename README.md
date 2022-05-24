# 제니퍼 사용자 인증 활용하기

제니퍼 화면 및 대시보드 Iframe 연동 샘플입니다. 고객사 통합 대시보드에 제니퍼 대시보드를 공유하기 URL을 사용하여 Iframe으로 보여주고 있는데, 2개 이상의 Iframe을 사용하거나 제니퍼의 다른 화면으로 이동이 제한되는 문제가 있습니다.

본 샘플에서 다룰 내용은 다음과 같습니다.

 - URL 쿼리 스트링으로 제니퍼 인증하는 SSO 어댑터 구현하기
 - SSO 어댑터를 활용한 제니퍼 화면 열기
 - SSO 어댑터를 활용한 제니퍼 대시보드 Iframe으로 호출하기

## 제니퍼 뷰서버 설정

 1. 크롬의 Iframe 보안 정책으로 인해 제니퍼 뷰서버는 HTTPS로 실행해야 함
 2. server_view.conf -> 'add_same_site_none_cookie = true' 추가
 3. 설정 -> 어댑터 및 플러그인에 'url-sso_jennifer-1.0.0.jar' 추가


![다운로드](https://user-images.githubusercontent.com/1277117/169983899-83c00ad9-da4e-4aff-bae1-d7c6d75df6e6.png)

## 샘플 대시보드 실행

```shell
npm install -g serve
serve -s build
```
