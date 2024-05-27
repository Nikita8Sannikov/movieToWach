function _createDescriptionModal(options) {
    const DEFAULT_WIDTH = '600px'
    const descriptionModal = document.createElement('div')
    descriptionModal.classList.add('description-modal')
    descriptionModal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close = "true" >
      <div class="modal-window" style: = "width: ${options.width || DEFAULT_WIDTH}">
        <div class="modal-header">
          <span class="modal-title">${options.title || 'Окно'}</span>
          ${options.closable ? `<span class="modal-close" data-close = "true"  >&times;</span>` : ''}
        </div>
        <div class="modal-body" data-content>
          ${options.content || ''}
        </div>
        <div class="modal-footer">
          <button>Ок</button>
        </div>
      </div>
    </div>
    `)
    document.body.appendChild(descriptionModal)
    return descriptionModal 
}



$.descriptionModal = function (options) {
    const $descriptionModal =  _createDescriptionModal(options)
    const ANIMATION_SPEED = 200
    let closing = false
    let destroyed = false
    modal = {
        open() {
          if(destroyed){
           return console.log('Modal is destroyed');
          }
            !closing && $descriptionModal.classList.add('open')
        },
        close() {
            closing = true
            $descriptionModal.classList.remove('open')
            $descriptionModal.classList.add('hide')
            setTimeout(() => {
                $descriptionModal.classList.remove('hide')
                closing = false
            },ANIMATION_SPEED)
        },

    }

    const listener = event => {
      if(event.target.dataset.close){
        modal.close()
    }
  }

    $descriptionModal.addEventListener('click',listener)

    return Object.assign(modal, {
      destroy() {
        $descriptionModal.parentNode.removeChild($descriptionModal)
        $descriptionModal.removeEventListener('click', listener)
        destroyed = true
      },
      setContent(html){
        $descriptionModal.querySelector('[data-content]').innerHTML = html
      }
      //По надобности добавь изменения тайтла и прочих конструкций которые тут есть
    })
}