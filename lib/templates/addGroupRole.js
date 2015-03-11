UM.prototype.umAddGroupRoleHelper = {
    rolesInGroup: function(){
        return Meteor.roles.find({groupId: Router.current().params.groupId});
    },
    abort: function () {
        return __('abort');
    },
    currentGroup: function(){
        return Router.current().params.groupId;
    }
};

UM.prototype.umAddGroupRoleEvents = {
'click #addGroupRoleButton': function(){
    var groupId = Router.current().params.groupId;
    var role = $('#addGroupRole').val();
    Roles.addGroupRole(groupId, role);
}
};