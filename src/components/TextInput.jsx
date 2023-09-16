export const TextInput = ({ name, className, onChange, value, label, placeholder }) => {
  return (
    <div>
      {label ? <label htmlFor={name}>{label}</label> : null}
      <input
        className={className}
        autoComplete="off"
        name={name}
        value={value}
        placeholder={placeholder || ''}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  )
}
