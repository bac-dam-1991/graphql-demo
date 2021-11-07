import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
	query getUserById($id: Int!) {
		getUserById(id: $id) {
			familyName
			givenName
			id
			email
			gender
		}
	}
`;

export const GET_ALL_USERS = gql`
	query {
		getAllUsers {
			givenName
			familyName
			id
			email
			gender
		}
	}
`;
