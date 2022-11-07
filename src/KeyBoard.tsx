import { useEffect } from 'react'
import styles from './Keyboard.module.css'


const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
]

type KeyBoardProps = {
    activeLetters: string[],
    inactiveLetters: string[],
    dissabled?: boolean,
    addGuessedLetters: (letter: string) => void
}


export const KeyBoard = (
    { activeLetters, inactiveLetters, dissabled = false, addGuessedLetters }: KeyBoardProps) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))',
            gap: '.5rem'
        }}>
            {KEYS.map(
                key => {
                    const isActive = activeLetters.includes(key)
                    const inActive = inactiveLetters.includes(key)

                    return (
                        <button
                            className={
                                `${styles.btn} ${isActive ? styles.active : ""} ${inActive ? styles.inactive : ""}`}
                            key={key}
                            onClick={() => addGuessedLetters(key)}
                            disabled={isActive || inActive || dissabled}
                        >
                            {key}
                        </button>)
                }
            )}
        </div>
    )
}
