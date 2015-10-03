var ERRORS_KEY = 'billnewErrors';

var ProjectsLocal, number;

Template.billNew.onCreated(function() {
  Session.set(ERRORS_KEY, {});

  // 本地（仅客户端）集合
  ProjectsLocal = new Mongo.Collection(null);

  ProjectsLocal.insert({price: 0, number: 100, note: ''});
});

Template.billNew.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  },
  billProjectItems: function() {
    return ProjectsLocal.find();
  },
  number: function() {
    var 
      billProjectItems = ProjectsLocal.find().fetch(),
      i, len, projectItem;
      
    number = 0;

    for(i = 0, len = billProjectItems.length; i < len; i++) {
      projectItem = billProjectItems[i];
      number += projectItem.price * projectItem.number;
    }
    return number / 10000;
  },
  projects: function() {
    return Projects.find();
  }
});

Template.billNew.events({
  /*'change #notetemp': function () {
    event.preventDefault();

    var temp = $('#notetemp').val();
    if(temp === '快捷备注模板') {
      return;
    }

    $('#note').val(temp);

    $('#notetemp').val('快捷备注模板');
    //console.log(temp);
  },*/
  'change .number-price': function(event) {
    var 
      PROPERTY = 'number',
      obj = {};

    event.preventDefault();

    //console.log(this);
    //console.log(event.target.value);
    if($(event.target).hasClass('price')) {
      PROPERTY = 'price';
    }
    //console.log(PROPERTY);
    obj[PROPERTY] = Number(event.target.value) * 100;
    //console.log(obj);
    ProjectsLocal.update(this._id, {$set: obj});
  },
  'change .item-note': function(event) {
    event.preventDefault();
    ProjectsLocal.update(this._id, {$set: {note: event.target.value}});
    //console.log(ProjectsLocal.findOne(this._id));
  },
  'click .delete': function(event) {
    event.preventDefault();
    ProjectsLocal.remove(this._id);
  },
  'click .project-item-new': function(event) {
    event.preventDefault();
    ProjectsLocal.insert({price: 0, number: 100, note: ''});
  },
  'submit': function(event, template) {
    event.preventDefault();
    //console.log('submit');
    // Get value from form element
    var datetime = event.target.datetime.value;
    //var number = event.target.number.value;
    
    var errors = {};

    if (! datetime) {
      errors.datetime = '时间必填';
    }

    if (number === 0) {
      errors.number = '金额必填';
    }
    
    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }
    //console.log({
    Meteor.call("addBill", {
      taskId: this._id,
      datetime: new Date(datetime),
      project: event.target.project.value,
      billProjectItems: ProjectsLocal.find().fetch(),
      number: number,
      note: event.target.note.value
    });

    // Insert a task into the collection
    /*Meteor.call("addTask", {
      datetime: new Date(datetime),
      number: Number(number)
    });*/

    // Clear form
    //event.target.datetime.value = "";
    //event.target.number.value = "";
    
    Router.go('taskEditPage', {_id: this._id});
  }
});