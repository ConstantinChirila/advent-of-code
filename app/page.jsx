"use client";
import Link from "next/link";
import { GITHUB_URL } from "../config";
import { tableData } from "./constants";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <br />
          <Link href="https://adventofcode.com/" target="_blank">
            Advent of code challenge
          </Link>
        </h1>
        <div className={styles.content}>
          <p>
            While leet code is{" "}
            <Link
              href="https://www.fullcontextdevelopment.com/qb/leetcode-considered-harmful"
              target="_blank"
            >
              not my favorite thing
            </Link>{" "}
            to do, I do love doing the yearly{" "}
            <Link href="https://adventofcode.com/" target="_blank">
              advent of code challenge
            </Link>
            . I decided to do it, timed, in{" "}
            <Link
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
              target="_blank"
            >
              Javascript
            </Link>{" "}
            and secondly try to do it in {""}
            <Link href="https://golang.org/" target="_blank">
              Go
            </Link>{" "}
            in an attempt to learn Go lang as well.
          </p>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Day</th>
              <th>Result Part 1</th>
              <th>Result Part 2</th>
              <th>Time (JS only)</th>
              <th>Javascript code </th>
              <th>GO code </th>
              <th>Input data</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((day, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{day.part1}</td>
                <td>{day.part2}</td>
                <td>{day.time} min</td>
                <td>
                  <Link
                    href={`${GITHUB_URL}/day${index + 1}/index.js`}
                    target="_blank"
                  >
                    Code.js
                  </Link>
                </td>
                <td>
                  {day.hasGo ? (
                    <Link
                      href={`${GITHUB_URL}/day${index + 1}/go/index.go`}
                      target="_blank"
                    >
                      Code.go
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  <Link
                    href={`${GITHUB_URL}/day${index + 1}/input.js`}
                    target="_blank"
                  >
                    Input Data
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
