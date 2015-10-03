Tasks = new Mongo.Collection("tasks");
Bills = new Mongo.Collection('bills');
Projects = new Mongo.Collection('projects');

Meteor.methods({
  addTask: function (obj) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Tasks.insert({
      date     : obj.date,
      number   : obj.number,
      createdAt: new Date(),
      userId   : Meteor.userId(),
      username : Meteor.user().username,
      status   : 0,
      price    : 0
    });
  },
  deleteTask: function (taskId) {
    Tasks.remove(taskId);
    Bills.remove({taskId: taskId});
  },
  setStatusTask: function (taskId, status) {
    Tasks.update(taskId, { $set: { status: status } });
  },
  updateTask: function (obj) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(obj._id, { $set: obj.properties });
  },

  addBill: function (obj) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Bills.insert(obj);
    Tasks.update(obj.taskId, { $inc: { price: obj.number } });
  },
  updateBill: function(obj) {
    var incNumber = obj.properties.number - obj.oldNumber;
    Bills.update(obj._id, { $set: obj.properties });

    if(incNumber !== 0) {
      Tasks.update(obj.properties.taskId, { $inc: { price: incNumber } });
    }
  },
  deleteBill: function(obj) {
    Bills.remove(obj._id);
    Tasks.update(obj.taskId, { $inc: { price: -obj.number } });
  },
  
  addProject: function(obj) {
    Projects.insert(obj);
  },
  deleteProject: function(projectId) {
    Projects.remove(projectId);
  }
});