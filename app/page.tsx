import Link from 'next/link';
import css from './page.module.css'

export default function Home() {
  return (
    <div className={css.hero}>
      <div className={css.content}>
        <h1 className={css.title}>Organize Your Thoughts with <span className={css.accent}>NoteHub</span></h1>
        <p className={css.description}>
          A simple and efficient application designed for managing personal notes.
          Keep your thoughts organized and accessible in one place.
        </p>
        <div className={css.actions}>
          <Link href="/sign-up" className={css.btn}>Start for Free</Link>
        </div>
      </div>

      {/* Тут може бути ваша картинка або анімований елемент */}
      {/* <div className={css.imageWrapper}>
        <Image src="/hero-illustration.png" alt="Notes illustration" width={500} height={400} />
      </div> */}
    </div>
  );
}
