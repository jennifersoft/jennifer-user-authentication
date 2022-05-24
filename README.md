# 제니퍼 사용자 인증 활용하기

제니퍼 화면 및 대시보드 Iframe 연동 샘플입니다.

본 샘플에서 다룰 내용은 다음과 같습니다.

 - URL 쿼리 스트링으로 제니퍼 인증하는 SSO 어댑터 구현하기
 - SSO 어댑터를 활용한 제니퍼 화면 열기
 - SSO 어댑터를 활용한 제니퍼 대시보드 Iframe으로 호출하기

server_view.conf 파일에서 다음과 같은 옵션을 추가해놔야 함 (add_same_site_none_cookie = true)

You may serve it with a static server:

npm install -g serve
serve -s build