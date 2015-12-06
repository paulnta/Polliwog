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

### Public & private lectures
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

### /lectures/{lectureId}/polls/{pollId}/questions/{questionId}/choices

* **get**: Get list of choices.
* **post**: Create a new choice.

### /lectures/{lectureId}/polls/{pollId}/questions/{questionId}/choices/{choiceId}

* **get**: Get the choice with choiceId = {choiceId}.

* **put**: Update the choice with choiceId = {choiceId}.

* **patch**: Update partially the choice with choiceId = {choiceId}.

* **delete**: Delete the choice with choiceId = {choiceId}.

### /lectures/{lectureId}/resources

* **get**: Get list of resources.
* **post**: Create a new resource.

### /lectures/{lectureId}/resources/{resourceId}

* **get**: Get the resource with resourceId = {resourceId}.

* **put**: Update the resource with resourceId = {resourceId}.

* **patch**: Update partially the resource with resourceId = {resourceId}.

* **delete**: Delete the resource with resourceId = {resourceId}.

### /lectures/{lectureId}/moods

* **get**: Get list of moods.
* **post**: Create a new mood.

### /lectures/{lectureId}/moods/{moodId}

* **get**: Get the mood with moodId = {moodId}.

* **put**: Update the mood with moodId = {moodId}.

* **patch**: Update partially the mood with moodId = {moodId}.

* **delete**: Delete the mood with moodId = {moodId}.

