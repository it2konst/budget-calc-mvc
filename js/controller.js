import * as model from './model.js';
import * as view from './view.js';

// Определяем обработчик события нажатия на кнопку "Отправить" формы
const formSubmitHandler = (e) => {
    // Защищаем от повторного отправления формы
    e.preventDefault();
    // Проверяем, все ли поля заполнены
    if (!view.checkEmtyFields()) return;
    // Получаем данные из формы
    const formData = view.getFormData();
    // Создаем новую запись на основе данных формы
    const record = model.createRecord(formData);
    // Отображаем новую запись на странице
    view.renderRecord(record);
    // Пересчитываем бюджет после добавления новой записи
    view.renderBudget(model.calcBudget());
    // Очищаем форму после добавления новой записи
    view.clearForm();
    // Вставляем тестовые данные в форму
    insertTestData();
};

// Определяем обработчик события нажатия на кнопку удаления записи
const removeRecordHandler = (e) => {
    // Проверяем, была ли нажата кнопка удаления записи
    if (e.target.closest('button.item__remove')) {
        // Получаем идентификатор удаляемой записи
        const id = view.removeRecord(e);
        // Удаляем запись из модели
        model.deleteRecord(id);
        // Пересчитываем бюджет после удаления записи
        view.renderBudget(model.calcBudget());
    }
};

// Определяем функцию инициализации при загрузке страницы
const init = () => {
    // Отображаем текущий месяц и год
    displayMonth();
    // Вставляем тестовые данные в форму
    insertTestData();
    // Пересчитываем бюджет после вставки тестовых данных
    view.renderBudget(model.calcBudget());
};

// Определяем функцию отображения текущего месяца и года
const displayMonth = () => {
    // Получаем текущий месяц и год
    const monthYear = model.getMonthYear();
    // Отображаем месяц и год на странице
    view.renderMonth(monthYear.month, monthYear.year);
};

// Определяем функцию вставки тестовых данных в форму
const insertTestData = () => {
    // Получаем тестовые данные
    const randomData = model.getTestData();
    // Отображаем тестовые данные на странице
    view.renderTestData(randomData);
};

// Присоединяем обработчик события нажатия на кнопку "Отправить" формы
view.elements.form.addEventListener('submit', formSubmitHandler);
// Присоединяем обработчик события нажатия на кнопку удаления записи
document.body.addEventListener('click', removeRecordHandler);
// Вызываем функцию инициализации при загрузке страницы
init();