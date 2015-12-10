# Phase 2 Project Report

Welcome to the report of the TWEB Project phase 2. This is where you will find information about specification, what has been implemented during the second phase, known issues and what needs to be implemented in the last part of the project.

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

*The REST API Documentation link redirects to a basic markdown description of the API. However, both HTML and RAML version with more content can be found on the same location.*

## Table of Contents
1. [Introduction](#Intro)
1. [Specification](#Spec)
1. [Tools](#Tools)
1. [Client](#Client)
    1. [User Interfaces](#UI)
    1. [State Pattern](#State)
1. [Server](#Server)
    1. [REST API](#API)
    1. [REST API Documentation](#APIDoc)
1. [Remaining Work](#Work)
1. [Known issues](#Issues)
1. [Conclusion](#Conclusion)

## <a name="Intro"></a> Introduction

The purpose of this report is to describe what has been implemented during the second phase of the project.

## <a name="Spec"></a> Specifications

First, a short summary of the features we had planned to implement for part 2:

* User accounts (optional for listeners, required for speakers)
* Lectures, allowing for the sharing of resources, creating polls, and viewing the current mood of the audience
	* They can be public and only require a key to join
	* Or they can be private and require an account and an invitation
* Polls, consisting of one or more multiple-choice questions
	* Users can answer polls while they are active
	* Poll results can be displayed at the speaker's discretion
* Mood, a measure of the overall satisfaction of the audience

From the [original specifications](https://github.com/paulnta/Teaching-HEIGVD-TWEB-2015-Project/blob/master/specifications/specifications.md), we dropped the TweetQuestions feature from part 2 with the intent to implement it in part 3 instead.

Client-wise, we wanted an interface that was clean and simple to use, and that included at least the following functionalities:

* Logging in to an account as a speaker, and:
	* Creating, editing and deleting lectures, and setting them as active or non
	* Creating, editing and deleting polls (and by extension, questions and choices), setting them as active or non, and viewing their results
	* Accessing the audience's current mood, as a graph
	* Creating and deleting resources to share
* Accessing the site as a listener, with or without an account, and:
	* Accessing a lecture, both via key and invitation
	* Accessing the current lecture's resources
	* Responding to polls when available
	* Inputting a current mood

## <a name="Tools"></a> Tools

* [Angular Fullstack](https://github.com/angular-fullstack/generator-angular-fullstack), for project scaffolding.
* [Angular Material](https://material.angularjs.org), as material design.
* [RAML 8.0](http://raml.org/), for REST API documentation.

## <a name="Client"></a> Client

### <a name="UI"></a> User Interfaces

### <a name="UI"></a> State Pattern

## <a name="Server"></a> Server

### <a name="API"></a> REST API

### <a name="APIDOC"></a> REST API Documentation

The REST API has been documented while it was being both designed and implemented. A dedicated tool has been used for that purpose. It has been decided to use the RESTful API Modeling Language (RAML) as it was the case for the first part of the project. It is useless to enumerate all its advantages except maybe one: RAML makes it very easy to fully describe resources in a generic and concise way.

The current version of the REST API Documentation is well furnished. Every endpoint has been fully documented except the moods one due to reasons of time. Anyway, it is provided with various examples of use for both requests and responses. Entities schemas have also been made available. This allows one to know exactly which data type is expected for a specfic property of a payload. HTTP status codes

## <a name="Work"></a> Remaining Work

## <a name="Issues"></a> Known Issues

## <a name="Conclusion"></a> Conclusion
