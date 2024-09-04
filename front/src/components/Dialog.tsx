import React, { ReactNode } from 'react'

interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    children: ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    if (!open) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                {children}
            </div>
        </div>
    )
}

export function DialogContent({ children }: { children: ReactNode }) {
    return <div className="space-y-4">{children}</div>
}

export function DialogHeader({ children }: { children: ReactNode }) {
    return <div className="mb-4">{children}</div>
}

export function DialogTitle({ children }: { children: ReactNode }) {
    return <h2 className="text-xl font-bold">{children}</h2>
}

export function DialogFooter({ children }: { children: ReactNode }) {
    return <div className="mt-6 flex justify-end">{children}</div>
}