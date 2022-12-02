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
          <a href="https://adventofcode.com/2022/">Advent of code challenge</a>
        </h1>
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
