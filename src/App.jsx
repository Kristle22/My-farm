import './App.css'
import { useState, useEffect } from 'react'
import rand from './FUNCTIONS/randNumbers'
import randColor from './FUNCTIONS/randColor'
// import Ganykla from './Components/Ganykla'

function App() {
  const [avys, setAvys] = useState([])
  const [karves, setKarves] = useState([])

  let a_ID
  let k_ID
  const aviuBanda = []
  const karviuBanda = []

  const ganytis = () => {
    for (let i = 0; i < rand(5, 20); i++) {
      a_ID = 'A' + rand(1000000, 9999999)
      const avyte = {
        id: a_ID,
        species: 'avis',
        color: randColor(),
        location: 'aviuPuse',
      }
      aviuBanda.push(avyte)

      k_ID = 'K' + rand(1000000, 9999999)
      const karvute = {
        id: k_ID,
        species: 'karve',
        color: randColor(),
        location: 'karviuPuse',
      }
      karviuBanda.push(karvute)
      setAvys(aviuBanda)
      setKarves(karviuBanda)
    }
  }
  console.log('aviu banda', avys)
  console.log('karviu banda', karves)

  const perbegusA = (id) => {
    const avele = avys.filter((av) => av.id === id)[0]
    avele.location = 'karviuPuse'
    setKarves((k) => {
      return [...k, avele]
    })
  }

  const perbegusK = (id) => {
    const karvuke = karves.filter((kr) => kr.id === id)[0]
    karvuke.location = 'aviuPuse'
    setAvys((a) => {
      return [...a, karvuke]
    })
  }

  useEffect(() => {
    const avysGanykloj = JSON.parse(localStorage.getItem('avys'))
    const karvesGanykloj = JSON.parse(localStorage.getItem('karves'))
    if (avysGanykloj && karvesGanykloj) {
      setAvys(avysGanykloj)
      setKarves(karvesGanykloj)
    }
  }, [])
  useEffect(() => {
    if (avys?.length && karves?.length) {
      localStorage.setItem('avys', JSON.stringify(avys))
      localStorage.setItem('karves', JSON.stringify(karves))
    }
  }, [avys, karves])

  return (
    <div className='App'>
      <header className='App-header'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div className='kv'>
            <h1>Karves:</h1>
            {karves
              .filter((k) => k.location === 'karviuPuse')
              .map((k) => (
                <div
                  className='square'
                  key={k.id}
                  style={{
                    background: k.color,
                    borderRadius: k.species === 'karve' ? 5 : 50,
                  }}
                  onClick={() => perbegusK(k.id)}
                >
                  {k.id}
                </div>
              ))}
          </div>
          <div className='kv'>
            <h1>Avys:</h1>
            {avys
              .filter((a) => a.location === 'aviuPuse')
              .map((a) => (
                <div
                  className='circle'
                  key={a.id}
                  style={{
                    background: a.color,
                    borderRadius: a.species === 'avis' ? 50 : 5,
                  }}
                  onClick={() => perbegusA(a.id)}
                >
                  {a.id}
                </div>
              ))}
          </div>
        </div>
        <button style={{ display: 'block' }} onClick={ganytis}>
          I ganykla
        </button>
      </header>
    </div>
  )
}

export default App
