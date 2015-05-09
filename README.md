# Community Messages Admin

In the admin you can add/remove messages, select location, make a message sticky, change content and images.

### Requirements
* Nodejs
* Gulp
* Bower

### Config
There are 2 things to do here, change the Firebase reference
```
var ref = new Firebase('https://my-awesome-app-1.firebaseio.com/messages');
```
and by default you need to pass the password as a query parameter
```
https://my-awesome-app.com/?p=Pa55w0rD
```  
If the password is correct you will be able to change messages otherwise you will only be able to see messages but not make any change.

### Install
`$ npm install && bower install`

### Develop
`$ gulp serve`

### Build
`$ gulp`
