const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors())
app.use(express.json());
//db connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Proctor_db'
});
// table data
app.get('/tableData/:staff_mail', async (req, res) => {
  try {
    const mail = req.params.staff_mail;

    const sqlQuerry = 'select * from login_student where staff_mail=?;'
    const value = [mail];
    db.query(sqlQuerry, value, (err, results) => {
      if (err) {
        console.log(err)
        return;
      }
      return res.json(results)
    });

  } catch (error) {
    console.error('Error deleting MCQ question bank:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
// student add details
app.put('/studentInsert', (req, res) => {
  console.log(req.body);
  const sqlQuerry = 'INSERT INTO login_student (student_name,RegNo,staff_mail,student_pass) values(?,?,?,?)'
  const values = [req.body.Studentname, req.body.StudentRegNo, req.body.staff_mail, req.body.StudentRegNo]
  db.query(sqlQuerry, values, (err, results) => {
    if (err) {
      console.log(err)
      return;
    }
    return res.json(results)
  });
})
// test banks
app.get('/testData/:staff_mail', (req, res) => {
  const sqlQuery = 'SELECT * FROM TestBanks WHERE staff_mail = ?';
  const staff_mail = req.params.staff_mail;
  const values = [staff_mail];

  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});

//MCQ AND CODE TEST CREATION
app.put('/codeAndMCQ', (req, res) => {
  console.log(req.body);
  const testName = req.body.Tname;
  const testDate = req.body.Tdate;
  const duration = req.body.Tduration;
  const codeBankID = req.body.Tquestionbank;
  const MCQBankID = req.body.questionbank;
  const startTime = req.body.Tstarttime;
  const testType = 'CODING AND MCQ';
  const MCQcount = req.body.TMcount;
  const codeCount = req.body.TCcount;
  const totalQustions = MCQcount + codeCount;
  const staff_mail = req.body.staff_mail;
  const sqlQuerry = 'INSERT INTO TestBanks (TestName,TestDuration,TestDate,QuestionBankId,startTime,questionCount,TestType,CodingQuestionBankID,staff_mail) values(?,?,?,?,?,?,?,?,?);'
  const values = [testName, duration, testDate, MCQBankID, startTime, totalQustions, testType, codeBankID, staff_mail];
  db.query(sqlQuerry, values, (err, results) => {
    if (err) {
      ``
      console.log(err)
      return;
    }
    const testBankId = results.insertId;
    const sql1 = "INSERT INTO TestQuestions (TestBankID, QuestionID, Coption)   SELECT ? as TestBankID, QuestionID,Coption FROM Questions  WHERE QuestionBankID = ?;   ";
    const value1 = [testBankId, MCQBankID];
    const sql2 = "INSERT INTO TestQuestions (TestBankID, QuestionID)   SELECT ? as TestBankID, CodingQuestionID FROM CodingQuestions  WHERE CodingQuestionBankID = ?;   ";
    const value2 = [testBankId, codeBankID];
    db.query(sql1, value1, (err, results) => {
      if (err) {
        console.log(err)
        return;
      }
      db.query(sql2, value2, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
      })
      return res.json(results)
    });
  });
})

//code test creation
app.put('/codeTestCreate', (req, res) => {
  console.log(req.body);
  const testName = req.body.Tname;
  const testDate = req.body.Tdate;
  const duration = req.body.Tduration;
  const bankId = req.body.Tquestionbank;
  const startTime = req.body.Tstarttime;
  const testType = 'CODING';
  const questionCount = req.body.Tcount;
  const staff_mail = req.body.staff_mail;
  const sqlQuerry = 'INSERT INTO TestBanks (TestName,TestDuration,TestDate,QuestionBankId,startTime,questionCount,TestType,staff_mail) values(?,?,?,?,?,?,?,?);'
  const values = [testName, duration, testDate, bankId, startTime, questionCount, testType, staff_mail];
  db.query(sqlQuerry, values, (err, results) => {
    if (err) {
      ``
      console.log(err)
      return;
    }
    const testBankId = results.insertId;
    const sql1 = "INSERT INTO TestQuestions (TestBankID, QuestionID)   SELECT ? as TestBankID, CodingQuestionID FROM CodingQuestions  WHERE CodingQuestionBankID = ?;   ";
    const value1 = [testBankId, bankId];
    db.query(sql1, value1, (err, results) => {
      if (err) {
        console.log(err)
        return;
      }

    });
    return res.json(results)
  });
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to the database');
});
//test creation for staff
app.put('/staffTestCreation', (req, res) => {
  console.log(req.body);
  const testName = req.body.testName;
  const testDate = req.body.date;
  const duration = req.body.duration;
  const bankId = req.body.bankName;
  const startTime = req.body.startTime;
  const testType = req.body.testType;
  const questionCount = req.body.questionCount;
  const staff_mail = req.body.staff_mail;
  const sqlQuerry = 'INSERT INTO TestBanks (TestName,TestDuration,TestDate,QuestionBankId,startTime,questionCount,TestType,staff_mail) values(?,?,?,?,?,?,?,?);'
  const values = [testName, duration, testDate, bankId, startTime, questionCount, testType, staff_mail];
  db.query(sqlQuerry, values, (err, results) => {
    if (err) {
      console.log(err)
      return;
    }
    const testBankId = results.insertId;
    const sql1 = "INSERT INTO TestQuestions (TestBankID, QuestionID, Coption)   SELECT ? as TestBankID, QuestionID,Coption FROM Questions  WHERE QuestionBankID = ?;   ";
    const value1 = [testBankId, bankId];
    db.query(sql1, value1, (err, results) => {
      if (err) {
        console.log(err)
        return;
      }

    });
    return res.json(results)
  });
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to the database');
});
//code drop down
app.get('/codeDrop', (req, res) => {
  const sqlQuerry = 'select BankName,codingQuestionBankID from CodingQuestionBanks;'
  db.query(sqlQuerry, (err, results) => {
    if (err) {
      console.log(err)
      return;
    }
    return res.json(results)
  });
})
//login data
app.put('/login', (req, res) => {
  console.log(req.body);
  const sqlQuerry = 'SELECT * FROM login_staff WHERE staff_mail=? AND staff_pass=?;';
  const values = [req.body.uname, req.body.pass];
  db.query(sqlQuerry, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 1) {
      // If row size is one, send success message
      return res.status(200).json({ success: true });
    } else {
      return res.json({ success: false, message: "Invalid username or password" });
    }
  });
});
//dropDown
app.get('/drop', (req, res) => {
  const sqlQuerry = 'select BankName,BankID from MCQBanks;'
  db.query(sqlQuerry, (err, results) => {
    if (err) {
      console.log(err)
      return;
    }
    return res.json(results)
  });
})
// MCQ Delete
app.get('/MCQDelete/:bankId', async (req, res) => {
  try {
    const bankId = req.params.bankId;

    // Check if the MCQ question bank exists
    const existingBank = await db.query('SELECT * FROM   MCQBanks WHERE BankID = ?', [bankId]);
    if (existingBank.length === 0) {
      return res.status(404).json({ error: 'MCQ question bank not found' });
    }

    // Delete associated options for MCQ questions of the specified question bank
   

    // Delete associated MCQ questions
    await db.query('DELETE FROM Questions WHERE QuestionBankID = ?', [bankId]);

    // Delete the MCQ question bank
    await db.query('DELETE FROM MCQBanks WHERE BankID = ?', [bankId]);

    return res.status(200).json({ message: 'MCQ question bank deleted successfully' });
  } catch (error) {
    console.error('Error deleting MCQ question bank:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


//coding bank delete
app.get('/CodequestionDelete/:bankId', async (req, res) => {
  try {
    const bankId = req.params.bankId;

    // Check if the coding question bank exists
    const existingBank = await db.query('SELECT * FROM CodingQuestionBanks WHERE CodingQuestionBankID = ?', [bankId]);
    if (existingBank.length === 0) {
      return res.status(404).json({ error: 'Coding question bank not found' });
    }

    // Delete associated coding questions first
    await db.query('DELETE FROM CodingQuestions WHERE CodingQuestionBankID = ?', [bankId]);

    // Delete the coding question bank
    await db.query('DELETE FROM CodingQuestionBanks WHERE CodingQuestionBankID = ?', [bankId]);

    return res.status(200).json({ message: 'Coding question bank deleted successfully' });
  } catch (error) {
    console.error('Error deleting coding question bank:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/Codequestion/:questionBankId', async (req, res) => {
  try {
    const questionBankId = req.params.questionBankId;
    console.log(questionBankId);
    const sqlQuery = 'SELECT * FROM CodingQuestions WHERE CodingQuestionBankID = ?';
    const values1 = [questionBankId];
    db.query(sqlQuery, values1, (err, questionResults) => {
      if (err) {
        console.error('Error fetching questions:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const questions = questionResults.map(question => ({
        QuestionID: question.CodingQuestionID,
        QuestionText: question.QuestionText,
        SampleInput: question.SampleInput,
        SampleOutput: question.SampleOutput,
        HiddenInputTestCaseI: question.HiddenInputTestCaseI,
        HiddenOutputTestCaseI: question.HiddenOutputTestCaseI,
        HiddenInputTestCaseII: question.HiddenInputTestCaseII,
        HiddenOutputTestCaseII: question.HiddenOutputTestCaseII,
        HiddenInputTestCaseIII: question.HiddenInputTestCaseIII,
        HiddenOutputTestCaseIII: question.HiddenOutputTestCaseIII,
        Constraints: question.Constraints,
        TimeLimit: question.TimeLimit,
        StorageLimit: question.StorageLimit
      }));
      res.status(200).json(questions);
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//questions fetching
app.get('/question/:questionBankId', async (req, res) => {
  try {
    const questionBankId = req.params.questionBankId;
    console.log(questionBankId);
    const sqlQuery = 'SELECT * FROM Questions WHERE QuestionBankID = ?';
    const values1 = [questionBankId];


    db.query(sqlQuery, values1, (err, questionResults) => {
      if (err) {
        console.error('Error fetching questions:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const questions = questionResults;
      res.status(200).json(questions);
    });


  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//code bank fetch
app.get('/codingData/:staff_mail', (req, res) => {
  const staff_mail = req.params.staff_mail;
  const sqlQuerry = 'select * from CodingQuestionBanks where staff_mail=?;'
  const values = [staff_mail];
  db.query(sqlQuerry, values, (err, results) => {
    if (err) {
      console.log(err)
      return;
    }
    return res.json(results)
  });
})
//bank data fetch
app.get('/questionBankData/:staff_mail', (req, res) => {
  const staff_mail = req.params.staff_mail;
  
  const sqlQuerry = 'select * from MCQBanks where staff_mail=?'
  const values = [staff_mail];
  db.query(sqlQuerry, values, (err, results) => {
    if (err) {
      console.log(err)
      return;
    }
    return res.json(results)
  });

})
//coding question bank creation
app.put('/codingBank', upload.single('file'), async (req, res) => {
  try {
    console.log(req.body.CodingBankName);
    const bank = req.body.CodingBankName;
    const type = req.body.CodingBankType;
    const difficulty = req.body.CodingBankDifficulty;
    const file = '/home/jithu/Documents/coding.xlsx';

    console.log(file);

    const workbook = xlsx.readFile(file);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const sql = 'INSERT INTO CodingQuestionBanks (BankName, BankType, BankDifficulty, CreatedDate,staff_mail) VALUES (?, ?, ?, NOW(),"jegan")';
    const values = [bank, type, difficulty];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ action: 'error' });
      }

      const bankId = result.insertId;

      const insertQueries = data.map(row => {
        const questionText = row['QuestionText'];
        const SampleInput = row['SampleInput'];
        const SampleOutput = row['SampleOutput'];
        const HiddenInputTestCaseI = row['HiddenInputTestCaseI'];
        const HiddenOutputTestCaseI = row['HiddenOutputTestCaseI'];
        const HiddenInputTestCaseII = row['HiddenInputTestCaseII'];
        const HiddenOutputTestCaseII = row['HiddenOutputTestCaseII'];
        const HiddenInputTestCaseIII = row['HiddenInputTestCaseIII'];
        const HiddenOutputTestCaseIII = row['HiddenOutputTestCaseIII'];
        const constraint = row['Constraints'];
        const time = row['TimeLimit'];
        const storage = row['StorageLimit'];

        return new Promise((resolve, reject) => {
          db.query('INSERT INTO CodingQuestions (CodingQuestionBankID, QuestionText, SampleInput, SampleOutput, HiddenInputTestCaseI, HiddenOutputTestCaseI, HiddenInputTestCaseII, HiddenOutputTestCaseII, HiddenInputTestCaseIII, HiddenOutputTestCaseIII, Constraints, TimeLimit, StorageLimit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [bankId, questionText, SampleInput, SampleOutput, HiddenInputTestCaseI, HiddenOutputTestCaseI, HiddenInputTestCaseII, HiddenOutputTestCaseII, HiddenInputTestCaseIII, HiddenOutputTestCaseIII, constraint, time, storage], (err, result) => {
            if (err) {
              console.error(err);
              return reject(err);
            }
            resolve();
          });
        });
      });

      Promise.all(insertQueries)
        .then(() => {
          return res.json({ action: 'Question Created' });
        })
        .catch(error => {
          console.error('Error inserting questions:', error);
          return res.status(500).json({ action: 'error' });
        });
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ action: 'error' });
  }
});

//test creation
app.put('/testCreate', upload.single('file'), async (req, res) => {
  try {
    const bank = req.body.bankName;
    const type = req.body.bankType;
    const difficulty = req.body.bankDifficulty;
    //const staff_mail=req.body.staff_mail
    const file = '/home/jithu/Downloads/sampleQuestion.xlsx';

    console.log(file);

    const workbook = xlsx.readFile(file);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const sql = 'INSERT INTO MCQBanks (BankName, Difficulty, BankType,Date,staff_mail) VALUES (?, ?, ?, NOW(),"jegan")';
    const values = [bank, type, difficulty];

    let bankId;
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ action: 'error' });
      }

      const action = "Question Created";
      bankId = result.insertId;

      const insertQueries = data.map(row => {
        return new Promise((resolve, reject) => {
          const questionText = row['QuestionText'];
          const Coption = row['Coption'];
          const Woption1 = row['Woption1'];
          const Woption2 = row['Woption2'];
          const Woption3 = row['Woption3'];
          // Insert Question
          db.query('INSERT INTO Questions (QuestionBankID, QuestionText,Coption, Woption1,Woption2,Woption3) VALUES (?,?,?,?,?,?)', [bankId, questionText, Coption, Woption1, Woption2, Woption3], (err, result) => {
            if (err) return reject(err);
            const questionId = result.insertId;
          });
        });
      });

      Promise.all(insertQueries)
        .then(() => {
          return res.json({ action });
        })
        .catch(error => {
          console.error('Error inserting questions:', error);
          return res.status(500).json({ action: 'error' });
        });
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ action: 'error' });
  }
});


app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});
