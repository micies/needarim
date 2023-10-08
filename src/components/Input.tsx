import React, { useState } from "react";

interface InputProps {
    value?: string|number;
    id?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    disabled?: boolean;
    type?: string;
}

export function Input({ value, id, onChange, name, disabled, type }: InputProps) {
    return (
        <div className="form-group">

            <input
                className="form-control"
                value={value}
                id={id}
                onChange={onChange}
                type={type}
                name={name}
                disabled={disabled}
                required
            />
        </div>
    );
}