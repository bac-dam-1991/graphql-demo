const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLInt,
} = require('graphql');

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => {
		return {
			id: { type: GraphQLNonNull(GraphQLInt) },
			givenName: { type: GraphQLNonNull(GraphQLString) },
			familyName: { type: GraphQLNonNull(GraphQLString) },
			email: { type: GraphQLNonNull(GraphQLString) },
			gender: { type: GraphQLNonNull(GraphQLString) },
		};
	},
});

module.exports = UserType;
