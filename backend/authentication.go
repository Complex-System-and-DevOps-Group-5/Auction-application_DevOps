package main

import (
	"DevOps/database"
)

type UserNotFound struct{}

func (e UserNotFound) Error() string {
	return ""
}

type InvalidPassword struct{}

func (e InvalidPassword) Error() string {
	return ""
}

func AuthenticateLogin(login Login) (string, error) {
	user, err := database.GetSingle[database.UserDb](database.EqualityCondition("name", login.Username))

	if err != nil || user == nil {
		return "", UserNotFound{}
	}

	// TODO: Hash the password
	hashed := login.Password
	if user.PasswordHash != hashed {
		return "", InvalidPassword{}
	}

	token, err := CreateToken(user.Name)
	if err != nil {
		return "", err
	}

	return token, nil
}
