import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    // Ovdje možete dodati dodatna svojstva ako su potrebna
}

export function Input(props: InputProps) {
    return (
        <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...props}
        />
    )
}