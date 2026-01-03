# 🏥 병원 예약 관리 및 고객 관리 시스템

## 1. 프로젝트 소개

병원 예약 관리와 고객(환자·의사) 관리를 통합적으로 제공하는 웹 사이트입니다.
환자, 의사, 관리자의 역할을 구분하여 **예약·진료·회원 관리** 기능을 효율적으로 처리할 수 있도록 구현했습니다.

---

## 2. 개발 기간

* **2025-09-12 ~ 2025-09-18**

---

## 3. 주요 기능

### 1️⃣ 회원가입 및 로그인

<p align="center">
  <img src="https://github.com/hee8144/image/blob/main/login.png" width="280"/>
  <img src="https://github.com/hee8144/image/blob/main/join.png" width="280"/>
</p>

* 회원 유형 선택: **의사 / 환자**

 2️⃣ 예약하기

<p align="center">
  <img src="https://github.com/hee8144/image/blob/main/reserve.png" width="250"###>
</p>

  3️⃣ 예약 확인

<p align="center">
  <img src="https://github.com/hee8144/image/blob/main/usercheckreserve.png" width="250"/>
  <img src="https://github.com/hee8144/image/blob/main/docorcheckreserve.png" width="250"/>
</p> 

4️⃣ 마이페이지 및 관리자 페이지

<p align="center">
  <img src="https://github.com/hee8144/image/blob/main/mypage.png" width="300"/>
  <img src="https://github.com/hee8144/image/blob/main/userManagement.png" width="300"/>
</p>

* 로그인 계정에 따라 페이지 분기

  * 환자 / 의사 → **마이페이지**
  * 관리자 → **관리자

 5️⃣ 메인 페이지

<p align="center">
  <img src="https://github.com/hee8144/image/blob/main/userMain.png" width="550"/>
</p>

* 관리자 로그인 시 메뉴가 **회원관리 페이지**로 변경
* **Swiper Slide**를 활용한 메인 배너 자동 슬라이드 (3장)
* **Kakao Map API**를 이용한 찾아오시는 길 구현

--- 프로젝트 특징

* 역할 기반 권한 분리 (환자 / 의사 / 관리자)
* 실제 병원 예약 흐름을 고려한 UI/UX 설계
* 라이브러리 및 외부 API 적극 활용 (FullCalendar, Swiper, Kakao Map)

---

## 5. 트러블슈팅

### 🔧 트러블슈팅

**1️⃣ 회원 유형(환자 / 의사 / 관리자)에 따른 화면 분기 문제**

* 로그인 시 동일한 화면이 노출되는 문제가 발생
* **해결 방법**: 로그인 시 세션(Session)에 회원 권한(Role)을 저장하고, 권한 값에 따라 라우팅 및 메뉴를 조건부 렌더링
* **배운 점**: 사용자 권한(Role) 설계의 중요성과 초기 설계 단계에서의 권한 분리 필요성

---

**2️⃣ 예약 중복 문제**

* 동일 시간대에 여러 예약이 등록되는 이슈 발생
* **해결 방법**: 예약 등록 전 DB 조회를 통해 해당 날짜/시간의 예약 존재 여부를 확인 후 제한
* **배운 점**: 단순 UI 검증뿐 아니라 **서버 단 검증 로직의 중요성**을 이해

---

**3️⃣ FullCalendar 일정 데이터 연동 오류**

* 캘린더에 예약 데이터가 즉시 반영되지 않는 문제
* **해결 방법**: 예약 CRUD 이후 캘린더 이벤트를 재조회하도록 로직 수정
* **배운 점**: 외부 라이브러리 사용 시 데이터 흐름과 라이프사이클에 대한 이해의 중요성을 경험
