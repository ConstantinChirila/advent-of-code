package main
import (
    "fmt"
    "log"
    "os"
	"strings"	
	"strconv"
)


func main() {
	content, err := os.ReadFile("input.txt")

	if err != nil { log.Fatal(err) }
	s := string(content)
	scanned := strings.Split(s,"\n")
	fullyContained := []int{}
	partiallyContained := []int{}
	
	for _, group := range scanned {
		groupsArray := strings.Split(group,",")
		firstGroup :=  strings.Split(groupsArray[0],"-")
		secondGroup := strings.Split(groupsArray[1],"-")

		firstMin, _ := strconv.Atoi(firstGroup[0])
		firstMax, _ := strconv.Atoi(firstGroup[1])
		secondMin, _ := strconv.Atoi(secondGroup[0])
		secondMax, _ := strconv.Atoi(secondGroup[1])
		
		if((firstMin <= secondMin && firstMax >= secondMax) || (secondMin <= firstMin && secondMax >= firstMax)){		
			fullyContained = append(fullyContained, 1)
		}

		if((firstMin >= secondMin && firstMin <= secondMax) || (firstMax >= secondMin && firstMax <= secondMax) ||
			(secondMin >= firstMin && secondMin <= firstMax) || (secondMax >= firstMin && secondMax <= firstMax)) {
			partiallyContained = append(partiallyContained, 1)
		}
	}

	fmt.Println("Result 1: ", len(fullyContained))
	fmt.Println("Result 2: ", len(partiallyContained))
}