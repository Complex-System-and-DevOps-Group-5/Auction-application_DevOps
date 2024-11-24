package database

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

func getColumnsOf[T DatabaseObject](object T, exclude string) []string {
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

func Connect() {
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

func Insert[T DatabaseObject](objects ...T) error {
	tableName := objects[0].TableName()

	columns := getColumnsOf(objects[0], "insert")

	namedColumns := make([]string, len(columns))
	for i, column := range columns {
		namedColumns[i] = ":" + column
	}

	queryString := fmt.Sprintf("INSERT INTO %s (%s) VALUES (%s);", tableName, strings.Join(columns, ", "), strings.Join(namedColumns, ", "))
	_, err := db.NamedExec(queryString, objects)

	if err != nil {
		fmt.Printf("err: %v\n", err)
		return err
	}

	return nil
}

func GetSingle[T DatabaseObject](condition Condition) (*T, error) {
	candidates, err := GetMultiple[T](condition)
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

func GetMultiple[T DatabaseObject](condition Condition) ([]T, error) {
	// only used for getting the tablename
	var a T
	tableName := a.TableName()

	queryString := fmt.Sprintf("SELECT * FROM %s WHERE %s;", tableName, condition.ToString())

	values := []T{}
	err := db.Select(&values, queryString)
	if err != nil {
		return nil, err
	}

	return values, nil
}

func GetAll[T DatabaseObject]() ([]T, error) {
	// only used for getting the tablename
	var a T
	tableName := a.TableName()

	queryString := fmt.Sprintf("SELECT * FROM %s", tableName)

	values := []T{}
	err := db.Select(&values, queryString)
	if err != nil {
		return nil, err
	}

	return values, nil
}

func GetAmount[T DatabaseObject](amount int, offset int) ([]T, error) {
	// only used for getting the tablename
	var a T
	tableName := a.TableName()

	queryString := fmt.Sprintf("SELECT * FROM %s LIMIT %d OFFSET %d", tableName, amount, offset)

	values := []T{}
	err := db.Select(&values, queryString)
	if err != nil {
		return nil, err
	}

	return values, nil
}

// Update

// Delete
