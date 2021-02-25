import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {

  const { startNewLevel} = useContext(ChallengesContext)
  const [time, setTime] = useState(0.1 * 60);
  const [active, setActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  let countDownTimeout: NodeJS.Timeout;

  function startCountDown() {
    setActive(true);

  }
  function resetCountDown() {
    setActive(false);
    clearTimeout(countDownTimeout);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if (active && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (active && time == 0) {
      setHasFinished(true);
      setActive(false);
      startNewLevel();
    }
  }, [active, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFinished ? (
        <button
          disabled
          type="button"
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
          <>
            {/* Isto é uma função ternária */}
            {active ? (
              <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountDown}
              >
                Abandonar ciclo
              </button>
            ) : (
                <button
                  type="button"
                  className={styles.countdownButton}
                  onClick={startCountDown}
                >
                  Iniciar ciclo
                </button>
              )}
          </>
        )}
    </div>
  )
}