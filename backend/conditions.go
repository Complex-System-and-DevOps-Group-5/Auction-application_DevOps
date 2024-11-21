package main

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

func (c equalityCondition[T]) ToString() string {
	return fmt.Sprintf("%s=%v", c.Column, c.Value)
}

type rangeCondition[T any] struct {
	Column string
	Start  T
	End    T
}

func (c rangeCondition[T]) ToString() string {
	return fmt.Sprintf("%s BETWEEN %v AND %v", c.Column, c.Start, c.End)
}

type multiCondition struct {
	Conditions []Condition
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

func RangeCondition[T any](column string, start T, end T) Condition {
	return rangeCondition[T]{Column: column, Start: start, End: end}
}

func MultiCondition(conditions ...Condition) Condition {
	return multiCondition{Conditions: conditions}
}
