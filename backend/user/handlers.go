package user

import (
	"DevOps/database"
	"errors"

	"github.com/gofiber/fiber/v2"
)

func LoginHandler(c *fiber.Ctx) error {
	var login Login
	err := c.BodyParser(&login)

	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	token, err := AuthenticateLogin(login)

	if err != nil {
		var errorStatus int

		if errors.Is(err, UserNotFound{}) {
			errorStatus = fiber.StatusNotFound
		} else if errors.Is(err, InvalidPassword{}) {
			errorStatus = fiber.StatusForbidden
		} else {
			errorStatus = fiber.StatusInternalServerError
		}

		return c.SendStatus(errorStatus)
	}

	response := struct {
		Username string `json:"username"`
		Token    string `json:"token"`
	}{Username: login.Username, Token: token}

	return c.Status(fiber.StatusOK).JSON(response)
}

func RegisterHandler(c *fiber.Ctx) error {
	var newUserRequest struct {
		Username string `json:"username"`
		Password string `json:"password"`
		Email    string `json:"email"`
	}
	err := c.BodyParser(&newUserRequest)
	if err != nil || newUserRequest.Username == "" || newUserRequest.Email == "" || newUserRequest.Password == "" {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	// Check if the user already exists
	existingUser, _ := database.GetSingle[database.User](database.EqualityCondition("name", newUserRequest.Username))

	if existingUser != nil {
		return c.Status(fiber.StatusMethodNotAllowed).SendString("User already exists")
	}

	newUser := database.User{
		Id:           0, // automatically made by the database, so it doesn't matter
		Name:         newUserRequest.Username,
		Email:        newUserRequest.Email,
		PasswordHash: newUserRequest.Password, // TODO: hash the password
		Role:         0,
		Verified:     false,
	}

	err = database.Insert(newUser)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.SendStatus(fiber.StatusAccepted)
}
