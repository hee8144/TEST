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
  <img src="https://github.com/hee8144/image/blob/main/login.png" height="200"/>
  <img src="https://github.com/hee8144/image/blob/main/join.png" height="200"/>
</p>

* 회원 유형 선택: **의사 / 환자**

---

### 2️⃣ 예약하기

<p align="center">
  <img src="https://github.com/hee8144/image/blob/main/reserve.png" height="220"/>
</p>

---

### 3️⃣ 예약 확인

<p align="center">
  <img src="https://github.com/hee8144/image/blob/main/usercheckreserve.png" height="200"/>
  <img src="https://github.com/hee8144/image/blob/main/docorcheckreserve.png" height="200"/>
</p>

---

### 4️⃣ 마이페이지 및 관리자 페이지

<p align="center">
  <img src="https://github.com/hee8144/image/blob/main/mypage.png" height="200"/>
  <img src="https://github.com/hee8144/image/blob/main/userManagement.png" height="200"/>
</p>

* 로그인 계정에 따라 페이지 분기  
  * 환자 / 의사 → **마이페이지**  
  * 관리자 → **관리자 페이지**

---

### 5️⃣ 메인 페이지

<p align="center">
  <img src="https://github.com/hee8144/image/blob/main/userMain.png" height="300"/>
</p>

* 관리자 로그인 시 메뉴가 **회원 관리 페이지**로 변경
* **Swiper Slide**를 활용한 메인 배너 자동 슬라이드
* **Kakao Map API**를 이용한 찾아오시는 길 구현

---

## 4. 프로젝트 특징

* 역할 기반 권한 분리 (환자 / 의사 / 관리자)
* 실제 병원 예약 흐름을 고려한 UI/UX 설계
* 라이브러리 및 외부 API 적극 활용  
  *(FullCalendar, Swiper, Kakao Map)*

---

## 5. 트러블슈팅

### 🔧 트러블슈팅

**1️⃣ 회원 유형에 따른 화면 분기 문제**

* **문제**: 로그인 시 동일한 화면 노출 문제 발생
* **해결 방법**: Session에 Role 저장 후 조건부 렌더링
* **배운 점**: 권한 설계의 중요성

---

**2️⃣ FullCalendar 데이터 연동 오류**

* **문제**: 일정 즉시 반영되지 않는 문제
* **해결 방법**: CRUD 후 이벤트 재조회
* **배운 점**: 라이브러리 라이프사이클 이해
