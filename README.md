### 1.프로젝트 소개
---
병원 예약 관리 및 고객관리 사이트입니다.



### 2.개발기간
---
+ 2025-09-12 ~ 2025-09-18


### 3.주요기능
---
+ 1.회원가입 및 로그인

  ![로그인](https://github.com/hee8144/image/blob/main/login.png) ![회원가입](https://github.com/hee8144/image/blob/main/join.png)
  회원가입 페이지는 의사 , 환자 선택할수 있게 분류 , 성별도 비슷하게 구현했습니다.
  아이디는 중복체크를 해야 가입할수있게했고 비밀번호 및 이메일은 정규식을 통과해야 가입할수있게 구현했습니다.
  번호는 4자리까지 및 숫자만 입력할수있게 구현했습니다.
  아이디 찾기는 팝업창에서 이름 ,이메일이 일치하면 알려드리게 구현하였고 ,
  비밀번호 찾기는 이름 , 아이디가 맞으면 비밀번호를 변경할수있게 구현하였습니다.

+ 2.예약하기

  ![예약하기](https://github.com/hee8144/image/blob/main/reserve.png)
  예약하기 페이지는 Fullcaledar 라이브러리를 활용하여 크게 일정을 보여주고
  예약하고 싶은 날짜를 클릭하면 팝업창으로 예약을 받을수 있게 구현했습니다.

+ 3.예약확인
+ 
  ![예약확인](https://github.com/hee8144/image/blob/main/usercheckreserve.png) ![의사예약확인](https://github.com/hee8144/image/blob/main/docorcheckreserve.png)
  예약확인 페이지는 회원가입 페이지에서 환자를 선택한 아이디로 로그인을 하면 예약을 취소 및 수정을 할수있지만.
  의사나 관리자 아이디로 접속할시 진료 내용 및 처방을 작성할수있는 버튼이 나오도록 구현했습니다.

+ 4.마이페이지 및 관리자페이지

  ![마이페이지](https://github.com/hee8144/image/blob/main/mypage.png) ![관리자페이지](https://github.com/hee8144/image/blob/main/userManagement.png)
  로그인할때 환자및 의사 아이디면 마이페이지로 보이고 관리자 아이디로 로그인시 관리자페이지로 보이게 구현.
  마이페이지에서는 현재까지의 예약및 진료기록 을 보실수있고 개인정보를 수정할수있습니다.
  관리자페이지에서는 모든 회원정보 및 회원삭제 , 정보 수정을 할수있고 이름을 클릭시 진료기록을 볼수있습니다.

+ 5.메인페이지

  ![메인페이지](https://github.com/hee8144/image/blob/main/userMain.png)
  메뉴부분에서는 관리자이면 마이페이지 대신 회원관리 페이지로 바뀝니다.
  메인페이지는 swiper slide 를 사용하여 3개의 이미지를 자동으로 움직이게 구현하였고,
  kakaomap api 를 이용하여 찾아오시는 길을 구현하였습니다.



  
