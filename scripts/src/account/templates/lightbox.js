export function getLightboxTemplate(boxName, boxNumber, startTime, imageLink) {
  return `
  <img src=${imageLink} class="lightbox__image">
  <div class="lightbox__title">${boxName}</div>
        <div class="lightbox__content">
            <div class="lightbox__table">
                <div class="lightbox__table_row">
                    <div class="lightbox__table_cell lightbox__table_cell_title">
                        Номер бокса:
                    </div>
                    <div class="lightbox__table_cell lightbox__table_cell_value">
                        ${boxNumber}
                    </div>
                </div>

                <div class="lightbox__table_row">
                    <div class="lightbox__table_cell lightbox__table_cell_title">
                        Начало аренды:
                    </div>
                    <div class="lightbox__table_cell lightbox__table_cell_value">
                        ${startTime}
                    </div>
                </div>
            </div>

            <textarea class="lightbox__notes" placeholder="Добавить заметку"></textarea>
        </div>
  `
}