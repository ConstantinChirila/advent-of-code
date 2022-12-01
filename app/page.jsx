"use client";
import { tableData } from "./constants";
import styles from "./page.module.css";

export default function Home() {
  tableData;
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
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((day, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{day.part1}</td>
                <td>{day.part2}</td>
                <td>{day.time} min</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
