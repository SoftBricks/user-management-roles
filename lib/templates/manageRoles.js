UM.prototype.umManageRolesHelper = {
    roles: function(){
        return Meteor.roles.find().fetch();
    },
    nameT: function(){
        console.log(this);
    }
};