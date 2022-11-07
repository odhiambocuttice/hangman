import { useState, useEffect, useCallback } from 'react'
import { HangManDrawing } from './HangManDrawing'
import { HangManWord } from './HangManWord'
import { KeyBoard } from './KeyBoard'

import words from './wordList.json'

const getNewWord = () => {
  return words[Math.floor(Math.random() * words.length)]
}
function App() {

  const [wordToGuess, setWordToGuess] = useState(getNewWord)

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()

      addGuessedLetter(key)

    }
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [guessedLetters])

  const isLoser = incorrectLetters.length >= 6

  const winner = wordToGuess.split('').every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || winner) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isLoser, winner])


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (key !== 'Enter') return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getNewWord())

    }
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [guessedLetters])

  return (
    <div style={{
      maxWidth: '800px',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      margin: "0, auto",
      alignItems: 'center',
    }}>
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>
        {winner && 'Winner! - refresh page to play again'}
        {isLoser && 'Try Again'}
      </div>
      <HangManDrawing numberOfGuesses={incorrectLetters.length} />
      <HangManWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} reveal={isLoser} />

      <div style={{ alignSelf: 'stretch' }}>
        <KeyBoard
          activeLetters={guessedLetters.filter((letter: string) => wordToGuess.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetters={addGuessedLetter}
          dissabled={winner || isLoser} />
      </div>
    </div>
  )
}

export default App
