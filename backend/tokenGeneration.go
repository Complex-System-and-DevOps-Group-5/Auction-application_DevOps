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

func LoginHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
 
    var u User
    json.NewDecoder(r.Body).Decode(&u)
    fmt.Printf("The user request value %v\n", u)
  
    if u.Username == "Chek" && u.Password == "123456" {
        tokenString, err := createToken(u.Username)
        if err != nil {
            w.WriteHeader(http.StatusInternalServerError)
            fmt.Fprint(w, "Error generating token")
            return
        }
        w.WriteHeader(http.StatusOK)
        fmt.Fprint(w, tokenString)
        return
    } else {
        w.WriteHeader(http.StatusUnauthorized)
        fmt.Fprint(w, "Invalid credentials")
    }
}

func ProtectedHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    authorizationHeader := r.Header.Get("Authorization")
    if authorizationHeader == "" || len(authorizationHeader) < 7 || authorizationHeader[:7] != "Bearer " {
        w.WriteHeader(http.StatusUnauthorized)
        fmt.Fprint(w, "Missing or malformed authorization header")
        return
    }
    tokenString := authorizationHeader[7:]
  
    err := verifyToken(tokenString)
    if err != nil {
        w.WriteHeader(http.StatusUnauthorized)
        fmt.Fprint(w, "Invalid token")
        return
    }
  
    fmt.Fprint(w, "Welcome to the protected area")
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
