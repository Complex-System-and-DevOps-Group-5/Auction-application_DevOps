package database

import (
	"fmt"
	"strings"
)

type Condition interface {
	ToString() string
}

type equalityCondition[T any] struct {
	Column string
	Value  T
}

type greaterCondition[T any] struct {
	Column string
	Value  T
}

type lessCondition[T any] struct {
	Column string
	Value  T
}

type nonEqualityCondition[T any] struct {
	Column string
	Value  T
}

type betweenCondition[T any] struct {
	Column string
	Start  T
	End    T
}

type inCondition struct {
	Column        string
	Possibilities []string
}

type multiCondition struct {
	Conditions []Condition
}

func (c equalityCondition[T]) ToString() string {
	return fmt.Sprintf("%s='%v'", c.Column, c.Value)
}

func (c greaterCondition[T]) ToString() string {
	return fmt.Sprintf("%s>'%v'", c.Column, c.Value)
}

func (c lessCondition[T]) ToString() string {
	return fmt.Sprintf("%s<'%v'", c.Column, c.Value)
}

func (c nonEqualityCondition[T]) ToString() string {
	return fmt.Sprintf("%s<>'%v'", c.Column, c.Value)
}

func (c betweenCondition[T]) ToString() string {
	return fmt.Sprintf("%s BETWEEN '%v' AND '%v'", c.Column, c.Start, c.End)
}

func (c inCondition) ToString() string {
	var sb strings.Builder

	sb.WriteString("'")
	sb.WriteString(c.Possibilities[0])
	sb.WriteString("'")

	for _, possibility := range c.Possibilities[1:] {
		sb.WriteString(", '")
		sb.WriteString(possibility)
		sb.WriteString("'")
	}
	return fmt.Sprintf("%s IN (%s)", c.Column, sb.String())
}

func (c multiCondition) ToString() string {
	var sb strings.Builder

	sb.WriteString(fmt.Sprintf("(%s)", c.Conditions[0].ToString()))
	for _, condition := range c.Conditions[1:] {
		sb.WriteString(fmt.Sprintf(" AND (%s)", condition.ToString()))
	}

	return sb.String()
}

// === CONSTRUCTORS ===
func EqualityCondition[T any](column string, value T) Condition {
	return equalityCondition[T]{Column: column, Value: value}
}

func GreaterCondition[T any](column string, value T) Condition {
	return greaterCondition[T]{Column: column, Value: value}
}

func LessCondition[T any](column string, value T) Condition {
	return lessCondition[T]{Column: column, Value: value}
}

func NonEqualityCondition[T any](column string, value T) Condition {
	return nonEqualityCondition[T]{Column: column, Value: value}
}

func BetweenCondition[T any](column string, start T, end T) Condition {
	return betweenCondition[T]{Column: column, Start: start, End: end}
}

func InCondition[T any](column string, possibilities ...string) Condition {
	return inCondition{Column: column, Possibilities: possibilities}
}

func MultiCondition(conditions ...Condition) Condition {
	return multiCondition{Conditions: conditions}
}
