var extendGroupSchema = {
    'users.$.roles': {
        type: [String],
        label: "User Roles"
    }
};

if(typeof SchemaManager !== 'undefined')
    SchemaManager.extendGroupSchemaExtern(extendGroupSchema);

