const express = require('express');
const app = express();
const PORT = process.env.PORT || 6969;
const userData = require('./MOCK_DATA.json');
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList,
	GraphQLInt,
} = require('graphql');
const { graphqlHTTP } = require('express-graphql');

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

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		getAllUsers: {
			type: new GraphQLList(UserType),
			resolve: function (parent, args) {
				return userData;
			},
		},
		getUserById: {
			type: UserType,
			args: { id: { type: GraphQLInt } },
			resolve: function (parent, args) {
				return userData.find((user) => user.id === args.id);
			},
		},
		getUsersByGender: {
			type: new GraphQLList(UserType),
			args: { gender: { type: GraphQLString } },
			resolve: function (parent, args) {
				return userData.filter((user) => user.gender === args.gender);
			},
		},
	},
});

const schema = new GraphQLSchema({ query: RootQuery });

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
