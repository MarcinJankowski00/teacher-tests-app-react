import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setLanguage } from "./languageSlice";

const LanguageSwitcher = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.language.currentLanguage);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <select
        value={lang}
        onChange={handleChange}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        <option value="de">🇩🇪 Deutsch</option>
        <option value="en">🇬🇧 English</option>
        <option value="es">🇪🇸 Español</option>
        <option value="fr">🇫🇷 Français</option>
        <option value="it">🇮🇹 Italiano</option>
        <option value="pl">🇵🇱 Polski</option>
        <option value="ua">🇺🇦 Українська</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;