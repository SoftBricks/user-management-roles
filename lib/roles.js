if(typeof Roles !== 'undefined'){
    Roles.addGroupRole = function(groupId, role){
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
    };

    Roles.deleteGroupRole = function(groupId, role){
        if (!role) return;

        var foundExistingUser = Groups.findOne({_id:groupId,users: {roles:{$elemMatch: role}}});

        if (foundExistingUser) {
            throw new Meteor.Error(403, 'Role in use in '+foundExistingUser.groupname);
        }

        var thisRole = Meteor.roles.findOne({name: role, groupId: groupId});
        if (thisRole) {
            Meteor.roles.remove({_id: thisRole._id});
        }
    };
}