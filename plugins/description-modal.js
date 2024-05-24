function _createDescriptionModal(options) {
    const descriptionModal = document.createElement('div')
    descriptionModal.classList.add('description-modal')
    descriptionModal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay">
      <div class="modal-window">
        <div class="modal-header">
          <span class="modal-title">Описание</span>
          <span class="modal-close" >&times;</span>
        </div>
        <div class="modal-body">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, nihil.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, nihil.</p>
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
    return {
        open() {
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
        destroy() {},
    }
}