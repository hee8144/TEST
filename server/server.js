const express = require("express");
const cors = require("cors");
const path = require("path");
const oracledb = require("oracledb");

const app = express();
app.use(cors());

// ejs 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, ".")); // .은 경로

const config = {
  user: "SYSTEM",
  password: "test1234",
  connectString: "localhost:1521/xe",
};

// Oracle 데이터베이스와 연결을 유지하기 위한 전역 변수
let connection;

// 데이터베이스 연결 설정
async function initializeDatabase() {
  try {
    connection = await oracledb.getConnection(config);
    console.log("Successfully connected to Oracle database");
  } catch (err) {
    console.error("Error connecting to Oracle database", err);
  }
}

initializeDatabase();

// 엔드포인트
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/emp/list", async (req, res) => {
  const { deptNo } = req.query;

  let query = "";
  if (deptNo != "" && deptNo != null) {
    query += `WHERE E.DEPTNO = ${deptNo} `;
  }
  try {
    const result = await connection.execute(`SELECT * FROM EMP E INNER JOIN DEPT D ON E.DEPTNO = D.DEPTNO ` + query + `ORDER BY SAL DESC`);
    const columnNames = result.metaData.map((column) => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map((row) => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
      result: "success",
      list: rows,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Error executing query");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/login", async (req, res) => {
  const { userId, password } = req.query;

  try {
    const result = await connection.execute(`SELECT * FROM TB_USER WHERE USERID ='${userId}' AND PASSWORD ='${password}'`);
    
    console.log(`SELECT * FROM TB_USER WHERE USERID ='${userId}' AND PASSWORD ='${password}'`);
    
    const columnNames = result.metaData.map((column) => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map((row) => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
      result: "success",
      info: rows,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Error executing query");
  }
});

app.get("/user/list", async (req, res) => {
  const {userId} = req.query;
  let query=""
  if (userId != "" && userId != null) {
    query = `WHERE USERID = '${userId}'`;
  }
  try {
    const result = await connection.execute(`SELECT U.*, TO_CHAR(CDATETIME , 'YYYY-MM-DD') CDATE FROM TB_USER U `+query );
    const columnNames = result.metaData.map((column) => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map((row) => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
      result: "success",
      list: rows,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Error executing query");
  }
});

app.get("/user/insert", async (req, res) => {
  const { userId, email, password, name, birth, phone, gender, athority } = req.query;

  try {
    await connection.execute(
      `INSERT INTO TB_USER VALUES (:userId , :password , :name , :birth , :phone , :email , :gender , SYSDATE ,:athority )`,
      [userId, password, name, birth, phone, email, gender, athority],
      { autoCommit: true }
    );
    res.json({
      result: "success",
    });
  } catch (error) {
    console.error("Error executing insert", error);
    res.status(500).send("Error executing insert");
  }
});

app.get("/emp/delete", async (req, res) => {
  const { empNo } = req.query;
  try {
    await connection.execute(`DELETE FROM EMP WHERE EMPNO = :empNo`, [empNo], { autoCommit: true });
    res.json({
      result: "success",
    });
  } catch (error) {
    console.error("Error executing insert", error);
    res.status(500).send("Error executing insert");
  }
});

app.get("/user/check", async (req, res) => {
  const { userId } = req.query;

  try {
    const result = await connection.execute(`SELECT * FROM TB_USER WHERE USERID = '${userId}'`);
    const columnNames = result.metaData.map((column) => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map((row) => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
      result: "success",
      list: rows,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Error executing query");
  }
});

app.get("/user/delete", async (req, res) => {
  const { removeList } = req.query;
  let query ="DELETE FROM TB_USER WHERE USERID IN("
  if(removeList.length==1){
    for(let i =0; i<removeList.length;i++){
      query+=`'${removeList[i]}`
      if(removeList.length-1 !=i){
        query+=",";
      }
    }
  }else{
    query+=`'${removeList}'`;
  }
  
  query+=")"
  let reserveQuery ="DELETE FROM TB_RESERVE WHERE USERID IN("
  if(removeList.length==1){
    for(let i =0; i<removeList.length;i++){
      reserveQuery+=`'${removeList[i]}'`
      if(removeList.length-1 !=i){
        reserveQuery+=",";
      }
    }
  }else{
    reserveQuery+=`'${removeList}'`;
  }
    reserveQuery+=")"

    console.log(reserveQuery);
  try {
    await connection.execute(query, [], { autoCommit: true });
    await connection.execute(reserveQuery, [], { autoCommit: true });
    res.json({
      result: "success",
    });
  } catch (error) {
    console.error("Error executing delete", error);
    res.status(500).send("Error executing delete");
  }
});

app.get('/user/edit', async (req, res) => {
  const { password, email, phone, birth, gender, userId } = req.query;

  try {
    await connection.execute(
      `UPDATE TB_USER SET PASSWORD = :password, EMAIL =:email , PHONE = :phone , BIRTH = :birth ,GENDER= :gender WHERE USERID = :userId`,
      [password, email, phone, birth, gender, userId],
      { autoCommit: true }
    );
    res.json({
        result : "success"
    });
  } catch (error) {
    console.error('Error executing update', error);
    res.status(500).send('Error executing update');
  }
});


app.get("/doctor/list", async (req, res) => {
  const {} = req.query;

  try {
    const result = await connection.execute(`SELECT * FROM TB_USER WHERE ATHORITY ='D'`);

    const columnNames = result.metaData.map((column) => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map((row) => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
      result: "success",
      list: rows,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Error executing query");
  }
});

app.get("/reserve/insert", async (req, res) => {
  const { redate, userId, status, doctorName, start_time, end_time } = req.query;

  try {
    await connection.execute(
      `INSERT INTO TB_RESERVE VALUES (B_SEQ.NEXTVAL, TO_DATE(:redate ,'YYYY-MM-DD'), :userId , :status , :doctorName , 'X' , TO_DATE(:start_time, 'YYYY-MM-DD HH24:MI'), TO_DATE(:end_time, 'YYYY-MM-DD HH24:MI'))`,
      [redate, userId, status, doctorName, start_time, end_time],
      { autoCommit: true }
    );
    res.json({
      result: "success",
    });
  } catch (error) {
    console.error("Error executing insert", error);
    res.status(500).send("Error executing insert");
  }
});

app.get("/reserve/list", async (req, res) => {
  const { userId , reserveNo,pageSize , offset , name} = req.query;
  let query = "";
  let subQuery="";
  if (userId != "" && userId != null && userId!="admin") {
    query = `WHERE USERID = '${userId}'`;
    subQuery = `WHERE USERID = '${userId}'`;
  }
  if (name != "" && name != null) {
    query=`WHERE DOCTORNAME ='${name}'`;
    subQuery =`WHERE DOCTORNAME ='${name}'`;
  }
  if (reserveNo != "" && reserveNo != null) {
    query = `WHERE RESERVENO = '${reserveNo}'`;
  }

  if(pageSize !="" && pageSize !=null & offset!="" && offset !=null){
    query +=` OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`;
  }


  try {
    const result = await connection.execute(
      `SELECT R.*, TO_CHAR(START_TIME, 'HH24:mm')AS STIME , TO_CHAR(REDATE, 'YYYY-MM-DD')AS RDATE FROM TB_RESERVE R ` + query
    );

    const columnNames = result.metaData.map((column) => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map((row) => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });

     const count = await connection.execute(
      `SELECT COUNT(*)  FROM TB_RESERVE `+subQuery
    );
    res.json({
      result: "success",
      list: rows,
      count :count.rows[0][0]
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Error executing query");
  }
});

app.get("/reserve/check", async (req, res) => {
  const { start_time } = req.query;
 
  try {
    const result = await connection.execute(
      `SELECT * FROM TB_RESERVE WHERE TO_CHAR(START_TIME ,'yyyy-mm-dd:hh24:mm') =:start_time`,[start_time]
    );

    const columnNames = result.metaData.map((column) => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map((row) => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
      result: "success",
      list: rows,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Error executing query");
  }
});

app.get("/reserve/delete", async (req, res) => {
  const { reserveNo } = req.query;
  try {
    await connection.execute(`DELETE FROM TB_RESERVE WHERE RESERVENO = :reserveNo`, [reserveNo], { autoCommit: true });
    res.json({
      result: "success",
    });
  } catch (error) {
    console.error("Error executing DELETE", error);
    res.status(500).send("Error executing DELETE");
  }
});

app.get('/reserve/edit', async (req, res) => {
  const { REDATE, USERID, STATUS, DOCTORNAME, START_TIME, END_TIME ,reserveNo} = req.query;

  try {
    await connection.execute(
      `UPDATE TB_RESERVE SET  REDATE = TO_DATE(:REDATE ,'YYYY-MM-DD'), USERID =:USERID , STATUS = :STATUS , DOCTORNAME = :DOCTORNAME ,START_TIME= TO_DATE(:START_TIME, 'YYYY-MM-DD HH24:MI'),END_TIME= TO_DATE(:END_TIME, 'YYYY-MM-DD HH24:MI') WHERE RESERVENO = :reserveNo`,
      [REDATE, USERID, STATUS, DOCTORNAME, START_TIME, END_TIME ,reserveNo],
      { autoCommit: true }
    );
    res.json({
        result : "success"
    });
  } catch (error) {
    console.error('Error executing update', error);
    res.status(500).send('Error executing update');
  }
});

app.get('/solution', async (req, res) => {
  const { reserveNo ,userId ,doctorName , symptoms , diagnosis ,prescription} = req.query;

  try {
    await connection.execute(
      `UPDATE TB_RESERVE SET SOLUTION ='O' WHERE RESERVENO = :reserveNo`,
      [reserveNo],
      { autoCommit: true }
    );
    await connection.execute(
      `INSERT INTO TB_RECORD VALUES(:reserveNo , :userId , :doctorName , :symptoms , :diagnosis , :prescription)`,
      [reserveNo ,userId ,doctorName , symptoms , diagnosis ,prescription],
      { autoCommit: true }
    );
    res.json({
        result : "success"
    });
  } catch (error) {
    console.error('Error executing update', error);
    res.status(500).send('Error executing update');
  }
});

app.get("/solution/list", async (req, res) => {
  const {userId} = req.query;

  try {
    const result = await connection.execute(`SELECT * FROM TB_RECORD WHERE USERID ='${userId}'`,);
    

    const columnNames = result.metaData.map((column) => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map((row) => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
      result: "success",
      list: rows,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Error executing query");
  }
});

app.get("/admin/userList", async (req, res) => {
  const { pageSize , offset } = req.query;

  try {
    const result = await connection.execute(
      `SELECT U.*, TO_CHAR(CDATETIME , 'YYYY-MM-DD') CDATE FROM TB_USER U OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY` 
    );

    const columnNames = result.metaData.map((column) => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map((row) => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
     const count = await connection.execute(
      `SELECT COUNT(*)  FROM TB_USER`
    );
    res.json({
      result: "success",
      list: rows,
      count :count.rows[0][0]
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Error executing query");
  }
});

app.get("/findId", async (req, res) => {
  const {name , email} = req.query;
  try {
    const result = await connection.execute(`SELECT USERID FROM TB_USER WHERE NAME=:name AND EMAIL = :email`,[name , email] );
    const columnNames = result.metaData.map((column) => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map((row) => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
      result: "success",
      list: rows,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Error executing query");
  }
});

// 서버 시작
app.listen(3009, () => {
  console.log("Server is running on port 3009");
});