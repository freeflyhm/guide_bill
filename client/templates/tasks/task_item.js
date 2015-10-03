Template.taskItem.events({
  /*"change input": function (event) {
    //console.log('change input');
    // 阻止事件冒泡
    event.stopPropagation();
    // Set the checked property to the opposite of its current value
    if(this.userId === Meteor.userId()){
      Meteor.call("setStatusTask", this._id, ! this.checked);
    }
  },*/
  'click .checkbox': function (event) {
    event.stopPropagation();
    if(this.status === 0) {
      Meteor.call("setStatusTask", this._id, 1);
    } else if(this.status === 1) {
      if(Meteor.user()) {
        if(Meteor.user().admin) {
          Meteor.call("setStatusTask", this._id, 2);
        } else {
          Meteor.call("setStatusTask", this._id, 0);
        }
      }
    } else if(this.status === 2) {
      Meteor.call("setStatusTask", this._id, 1);
    }
  },
  'click .edit': function (event) {
    //console.log('click .edit');
    // 阻止事件冒泡
    event.stopPropagation();

    Router.go('taskEditPage', {_id: this._id});

    /*if(confirm('确定要删除吗？')) {
      Meteor.call("deleteTask", this._id);
    }*/
  },
  'click .text': function () {
    //console.log('click .text');
    // 阻止事件冒泡
    event.stopPropagation();

    Router.go('taskPage', {_id: this._id});
  }
});