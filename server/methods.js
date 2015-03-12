Meteor.methods({
    /**
     * remove a role
     * @param String role
     * @return Boolean
     *      true = successfully removed role
     */
    'removeRole': function(role){
        var users = Meteor.users.find({roles: role}).fetch();
        Roles.removeUsersFromRoles(users, role);
        Roles.deleteRole(role);
        return true;
    }
});