package main

import (
	"fmt"
	"log"
	"reflect"
	"strconv"
	"strings"

	"github.com/jmoiron/sqlx"
)

var db *sqlx.DB

func getColumns[T any](object T) []string {
	reflection := reflect.TypeOf(object)

	columns := make([]string, reflection.NumField())
	for i := 0; i < reflection.NumField(); i++ {
		field := reflection.Field(i)
		var columnName string

		columnName = field.Tag.Get("db")
		if columnName == "" {
			columnName = field.Name
		}

		columns[i] = strings.ToLower(columnName)
	}

	return columns
}

func getValues[T any](object T) []string {
	reflection := reflect.ValueOf(object)

	values := make([]string, reflection.NumField())
	for i := 0; i < reflection.NumField(); i++ {
		field := reflection.Field(i)
		var value string

		switch field.Kind() {
		case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
			value = strconv.FormatInt(field.Int(), 10)
		case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
			value = strconv.FormatUint(field.Uint(), 10)
		case reflect.String:
			value = "'" + field.String() + "'"
		default:
			value = fmt.Sprintf("[Unknown/%s]", field.Kind())
		}

		values[i] = value
	}

	return values
}

func ConnectToDatabase() {
	var err error
	db, err = sqlx.Connect("", "")
	if err != nil {
		log.Fatalf("Could not connect to the database:\n%s\n", err)
	}
}

func InsertSingle[T any](tableName string, object T) error {
	queryString := fmt.Sprintf("INSERT INTO %s (%s) VALUES (%s);", tableName, strings.Join(getColumns(object), ", "), strings.Join(getValues(object), ", "))

	fmt.Println(queryString)

	return nil
}

func InsertMultiple[T any](tableName string, objects []T) error {
	// TODO: It's likely possible to optimize it to a single query

	for _, obj := range objects {
		err := InsertSingle(tableName, obj)

		if err != nil {
			return err
		}
	}

	return nil
}

func GetSingle[T any](tableName string, condition Condition) (*T, error) {
	return nil, nil
}

func GetMultiple[T any](tableName string, condition Condition) ([]T, error) {
	queryString := fmt.Sprintf("SELECT * FROM %s WHERE %s", tableName, condition.ToString())

	values := []T{}
	err := db.Select(&values, queryString)
	if err != nil {
		return nil, err
	}

	return values, nil
}

func GetAll[T any](tableName string) ([]T, error) {
	queryString := fmt.Sprintf("SELECT * FROM %s", tableName)

	values := []T{}
	err := db.Select(&values, queryString)
	if err != nil {
		return nil, err
	}

	return values, nil
}

// Update

// Delete
