import css from './NotesLayout.module.css'

interface Props {
    children: React.ReactNode,
    sidebar: React.ReactNode
}

export default function NotesLayout({ children, sidebar }: Props) {
    return (
        <div className={css.main}>
            <aside className={css.sidebar}>
                {sidebar}
            </aside>
            <main className={css.notes}>
                {children}
            </main>
        </div >
    )
}