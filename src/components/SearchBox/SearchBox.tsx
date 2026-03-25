import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}
export default function SearchBox({ value, onChange }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Отримуємо текст з поля вводу та видаляємо зайві пробіли з початку та кінця
    const text = event.target.value.trim();

    // Перевірка значення поля
    // if (text === '') {
    //   // Якщо поле пусте, то виводиться повідомлення про помилку
    //   toast.error('Please enter your search query');
    //   // Вихід з функції
    //   return;
    // }

    // Виклик функції onChangeText з поточним текстом пошуку
    onChange(text);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search posts"
      defaultValue={value}
      onChange={handleChange}
    />
  );
}
