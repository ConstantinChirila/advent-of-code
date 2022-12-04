package main
import (
    "fmt"
    "log"
    "os"
	"strings"	
)

func main() {
	CHARACTER_ORDER := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	content, err := os.ReadFile("input.txt")

	if err != nil { log.Fatal(err) }
	s := string(content)
	scanned := strings.Split(s,"\n")
	
	divideString := func(s string) (string, string) {
		return s[:len(s)/2], s[len(s)/2:]
	}

	 firstChallengeSum := 0

	for _, group := range scanned {
		firstHalf, secondHalf := divideString(group)

		commonCharacter := ""
		for _, character := range firstHalf {
			if strings.Contains(secondHalf, string(character)) {
				commonCharacter = string(character)
			}
		}
		if(len(commonCharacter) > 0) {
			score := strings.Index(CHARACTER_ORDER, commonCharacter) + 1
			firstChallengeSum +=score
		}
	}
	
	groupsInThirds := getGroups(scanned)
	secondChallengeSum:= 0

	for _, group := range groupsInThirds {
		commonCharacter := ""
		for _, character := range group[0] {
			if strings.Contains(group[1], string(character)) && strings.Contains(group[2], string(character)) {
				commonCharacter = string(character)
			}
		}
		if(len(commonCharacter) > 0) {
			score := strings.Index(CHARACTER_ORDER, commonCharacter) + 1
			secondChallengeSum +=score
		}
	}

	fmt.Println("Result 1: ", firstChallengeSum)
	fmt.Println("Result 2: ", secondChallengeSum)
}

func getGroups(items []string) [][]string {

	groups := [][]string{}
  	currentGroup := []string{}

	for _, item := range items {
		currentGroup = append(currentGroup, item)

		if (len(currentGroup) == 3) {
			groups = append(groups, currentGroup)
		  	currentGroup = []string{}
		}
	}

	return groups
}

