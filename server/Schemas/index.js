let userData = require('../MOCK_DATA.json');
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
} = require('graphql');
const UserType = require('./TypeDefs/UserType');

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

const RootMutation = new GraphQLObjectType({
	name: 'RootMutationType',
	fields: {
		createNewUser: {
			type: UserType,
			args: {
				givenName: { type: GraphQLString },
				familyName: { type: GraphQLString },
				gender: { type: GraphQLString },
				email: { type: GraphQLString },
			},
			resolve: function (parent, args) {
				const newUser = { ...args, id: userData[userData.length - 1].id + 1 };
				userData.push(newUser);
				return newUser;
			},
		},
		updateUserById: {
			type: UserType,
			args: {
				id: { type: GraphQLInt },
				givenName: { type: GraphQLString },
				familyName: { type: GraphQLString },
				gender: { type: GraphQLString },
				email: { type: GraphQLString },
			},
			resolve: function (parent, args) {
				const user = userData.find((user) => user.id === args.id);
				const indexOf = userData.indexOf(user);
				const updatedUser = { ...user, ...args };
				userData[indexOf] = updatedUser;
				return updatedUser;
			},
		},
		deleteUserById: {
			type: UserType,
			args: {
				id: { type: GraphQLInt },
			},
			resolve: function (parent, args) {
				const deletedUser = userData.find((user) => user.id === args.id);
				const filteredUsers = userData.filter((user) => user.id !== args.id);
				userData = [...filteredUsers];
				return deletedUser;
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation,
});
