// Инициализация данных
const budget = [];

function createRecord(formData) {
    // Создание новой записи о доходе или расходе
    const id = budget.length > 0 ? budget[budget.length - 1].id + 1 : 1;
    const record = { id, type: formData.type, title: formData.title.trim(), value: +formData.value };
    // Добавление новой записи в общий бюджет
    budget.push(record);
    return record;
}

function deleteRecord(id) {
    const index = budget.findIndex((element) => +id === element.id);
    // Удаление записи из общего бюджета
    budget.splice(index, 1);
    console.log(budget);
};

// Функция для расчета бюджета
const calcBudget = () => {
    // Вычисляем общий доход и расход
    const totalIncome = budget.reduce((total, { type, value }) => type === 'inc' ? total + value : total, 0);
    const totalExpense = budget.reduce((total, { type, value }) => type === 'exp' ? total + value : total, 0);
    // Общий бюджет равен доходы минус расходы
    const totalBudget = totalIncome - totalExpense;
    // Вычисляем процент расходов от общего дохода
    const expensePercents = totalIncome ? Math.round((totalExpense * 100) / totalIncome) : 0;

    return {
        totalIncome,
        totalExpense,
        totalBudget,
        expensePercents
    }
};

function getTestData() {
    const testData = [
        { type: 'inc', title: 'Фриланс', value: 1500 },
        { type: 'inc', title: 'Зарплата', value: 2000 },
        { type: 'inc', title: 'Бизнес', value: 2000 },
        { type: 'inc', title: 'Рента', value: 1000 },
        { type: 'exp', title: 'Продукты', value: 300 },
        { type: 'exp', title: 'Кафе', value: 200 },
        { type: 'exp', title: 'Транспорт', value: 200 },
        { type: 'exp', title: 'Квартира', value: 500 },
    ];

    // Выбираем случайные данные из тестовых данных
    const randomData = testData[Math.floor(Math.random() * testData.length)];
    return randomData;
};

function getMonthYear() {
    const now = new Date();
    const year = now.getFullYear();
    const month = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(now);
    return { month, year };
};

export {
    createRecord,
    deleteRecord,
    calcBudget,
    getTestData,
    getMonthYear
};