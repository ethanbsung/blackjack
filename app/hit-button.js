'use client';

import { useState } from 'react';

export default function HitButton() {
    const [balance, setBalance] = useState(1000);
    function HandleClick() {
        setBalance(balance + 1);
    }

    return <button onClick={HandleClick('Hit')}>Hit ({balance})</button>;
}