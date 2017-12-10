export default function getDocumentTemplate(date, summ) {
  return `
    <div class="settings_table__row">
        <div class="settings_table__row_content">
            <img class="settings_table__pdf_icon" src="img/pdf.svg">
            <div class="settings_table__row_column">
                <div class="settings_table__cell_title settings_table__report_title">
                    Отчёт об оплате на ${date}
                </div>
                <div class="settings_table__cell_text settings_table__report_amount">
                    Сумма: ${summ} руб.
                </div>
            </div>
        </div>
        <div class="settings_table__action_btn settings_table__change_doc">Изменить</div>
    </div>
  `
}