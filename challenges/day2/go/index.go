package main
import (
    "fmt"
    "log"
    "os"
	"strings"	
)


func main() {
	content, err := os.ReadFile("input.txt")

	gameScore := map[string]int{
		"B X":1, "C Y":2, "A Z":3, 
		"A X":4, "B Y":5, "C Z":6, 
		"C X":7, "A Y":8, "B Z":9,
	}

	gameScorePart2 := map[string]int{
		"A X": 3, "A Y": 4, "A Z": 8,
		"B X": 1, "B Y": 5, "B Z": 9,
		"C X": 2, "C Y": 6, "C Z": 7,
	}

	if err != nil { log.Fatal(err) }
	s := string(content)
	scanned := strings.Split(s,"\n")

	totalScore := 0
	totalScorePart2 := 0

	for _, play := range scanned {
		totalScore += gameScore[play]
		totalScorePart2 += gameScorePart2[play]
	}

	fmt.Println("Result 1: ", totalScore)
	fmt.Println("Result 2: ", totalScorePart2)
}