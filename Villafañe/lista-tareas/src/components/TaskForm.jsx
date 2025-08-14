import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");     
  const [priority, setPriority] = useState(3);    
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) { setError("El nombre es obligatorio"); return; }
    onAdd({ name, description, dueDate: dueDate || null, priority });
    setName(""); setDescription(""); setDueDate(""); setPriority(3); setError("");
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__row">
        <div className="form__control">
          <label className="label">Nombre*</label>
          <input
            className="input"
            placeholder="Ej. Preparar informe mensual"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!error}
          />
          {error && <p className="error">{error}</p>}
        </div>

        <div className="form__control">
          <label className="label">Fecha</label>
          <input
            type="date"
            className="input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="form__control">
        <label className="label">Descripción</label>
        <textarea
          className="input input--textarea"
          placeholder="Detalles de la tarea..."
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form__control">
        <span className="label">Prioridad</span>
        <div className="prio">
          {[1,2,3,4].map(p => (
            <label key={p} className={`chip prio-${p}`}>
              <input
                type="radio"
                name="priority"
                value={p}
                checked={Number(priority) === p}
                onChange={() => setPriority(p)}
              />
              <span>P{p}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form__actions">
        <button className="btn" type="submit">Agregar</button>
      </div>
    </form>
  );
}
