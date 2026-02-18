import style from "./Select.module.scss";

const Select = ({
  label,
  error,
  multiple,
  placeholder,
  options = [],
  ...rest
}) => {
  const id = rest.id || label;
  return (
    <div className={style.field}>
      <div className={style.selectField}>
        <label htmlFor={id} className={style.label}>
          {label}
        </label>

        <select
          id={id}
          {...rest}
          multiple={!!multiple}
          className={error ? style.selectError : style.select}
        >
          {!multiple && <option value="">{placeholder}</option>}
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className={error ? style.errorVisible : style.error}>{error}</div>
    </div>
  );
};

export default Select;
