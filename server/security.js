Meteor.roles.permit(['insert', 'remove', 'update']).ifHasRole('admin').apply();
Meteor.roles.permit(['insert', 'remove', 'update']).ifHasRole('superAdmin').apply();
Meteor.roles.permit(['insert', 'remove', 'update']).never().apply();