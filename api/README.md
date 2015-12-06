# Polliwog API documentation
http://polliwog-app.herokuapp.com/api/

### Overview
# TODO IN MARKDOWN

### Getting started
# TODO IN MARKDOWN

### The Privacy Rule
# TODO IN MARKDOWN

### User Roles
# TODO IN MARKDOWN

### Public & private sessions
# TODO IN MARKDOWN

### Concept of Moods
# TODO IN MARKDOWN

### Polls, questions & choices
# TODO IN MARKDOWN

### Contributors
* Eléonore d'Agostino ([paranoodle](https://github.com/paranoodle))
* Karim Ghozlani ([gweezer7](https://github.com/gweezer7))
* Yassin Kammoun ([yibnl](https://github.com/yibnl))
* Paul Ntawuruhunga ([paulnta](https://github.com/paulnta))

---

## /sessions

### /sessions

* **get**: Get list of sessions.
* **post**: Create a new session.

### /sessions/{sessionId}

* **get**: Get the session with sessionId = {sessionId}.

* **put**: Update the session with sessionId = {sessionId}.

* **patch**: Update partially the session with sessionId = {sessionId}.

* **delete**: Delete the session with sessionId = {sessionId}.

### /sessions/{sessionId}/polls

* **get**: Get list of polls.
* **post**: Create a new poll.

### /sessions/{sessionId}/polls/{pollId}

* **get**: Get the poll with pollId = {pollId}.

* **put**: Update the poll with pollId = {pollId}.

* **patch**: Update partially the poll with pollId = {pollId}.

* **delete**: Delete the poll with pollId = {pollId}.

### /sessions/{sessionId}/polls/{pollId}/participations

* **get**: Get list of participations.
* **post**: Create a new participation.

### /sessions/{sessionId}/polls/{pollId}/participations/{participationId}

* **get**: Get the participation with participationId = {participationId}.

* **put**: Update the participation with participationId = {participationId}.

* **patch**: Update partially the participation with participationId = {participationId}.

* **delete**: Delete the participation with participationId = {participationId}.

### /sessions/{sessionId}/polls/{pollId}/participations/{participationId}/answers

* **get**: Get list of answers.
* **post**: Create a new answer.

### /sessions/{sessionId}/polls/{pollId}/participations/{participationId}/answers/{answerId}

* **get**: Get the answer with answerId = {answerId}.

* **put**: Update the answer with answerId = {answerId}.

* **patch**: Update partially the answer with answerId = {answerId}.

* **delete**: Delete the answer with answerId = {answerId}.

### /sessions/{sessionId}/polls/{pollId}/questions

* **get**: Get list of questions.
* **post**: Create a new question.

### /sessions/{sessionId}/polls/{pollId}/questions/{questionId}

* **get**: Get the question with questionId = {questionId}.

* **put**: Update the question with questionId = {questionId}.

* **patch**: Update partially the question with questionId = {questionId}.

* **delete**: Delete the question with questionId = {questionId}.

### /sessions/{sessionId}/polls/{pollId}/questions/{questionId}/choices

* **get**: Get list of choices.
* **post**: Create a new choice.

### /sessions/{sessionId}/polls/{pollId}/questions/{questionId}/choices/{choiceId}

* **get**: Get the choice with choiceId = {choiceId}.

* **put**: Update the choice with choiceId = {choiceId}.

* **patch**: Update partially the choice with choiceId = {choiceId}.

* **delete**: Delete the choice with choiceId = {choiceId}.

### /sessions/{sessionId}/resources

* **get**: Get list of resources.
* **post**: Create a new resource.

### /sessions/{sessionId}/resources/{resourceId}

* **get**: Get the resource with resourceId = {resourceId}.

* **put**: Update the resource with resourceId = {resourceId}.

* **patch**: Update partially the resource with resourceId = {resourceId}.

* **delete**: Delete the resource with resourceId = {resourceId}.

### /sessions/{sessionId}/moods

* **get**: Get list of moods.
* **post**: Create a new mood.

### /sessions/{sessionId}/moods/{moodId}

* **get**: Get the mood with moodId = {moodId}.

* **put**: Update the mood with moodId = {moodId}.

* **patch**: Update partially the mood with moodId = {moodId}.

* **delete**: Delete the mood with moodId = {moodId}.

### /sessions/{sessionId}/users

* **get**: Get list of users.
* **post**: Create a new user.

### /sessions/{sessionId}/users/{userId}

* **get**: Get the user with userId = {userId}.

* **put**: Update the user with userId = {userId}.

* **patch**: Update partially the user with userId = {userId}.

* **delete**: Delete the user with userId = {userId}.

