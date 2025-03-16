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
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
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
        <h3>Filters:</h3>
        <section className="filter-by-importance">
            <h4>Importance</h4>
            <label>
                <span>1</span>
                <input
                    type="checkbox"
                    name="importance"
                    value="1"
                // checked={filterToEdit === '1'}
                // onChange={handleChange}
                />
            </label>
            <label>
                <span>2</span>
                <input
                    type="checkbox"
                    name="importance"
                    value="2"
                // checked={filterToEdit === '2'}
                // onChange={handleChange}
                />
            </label>
            <label>
                <span>3</span>
                <input
                    type="checkbox"
                    name="importance"
                    value="3"
                // checked={filterToEdit === '3'}
                // onChange={handleChange}
                />
            </label>
        </section>
        <section className="filter-by-text">
            <label for="text">Filter by text</label>
            <input
                type="text"
                name="txt"
                value={filterToEdit.txt}
                placeholder="search for title"
                // onChange={handleChange}
                required
            />
        </section>
        <section className="filter-by-status">
            <h4>Status</h4>
            <label>
                <span>New</span>
                <input
                    type="checkbox"
                    name="status"
                    value="new"
                // checked={filterToEdit === 'new'}
                // onChange={handleChange}
                />
            </label>
            <label>
                <span>Done</span>
                <input
                    type="checkbox"
                    name="status"
                    value="done"
                // checked={filterToEdit === 'new'}
                // onChange={handleChange}
                />
            </label>
            <label>
                <span>Fail</span>
                <input
                    type="checkbox"
                    name="status"
                    value="fail"
                // checked={filterToEdit === 'fail'}
                // onChange={handleChange}
                />
            </label>
        </section>

        {/* <input
            type="number"
            min="0"
            name="minSpeed"
            value={filterToEdit.minSpeed}
            placeholder="min. speed"
            onChange={handleChange}
            required
        />
        <button
            className="btn-clear"
            onClick={clearFilter}>Clear</button>
        <h3>Sort:</h3>
        <div className="sort-field">
            <label>
                <span>Speed</span>
                <input
                    type="radio"
                    name="sortField"
                    value="speed"
                    checked={filterToEdit.sortField === 'speed'}
                    onChange={handleChange}
                />
            </label>
            <label>
                <span>Vendor</span>
                <input
                    type="radio"
                    name="sortField"
                    value="vendor"
                    checked={filterToEdit.sortField === 'vendor'}
                    onChange={handleChange}
                />
            </label>
            <label>
                <span>Owner</span>
                <input
                    type="radio"
                    name="sortField"
                    value="owner"
                    checked={filterToEdit.sortField === 'owner'}
                    onChange={handleChange}
                />
            </label>
        </div>
        <div className="sort-dir">
            <label>
                <span>Asce</span>
                <input
                    type="radio"
                    name="sortDir"
                    value="1"
                    checked={filterToEdit.sortDir === 1}
                    onChange={handleChange}
                />
            </label>
            <label>
                <span>Desc</span>
                <input
                    type="radio"
                    name="sortDir"
                    value="-1"
                    onChange={handleChange}
                    checked={filterToEdit.sortDir === -1}
                />
            </label>
        </div>
        <button
            className="btn-clear"
            onClick={clearSort}>Clear</button> */}
    </section>
}