if (typeof Roles !== 'undefined') {
    Roles.userIsInGroupRole = function (userId, groupId, roles) {
        if (typeof roles !== 'undefined') {
            var role = Groups.findOne({
                _id: groupId, 'users.id': userId,
                'users.roles': roles
            });
        }
        if (typeof role !== 'undefined')
            return true;

        return false;
    };

    Roles.addGroupRole = function (groupId, role) {
        if (Roles.userIsInGroupRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), ['superAdmin', 'admin'])) {
            var id,
                match;

            if (!role
                || 'string' !== typeof role
                || role.trim().length === 0) {
                return;
            }

            try {
                id = Meteor.roles.insert({'name': role.trim(), 'groupId': groupId});
                return id;
            } catch (e) {
                if (e.name !== 'MongoError') throw e;
                match = e.err.match(/^E11000 duplicate key error index: ([^ ]+)/);
                if (!match) throw e;
                if (match[1].indexOf('$name') !== -1)
                    throw new Meteor.Error(403, "Role already exists.");
                throw e
            }
        } else {
            throw new Meteor.error("addGroupRole", "You are not allowed to add a groupRole")
        }
    };

    Roles.deleteGroupRole = function (groupId, role) {
        if (Roles.userIsInGroupRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), ['superAdmin', 'admin'])) {
            if (!role) return;

            var foundExistingUser = Groups.findOne({_id: groupId, users: {roles: {$elemMatch: role}}});

            if (foundExistingUser) {
                throw new Meteor.Error(403, 'Role in use in ' + foundExistingUser.groupname);
            }

            var thisRole = Meteor.roles.findOne({name: role, groupId: groupId});
            if (thisRole) {
                Meteor.roles.remove({_id: thisRole._id});
            }
        } else {
            throw new Meteor.error("deleteGroupRole", "You are not allowed to remove a groupRole")
        }
    };
    Roles.rolesInGroup = function(groupId){
        return Meteor.roles.find({groupId:groupId});
    }
}