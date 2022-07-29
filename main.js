var grafo = new Map()
var origen = '6:5'
var destino = '8:0'
var N = 10
var M = 50

window.addEventListener('load', () => {
  grafo = main()
  document.getElementById(origen).style.background = 'green'
  document.getElementById(destino).style.background = 'blue'
})

const startButton = document.getElementById('start-algorithm')
startButton.addEventListener('click', () => {
  dijsktra(origen, destino)
})

const grilla = document.getElementById('grilla')
grilla.addEventListener('click', (e) => {
  let nPeso = ++grafo.get(e.target.id).peso
  e.target.innerText = nPeso
  e.target.style.background = `rgb(${200 - 10 * nPeso},${
    200 - 10 * nPeso
  },${100})`
})

function main() {
  const grilla = document.getElementById('grilla')
  for (let j = 0; j < N; j++) {
    const tr = document.createElement('tr')
    for (let i = 0; i <= M; i++) {
      const td = document.createElement('td')
      const content = document.createTextNode(`1`)
      td.classList.add('celda')
      td.setAttribute('id', `${j}:${i}`)
      td.appendChild(content)
      tr.appendChild(td)
      grafo.set(`${j}:${i}`, { peso: 1, actual: Infinity, camino: [] })
    }
    tr.classList.add('fila')
    grilla.appendChild(tr)
  }
  return grafo
}

function dijsktra(origen, destino) {
  const visitados = new Set()
  visitados.add(origen)
  grafo.get(origen).actual = 0

  while (!visitados.has(destino)) {
    let actualNombre = minimo(visitados, grafo)
    let actual = grafo.get(actualNombre)
    let [actx, acty] = actualNombre.split(':')
    actx = parseInt(actx)
    acty = parseInt(acty)

    let adyacentes = [
      grafo.get(`${actx + 1}:${acty}`),
      grafo.get(`${actx - 1}:${acty}`),
      grafo.get(`${actx}:${acty + 1}`),
      grafo.get(`${actx}:${acty - 1}`),
    ]

    for (const ady of adyacentes) {
      console.log(ady)
      if (!ady) continue
      if (actual.actual + ady.peso < ady.actual) {
        ady.actual = actual.actual + ady.peso
        adt.camino.push(actualNombre)
      }
    }
    visitados.add(actual)
    document.getElementById(actual).style.background = 'green'
  }
}

function minimo(visitados, grafo) {
  console.log('==funcion minimo==')
  console.log('visitados:')
  console.log(visitados)

  let minimo = Infinity
  let actual;

  for (const v of visitados) {
    let [actx, acty] = v.split(':')
    actx = parseInt(actx)
    acty = parseInt(acty)

    let adyacentes = [
      grafo.get(`${actx + 1}:${acty}`),
      grafo.get(`${actx - 1}:${acty}`),
      grafo.get(`${actx}:${acty + 1}`),
      grafo.get(`${actx}:${acty - 1}`),
    ]

    for (const ady of adyacentes) {
      if (!ady || visitados.has(ady)) continue;

      if (resultado[vx][vy][0] + grafo[x][y] < minimo) {
        minimo = resultado[vx][vy][0] + grafo[x][y]
        minCoords[0] = x
        minCoords[1] = y
      }
    }
  }
  return minCoords
}
