Handlebars.registerHelper('activePage', function() {
  // includes Spacebars.kw but that's OK because the route name ain't that.
  var routeNames = arguments;

  if(Router.current().route) {
    return _.include(routeNames, Router.current().route.getName()) && 'active';
  }

  return false;
});

Handlebars.registerHelper('isEmployeeAndInTasksListRounte', function() {
  if(Router.current().route && Router.current().route.getName() === 'tasksList'){
    if (Meteor.user()) {
      if (Meteor.user().admin) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
});

Handlebars.registerHelper('isAdmin', function() {
  return !! Meteor.user() && !! Meteor.user().admin;
});

Handlebars.registerHelper('isOwner', function(userId, status) {
  return userId === Meteor.userId() && status !== 2;
});

Handlebars.registerHelper('statusClass', function(status) {
  if(status === 1) {
    return 'ok-sign';
  } else if (status === 2) {
    return 'ban-circle';
  }
  return 'record';
});

Handlebars.registerHelper('isDisabled', function(status) {
  if(Meteor.user()) {

    if(status === 0) {
      if(Meteor.user().admin) {
        return 'disabled';
      } else {
        return '';
      }
    } else if (status === 2) {
      if(Meteor.user().admin) {
        return '';
      } else {
        return 'disabled';
      }
    }

    return '';

  } else {
    return 'disabled';
  }
});

Handlebars.registerHelper('formatDateToYYMMDD', function(date) {
  return moment(date).format('YYMMDD');
});

Handlebars.registerHelper('formatDate', function(date) {
  return moment(date).format('YYYY-MM-DD');
});

Handlebars.registerHelper('formatDateToTime', function(date) {
  return moment(date).format('MM-DD HH:mm');
});

Handlebars.registerHelper('formatDateToTimeT', function(date) {
  return moment(date).format('YYYY-MM-DDTHH:mm');
});

Handlebars.registerHelper('division', function(number) {
  return number / 100;
});

Handlebars.registerHelper('divisionWan', function(number) {
  return number / 10000;
});

Handlebars.registerHelper('timesPriceAndNumber', function(price, number) {
  return price * number / 10000;
});