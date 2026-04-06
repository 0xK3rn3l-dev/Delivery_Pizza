'use client';

import { useEffect } from 'react';

export type ErrorToastProps = {
    message: string;
    onClose?: () => void;
    durationMs?: number;
};

export default function ErrorToast({
    message,
    onClose,
    durationMs = 3000
}: ErrorToastProps) {
    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            onClose?.();
        }, durationMs);

        return () => clearTimeout(timer);
    }, [message, onClose, durationMs]);

    if (!message) return null;

    return (
        <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
            <div className="w-full max-w-sm rounded-lg bg-red-500 px-4 py-3 text-sm text-white shadow-lg flex items-center gap-3">
                <p className="flex-1 text-left">{message}</p>
                <button 
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}