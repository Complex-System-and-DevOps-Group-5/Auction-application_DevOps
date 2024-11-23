package main

import (
	"errors"
	"fmt"
	"reflect"
	"strings"

	"github.com/jmoiron/sqlx"
)

const (
	user     = "auctionserver"
	password = "NogetForNu42"
	dbname   = "AuctionDb"
)

var db *sqlx.DB

func getColumnsOf[T any](object T, exclude string) []string {
	reflection := reflect.TypeOf(object)

	columns := make([]string, reflection.NumField())
	columnIndex := 0
	for i := 0; i < reflection.NumField(); i++ {
		field := reflection.Field(i)

		columnName := field.Tag.Get("db")
		if columnName == "" {
			continue
		}

		tagValue, hasTag := field.Tag.Lookup("no-db")
		if hasTag && strings.Contains(tagValue, exclude) {
			continue
		}

		columns[columnIndex] = strings.ToLower(columnName)
		columnIndex++
	}

	return columns[:columnIndex]
}

func ConnectToDatabase() {
	var err error
	connStr := fmt.Sprintf(
		"user=%s password=%s dbname=%s sslmode=disable",
		user,
		password,
		dbname)
	db, err = sqlx.Connect("postgres", connStr)
	if err != nil {
		panic(err)
	}
}

func InsertSingle[T any](tableName string, object T) error {
	columns := getColumnsOf(object, "insert")

	namedColumns := make([]string, len(columns))
	for i, column := range columns {
		namedColumns[i] = ":" + column
	}

	queryString := fmt.Sprintf("INSERT INTO %s (%s) VALUES (%s);", tableName, strings.Join(columns, ", "), strings.Join(namedColumns, ", "))
	db.NamedExec(queryString, object)

	return nil
}

func InsertMultiple[T any](tableName string, objects ...T) error {
	// TODO: It's likely possible to optimize it to a single query

	for _, obj := range objects {
		err := InsertSingle(tableName, obj)

		if err != nil {
			fmt.Printf("err: %v\n", err)
			return err
		}
	}

	return nil
}

func GetSingle[T any](tableName string, condition Condition) (*T, error) {
	candidates, err := GetMultiple[T](tableName, condition)
	if err != nil {
		return nil, err
	}

	switch len(candidates) {
	case 0:
		return nil, errors.New("no elements matching the condition")
	case 1:
		return &candidates[0], nil
	default:
		return nil, errors.New("more than one element matching the condition")
	}
}

func GetMultiple[T any](tableName string, condition Condition) ([]T, error) {
	queryString := fmt.Sprintf("SELECT * FROM %s WHERE %s;", tableName, condition.ToString())

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
