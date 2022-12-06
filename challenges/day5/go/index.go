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
	scanned := strings.Split(s, "\n")
	stacksRaw := scanned[0:8]
	
	// Convert the initial stacks to arrays
	initialStacks :=  make([][]string, 9)

	for _, stackRaw := range stacksRaw {
		addEmptyStacks := strings.Replace(stackRaw, "    ", " [-] ", -1)
		removeEmptyStrings := strings.Replace(addEmptyStacks, " ", "", -1)
		removeLSB := strings.Replace(removeEmptyStrings, "[", "", -1)
		removeRSB := strings.Replace(removeLSB, "]", "", -1)
		charArray := strings.Split(removeRSB, "")

		for index, _ := range initialStacks {
			if (charArray[index] != "-") {
				initialStacks[index] = append(initialStacks[index], charArray[index])
			  }
		}
	}
	for index, stack := range initialStacks {
		//reverse the stack
		for i := len(stack)/2-1; i >= 0; i-- {
			opp := len(stack)-1-i
			stack[i], stack[opp] = stack[opp], stack[i]
		}
		initialStacks[index] = stack
	}



	// Convert moves to a numbers array
	moves := [][]int{}
	movesRaw := scanned[10:]
	for _, move := range movesRaw {
		removeMove := strings.Replace(move, "move ", "", -1)
		removeFrom := strings.Replace(removeMove, " from ", "-", -1)
		removeTo := strings.Replace(removeFrom, " to ", "-", -1)
		movesString := strings.Split(removeTo, "-")

		intArray := []int{}
		for _, value := range movesString {
			intValue, _ := strconv.Atoi(value)
			intArray = append(intArray, intValue)
		}

		moves = append(moves, intArray)
	}

	movedStacksPart1 := moveStacks(moves, initialStacks, false)
	movedStacksPart2 := moveStacks(moves, initialStacks, true)

	resultPart1 := []string{}
	for _, movedStack := range movedStacksPart1 {
		resultPart1 = append(resultPart1, movedStack[len(movedStack) -1])
	}

	resultPart2 := []string{}
	for _, movedStack := range movedStacksPart2 {
		resultPart2 = append(resultPart2, movedStack[len(movedStack) -1])
	}	
	
	fmt.Println("Result 1: ", strings.Join(resultPart1[:], ""))
	fmt.Println("Result 2: ", strings.Join(resultPart2[:], ""))
}

func moveStacks(moves [][]int ,initialStacks [][]string, part1 bool ) [][]string {

	movedStacks := make([][]string, len(initialStacks))
	for index, stack := range initialStacks {
		movedStacks[index] = append(movedStacks[index], stack...)
	}

	finalStacks := movedStacks
	for _, move := range moves {
		quantity := move[0]
		from := move[1]
		to := move[2]
	  	fromStack := finalStacks[from - 1];
		toStack := finalStacks[to - 1];
		itemsToMove := []string{}

		if(part1) {
		 	itemsToMove = fromStack[len(fromStack) - quantity:]
		} else {
			itemsToMove = fromStack[len(fromStack) - quantity:]
			for i := len(itemsToMove)/2-1; i >= 0; i-- {
				opp := len(itemsToMove)-1-i
				itemsToMove[i], itemsToMove[opp] = itemsToMove[opp], itemsToMove[i]
			}
		}

		fromStack = fromStack[:len(fromStack) - quantity]
		toStack = append(toStack, itemsToMove...)
		finalStacks[to - 1] = toStack
		finalStacks[from - 1] = fromStack	
	}

	  return finalStacks
}