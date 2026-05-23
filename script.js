const FECHA_CUMPLE = { dia: 6, mes: 6 }
const FECHA_SECRETA = "2024-01-05"

const hoy = new Date()
const cumplePaso = (
    hoy.getMonth() + 1 > FECHA_CUMPLE.mes ||
    (hoy.getMonth() + 1 === FECHA_CUMPLE.mes && hoy.getDate() >= FECHA_CUMPLE.dia)
)

if (cumplePaso) {
    document.querySelector('.carta[data-id="carta-cumple"]').classList.remove('bloqueada')
}

const filtro = document.querySelector('.filtro')

function abrirFiltro() {
    filtro.style.cssText = `
        display: block;
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        backdrop-filter: blur(5px);
        background: rgba(0,0,0,0.3);
        z-index: 99;
    `
}

function cerrarFiltro() {
    filtro.style.display = 'none'
}

document.querySelectorAll('.carta').forEach(carta => {
    carta.addEventListener('click', () => {
        const id = carta.dataset.id
        const esBloqueada = carta.classList.contains('bloqueada')
        const sticker = carta.dataset.sticker

        if (id === 'carta-cumple') {
            if (esBloqueada) {
                abrirFiltro()
                document.querySelector('.advertencia[data-id="pop-cumple"]').style.display = 'flex'
            } else {
                abrirFiltro()
                document.querySelector(`.modal[data-id="${id}"]`)?.classList.add('visible')
                mostrarStickerCarta(sticker)
            }
            return
        }

        if (id === 'carta-secret') {
            if (esBloqueada) {
                abrirFiltro()
                document.querySelector('.advertencia[data-id="pop-secret"]').style.display = 'flex'
            } else {
                abrirFiltro()
                document.querySelector(`.modal[data-id="${id}"]`)?.classList.add('visible')
                mostrarStickerCarta(sticker)
            }
            return
        }

        if (!esBloqueada) {
            abrirFiltro()
            document.querySelector(`.modal[data-id="${id}"]`)?.classList.add('visible')
            mostrarStickerCarta(sticker)
        }
    })
})

document.querySelector('.advertencia[data-id="pop-cumple"] .aceptar').addEventListener('click', () => {
    document.querySelector('.advertencia[data-id="pop-cumple"]').style.display = 'none'
    cerrarFiltro()
})

document.querySelector('.advertencia[data-id="pop-secret"] .aceptar').addEventListener('click', () => {
    const input = document.querySelector('#fecha').value

    if (input === FECHA_SECRETA) {
        document.querySelector('.advertencia[data-id="pop-secret"]').style.display = 'none'
        document.querySelector('.carta[data-id="carta-secret"]').classList.remove('bloqueada')
        abrirFiltro()
        document.querySelector('.modal[data-id="carta-secret"]')?.classList.add('visible')
        mostrarStickerCarta(document.querySelector('.carta[data-id="carta-secret"]').dataset.sticker)
    } else {
        document.querySelector('#fecha').style.borderColor = 'red'
        setTimeout(() => {
            document.querySelector('#fecha').style.borderColor = '#e8c9b8'
        }, 1000)
    }
})

document.querySelectorAll('.cerrar').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal')?.classList.remove('visible')
        btn.closest('.advertencia')?.style.setProperty('display', 'none')
        cerrarFiltro()
        ocultarStickerCarta()
    })
})

document.querySelector('#fecha').addEventListener('click', function() {
    this.showPicker()
})

const stickerPrincipal = document.querySelector('.sticker')
const stickerCarta = document.querySelector('.sticker-carta')

function mostrarStickerCarta(src) {
    stickerPrincipal.style.display = 'none'
    stickerCarta.src = src
    stickerCarta.style.display = 'block'
}

function ocultarStickerCarta() {
    stickerCarta.style.display = 'none'
    stickerPrincipal.style.display = 'block'
}