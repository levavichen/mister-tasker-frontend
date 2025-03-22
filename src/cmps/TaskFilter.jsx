import { useState, useEffect } from 'react'

export function TaskFilter({ filterBy, onSetFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

    useEffect(() => {
        onSetFilterBy(filterToEdit)
    }, [filterToEdit])

    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
                value = ev.target.value
                break
            case 'number':
            case 'range':
                value = +ev.target.value
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: '', minSpeed: '', maxPrice: '' })
    }

    function clearSort() {
        setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
    }

    return <section className="task-filter">
        <section className="filter-by-text">
            <label for="text">Filter by text</label>
            <input
                type="text"
                name="txt"
                value={filterToEdit.txt}
                placeholder="search for title"
                onChange={handleChange}
            />
        </section>
    </section>
}