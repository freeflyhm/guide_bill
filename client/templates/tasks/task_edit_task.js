var ERRORS_KEY = 'taskEditTaskErrors';

Template.taskEditTask.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.taskEditTask.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.taskEditTask.events({
  'submit': function(event, template) {
    event.preventDefault();
    
    // Get value from form element
    var date = event.target.date.value;
    var number = event.target.number.value;
    
    var errors = {};

    if (! date) {
      errors.date = '日期必填';
    }

    if (! number) {
      errors.number = '团队人数必填';
    }
    
    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    // Update a task into the collection
    Meteor.call('updateTask', {
      _id: this._id,
      properties: {
        date: new Date(date),
        number: Number(number)
      }
    });

    // Clear form
    // event.target.date.value = "";
    // event.target.number.value = "";
    
    Router.go('taskEditPage', {_id: this._id});
  }
});
