package user

import (
	"DevOps/database"
	"crypto/sha256"
	"encoding/base64"
)

type Login struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type UserNotFound struct{}

func (e UserNotFound) Error() string {
	return ""
}

type InvalidPassword struct{}

func (e InvalidPassword) Error() string {
	return ""
}

func AuthenticateLogin(login Login) (string, error) {
	user, err := database.GetSingle[database.User](database.EqualityCondition("name", login.Username))

	if err != nil || user == nil {
		return "", UserNotFound{}
	}

	hasher := sha256.New()
	hasher.Write([]byte(login.Password))
	hashed := base64.URLEncoding.EncodeToString(hasher.Sum(nil))

	if user.PasswordHash != hashed {
		return "", InvalidPassword{}
	}

	token, err := CreateToken(user.Name)
	if err != nil {
		return "", err
	}

	return token, nil
}
