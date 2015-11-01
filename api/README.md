# poll.iwog API documentation version v1
http://server/api/

---

## /polls

### /polls

* **get**: Get list of polls.
* **post**: Create a new poll.

### /polls/{pollId}

* **get**: Get the poll with pollId = {pollId}.

* **put**: Update the poll with pollId = {pollId}.

* **patch**: Update partially the poll with pollId = {pollId}.

* **delete**: Delete the poll with pollId = {pollId}.

### /polls/{pollId}/participations

* **get**: Get list of participations.
* **post**: Create a new participation.

### /polls/{pollId}/participations/{participationId}

* **get**: Get the participation with participationId = {participationId}.

* **put**: Update the participation with participationId = {participationId}.

* **patch**: Update partially the participation with participationId = {participationId}.

* **delete**: Delete the participation with participationId = {participationId}.

### /polls/{pollId}/participations/{participationId}/answers

* **get**: Get list of answers.
* **post**: Create a new answer.

### /polls/{pollId}/participations/{participationId}/answers/{answerId}

* **get**: Get the answer with answerId = {answerId}.

* **put**: Update the answer with answerId = {answerId}.

* **patch**: Update partially the answer with answerId = {answerId}.

* **delete**: Delete the answer with answerId = {answerId}.

### /polls/{pollId}/questions

* **get**: Get list of questions.
* **post**: Create a new question.

### /polls/{pollId}/questions/{questionId}

* **get**: Get the question with questionId = {questionId}.

* **put**: Update the question with questionId = {questionId}.

* **patch**: Update partially the question with questionId = {questionId}.

* **delete**: Delete the question with questionId = {questionId}.

### /polls/{pollId}/questions/{questionId}/choices

* **get**: Get list of choices.
* **post**: Create a new choice.

### /polls/{pollId}/questions/{questionId}/choices/{choiceId}

* **get**: Get the choice with choiceId = {choiceId}.

* **put**: Update the choice with choiceId = {choiceId}.

* **patch**: Update partially the choice with choiceId = {choiceId}.

* **delete**: Delete the choice with choiceId = {choiceId}.

