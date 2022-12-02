package main
import (
    "fmt"
    "log"
    "os"
	"strings"
	"strconv"
	"sort"
	"time"
)

func main() {
	content, err := os.ReadFile("input.txt")

	if err != nil { log.Fatal(err) }

	s := string(content)
	scanned := strings.Split(s,"\n")
	var arrayOfArrays [][]int
	var arr []int

	for _, element := range scanned {
		if(element != ""){
			number, err := strconv.Atoi(element)
			if err != nil { 
				fmt.Println(err) 
				return
			}
			arr = append(arr,number )
	   }

		if(element == ""){
			arrayOfArrays = append(arrayOfArrays, arr)
			arr = []int{}
		}
	}
	
	var sumArray []int

	for _, arr := range arrayOfArrays {
		var sum int
		for _, number := range arr {
			sum += number
		}
		sumArray = append(sumArray, sum)
	}

	sort.Sort(sort.Reverse(sort.IntSlice(sumArray)))

	fmt.Println("Result 1: ", sumArray[0])
	fmt.Println("Result 2: ", sumArray[0] +  sumArray[1]+  sumArray[2])
}