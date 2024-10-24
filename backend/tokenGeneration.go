package tokenGeneration

import (
    "fmt"
    "github.com/golang-jwt/jwt"
    "net/http"
    "encoding/json"
    "time"
)

var secretKey = []byte("secret-key")

type User struct {
    Username string `json:"username"`
    Password string `json:"password"`
}

func LoginHandler(c *fiber.Ctx) error {
    var u User
    if err := c.BodyParser(&u); err != nil {
        return c.Status(fiber.StatusBadRequest).SendString("Invalid request")
    }

    if u.Username == "Chek" && u.Password == "123456" {
        tokenString, err := createToken(u.Username)
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).SendString("Error generating token")
        }
        return c.Status(fiber.StatusOK).SendString(tokenString)
    }

    return c.Status(fiber.StatusUnauthorized).SendString("Invalid credentials")
}


func ProtectedHandler(c *fiber.Ctx) error {
    authorizationHeader := c.Get("Authorization")
    if authorizationHeader == "" || len(authorizationHeader) < 7 || authorizationHeader[:7] != "Bearer " {
        return c.Status(fiber.StatusUnauthorized).SendString("Missing or malformed authorization header")
    }

    tokenString := authorizationHeader[7:]
    err := verifyToken(tokenString)
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).SendString("Invalid token")
    }

    return c.SendString("Welcome to the protected area")
}

func createToken(username string) (string, error) {
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "username": username,
        "exp":      time.Now().Add(time.Hour * 24).Unix(),
    })

    tokenString, err := token.SignedString(secretKey)
    if err != nil {
        return "", err
    }

    return tokenString, nil
}

func verifyToken(tokenString string) error {
    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        return secretKey, nil
    })
  
    if err != nil {
        return err
    }
  
    if !token.Valid {
        return fmt.Errorf("invalid token")
    }
  
    return nil
}
