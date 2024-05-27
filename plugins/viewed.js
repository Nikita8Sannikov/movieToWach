$.viewed = function(options){
    return new Promise((res, rej) => {
        const viewedModal = $.descriptionModal({
            title: options.title,
            closable: false,
            width: '400px',
            content: options.content,
            onClose() {
                modal.destroy()
            },
            footerButtons: [
                {text:'Да', 
                type: 'secondary', //Класс бутстрапа, потом заменю на свой
                handler() {
                    viewedModal.close()
                    res()
                }},
                {text:'Нет', 
                type: 'danger', //Класс бутстрапа, потом заменю на свой
                handler() {
                    viewedModal.close()
                    rej()
                }},
            ],
        })
      
      setTimeout( () => viewedModal.open() , 100)  
    })
}