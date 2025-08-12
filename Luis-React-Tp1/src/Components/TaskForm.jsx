import { useState } from 'react';
 export default function TaskForm({ onAdd}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ title, description });
        setTitle('');
        setDescription('');
    };
    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <textarea
                placeholder="Título de la tarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={2}
                style={{width: '100%', marginTop: '8px'}}

            ></textarea>
            
            

            <textarea
                placeholder="Descripción de la tarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                style={{ width: '100%', marginTop: '8px' }}
            ></textarea>
            
            <button type="submit" className="btn">Agregar Tarea</button>

        </form>
    );
}









