import { useState, useRef, useEffect } from 'react'
import rand from '../FUNCTIONS/randNumbers'

const [avys, setAvys] = useState([])
const [karves, setKarves] = useState([])
console.log(avys)
console.log(karves)

const gyvKiekis = rand(5, 20)

const avis = useRef(0)
const karve = useRef(0)

const aviuBanda = []
const karviuBanda = []

const ganytis = () => {
  let aviesID = ''
  let karvesID = ''

  for (let i = 0; i < gyvKiekis; i++) {
    setAvys((a) => [...a, a])
    avis.current = rand(1000000, 9999999)
    aviesID = 'A' + avis.current
    avys[i] = aviesID
    aviuBanda.push(avys[i])
  }
  for (let i = 0; i < gyvKiekis; i++) {
    setKarves((k) => [...k, k])
    karve.current = rand(1000000, 9999999)
    karvesID = 'K' + karve.current
    karves[i] = karvesID
    karviuBanda.push(karves[i])
  }
  console.log('Avys:', aviuBanda)
  console.log('Karves:', karviuBanda)
}

useEffect(() => {
  setAvys(JSON.parse(localStorage.getItem('Avys') ?? '[]'))
}, [])

useEffect(() => {
  setKarves(JSON.parse(localStorage.getItem('Karves') ?? '[]'))
}, [])

useEffect(() => {
  localStorage.setItem('Aviu banda,', JSON.stringify(aviuBanda))
  localStorage.setItem('Karviu banda,', JSON.stringify(karviuBanda))
})

function Ganykla() {
  return (
    <>
      <div className='kvc'>
        <div className='kv'>
          <div>Karves:</div>
          {karves.map((k, i) => (
            <div className='square' key={i}>
              {k}
            </div>
          ))}
        </div>
        <div className='kv'>
          <div>Avys:</div>
          {avys.map((a, i) => (
            <div className='circle' key={i}>
              {a}
            </div>
          ))}
        </div>
      </div>

      <button onClick={ganytis}>I ganykla</button>
    </>
  )
}

export default Ganykla
