# Polliwog API documentation
http://polliwog-app.herokuapp.com/api/

### Contributors
* Eléonore d'Agostino ([paranoodle](https://github.com/paranoodle))
* Karim Ghozlani ([gweezer7](https://github.com/gweezer7))
* Yassin Kammoun ([yibnl](https://github.com/yibnl))
* Paul Ntawuruhunga ([paulnta](https://github.com/paulnta))

---

## /lectures

### /lectures

* **get**: Get list of lectures.
* **post**: Create a new lecture.

### /lectures/{lectureId}

* **get**: Get the lecture with lectureId = {lectureId}.

* **put**: Update the lecture with lectureId = {lectureId}.

* **patch**: Update partially the lecture with lectureId = {lectureId}.

* **delete**: Delete the lecture with lectureId = {lectureId}.

### /lectures/{lectureId}/polls

* **get**: Get list of polls.
* **post**: Create a new poll.

### /lectures/{lectureId}/polls/{pollId}

* **get**: Get the poll with pollId = {pollId}.

* **put**: Update the poll with pollId = {pollId}.

* **patch**: Update partially the poll with pollId = {pollId}.

* **delete**: Delete the poll with pollId = {pollId}.

### /lectures/{lectureId}/polls/{pollId}/questions

* **get**: Get list of questions.
* **post**: Create a new question.

### /lectures/{lectureId}/polls/{pollId}/questions/{questionId}

* **get**: Get the question with questionId = {questionId}.

* **put**: Update the question with questionId = {questionId}.

* **patch**: Update partially the question with questionId = {questionId}.

* **delete**: Delete the question with questionId = {questionId}.

