// This code only runs on the server
Meteor.publish("tasks", function (isAdmin) {
  //check(isAdmin, Boolean);
  if(isAdmin) {
    return Tasks.find();
  } else {
    return Tasks.find({userId: this.userId});
  }
});

Meteor.publish('projects', function() {
  return Projects.find();
});

Meteor.publish('bills', function(taskId) {
  //check(taskId, String);
  return Bills.find({taskId: taskId});
});

Meteor.publish('bill', function(_id) {
  //check(taskId, String);
  return Bills.find(_id);
});

// autopublish the user's admin status
Meteor.publish(null, function() {
  return Meteor.users.find(this.userId, {
    fields: {
      admin: 1
    }
  });
})