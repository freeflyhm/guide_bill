Template.taskEditPage.helpers({
  bills: function() {
    return Bills.find({ taskId: this._id }, {sort: {datetime: 1}});
  }
});

Template.taskEditPage.events({
  'click .delete': function () {
    if(confirm('确定要删除吗？')) {
      Meteor.call("deleteTask", this._id);
      Router.go('tasksList');
    }
  },
  'click .edit': function (event) {
    //console.log('click .edit');
    // 阻止事件冒泡
    event.stopPropagation();

    Router.go('taskEditTask', {_id: this._id});
  },
  'click .center': function () {
    //console.log('click .text');
    // 阻止事件冒泡
    event.stopPropagation();

    Router.go('tasksList');
  },
  'click .billnew': function () {
    // 阻止事件冒泡
    event.stopPropagation();

    Router.go('billNew', {_id: this._id});
  }
});