# jeiu-gradu

인천재능대학교 캡스톤 디자인 때문에 제작했었던 웹 페이지입니다. 2학년 1학기에 제작했었고, 2학기 시작하면서 팀이 없어졌기 때문에, 개발중지하였습니다.

## 개요
[사이트 참고](https://jeiu-gradu.herokuapp.com/map)

학교 근처에 있는 음식점 정보를 알려주는 웹 페이지입니다.
팀원들하고 주제를 정하고 상의하면서 이러한 웹 페이지를 만들기로 정했고, 라이브러리를 제외한 대부분의 코딩은 저 혼자서 작업했습니다.  
또한 백엔드 프로그래밍이 제한되어서 프론트 엔트에서 자바스크립트를 이용하여 작성하였습니다.

이로 인해 db접근이 안되기 때문에 변수에다 저장하는 방식으로 하였기 때문에, 새로 고침을 하면 초기화 됩니다.  

heroku에 작업한 결과물을 올려서 다른 사람들도 볼 수 있게 만들고, 라우팅 처리를 하여 주소 구분을 하고, 영상 작업때문에 만든 socket.io를 이용한 실시간 블로그 댓글을 위해 서버쪽은 일단은 node.js를 사용하였습니다.

## 기능
메인페이지에 들어가게 되면, 메인이 되는 위치를 인천재능대학교로 설정하였고, 대학교 마커와, 일반 음식점 마커를 구분지었습니다.
대학교 마커를 클릭하면 간단하게 대학교 정보를 볼 수 있도록 표시가 되고, 현재 학교를 선택하여 이 학교 근처에 있는 음식점을 거리별로 표시/비표시 되도록 설정할 수 있습니다.  

음식점 마커를 클릭하면 음식점 정보와 평점을 확인할 수 있습니다. 이름 옆에 있는 화살표를 선택하면 상세보기 페이지로 넘어가며, 로그인 이후에 평점과 2000자 미만의 리뷰를 작성할 수 있습니다.
작성 후 평점은 음식점 평균 평점에 반영이 됩니다

위에 검색바를 통하여 현재 있는 음식점 또는 해시 태그를 이용하여 검색할 수 있고 누르면 해당 음식점의 위치로 이동됩니다.
음식 카테고리를 지정하여, 선택을 하면 일치하는 음식점이 필터링 되어 검색이 됩니다.

다시 상단에 왼쪽 버튼을 누르게 되면, 사이드 메뉴가 나오며, 음식점 찾는 항목과, 옵션 메뉴가 뜨지만 미개발 상태입니다.  

오른쪽 로그인 버튼을 누르면 모달이 나오면서 로그인, 회원가입, 아이디/비밀번호 찾기를 할 수 있고, 아래에 있는 소셜로그인 기능도 로그인이 일부 가능합니다.
기본적으로 관리자 계정이 미리 등록이 되어 있고, 회원가입을 통해 계정을 새로 생성 후에, 로그인을 할 수 있습니다.

아이디 비밀번호 찾기는 아이디의 경우 가입했던 이메일을 통해 찾을 수 있고, 비밀번호는 가입할 때 입력했던 비밀번호 찾기 질문과 답을 통해 비밀번호를 재설정을 할 수 있습니다.  

지도 확대 축소 바 밑에 있는 버튼을 누르면 자신의 현재 위치를 알 수 있지만 pc의 경우는 정확한 위치를 알 수 없습니다.  

지도에서 마우스 오른쪽 버튼을 눌러 현재 위치에서 학교나 음식점을 추가 시킬 수 있도록 만들다가 시간 상의 이유로 개발을 다 못했습니다.

## 설치 방법
이 레포지토리를 설치 이후에 터미널(윈도우 사용자인 경우에는 cmd)에서 현재 폴더로 띄우시고 npm install 명령어를 통해 필요한 모듈을 설치합니다.  

이후 카카오 디벨로퍼에서 앱을 하나 만들어서 발급받은 api 키를 등록해 주셔야 합니다. views/index.html에서 주어진 장소에 api키를 입력해주세요  

소셜 로그인 기능을 원하시는 분들은 카카오 말고도, 네이버, 구글, 페이스북에서 각각 발급받아 주세요  

그 다음에 npm start 명령어를 통해 서버를 열고, 웹 브라우저에서 127.0.0.1:3000로 접속을 하시면 됩니다.