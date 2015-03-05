Meteor.methods({
    'removeRole': function(role){
        var users = Meteor.users.find({roles: role}).fetch();
        Roles.removeUsersFromRoles(users, role);
        Roles.deleteRole(role);
        return true;
    }
});