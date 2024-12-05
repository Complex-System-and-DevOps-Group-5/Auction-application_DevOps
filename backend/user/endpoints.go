package user

import (
	"DevOps/database"
	"DevOps/endpoint"
	"crypto/sha256"
	"encoding/base64"
	"errors"

	"github.com/gofiber/fiber/v2"
)

func userHandler(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	user, err := database.GetSingle[database.User](database.EqualityCondition("id", id))

	if err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	return c.Status(fiber.StatusAccepted).JSON(user)
}

func loginHandler(c *fiber.Ctx) error {
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

func registerHandler(c *fiber.Ctx) error {
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

	hasher := sha256.New()
	hasher.Write([]byte(newUserRequest.Password))
	hashedPassword := base64.URLEncoding.EncodeToString(hasher.Sum(nil))

	newUser := database.User{
		Id:           0, // automatically made by the database, so it doesn't matter
		Name:         newUserRequest.Username,
		Email:        newUserRequest.Email,
		PasswordHash: hashedPassword,
		Role:         0,
		Verified:     false,
	}

	err = database.Insert(newUser)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.SendStatus(fiber.StatusAccepted)
}

func AllEndpoints() []endpoint.Endpoint {
	endpoints := make([]endpoint.Endpoint, 0)

	endpoints = append(endpoints, endpoint.Endpoint{Location: "/user/:id", Handler: userHandler, Type: fiber.MethodGet})
	endpoints = append(endpoints, endpoint.Endpoint{Location: "/login", Handler: loginHandler, Type: fiber.MethodPost})
	endpoints = append(endpoints, endpoint.Endpoint{Location: "/register", Handler: registerHandler, Type: fiber.MethodPost})

	return endpoints
}
