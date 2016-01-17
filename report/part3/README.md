# Phase 3 Project Report

Welcome to the report of the TWEB Project phase 3. This is where you will find information about specification changes, what has been implemented during the last phase, known issues and a general conclusion about the work that has been done during the project with specific comments on its last update.

## Administrative information

### Team

Last name, first name | Github ID                                   |
----------------------|---------------------------------------------|
d'Agostino, Eléonore  | [paranoodle](https://github.com/paranoodle) | 
Ghozlani, Karim       | [gweezer7](https://github.com/gweezer7)     | 
Kammoun, Yassin       | [yibnl](https://github.com/yibnl)           | 
Ntawuruhunga, Paul    | [paulnta](https://github.com/paulnta)       | 

### Links

* [Polliwog web application](http://polliwog-app.herokuapp.com).
* [Polliwog REST API](http://polliwog-app.herokuapp.com/api).
* [Polliwog REST API Documentation](https://github.com/paulnta/Teaching-HEIGVD-TWEB-2015-Project/tree/master/api).
* [Polliwog product page](http://paulnta.github.io/Teaching-HEIGVD-TWEB-2015-Project/).
* [Mockups user interface](https://invis.io/6Y59VQVK7).

> The REST API Documentation link redirects to a basic markdown description of the API. However, both HTML and RAML version with more content can be found on the same location.

## Table of Contents
1. [Introduction](#Intro)
1. [User Guide](#Guide)
1. [Testing and validation](#Testing)
    1. [Test strategy](#Strategy)
    1. [Tools](#Tools)
    1. [Procedures](#Procedures)

## <a name="Intro"></a> Introduction

## <a name="Guide"></a> User Guide

## <a name="Testing"></a> Testing and validation

The second phase of the project was subject to integration problems between the client part and the server part. This last part begun with an initial testing and validation step in order to test and validate what was done previously. 

### <a name="Strategy"></a> Test strategy

The approach used to test and validate the integration of the server part with the client part of the system was done by following these steps:

1. Database population with test data.
1. Assertion testing on API resources.

### <a name="Tools"></a> Tools

* [API Copilot](https://github.com/AlphaHydrae/api-copilot), for database population.
* [Supertest](https://github.com/visionmedia/supertest), for assertion testing.
* [Should.js](https://github.com/shouldjs/should.js) for assertion testing.

### <a name="Procedures"></a> Procedures

#### Scenarios

##### Scenario: Init  

The goal of this scenario is to generate a huge volume of data. These data mainly consist of lectures, questions and choices. This is used to verify whether or not POST actions sucessfully create data.

File: [Init.scenario.js](https://github.com/paulnta/Polliwog/blob/master/Polliwog/server/api/Init.scenario.js)

##### Scenario: Remove

The goal of this scenario is to generate a few data which then are subject to DELETE HTTP requests. This is used to verify whether or not it is possible to a remove a particular data.

File: [Remove.scenario.js](https://github.com/paulnta/Polliwog/blob/master/Polliwog/server/api/Remove.scenario.js)

##### Scenario: RemoveAll

The goal of this scenario is to submit DELETE HTTP requests in order to delete every data related to any resource of the REST API. This is used to verify whether or not DELETE actions sucessfully delete data.

File: [RemoveAll.scenario.js](https://github.com/paulnta/Polliwog/blob/master/Polliwog/server/api/RemoveAll.scenario.js)

#### Assertion Testing

##### Lecture

The goal of this assertion testing is to verify whether or not a slug is added to a lecture when it is created and updated when it is modified.

File: [lecture.model.spec.js](https://github.com/paulnta/Polliwog/blob/master/Polliwog/server/api/lecture/lecture.model.spec.js)

##### Poll

The goal of this assertion testing is to verify whether or not a poll is added to a lecture when it is created.

File: [poll.model.spec.js](https://github.com/paulnta/Polliwog/blob/master/Polliwog/server/api/poll/poll.model.spec.js)

##### Question

The goal of this assertion testing is to verifiy whether or not it is possible to create questions.

File: [question.model.spec.js](https://github.com/paulnta/Polliwog/blob/master/Polliwog/server/api/question/question.model.spec.js)

##### Choice

The goal of this assertion testing is to verifiy whether or not choices are added, updated or deleted when the same events occur on related questions.

File: [choice.model.spec.js](https://github.com/paulnta/Polliwog/blob/master/Polliwog/server/api/choice/choice.model.spec.js)

## <a name="Issues"></a> Known Issues

## <a name="Conclusion"></a> Conclusion